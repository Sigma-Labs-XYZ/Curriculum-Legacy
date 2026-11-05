---
title: Pandas
objectives:
  [
    'Read data from common storage options (.csv, .tsv, relational databases)',
    'Identify and resolve data quality issues (e.g. missing/inaccurate values, inconsistent labelling) using Python & Pandas',
    'Summarise data using Python & Pandas',
    'Write Python & markdown inside Jupyter notebooks',
    'Validate data against a provided standard',
    'Extract insights from unfamiliar datasets',
    'Summarise data using measures of central tendency (i.e. mean, median, and mode)'
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
/prework Pandas
```

### Set up Jupyter Notebooks
 
You'll be using Jupyter Notebooks for the rest of this week. Get them working **now** so the workshop isn't spent debugging installation issues.


:::info Task
 
**1.** Work through the [Aside: Jupyter Notebooks](../03-aside-jupyter-notebooks.md) page. This covers what notebooks are, how to install the VS Code extensions, and how cells work.
 
**2.** Install the Python packages you'll need. Make sure your `.venv` is activated, then run:
 
```
pip install ipykernel pandas
```
 
**3.** Verify everything works. Create a file called `test.ipynb` **in the same directory as your `.venv`** (or in any subdirectory of it — the important thing is that `.venv` is at the same level or higher). 
 
Select your `.venv` as the kernel (top right of the notebook), and run this in a code cell:
 
```py
import pandas as pd
print(pd.__version__)
```
 
You should see the pandas version printed below the cell. If the kernel doesn't show your `.venv`, make sure `.venv` is at the top level of the folder VS Code has open. Delete the test notebook once confirmed.
 
:::
 
:::warning
 
If you can't get the notebook running, post in the Slack thread with a screenshot of your error and we'll sort it before the workshop. Remember to tag @SigmaBot and give us as much information as possible so that we can resolve any issues as quickly as possible.
 
:::


### Research - Pandas

:::info Task

**1.** Research the `pandas` Python library. What is it used for?

**2.** Download [this csv file ](https://sigma-resources-public.s3.eu-west-2.amazonaws.com/daf-workshops/regional_box_office_data.csv)of ticketing data from a regional ticketing office and explore it.


```py
import pandas as pd

# Use pandas to load in the data set.
events = pd.read_csv("regional_box_office_data.csv")
```

Use the data to explore the following methods and operators:

- `events.describe()`
- `events.info()`
- `events.apply()`
- `pd.to_datetime()`
- `pd.to_numeric()`
- `.dt`

**3.** What are some issues you see with the data? What might make this a hard data source to work with?

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Jupyter Notebooks Introduction

**Explain** that before diving into pandas, trainees need to understand their working environment - Jupyter Notebooks

**Tell** trainees that Jupyter Notebooks are an interactive computing environment that allows you to combine code, text, and visualizations in a single document. Explain that `ipynb` stands for Interactive PYthon NoteBook.

**Demonstrate** how to:
- Create a Jupyter Notebook in VScode
- Navigate the interface: toolbar, menu, cells
- Understand cell types: Code cells vs Markdown cells

**Explain** how the *kernel* works in notebooks at a high level (essentially that it stores variables and defines the current version of python being used), and that your `.venv` file will only appear in the kernels if it is at the top level of the directory that the jupyter notebook is in within VScode.

**Show** trainees the basic operations:

```
# Press Shift+Enter to run a cell
# Press Enter to edit a cell
# Press Esc to exit edit mode
```

**Demonstrate** key keyboard shortcuts:
- `Shift + Enter`: Run cell and move to next
- `Ctrl + Enter`: Run cell and stay in current cell
- `A`: Insert cell above (in command mode)
- `B`: Insert cell below (in command mode)
- `M`: Convert cell to Markdown
- `Y`: Convert cell to Code

**Show** how to write basic Markdown in cells:
```markdown
# This is a heading
This is regular text
**This is bold text**
- This is a bullet point
```

**Explain** that notebooks are perfect for data analysis because you can:
- Run code step-by-step and see immediate results
- Document your analysis with explanatory text
- Keep your data, code, and insights all in one place
- Easily share your work with others

**Tell** trainees that they'll be using Jupyter Notebooks extensively for the pandas work, and that understanding this environment will make their data analysis much more effective

**Explain** Best practices in Jupyter notebooks are:

- Use markdown cells to justify code blocks, especially useful in the context of data analysis
- Abstract the data analysis functions to other files and import them so that they don't clog up the notebook
- Remove lingering print statements or cells that have no purpose - these will clog up the notebook if left unchecked
- A notebook should tell a story, so have narrative at the top of your mind when designing them

### Pandas

**Prompt** questions about the prework

**Explain** that `pandas` is a versatile library for working with _tabular_ data

**Highlight** that `pandas` is a complex tool, with all sorts of useful functionality, and that this workshop is an introduction to the core idea. They'll need to read the Pandas docs to solve many of the problems they'll come across in the week

**Refer** trainees to the [Pandas documentation](https://pandas.pydata.org/docs/) as a kindness

### The Pandas library

**Tell** trainees that they've been provided with acquisition data from a regional box office. It's a messy CSV export that needs cleaning before it can be integrated with the warehouse. Now they're going to load it into Pandas and see what the library can do with it.
 
**Live code** how to load data from the provided CSV file into Pandas

```py
import pandas as pd
events = pd.read_csv("regional_box_office_data.csv")
```

**Highlight** that `pd.read_csv()` is one of Pandas' most useful methods — it can load data from a file, URL, or even a database query result saved as a string.

**Live code** how to find basic metadata on the dataframe

```py
type(events)
events.shape # Shows the shape of the dataframe (rows / columns)
events.columns # Shows the columns a dataframe has
events.dtypes # Shows the datatypes in each column
```

**Show** trainees how to get more information about the data inside of the dataframe

```py
events.info()  # Shows columns, datatypes and number of non-null values
```

**Ask** trainees what is wrong with this data

> Some columns have null values (events with no sales will have `NaN` for `QTY_SOLD`, `Price_Paid`, `Sale_Time`). The `Category_ID` is a number, not a meaningful label on its own. The `Start_Time` and `Sale_Time` might not be parsed as a datetime. These are all things we need to clean.

```py
events.describe()  # Shows statistical data for each numerical column
 
events.head(4)  # Shows first n number of rows (defaults to 5)
events.tail(5)  # Shows last n number of rows (defaults to 5)
events.sample(10)  # Shows n number of random rows (defaults to 1)
```

**Notice** even more issues as we explore these commands:
- The naming convention across all columns is inconsistent.
- The contents of `Event_Name` and `Category_Name` columns are also formatted badly and includes typos.
- Columns such as `Start_Time` and `Sale_Time` aren't the correct data type.
- Other columns don't appear to be particularly valuable to us (e.g. `Internal_Ref `).
- `QTY_SOLD`, `Price_Paid` contain minus numbers.
- There are some very high figures at the max of `Price_Paid`.

**Express** concern that we cannot use this dataset effectively if it is full of nulls, mistyped rows and columns, and badly formatted values

> We need to get this into a state that any analyst can pick up and work with immediately. Let's start with fixing the casing and whitespace issues.

**Show** trainees how to get information from a specific column

```py
events["Event_Name"].nunique()  # Counts the number of unique event names
events["Event_Name"].unique()  # Shows all unique event names as a list 
```

**Point out** that some columns have messy string data — inconsistent casing and whitespace:
 
```py
# Before cleaning, look at the category values and see how the casing issue affects the count of each event.
events["Event_Name"].value_counts(dropna=False).head(10)
```
 
**Show** how to standardise string columns:
 
```py
# Use .title and .strip to fix Event and Category Names
events["Event_Name"]= events["Event_Name"].str.title().str.strip()
```

```py
# Demonstrates the changes values
events["Event_Name"].value_counts(dropna=False)
```

**Ask** the trainees to talk you through doing the same for Category Name.
```py
events["Category_Name"] = events["Category_Name"].str.title().str.strip()
events["Category_Name"].value_counts(dropna=False)
```

**Note** that we have an odd Category name of "Musica" here, and show how to replace this with "Musical".

```py
events["Category_Name"] = events["Category_Name"].replace("Musica", "Musical")
events["Category_Name"].value_counts(dropna=False)
```

**Explain** that `pandas` goes beyond displaying information about a dataframe, it is a powerful tool for data manipulation

> Let's make this data presentable


### Cleaning the data

**Ask** trainees which columns they think are redundant or need fixing by examining their content

```py
events.head()
```
**Live code** dropping columns, underlining that you must reassign if you want the change to persist:
 
```py
events.drop(columns=["NOTES"])
events.columns
 
# Important: pandas returns a copy, the above won't change the original
events = events.drop(columns=["NOTES"])  # Must reassign!
events.columns
```
 
**Highlight** a key principle: Pandas returns copies of data, not references. If you don't reassign, your changes are lost.
 
**Show** an alternative approach:
 
```py
# Instead of dropping, why not just select the columns you want?
select_events = events[['Event ID', 'Event_Name']]
select_events.columns
```


**Explain** that both approaches work, but column selection is often more explicit about what you're keeping.
 
**Live code** all columns to be more readable:
  
```py
# Rename columns using a dictionary
events = events.rename(columns={
    "Event ID": "eventid",
    "Event_Name": "eventname",
    "Start_Time": "starttime",
    "Category_ID":"catid",
    "Category_Name": "catname",
    "QTY_SOLD": "qtysold",
    "Price_Paid": "pricepaid",
    "Sale_Time": "saletime",
    "Cancelled": "cancelled",
    "audience_score": "audiencescore"
})
events.columns
```
 
**Highlight** that the cleaned column names now match the Redshift schema. This is important because eventually, cleaned acquisition data like this would eventuaally be loaded into the warehouse — having the right column names means no confusion during integration.


**Show** the result:
 
```py
events.head()
```

***Ask** the trainees if the work is now done
 
```py
events.info()
```
 
> No — there are null values in `qtysold`, `pricepaid`,and `saletime`. 
 
**Show** how to deal with null values strategically:
 

```py
# For qtysold and pricepaid (no sale = no quantity, no price) — fill with 0
events["qtysold"] = events["qtysold"].fillna(0).astype(int)
events["pricepaid"] = pd.to_numeric(events["pricepaid"], errors='coerce').fillna(0.0)
 ```

 **Demonstrate** that this has taken effect. 

 ```py
events.info()
```

**Demonstrate** that for categorical columns, you might fill with the most common value (mode).

**Explain** that `.iloc[0]` means "integer location 0" — it gets the first element (by position, not by label).

 ```py
# For the audience_score column (categorical string values like "High", "Medium", "Low"), fill missing values with the mode
most_common_score = events["audience_score"].mode().iloc[0]
events["audience_score"] = events["audience_score"].fillna(most_common_score)
 ```


**State**, baldly, that if they're ever tempted to use `.iterrows()` to alter row values, _something has gone wrong_
 
**Demonstrate** to trainees that they can instead use `.map()` and `.apply()` to transform data efficiently
 
```py
# Parse the starttime column into a proper datetime
events["starttime"] = pd.to_datetime(events["starttime"], errors='coerce')

# Parse the saletime column into a proper datetime
events["saletime"] = pd.to_datetime(events["saletime"], errors='coerce')

# For rows with no recorded sale time, fill with approximately one week before the event
events["saletime"] = events["saletime"].fillna(events["starttime"] - pd.Timedelta(days=7))

# Ensure saletime is fully converted to datetime
events["saletime"] = pd.to_datetime(events["saletime"])

# Create a new column showing the day of the week for each event
events["day_of_week"] = events["event_start"].dt.day_name()
```
 
**Show** another example with `.map()` to create a derived Boolean column to show whether a show has had any sales or not
 
```py
# Create a "has_sales" column: True if tickets_sold > 0, else False
events["has_sales"] = events["qtysold"].map(lambda x: x > 0)
events["has_sales"] = events["has_sales"].astype(bool)
```
 
**Show** trainees the datatypes to confirm the new columns
 
```py
events.dtypes
```
 
**Tell** the trainees that the dataset is now clean enough for analysis
 
**Live code** saving the cleaned data as a CSV file
 
```py
saved = events.to_csv("./cleaned_regional_data.csv", index=False)
events.shape
```
 
**Summarise** the following key points
 
- Pandas is designed to work with a wide variety of data formats
- By default, Pandas always works on a _copy_ of the dataframe, leaving the original unaltered
- Iterating through rows in a dataframe is inefficient; Pandas methods should be used instead
- Pandas has a huge number of methods available to complete common cleaning/processing tasks
- We still have some statistical elements that require further investigation, such as the minus figures and zero values that we encountered here. These will be delved into during the Anomoly Detection workshop. 
  

### Challenge
 
**Organise** trainees into pairs
 
**Challenge** each pair to find answers to the following questions
 
> 1. What percentage of events were cancelled?
> 2. Which category of event generated the most total revenue?
> 3. Which individual event name had the most performances (i.e. appears most often)?
>
> For those looking for an extra challenge:
>
> - What day of the week is the most popular for events?
> - What other insights can you extract from this data?
> - What should a stakeholder know?

# Solutions
 
 ```py
# Percentage of events that were cancelled
cancelled_percentage = events["cancelled"].mean() * 100
print(f"Percentage of events that were cancelled: {cancelled_percentage:.2f}%")
 ```

 ```py
# Which category of event generated the most total revenue?
events["revenue"] = events["qtysold"] * events["pricepaid"]
category_revenue = events.groupby("catname")["revenue"].sum()
most_revenue_category = category_revenue.idxmax()
print(f"Category with the most total revenue: {most_revenue_category} (${category_revenue[most_revenue_category]:.2f})")
 ```

  ```py
# Most Performances
most_performances = events["eventname"].value_counts().idxmax()
print(f"Event with the most performances: {most_performances}")
 ```

 ```py
# Most popular day of the week for events?
events["day_of_week"] = pd.to_datetime(events["starttime"]).dt.day_name()
most_popular_day = events["day_of_week"].value_counts().idxmax()
print(f"Most popular day of the week for events: {most_popular_day}")


 ```

**Discuss** answers to the different questions, asking trainees to justify each one
 
**Stress** that there are no exact answers to the above questions; any answer will be heavily dependent on the cleaning steps used and the approach taken.
 

</LockedContent>
