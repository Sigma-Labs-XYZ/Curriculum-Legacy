---
title: Pipelines
objectives:
  [
    'Describe the process of deploying software to the cloud at a high level',
    'Describe what CI/CD is and why it is beneficial',
    'Describe what a Development Environment is',
    'Describe the role of Github in Software Deployment',
    'Use git to create a branch on a repository',
    'Describe how software was built before CI/CD and how it is built with CI/CD',
    'Describe the benefits of using an RDS'
  ]
module: Intro-Cloud
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";

# Pipelines

<LearningObjectiveComponent />

## Prework

### Setup

If it hasn't been done already, copy and paste this command into Slack.

```
/prework Pipelines
```

### Watch

<iframe id="border" width="100%" height="315" src="https://www.youtube.com/embed/Dl-BdxNRUqs?si=xbYaJ8VqDR8E2yip" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullscreen></iframe>

### Research & Answer

:::info Task

Before the workshop, research the following questions

1. What is Continuous Integration?
2. What is Continuous Deployment?

Share your answers in the thread on Slack when you are done.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** students what frustrations they've had with deployments.

**Discuss** some of the below annoyances:

- Git problems
- Remembering to test/lint each time
- Having to click/type so much to go through each stage
- Remembering to redeploy at all after writing new code

**Highlight** that, while there is **always** a role for human evaluation, automating the more tedious steps of deployment helps build more robust and reliable processes.

### Managing Git

**Recap** on branching on github specifically focussing on the below. Previously teaching this workshop, the trainees have not had much experience using branching.

- Why we branch
- The benefits of branching
- Commands to branch in Git

**Create** a new GitHub repository to use as an example.

**Take** the opportunity to quiz students on the indispensable elements a new repository should have:

- A basic `README.md`
- A `.gitignore` file

### Actions

**Introduce** the concept of GitHub actions: a way to automate regular tasks that uses a `.yaml` file (which stands for Yet Another Markup Langauge).

**Walk** through the process of setting up a simple GitHub action in the repository:

```yaml
name: echo
on:
  workflow_dispatch:
  pull_request:
  push:
    branches:
      - main
jobs:
  echo:
    name: echo a string
    runs-on: ubuntu-latest
    steps:
      - name: echo
        run: echo "Look! I'm a string!"
```

**Point out** that YAML is just another way of representing nested data.

**Share** the below data that shows this

```json
{
  "name": "echo",
  "on": {
    "workflow_dispatch": {},
    "pull_request": {},
    "push": {
      "branches": ["main"]
    }
  },
  "jobs": {
    "echo": {
      "name": "echo a string",
      "runs-on": "ubuntu-latest",
      "steps": [
        {
          "name": "echo",
          "run": "echo \"Look! I'm a string!\""
        }
      ]
    }
  }
}
```

**Note**, particularly, the following:

- Essential YAML syntax for lists and objects
- The use of `workflow_dispatch` to make the action manually triggerable.

**Switch** to a new branch and add a `main.py` file:

```py
def find_longest(arr):
  longest = arr[1]
  for i in range(1, len(arr)):
    if len(arr[i]) > len(longest):
      longest = arr[i]
    return longest


if __name__ == "__main__":
  print(find_longest(["yellow", "red", "blue", "green"]))
```

**Create** a new PR and demonstrate that the action runs on each change to the branch.

**Merge** the PR and show the action running once again.

### Quality control

**Ask** students if the code in `main.py` is any good. Ideally, they'd answer 'no', for the following reasons:

- Lack of docstrings/type hints
- The loop skips the first word in the list
- `return` inside the loop leads to short-circuiting

**Highlight** that - while these errors are more than usually obvious - the way to avoid committing such terrible code is through testing.

**Adapt** the action file to run tests on every PR:

```yaml
name: Tests
on:
  workflow_dispatch:
  pull_request:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Python
        uses: actions/setup-python@v4.6.0
      - name: Install requirements
        run: |
          pip install -r requirements.txt
      - name: Run tests
        run: pytest
```

**Create** a new branch and add a `requirements.txt`:

```txt
pytest
```

**Add** a `test_main.py` file on the same branch, with an example test:

```py
from main import find_longest

def test_get_longest():
  assert "yellow" == find_longest(["yellow", "red", "blue", "green"])
```

**Create** a new PR and watch the action fail, blocking the merge.

**Stress** that trainees should still run tests locally, as part of their standard development process, but that this provides another shield against disaster.

### Continuous Deployment

**Consider** now how much time is spent deploying code. Wouldn't it be interesting if we could get a Github Action to do the same?

**TODO** Fill in after workshop

### Conclusion

**Highlight** that this has only been a short introduction; just as deployments can get very complex, so too can automated pipelines to manage that complexity.

**Encourage** trainees to keep on experimenting with these concepts; automated testing and deployment can be useful in all future weeks as well as this one.

</LockedContent>
