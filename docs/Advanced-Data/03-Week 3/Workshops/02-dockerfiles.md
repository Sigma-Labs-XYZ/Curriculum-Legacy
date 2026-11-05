---
title: 'Dockerfiles'
objectives:
  [
    'Write Dockerfiles to create new images',
    'Containerise applications using Docker',
    'Test and deploy containerised applications on AWS'
  ]
module: Advanced-Data
week: 3
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

### Research

:::info Task

- Read through [this article](https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/) to understand the basics of Dockerfiles
- Read [this cheatsheet](https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index) to get a sense of the syntax
- Find an open-source project on Github with a Dockerfile and try to understand it

:::

### Code

:::info Task

Write a Flask server with one route, `/draw`. This route should return a text-based representation of a single card (e.g. `"3H").

The server should run be default on port `8080`, but accept an environment variable to change this.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** trainees what they remember about Docker. What is it? Why is it useful?

**Remind** trainees that they've already used Docker to run different services (e.g. Kafka).

**Explain** that this was only possible because those services had been **dockerised**: configured to run as a container.

**Note** that, had they not been dockerised, we'd have had to do _much_ more config to get them running on our machines.

**Introduce** the key elements of this process:

- A **Dockerfile** describes how to build an image from your code
- An **image** is a compressed, portable version of your code, including all required resources and instructions
- A **container** is an isolated instance of your code, built from an image and actually running
- **Dockerisation** is the process of converting your code into an image using a Dockerfile

**Use**, if helpful, the analogy of a frozen meal here; the Dockerfile is the recipe, the image is the frozen meal, and the container is the edible, thawed version.

**State** that we can dockerise our own code/apps/services, gaining the same flexibility of which we have already taken advantage.

### The code

**Create** a script that has at least one dependency.

**Copy**, if you wish, the below example:

<Tabs>
  <TabItem label="main.py" value="main.py">

```py
"""Generates random pairings."""

from random import shuffle

import pandas as pd


def load_names(filename:str="names.txt") -> list[str]:
    """Returns a list of names from a file."""

    with open(filename, "r", encoding="utf-8") as f:
        data = [l.strip().title() for l in f.readlines()]

    return data


def generate_pairs(names:list[str]) -> pd.DataFrame:
    """Returns a dataframe of random pairings."""

    return pd.DataFrame(
        data = [(names[i], names[i + 1]) for i in range(0, len(names), 2)]
    )


if __name__ == "__main__":

    names = load_names("names.txt")

    shuffle(names)

    pairings = generate_pairs(names)

    print(pairings)

```

  </TabItem>
  <TabItem  label="names.txt" value="names.txt">

```
Rich
Chris
Louise
Vanessa
Joni
Sodrul
Emily
Sophie
Matthew
Daniela
Xiao
Dave
```

  </TabItem>
  <TabItem  label="requirements.txt" value="requirements.txt">

```
pandas
```

  </TabItem>
</Tabs>

**Demonstrate** that this script runs locally.

**Discuss** all the things it requires to do so:

- Python
- All libraries installed
- A `names.txt` file in the right directory
- Knowledge of the command to run the script

**Point** out that having to ensure all of the above manually on every new computer quickly gets tedious/unmanageable.

**State** your intention to **dockerise** the app, so that it is portable and easy to run on the cloud.

## The Dockerfile

**Introduce** the concept of a Dockerfile and [share the documentation](https://docs.docker.com/engine/reference/builder/).

**Create** a basic Dockerfile:

```sh
# Describes what you do to the local code to build an image

FROM python:latest

COPY requirements.txt .

COPY names.txt .

COPY main.py .

RUN pip3 install -r requirements.txt

# The actual instruction when defrosted

CMD python3 main.py
```

**Talk** through the file, noting the key aspects:

- `FROM`, which defines a starting image
- `COPY` commands, to copy files from the local machine into the image
- `RUN` command, to execute particular shell commands in the image (install libraries, set up folders, etc.)
- `CMD` command, stating what command to execute _when a container is created_

### Dockerising

**Run** the dockerisation command: `docker buildx build -t [name]:[label] .`.

**Narrate** the process as it runs.

**Show** the created image with `docker image ls`.

**Run** a container based on the image with `docker run [name]:[label]` and show the output.

### Layers

**Make** a small change to the script and re-build the image.

**Note** that it takes a while.

**Explain** the idea of [cached layers in an image](https://docs.docker.com/build/cache/): as the installation step is after the script being copied, a small change to the script leads to a whole new install.

**Swap** the `COPY` and `RUN` instructions, and show that it builds faster after small changes, only installing libraries once.

**Warn** trainees that having out-of-order instructions can _really_ slow down development time; they should be thinking about efficiency at every stage.

### Challenge

**Divide** trainees into pairs.

**Challenge** pairs to

> Create a dockerised app that does the following when run:
>
> - Runs the server written during the pre-work
> - Makes it accessible in the browser when the docker container is run
> - Above & Beyond: Add a Healthcheck to the docker container

**Encourage** trainees to explore the documentation and find more advanced behaviour.

**Allow** them the remaining time to experiment/explore this technology.

**Answer** any questions that arise.

### Conclusion

**Assert** that any app can be dockerised, and that doing so provides a clean, organised way to move it onto the cloud.

**State** that dockerising apps will be a common step in this week and future ones.

</LockedContent>
