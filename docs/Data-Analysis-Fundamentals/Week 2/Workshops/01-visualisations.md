---
title: Visualisation
objectives:
  [
    'Plan and carry out analysis to meet stakeholder needs',
    'Summarise data using Python & Pandas',
    'Write Python & markdown inside Jupyter notebooks',
    'Use a range of visualisations appropriately',
    'Select and justify a visualisation type for a specific purpose/audience',
    'Visualise data effectively according to analysis outcomes',
    'Extract insights from unfamiliar datasets'
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

Run this commmand in your coursework repo:

```
pip install "altair[all]"
```

## Workshop

<LockedContent password="ownership">

### Setup

**Ensure** you have installed, this explicit command

```
pip install "altair[all]"
```

### Visualisation

**Ask** the trainees why visualisation is or is not useful

> - Visualisation can be useful because it easily can summarise complex data and patterns.
> - However, it might not be useful because, if used incorrectly, they can be misleading.

**Task** the trainees in pairs to decide what makes a visualisation useful and effective to a stakeholder. Send the trainees into breakout rooms for ~5 minutes to discuss.

**Ask** the pairs to contribute ideas.

> As a guide: a good visualisation should:
> - Answer a specific question for a specific audience
> - Be visually engaging, clearly showing what it needs to show.
> - Be readable without explanation: clear title, axis labels, sensible sorting
> - Not mislead: honest axes, appropriate aggregation, no cherry-picked windows

**Show** the trainees [these plots](https://link.excalidraw.com/l/6gPaBlSh8PG/73DJUTgVvdm)

**Ask** them to:
> call out which ones are "good" / "bad" and why - highlight how there is a lot of nuance between a good and a bad plot. 

See some resources to show the trainees below (time permitting):
* Some examples of good plots are [here](https://informationisbeautiful.net/visualizations/the-rise-of-generative-ai-large-language-models-llms-like-chatgpt/#suing)
* [A good website to share afterwards on "how to spot visualisation lies"](https://flowingdata.com/2017/02/09/how-to-spot-visualization-lies/)

**Ask** the trainees 

> What are the common ways that charts can mislead stakeholders?


> - Raw counts without denominators hide rate differences (500 complaints looks bad; 500 from 500,000 customers is 0.1%)
> - Averages hide distribution problems — one region averaging 7/10 can mask another scoring 4/10
> - Cherry-picked time windows make flat trends look like growth
> - Implied causation, two lines moving together doesn't mean one caused the other, famously "correlation does not always imply causation"
> - Starting axes from non-zero states (can make a dip from 10,000 to 9,995 look like the end of the world)

### Box office data 

**Reintroduce**  the trainees to the box office data that they cleaned in their pandas workshop that morning. You can download the data [here](https://sigma-resources-public.s3.eu-west-2.amazonaws.com/daf-workshops/cleaned_regional_data.csv).

### Altair 

**Explain** that this workshop will focus on the `altair` library, although others exist - the plotting tool doesn't necessarily matter (aside from capability wise and stylistically), it's the output that matters.

**Show** trainees the different types of charts available with Altair

> https://altair-viz.github.io/gallery/index.html

**Live Code** in a jupyter notebook, define a dataframe of the 5 events that have sold the most tickets 

```py
import pandas as pd

plotting_df = (
    df.groupby(['eventname', 'catname'])
    .agg({"qtysold": "sum"})
    .sort_values(by = 'qtysold', ascending=False)
    .reset_index().head(5)
    )
```

**Highlight** how the dataframe is hard to interpret at face value, especially if the stakeholder isn't technical.

**Live Code** a simple bar plot, to show event name against quantity of tickets sold

```py
import altair as alt

chart = alt.Chart(plotting_df).mark_bar().encode(
    x='eventname',
    y='qtysold'
)

chart
```

**Highlight** that this plot could me more compelling.

**Ask** the trainees how it could be made more compelling. (it's lacking information about the category of events, and it is unordered on the x axis)

**Live Code** the upgraded plot (including colours based on categories and sorting the x axis in ascending order, add a title)

```py
chart = alt.Chart(plotting_df).mark_bar().encode(
    x=alt.X('eventname', sort='-y'), # We have to write this as altair won't plot in the same order as the df
    y='qtysold',
    color='catname'
).properties(
    title={
        "text": "Top 5 Events by Tickets Sold",
        "subtitle": ["Grouped by Category Name"]
    }
)
```

<details>
  <summary>Full plotting code</summary>

```py
import pandas as pd
import altair as alt


plotting_df = (
    df.groupby(['eventname', 'catname'])
    .agg({"qtysold": "sum"})
    .sort_values(by = 'qtysold', ascending=False)
    .reset_index().head(5)
    )

chart = alt.Chart(plotting_df).mark_bar().encode(
    x=alt.X('eventname', sort='-y'), # We have to write this as altair won't plot in the same order as the df
    y='qtysold',
    color='catname'
).properties(
    title={
        "text": "Top 5 Events by Tickets Sold",
        "subtitle": ["Grouped by Category Name"]
    }
)

chart # This will display the chart in the jupyter notebook.
```

</details>

### Generation of visualisations with AI

**Highlight** how the creation of that plot was time consuming. We knew what we wanted to create already, and writing the visualisation code was tedious - this is a perfect place for AI to help - saving us time to work on the important stuff.

**Show** the trainees this stakeholder request:

> I want to see a plot which lets me visualise the proportional category split between events for each day of the week. If we know this, we can schedule according to popularity on any given day.

**Live code** a poor prompt to address this request, it should be intentionally vague, leading to a visualisation that is different to what we'd like.

> Example poor prompt: Make a plot that shows us the split of categories across days of the week.

**Highlight** that the above prompt may get close to what we want, but is imperfect. We need to be intentional with our prompting.

**Ask** the trainees what would make this prompt more effective.

**Live code** the updated more specific prompt based on trainee suggestions.

> Example better prompt: Make a stacked bar plot that shows us the split of categories across days of the week, I want the days of the week to be ordered from Monday to Sunday, and I want the y axis to be proportional.

<details>
  <summary>Example solution to this problem</summary>


```py
# There is a column called day_of_week. I want to look into the distribution of tickets sold for each
# day of the week across each category (catname). I want a stacked bar chart for this.

# Lets turn them into proportions rather than absolute values.
import altair as alt
plotting_df = (
    df.groupby(['day_of_week', 'catname'])
    .agg({"qtysold": "sum"})
    .reset_index()
)

chart = alt.Chart(plotting_df).mark_bar().encode(
    x=alt.X('day_of_week', sort=[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    y=alt.Y('qtysold', stack='normalize', title='Proportion of Tickets Sold'),
    color='catname'
).properties(
    title={
        "text": "Distribution of Tickets Sold by Day of the Week",
        "subtitle": ["Grouped by Category Name"]
    }
)

chart
```
</details>

**Highlight** that this plot is simple, clearly laid out, represents multiple dimensions that would otherwise be hard to compare.

### Challenge

**Task** the trainees to create plots to answer the following questions from a stakeholder. They should share their plots in the slack thread when they're finished.

> 1. I want to see how the distribution of ticket sales varies across the different categories of events that we offer. This way I can aim my investigations at the wider distributions.
> 2. I want to visualise proportionally which of the categories is the most profitable for the business relative to the number of events and quantity of tickets sold. If I know this then I can choose where to invest our resources to increase revenue.
> 3. What's the cancellation rate by category or event? Are certain types more risky?
> 4. What's the seasonal trend for our events?
> 5. Bonus: Any other questions you think would be interesting to answer!

</LockedContent>