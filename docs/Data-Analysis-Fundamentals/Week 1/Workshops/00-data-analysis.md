---
title: Data Analysis
objectives:
  [
    'Extract insights from unfamiliar datasets',
    'Connect to a Redshift data warehouse from the command line',
    'Connect to a Redshift data warehouse using a database management tool',
    'Explain the benefits of using a data warehouse',
    'Explain the responsibilities of a data analyst',
    'Query a database using Redshift SQL',
    'Navigate an unfamiliar database'
  ]
module: Data-Analysis-Fundamentals
week: 1
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

# Data Analysis

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Data Analysis
```

### Prepare: Data Analysis

As we begin the Data Analysis section of the course, it's a good idea to get to grips with what exactly that means.

:::info Task

Read the Overview for this module carefully ([find it here](/Data-Analysis-Fundamentals/01-overview.md))

:::

### Research: Data Analysis

:::info Task

Find answers to the following questions:

- What is a data analyst?
- What are the key responsibilities of a data analyst?
- What kind of project might a data analyst work on?

:::

### Research: Case Study

The next two weeks of the course are focused on meeting the requirements of a single case study. Take the time now to get familiar with the context you'll be working within.

:::info Task

Read the [Case Study](/Data-Analysis-Fundamentals/Week%201/case-study) carefully.

- What questions do you have?
- What issues do you anticipate?

:::

## Workshop

<LockedContent password="ownership">

- If you haven't already, [make sure you send the message here in slack about communicating with clients](/Data-Analysis-Fundamentals/Week%201/overview)

## Part 1 - DAF Context (20 mins)

### Data Analysis

**Discuss** the core responsibilities of a data analyst.

- **Data Collection and Cleaning:** Gathering data from various sources and cleaning it to ensure it is accurate and ready
  for analysis.
- **Data Analysis:** Applying statistical techniques and using software tools to analyse and interpret complex datasets.
- **Data Visualisation:** Creating charts, graphs, and other visual aids to present data findings clearly and concisely.
- **Reporting:** Preparing reports that summarise key findings and insights from the data analysis.
- **Collaboration:** Working with other teams or departments to understand their data needs, provide insights, and
  support decision-making processes.
- **Data Governance and Security:** Ensuring that all data handling complies with regulatory requirements and best
  practices for data security and privacy.

Finally, highlight this one in particular

- **Provide insights:** Providing actionable insights that drive strategic business decisions. Their job is not to find facts, it's to provide **insights**

**Ask** the trainees what mindset a data analyst must have - e.g., what do they need to do to succeed?

- **Business Focus**: As data analysts, your role is to solve business problems. You should be constantly aware of the
  needs of your stakeholders and work towards solving those goals
- **Curiosity**: Always ask questions and actively seek out answers. Be eager to explore data and uncover hidden patterns
  or insights
- **Analytical Thinking**: Develop strong analytical skills to interpret data and make sense of complex information.
  Focus on understanding problems deeply and finding the best solutions
- **Attention to Detail**: Meticulously check data integrity, accuracy, and completeness. Pay attention to small details that
  can significantly impact the analysis outcome
- **Open-mindedness**: Be receptive to new ideas and perspectives. Stay flexible when exploring different analytical approaches
  or methodologies

**Explain**, explicitly, that trainees will be successful this week if they use this mindset and approach their tasks with this in mind.

### The Case Study

**Ask** trainees to explain what they're being asked to do. (**Think-Pair-Share** is good here if you have time)

**Correct** any misconceptions.

**Question** the trainees to explain what the **problem**, **solution** and **outcome** are for the case study

- **Problem:** H&L need to secure new clients in the US Aviation industry
- **Solution:** Utilise and analyse the information in the data warehouse to pinpoint business opportunities and give insight to Graham so he can convince these companies to buy into our product
- **Outcome:** Successfully developed a robust data warehouse infrastructure that supports efficient data analysis and reporting, enabling H&L to identify potential business opportunities and create more impactful client proposals, thereby supporting strategic sales initiatives such as Graham Harlock’s U.S. sales tour.

**Emphasise** the importance of understanding the _purpose_ of the case study

- Who will this benefit?
- Why is this the best solution?

### Working with Stakeholders

**Explain** that from this week on, trainees will be working on a case study that simulates real-world data analysis projects, and they'll need to work with stakeholders to understand requirements and deliver insights.

**Introduce** two main ways of working with stakeholders during this project:

1. Client Engagement Sessions
2. Client Channel on Slack

**Direct** trainees towards the message in #general with more detail.

---

## Part 2 - Data Warehouses & ERDs (40 mins)

### Data Warehouses

**Define** data warehouses as a structured storage solution optimised for analysing large amounts of data.

**Introduce** AWS Redshift as the warehouse technology trainees will be using in this module.

**Explain**, _briefly_, why a Data Warehouse is a good choice for large scale analytics:

- **Distributed**: instead of being run on a single machine, Data Warehouses typically share work/storage across a **cluster**
- **Scalable**: when more storage/compute is required, the cluster can have new nodes added to it easily, scaling horizontally
- **Columnar** by default: Data Warehouses store the underlying data grouped by column rather than by row. This makes it faster to run analytics queries (`SELECT SUM(total) FROM transactions`), as these can load a only the data required, but slightly slower for write operations.

### Connecting to Data Warehouses

**Introduce** DBeaver as a tool that lets you connect to a range of different database technologies.

**Open** DBeaver and demonstrate how to connect to [Redshift](https://dbeaver.com/docs/dbeaver/Database-driver-Amazon-Redshift/). (**Note**: in addition to providing all the connection details in the `Main`, you'll also need to switch `Use SSL` on in the `SSL` tab.)

**Tour** briefly around the interface, demonstrating the query window and the information held in the sidebar.

**Demonstrate** writing familiar SQL in DBeaver:

```sql
SELECT * FROM flight LIMIT 10;
```

**Caution** that there are differences between Redshift SQL and Postgres SQL; part of the _fun_ is discovering them.

**Share** the [documentation](https://docs.aws.amazon.com/redshift/latest/dg/r_SHOW.html) and encourage trainees to use it.

### Exploring an Unfamiliar Data Warehouse

**Explain** that navigating an unfamiliar data warehouse (or any other type of data store) is a key skill that is required all too frequently.

**Show** the **SHOW** command as a way to get a handle on what's in a database without outside information.

```sql
SHOW SCHEMAS;
```

**Explain** that the `ticket` schema contains data from an event booking site that has recently come under new ownership. Due to _total incompetence_ on the part of the previous owners, the data incomplete, unreliable, and poorly-documented.

**Work** through the process of building an initial ERD for the `ticket` schema using [DrawSQL](https://drawsql.app). Get trainees to suggest next steps/details as much as possible.

- Identify a table (`event` is the smallest)
- Examine it to get column names/types (`SHOW TABLE event;`)

**Flag** that the aim here is not to understand every single thing it is possible to understand about the database; it's to get enough knowledge to be effective.

### Challenge

**Divide** trainees into small groups.

**Challenge** each group to extend the ERD for the other columns.

**Gather** trainees back together when only a little time (< 5 minutes) remains.

**Ask** trainees what they have learnt about it (e.g. potential relationships between tables, quality of data)

**Ask** trainees what the database is for, accepting all reasonable suggestions.

### DBeaver Troubleshooting

**Reserve** the final 5–10 minutes to ensure every trainee has DBeaver installed and connected before the next workshop. Time spent here saves the afternoon session from being frontloaded with setup issues.

**Ask** trainees to raise their hand if they had any difficulty installing DBeaver or connecting it to the data warehouse.

**Work** through the most common issues with the group:

<details>
  <summary>Cannot connect to Redshift</summary>

- Confirm the **host URL**, **port** (`5439`), **username**, and **database name** are all entered correctly under the `Main` tab.
- Switch to the **SSL** tab and ensure **Use SSL** is turned **on**.
- Check that your internet connection is active and that no VPN or firewall is blocking port 5439.

</details>

<details>
  <summary>Driver missing or fails to load</summary>

- When prompted, allow DBeaver to download the Redshift JDBC driver automatically.
- If the automatic download fails, go to **Database → Driver Manager**, find **Amazon Redshift**, and click **Download / Update**.

</details>

<details>
  <summary>DBeaver failed to install</summary>

- Confirm you downloaded the **Community Edition** from [dbeaver.io/download](https://dbeaver.io/download/).
- On **macOS**: if a security warning appears, go to **System Preferences → Security & Privacy** and click **Open Anyway**.
- On **Windows**: try running the installer as Administrator (right-click → Run as administrator).

</details>

**Ensure** every trainee has a working DBeaver connection to the Redshift data warehouse before ending the session.

### Conclusion

**Explain** that this exploratory, iterative process is the best way to build up an understanding of an unfamiliar space.

**Counsel** that trainees will need to follow a similar process in the challenges.

</LockedContent>
