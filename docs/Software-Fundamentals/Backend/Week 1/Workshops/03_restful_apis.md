---
objectives: ["Describe the properties of a RESTful API", "Build an API so that it is RESTful"]
module: SF-Backend
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent"
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# RESTful APIs

<LearningObjectiveComponent />

## Pre-work

If nobody has done so already, copy and paste this command into Slack.

```
/prework RESTful APIs
```

:::info Task

Answer the following questions:

- What is a REST architecture?
- What are the benefits of using a REST architecture?

In your own words, summarise each of the five principles of a REST API. Try not to write more than one sentence for each.

> 1. Uniform interface
> 2. Client-server
> 3. Stateless
> 4. Cacheable
> 5. Layered system

:::

## Workshop

<LockedContent password="ownership">

**Establish** the idea of REST as an [architectural style](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm) for building effective APIs.

**Unpack** the term "REST" and explain how it relates to the elements of APIs.

- **RE**presentational (APIs deal with data representations of resources, rather than the actual underlying things themselves)
- **S**tate (the representations of data express the current or desired state of a resource)
- **T**ransfer (representations are exchanged between the server and the client)

**Elicit** questions from the trainees surrounding REST principles and the coursework in general. Feel free to [use copious amounts of Socratic questioning](https://start-teaching.com/socratic-method/).

**Question** the trainees to explain the principles/constraints of a REST API:

> 1. Client–Server  
>    - Separates concerns: the client handles the user interface, the server manages data and business logic.  
>    - Why? Encourages modularity and independent evolution of front and back ends.
> 
> 2. Statelessness  
>    - Every request from client to server must contain all the information needed to understand and process it.  
>    - Why? Simplifies server implementation, makes it easier to scale (no per-client session state to replicate or share).
> 
> 3. Cacheable  
>    - Responses explicitly declare whether they’re cacheable and are made cachable as far as possible. Resources are cachable if they can be served to any user.
>    - Why? Allows intermediaries (browsers, CDNs) to reuse responses, improving performance and reducing server load.
> 
> 4. Layered System  
>    - Architecture may comprise multiple layers (load-balancers, gateways, firewalls, proxies), each unaware of others beyond its immediate neighbours.  
>    - Why? Enables scalability, security and encapsulation of legacy or specialised subsystems.
> 
> 5. Uniform Interface  
>    - Defines a standard way to identify and manipulate resources (for instance, using HTTP verbs like GET, POST, PUT, DELETE) and the URI should be the same across different resources (e.g. `/api/booking/3414/status` and `/api/booking/55252/status` should return the same data for different bookings)
>    - Why? Decouples client and server implementations; once you understand the interface, you can work with any RESTful service.

### Conventions

**Stress** that REST does not *require* APIs to be JSON served over HTTPS, but that, *in practice*, this is often the case as HTTP & JSON are very popular technologies for API construction, and REST is the most popular architectural style for APIs.

**Highlight** the idea that the principle of uniform interface means we should design services to be internally-consistent, but also not to defy wider conventions without a good reason.

**Explain** that this means a well-designed RESTful API using HTTPS should

- Use accurate HTTP Methods
- Use precise error codes
- Respond with consistently-shaped and -formatted data, always

**Introduce** the idea of [the Seven RESTful Routes](https://gist.github.com/alexpchin/09939db6f81d654af06b) as a consistent way to manage resources.

### Challenge

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
```
</TabItem>
</Tabs>
</details>

**Ask** trainees to identify the RESTful routes currently implemented by the API

- Index (`GET /company`)
- Create (`POST /company`)
- Show (`GET /company/:id`)
- Destroy (`DELETE /company/:id`)

**Highlight** that the 'New' and 'Edit' routes are normally used only with a frontend interface, as their function is to allow users to easily send data to the "Create" and "Update" routes. As such, they're not required for our API.

**Divide** trainees into small groups

**Challenge** trainees to create the remaining RESTful API route: "Update".

> Add an update route to the API. A `PATCH` request to `/company/:id` should replace any data stored for a particular company (except `id`) with the newly-provided values.

**Grant** trainees no more than 10 minutes to attempt this task.

### Conclusion

**Give** the trainees the following pop quiz

> 1. What does REST stand for?
> 2. When do we use a REST architecture?
> 3. What are the five principles of REST?
> 4. What does it mean that a REST API has a Uniform interface?
> 5. What is the relationship between the Client and the Server in a REST API?
> 6. How would you make an API stateless?
> 7. When can data be cached from an API?
> 8. What does it mean that a REST API has a Layered System?

</LockedContent>
