---
objectives:
  [
    'Query databases using SQL',
    'Connect to a Database using Python',
    'Connect to and query from a database from an API'
  ]
module: SF-Backend
week: 2
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Databases and APIs

<LearningObjectiveComponent />

## Prework

If nobody has done so already, copy and paste this command into Slack.

```bash
/prework Databases and APIs
```

### Explore

:::info Task

Explore the data in the `streaming` database.

1. If you were to design an API, list five endpoint you might include
2. For each endpoint, write a `SELECT` statement to query for the appropriate information.

:::

### Prepare

:::info Task

Create a simple Flask API.

It should have one route, `/media`, which (for now) returns an empty list.

Check that it is working as expected.

:::

### Research

:::info Task

Research the `psycopg2` library. Find answers to the below questions:

1. What is the `psycopg2` library for? 
2. What is a `cursor`?
3. What is a `cursor_factory`?

:::

## Workshop

<LockedContent password="ownership">

### Setup

Ensure that you have the `streaming` database from [previous workshops](./02_sql_introduction.md) on your local machine.

### Connecting through Python

**Explain** that up until now, we've been communicating manually with the database using SQL, but now we'll build upon that.

**Set up** for writing Python code with a `venv`, a `requirements.txt`, and a `database.py` file.

**Introduce** `psycopg2` as a Python library that lets you communicate with databases.

**Introduce** The concept of a `psycopg2` connection (a pipe between Python and DB) and a cursor (the vehicle that goes through that pipe to recieve and deliver the data). 

**Show** output repeatedly as you work through the live-coding sections below; this helps trainees connect the concepts & the syntax to their results.

**Demonstrate** a simple connection function:

```python
from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.extensions import connection

def get_db_connection() -> connection:
    """Return a live connection the database"""
    return connect(dbname="postgres", cursor_factory=RealDictCursor)
```

**Highlight** the use of `cursor_factory` to control the output format for all cursors made from this connection.

**Live code** the following function.

```py
def get_media(conn: connection) -> list:
    """
    Fetch the title and release year of media items from the database.
    """

    # Create a cursor 
    cursor = conn.cursor() 

    # Define a SQL query that will return all the titles and release years of the films in our database
    query = """
    SELECT title, release_year
    FROM media;
    """

    # Execute the query using the cursor
    cursor.execute(query)

    # Get the results from the cursor
    rows = cursor.fetchall()

    # Close the cursor
    cursor.close()

    return rows
```

**Highlight**

- Passing in the connection
- Sending the query and reading the data as two **separate** actions
- The closing of the cursor once we're done with it

**Stress** that connections are expensive, and should be opened rarely, while cursors are lightweight and should be opened/closed for specific tasks.

**Mention** that `with` can be used here to manager cursors just like file objects.

### Challenge

**Challenge** The trainees to write an extension to the function to accept a `media_type` argument, only returning media of that type.

**Grant** trainees ~5 minutes to complete this, in small groups.

**Ask** a trainee to guide you through their solution to the problem, below is an example solution:

```py
def get_media(conn: connection, media_type: str) -> list:
    """
    Fetch the title and release year of media items of a specific type from the database.
    """

    # Create a cursor
    cursor = conn.cursor()
    # Define a SQL query that will return all the titles and release years of hte films in our database
    query = f"""
    SELECT title, release_year
    FROM media as m
    JOIN media_type as mt
        on m.media_type_id = mt.media_type_id
    """

    # Execute the query using the cursor
    cursor.execute(query)

    # Get the results from the cursor
    rows = cursor.fetchall()

    # Use a python loop to only select rows with a specific media type
    # To highlight: all operations that can be done in SQL should be.
    rows = [row for row in rows if row['media_type_name'] = media_type]

    # Close the cursor
    cursor.close()
    return rows
```

**Ask** trainees to critique the function.

**Drive home** the point that all operations can be done in SQL should be done in SQL.

**Model** a better function.

```py
def get_media(conn: connection, media_type: str) -> list:
    """
    Fetch the title and release year of media items of a specific type from the database.
    """

    # Create a cursor in a context manager (with clause) to ensure it is closed after use
    with conn.cursor() as cursor:
        # Define a SQL query that will return all the titles and release years of hte films in our database
        query = f"""
        SELECT title, release_year
        FROM media as m
        JOIN media_type as mt
            on m.media_type_id = mt.media_type_id
        WHERE mt.media_type_name = {media_type};
        """

        # Execute the query
        cursor.execute(query)

        # Get the results from the cursor
        rows = cursor.fetchall()

    return rows
```

**Highlight** the use of multiline strings to format queries for readability.

### APIs

**Announce** that we are going to combine the code we wrote last week with this one.

**Refer** trainees to the API they created in the pre-work; a working version of the code is below.

```py
from flask import Flask, request

app = Flask(__name__)

@app.route('/media', methods = ['GET'])
def movies():
    return []

if __name__ == "__main__":
    app.run(port=8080, debug=True)
```

**Prompt** trainees to suggest how we could make the endpoint more useful.

**Live code** with the help of a trainee on how we can implement the `/media` endpoint.

```py
from flask import Flask, request

from database import get_db_connection, get_media

app = Flask(__name__)
conn = get_db_connection()

@app.get('/media')
def get_media_endpoint() -> list:
    """Fetch media items from the database with a query parameter for media type which specifies the type of media to fetch,
    this will be either 'movie' or 'show'. If no media type is specified, it defaults to 'movie'.
    """

    # Get the media type from the query parameter, when it's not specified we have 'movie'
    media_type = request.args.get('media_type', 'movie')
    # Execute the query
    media = get_media(conn, media_type)

    return media


if __name__ == "__main__":

    app.run(port=8080, debug=True)
```

**Highlight** the use of a single connection for the API, passed into different functions.

### SQL Injection

**Ask** the trainees what the issue with this new code might be in terms of security. Show the [somewhat funny SQL injection cartoon](https://xkcd.com/327/).

**Highlight** that this is subtle, but important.

**Explain and show** how going to this URL would have bad consequences by printing the below to the terminal.

> http://localhost:8080/media?media_type=movie;%20DROP%20TABLES%20media;

**Explain** and demonstrate that, fortunately, psycopg2 has a way to manage this, through **query parametrization.**

```py
def get_media(conn: connection, media_type: str) -> list:
    """
    Fetch the title and release year of media items of a specific type from the database.
    """

    # Create a cursor in a context manager (with clause) to ensure it is closed after use
    with conn.cursor() as cursor:
        # Define a SQL query that will return all the titles and release years of hte films in our database
        query = """
        SELECT title, release_year
        FROM media as m
        JOIN media_type as mt
            on m.media_type_id = mt.media_type_id
        WHERE mt.media_type_name = %(media_type)s;
        """

        # Execute the query using the cursor using query parameterisation (remember to do this to avoid SQL injection!)
        cursor.execute(query, {'media_type': media_type})

        # Get the results from the cursor
        rows = cursor.fetchall()

    return rows
```

**Stress** that this is always the best way to include details.

### Challenge

**Divide** the trainees into pairs.

**Challenge** them to write the below endpoint (this will take them ~10 minutes):

- `/genre/<genre_name>`

The endpoint should accept both `media_type` and `release_year` query parameters.

**Extend** the challenge for trainees who finish quickly:

> Loading all of the media with every API call can be wasteful. To fix this, research what 'pagination' is and implement it in your `/media` endpoint

**Gather** trainees back together and run through solutions.

**Stress** that this is much easier if they write routing functions and querying functions separately.

<Tabs>
  <TabItem label="requirements.txt" value="requirements.txt">
  ```txt
  psycopg2-binary
  flask
  ```
  </TabItem>
  <TabItem label="database.py" value="database.py">
  ```py
from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.extensions import connection

# We want to:
# Open a connection to the database using a connection object
# Communicate with this database using a cursor object


def get_db_connection() -> connection:
    """This functions will establish a connection between Python and
    our PostgreSQL database.
    """
    return connect(dbname='streaming', cursor_factory=RealDictCursor)


def get_media(conn: connection, media_type: str) -> list:
    """
    Fetch the title and release year of media items of a specific type from the database.
    """

    # Create a cursor in a context manager (with clause) to ensure it is closed after use
    with conn.cursor() as cursor:
        # Define a SQL query that will return all the titles and release years of hte films in our database
        query = """
        SELECT title, release_year
        FROM media as m
        JOIN media_type as mt
            on m.media_type_id = mt.media_type_id
        WHERE mt.media_type_name = %(media_type)s;
        """

        # Execute the query using the cursor using query parameterisation (remember to do this to avoid SQL injection!)
        cursor.execute(query, {'media_type': media_type})

        # Get the results from the cursor
        rows = cursor.fetchall()

    return rows


def get_genre_by_year(conn: connection, genre_name: str, release_year: str, media_type: str) -> list:
    """Gets the title, release year, and genre name of media items
    that match the specified genre, release year, and media type.
    """
    # Create a cursor in a context manager (with clause) to ensure it is closed after use
    with conn.cursor() as cursor:
        # Define a query
        query = """
        SELECT m.title, m.release_year, g.genre_name
        FROM media m
        JOIN media_genre_link mg
            USING(media_id)
        JOIN genre g
            USING(genre_id)
        JOIN media_type mt
            USING(media_type_id)
        WHERE genre_name ILIKE %(genre_name)s
        """

        # Store the parameters in a dictionary that we can call at execute to parameterise our query
        params = {'genre_name': genre_name}

        if release_year is not None:
            # If the release year is specified, add it to the query and parameters
            query += " AND m.release_year = %(release_year)s"
            params['release_year'] = release_year

        if media_type is not None:
            # If the media type is specified, add it to the query and parameters
            query += " AND mt.media_type_name = %(media_type)s"
            params['media_type'] = media_type

        # Execute the parameterised query
        cursor.execute(query, params)

        # Get the rows from the cursor
        rows = cursor.fetchall()

        return rows

  ```
  </TabItem>
  <TabItem label="api.py" value="api.py">
  ```py
"""
We want an API that has one endpoint a /media and this should return an empty list []

We want to be able to list all titles and release years when specifying a media type of movie or show
"""

from flask import Flask, request

from database import get_db_connection, get_media, get_genre_by_year

app = Flask(__name__)

# Define the connection
conn = get_db_connection()


@app.get('/media')
def get_media_endpoint() -> list:
    """Fetch media items from the database with a query parameter for media type which specifies the type of media to fetch,
    this will be either 'movie' or 'show'. If no media type is specified, it defaults to 'movie'.

    The URL should be structured as follows:
    /media?media_type=<type>
    """

    # Get the media type from the query parameter, when it's not specified we have 'movie'
    media_type = request.args.get('media_type', 'movie')
    # Execute the query
    media = get_media(conn, media_type)

    return media


@app.get('/genre')
def get_genre_endpoint() -> list:
    """Fetch media items from the database based on genre, release year, and media type.

    The URL should be structured as follows:
    /genre?genre_name=<genre>&release_year=<year>&media_type=<type>
    """

    # Get the genre name, release year, and media type from the query parameters with some defaults to handle missing values
    genre_name = request.args.get('genre_name', '%Comedy')
    release_year = request.args.get('release_year', 2020)
    media_type = request.args.get('media_type', 'movie')

    # Execute the query
    rows = get_genre_by_year(conn, genre_name, release_year, media_type)

    return rows


if __name__ == "__main__":
    app.run(port=8080, debug=True)

  ```
  </TabItem>
</Tabs>

</LockedContent>
