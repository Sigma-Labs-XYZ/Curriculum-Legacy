---
objectives:
  [
	'Query databases using SQL',
    'Combine data from multiple tables using `JOINs` (especially `INNER` and `LEFT`)',
    'Filter, limit, and organise query results using SQL',
	'Use builtin SQL functions to modify and aggregate data',
	'Group query results using `GROUP BY` and filter with the `HAVING` clause',
	"Use subqueries and CTEs to organise complex queries"
  ]
module: SF-Backend
week: 2
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

# Complex Queries

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Complex queries
```

### Research

:::info Task

Research the answers to the following questions:

- What is a sub-query in SQL?
- How does `GROUP BY` work in SQL?
- What is a "common table expression" (CTE) in SQL?

:::

### Query

:::info Task

Using the `streaming` database, write a query to

> Return the number of movies released each year

:::

### Read

:::info task

Read the below query. What does it do?

Make sure you understand all of the syntax used.

```sql
SELECT country_name, COUNT(*)
FROM media
JOIN media_country_link
	USING (media_id)
JOIN country
	USING (country_id)
GROUP BY country_name
HAVING COUNT(*) > (
	SELECT COUNT(*)
		FROM media
	JOIN media_country_link
		USING (media_id)
	JOIN country
		USING (country_id)
	WHERE country_name = 'France'
);
```
:::

### [OPTIONAL] Query

:::info Task

Using the `streaming` database, write a query to

> Return the top five most common starting initials for directors

:::

## Workshop

<LockedContent password="ownership">

## Setup

Make sure you have the `streaming` database on your machine.

### Introduction

**Remind** trainees that SQL is a language, and - like all languages - there are complexities beyond the basic syntax.

**Reassure** them that the modular nature of SQL means that they now know the fundamental, commonly-used syntax.

**Explain** that in this session, they'll explore some more advanced syntax that can dramatically simplify queries and data processing.

### Group by

**Explain** that PostgreSQL has many [builtin SQL functions](https://www.postgresql.org/docs/current/functions.html) that take in columns/values and return columns/values.

**Distinguish** between two different types of function: those that return one value for each value in a column  (e.g. `ROUND()`, `LENGTH()`) and those that **aggregate** results into a single value.

**Remind** trainees that they have already been introduced to aggregation functions.

```sql
SELECT COUNT(*)
FROM genre;
```

**Ask** trainees to list other aggregate functions they are aware of (e.g. `SUM()`, `AVG()`, `GREATEST()`).

**Point** out that - while being able to summarise an entire dataset is often useful - it's common to want to look at groupings within the data, to see (for example) the average sales for each store, or the maximum grade per exam.

**Ask** trainees to talk through their solutions to the first pre-work query to demonstrate the use of `GROUP BY`.

```sql
-- Return the number of movies released each year
SELECT
    release_year, COUNT(*)
FROM media
JOIN media_type
    USING (media_type_id)
WHERE media_type_name = 'movie'
GROUP BY release_year
;
```

<details>
    <summary>Click here for a solution to the second, optional query if desired.</summary>
```sql
-- Return the top five most common starting initials for directors
SELECT 
	SUBSTRING(director_name FOR 1) AS initial_letter,
	COUNT(*)
FROM director
GROUP BY initial_letter
ORDER BY COUNT(*) DESC
LIMIT 5
;
```
</details>

**Highlight** that only columns that are named in the `GROUP BY` clause or filtered through an aggregation function can be `SELECT`ed, as otherwise SQL does not know how to summarise multiple rows down into one value.

### Challenge

**Challenge** trainees to write a query to

> Return the average length of the description for media released in each country

**Divide** trainees into small groups and give them ~5 minutes to complete this task.

<details>
    <summary>Click here for an example solution.</summary>
```sql
-- Return the average length of the description for media released in each country
SELECT
    country_name, ROUND(AVG(LENGTH(description)), 2)
FROM media
JOIN media_country_link
    USING (media_id)
JOIN country
    USING (country_id)
GROUP BY country_name
;
```
</details>

### CTEs

**Ask** trainees about their frustrations with SQL.

**Commiserate** and address any immediate confusion.

**Prompt** them, if it does not arise organically, towards the idea of keeping track of long, complex queries.

**Ask** trainees to explain the prework query.

```sql
-- Select the names and media counts of all the countries with more media than France.
SELECT country_name, COUNT(*)
FROM media
JOIN media_country_link
	USING (media_id)
JOIN country
	USING (country_id)
GROUP BY country_name
HAVING COUNT(*) > (
	SELECT COUNT(*)
		FROM media
	JOIN media_country_link
		USING (media_id)
	JOIN country
		USING (country_id)
	WHERE country_name = 'France'
);
```

**State** that this query builds a table using `JOIN`s, groups it, and then filters the groups based on a subquery. This is a lot to keep track of, and it's hard to read.

**Introduce** "common table expressions" (CTEs) as a solution for this. They allow you to break a large query down into defined sections, separating out the gathering of data from the filtering of it.

**Convert** the above query, piece-by-piece, to use CTEs:

```sql
WITH media_with_countries AS (
	SELECT title, country_name
	FROM media
	JOIN media_country_link
		USING (media_id)
	JOIN country
		USING (country_id)
),

french_media_count AS (
	SELECT COUNT(*)
	FROM media_with_countries
	WHERE country_name = 'France'
)

SELECT country_name, COUNT(*)
FROM media_with_countries
GROUP BY country_name
HAVING COUNT(*) > (
	SELECT * FROM french_media_count
);
```

**Highlight**

- The compartmentalisation of logic
- The way that one CTE can refer to an existing one
- The simplified subquery

**Stress** that each separate CTE exists only for the lifetime of that query.

### Challenge

**Challenge** trainees to write a single query to

> Return all the directors who have made more romantic movies than Ireland has made sports movies.

**Insist** that trainees use at least one CTE.

**Grant** trainees ~10 minutes to solve this problem.

<details>
    <summary>Click here for a possible solution.</summary>
```sql
-- Select all the directors who have made more romantic movies than Ireland has made sports movies.
WITH movie_details AS (
	SELECT title, release_year, director_name, genre_name, country_name
	FROM media
	JOIN media_director_link
		USING (media_id)
	JOIN director
		USING (director_id)
	JOIN media_genre_link
		USING (media_id)
	JOIN genre
		USING (genre_id)
	JOIN media_country_link
		USING (media_id)
	JOIN country
		USING (country_id)
	JOIN media_type
		USING (media_type_id)
	WHERE media_type_name = 'movie'
),

irish_sports_count AS (
	SELECT COUNT(*)
	FROM movie_details
	WHERE country_name = 'Ireland'
	AND genre_name = 'Sports Movies'
)

SELECT director_name, COUNT(*) AS film_count
FROM movie_details
WHERE genre_name = 'Romantic Movies'
GROUP BY director_name
HAVING COUNT(*) > (SELECT * FROM irish_sports_count);
```
</details>

**Gather** trainees back together and discuss different approaches.

### Conclusion

**Remind** trainees, once more, of the awesome power of SQL.

**Stress** that, while these techniques might take a bit of time to feel confident with, they'll pay off massively in the long run. SQL is incredibly widely used, and incredibly powerful: if you can learn to use it effectively, it will make all sorts of tasks much easier/faster.

</LockedContent>
