---
title: API Testing
objectives:
  [
    'Write unit tests for APIs',
    'Identify appropriate unit test cases',
    'Mock HTTP requests and responses in unit tests'
  ]
module: SF-Backend
week: 1
workshop: true
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework API Testing
```

### Research

`pytest` should be a familiar library by now, but as our code gets more complex, our testing setup has to evolve to accommodate it. In this workshop, we're going to need more advanced configuration.

:::info Task

Research the following areas:

- What 'mocking' means in a general testing context?
- Why would we need to mock a function?

:::

### Watch

<EmbeddedYoutubeVideo id="WFRljVPHrkE" />

### Code

Using the code below, try to complete the test so that it will always pass by mocking the appropriate functions

```py person.py

def get_age() -> int:
    return int(input("Enter your age: "))

def get_name() -> list:
    return input("Enter a name: ")

def get_person():
    name = get_name()
    age = get_age()
    return {
        "name": name,
        "age": age
    }
```

```py test_person.py
from unittest.mock import patch
from person import get_person

def test_get_person():
    """Tests the get_person function."""

    # Call the function
    person = get_person()

    # Check the result
    assert person == {
        "name": "Tester Name",
        "age": 999
    }
```

## Workshop

<LockedContent password="ownership">

### Setup

**Return** to the `company` API from previous workshops.

<details>
<summary>Click here for a complete version of the previous workshop's code.</summary>
<Tabs>
<TabItem label="main.py" value="main.py">
```py
"""A small example of an API."""

from flask import (Flask,  # Class for building APIs
                    request) # Information about the current HTTP request

from data_functions import (load_companies,
                            get_company_by_id,
                            get_companies_by_country,
                            save_companies)

api = Flask(__name__)

# Define the routes

@api.get("/")
def index():
    """Returns a brief introduction to the API."""
    return {
        "title": "Companies API"
    }


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


def save_companies(companies: list[dict]) -> None:
    """Saves companies to a file."""
    with open("companies.json", "w") as f:
        companies = json.dump(companies, f, indent=4)


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
pytest
pylint
```
</TabItem>
</Tabs>
</details>

### Introduction

**Ask** trainees to tell you why mocking is important when testing and why we need to mock functions

**Highlight** the key ones:

- Because we need to control the input to our tests
- We can't try systems like APIs to be running at all the time
- Data changes all the time and we can't test against that

### Preparing to Test

**Remind** trainees that testing "pure" functions (functions where output is solely determined by input) is easier than "impure" ones.

**Stress** that API routes - because they are focused on communication with external clients - are definitionally impure, as are functions that interact with external data sources.

**Counsel** that we should still make functions as pure and single-purpose as possible, because it will make testing much easier.

**State** that API routes should focus primarily on interpreting the request and forming the response; they should call other functions to do data manipulation and other tasks.

**Explain** that a single-purpose function with minimum impurities is easier to isolate, and easy-to-isolate functions are easy to test (and therefore update, maintain, and use).

**Refactor** the `/company` route to do this quickly. The key point is to have a more testable function, not to go line-by-line here.

<Tabs>
<TabItem label="main.py" value="main.py">
```py

...

from data_functions import (load_companies,
                            get_company_by_id,
                            get_companies_by_country,
                            create_new_company)

...

@api.route("/company", methods=["GET", "POST"])
def company_index():
    """Returns a list of companies."""

    args = request.args
    companies = load_companies()

    if request.method == "POST":
        new_company = request.json

        if is_new_company_valid(new_company):

            new_company = create_new_company(new_company, companies)

            return new_company, 201
        else:
            return {
                "error": True,
                "message": "Company missing required data."
            }, 400

    else:

        if "country" in args:
            return get_companies_by_country(companies, args["country"])

        return companies

...

```
</TabItem>
<TabItem label="data_functions.py" value="data_functions.py">
```py

...

def is_new_company_valid(company: dict) -> bool:
    """Returns True if a dict has all required properties."""
    return all([k in company
                for k in
                ('name', 'domain', 'country', 'email', 'stock')])


def create_new_company(company: dict, companies: list[dict]) -> dict:
    """Returns a new saved company."""
    
    data_id = len(companies) + 1
    company['id'] = data_id
    companies.append(company)

    save_companies(companies)

    return company

...

```
</TabItem>
</Tabs>

**Highlight** that this process has resulted in three easier-to-test functions rather than one difficult-to-test one.

### Challenge

**Give** trainees ~5 minutes to refactor their API code to be more testable.

### Testing & Mocking

**Stress** that, as code gets more complex/inter-connected, our testing strategy has to evolve.

**State** that trainees should start by testing the simplest, purest functions, and then slowly expand test coverage to the more complex ones.

**Refer** to the `save_new_company()` function and explain that it is **impure**: it calls a function that affects external data.

**Remind** trainees that unit testing is about **isolating** behaviour.

**Work** through the below example of writing a test for this function that mocks the underlying function.

<Tabs>
<TabItem label="test_data_functions.py" value="test_data_functions.py">
```py
@patch("data_functions.save_companies")
def test_create_new_company_generates_correct_id(fake_save_company):

    # Arrange
    test_companies = [{"id": 1}, {"id": 2}]
    test_company = {}

    # Act
    result = create_new_company(test_company, test_companies)

    # Assert 
    assert result["id"] == len(test_companies)
```
</TabItem>
</Tabs>

**Highlight** the following features:

- The `@patch` decorator taking a function name and location
- The mocked object being passed as the first argument to the testing function
- The simplicity of the test data: we don't need to complicate `test_company` or `test_companies` beyond the requirements of the test.

**Explain** that the mock doesn't need to do much here, because the tested function only calls it; we don't need to complicate mocks beyond their immediate usage.

<details>
    <summary>Click here for an example of mocking the `load_companies()` function if asked for.</summary>
    <Tabs>
        <TabItem label="test_data_functions.py" value="test_data_functions.py">
```py

@patch("builtins.open", new=mock_open(read_data='[{"id": 4},{"id": 2}]'))
def test_load_companies_returns_list_of_dicts():

    # Act
    data = load_companies()

    # Assert
    assert isinstance(data, list)
    assert all(isinstance(d, dict) for d in data)

```
        </TabItem>
    </Tabs>
</details>

### Challenge

**Challenge** trainees to add another test for `create_new_company()` using mocking.

> Write a test to validate that the `create_new_company()` function returns a `dict` with the correct value for `title`.

### Fixtures

**Point** out that, if we write more tests, we'll be having to repeat the test data again and again.

**Ask** students for a definition of 'fixture': a [reusable context for tests](https://docs.pytest.org/en/7.1.x/explanation/fixtures.html#what-fixtures-are).

**Get** trainees to explain conftest.py: a file that's run before any tests are started, and can be used to set up fixtures in advance.

**Refactor** the test to use fixtures.

<Tabs>
<TabItem label="test_data_functions.py" value="test_data_functions.py">
```py
@patch("data_functions.save_companies")
def test_create_new_company_generates_correct_id(fake_save_company, test_company, test_companies):

    # Act
    result = create_new_company(test_company, test_companies)

    # Assert 
    assert result["id"] == len(test_companies)
```
</TabItem>
<TabItem label="conftest.py" value="conftest.py">
```py
import pytest

@pytest.fixture
def test_companies():
    return [
        {"id": 4, "name": "A"},
        {"id": 2, "name": "B"},
        {"id": 3, "name": "C"}
    ]

@pytest.fixture
def test_company():
    return {
        "name": "D"
    }

```
</TabItem>
</Tabs>

**Stress** that these fixtures can now be used in any test, and it's easy to update/improve them if future tests demand it.

### Challenge

**Instruct** trainees to update the test they wrote in the previous challenge to also use these fixtures.

### Testing Routes

**Note** that we're now writing code that talks to the internet as a whole. Isolating under these conditions is a little trickier.

**Identify** the API itself as something we'll want to include in multiple tests.

**Create** an API fixture using Flask's built-in `.test_client()`; it will behave exactly like the real API, but doesn't need to be running live to be used.

<Tabs>
<TabItem label="conftest.py" value="conftest.py">
```py

...

from main import api

@pytest.fixture
def test_api():
    return api.test_client()

...

```
</TabItem>
</Tabs>

**Demonstrate** a simple test using the fixture.

<Tabs>
<TabItem label="test_main.py" value="test_main.py">
```py
def test_api_base_route_returns_200(test_api):

    response = test_api.get("/")

    assert response.status_code == 200
```
</TabItem>
</Tabs>

### Challenge

**Challenge** trainees to add a second routing test.

> Create a test that checks that the result of a `GET` request to the `/` route returns `dict` with a key of `title`.

**Use** the example solution below if useful.

```py
def test_api_base_route_returns_dict_with_title_key(test_api):
    
    # Act
    response = test_api.get("/")
    data = response.json

    # Assert
    assert isinstance(data, dict)
    assert "title" in data
```

### Testing Routes with Mocking

**State** that the same principles of mocking apply to routing tests as to others: if there's an impurity, patch it out.

**Work** through the below test of the `DELETE /company/:id` route.

```py
@patch("main.delete_company_by_id")
@patch("main.load_companies")
def test_api_company_id_route_delete_returns_200(fake_load_companies, fake_delete,
                                                 test_api, test_companies):

    # Arrange
    fake_load_companies.return_value = test_companies
    fake_delete.return_value = "TEST"

    # Act
    response = test_api.delete("/company/2")

    # Assert
    assert response.status_code == 200
```

**Highlight** the following features in particular:

- The use of multiple mocks for multiple impurities
- Setting the `.return_value` of a mock to mimic the original function's behaviour

### Challenge: testing routes

**Divide** trainees into small groups

**Challenge** trainees to add tests for the following scenarios

- A `GET` request for `/company/3000000` returns a `400` status code
- A `POST` request for `/company` with a valid post body returns with a JSON object that has an `ID` key

### Conclusion

**Bring** trainees back together.

**Get** everyone to share their tests, and select trainees to talk through the logic of each one.

**Explain** that more complex behaviour will lead to more complex mocking; there's a lot more that can be done with mocks than we're doing here.

**Stress** that tests should serve the code; they're a tool, not the main output. Trainees should only write complex tests when unavoidable, and only use mocking when there is not another option.

</LockedContent>
