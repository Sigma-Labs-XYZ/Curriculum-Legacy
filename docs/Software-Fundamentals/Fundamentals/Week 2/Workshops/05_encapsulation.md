---
objectives: [
    "Explain the conventions around non-public properties in Python",
    "Describe the role of getter and setter methods",
    "Implement getter and setter methods in classes",
    "List and define the four key concepts of OOP - Encapsulation, Abstraction, Polymorphism, Inheritance"
]
module: Fundamentals
week: 2
workshop: true
title: Encapsulation
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack

```
/prework Encapsulation
```

### Watch

:::info Task

Watch the below video on Encapsulation:

<EmbeddedYoutubeVideo id="sNKKxc4QHqA" />

:::

### Read

:::info Task

Read [this article](https://www.geeksforgeeks.org/encapsulation-in-python/) on encapsulation.

1. Write down any questions or concepts that you're unsure about.
2. Write a short description as to why encapsulation is necessary.
3. Come up with a straightforward real-world analogy for encapsulation.

Share your answers in the Slack thread.

:::

### Create

:::info Task

Create an entirely new `Player` class that meets the following requirements:

- A player is created with a date of birth, a nationality, a first name, a last name, and 0 or more middle names
- A new player has a score of `0`
- A player object has a simple, human-readable string representation
- A player object has a property, `age`, which returns their age in years

Share your code in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Encapsulation

**Ask** the trainees to define [**Encapsulation**](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)): objects having sole control of their internal data.

**Discuss** the rationale behind it:

- Separation of concerns (only worry about the code you're directly writing)
- Simple interfaces (reach out to easy-to-use services rather than manage everything yourself)
- Data protection (don't let other developers/users accidentally break/change something they shouldn't)

### Properties

**Ask** for a volunteer to share their prework code and discuss it.

**Explain** that the more complex `Player` class is a legal requirement for our burgeoning quiz business; we need to collect required data, and ensure that it is not exposed unnecessarily.

<details>
<summary>Click here for a basic implementation of the `Player` class.</summary>

```py
class Player:
    """An individual player in the game."""

    def __init__(self, first_name: str, last_name: str, middle_names: list[str], date_of_birth: date, nationality: str):
        """Runs when a new Player instance is created."""
        self.first_name = first_name
        self.middle_names = [] if not middle_names else []
        self.last_name = last_name
        self.dob = date_of_birth
        self.nationality = nationality
        self.score = 0
```

</details>

**Discuss** the different ways to manage the `age` parameter

- Calculate it at creation time (will get out of date)
- Run a method to calculate it (awkward interface--why access a value as an action?)
- Creating a **property** (the best option)

**Introduce** the idea of a `getter`: a method that acts as a value, allowing you to access complex behaviour on the fly without complicating the interface.

**Code** an `.age` property for the `Player` class

```py
  @property
  def age(self):
    """Returns a player's current age."""
    today = date.today()
    return today.year - self.dob.year - ((today.month, today.day) < (self.dob.month, self.dob.day))
```

**Talk** through the use of the `@property` decorator to modify the method and make it behave as a value.

**Demonstrate** that it can be accessed by `.age` rather than `.age()` and highlight that this is **encapsulation**: developers working with the `Player` class don't need to have detailed knowledge of its internals, just how to use it.

### Challenge

**Set** trainees the following task:

> Create a new property, `.name`, for the `Player` class. When accessed, this should provide a single name string containing a first name, any middle initials, and a last name.

### Private variables

**Explain** that, in some languages, data within a class can be protected directly using **access modifiers**, special keywords that determine where a value can be accessed/altered from.

**Alter** the code for `Player` so that the `.score` attribute is named `._score` and the `.nationality` attribute is `._nationality`.

**Explain** that (though it has no actual force) this is the convention for marking a variable as private in Python. It suggests that only methods on an object should modify it.

### Setters

**Introduce** the idea of a `setter` as a counterpart to a `getter`: a method that lets you manipulation input/data but that looks like it's simply setting a value.

**Create** a getter and `setter` for `._nationality`, allowing easy access (on `.nationality`), but ensuring that only French, Spanish, and German players are accepted.

```py

  @property
  def nationality(self):
    """Returns a player's nationality."""
    return self._nationality

  @nationality.setter
  def nationality(self, new_nationality: str) -> None:
    """Updates a players nationality."""
    if new_nationality not in ["French", "Spanish", "German"]:
      raise ValueError("Invalid Player nationality!")
    else:
        self._nationality = new_nationality

```

**Emphasise** that the method and decorator names need to match precisely.

**Demonstrate** accessing and setting the nationality for a player.

### Challenge

**Set** trainees the following task:

> Add a `getter` and `setter` for the player's score.
>
> - `.score` should be accessible as a value
> - Setting `.score` equal to value actually increments/decrements the `._score` by that amount
> - If a player's score would go below `0` or above `100`, it is clamped within those bounds
> - Any attempt to replace score with a non-integer value should raise an error
> 
> - Extension: add a new subclass, `PenaltyPlayer`. This class takes a handicap amount in its constructor, and subtracts that amount from the score whenever it is updated.

**Gather** trainees back together; ask for volunteers to explain their code.

**Collect** and answer any lingering questions.

### Conclusion

**Stress** that Python is not a language where encapsulation in enforced; it's supported, but mostly by convention, not syntax.

**Counsel** that, where appropriate, it can be a very powerful tool to keep connections between classes distinct

</LockedContent>
