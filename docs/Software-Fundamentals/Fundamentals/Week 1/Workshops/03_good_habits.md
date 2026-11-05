---
objectives: ["Identify good and bad habits in coding", "Use a style guide to write code", "Use VSCode effectively by using shortcuts and features", "Use type hints in Python function definitions", "Explain the benefits of using type hints in Python"]
module: Fundamentals
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";

# Good Habits in Coding

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into slack

```
/prework Good Habits
```

### Read

Review our Internal Style Guide

> https://coda.io/d/Trainees_dryBdidTdcn/Code-Style-Guide_suBej#_luf2v

And skim read the PEP8 Style Guide

> https://pep8.org/

### Think

:::info Task

Consider the following questions carefully:

- Why are style guides important?
- What are the repercussions of not following a style guide?

Don't share these yet; we'll discuss in the session.
:::

### Research

:::info Task

Research VSCode keyboard shortcuts. 

Find three that you think will be useful to you.

:::

:::info Task

Research terminal keyboard shortcuts.

Find three that you think will be useful to you.

:::

## Workshop

<LockedContent password="ownership">

### Live Code

**Ask** the trainees for reasons that using a style guide is important.

    - It makes code easy to read
    - It lets us collaborate better
    - It makes it easier to debug
    - It makes it easier to maintain
    - It makes it easier to refactor
    - It makes it easier to test
    - It makes it easier to document
    - You write code once, but read it many times - optimise for reading.

**Give** the below code to the trainees (using Slack code blocks) and ask them to identify what is wrong with it.

```python
import random

def check(str, guess):
    result = ['_' for _ in range(len(str))]
    for i, x in enumerate(guess):
        if x == str[i]:
            result[i] = x
        elif letter in str:
            result[i] = '?'
    return result

def gen_wor(wlist):
    return random.choice(wlist)

def func():
    i = gen_wor()
    go = 5
    while go > 0:
        input1 = input("Enter your guess: ")
        if len(i) != 5:
            print("Please enter a 5-letter word.")
            continue
        result = check(i, input1)
        print(' '.join(result))
        if input1 == i:
            print("Congratulations! You've guessed the word.")
            return
        go -= 1
    print(f"Sorry, you didn't guess the word. The word was {i}.")

list2 = ["apple", "place", "grape", "chair", "spear", "green", "plant", "house", "water", "money", "tiger", "panda"]
func(list2)
```

**Highlight** that the style makes it confusing and hard to read.

**Explain** that you can use pylint to check your code for errors and style issues.

**Demonstrate** this by running pylint on the code above.

**Show** how you can use the [pep8](https://peps.python.org/pep-0008/) style guide to tell you what is wrong with your code based on the codes that come back from running pylint

### Challenge

**Challenge** trainees to fix all the `pylint` errors in their code. They should focus on solving one issue at a time, and understanding why `pylint` thinks it is a problem.

**Grant** them ~5 minutes to get the highest `pylint` score they can.

**Discuss**: is the code now perfect? Has `pylint` fixed everything?

**Explain** that following the style guide is important, but not sufficient. Code with a low `pylint` score will be low quality, but code with a high `pylint` score will not necessarily be high quality.

### Effective Tool Use

**State** that trainees will be using their devices a lot, both during the course and for the next several decades after that.

**Assert** that if you spend that much time with any tool, you should learn how to use it effectively.

**Get** trainees to share the VSCode and terminal shortcuts they researched in the pre-work.

**Discuss** VSCode shortcuts and commands with trainees, demonstrating each one as they mention it.

**Ensure** that the following are covered:

#### VSCode

- `cmd` + Click to jump to definitions
- 'Rename Symbol' to rename variables
- `tab` and `shift`+`tab` to indent or outdent lines in bulk
- `cmd`+`/` to comment out lines in bulk
- `option` to select multiple places at once

#### Terminal

    - Use tab to auto-complete
    - Use up arrow to get previous commands
    - Use `ctrl` + `c` to cancel a command
    - Use `ctrl` + `l` to clear the terminal
    - Use `ctrl` + `a` to go to the start of the line
    - Use `ctrl` + `e` to go to the end of the line

### Good Habits

**Identify** following the style guide and using shortcuts effectively are good habits that will help them throughout their careers.

**Name** regular commits as another such habit.

**Explain** that you should commit often. Every 10-20 minutes is ideal. This will help you to keep track of your changes and make it easier to revert if you need to.

**Get** trainees to commit their latest `pylint`ed code as practice.

**Mention**, briefly, that regularly running tests is another excellent habit

### Avoiding Clutter

**Highlight** that all of these habits have a common theme; they're about reducing effort and mental load so you can focus on what's important while being confident that the fundamentals are secure.

**Explain** that perhaps the most important lesson any developer can learn is to focus on one thing at a time.

**State** that multitasking is not really a thing; it's actually just switching attention rapidly, and it harms focus/productivity unless carefully managed.

**Explain** that you should close all your tabs/programs unless you are actively working with them.

**Stress** that time spent searching for something in a forest of windows, and time spent switching tasks, is lost productivity.

**Introduce** YAGNI (You Ain't Gonna Need It). Following this principle will help trainees focus on the task at hand.

**Explain** that this goes for VSCode as well. Have only one instance open at a time. Close all your tabs. You Ain't Gonna Need It.

### Challenge

**Challenge** trainees to declutter their machines:

- Remove taskbar items
- Close browser tabs
- Turn off login items (programs that start at startup)
- Install an ad blocker
- Organise files/folders

</LockedContent>
