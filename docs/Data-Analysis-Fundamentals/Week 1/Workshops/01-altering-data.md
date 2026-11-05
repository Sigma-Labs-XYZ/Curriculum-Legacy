---
title: Altering Data
objectives:
  [
    'Enrich and standardise data using SQL.',
    'Extract insights from unfamiliar datasets',
    'Modify data within a database using SQL',
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

<LearningObjectiveComponent />

## Pre-work

No pre-work as this is an afternoon workshop.

## Workshop

<LockedContent password="ownership">

### Altering Tables

**State** that an unfortunately frequent part of an analyst's role is to fix problems in the data that prevent effective analysis. As such, analysts should have data cleaning skills, and the ability to modify data using SQL.

**Return** to the `ticket` schema in the data warehouse and explain that we will use this schema to practice modifying/cleaning tables.

**Demonstrate** the use of `CREATE TABLE [name] AS ([query])` to create a new table from `event` named after yourself (e.g. `event_sigmund`).

**Direct** trainees to make their own copy of the table to practice modifying. They should make changes in sync with you throughout the workshop.

**Change** your mind and state that it should really be plural (`events_sigmund`) to match the other tables more closely.

**Introduce** the `ALTER TABLE` statement and rename the new table.

```sql
ALTER TABLE event_sigmund RENAME TO events_sigmund;
```

### Challenge

**Challenge** trainees to use `ALTER TABLE` and the [documentation](https://docs.aws.amazon.com/redshift/latest/dg/r_ALTER_TABLE.html) to make the following improvements:

- Drop the unconnectable `venueid` column
- Rename the `starttime` column to `eventstart`
- Add a new column, `cancelled`, to represent whether the event actually took place or not. This should default to `FALSE`

**Allow** trainees time to experiment and solve the problems independently.

**Prompt** trainees to walk you through the solutions:

```sql
ALTER TABLE events_sigmund DROP COLUMN venueid;
ALTER TABLE events_sigmund RENAME COLUMN starttime TO eventstart;
ALTER TABLE events_sigmund ADD COLUMN cancelled BOOLEAN DEFAULT FALSE;
```

### Altering data

**Ask** trainees to remind you of the `UPDATE` syntax.

**Point** out that data cleaning/enrichment can be done by updating values; the difficult bit is knowing what to update.

**Instruct** trainees to cancel all events in June.

**Direct** a trainee to talk through the process.

```sql
UPDATE events_sigmund
SET cancelled = TRUE
WHERE EXTRACT(MONTH FROM eventstart) = 6
;
```

### Challenge

**Point** out that `catid` doesn't provide much information on its own.

**Ask** trainees what the `catid`s actually refer to.

**Nudge** them towards the `category` table. **Gasp** as they realise that there is a mismatch between tables.

**Challenge** trainees to create a new `categoryid` column that contains the correct values, dropping the old `catid` once they're done.

```sql
ALTER TABLE events_sigmund ADD COLUMN categoryid INT;

UPDATE events_sigmund
SET categoryid = (
    CASE
		WHEN catid = 6 THEN 3
		WHEN catid = 7 THEN 4
		WHEN catid = 8 THEN 2
		WHEN catid = 9 THEN 1
	END
	)
;

ALTER TABLE events_sigmund DROP COLUMN catid;
```

### Conclusion

**Answer** any questions and address any concerns.

**State** that being able to alter tables (with `ALTER TABLE`) and update rows (with `UPDATE`) gives trainees all the tools they need to clean and enrich data using SQL.

**Warn** that the important skill here is working out what to change; syntax is the tool, but it needs to be directed.

**Counsel** that they will need these skills both for the week's coursework and the rest of their careers.

**Overwrite** the `events` table with your own version, so that it can be used in future workshops.

**Direct** trainees to `DROP` their own events table, as both practice and good practice.

</LockedContent>
