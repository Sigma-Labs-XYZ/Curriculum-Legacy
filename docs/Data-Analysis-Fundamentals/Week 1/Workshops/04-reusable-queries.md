---
title: Reusable Queries
objectives:
  [
    'Use window functions to perform calculations across subsets of rows',
    'Enrich and standardise data using SQL.',
    'Identify requirements and stakeholder needs',
    'Create database VIEWs to store query results',
    'Create user-defined functions (UDFs) in SQL to generalise queries/processes.',
    'Extract insights from unfamiliar datasets'
  ]
module: Data-Analysis-Fundamentals
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Reuseable Queries
```

### Research

:::info Task

Research the following RedShift keywords and post your findings in the Slack thread

- `WITH`
- `VIEW`
	- What is this? How do you create a `VIEW`?
	- How is it different to a `CTE`?
- `FUNCTION`
	- What is it? What does the syntax look like?
	- When would you use it?
	- What are the best practices?

:::

### Experiment

:::info Task

Create a new `VIEW` in the data warehouse, `tickets.sales_summary_[your name]` . This view should display only the following columns for all sales in the `ticket` schema:

- `buyer_id`
- `full_name` (first name and last name)
- `event`
- `event_start`
- `num_tickets`
- `price_paid`

:::

### Decipher

:::info Task

Read the below code carefully. What does it do? What can you work out about how it works? What could you change without breaking it?

```sql
CREATE OR REPLACE FUNCTION redact(VARCHAR(MAX), VARCHAR)
RETURNS VARCHAR(MAX)
IMMUTABLE
AS $$
	SELECT REPLACE($1, $2, LPAD('', LENGTH($2), 'X'));
$$ LANGUAGE sql;
```

:::

### Explore

:::info

Explore this collection of [example Redshift functions](https://github.com/aws-samples/amazon-redshift-udfs/tree/master/sql-udfs).

:::

## Workshop

<LockedContent password="ownership">

### Introduction [10 minutes]

**Ask** trainees what they find frustrating about writing SQL queries.

**Elicit**, amongst other points

- Large, complex queries
- Having to repeat syntax (e.g. the same `JOIN`s) between queries.

**Explain** that this session will focus on ways to make queries cleaner/shorter/easier.

### Views [15 mins]

**Show** trainees a solution to the first prework challenge.

```sql
CREATE OR REPLACE VIEW ticket.sale_summaries AS (
	SELECT
	firstname || ' ' || lastname AS full_name,
	eventname AS event,
	qtysold AS num_tickets,
	pricepaid / qtysold AS price_per_ticket
FROM ticket.users AS U
LEFT JOIN ticket.sales AS S
ON (U.userid = S.buyerid)
LEFT JOIN ticket.event AS E
USING (eventid)
);
```

**Get** different trainees to explain each part of the query and how it works.


**Discuss** `VIEW`s and how they can save repeated effort: instead of `JOIN`ing/modifying the same data again and again in queries, extract the repeatable part to a view.

**Contrast** `VIEW`s with CTEs; a view exists beyond the lifetime of a query.

**Stress** that creating a `VIEW` removes the need to rewrite the query multiple times.

**Highlight** the difference between tables (which store actual data) and `VIEW`s (stored queries, re-run when applicable). Tables take up storage space and need to be kept updated; `VIEW`s can't meaningfully exist without tables, but they only cost processing power when run.

### User-defined functions (UDFs) [15 mins] 

**Introduce** user-defined functions as a way to store complex transformations (rather than writing endless `CASE` statements, for example).

**Compare** UDFs to familiar built-in functions like `ROUND()` or `MAX()`.

```sql

CREATE OR REPLACE FUNCTION get_percentage_sql(float, float)
RETURNS float
IMMUTABLE
AS $$
    SELECT ROUND($1 / $2 * 100, 2)
$$ LANGUAGE sql;

```

**Talk** through the structure of the above function. Ask trainees to identify & explain syntax

**Warn** trainees that AWS Redshift used to support Python UDFs as well as SQL ones, but it doesn't any longer. They should be careful when reading older documentation/resources that may not have been updated.

### Challenge [10 minutes]

**Challenge** trainees to complete the following task.

> Write a UDF that takes in an integer and returns
> 
> - "LOW" if it is less than 50
> - "MED" if it is between 51 and 75
> - "HIGH" in all other situations

**Extend** the challenge: the UDF should `RAISE` an error if the integer is below 0 or greater than 100.

**Discuss** solutions, getting trainees to explain why they made the choices they did.

### Challenge [10 minutes]

**Challenge** trainees to write a new UDF. This function should be reasonably complex and relevant to the coursework.

**Set** trainees free to design their own function.

**Pick** trainees at random and ask them to explain how another trainee's function works.

### Conclusion

**Remind** trainees that the aim of all development is to reduce required effort; if something is happening enough to become tedious, it's worth considering automating it away.

**Commend** `VIEW`s and UDFs to them as ways to simplify/ease their SQL coding.

</LockedContent>
