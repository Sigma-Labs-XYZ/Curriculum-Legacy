---
objectives: ["Parse a `POST` request using Flask", "Use Postman to debug endpoints", "Gracefully handle errors in a Flask app and return an appropriate response"]
module: SF-Backend
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Backend II

<LearningObjectiveComponent />

## Workshop

<LockedContent password="ownership">

**Run** a quick pop-quiz with the trainees

> 1. When is the HTTP GET method used?
> 2. When is the HTTP POST method used?
> 3. When is the HTTP PATCH method used?
> 4. When is the HTTP PUT method used?
> 5. When is the HTTP DELETE method used?
> 6. What does the 404 response code mean?
> 7. What does the 200 response code mean?
> 8. What does the 400 response code mean?

**Recap** the problem that APIs solve

> APIs work as a go-between for the user and data storage. We need a way of sending data back to the API so it can be processed and updated in the data store in a safe way.

**Explain** that we've learned about retrieving data from an API - what about when we want to change or update data in our database?

**Return** to the code from the previous workshop. A complete example is below.

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

**Ask** the trainees help you extend the Company API to accept a `post` requestion with the below specification:

> The endpoint should add a company when posting to the /companies endpoint. These are the required fields:
>
> - name
> - domain
> - country
> - email
> - stock
>
> They should all be sent in the body of the request. The server should return a response code and an error message if it does not.

**Use** the below example (modifying the existing `/company` route):

<Tabs>
<TabItem label="main.py" value="main.py">
```py

from data_functions import (load_companies,
                            get_company_by_id,
                            get_companies_by_country,
                            save_companies)

...

@api.route("/company", methods=["GET", "POST"])
def company_index():
    """Returns a list of companies."""

    companies = load_companies()  # Get current companies

    if request.method == "POST":
        new_company = request.json

        # Basic validation
        if all([k in new_company for k in ('name', 'domain', 'country', 'email', 'stock')]):

            # Make the new company
            data_id = len(companies) + 1
            new_company['id'] = data_id
            companies.append(new_company)

            # Save the latest data
            save_companies(companies)

            # Return the new object
            return new_company, 201
        else:
            return {
                "error": True,
                "message": "Company missing required data."
            }, 400

    else:  # GET request
        args = request.args

        if "country" in args:
            return get_companies_by_country(companies, args["country"])

        return companies

...

```
</TabItem>
<TabItem label="data_functions.py" value="data_functions.py">
```py

...

def save_companies(companies: list[dict]) -> None:
    """Saves companies to a file."""
    with open("companies.json", "w") as f:
        companies = json.dump(companies, f, indent=4)

...

```
</TabItem>
</Tabs>

**Highlight**

- The use of `request.json` to access the `POST` body
- The necessity of saving the updated `companies` data back to a file, so that changes are stored permanently.

**Hint** to the trainees they might use a function to make this code more palatable

**Introduce** [Postman](https://www.postman.com/) as a way to test POSTing to an endpoint.

**Ask** the trainees why we can't do this in the browser.

> Answer: When you got URLs in the browser you can only do GET requests

**Explain** the Postman UI through demonstrating different types of requests

**Use** [Postman](https://www.postman.com/) to demonstrate how you can test a post request without having to writing any code.

**Give** the trainees the following challenge to work on in pairs

> Write an endpoint that will let the user delete a company. The `data` is of type list.
>
> For example, the query:
>
> > http://127.0.0.1:5000/company/212
>
> should delete the company with the id equal to 212

</LockedContent>
