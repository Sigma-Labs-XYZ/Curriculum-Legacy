---
sidebar_position: 1
title: 'Case Study: Air Travel'
module: Data-Analysis-Fundamentals
week: 1
objectives: [
  "Communicate conclusions and insights to stakeholders using a range of methods (e.g. reports, visualisations, presentations)",
  "Connect to a Redshift data warehouse from the command line",
  "Connect to a Redshift data warehouse using a database management tool",
  "Create database VIEWs to store query results",
  "Create user-defined functions (UDFs) in SQL to generalise queries/processes",
  "Enrich and standardise data using SQL",
  "Explain the benefits of using a data warehouse",
  "Explain the key features of data warehouses and data lakes",
  "Explain the responsibilities of a data analyst",
  "Extract insights from unfamiliar datasets",
  "Identify requirements and stakeholder needs",
  "List the features of AWS Redshift",
  "Modify data within a database using SQL",
  "Navigate an unfamiliar database",
  "Plan and carry out analysis to meet stakeholder needs",
  "Query a database using Redshift SQL",
  "Summarise data using measures of central tendency (i.e. mean, median, and mode)",
  "Use common table expressions (CTEs) to simplify complex queries",
  "Use window functions to perform calculations across subsets of rows"
]
---

import StakeholderBio from "@theme/StakeholderBio"
import LearningSliders from '@theme/LearningSliders';

![large hlLogo](./assets/hl-logo.png)

In 1921, Aloysius Harlock and Benedict Lewis founded Harlock & Lewis (H&L) in the heart of Lambeth, London, with a bold vision for transforming everyday life through quality manufacturing. Initially, the firm made its mark in the marketplace by selling elaborately crafted [wrought-iron](https://en.wikipedia.org/wiki/Wrought_iron) garden furniture, which quickly became a household name in local circles for its durability and timeless design.

As global events unfolded, H&L shifted gears during WWII, transitioning its focus to producing rugged truck engine parts essential for wartime logistics. This period of transformation not only highlighted the company’s ability to adapt under pressure but also laid the groundwork for a broader diversification in its product lineup.

In the post-war era, H&L gradually honed its specialization towards the transport industry. Today, the company is **renowned for designing and supplying cutting-edge safety equipment and improvements for the airline industry**. From innovative laser-blocking films for aeroplane windscreens to strategically designed anti-roosting spikes for hangars, H&L’s products play a crucial role in enhancing passenger safety and operational efficiency.

While the company's roots remain deeply embedded in the UK and Europe, recent strategic moves signal a determined push to capture a larger share of the Asian and US markets. This expansion not only represents a new chapter in H&L’s legacy but also mirrors the global evolution of the transport and logistics sectors. As a valued member of H&L's analytics team, your insights will be pivotal in steering the company’s next phase of growth, ensuring that every data point contributes to a safer and more efficient future in air transport.

Looking to the future, H&L has a few key challenges to navigate:

1. **Increased Market Competition:**
   - The expansion into Asian and US markets exposes H&L to new rivals, potentially intensifying price pressures and competitive strategies.
2. **Operational and Supply Chain Challenges:**
   - Global supply chain disruptions, particularly in the transport and logistics sectors, might affect the timely manufacture and delivery of products.
3. **Regulatory Changes and Compliance:**
   - Shifting regulatory landscapes in different regions could lead to additional compliance costs and operational delays.
4. **Economic and Currency Volatility:**
   - Fluctuations in economic conditions and currency exchange rates may impact profit margins and financial stability.
5. **Technological Disruption:**
   - Rapid technological advancements could render current processes obsolete, requiring significant investments in innovation and digital transformation.

### Products

The company currently provides the following products:

- Laser-blocking films for aeroplane windscreens. Strong sales due to high demand in premium airlines.
- Anti-roosting spikes for hangars. Moderate sales as adoption is growing steadily.
- Cabin interior safety systems. Rapidly increasing sales driven by enhanced safety regulations.
- Inflatable emergency slides. Steady sales with consistent demand from a wide range of aircraft.
- Advanced in-flight communication devices. Early-stage growth with promising future market uptake.
- Automated baggage handling systems. Strong sales in the European market, with potential for expansion.
- Aircraft maintenance and repair tools. Established product line with consistent sales.
- Ground support equipment for airports. Growing demand due to increased air traffic.

### AI Investment

H&L has recently made a strategic decision to invest **heavily** in AI and data analytics capabilities, recognizing the transformative potential of these technologies in the air transport industry. This investment includes the development of an advanced data warehouse, the hiring of top-tier data analysts, and the integration of AI-driven tools to enhance data processing and analysis.

As part of your role in the analytics team, you will be at the forefront of this AI-native transformation, leveraging cutting-edge technologies to extract insights from complex datasets and drive informed decision-making across the organization.

## Stakeholders

For this week, you have two internal [stakeholders](https://www.investopedia.com/terms/s/stakeholder.asp).

<StakeholderBio name="Graham Harlock" role="Director of Sales (USA)" imageFilename="graham_harlock">

Graham's current focus is on winning new US-based clients for H&L. To that end, he's on a week-long sales tour of the US, visiting various potential clients (both airlines and airports) and ending by attending _AirCon_, a yearly convention held in Sedona, Arizona.

He relies on the analytics team to identify potential sales opportunities and provide him with background information for pitches.
</StakeholderBio>

<StakeholderBio name="Eve Chen" role="Senior Data Analyst" imageFilename="eve_chen">
Eve is the lead for the new data warehouse project, managing the analysts who will work with it and the engineers who are still adding data. Her main priority is data quality and cohesion: for the warehouse to be useful, it needs to be reliable and consistent.

Eve has also been made - against her wishes - AI adoption lead for the company, and is responsible for ensuring that the analytics team are using AI tools effectively and appropriately. She's unsure of the benefits of AI and is a little resistant to using it, but she's trying her best to get on board with it.
</StakeholderBio>

:::ai-suggestion Keep in Contact

Throughout this project, you should keep in contact with stakeholders using the [Stakeholder Communication tool](https://tools.sigmalabs.co.uk/tools/stakeholder-communication?caseStudyId=Data-Analysis-Fundamentals-1). 

You can ask questions, give updates, and get feedback on your work, all of which will help ensure you're moving in the right direction.

:::

## Your Role

As a member of H&L's analytics team, you have two primary responsibilities:

1. To manage H&L data, ensuring that it is consistent, complete, and up-to-date
2. To carry out analysis as requested by other teams, providing key insights and supporting company projects with research
3. Report back on how AI tools are being used within the team, and encourage their adoption where appropriate

While Graham is in the US, you've been asked to be his point of contact on the team, carrying out any analysis required for his various meetings.

When not supporting Graham, you'll be working with Eve, making a series of improvements to the data warehouse and ensuring that future analysis is a smooth experience.

## The Data

The [Federal Aviation Agency (FAA)](https://www.faa.gov/) provides a huge amount of information on the US air industry, but this data isn't particularly easy to work with; it consists of many disparate datasets all focused on different areas and using different conventions/codes. If the data was more easily accessible/comparable, it would be immensely valuable, particularly to a company like H&L.

H&L has recently created a [data warehouse](https://aws.amazon.com/redshift/) that will (eventually) store all of the FAA's data in a consistent and consistently-updated format, allowing the analytics team to quickly surface actionable insights about the commercial US air industry.

The warehouse is currently a work in progress: it only contains a sample of the available data, and there are lots of data integrity issues that need resolving. In a few years, analytics using this warehouse will hopefully be a smooth affair, but right now, this is what you've got to work with.

In order to support Graham's work in the US, you'll need to

- Improve the warehouse, putting it into a usable, clean, and consistent state
- Investigate data questions in depth, as required by Graham and the wider H&L organisation

:::warning Warning!

**Be aware of your time**. These next two weeks will feature much more open questions that have no definitive answer. _This is expected_ and is similar to what data analysts experience in real life.

**Do not spend too much time on any given challenge**. Sometimes _good enough_ is better than _perfect_.

:::

## Technical Stack

For this project, you'll be using the following technologies:

- **AWS Redshift** as the data warehouse solution
- **`psql`** as a command-line client for the data warehouse
- **DBeaver** as a database management tool
- **GitHub** for version control and code storage
- **Google Workspace** for email and document creation

**You will not need to use Python for any of this week's tasks.**

Additionally, you'll be using AI tools to assist you in writing SQL queries and extracting insights from the data. This is part of H&L's commitment to being an AI-native company, and it's expected that you'll leverage these tools to enhance your productivity and the quality of your analysis. This doesn't mean using AI to do the work for you, but it means using AI as a flexible part of your toolset, helping accelerate you through complex tasks.