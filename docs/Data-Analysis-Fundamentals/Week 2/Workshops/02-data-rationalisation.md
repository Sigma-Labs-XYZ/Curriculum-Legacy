---
title: Data Rationalisation
objectives:
  [
    "Identify and resolve data quality issues (e.g. missing/inaccurate values, inconsistent labelling) using Python & Pandas",
    "Read data from common storage options (.csv, .tsv, relational databases)",
    "Validate data against a provided standard",
    "Rationalise disparate datasets together"
  ]
module: Data-Analysis-Fundamentals
week: 2
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Data Rationalisation
```

### Explore

:::info Task

Connect to the data warehouse and refresh your memory of the `ticket` schema. 

- What tables are included? 
- How do they relate to one another?

:::

### Investigate

:::info Task

Download the [events archive](https://sigma-resources-public.s3.eu-west-2.amazonaws.com/datasets/events.zip) and examine it.

- What issues do you notice? 
- What can you work out about the columns? 
- Are there any issues with the data? 
- How does it relate to the `ticket` schema?

:::

## Workshop

<LockedContent password="ownership">

### Data Rationalisation

**Explain** that moving and combining datasets is a frequent challenge for organisations.

**State** that **data rationalisation** is the process of ensuring that two distinct datasets are compatible before joining them together.

**Discuss** some situations in which organisations might need to combine/convert data:

- Migrating data from an outdated legacy system into a new one
- Combining two sets of customer information after a merger
- Adding newly-collected data (e.g. from a survey) into an existing store
 
**Ask** trainees what problems might be encountered doing any of the above.

- Mismatched columns/types
- Inconsistent encoding
- Missing or erroneous values
- Missing or erroneous columns
- Columns that don't have names 
- etc

### Events data

**Ask** trainees for their impression of the [events archive](https://sigma-resources-public.s3.eu-west-2.amazonaws.com/datasets/events.zip).

**Explain** that these files contain data intended for the `ticket.event` table, but right now, they're not in the correct format.

**Clarify** that we're going to use this data to walk through a simple data rationalisation workflow to demonstrate the process.

**Note** that there are two files with the same format here; we can use one to build the process, and one to check that it works.

**Load** one of the data files into Pandas.

**Highlight** the necessity of adding the `sep="\t"` argument, as this file is tab-separated rather than comma-separated.

**Demonstrate** that adding `header = None` also ensures that we don't lose the first row of data.

```py
import pandas as pd
from redshift_connector import connect

def load_events(filename: str) -> list:
    return pd.read_csv(filename, sep="\t", header=None)
```

**State** that the warehouse is our authoritative destination, so we need to change/update the `.csv` data to match it.

**Ask** trainees what changes need to be made to the data in the `.csv` before it can be added to the `events` table.

- Add column names
- Remove unwanted columns
- Removing bad values
- Fix formatting issues
- Convert `category` to an ID value

**Ask** a trainee to suggest what our column names should be. They should understand that they need to match Redshift exactly in terms of formatting.

```py
def add_column_names(df: pd.Dataframe) -> pd.Dataframes:
    df.columns = ["id", "eventname", "dateid", "eventid",
                  "categoryid", "duration", "eventstart"]
    df["eventstart"] = pd.to_datetime(df['eventstart'])
    return df
```


**Get** a trainee to walk you through the process of dropping all unwanted columns and rows with bad values by adding to this function.

```py
def add_column_names(df: pd.Dataframe) -> pd.Dataframes:
    df.columns = ["id", "eventname", "dateid", "eventid",
                  "categoryid", "duration", "eventstart"]
df = df.drop(columns=["id", "duration"])
    return df
```

### Rationalising categories

**Create** a database connection and demonstrate a simple query.

```py
def get_db_connection():
    return connect(host="...",
                   user="...",
                   password="...",
                   database="dw_air_travel",
                   port=5439)

conn = get_db_connection()
```

**State** that the `.csv` files do not store category information in the same way as the data warehouse. We'll need to update the file to use the same method.

**Warn** against doing this row-by-row, as it is inefficient.

**Work** through the process of developing a function that gets a mapping from the database for easy, efficient substitution.

```py
def get_category_mapping(conn) -> dict:
    """Returns a mapping of category names and DB IDs."""

    with conn.cursor() as cur:
        cur.execute("SELECT catname, catid FROM events.category;")
        data = cur.fetchall()

    mapping = {}
    for row in data:
        mapping[row[0]] = row[1]

    return mapping
```

**Note** that creating a mapping like this means that we can solve a complex problem in one query (and a bit of Python). 

**Task** trainees to use the above function and its result to replace all `category` values with the correct IDs.

**Discuss** what to do with any mismatches (remove them).

### Challenge

**Challenge** trainees to write code that uploads the first hundred rows of data to their `events` tables.

**Suggest** that trainees check how robust their code is by trying to run it against the other file as well; does it still function without error?

### Conclusion

**Congratulate** trainees on a successful data rationalisation process.

**Discuss** different approaches to the task.

</LockedContent>
