---
sidebar_position: 0
title: 'Project: Media Outlets'
module: Advanced-Data
overview: true
week: 5
---

import LearningSliders from '@theme/LearningSliders'
import StakeholderBio from '@theme/StakeholderBio'
import StakeholderComment from '@theme/StakeholderComment'

_Otranto Development_ is a boutique software development firm that specialises in working within the media sector. Their clients range from multinational corporations to celebrities, and over the last fifteen years, they've developed a suite of bespoke software solutions to meet client needs.

You are a newly-hired data technologist working on the *Otranto Development* team, which builds trial products that the company will then pitch to potential clients. Successful experiments mean more funding for the team, and career advancement for you. You've joined the company at a time of great challenge and opportunity; you need to prove your worth quickly. That means high-quality development, effective teamwork, and a consistent focus on the business context. 

## Stakeholder

<StakeholderBio name="Alexandra Otranto" role="Interim CEO" imageFilename="alexandra_otranto">
Alexandra became interim CEO only a month ago, after her father's unexpected resignation. While she's determined to succeed in the role and continue her father's legacy, she needs a majority vote from the Board to confirm her role permanently, and they already have reservations about someone so young holding such a prestigious position.

Within the next month, she needs to be able to show the board that she's the person to lead the company out of this recent rocky period into a bright future. She's got an idea for a greenfield project that she thinks has potential, and everything is riding on its success.

Alexandra recently completed her double Masters in Marketing and Computer Engineering. When she's not trying to save her father's company, she enjoys classic cinema, martial arts, and playing the piano.
</StakeholderBio>

:::ai-suggestion Keep in Contact

Throughout this project, you should keep in contact with stakeholders using the [Stakeholder Communication tool](https://tools.sigmalabs.co.uk/tools/stakeholder-communication?caseStudyId=Advanced-Data-Week-5&stakeholderId=alexandra_otranto). 

You can ask questions, give updates, and get feedback on your work, all of which will help ensure you're moving in the right direction.

:::

## The Project

Every day, media outlets produce a dizzying amount of news about a dizzying number of people/organisations. It's difficult for any one person to stay on top of all the different news feeds and understand exactly what is being said about whom. Potentially, there's a significant market here for a service that makes analysis and understanding of this data possible.

Alexandra envisages a service with the following features:

- Regular Monitoring of [RSS feeds](https://en.wikipedia.org/wiki/RSS) from various media sources to identify new articles
- Whenever a new article is identified, its **full text content** is scraped and stored in a database
- The article data is enriched by extracting/storing some or all of the following:
  - Basic metadata (outlet, publication date/time) (**required**)
  - Names of identified public figures/companies (**required**)
  - Overall text sentiment
  - Keywords
- This data is then exposed through a range of different commercial outputs

## Aims & Requirements

Alexandra has asked your team to take the lead on this project. Your task is to build an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) of the service, demonstrating both its feasibility and its fit for the potential market.

As this is an MVP, your brief is restricted in scope: 

:::info Project Brief

Build a **fully-working** minimal implementation of the service.

This should monitor **1-2** different RSS feeds and include **one** of the below outputs:

  - An analytics dashboard
  - A subscriber newsletter (PDFs sent over email)

Additionally, the project should involve **one** of the below more-complex outputs:

  - An API (potentially through [AWS API gateway](https://aws.amazon.com/api-gateway))
  - Automatic social media updates (on [BlueSky](https://bsky.app/) or similar)
  - A [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) server

:::

There are also three more holistic requirements that you are expected to meet:

- **Keep costs low.** With the board scrutinising every expense, it's crucial that this project comes in on time and under budget. The more economical your solution, the better.
- **Keep standards high.** The company was built on the principle of quality over quantity. Even though this is an MVP, it's still important to do things properly and not cut corners.
- **Impress.** This is an MVP, but--for both the company and your career--you need to produce a service that demonstrates the value of the project. Don't play it so safe that you end up with something underwhelming.

## Technology & Tools

Your chosen tech stack should be compatible with the standard tools and technology used in the company. That includes:

- Python as the primary coding language
- Terraform as an IaC tool
- Docker for containerisation
- AWS as the main cloud provider
- TDD to ensure high standards

For _Otranto Development_ MVPs, [AWS DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) is always used as the database solution.

## Deliverables

This project involves multiple distinct deliverables.

### Project Proposal

An initial project proposal document covering:

  1. SCQA analysis of the project
  2. A specific target market/client
  3. Identification of the RSS feeds to use as initial input
  4. The inputs and outputs which will be included in the MVP
  5. Clear justifications of the choices made above

The project proposal document should be a well-formatted `.pdf` file of no more than six pages in length.

### The project codebase

A GitHub repository containing all the code required to run the project.

This repository should also have clear documentation for how to set up, run, and deploy the project.

### The project planning board

A GitHub project board demonstrating the full project lifecycle, with all cards correctly categorised.

### The presentation

A ten-minute recorded presentation covering

- The project context & aims
- The project's potential customer base and commercialisation plan
- The project architecture
- Final outputs
- Potential next steps

## Deadlines

The project proposal is due by **10:00 on Tuesday** of the project week, and will be reviewed by a coach.

All other deliverables are due at **17:40 on Friday** of the project week.
