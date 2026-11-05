---
objectives:
  [
    'Explain the use cases of stream-processing platforms/tools',
    'Publish messages to a Kafka topic',
    'Consume data from a Kafka topic'
  ]
module: Advanced-Data
week: 2
workshop: true
title: Consumers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Pre work

No pre-work as this is an afternoon workshop

## Workshop

<LockedContent password="ownership">

### Introduction

**Remind** trainees that they have previously *sent* messages to a Kafka cluster; now it is time to *receive* them.

**Return** to the code from the previous workshop and check that production still works.

### Consuming

**Create** a `consumer.py` file.

**Talk** through the code below, highlighting especially:

- The _slightly_ different config required
- The use of `group.id` to identify this consumer to the stream and avoid duplicating messages
- The interaction between `group.id` and `auto.offset.reset`
- The requirement to `.subscribe()` to a topic before consuming messages
- The use of `.poll()` to repeatedly check for new messages

```py
"""A small example of a Kafka consumer."""

from os import environ

from dotenv import load_dotenv
from confluent_kafka import Consumer


def consume_messages(cons: Consumer) -> None:
    """Processes Kafka messages."""
    while True:
        msg = cons.poll(1)
        print(msg)


if __name__ == "__main__":

    load_dotenv()

    consumer = Consumer({
        "bootstrap.servers": environ["BOOTSTRAP_SERVERS"],
        "group.id": environ["GROUP"],
        "auto.offset.reset": environ["AUTO_OFFSET"],
        'security.protocol': environ["SECURITY_PROTOCOL"],
        'sasl.mechanism': environ["SASL_MECHANISM"],
        'sasl.username': environ["USERNAME"],
        'sasl.password': environ["PASSWORD"],
        'logger.level': 3
    })

    consumer.subscribe([environ["TOPIC"]])
    consume_messages(consumer)
```

**Run** the code and demonstrate that messages are being consumed (although not usefully).

**Explain** that all the relevant data is packaged up inside the message object and must be accessed to be used.

### Challenge

**Challenge** trainees to print out specific details from the message objects as they are processed.

**Direct** trainees to the [confluent-kafka docs](https://docs.confluent.io/platform/current/clients/confluent-kafka-python/html/index.html) to do this.

**Grant** trainees ~5 minutes to work on extracting details.

**Demonstrate** how to get details out of messages.

```py
def consume_messages(cons: Consumer) -> None:
    """Processes Kafka messages."""
    while True:
        msg = cons.poll(1)
        print(msg.value().decode("utf-8"), msg.offset())
```

***Ensure** that all trainees can produce and consume messages simultaneously (when running scripts in separate terminals).

### Challenge

**Challenge** trainees to create the a simple chat application using Kafka:

> Create a Chat Application that allows two users to send messages to each other. The producer should send messages with the user's name and the message content, and the consumer should display them in a human-readable format.
>
> The program should run in an infinite loop, allowing the user to send messages until they choose to exit.
>
> A producer that sends dictionaries with multiple keys/values instead of basic strings. It should:
>
> - Include a `name` key with the sender's name
> - Include a `message` key with the message content
> - Include a `timestamp` key with the current time
>
> On the Consumer side it should
>
> - Display the message in a human-readable format
> - Ignore any messages that don't fit the expected format

**Put** trainees into groups of 3-4 to work on this task, and allow them the majority of the remaining time to work on this.

**Discuss** any issues/questions/approaches that result.

### Solution

**Share** a basic solution for the chat application might look like this:

```py
"""A simple chat application using Kafka."""

import json
from datetime import datetime
from os import environ

from dotenv import load_dotenv
from confluent_kafka import Producer, Consumer


def get_config() -> dict:
    """Builds the shared Kafka configuration from environment variables."""
    return {
        "bootstrap.servers": environ["BOOTSTRAP_SERVERS"],
        "group.id": environ["GROUP"],
        "auto.offset.reset": environ["AUTO_OFFSET"],
        'security.protocol': environ["SECURITY_PROTOCOL"],
        'sasl.mechanism': environ["SASL_MECHANISM"],
        'sasl.username': environ["USERNAME"],
        'sasl.password': environ["PASSWORD"],
        'logger.level': 3
    }


def receive_message(cons: Consumer) -> None:
    """Checks for and displays a single incoming chat message, if any."""
    msg = cons.poll(0)
    if msg and not msg.error():
        try:
            payload = json.loads(msg.value().decode("utf-8"))
            if "name" in payload and "message" in payload:
                print(f"\n[{payload['timestamp']}] {payload['name']}: {payload['message']}")
        except json.JSONDecodeError as e:
            print(f"Skipping malformed message: {e}")


def send_message(prod: Producer, name: str, message: str) -> None:
    """Publishes a chat message to the topic."""
    payload = {
        "name": name,
        "message": message,
        "timestamp": datetime.now().isoformat()
    }
    prod.produce(topic=environ["TOPIC"], value=json.dumps(payload))
    prod.flush()


def run_chat(prod: Producer, cons: Consumer, name: str) -> None:
    """Runs the send/receive loop until the user exits."""
    print(f"Connected as {name}. Type 'exit' to quit.\n")

    while True:
        receive_message(cons)

        message = input(f"{name}: ")
        if message.lower() == "exit":
            break

        send_message(prod, name, message)


if __name__ == "__main__":
    load_dotenv()

    config = get_config()
    producer = Producer(config)
    consumer = Consumer(config)
    consumer.subscribe([environ["TOPIC"]])

    name = input("Enter your name: ")
    run_chat(producer, consumer, name)
```

### Conclusion

**Remind** trainees that Kafka is just one (admittedly popular) system amongst many, all of which rely on similar principles but will have different syntax. As always, we don't want them to be great at Kafka, but to use Kafka to learn more general principles.

**Encourage** them to further explore the documentation for [confluent-kafka](https://docs.confluent.io/kafka-clients/python/current/overview.html) to see more advanced/complex usage.

</LockedContent>
