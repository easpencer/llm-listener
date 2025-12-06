"""Command-line interface for LLM Listener."""

import asyncio
import click
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown

from .core import Settings, LLMOrchestrator, ResponseReconciler


console = Console()


async def run_query(
    question: str,
    show_individual: bool = True,
    show_synthesis: bool = True,
) -> None:
    """Execute a query against all configured LLMs."""
    settings = Settings.from_env()

    # Check for available providers
    available = settings.get_available_providers()
    if not available:
        console.print(
            "[red]Error:[/red] No LLM providers configured.\n"
            "Set at least one: OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, or OLLAMA_ENABLED=true",
        )
        return

    console.print(f"\n[bold]Querying {len(available)} LLM(s):[/bold] {', '.join(available)}\n")

    orchestrator = LLMOrchestrator(settings)
    reconciler = ResponseReconciler(settings)

    # Query all providers
    with console.status("[bold green]Querying LLMs..."):
        responses = await orchestrator.query_all(question)

    # Display individual responses
    if show_individual:
        console.print("\n[bold underline]Individual Responses[/bold underline]\n")
        for response in responses:
            if response.success:
                panel = Panel(
                    Markdown(response.content),
                    title=f"[bold blue]{response.provider_name}[/bold blue] ({response.model})",
                    border_style="blue",
                )
            else:
                panel = Panel(
                    f"[red]Error: {response.error}[/red]",
                    title=f"[bold red]{response.provider_name}[/bold red] ({response.model})",
                    border_style="red",
                )
            console.print(panel)
            console.print()

    # Generate and display synthesis
    if show_synthesis:
        successful_count = sum(1 for r in responses if r.success)
        if successful_count >= 2:
            console.print("\n[bold underline]Reconciled Analysis[/bold underline]\n")
            with console.status("[bold green]Synthesizing responses..."):
                synthesis = await reconciler.reconcile(question, responses)

            if synthesis and synthesis.success:
                panel = Panel(
                    Markdown(synthesis.content),
                    title="[bold magenta]Synthesized Response[/bold magenta]",
                    border_style="magenta",
                )
                console.print(panel)
            else:
                console.print("[yellow]Could not generate synthesis.[/yellow]")
        else:
            console.print(
                "[yellow]Need at least 2 successful responses for synthesis.[/yellow]"
            )


@click.group()
@click.version_option()
def main():
    """LLM Listener - Query multiple LLMs and reconcile their responses."""
    pass


@main.command()
@click.argument("question")
@click.option(
    "--no-individual",
    is_flag=True,
    help="Hide individual LLM responses",
)
@click.option(
    "--no-synthesis",
    is_flag=True,
    help="Skip generating a synthesized response",
)
def ask(question: str, no_individual: bool, no_synthesis: bool):
    """Ask a question to all configured LLMs.

    QUESTION: The question to ask the LLMs.
    """
    console.print(Panel(question, title="[bold]Question[/bold]", border_style="green"))
    asyncio.run(run_query(question, not no_individual, not no_synthesis))


@main.command()
def providers():
    """List available LLM providers."""
    settings = Settings.from_env()
    available = settings.get_available_providers()

    all_providers = [
        ("openai", "OPENAI_API_KEY"),
        ("anthropic", "ANTHROPIC_API_KEY"),
        ("gemini", "GEMINI_API_KEY"),
        ("grok", "GROK_API_KEY"),
        ("ollama", "OLLAMA_ENABLED=true"),
    ]

    console.print("\n[bold]LLM Providers:[/bold]\n")
    for name, env_var in all_providers:
        if name in available:
            console.print(f"  [green]✓[/green] {name} [dim](configured)[/dim]")
        else:
            console.print(f"  [dim]○ {name} ({env_var})[/dim]")
    console.print()


@main.command()
@click.option("--file", "-f", type=click.File("r"), help="Read questions from file (one per line)")
def batch(file):
    """Run multiple questions in batch mode."""
    if not file:
        console.print("[red]Error:[/red] Please provide a file with --file/-f option")
        return

    questions = [line.strip() for line in file if line.strip()]
    console.print(f"\n[bold]Processing {len(questions)} questions...[/bold]\n")

    for i, question in enumerate(questions, 1):
        console.print(f"\n[bold]━━━ Question {i}/{len(questions)} ━━━[/bold]")
        console.print(Panel(question, title="[bold]Question[/bold]", border_style="green"))
        asyncio.run(run_query(question))
        console.print("\n")


if __name__ == "__main__":
    main()
