---
objectives: [
    "Write code that implements inheritance between two classes",
    "Use the `isinstance` keyword to introduce type guards",
    "Use polymorphism to refactor and DRY up repetitive code",
]
module: Fundamentals
week: 2
workshop: true
title: Polymorphism
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack

```
/prework Polymorphism
```

### Research

:::info Task

Research the term `polymorphism`.

- What does it mean?
- How is it used in practice?
- What other concepts can you compare/contrast with it?

Put your answers in the Slack thread.

:::

### Code

:::info Task

Create a new class, `MultipleChoiceQuestion` that inherits from `Question`.

This new class should

- Store a list of (exactly four) possible answers, one of which is correct
- Randomise the answer order at creation time
- Display them all as options when using `.pose()`
- Only accept the answers `A`, `B`, `C`, and `D`
- Be worth 3 points

Post your code in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Review

**Divide** trainees into small groups (~3) for the first fifteen minutes.

**Instruct** them to

- Compare their implementations of the `MultipleChoiceQuestion` class
- Identify points of difference and how they affect the class behaviour
- Develop one finalised form of the class

**Gather** trainees back together and get volunteers to share their work.

**Question** trainees on the code, aiming to probe understanding and rationale from a range of respondents.

### Polymorphism

**Highlight** to trainees that we've used inheritance before, but so far we haven't really benefited from it; it makes our code more complex, but what do we gain from that?

**Ask** trainees to define the term [**polymorphism.**](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) and link the idea to inheritance. Different things can have similar interfaces.

**Consider** using the analogy of different doors; they're all made out of different materials and open to different places, but there are only a few types of ways they open. If you can open one pull door, you can open other pull doors the same way.

**Ask** trainees if they can think of any places we've used, or could use, polymorphism in this module. Nudge towards the idea of the different `Question` classes.

**State**, baldly, that inheritance lets us reduce code duplication, and results in **polymorphic** objects; technically distinct classes with the same interface.

**Mention** briefly that polymorphism can exist outside inheritance (what matters is the compatible interface) but that the two concepts work well together, and two things with identical interfaces often do share a conceptual parent.

**Return** to the `Quiz` class from an earlier workshop, and point out that we're set up for polymorphism by default: the class accepts a list of `Question`s and will `.pose()` and `.answer()` each one in turn. Using polymorphism, we can use our child classes of `Question` here as well.

<details>
<summary>Click here for a complete version of the previously-made `Quiz` and `Player` classes.</summary>
```py
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

    def play(self) -> None:
        """Iterate through the questions, posing each one."""

        for q in self.questions:
                q.pose()
            try:
                result = q.answer()
                if result:
                    print("Correct!")
                else:
                    print("Incorrect!")
                except ValueError:
                    print("Invalid answer.")


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

```
</details>

### Challenge

**Give** trainees the following task:

> Add the following behaviour to the `Quiz` class:
> 
> - The constructor throws an error if any item in the initial `questions` list is not a valid `Question` instance.
> - The constructor accepts (and validates) a `Player` object
> - Whenever a question is correctly answered, the player's score is increased by the appropriate number of `points`.
 
**Gather** trainees back together and explain that everything they've done has been about implementing **polymorphism**.

- The `Quiz` class now works with anything `Player`- or `Question`-shaped
- Multiple different types of `Question` (as sub-classes) can be added to quizzes without any problem.

**Stress** that this is a key benefit of both polymorphism and inheritance: we've dramatically increased the scope of our program without having to add (much) new code, and it will be easy to extend with new types of `Player` and `Question` in the future.

### Conclusion

**State** that a good understanding of polymorphism is vital to building larger applications. After a certain point, it just isn't practical to keep on writing a completely custom structure for every variation. The more that interfaces can be shared and duplication minimised, the better.

**Gather** any questions on polymorphism (or OOP in general) that have arisen and answer them.

**Ask** trainees to order the following topics by their level of confidence/understanding:

- OOP
- Objects
- Constructors
- Exceptions
- Inheritance
- Polymorphism

**Discuss** any problem areas.

</LockedContent>