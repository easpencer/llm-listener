"""Example usage of the DiscordanceAnalyzer module.

This demonstrates how to use the structured discordance analysis
to detect agreement and disagreement between AI responses and evidence.
"""

from llm_listener.core import DiscordanceAnalyzer, Stance


def example_usage():
    """Demonstrate basic usage of DiscordanceAnalyzer."""

    # Initialize the analyzer
    analyzer = DiscordanceAnalyzer()

    # Example AI responses
    ai_responses = [
        {
            'provider_name': 'OpenAI',
            'model': 'gpt-4',
            'content': (
                'Vitamin D supplementation is recommended for individuals with deficiency. '
                'Studies show it is effective for bone health. However, you should consult '
                'your doctor before starting any supplement regimen.'
            )
        },
        {
            'provider_name': 'Anthropic',
            'model': 'claude-3-opus',
            'content': (
                'While vitamin D may be beneficial, evidence is limited for general population '
                'supplementation. More research is needed. Individual needs vary and supplementation '
                'should be discussed with a healthcare provider.'
            )
        },
        {
            'provider_name': 'Google',
            'model': 'gemini-pro',
            'content': (
                'Vitamin D is proven to be effective for preventing rickets and maintaining bone density. '
                'It is safe and well-established as a treatment for deficiency. The evidence shows '
                'clear benefits for at-risk populations.'
            )
        }
    ]

    # Example evidence data
    evidence_data = {
        'guidelines': {
            'count': 2,
            'links': [
                {
                    'url': 'https://www.cdc.gov/vitamin-d',
                    'title': 'CDC Vitamin D Guidance',
                    'snippet': (
                        'The CDC recommends vitamin D supplementation for individuals at risk '
                        'of deficiency. Evidence shows it is effective for bone health.'
                    )
                },
                {
                    'url': 'https://www.who.int/vitamin-d-recommendations',
                    'title': 'WHO Vitamin D Recommendations',
                    'snippet': (
                        'Limited evidence supports universal supplementation. WHO suggests '
                        'supplementation may be beneficial for specific populations under '
                        'medical supervision.'
                    )
                }
            ]
        },
        'literature': {
            'count': 5,
            'top_cited': [
                {
                    'title': 'Meta-analysis of Vitamin D supplementation trials',
                    'url': 'https://example.com/study1',
                    'snippet': (
                        'Our meta-analysis found vitamin D supplementation is effective for '
                        'preventing fractures in elderly populations. Results were significant '
                        'across 12 randomized controlled trials.'
                    ),
                    'cited_by': 450
                }
            ]
        }
    }

    # Analyze discordance
    result = analyzer.analyze(
        ai_responses=ai_responses,
        evidence_data=evidence_data
    )

    # Print results
    print("=" * 60)
    print("DISCORDANCE ANALYSIS RESULTS")
    print("=" * 60)
    print()

    print(f"Agreement Level: {result.agreement_level:.1%}")
    print()

    print("Stance Distribution:")
    total = sum(result.stance_distribution.values())
    for stance, count in result.stance_distribution.items():
        if count > 0:
            pct = (count / total * 100) if total > 0 else 0
            print(f"  {stance.value.title()}: {count} sources ({pct:.1f}%)")
    print()

    print("Areas of Agreement:")
    for area in result.areas_of_agreement:
        print(f"  - {area}")
    print()

    if result.areas_of_disagreement:
        print("Areas of Disagreement:")
        for area in result.areas_of_disagreement:
            print(f"  - {area}")
        print()

    print("Source Positions:")
    for i, pos in enumerate(result.source_positions, 1):
        print(f"\n  {i}. {pos.source_name}")
        print(f"     Stance: {pos.stance.value} (confidence: {pos.confidence:.2f})")
        print(f"     Key phrases: {', '.join(pos.key_phrases[:3])}")
        print(f"     Claim: {pos.claim_text[:100]}...")

    if result.conflicting_pairs:
        print("\nConflicting Positions:")
        for i, (pos1, pos2) in enumerate(result.conflicting_pairs[:3], 1):
            print(f"\n  Conflict {i}:")
            print(f"    {pos1.source_name} ({pos1.stance.value})")
            print(f"    vs")
            print(f"    {pos2.source_name} ({pos2.stance.value})")

    # Use the built-in formatter
    print("\n" + "=" * 60)
    print("FORMATTED SUMMARY")
    print("=" * 60)
    print()
    print(analyzer.format_summary(result))


if __name__ == '__main__':
    example_usage()
