---
title: AWS Step Functions
objectives:
  [
    'Describe AWS Step functions and list the benefits of using it',
    'Create state machines to connect AWS services together',
    'Pass data between states in AWS state machines'
  ]
module: Advanced-Data
week: 4
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework AWS Step Functions
```

### Research

:::info Task

Research state machines

- In general
- In the context of AWS step functions

What are they? How do they work? What are they used for?

:::

### Research

:::info Experiment

Create a new state machine in [AWS step functions](https://eu-west-2.console.aws.amazon.com/states/home#/statemachines).

When run, the state machine should do the following:

1. Wait for 3 seconds
2. **Invoke** the S3 Lambda you made in the previous workshop.

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** trainees to define a state machine.

**Define** it as a representation of a system as a set of discrete states and the transitions between them.

**Describe** how state machines can be used to represent a wide range of systems/processes.

- A traffic light can be in the states RED, GREEN, or AMBER. There are specific rules and timings for when to transition from one state to another.
- AI in games often uses [state-based systems](https://www.lancaster.ac.uk/stor-i-student-sites/tamas-papp/2020/04/23/fear-shortest-path-for-challenging-ai/).
- Trainees are themselves representable through a state machine - currently they are moving through ordered training states towards the transition state.

**Note** that flowcharts are often used to represent states and state transitions.

**Explain** that [AWS step functions](https://eu-west-2.console.aws.amazon.com/states/home?region=eu-west-2#/homepage) is a service that lets us construct state machines for managing other AWS services and workflows.

### Step functions

**Create** a [new blank state machine](https://eu-west-2.console.aws.amazon.com/states/home?region=eu-west-2#/statemachines) with an appropriate name.

**Ask** the trainees to direct you around the visual editor:

- How would you see add a delay state?
- Where can you add/edit permissions?
- Is there a way to see the underlying code?

**Return** to the visual editor, as it's easier to work here.

**Get** trainees to walk you through the process of creating the state machine from the pre-work

- Wait for 3 seconds
- Invoke a Lambda function

**Use** a Lambda function created by either a coach or a trainee in the previous workshop. If no such function is available, create the one below:

```py
from boto3 import client

def list_buckets(s3_client, limit: int=3) -> list[str]:
    """Return a set number of bucket names."""

    response = s3_client.list_buckets()
    return [b["Name"] for b in response["Buckets"]][0:limit]

def lambda_handler(event, context):
    
    s3 = client("s3")
    limit = event.get("limit", 3)

    return list_buckets(s3, limit=limit)
```

**Note** that the above function will need S3 permissions and an timeout of ~10 seconds.

**Save** the function and show how the role is created. If necessary, add required permissions to the role manually.

**Execute** the function and show it working. Pass appropriate data to the state machine to get the Lambda function to succeed.

**Highlight** that each executed step can be selected, showing the inputs and outputs.

### JSONata

**Pose** the question: how can states access and manipulate their input data?

**Introduce** [JSONata](https://docs.jsonata.org/overview.html) as a language for manipulating JSON objects, accessible in state machines.

**Update** the wait state so that it now waits for `delay` seconds, where `delay` is a key passed to the state input.

```json
{% $states.input.delay %}
```

**Explain** that most fields in state machines will accept JSONata expressions rather than raw data; this makes state machines very composable.

**Highlight** the use of `$states.input` as the most direct way to access a given state's input data.

### Challenge

**Divide** trainees into pairs.

**Challenge** trainees to add the following features to their state machine:

1. The wait state should run **conditionally**, based on the state machine getting an initial input of `enable_wait`.
2. The Lambda function accesses only `limit` bucket names, based on input to the state.
3. After the Lambda function has been invoked, a `pass` state should select a single bucket name at random and return that as its only output. 

**Grant** trainees ~10 minutes to achieve the above.

**Gather** trainees back together and pick on pairs to explain how they solved each step.

### Conclusion

**Warn** that it's easy to overcomplicate them; the simplest state machine that solves the problem is the best state machine.

**State** that step functions are a really useful tool for **orchestration**: combining and organising different services together.

**Paint** a picture of a dozen Lambda functions working in concert, each one focused on a single task, passing data to the next state(s) as appropriate. Praise the potential flexibility and separation of concerns.

**Encourage** trainees to think of step functions whenever they are designing a multi-stage process for the cloud.

</LockedContent>
