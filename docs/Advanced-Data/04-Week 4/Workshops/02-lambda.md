---
title: AWS Lambda
objectives:
  [
    'Describe AWS Lambda and how it is used',
    'Identify appropriate use cases for AWS Lambda',
    'Adapt scripts for use in Lambda functions',
    'Test Lambda functions locally before deploying them',
    'Deploy code to AWS Lambda',
    'Create and run Lambda functions'
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
/prework AWS Lambda
```

### Research

:::info Task

Research AWS Lambda.

- What is it?
- Why is it useful?
- When is it not useful?
- What are the trade-offs when using it?

:::

### Experiment

:::info Task

Using the AWS UI, create a new Lambda function from scratch.

When run, this function should return the name of a user provided through the `event`.

:::

### Submission

:::info Submission

Please share your answers in the Slack thread.

Include a link to your Lambda Function so that it can be verified.

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Ask** trainees to define what [AWS Lambda functions](https://aws.amazon.com/lambda/) are.

**Explain** that AWS Lambda is a service that provides "serverless compute"; you can use it to run code as needed without having to manage servers or resources.

**Discuss** the benefits/drawbacks of AWS Lambda:

- Pay only for what you need
- Easy to hook up to triggers/events
- No resource management
- Scales automatically  
  _but_
- Resource/runtime limitations
- Requires specific code design/structure

**Highlight** that, while Lambda functionality _can_ be twisted for use in other ways, the ideal Lambda use case is as follows:

- Lightweight
- Short duration
- Minimal use of file storage
- An intermediate step, accepting data and passing it on

### Creating Lambda functions online

**Select** one of the Lambda functions created by a trainee to demonstrate with.

**Demonstrate** the process of altering the code, changing the config, and running basic online tests.

### Creating Lambda functions locally

**Stress** that Lambda functions made in the editor have limitations: a restricted number of libraries and less control over the broader environment.

**Jump** to a code editor and work through the process of writing a Lambda function from scratch.

**Refer** heavily to the [documentation](https://docs.aws.amazon.com/lambda/latest/dg/python-image.html) for this; trainees don't need to have memorised the steps of Lambda creation, but to know how to find documentation and work through it.

**Emphasise** the role of documentation in the process.

<Tabs>

  <TabItem label="main.py" value="main.py">

```python
"""Lambda function example."""

def handler(event=None, context=None) -> str:
  """Handler for the Lambda function"""
  return f"Hi, {event['name']}!"


if __name__ == "__main__":
  print(handler({"name": "Charlie"}, None))

```
  </TabItem>

  <TabItem label="Dockerfile" value="Dockerfile">

```sh
FROM public.ecr.aws/lambda/python:latest

WORKDIR ${LAMBDA_TASK_ROOT}

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY main.py .

CMD [ "main.handler" ]
```

</TabItem>
</Tabs>

**Highlight** the following details:

- The use of `WORKDIR` command to ensure that all files end up where AWS is expecting.
- The importance of a `handler` function for AWS to connect to.
- The use of an `if __name__ == "__main__"` block to allow local testing.

**Build** the Lambda image with `docker buildx build --platform linux/amd64 --provenance false -t lambda-example .`

**Stress** the use of the two additional arguments:

- `--platform` to ensure the image is designed for the default AWS Lambda architecture
- `--provenance` to avoid having to specify metadata about the [build process](https://docs.docker.com/build/metadata/attestations/slsa-provenance/) (and avoid errors on ECR caused by inaccurate metadata)

**Demonstrate** how to run and test the image locally

- `docker run -p 9000:8080 --env-file .env name_of_image` to create a local server on port `9000` waiting for the function to be triggered
- `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'` (in a different terminal) to hit the server and trigger the function
- Show the differences between the server terminal output and the client terminal output
- Demonstrate sending different data by changing `'{}'` in the triggering command to more complex JSON

**Stress** that trainees must test locally before deploying. Every cloud deploy-and-debug loop costs minutes; a local run costs seconds. Show both levels: running `python main.py` to call the handler directly, then the `docker run` and `curl` test against the container.

**Upload** the image to ECR and walk through the process of creating (and testing!) a Lambda function from the image.

### Environment variables

**Explain** that one common use case of Lambda functions is to interact with other AWS services.

**State** that whenever a Lambda runs, it does so using an IAM **execution role** with specific permissions.

**Highlight** that there are some [reserved keywords](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) in Lambda environments because of this. The role passes its own AWS credentials into the function.

**Explain** that this means trainees do not need to pass in their (overly-powerful) keys when running Lambda functions; they should rely on the role keys and ensure that the role has sufficient permissions to do the required work.

**Demonstrate** the process of adding the `ListBuckets` S3 permission to a Lambda execution role.

### Task

**Task** trainees to complete the following task:

> Create a Lambda that returns the names of accessible S3 buckets. The Lambda should take in an **optional** number when it runs, only returning that many bucket names.
>
> Extension: the Lambda should also return a list of five items from the first listed bucket.

**Require** trainees to test the Lambda locally (first with `python`, then with `docker run` and `curl`) before they upload anything to ECR. Ask them to show you the local output before they deploy.

**Send** them away in pairs to complete the task.

**Access** the below example solution if required:

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

### Conclusion

**State** that Lambda functions will be relevant on several occasions throughout the course.

**Emphasise** that they are for quick, low-intensity tasks - it's better to either have several Lambda functions working together, or one ECS task, than it is to try and load too much complexity into just one Lambda.

**Encourage** trainees to experiment with Lambda functions.

</LockedContent>
