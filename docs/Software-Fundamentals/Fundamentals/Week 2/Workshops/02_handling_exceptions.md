---
objectives: ["Explain what it means to raise and catch an exception", "Raise an exception in Python using the `raise` syntax", "List the common Exception types and what they mean", "Implement a `try...except` block to guard against code that may raise an exception", "Write unit tests to verify functionality"]
module: Fundamentals
week: 2
workshop: true
title: "Handling Exceptions"
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre-work

No prework as this is an afternoon workshop.

## Workshop

<LockedContent password="ownership">

**Ask** the trainees to define the term `error`

> An error is a programming language's way of letting us know that something went wrong when trying to run a program. Python is not compiled and is an interpreted language, so these are runtime errors (which only happen when you try to run code).

**Ask** the trainees to list errors they've seen. Can they explain what they mean?

> - SyntaxError
> - NameError
> - ValueError
> - TypeError
> - etc

**Explain** the idea of an 'exception': an error interrupts the normal execution of code, short-circuiting the program to raise an immediate issue.

**Cause** exceptions to be raised and show the trainees the tracebacks.

- `1 + "1"`
- `dromedary["eggs"]`
- `[1, 2, 3][4]`

**Ask** trainees to identify the key parts of the traceback.

**Highlight** that the last lines always explain what has gone wrong and where.

**Introduce** the idea of a 'raised exception': when you (as the developer) `raise` an error, announcing a problem to the rest of the program.

**Ask** the trainees to explain why a developer might raise an error.

> - To highlight to other engineers when something has gone wrong
> - To allow a function to focus only on its core responsibilities

**Ask** the trainees to list some examples of when they might want to raise an exception

> - When a user inputs the wrong data type
> - When a user inputs the wrong data
> - When a user inputs a value that is out of range
> - When a user inputs a value that is not allowed
>   etc

**Live code** an example of raising an exception.

```python
def set_new_password(new_password, new_password_2, old_password) -> str:
  """Returns the updated password."""
  if new_password != old_password:
    raise ValueError("Passwords must match!")
  if new_password == old_password:
    raise ValueError("New password cannot be the same as old password!")
  return new_password
```

### Challenge

**Instruct** trainees to return to their `Question` code from the previous workshop.

 <details>
  <summary>Click here for a complete version of the previous workshop's code.</summary>
  
  ```py
class Player:
    """An individual player in the game."""

    def __init__(self, name: str, player_num: int, score: int):
        """Runs when a new Player instance is created."""
        self.name = name
        self.player_num = player_num
        self.score = score

    def update_score(self, amount: int) -> None:
        """Updates the player's score."""
        self.score += amount

    def __str__(self) -> str:
        """Represents the player as a string."""
        return f"<Player {self.player_num} ({self.name})>"


class Question:
    """A single question in a quiz."""

    def __init__(self, question: str, topic: str, correct_answer: str):
        self.question = question
        self.topic = topic
        self.correct_answer = correct_answer
        self.points = 2

    def __str__(self) -> str:
        """Represents the question as a string."""
        return f"<Question ({self.topic})>"

    def pose(self) -> None:
        """Display the question."""
        print("-----")
        print(self.question)

    def answer(self) -> bool:
        """Check if an answer is correct."""
        answer = input("> ")

        return self.correct_answer == answer


if __name__ == "__main__":
    q = Question("Are elephants big?", "Biology", "Relatively")
    q.pose()
    q.answer()

  ```

</details> 

**Challenge** them to add exception handling to their `Question` class. When answering a question, the answer given **must** not be an empty string.

### Challenge

**State** that raising errors is appropriate in any context where something beyond a function's responsibility occurs.

**Task** trainees with creating a `Quiz` class that meets the below specification:

> A quiz should have a list of topics and a list of questions.
>
> Every question must be from one of the appropriate topics.
> 
> Only quizzes with at least three questions are valid

**Divide** trainees into pairs and give them ~10 minutes to complete this challenge.

**Gather** trainees back together and go through the code.

```python

class Quiz:
  """A question-and-answer game."""

  def __init__(self, topics: list[str], questions: list[Question]):
    self.topics = topics
    self.questions = questions

    if len(self.questions) < 3:
      raise ValueError("A quiz requires at least three questions.")

    for q in self.questions:
      if q.topic not in self.topics:
        raise ValueError("Incompatible question type.")

```

### Handling raised exceptions

**Live code** a new method for the `Quiz` class: `.play()`. This method should loop through the questions, `.pose()` each one, collect user input, and attempt to answer the question.

```python
  def play(self) -> None:
    """Iterate through the questions, posing each one."""

    for q in self.questions:
      q.pose()
      result = q.answer()
      if result:
        print("Correct!")
      else:
        print("Incorrect!")
```

**Highlight** an issue: if the user enters an empty string as a response to any question, the whole quiz fails.

**Introduce** the `try...except` block as a way to handle raised errors.

```python
    try:
      result = q.answer()
      if result:
        print("Correct!")
      else:
        print("Incorrect!")
    except ValueError:
      print("Invalid answer.")
```

**Caution** that `try...except` blocks should be used carefully, and only in specific circumstances:

- A raised error is likely
- The error cannot be prevented
- You have a fallback plan

**Mention** that these circumstances tend to occur at the boundaries of code: communicating with users or external services. In most other situations, your code is fully under your control, and so should not need this level of safety-proofing.

**Stress** that good code raises errors whenever appropriate, but only catches them when the above specific requirements are met. It is extremely bad/lazy/inelegant to wrap all your code in `try...except` blocks.

### Challenge

**Task** trainees with expanding the `.answer()` method:

- If a user enters an invalid answer (e.g. an empty string), they should be repeatedly prompted until they enter a valid one.

**Provide** the extension of writing more tests to verify the expanded `Question` functionality.

### Conclusion

**State** that raising errors (and more rarely, catching them) is a key technique for writing more complex code.

**Encourage** trainees to experiment with this syntax, writing more robust code.

</LockedContent>
