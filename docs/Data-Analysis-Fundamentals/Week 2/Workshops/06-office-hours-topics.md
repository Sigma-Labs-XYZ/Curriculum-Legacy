---
title: Office Hours Topics
---

## Data Wrangling with Pandas  

- Pandas Series vs DataFrame  
- Difference between loc and iloc  
- Pivot tables in SQL and pandas  
- pandas.DataFrame.melt() - what it does, when to use it, and alternatives  
- Transforming dataframes with melt and pivot (reshaping data)  
- Sorting and grouping in pandas compared to SQL  
- SettingWithCopyWarning in pandas - how to deal with it (copies vs assignments)  
- Alternative libraries to pandas for handling tabular/multidimensional data  
- Long-form vs wide-form data - when to use each  
- Cleaning and fixing tables (e.g. flight, airport, city data inconsistencies)  
- Data cleaning - deciding what counts as “clean enough” before analysis  
- Process for hunting anomalies in data  

## SQL for Analysis  

- SQL joins (left, right, inner, outer) - meaning and usage  
- SQL window functions (review and more examples)  
- Recursive CTEs in SQL - what they are and when to use them  
- Row-level aggregations in SQL (summing across columns without specifying individually)  
- Querying database metadata (finding table properties, largest table, etc.)  
- Using the information_schema table in databases  

## Database Integration (Pandas & psycopg2/3)  

- Efficiently loading pandas dataframes into Redshift  
- Process for uploading pandas dataframes to databases  
- Best way to upload dataframes into a database with psycopg2  
- psycopg2 vs psycopg3 - why use one over the other  
- Syntax for executemany (uploading dataframes)  
- Using try-except and context managers for database connections and cursors  
- How to see current database connections and close them  

## Anomaly Detection  

- Statistical tests vs machine learning for anomaly detection  
- Recommended anomaly detection libraries  
- Visualising anomalies in data  

## Data Visualisation  

- Visualisation libraries - Altair vs Matplotlib vs Plotly (when to use which)  
- Benefits of Altair vs Matplotlib (is it preference or advantages?)  
- Altair visualisations - binning, aggregation, scales, datetime axes, rule lines, scatter graph best-fit lines  
- Adding labels and annotations in Altair (averages, rule lines)  
- Highlighting parts of a chart (e.g. max value)  
- Pie charts in Altair and alternatives  
- Combining data from different tables/dataframes for comparison in one visualisation  
- Choosing a visualisation tool for different use cases  

## Data Science Practices  

- CRISP-DM framework (overview and applications)  
- Regex - is it a good tool for data analysis?  
