---
title: Window Functions
objectives:
  [
    'Use common table expressions (CTEs) to simplify complex queries',
    'Use window functions to perform calculations across subsets of rows',
    'Identify requirements and stakeholder needs',
    'Extract insights from unfamiliar datasets',
    'Explain the benefits of using a data warehouse'
  ]
module: Data-Analysis-Fundamentals
week: 1
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

# Window Functions

<LearningObjectiveComponent />

## Pre work

### Practise

:::info Task

Using the `events` table in the `ticket` schema in the data warehouse, write queries to find the following:

1. How many events were cancelled?
2. What are the two most common categories of event?
3. What category of event has sold the least tickets ever?

:::

### Watch

:::info Task

Watch the below video.

<EmbeddedYoutubeVideo id="y1KCM8vbYe4" />

:::

## Workshop

<LockedContent password="ownership">

### Window Functions

**Discuss** answers to the pre-work questions with trainees.

```sql
-- How many events were cancelled?
SELECT 
	COUNT(*) 
FROM 
	ticket.events 
WHERE cancelled;

-- What are the two most common categories of event?
SELECT 
	catname, 
	COUNT(*) AS event_count
FROM 
	ticket.category AS C
LEFT JOIN 
	ticket.events AS E
	ON (C.catid = E.categoryid)
GROUP BY 
	catname
ORDER BY 
	event_count DESC
LIMIT 2;

-- What category of event has sold the least tickets ever?
SELECT 
	catname, 
	SUM(qtysold) AS ticket_count
FROM 
	ticket.category AS C
LEFT JOIN 
	ticket.events AS E
	ON (C.catid = E.categoryid)
LEFT JOIN 
	ticket.sales AS S
	ON (E.eventid = S.eventid)
GROUP BY 
	catname
ORDER BY 
	ticket_count ASC
LIMIT 1;
```

**Push** for a 'so what' from the last two queries; what do they suggest the owner of an events venue should do?

### Group By

**Discuss** `GROUP BY` with the trainees. What is it used for?

> Viewing aggregate data **across** categories

**Walk** through a simple example of counting the number of unique occasions for each event name.

```sql
SELECT 
	eventname, 
	COUNT(*) AS event_count
FROM 
	ticket.events
GROUP BY 
	eventname
ORDER BY 
	event_count DESC
LIMIT 5;
```

**Raise** a limitation of `GROUP BY`: it allows comparison _between_ categories, but not _within_. What if we want to which performance of _Chicago_ was the most successful?

### Window Functions

**State** that _window functions_ are a solution for this.

**Explain** that window functions allow us to keep working with individual rows, but to compare each one to a 'window' of other rows. We can gain the benefits of aggregation without losing row-level detail.

**Define** the term 'window' in this context as 'a group of other rows used for comparison purposes'; window functions work row-by-row, but each individual row can be compared to a subset of others.

**List** some use cases for window functions

- Highlighting all the products that are more expensive than the average product in the same category
  - **Outcome**: Investigation into why this is the case
- Identifying the top 3 students in each grade
  - **Outcome**: Who to reward with a set of prizes
- Finding the number of days between each security incident and the one before
  - **Outcome**: Included in a security report, how often do incidents happen?
- Comparing the salary of every employee to the average of their grade 
  - **Outcome**: recommend to the company to fix the gap in salaries

**Walk** through a (very) basic window function to show the syntax:

```sql
SELECT 
	eventname, 
	ROW_NUMBER() OVER ()
FROM 
	ticket.events
LIMIT 10;
```

**Highlight** the use of the window _function_ (`ROW_NUMBER()`) and the (empty) _window_ definition (`OVER ()`); this gives each row its own row number when considered against _the entire dataset_.

**Highlight** that the result we want comes as its own column: no data lost, only enriched.

**Demonstrate** that, by using `PARTITION BY` to customise the window, we can give each row a row number within its own category, rather than compared to all of the events.

```sql
SELECT
    eventname, 
	eventstart, 
	categoryid,
	ROW_NUMBER() OVER (PARTITION BY categoryid)
FROM 
	ticket.events
LIMIT 10;
```

**Show** the use of `ORDER BY` to adjust the structure of the window and change the row numbers.

```sql
SELECT
    eventname, 
	eventstart, 
	categoryid,
    ROW_NUMBER() OVER (PARTITION BY categoryid ORDER BY eventstart)
FROM 
	ticket.events
LIMIT 10;
```

**Show** trainees that there are [many different types of window functions](https://docs.aws.amazon.com/redshift/latest/dg/c_Window_functions.html).

**Create** a new table from a query that shows the id, start time, name, and total tickets sold for each unique event.

```sql
CREATE TABLE ticket.ticket_sales AS (
	SELECT 
		E.eventid, 
		E.eventstart, 
		E.eventname,
		SUM(S.qtysold) AS ticket_count,
		SUM(S.pricepaid) AS total_revenue
	FROM 
		ticket.event AS E
	LEFT JOIN 
		ticket.sales AS S
		USING (eventid)
	GROUP BY 
		E.eventid, 
		E.eventname, 
		E.eventstart
);
```

**Give** access to the new table to all users with the below statement; explain that all tables created are only accessible by the creator and the db admins:

```sql
GRANT ALL PRIVILEGES ON TABLE ticket.ticket_sales TO public;
```

**Explain** that this table combines enough data to allow window functions to demonstrate their value; it's hard to demo `MAX()` and others without some numbers to compare.

**Demonstrate** the use of `MAX()` as a window function to show (for each performance of _Chicago_) the actual tickets sold and the best-ever sales. Use the newly-created table as a base.

```sql
SELECT
	eventid, 
	eventname,
	MAX(ticket_count) OVER (PARTITION BY eventname) AS best_sales_ever,
	ticket_count AS current_sales
FROM 
	ticket.ticket_sales
WHERE 
	eventname = 'Chicago';
```

### Challenge

**Challenge** trainees to build on this foundation, writing a query to identify the ticket sales shortfall for each performance of _Chicago_.

**Demand** that the answer be produced by a single, precise query.

**Discuss** potential answers.

```sql
SELECT
	eventid, 
	eventname,
	MAX(ticket_count) OVER (PARTITION BY eventname) - ticket_count AS shortfall
FROM 
	ticket.ticket_sales
WHERE 
	eventname = 'Chicago';
```

### Challenge

**Challenge** trainees once more: they must find the second-most-successful performance of _Chicago_ in terms of ticket sales.

**Point** trainees towards the `RANK()` and `DENSE_RANK()` functions and the [documentation thereof](https://docs.aws.amazon.com/redshift/latest/dg/r_WF_RANK.html).

**Allow** time for trainees, in pairs, to experiment with this.

**Spend** the time talking about how [great](https://www.youtube.com/watch?v=0c2bKZMxEQg) _Chicago_ is. It will pass quickly.

**Review** solutions from trainees.

```sql
SELECT
	eventid, 
	eventname,
	ticket_count,
	RANK () OVER (PARTITION BY eventname ORDER BY ticket_count DESC)
FROM 
	ticket.ticket_sales
WHERE 
	eventname = 'Chicago'
OFFSET 1
LIMIT 1;
```

**Talk** through the above answer, fielding any questions.

### Challenge (time-permitting)

**Challenge** trainees to write a single query that identifies the least successful performance in each category and how many tickets it sold fewer than the most successful performance in its category.

**Note** that this is a complex query; don't start this unless you've got a good chunk of time remaining.

```sql
WITH events_with_shortfall AS (
	SELECT 
		E.eventid, 
		E.eventstart, 
		E.eventname, 
		C.catname,
		MAX(SUM(S.qtysold)) OVER (PARTITION BY C.catname) - SUM(S.qtysold) AS shortfall
	FROM 
		ticket.events AS E
	LEFT JOIN 
		ticket.sales AS S
		USING (eventid)
	LEFT JOIN t
		icket.category AS C
		ON (C.catid = E.categoryid)
	WHERE 
		S.qtysold IS NOT NULL
	GROUP BY 
		E.eventid, 
		E.eventname, 
		E.eventstart, 
		C.catname
),
ranked_events AS (
	SELECT *,
		RANK() OVER (PARTITION BY catname ORDER BY shortfall DESC) AS cat_rank
	FROM events_with_shortfall
)

SELECT * 
FROM ranked_events
WHERE cat_rank = 1;
```

### Conclusion

**State** that window functions aren't always the right decision, but that they are really good at what they are for: making row-by-row comparisons within categories.

**Warn** trainees that SQL-based technical interviews often involve window functions, so it's worth being comfortable with them even if you rarely use them in practice.

</LockedContent>
