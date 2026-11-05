---
objectives: [
    "Explain what inheritance is conceptually using real-world analogies",
    "Write code that implements inheritance between two classes",
    "Use the `isinstance` keyword to introduce type guards",
    "Call a parent class's method using the `super()` keyword",
    "Write unit tests to verify functionality"
]
module: Fundamentals
week: 2
workshop: true
title: "Inheritance"
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack

```
/prework Inheritance
```

### Watch

:::info Task

Watch the below video on inheritance in OOP.

<EmbeddedYoutubeVideo id="an59YHkdK9A" />

:::

### Research

Spend some time learning about what "inheritance" is in

1. Object Oriented Programming
2. Modern Python (syntactically describing inheritance)

### Plan

We can create a `Question` class to store information for a quiz game, but really this is too generic; quizzes can often involve different kinds of question. See some examples below.

- `True`/`False`
- Numeric answer
- Select the odd one out

:::info Task

Choose one of the above types of question. Design a class for it based on your original `Question` class from the previous workshop.

Identify

- The information it would need at creation
- Any methods that would be required
- Any differences required from the basic Question class

:::

### Pre-work Submission

:::info Submission

Share your code in the Slack Thread when you've attempted this no sooner than 10 minutes before the start of the workshop.

:::

## Workshop

<LockedContent password="ownership">

### Inheritance

**Ask** trainees to define the term 'inheritance' in OOP.

**Explain** that a class can be based on another class; it **inherits** from it. An inherited class (or **child**) has all the same attributes and properties of its **parent**.

**Motivate** the use of inheritance by talking about **DRY**; inheritance allows shared behaviour to be written once only, with classes only differing where they have distinct requirements.

**Live code** a simple example of inheritance, based on the `Player` class created in previous workshops.

```python
class Player:
  """An individual player in the game."""

  def __init__(self, name: str, player_num: int, score: int):
    """Function that runs when a new instance is created."""
    self.name = name
    self.player_num = player_num
    self.score = score

class TeamPlayer(Player):
    """An individual player on a specific team."""

    def __init__(self, name: str, player_num: int, team: str, score: int):
        """Function that runs when the instance is created.
        self.team = team
        super().__init__(name, player_num, score)
```

**Highlight** the use of `super()` to refer to the instance of a parent class.

**Demonstrate** that an instance of `TeamPlayer` has access to attributes defined only in `Player`.

```python
p = TeamPlayer("Marvin", 1, "red", 0)
print(p.score)
```

**Introduce** trainees to the [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle), which states that an instance of a child class should also be a valid instance of the parent class.

**Demonstrate** the use of `isinstance()` to check this.

```python
p = TeamPlayer("Marvin", 1, "red", 0)

print(isinstance(p, TeamPlayer))
print(isinstance(p, Player))
```

**Warn** against using `type()` to check if an instance belongs to a class, as it only checks the immediate class, rather than the parent(s).

**Gather** questions about inheritance and clear up any misconceptions.

### Challenge

**Divide** trainees into pairs.

**Task** them with implementing the following question types using inheritance:

- `True/False`
    - The user can enter `T` or `F` only as an answer (case insensitive)
    - The question is only worth 1 point
- `Numeric`
    - The user can only enter numeric values

**Allow ~15 minutes for this task.

**Gather** trainees back together to discuss implementations.

### Challenge

**Divide** trainees into (different) pairs.

**Grant** trainees ~10 minutes to write as many tests as they can, verifying the functionality of their `Question` classes.

**Gather** trainees back together to discuss their approaches/share code.

</LockedContent>
