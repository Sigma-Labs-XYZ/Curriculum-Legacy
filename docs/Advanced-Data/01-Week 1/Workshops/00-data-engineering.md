---
objectives:
  [
    'List the responsibilities across data roles (Data Engineering, Data Analysis, Data Science, Data Governance)',
    'Explain the concept of ETL and data pipelines',
    'Extract data from an S3 bucket',
    'Understand how different data roles collaborate on data projects'
  ]
module: Advanced-Data
week: 1
workshop: true
title: 'Exploring Data Roles'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

### 1. Research: Case Study

The next two weeks of the course are focused on meeting the requirements of a single case study. Take the time now to get familiar with the context you'll be working within.

:::info Task

Read the case study carefully.

- What questions do you have?
- What issues do you anticipate?

:::

### 2. Prepare to Present

As we begin the Advanced Data section of the course, it's important to understand the various roles that work with data and how they collaborate.

:::info Task

Prepare a short presentation (5-6 minutes) on the key findings from your research on data roles. Focus on:

- The main responsibilities of the role
- How this role collaborates on data projects
- An example of a project this role might work on

The role you should research should be based on the **first** character of your **last** name:

- A-F: Data Engineering
- G-L: Data Analysis
- M-R: Data Science
- S-Z: Data Governance

So if my name was "Gary Owen", I would research Data Science.

Some notes for your presentation:

- Please present using your own words, not just reading from documents found online
- Use simple language, that we can all understand
- Contextualise within our current understanding of data roles

One person from each group will be chosen at random to present their findings.

:::

## Workshop

<LockedContent password="ownership">

### Advanced Data Roles Overview

**Explain** that Advanced Data encompasses multiple specialized roles that work together to extract value from data.

**Discuss** how these roles collaborate on data projects and each contributes unique skills.

### Presentations

**Choose** a trainee from each group to present their findings on the data role they researched.

### Data Engineering

**Ensure** that the core responsibilities of a data engineer are covered:

- **Infrastructure & Pipeline Development**: Building and maintaining data pipelines that move, transform, and store data
- **Data Architecture**: Designing scalable systems for data storage and processing
- **Data Integration**: Connecting various data sources and ensuring smooth data flow
- **Performance Optimization**: Ensuring data systems run efficiently at scale
- **Data Quality**: Implementing systems to monitor and maintain data accuracy

**Emphasise** a focus on reliability, maintainability, and reusability. Trainees should be striving to build well-structured, professional pipelines at all times.

### Data Analysis

**Ensure** that the core responsibilities of a data analyst are covered:

- **Data Exploration**: Investigating datasets to understand patterns and trends
- **Business Intelligence**: Translating data into actionable business insights
- **Reporting & Visualization**: Creating dashboards and reports for stakeholders
- **Statistical Analysis**: Applying statistical techniques to answer business questions
- **Stakeholder Communication**: Presenting findings to non-technical audiences

**Emphasise** that analysts focus on extracting **insights** that drive business decisions.

### Data Science

**Ensure** that the core responsibilities of a data scientist are covered:

- **Predictive Modelling**: Building models to forecast future outcomes
- **Machine Learning**: Developing algorithms that learn from data
- **Statistical Modelling**: Creating mathematical models to understand relationships in data
- **Hypothesis Testing**: Designing experiments to validate assumptions
- **Advanced Analytics**: Using sophisticated techniques to solve complex problems

**Explain** how data science differs from analysis by focusing on prediction and automation rather than just description.

### Data Governance

**Discuss** the core responsibilities of data governance specialists:

- **Data Policy**: Establishing rules and standards for data usage across the organization
- **Data Quality Management**: Ensuring data meets defined standards for accuracy and completeness
- **Compliance & Security**: Managing data privacy, regulatory compliance, and access controls
- **Data Cataloguing**: Maintaining inventories of data assets and their lineage
- **Risk Management**: Identifying and mitigating data-related risks

**Emphasise** that governance ensures data is trustworthy, secure, and used responsibly.

### This Week's Case Study

**Ask** trainees to explain what they're being asked to do.

**Correct** any misconceptions.

**Emphasise** the importance of understanding the _purpose_ of a project at all times: who will this benefit? Why is this the best solution?

### Challenge: Project Justification

**Set** the stage: trainees have a meeting with [Rita Pelkman](../01-case-study.md), a key stakeholder and project sceptic who wants to understand how this project benefits the organization from multiple perspectives.

**Refer** trainees to return to the problem-solving frameworks they have been introduced to in PHP workshops.

**Challenge** trainees to _justify_ the project to Rita

**Grant** trainees 5-7 minutes in quads to discuss

**Share** insights with the larger group.

### S3

**Introduce** `Boto3` and the idea of object storage solutions.

**Show** the UI interface for an S3 bucket, but stress that this is not how we'll normally interact with S3.

**Use** the `sigma-resources-goat` bucket for this demo.

**Walk** through the process of listing S3 buckets and the objects within them.

**Instruct** trainees to get and store their own IAM credentials.

**Emphasise**, more than seems necessary, the importance of handling IAM credentials carefully.

**Live code** the following example

```python

from dotenv import dotenv_values
from boto3 import client

if __name__ == "__main__":

config = dotenv_values()

s3 = client("s3", aws_access_key_id=config["ACCESS_KEY_ID"],
            aws_secret_access_key=config["SECRET_ACCESS_KEY"])

print(s3.list_buckets())

```

**Challenge** trainees to:

> - List all buckets names on our S3
> - Get access to the a single bucket
> - Download all the files in the bucket

**Use** the code below as a scaffold

```py
from dotenv import dotenv_values
from boto3 import client

if __name__ == "__main__":

config = dotenv_values()

s3 = client("s3", aws_access_key_id=config["ACCESS_KEY_ID"],
            aws_secret_access_key=config["SECRET_ACCESS_KEY"])

for b in s3.list_buckets()["Buckets"]:
    print(b["Name"])

bucket = s3.list_objects(Bucket="sigma-resources-goat")

for o in bucket["Contents"]:
    s3.download_file("sigma-resources-goat", o["Key"], f"./data/{o['Key']}")

#   s3.upload_file("new_file.jpg", "sigma-de-example", "6.jpg")
```

### Organisation

**Show**, briefly, the [coursework repository](https://github.com/Sigma-Labs-XYZ/Coursework-Advanced-Data-Week-1), and encourage them to structure/organise their code effectively.

**Highlight** that they should be placing code in the most relevant folder.

**Remind** them that organisation is the avoidance of long-term issues for the price of a little extra initial time.

</LockedContent>
