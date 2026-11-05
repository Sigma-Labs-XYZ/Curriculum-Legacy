---
title: (Optional) Multiprocessing and Caching
objectives:
  [
    "Clean and process data using Python",
    'Use multiprocessing to speed up data processing',
    'Use caching to avoid redundant calculations'
  ]
module: Advanced-Data
week: 1
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

# Multiprocessing and Caching

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework Multiprocessing and Caching
```

### Task

:::info Task

Define the following terms:

- Multiprocessing
- Caching
- Pooling

:::

## Workshop

<LockedContent password="ownership">

**Elicit** questions from the trainees on the prework

**Ask** trainees to restate the definitions from the prework

> - **Multiprocessing** is a technique in which multiple processes are used to execute tasks simultaneously.
> - **Caching** is the process of storing copies of data in a temporary storage area, or cache, so that future requests for that data can be served faster.
> - **Pooling** is the practice of managing a pool of resources (e.g., compute resources) that clients can borrow from and return to when done.

**Ask** trainees why it might be useful to use multiprocessing in their scripts

> Multiprocessing allows me to use all of my computer's resources _simultaneously_, meaning I don't have to wait for one task to finish before starting the next one

**Offer** the following allegory

> Imagine there is a room of workers (12 of them, if you want a specific number). They were given a task, to break rocks in half, then put the broken pieces into a large container. One worker says 'Okay, time to get to work, everybody make a queue and we can all take turns using one hammer to break these rocks.'
>
> Everybody agrees to this, as this is the way that they had learned how to code, I mean break rocks. One _very smart worker_ speaks up, 'Wait, don't we have 8 hammers available to us? Why are we not using all of the tools available to us? If we all take a hammer whenever one becomes free, we can finish the task sooner!'
>
> Everyone is happy since the work gets done eight times faster.

**Tell** the trainees that they have yet to unlock the full potential to using their scripts. Make a Star Wars reference

> Unlimited power _(Up to 8 cores)_!

**Live code** an example of a slow-processing function

```py
import time
from rich.progress import track

def long_running_task(number: int) -> int:
    time.sleep(1)
    return number*number
```

**Tell** trainees that this function will run for just over one second every time it is called

**Live code** another function that implements this code

```py
def main_sequential():
    start = time.time()
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    results = []
    for number in track(numbers):
        results.append(long_running_task(number))

    print(f"Square of numbers: {results}")

    end = time.time()
    print(f"Time taken to run: {round(end - start, 2)} seconds")
```

**Ask** the trainees how long it will take to run this code

> Just over 10 seconds

**Import** the [built-in multiprocessing library](https://docs.python.org/3/library/multiprocessing.html)

```py
import multiprocessing
```

**Explain** to trainees that their laptops most likely have 8 cores (although in practice, a few cores are reserved for essential computer processes). They can use a process called `pooling` to allocate a number of processors to tasks

**Live code** how to do this using 2 processes

```py
def main_pooling():
    start = time.time()
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    with multiprocessing.Pool(2) as pool:
        results = pool.map(long_running_task, numbers)
    print(f"Square of numbers: {results}")

    end = time.time()
    print(f"Time taken to run: {round(end - start, 2)} seconds")
```

**Switch** to 4 processes to show how much faster this is

**Explain** how the `pool.map` works

> `pool.map` is a convenient way to distribute your tasks across multiple worker processes. It takes a function and an iterable, and it applies the function to every item in the iterable in parallel. Each process in the pool picks up tasks until all tasks are completed.
>
> The `map` function collects results and returns them in the same order as the input iterable. This is especially useful when you want the operations to be independent of one another and need the results to be in order.

**Tell** trainees that although multiprocessing is fast, it might still be doing the same process multiple times

**Change** the `numbers` list

```py
numbers = [1, 2, 3, 3, 2, 3, 1, 2, 3, 2, 2, 3]
```

**Question** why this might not be the most effective way to process this list

> There are repeated numbers. In theory, we only need to run the slow function 3 times and we will have all of the data we need

**Introduce** the concept of `caching`

> Imagine you have a favorite book you love to read. Each time you want to read a particular chapter, going to the library, finding the book, and locating the chapter takes time. Instead, if you have that chapter photocopied and within reach, you save all that time every time you want to read it again. That's what caching does for repetitive tasks or data retrieval.

**Live code** an example of a long running task

```py
def slow_process(n: int) -> int:
    print("Beginning a process")
    sleep(n)
    print("Processing complete")
    return n ** 2

def process_without_caching(data):
    """Returns a list of processed numbers."""

    print("Starting non-cached process...")
    start = time.time()

    result = []

    for x in data:
        result.append(slow_process(x))
    end = time.time()
    print(f"Time taken to run without caching: {round(end - start, 2)} seconds")
    return result
```

**Ask** the trainees how long this script will take with the new numbers list

> Just over 27 seconds

**Live code** adding a basic cache to this

```py
def process_with_caching(data):
    """Returns a list of processed numbers."""

    print("Starting cached process...")
    start = time.time()
    result = []
    cache = {}

    for x in data:
        if x in cache:
            print(f"{x} is in the cache; skipping processing.")
            result.append(cache[x])
        else:
            res = slow_process(x)
            cache[x] = res
            result.append(res)
    end = time.time()
    print(f"Time taken to run with caching: {round(end - start, 2)} seconds")
    return result
```

**Run** the script to show how much faster this is

**Ask** trainees to answer the question they have all been thinking: can they use both multiprocessing and caching at the same time?

> Yes, but you will need to add something called a `Manager` which will manage a shared cache across all pools

**Ask** trainees why having a `Manager` is necessary

> If you use a global dictionary, each process would get its own copy due to the way processes work, meaning changes made in one process wouldn't be reflected in others. The `Manager` will synchronise the resource so the data is up-to-date for every `Pool`

**Live code** an example of how to use both a cache and multiprocessing

```py
def process_data(x, cache):
    """Process data using a cache dictionary."""
    if x in cache:
        print(f"{x} is in the cache; skipping processing.")
        return cache[x]
    else:
        res = slow_process(x)
        cache[x] = res
        return res

def process_with_caching_and_multiprocessing(data):
    """Returns a list of processed numbers with caching and multiprocessing."""
    print("Starting cached and multiprocessing process...")
    start = time.time()
    with Manager() as manager: # A manager shares resources across all pools
        cache = manager.dict()  # This is a shared dictionary that all pools have access to

        with Pool(processes=8) as pool:
            result = pool.starmap(process_data, [(x, cache) for x in data]) # Starmap allows you to pass in multiple arguments into a function
    end = time.time()
    print(f"Time taken to run with caching and multiprocessing: {round(end - start, 2)} seconds")
    return result
```

**Task** trainees to complete the following challenge

> Write a script that takes in a list of numbers and returns a list of the factorials (`!`) of those numbers
> A factorial is the multiplication of all of the positive integers before it (e.g., `4! = 4 * 3 * 2 * 1 = 24`)
>
> Example:
> [1, 2, 4, 5, 3, 1, 2, 3] should return [1, 2, 24, 120, 6, 1, 2, 6]
>
> Your solution should use either multiprocessing, caching or (ideally) both

</LockedContent>
