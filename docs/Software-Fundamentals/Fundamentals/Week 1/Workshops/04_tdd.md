---
objectives:
  [
    'Define and use Test-Driven Development',
    'Interpret passing and failing test cases',
    'Write simple test cases using `pytest`s `assert`ions',
    'Describe and implement the red, green, refactor cycle',
    'Explain the use of the "Arrange - Act - Assert" framework',
    'Describe the aims of the Software Fundamentals course',
    'Explain the process of doing coursework at Sigma Labs'
  ]
module: Fundamentals
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";
import EmbeddedYoutubeVideo from "@theme/EmbeddedYoutubeVideo"

# Test Driven Development

<LearningObjectiveComponent />

## Pre-work

### Setup

If nobody has done so already, copy and paste this command into Slack.

```
/prework TDD Research
```

### Watch

<EmbeddedYoutubeVideo id="uGaNkTahrIw" />

### Tasks

:::info Task

1. What is unit testing?
2. Why is unit testing important in Software Development?
3. What is a test suite?
4. What is "test coverage"?

:::

We'll be using `pytest` to write unit tests for our code. Before attending the session, research `pytest`. You should be able confidently describe what the following code does.

```py
def test_scoring_for_two_aces():
  assert points_for(['2D', 'AD', 'AC']) == 24
```

:::info Task

Write a short description of what this code is doing. You should explain what functions are being used, what they return and what an assertion is.

:::

:::info Submission

Respond to the thread in Slack with your answers to the questions as well as your description of the above code.

:::

## Workshop

<LockedContent password="ownership">

### Course Outcomes

**Explain** that we are currently in the `Software Fundamentals` course which will last for five weeks.

**Diagram** (using Excalidraw or similar) that the key aims for this course are to

> - Go from writing code to writing great code
> - Ensure our code works by writing great tests
> - Write code that can talk to the internet
> - Build an API from scratch
> - Use a database to store data in a scaleable way
> - Deploy all of this to the internet for the world to see

**Reinforce** that this is a very practical course. We will be writing code every day. It is also a very ambitious amount to cover in the amount of time we have.

**Explain** that we will be using a lot of tools and technologies that are industry standard. This is to give you the best chance of getting a job at the end of the course.

**Explain** that there some key reasons for us choosing these technologies and projects

> - They are industry standard
> - They will leave you well skilled no matter what you do in the rest of the course
> - They touch on some fundamental topics that are important to understand

**Explain** that most of all we want to install a **Professional**, **Engineering** **Mindset**.

**Ask** the trainees what they think this means

**Explain** that this means

> - Write code to solve real problems (we don't write code for the sake of it)
> - Being methodical and organised in your approach to solving problems (we don't just hack away at the keyboard until it works)
> - Producing high quality code, all the time, no matter what (we don't write bad code because it's quicker)

### Setup

**Ensure** that all trainees have completed the prework

**Ensure** that all trainees know how to ask questions during the session, and that we're expecting them to

### Why and what? (5 mins)

**Ask** the trainees for a definition of TDD

**Ask** the trainees for a definition of the Red, Green Refactor loop and define each part

**Ask** the trainees for some Pros and Cons of TDD

Pros:

> - TDD prevents writing buggy/excessive code
> - TDD code is simpler to read and understand
> - Easier to maintain

Cons:

> - It is time-consuming
> - Needs strict product requirements to write enough tests and then write enough code
> - Large overhead

**Wait** for questions from trainees. Do not move on until some questions have been asked.

### Explain: Testing with Pytest

**Introduce** `pytest` as Python's standard tool for writing and running automated unit tests.

**Explain** the key elements required when writing a test:

- **Test file**: `pytest` looks for files that match `test_*.py` or `*_test.py`
- **Test function**: Each test is a standalone function whose name starts with `test_` (for example, `def test_triangle_is_valid():`)
- **Invoking the code**: The test calls the function with test arguments
- **Assertion**: Uses Python's built-in `assert` statement (`assert actual == expected`) to check if the result matches the expectation
- **Running tests**: Trainees run `pytest` in the terminal to execute all test functions and report passing or failing cases

### Live Coding

**Explain** the problem to the trainees

> We're going to build a program that takes an input of three sides of a shape and tells you if it would make a valid triangle.
>
> In a valid triangle, the sum of any two sides must be larger than the remaining side. For example, the triangle `5 10 25` is impossible, because 5 + 10 is not larger than 25.
>
> We'll also keep a track of how many valid triangles we've been able to make

**Write** the solution in one massive function that takes the input in a variable inside the function. The function should NOT take any parameters.

```py
def is_triangle():
  side1 = int(input("Length of side 1: "))
  side2 = int(input("Length of side 2: "))
  side3 = int(input("Length of side 3: "))

  if side1 + side2 < side3:
      print("Not a triangle!")
  elif side2 + side3 < side1:
      print("Not a triangle!")
  elif side1 + side3 < side2:
      print("Not a triangle!")
  else:
      print("Is a triangle!")
```

**Attempt** to write a test for `is_triangle()` to show why this function is hard to test:

```py
def test_is_triangle():
    # How do we pass test inputs into input()?
    # How do we assert on what was printed to the terminal?
    assert is_triangle() == ... # Broken: returns None and requires user interaction
```

**Explain** that code is easy to test when you:

> - Take inputs via parameters (`param`s) so tests can pass sample data directly
> - Provide outputs via `return` values so tests can verify the result with `assert`

**Refactor** the code to follow best practice and make it testable

```py
def is_valid_triangle(sides: list[int]) -> bool:
    sorted_sides = sorted(sides)
    return sorted_sides[2] < sorted_sides[0] + sorted_sides[1]
```

**Write** tests for the smaller functions

```py
def test_is_valid_triangle_right_triangle():
  assert is_valid_triangle([3, 4, 5]) is True

def test_is_valid_triangle_returns_true():
  assert is_valid_triangle([16, 10, 25]) is True

def test_is_valid_triangle_returns_false():
  assert is_valid_triangle([1, 8, 11]) is False
```

### The 'Arrange - Act - Assert' Framework (AAA)

**Introduce** the [AAA](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) framework as a way to structure tests.

**Explain** that every test involves

- Arrangement: some setup (e.g. the creation of test data)
- Act: running the code under test
- Assert: checking if your expectations have been met

**Break** out an existing test to show the different pieces.

```py
def test_is_valid_triangle_right_triangle():

  # Arrange
  test_data = [3, 4, 5]
  
  # Act
  result = is_valid_triangle(test_data)

  # Assert
  assert result is True
```

**Stress** that tests following the AAA framework don't have to have exactly three lines; it's about the process.

**Warn** that, as trainees work with more complex code, their tests will get more complicated, but the AAA framework will still be a helpful guide.

### Live Coding

**Talk** through the following problem

> Count the number of valid squares in a list of shapes
>
> A square is a shape with four equal sides
>
> You'll be given a list of shapes, each shape is a list of sides. The list will look like this
>
> `[[334,1442,133,1313],[133,331],[1,1,1],[45,45,45,45], [5,5,5,5], [10,10,10], [5241,3133,131,13], [1,1,1,1,1], [56,56,56,56]]`

**Break** the task down into it's constituent functions (do not implement them yet)

```py
def is_valid_square(sides: list[int]) -> bool:
  ...

def count_number_of_squares(squares: list[list[int]]) -> int:
  ...
```

**Write** tests for the code to start

```py
def test_is_valid_square_returns_true():
  assert is_valid_square([4, 4, 4, 4]) is True

def test_is_valid_square_returns_false():
  assert is_valid_square([4, 4, 4, 5]) is False

def test_is_valid_square_returns_false_wrong_number_sides():
  assert is_valid_square([5, 5, 5]) is False

def test_count_number_of_squares_returns_correct_number():
  assert count_number_of_squares([[334,1442,133,1313],[133,331],[1,1,1],[45,45,45,45], [5,5,5,5], [10,10,10], [5241,3133,131,13], [1,1,1,1,1], [56,56,56,56]]) == 3
```

**Run** the tests and watch them fail. Highlight "Red" in the "Red, Green Refactor" loop

**Implement** the functions.

**Run** the tests and watch them pass. Highlight "Green" in the "Red, Green Refactor" loop

**Refactor** the code to make it nicer (names, type hints, docstrings, etc). Highlight "Refactor" in the "Red, Green Refactor" loop

### Task

**Split** the group into pairs

**Give** the pairs the following task

> If you remember back to your Stage 3 interview, we asked you to write some code to capitalise a name. For this task, we're going to recreate that function, but following a TDD process.
>
> You'll need to create two new files - `capitalise_name.py` and `test_capitalise_name.py`.
>
> To run the test file, you can run `pytest test_capitalise_name.py` in the terminal.
>
> Write three tests to test that:
>
> 1. A name with one name is being correctly capitalised, e.g. "chRis" to "Chris"
> 2. A name with four names is being correctly capitalised, e.g. "maya alice Jane johnson" to "Maya Alice Jane Johnson"
> 3. No name returns None, e.g. "".
>
> After completing the tests, write a function that ensures your tests pass.

### Explanation

**Spend** some time running through the test suite provided for the Blackjack Project. You should cover:

> - The syntax of a test
> - Common assertions
> - Expected values

### Wrap-up

**Ask** trainees if they have any final questions

</LockedContent>
