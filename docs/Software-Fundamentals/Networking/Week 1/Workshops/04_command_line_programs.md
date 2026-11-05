---
objectives: ["Create a CLI using Python", "Structure & organise Python projects for reuse"]
module: Networking
week: 1
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

# Command-line Interfaces

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Command-line Interfaces
```

### Research - Command-line interfaces

:::info Task

Find answers to the following questions:

- What do the terms 'flag', 'option' and 'argument' mean when discussing command-line tools?
- What is the Python library `argparse` used for?
- What `curl` command would you use to access the data at [this link](https://www.gutenberg.org/files/43/43-0.txt) and store it in a file called `TSCDJMH.txt`?
- How many words, lines, and characters are there in `TSCDJMH.txt`?
- How many times does the word 'scientific' appear in `TSCDJMH.txt`?

:::

### Pre-work Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

**Remind** trainees of the `man` command.

**Show** the use of the `man` command with various utilities (e.g. `wc`, `grep`, `man`).

**Demonstrate** that even utilities that don't have `man` pages often have `--help` or `-h` options.

**Highlight** that this documentation, however it is accessed, shows how _customisable_ many programs are; they have default behaviour, but it can be modified in all sorts of ways.

**Debate** if, perhaps, it might not be nice if we could do that too.

## Command-line arguments

**Introduce** the `argparse` library and work through a simple example.

<Tabs>
  <TabItem label="main.py" value="main.py">

```py
from argparse import ArgumentParser

if __name__ == "__main__":

    parser = ArgumentParser(description="Displays basic argparse functionality")

    parser.add_argument("data", help="A required positional argument")

    args = parser.parse_args()

    print(args)
```

</TabItem>
</Tabs>

**Run** the program with `python main.py [value]` and demonstrate how the output changes with different data in place of `[value]`.

**Show** the built-in documentation with the `-h` flag: `python main.py -h`.

## Challenge

**Give** trainees the below challenge.

> Create a program with two required text arguments, `a` and `b`. The program should output the longer argument followed by the shorter.

**Stress** that, once arguments have been parsed, they are just normal data inside the program. Actually using the arguments requires writing further code.

## Complex Arguments

**Explain** that we've so far only worked with one type of argument, the most straightforward, but `argparse` provides many different options.

**Talk** through the below additions to your existing code with trainees, highlighting the different controls available.

<Tabs>
  <TabItem label="main.py" value="main.py">

```py
    ...
    parser.add_argument("data", help="A required positional argument")
    parser.add_argument("--option", help="An optional keyword argument")
    parser.add_argument("--option2", "-o", help="An optional keyword argument with a short version", type=int)
    parser.add_argument("--flag", "-f", action="store_true", help="An optional flag that requires no argument")
    ...
```

</TabItem>
</Tabs>

**Run** the program with `python main.py --option blue -o 3 -f up` (or similar) and demonstrate how the different arguments are picked up and interpreted.

**Explain** how different calls affect the result.

**Ask** trainees to predict the output of different calls.

**Explain** the benefits of this approach: we can write one program and use it in multiple different situations; it becomes a tool rather than a key.

### Challenge

**Provide** trainees with the below starter code:

<Tabs>
  <TabItem label="main.py" value="main.py">

```py
"""A CLI tool for searching anime."""

from argparse import ArgumentParser, Namespace

import requests as req

BASE_URL = "https://api.jikan.moe/v4/anime?"


def generate_url(query: str, max_results: int, sort: bool) -> str:
    """Returns a formatted URL based on CLI arguments."""

    url = BASE_URL + \
        f"&limit={max_results}&q={query}&sort={'desc' if sort else 'asc'}&sfw"
    return url


def display_anime_data(anime_data: dict):
    """Displays key details about an anime from a dict."""
    title = anime_data['titles'][0]['title']
    score = anime_data['score']
    scored_by = anime_data['scored_by']
    rating = anime_data["rating"].split(" - ")[0]

    print(f"{title} ({rating}) ~ {score}/10 ({scored_by})")


def display_results(results: list[dict]) -> None:
    """Displays each anime result in sequence."""

    for r in results:
        display_anime_data(r)


if __name__ == "__main__":

    raise NotImplementedError("You need to write the code!")

```

</TabItem>
</Tabs>

**Divide** trainees into pairs.

**Challenge** trainees to build a CLI tool from the starter code with the following features:

- Users can search for relevant anime by providing a `query` argument
- Users can pass an argument to control the number of results returned (default 5)
- Users can use a flag to sort results in descending order (default ascending)

**Refer**, if you need to, to a (rather elaborate) solution below.

<Tabs>
  <TabItem label="main.py" value="main.py">

```py
"""A CLI tool for searching anime."""

from argparse import ArgumentParser, Namespace
from typing import List, Dict, Any

import requests as req
import requests.exceptions

BASE_URL = "https://api.jikan.moe/v4/anime?"
TIMEOUT = 5000
DEFAULT_RESULTS = 5
NO_MATCHING_ANIME_MSG = "No matching anime found."
NETWORK_ERROR_MSG = "Network error occurred: "
JSON_ERROR_MSG = "Error parsing JSON response: "
UNEXPECTED_ERROR_MSG = "An unexpected error occurred: "

def collect_arguments() -> Namespace:
    """Returns parsed arguments from the command line."""
    description = "Returns the name and rating of anime for a given search term."
    parser = ArgumentParser(description=description)
    parser.add_argument("--number", "-n", default=DEFAULT_RESULTS, type=int,
                        help="the number of results to return")
    parser.add_argument("--sort", "-s", action="store_true",
                        help="sort results in descending order")
    parser.add_argument("query",
                        help="the query to search for")
    return parser.parse_args()


def get_anime_data(url: str) -> List[Dict[str, Any]]:
    """Returns valid anime data from the Jikan API as a list of dictionaries."""
    try:
        response = req.get(url, timeout=TIMEOUT)
        response.raise_for_status()
        shows = response.json().get("data", [])
        return [show for show in shows if show.get("rating") and show.get("score")]
    except requests.exceptions.RequestException as e:
        print(f"{NETWORK_ERROR_MSG}{e}")
        return []
    except ValueError as e:
        print(f"{JSON_ERROR_MSG}{e}")
        return []


def generate_url(query: str, max_results: int, sort: bool) -> str:
    """Returns a formatted URL based on CLI arguments."""
    url = BASE_URL + \
        f"&limit={max_results}&q={query}&sort={'desc' if sort else 'asc'}&sfw"
    return url


def display_anime_data(anime_data: Dict[str, Any]) -> None:
    """Displays key details about an anime from a dictionary."""
    title = anime_data['titles'][0]['title']
    score = anime_data['score']
    scored_by = anime_data['scored_by']
    rating = anime_data["rating"].split(" - ")[0]
    print(f"{title} ({rating}) ~ {score}/10 ({scored_by})")


def display_results(results: List[Dict[str, Any]]) -> None:
    """Displays each anime result in sequence."""
    for result in results:
        display_anime_data(result)


def main() -> None:
    """Main function to execute the CLI tool."""
    try:
        args = collect_arguments()
        search_url = generate_url(args.query, args.number, args.sort)
        anime_data = get_anime_data(search_url)
        if not anime_data:
            print(NO_MATCHING_ANIME_MSG)
        display_results(anime_data)
    except IndexError:
        print(NO_MATCHING_ANIME_MSG)
    except TypeError:
        print(NO_MATCHING_ANIME_MSG)
    except requests.exceptions.RequestException as e:
        print(f"{NETWORK_ERROR_MSG}{e}")

if __name__ == "__main__":
    main()

```

</TabItem>
</Tabs>

</LockedContent>
