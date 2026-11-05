---
objectives: ["Use type hints in Python function definitions", "Explain the benefits of using type hints in Python", "Use functions to abstract away complexity", "Use return types effectively", "Break down a single function into many smaller functions", "Explain the difference between `print()` and `return` in Python"]
module: Fundamentals
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

# Effective Abstraction

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into slack

```
/prework Effective Abstraction
```

### Read

Read the following articles:

- [Functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
- [Return Statements](https://docs.python.org/3/reference/simple_stmts.html#return)
- [Function Arguments](https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions)
- [Function Annotations](https://docs.python.org/3/tutorial/controlflow.html#function-annotations)
- [Docstrings](https://www.python.org/dev/peps/pep-0257/)

### Answer

- What is the difference between a print() and a return statement?
- What is the difference between a function definition and a function call?
- When would you use a `return` statement?
- When would you use a `print()` statement?
- What are function parameters?

### Watch

Watch this video to deepen your understanding of scope

<EmbeddedYoutubeVideo id="38uGbVYICwg" />

## Workshop

<LockedContent password="ownership">

### Setup

**Ask** the trainees to define abstraction. Why might it be useful?

**Explain** that abstraction

> - Hides detail so we can work at the right level
> - Makes code easier to use and harder to break

**Explain** that in Python, functions are our main tool for abstraction

### Lecture

**Explain** the principles of effective functions:

> - A function should do **one job**
> - A function should have clear **inputs** (parameters) and **outputs** (return values)
> - Prefer `return` over `print()` for reusable logic
> - Functions should be **predictable**: same input, same output

**Show** the following messy function:

```python
def play_game():
    user = input("Enter rock, paper or scissors: ").lower()
    import random
    cpu = random.choice(["rock", "paper", "scissors"])
    if user == cpu:
        print("Draw")
    elif (user == "rock" and cpu == "scissors") or \
         (user == "scissors" and cpu == "paper") or \
         (user == "paper" and cpu == "rock"):
        print("You win!")
    else:
        print("Computer wins!")
```

**Ask** the trainees: What are the problems here?

> - Too much responsibility in one place
> - No return values, only prints

**Explain** that the goal is to break this into smaller, focused functions:

> - Pitfall: printing in logic functions → Fix: use return values
> - Pitfall: vague names → Fix: name by outcome (e.g. `determine_winner`)
> - Pitfall: too much code in one function → Fix: separate input, logic, and output

**Live Code** the following example of a simple function:

```python
from random import choice

...

def random_move() -> str:
    """Return one of: 'rock', 'paper', 'scissors'."""
    return choice(["rock", "paper", "scissors"])
```

### Task

**Explain** that we’re going to build Rock–Paper–Scissors from small functions

**Suggest** two starting functions, but emphasise that more will be needed for a complete game:

> - One function to handle user input
> - One function to decide who wins

**Explain** that the important part is breaking the problem into reusable pieces

**Task** the trainees (individually):

> - Build a Rock–Paper–Scissors game as a set of small functions
> - Requirements:
>    - At least three functions of your own design
>    - Type hints and docstrings!
>    - Logic functions must use return values, don’t print inside them
>    - The game should let a person play Rock–Paper–Scissors against the computer

### Wrap-up

**Ask** trainees if they have any questions

</LockedContent>
