---
objectives: ["Use `requests` to fetch data from the internet using Python", "Parse JSON into a Python dictionary", "Extract data from a Python dictionary"]
module: Networking
week: 1
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

# Fetching Data

<LearningObjectiveComponent />

## Pre-work

No Pre-work for Afternoon Workshops

## Workshop

<LockedContent password="ownership">

**Recap** the ideas that we spoke about in the morning session.

> - Clients are the users of a service (i.e. a laptop)
> - Servers are the providers of a service (i.e. a website on the internet)
> - APIs are the way that clients and servers communicate
> - HTTP is the protocol that APIs use to communicate

**Introduce** the [`requests`](https://pypi.org/project/requests/) library, which is a simple way to make HTTP requests in Python.

**Explain** what JSON is and the difference between JSON strings and Python dictionaries:

> - JSON (JavaScript Object Notation) is a standard text-based format for representing structured data based on JavaScript object syntax
> - JSON is commonly used for transmitting data in web applications between a server and client
> - When we make API requests, the response is often in JSON format (a string)
> - The `response.json()` method converts the JSON string into a Python dictionary
> - A JSON string looks like `'{"name": "John", "age": 30}'` (note the quotes and double quotes)
> - After conversion, it becomes a Python dictionary: `{"name": "John", "age": 30}` (no outer quotes)
> - This conversion is essential because we can't directly access data in a JSON string, but we can easily access data in a Python dictionary using keys

**Live code** Using the GitHub API from [the morning workshop](./01_apis_networks.md) create a user searcher that will

> - Accept a search from the user of a GitHub username
> - List the user's
>   - name
>   - company
>   - number of public repositories
> - Show an error message if the username cannot be found
> - Handle any missing data gracefully

**Introduce** the [`requests-mock`](https://pypi.org/project/requests-mock/) library, which allows us to mock the `requests` library in our tests.

**Create** some example tests, showing how to mock the `requests` library and handle raised exceptions.

**Point** out that -- though mocking makes tests more complex -- these tests still follow the [AAA](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) framework. As we have more complex code now, we need a more complex "Arrange" step.

**Stress** the importance of consistent testing to trainees.

**Give** the trainees the task of completing the following task in pairs

> Adding another request that fetches the user's first five repositories displaying the name and stars number for each.

**View** the solution to the whole challenge can be found below:

<Tabs>
<TabItem label="github_user_search.py" value="github_user_search.py">

```py showLineNumbers
import requests


def load_user_data(user_name: str) -> dict:
  """Searches for a username on the GitHub API, returning the response data."""
  response = requests.get(f"https://api.github.com/users/{user_name}")
  if response.status_code == 200:
    return response.json()
  else:
    raise requests.exceptions.HTTPError("Unable to retrieve user data.")


def display_user_data(data: dict):
  """Prints GitHub user information from a dict."""
  print(f"User: {data['name']} ({data['login']})")
  if "company" in data:
    print(f"Company: {data['company']}")
  print(f"Public repositories: {data['public_repos']}")


def load_user_repository_data(user_name: str) -> list:
  """Returns data on 5 of a GitHub user's repositories."""
  response = requests.get(f"https://api.github.com/users/{user_name}/repos?per_page=5")
  if response.status_code == 200:
    return response.json()
  else:
    raise requests.exceptions.HTTPError("Unable to retrieve repository data.")


def display_repository_data(data: list):
  """Prints GitHub repository information from a list of dicts."""
  print("First five repositories:")
  for repo in data:
    print(f"  - {repo['name']} ({repo['stargazers_count']} stars)")


def main():
  """Prompts the user for a GitHub username and displays details about the matching account."""
  try:
    user_name = input("Enter a GitHub username: ")

    if len(user_name) == 0:
      raise ValueError("Cannot search for an empty username.")

    user_data = load_user_data(user_name)
    display_user_data(user_data)

    repos = load_user_repository_data(user_name)
    display_repository_data(repos)

  except Exception as e:
    print(f"Error: {e.args[0]}")


if __name__ == "__main__":
  main()
```

</TabItem>
<TabItem label="test_github_user_search.py" value="test_github_user_search.py">

```py showLineNumbers
import pytest
import requests

from github_user_search import load_user_data


class TestLoadUserData:

    def test_calls_request_get_method(self, requests_mock):
        """Checks if the load_user_data function calls requests.get()."""
        requests_mock.get("https://api.github.com/users/test", json={})
        res = load_user_data("test")

        assert requests_mock.called
        assert requests_mock.call_count == 1
        assert requests_mock.last_request.method == "GET"

    def test_returns_a_valid_dict(self, requests_mock):
        """Checks if the load_user_data function returns a dict with appropriate keys/values."""
        requests_mock.get("https://api.github.com/users/test", json={ "name": "Testley Testerson"})
        res = load_user_data("test")

        assert type(res) == dict
        assert "name" in res and res["name"] == "Testley Testerson"

    def test_raises_exception_on_request_failure(self, requests_mock):
        """Checks that the load_user_data method raises an exception if the API returns an error code."""
        requests_mock.get("https://api.github.com/users/test", status_code=500)

        with pytest.raises(requests.exceptions.HTTPError) as exception:
            res = load_user_data("test")

        assert exception.value.args[0] == "Unable to retrieve user data."
```

</TabItem>
</Tabs>

</LockedContent>
