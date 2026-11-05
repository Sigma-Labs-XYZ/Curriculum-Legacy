---
title: Streamlit
objectives:
  [
    'Visualise data using common Python libraries (e.g. `plotly.express`)',
    'Use a range of visualisation types',
    'Visualise and present data using Streamlit',
    'Use Streamlit to create interactive visualisations',
    'Create analytics dashboards using Streamlit'
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

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Streamlit
```

### StreamLit

:::info Task

Read through the StreamLit documentation

> https://docs.streamlit.io/

and install it

> https://docs.streamlit.io/get-started/installation

:::

:::info Task

Build a simple StreamLit dashboard using the following dataset:

> [rabbits.csv](https://sigma-resources-public.s3.eu-west-2.amazonaws.com/datasets/rabbits.csv)

It should

1. Import the data using Pandas
2. Have a title on the page using `st.title()`
3. Display a key statistic using `st.metric()`
4. Display a bar chart of the data using `st.bar_chart()`
5. When run, you should see all of those in the browser

:::

### Submission

:::info Submission
Please share a screenshot of your design in the Slack thread.
:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Remind** trainees that they've already used _Tableau_, a low-/no-code dashboarding tool.

**Introduce** Streamlit: a Python-based dashboarding tool. Discuss the trade-offs in accessibility and control, noting that Streamlit is designed to be a quick, intuitive tool for _people who already know Python_.

### Streamlit

**Install** `streamlit` as a Python library (`pip3 install streamlit`).

**Create** a `main.py` file with a dashboard stub in it:

```python
import streamlit as st  # conventional import

if __name__ == "__main__":

    st.write("Hello, World!")
```

**Run** `streamlit run main.py` and show the created dashboard running in the browser.

**Show** some of the different options: `st.title()` and `st.markdown()` are good options to display information in a specific way.

**Discuss** `st.write(x)`; it is the 'swiss army knife' all of the Streamlit commands. It can display markdown and almost every datatype, including charts and figures.

**Note** the "rerun" and "always rerun" buttons to aid development.

**Direct** trainees towards the [documentation](https://docs.streamlit.io/) to see the vast number of things Streamlit knows how to display.

### AWSWrangler

**Introduce** trainees to the [AWSWrangler library](https://pypi.org/project/awswrangler/)

**Explain** that AWSWrangler is written by AWS as a software development kit for pandas

**Show** how simple it is to use

```py
import awswrangler as wr
import pandas as pd

df = wr.athena.read_sql_query("SELECT * FROM students_input", database="[your_database]")

df.sample(10)
```

**Note** that AWSWrangler integrates with the AWS CLI, so trainees don't need to pass in any credentials to the wrangler library

**Display** a key statistic using `st.metric()`:

```python
st.metric("Number of students", df["student_id"].nunique())
```

**Highlight** that each `st.` call runs in sequence, so earlier calls display first on the page.

**Stress** that they can do anything in Streamlit that they can also do in Python; Streamlit is the _display_ tool here, but all Python code (e.g. database connections, data cleaning, API calls) will still work.

### How it works

**Explain** to trainees how Streamlit works

> Streamlit works by translating python script into HTML, CSS and JS
>
> Streamlit uses a render loop. When run, the script is executed as normal. Once the user makes a change (e.g., presses a button), the script runs again with the new information

### Visualisation

**Introduce** `st.bar_chart()` and create a simple visualisation:

```python
st.bar_chart(df["most_used_platform"].value_counts())
```

**Note** that Streamlit's default charts are built on top of `altair` charts, and so further customisation is very possible.

**Note** that Streamlit has a built-in `st.altair_chart` for altair charts

### Filters

**State** that a core part of any dashboard are the user controls; without that, it's just a lot of visualisations next to each other.

**Demonstrate** a `selectbox`:

```python
relationship_statuses = df["relationship_status"].dropna().unique()

selected_values = st.multiselect("Relationship Status", relationship_statuses,
                                  default=relationship_statuses)
```

**Demonstrate** the use of `st.sidebar` to shift the control (or anything else) out of the main flow:

```python
  selected_values = st.sidebar.multiselect("Relationship Status", relationship_statuses,
                                            default=relationship_statuses)
```

**Direct** trainees to the [input documentation](https://docs.streamlit.io/library/api-reference/widgets) so they can see the vast number of options available to them for different types of control.

### Caching and Session state

**Remind** trainees that the script runs every time a change is made

**Demonstrate** this with a print statement in the `load_data` function

```py
def load_data() -> pd.DataFrame:
  print("Loading data")
  df = wr.athena.read_sql_query("SELECT * FROM students_input", database="[your_database]")
```

**Ask** trainees why this is inefficient

> The dataset is being read every time the script is run. If this were a paid API, it would cost more money than it should.

**Introduce** `st.session_state` that keeps track of the data

```py
def load_data() -> pd.DataFrame:
  if "student_data" in st.session_state:
    print("Using cache data")
    return st.session_state.student_data
  print("Loading data")
  return wr.athena.read_sql_query("SELECT * FROM students_input", database="[your_database]")
```

**Demonstrate** that this is grabbing cached data

**State** that sometimes it is best to explicitly cache the data, especially if there are multiple data sources

```py
def load_data() -> pd.DataFrame:
  if "student_data" in st.session_state:
    print("Using cache data")
    return st.session_state.student_data
  print("Loading data")
  data = wr.athena.read_sql_query("SELECT * FROM students_input", database="[your_database]")
  st.session_state.student_data = data
  return data
```

**Introduce** `st.cache_data` as an alternative

```py
@st.cache_data
def load_data() -> pd.DataFrame:
#   if "student_data" in st.session_state:
#     print("Using cache data")
#     return st.session_state.student_data
  print("Loading data")
  return wr.athena.read_sql_query("SELECT * FROM students_input", database="[your_database]")
```

**Direct** trainees to [the documentation](https://docs.streamlit.io/develop/concepts/architecture/caching) for more information

### Challenge

**Direct** trainees to complete this challenge individually.

**Challenge** trainees to create a new dashboard using the [happiness indicators dataset](https://eu-west-2.console.aws.amazon.com/s3/buckets/sigma-resources-happiness-index?region=eu-west-2&bucketType=general&tab=objects) from the previous workshop

**Tell** trainees to include the following:

- Caching
- Visualisation
- Filtering

### Conclusion

**Remind** trainees that, as always, this has been an _introduction_ to the tool, and not an exhaustive exploration of Streamlit. They'll need to spend time researching and experimenting to get comfortable with it.

**Encourage** them to do so.

</LockedContent>
