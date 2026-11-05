---
title: 'Athena and Glue'
objectives:
  [
    'Read data into Python from a variety of file formats',
    'Clean and format data using `pandas`',
    'Collate datasets together using Pandas',
    'Visualise data using common Python libraries (e.g. `plotly.express`)',
    'Use a range of visualisation types',
    'Select and justify a visualisation type for a specific purpose',
    'Use AWS Glue to to build schemas for data lakes',
    'Use AWS Athena to query data lakes'
  ]
module: Advanced-Data
week: 3
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

No pre-work as this is an afternoon workshop

## Workshop

<LockedContent password="ownership">

## Setup

- Ensure that an S3 bucket named `sigma-resources-student-dataset` exists
- Delete and crawlers and Athena databases associated with this dataset

## Athena and Glue

**Prompt** trainees to think about the following metaphor:

> Imagine yourself as a child again, ready to go to school. You have a rucksack full of everything you need for the entire day, shoved in using the typical manner - everything everywhere all at once. Once you are at school, your teacher tells you, "Take out your pencil and notebooks. You have 5 seconds." You feverishly rush to find your things. If only there was a way to organise your disorganised dumping ground of _things_.

**Ask** trainees, now that they are _marginally_ older, how they might approach this problem.

> I would use the different pockets in my rucksack to organise my things. This means I would know where to find each item before I looked.

**Explain** to trainees that this is _generally_ how Athena and Glue works.

> Given an S3 bucket with multiple files and directories (e.g., rucksack pockets), Glue memorises the general location of each item. Athena, then uses this information to query it.

**Navigate** to the [student dataset](https://eu-west-2.console.aws.amazon.com/s3/buckets/sigma-resources-student-dataset?region=eu-west-2&bucketType=general&tab=objects) on AWS

**Explore** the directory, highlighting the syntax of the partitions (`column=value`)

> Each directory in my input bucket will become a table. For now we only have one table. This table is _partitioned_ by department and sub-department. The actual parquet files do not have columns for these, but Athena will interpret them as columns. This allows for us to essentially remove entire columns from the data and store them in the filepaths themselves. However, Athena _expects_ this to be formatted in this exact way (`column_name=value`, no spaces)

**Download** one of the parquet files

**Highlight** that parquet files cannot be opened normally, but can be opened using the `pandas.read_parquet()` function

**Open** a Jupyter notebook and install the required libraries

```sh
pip install ipykernel pyarrow pandas
```

**Read** the parquet file and display some of the data

```py
import pandas as pd

data = pd.read_parquet("students.parquet")

data.sample(10)
```

**Move** on quickly to the AWS Glue page

**Click** on the crawlers section and select `Create crawler`

**Explain** each step as you create it

> First I need to set the name of the crawler, which should follow our naming conventions
>
> Secondly, I need to choose my data source, which is not already mapped yet. Thankfully, when I add a data source, I can browse my s3 buckets, and select the students-input folder
>
> Thirdly, I will create a new role, which will give me the permissions needed
>
> Finally, I need to create a new Athena database. I can also set a crawler schedule, but for now let's keep it as on demand

**Run** the newly generated crawler, which will take around a minute to run

**Explain** what the crawler is doing as it runs

> The crawler is moving through each subdirectory in the input bucket and reading the files, and creating a table for all of the columns that match each other.

**Navigate** to Athena to inspect the results of the crawler

**Change** the query result location using the `Settings` tab to the `students-output` bucket

> The results of the queries I make in this editor will now be stored in this bucket

**Show** the results of a basic query and that the Department and Sub_Department have been added back into the query results

## Task

**Task** trainees, in pairs, to create a crawler and Athena database for the [happiness indicators dataset](https://eu-west-2.console.aws.amazon.com/s3/buckets/sigma-resources-happiness-index?region=eu-west-2&bucketType=general&tab=objects)

</LockedContent>
