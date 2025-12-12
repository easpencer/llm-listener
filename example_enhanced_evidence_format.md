# Example Enhanced Evidence Format

This document shows what the enhanced `_format_evidence()` method output looks like.

## Sample Output

```
## Official Guidelines & Sources
(1500 found, 50 examined, 42 included, 8 excluded)

### CDC (8 sources)
- **COVID-19 Vaccine Safety and Effectiveness**: The CDC monitors COVID-19 vaccine safety closely through multiple surveillance systems. Vaccines are highly effective at preventing severe illness, hospitalization, and death.
  URL: https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety.html
- **Understanding mRNA COVID-19 Vaccines**: mRNA vaccines teach cells how to make a protein that triggers an immune response without using the live virus. The mRNA never enters the nucleus and does not affect DNA.
  URL: https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/mrna.html

### WHO (3 sources)
- **WHO COVID-19 Vaccine Tracker and Landscape**: The WHO tracks global vaccine development and deployment. Multiple vaccines have been validated for safety and efficacy through rigorous clinical trials.
  URL: https://www.who.int/publications/m/item/draft-landscape-of-covid-19-candidate-vaccines
- **COVID-19 vaccines: Safety surveillance manual**: WHO guidance on monitoring vaccine safety includes protocols for detecting and investigating adverse events following immunization.
  URL: https://www.who.int/publications/i/item/covid-19-vaccines-safety-surveillance-manual

### FDA (5 sources)
- **FDA Approval of Comirnaty (COVID-19 Vaccine, mRNA)**: The FDA approved the Pfizer-BioNTech COVID-19 vaccine after extensive review of safety and effectiveness data from clinical trials involving tens of thousands of participants.
  URL: https://www.fda.gov/news-events/press-announcements/fda-approves-first-covid-19-vaccine
- **Moderna COVID-19 Vaccine Emergency Use Authorization**: The Moderna COVID-19 vaccine received emergency authorization based on evidence of efficacy in preventing COVID-19 disease.
  URL: https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/moderna-covid-19-vaccine

### NIH (2 sources)
- **NIH Study Shows Long-Term Safety of COVID-19 Vaccination**: Research funded by NIH demonstrates that serious adverse events from COVID-19 vaccines are rare and the benefits outweigh risks.
  URL: https://www.nih.gov/news-events/nih-research-matters/study-shows-long-term-safety-covid-19-vaccination

### Medical Societies (24 sources)
- **American Heart Association Statement on COVID-19 Vaccination**: The AHA recommends COVID-19 vaccination for all eligible individuals, including those with cardiovascular disease. Benefits far outweigh any theoretical risks.
  URL: https://www.heart.org/en/about-us/covid-19-and-heart-disease
- **ACOG Recommends COVID-19 Vaccines for Pregnant Individuals**: The American College of Obstetricians and Gynecologists strongly recommends COVID-19 vaccination during pregnancy based on evidence of safety and effectiveness.
  URL: https://www.acog.org/covid-19/covid-19-vaccines-and-pregnancy-conversation-guide-for-clinicians

## Scientific Literature
(8450 found, 50 examined, 38 high-quality)
Quality threshold: 5+ citations

### Highly Cited (12 papers, 50+ citations)
- **Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine** (1847 citations)
  Phase 3 randomized controlled trial demonstrating 95% efficacy of the Pfizer-BioNTech vaccine in preventing COVID-19. Study included 43,548 participants with robust safety monitoring showing mild to moderate side effects.
  Publication: Polack FP, et al. N Engl J Med. 2020 Dec 31;383(27):2603-2615
  URL: https://www.nejm.org/doi/full/10.1056/NEJMoa2034577

- **Efficacy and Safety of the mRNA-1273 SARS-CoV-2 Vaccine** (1523 citations)
  Randomized, placebo-controlled trial of Moderna's mRNA-1273 vaccine showing 94.1% efficacy in preventing COVID-19 disease. Study enrolled 30,420 volunteers with no serious safety concerns identified.
  Publication: Baden LR, et al. N Engl J Med. 2021 Feb 4;384(5):403-416
  URL: https://www.nejm.org/doi/full/10.1056/NEJMoa2035389

- **mRNA vaccines against SARS-CoV-2: Advantages and caveats** (892 citations)
  Comprehensive review of mRNA vaccine technology, mechanisms of action, and safety profile. Discusses the unprecedented speed of development while maintaining rigorous safety standards.
  Publication: Pardi N, et al. Curr Opin Immunol. 2021 Apr;69:75-87
  URL: https://pubmed.ncbi.nlm.nih.gov/33581531/

### Moderately Cited (18 papers, 10-49 citations)
- **Real-world effectiveness of COVID-19 vaccines: a literature review and meta-analysis** (42 citations)
  Meta-analysis of 18 observational studies showing real-world vaccine effectiveness ranges from 70-95% against symptomatic infection and >90% against severe disease and hospitalization.
  Publication: Li M, et al. Int J Infect Dis. 2022 Jan;114:252-260
  URL: https://pubmed.ncbi.nlm.nih.gov/34755737/

- **Myocarditis after COVID-19 mRNA vaccines: a safety signal confirmed** (38 citations)
  Study examining rare cases of myocarditis following mRNA vaccination. Incidence estimated at 1-5 cases per 100,000 vaccinated individuals, predominantly in young males. Most cases were mild and resolved quickly.
  Publication: Diaz GA, et al. Circulation. 2021 Dec 14;144(24):1952-1964
  URL: https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.121.056583

### Lower Cited (8 papers, 5-9 citations)
- **COVID-19 vaccine hesitancy and associated factors: a cross-sectional study** (7 citations)
  Survey of vaccine hesitancy factors including concerns about safety, rapid development, and misinformation. Emphasizes need for transparent communication about benefits and risks.
  URL: https://pubmed.ncbi.nlm.nih.gov/35123456/

### Note: 12 additional papers with <5 citations were found but flagged as lower quality
```

## Key Enhancements

1. **Organization-level grouping**: Sources are grouped by CDC, WHO, FDA, NIH, and Medical Societies for easy comparison
2. **Full snippets included**: Each source includes the complete description/abstract, not just title and URL
3. **Metadata transparency**: Shows total found, examined, included, and excluded counts
4. **Citation-based hierarchy**: Scientific literature is organized by citation count (highly cited 50+, moderately cited 10-49, lower cited 5-9)
5. **Publication information**: For scholarly articles, includes journal citation details
6. **Quality indicators**: Makes it clear which papers meet quality thresholds and which were flagged

## Benefits for Discordance Analysis

The enhanced format enables the synthesis LLM to:

- Compare positions across different government agencies (e.g., CDC vs WHO vs FDA)
- Identify gaps where certain organizations have no guidance
- Weight evidence by citation count and publication quality
- Cross-reference claims between official guidance and peer-reviewed literature
- Spot contradictions between high-quality papers and official recommendations
- Assess whether AI model outputs align with authoritative sources
