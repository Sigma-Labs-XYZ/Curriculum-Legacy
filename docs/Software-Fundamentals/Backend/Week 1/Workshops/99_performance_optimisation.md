---
title: "[Optional] Performance Optimisation"
module: Software-Fundamentals
week: 1
workshop: true
objectives:
  - 'Understand Big O notation and its relevance to code evaluation'
  - 'Analyse code to determine its time complexity'
  - 'Recognise when performance optimisation matters versus when it does not'
  - 'Apply knowledge of data structure efficiency to improve solutions'
---

import LearningObjectiveComponent from "@theme/LearningObjectiveComponent";
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Workshop

<LockedContent password="ownership">

## Discuss

**Explain** briefly context for the workshop
> - _When you build systems, like backend APIs, you'll very possibly need to think about speed: "Why is this slow?" or "Can we handle more requests?"_
> - _Big O notation gives you a common language to use when optimising performance. It gives you a specific way to talk about the complexity of your code in terms of speed (time) and size (memory)_

**Ask** trainees to share their thoughts on performance optimisation
> - What does it mean?
> - How would we optimise performance?
> - When does performance matter?

**Guide** them to understand that most code prioritises readability and correctness before speed. Premature optimisation is a common pitfall.

**Introduce** Big O notation as a way to talk about code efficiency without having to run it every time to directly measure.

> Big O notation describes how the runtime (or space) of an algorithm grows relative to its input size. It lets us compare efficiency between different approaches to the same problem.

**Cover** the Big-O notation, using the following examples.

> Big O notation describes the complexity of code in algebraic terms.

#### O(1)

Constant time. Will always take the same amount of time.

```py
myArray = ['Sigma', 'Labs', 'XYZ']
myArray[0]
```

This is O(1). It will always take the same amount of time to look up an array index.

#### O(n)

Linear time. The time is directly proportional to number of inputs.
A for loop is O(n) as it is directly proportional to the number of iterations.

```py
myArray = ['Sigma', 'Labs', 'XYZ']
for i in range(len(myArray)):
    print(myArray[i])
```

#### O(n^2)

Quadratic time. The time is proportional to the square of the input size.
Nested for loops are an example of quadratic time.

```py
for i in range(len(myArray)):
    for j in range(len(myArray)):
        print(myArray[i])
```

#### O(log n)

Logarithmic time. The time is proportional to the log of input size n.
Binary search is an example of O(log n)

```py
def binarySearch(array: int, targetValue: int) -> int:
    minIndex = 0
    maxIndex = len(array) - 1
    currentIndex = None
    currentElement = None
    while minIndex <= maxIndex:
        currentIndex = ((minIndex + maxIndex) / 2) | 0
        currentElement = array[currentIndex]
        if currentElement < targetValue:
            minIndex = currentIndex + 1
        elif currentElement > targetValue:
            maxIndex = currentIndex - 1
        else:
            return currentIndex
    return -1 #If the index of the element is not found.
```

**Share** this graph with the trainees to demonstrate how the different complexities compare

![border](https://miro.medium.com/v2/1*KfZYFUT2OKfjekJlCeYvuQ.jpeg)

**Share** the following cheat sheet for how efficient different data structures are

![border](https://i.pinimg.com/originals/61/61/f6/6161f692a78459090b551a8945c77981.png)

### Reflection

**Remind** trainees of the hierarchy:

> 1. Working code
> 1. Clean code
> 1. Performant code

**Emphasise** that you should only optimise once you've achieved the first two. In most real-world projects, the difference between O(n) and O(log n) is irrelevant if the data set is small.

**Stress** that readable, correct code is almost always better than fast, confusing code.

</LockedContent>
