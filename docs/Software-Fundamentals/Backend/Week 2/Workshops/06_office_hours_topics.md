# Office Hours Topics

## SQL Fundamentals  

- String manipulation in SQL (SUBSTRING, POSITION, COALESCE)  
- CASE statements in SQL  
- Errors in SQL  
- Aggregate functions and GROUP BY  
- Using DISTINCT with multiple columns  

## Querying & Joins  

- When to use JOINs  
- Advanced SELECTs and JOINs (subqueries, CTEs, multiple joins)  
- Using query results in another query (subqueries, CTEs)  
- Window functions  

## Schema Design & Constraints  

- Adding constraints to fields when creating tables  
- CHECK constraints  
- GENERATED ALWAYS AS IDENTITY  
- Assignment tables in ERDs  
- Mapping foreign keys  
- Organising ID keys between multiple tables (avoiding errors with hard-coded IDs)  
- Efficiently finding a foreign key when inserting data  
- Retrieving IDs of inserted rows (RETURNING in INSERT)  
- Safe deletion of entries referenced elsewhere  
- When it is safe to use CASCADE  
- Database normal forms beyond 3NF  
- Naming conventions for databases, tables, and attributes  
- Organising SQL files and scripts (indentation, avoiding redundancy)  
- Database documentation in industry (ERDs and beyond)  

## Performance & Optimization  

- Using EXPLAIN and how to read reports  
- SQL indexes - what they are and when to use them  

## Databases in Context  

- Relational algebra - is it used in practice?  
- Non-relational and graph databases  
- ORMs vs database adapters (SQLAlchemy vs psycopg2)  
- Postgres vs other SQL implementations (Oracle, SQL Server)  
- When to use VARCHAR vs TEXT  
- Difference between INT and BIGINT  

## psycopg2 & Python Integration  

- SQL injection attacks and how psycopg2 handles them  
- psycopg2 cursors (cursor, RealDictCursor, using with as a context manager, v3 changes)  
- execute_values() and execute_batch()  
- Storing database details in a config file for psycopg2.connect  
- Fetching data from multiple tables in Python  

## Testing & Best Practices  

- Unit testing with a database  
- Testing with MagicMock (mocking connections and cursors)  
