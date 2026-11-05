---
objectives: ["Use a Python supported backend framework to create a simple endpoint", "Run a simple web server that delivers HTML/JSON upon request", "Parse a `GET` request using Flask", "Use path parameters to change what an API responds with", "List the different HTTP methods and when they should be used", "Define the differences between a backend and a client"]
module: SF-Backend
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Backend I

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework Intro to Backends
```

This week we'll be covering writing an API to receive requests for data and send data back in a response. We'll be creating what we used last week to display data!

### Research

Research the answers to the following two questions

- What is Flask? Why is it used?
- What does CRUD stand for?

### Watch

<EmbeddedYoutubeVideo id="zsYIw6RXjfM" />

### Exercise

In this task, we will be writing a set of routes based on a set of data.

We have some information about employees at an imaginary company, and we're creating an API for the HR department to easily access data about their employees.

The following example references [this data](01_example.json).

<details>

<summary>Click here for Example Solution</summary>

The endpoints that we might want to create would include:

1. Retrieving information about all employees: `GET api/employees`
2. Retrieving information about an individual employee by ID `GET api/employees/{id}`
3. Retrieving information about an employee by names `GET api/employees?name={search}`
4. Retrieving information about a specific department `GET api/department/{name}`
5. Retrieving information about employees who started within a specific date range `GET api/employees?dateStart={start}&dateEnd={end}`
6. Updating employee details `PATCH api/employees/id`
7. Adding a new employee `POST api/employees`
8. Removing an employee `DELETE api/employees/id`

For the above:

- 1,2,3,4,5 would be `GET` endpoints which send back JSON with the requested info
- 6 would be a `PATCH` or `PUT` endpoint which would send back the updated employee information
- 7 would be a `POST` endpoint which would send back a message telling us if an employee was successfully added
- 8 would be a `DELETE` endpoint which would send back a message telling us if an employee was successfully removed

</details>

:::info Task

We have some data from an organisation which takes publicly available information from listed companies. The client has tasked us with creating an API to retrieve data for them.

The data can be found [here](01_companies.json)

1. Look through the data to see which information we can get.
2. Design some endpoints and what data it should receive / send out using the example as a guide.

:::

## Workshop

<LockedContent password="ownership">

**Setup** and download [the companies.json file](01_companies.json)

**Explain** what we're going to be doing over the next three weeks

> - Last week, we were calling APIs on the internet
> - This week, we'll be building APIs on our laptops
> - Next week, we'll be adding a Database to our API

**Exclaim** that trainees will be able to call themselves Backend Engineers by the end of these three weeks

**Elicit** questions from the trainees around the prework:

> - How Flask works
> - Methods in Flask
> - Flask in general

**Cold call** the trainees what the uses of an APIs are

> - Data Access
> - Security
> - Data Management
> - Separation of Concerns
> - Scalability

**Create** a new directory to contain the app

**Cold call** why a virtual environment is important

> - Increases portability
> - Stops overlapping libraries
> - Use `pip3 list` to view libraries installed

**Create** a virtual environment

> ```
> python3 -m venv venv
> source ./venv/bin/activate
> pip3 install flask
> ```

**Use** `pip3 list` to view libraries installed

**Explain** that we're going to be building an API that gives people access to [the companies.json file](01_companies.json).

**Show** the trainees [the companies.json file](01_companies.json).

**Ask** the trainees what endpoints they think would be good endpoints for the API to be. Some examples might be

> - Find a Company by Name
> - Find a Company by Stock
> - Find Company by ID
> - Get All Companies

**Explain** that we will be using Flask - a backend framework - to help us to build APIs. Share the docs with them.

**Live code** the trainee's endpoint suggestions, explaining as you go. Below is an example. You should be aiming to demonstrate and explain

> - How to define a Flask app
> - How to define an endpoint
> - How to access path params
> - How to access query params
> - How and when to return success and error codes
> - How to run the application on a given port
> - Using functions effectively
> - AND everything you come across that the trainees may not understand

**Ensure** that the trainees are leading the majority of the work when writing the code. They should be the [navigator, you should be the driver](https://medium.com/@maaretp/the-driver-navigator-in-strong-style-pairing-2df0ecb4f657).

<Tabs>
<TabItem label="main.py" value="main.py">
```py
"""A small example of an API."""

from flask import (Flask,  # Class for building APIs
                    request) # Information about the current HTTP request

from data_functions import load_companies, get_company_by_id, get_companies_by_country

api = Flask(__name__)

# Define the routes

@api.get("/")
def index():
    """Returns a brief introduction to the API."""
    return {
        "title": "Companies API"
    }


@api.get("/company")
def company_index():
    """Returns a list of companies."""

    args = request.args
    companies = load_companies()

    if "country" in args:
        return get_companies_by_country(companies, args["country"])

    return companies

# Route with a URL parameter
@api.route("/company/<int:company_id>", methods=["GET"])
def company_show(company_id: int):
    """Return a company with the ID of 3."""
    companies = load_companies()
    try:
        return get_company_by_id(companies,
                                company_id)
    except ValueError:
        return {
            "error": True,
            "message": f"Unable to locate a company with an id of {company_id}."
        }, 404


if __name__ == "__main__":
    
    # Listen
    api.run(debug=True,
            port=8080)
```
</TabItem>
<TabItem label="data_functions.py" value="data_functions.py">
```py
"""Functions to interact with the company data."""

import json

def load_companies() -> list[dict]:
    """Return company data loaded from a file."""
    with open("companies.json", "r") as f:
        companies = json.load(f)
    
    return companies


def get_company_by_id(
        companies: list[dict],
        company_id: int) -> dict:
    """Returns a single company by ID."""
    for c in companies:
        if c["id"] == company_id:
            return c
    
    raise ValueError("No matching company found!")


def get_companies_by_country(companies: list[dict], country: str) -> list[dict]:
    """Returns all companies in a given country."""
    country = country.lower()
    matches = []
    for c in companies:
        if c["country"].lower() == country:
            matches.append(c)

    return matches
```
</TabItem>
<TabItem label="requirements.txt" value="requirements.txt">
```sh
flask
```
</TabItem>
</Tabs>
</LockedContent>
