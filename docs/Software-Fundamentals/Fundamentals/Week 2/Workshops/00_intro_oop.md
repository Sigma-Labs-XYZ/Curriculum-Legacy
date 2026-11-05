---
objectives: ["Explain the term 'abstraction' in an OOP context", "Write code that abstracts concepts into classes using the `class` keyword", "Explain the difference between a class and an instance", "Describe what a constructor is and what it is used for in a class", "Use the `self` parameter to read and write properties", "Add methods to a class to extend its functionality", "Write unit tests to verify functionality"]
module: Fundamentals
week: 2
workshop: true
title: "Intro to OOP"
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework OOP Research Project
```

### Watch

:::info Task

Watch the below video on OOP concepts.

<EmbeddedYoutubeVideo id="m_MQYyJpIjg" />

:::

### Define

:::info Task

Find definitions for the following terms in an OOP context:

- Abstraction
- Polymorphism
- Inheritance
- Encapsulation

:::

### Model

Imagine we are tasked with creating a Quiz game following OOP principles. The game will have a series of questions and answers.

A game has three rounds of questions, with each round containing 3-5 questions on a specific topic. A user playing the game individually would have a score tallying all of their correct answers on the quiz. Each question has multiple provided answers, only one of which is correct.

:::info Task

1. List out the classes that the quiz game might have.
2. List out the properties
3. Separate the properties into attributes and methods.

:::

### Pre-work Submission

:::info Submission

Please share your answers in the thread.

:::

## Workshop

<LockedContent password="ownership">

**Explain** *briefly* the problem that OOP is trying to solve

> - OOP is a way of modelling real world objects and processes in code.
> - It helps us to think about code in a way that is closer to how we think about real world objects and processes.
> - It helps when working with very large code bases
> - It can help to make code more readable and easier to understand
> - It can help us to reason about code more easily
> - It can help us to write code that is more reusable and more maintainable
> - It can help us to write code that is more testable

**Explain** *briefly* why we are learning it

> - You'll come across OOP code in your career
> - It shows you how to write different types of code
> - It's useful to show you more python language features

**Ask** the trainees to define the below terms:

- **Class**: a blueprint for an object
- **Instance**: an individual example of a class/a created object
- **Attribute**: a piece of information stored by an instance
- **Method**: a function bound to a class

**Introduce** the term 'abstraction': building a model or representation of an object that we can use again and again. This is the opposite of an implementation.

### Classes & objects

**Demonstrate** the basic syntax of a class through defining a `Player` class.

```python
class Player:
  """An individual player in the game."""

  def __init__(self, name: str, player_num: int, score: int):
    """Runs when a new Player instance is created."""
    self.name = name
    self.player_num = player_num
    self.score = score
```

**Highlight** the following features:

- The use of `CapWords` to name classes
- The `__init__()` **constructor** function
- The use of `self` to refer to the current instance

**Demonstrate** the use of the class to create multiple **distinct** instances.

```python
player_1 = Player('Spencer', 1, 0)
player_2 = Player('David', 2, 10)

print(player_1.score)
print(player_2.score)
```

**Highlight** that each instance has the same attributes, but with independent values.

### Challenge

**Task** trainees with creating a `Question` class. A new question should have a **topic**, the **question text** itself, and a **correct answer**.

**Grant** trainees ~5 minutes to complete the challenge and then share answers.

```python
class Question:
  """A single question in a quiz."""

  def __init__(self, question: str, topic: str, correct_answer: str):
    self.question = question
    self.topic = topic
    self.correct_answer = correct_answer
    self.points = 2
```

### Methods

**Remind** trainees that classes can also define methods: functions that belong to the instances and can operate on them.

**Add** a new method to `Player`, `.update_score()`, which accepts an argument and modifies the instance's data.


```python
class Player:
  """An individual player in the game."""

  def update_score(self, amount: int) -> None:
    """Updates the player's score."""
    self.score += amount
```

**Note** how the `self.` property can be used to refer to the instance's data.

### Challenge

**Task** trainees with adding two methods to the `Question` class:

- A `.pose()` method which displays the question text in a clear and readable format.
- A `.answer()` method which prompts the user for an answer and returns `True` or `False` if it is correct.

### Representations

**Show** trainees that printing an instance produces a relatively ugly string.

**Explain** that Python has a builtin method to improve this: `.__str__()`.

**Take** the opportunity to introduce 'dunder' methods as special Python syntax that often runs behind the scenes, implementing complex behaviour smoothly.

**Create** a simple `.__str__()` method for `Player` and show how the output of a `print()`ed instance changes.

```python
  def __str__(self) -> str:
    """Represents the player as a string."""
    return f"<Player {self.player_num} ({self.name})>"
```

**Ask** trainees to implement a better `.__str__()` method for the `Question` class.

### Testing

**State** that testing classes follows the same underlying principles as testing functions: you run the code with different inputs and make assertions about the results.

**Demonstrate** a simple test for the `Player` class:

```py
def test_player_object_has_name_attribute():

  # Arrange & Act
  p = Player("Test", 1, 0)

  # Assert
  assert p.name == "Test"
```

**Highlight**

- The continued usage of the *Arrange* - *Act* - *Assert* framework

### Challenge

**Challenge** trainees to write the following tests for the `Question` class:

- Verify that a `Question` object has its `.points` automatically set to `2`
- Verify that a `Question` object displays as the correct string

**Get** trainees to share their tests and discuss implementation differences.

### Conclusion

**Stress** to trainees that a clear understanding of the core concepts of OOP is vital to the week's challenges and future code.

**Gather** and answer any questions that trainees have, focusing particularly on unpicking misconceptions.

</LockedContent>
