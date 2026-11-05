---
title: 'ECS'
objectives:
  [
    'Test and deploy containerised applications on AWS',
    'Explain the benefits of serverless architecture',
    'Run services on ECS Fargate'
  ]
module: Advanced-Data
week: 3
workshop: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LearningObjectiveComponent from '@theme/LearningObjectiveComponent'
import LockedContent from "@theme/LockedContent";

<LearningObjectiveComponent />

## Prework

### Set up

If nobody has done so already, copy and paste this command into Slack.

```
/prework ECS
```

### Research

:::info Task

Research how you would deploy a docker container from your machine, so that it is running on ECS Fargate.

Some relevant topics are

- AWS ECR
- AWS ECS
- AWS Fargate

As part of this process, create a diagram that shows the overall process

:::

### Experiment

:::info Task

**Create** a new ECR repository.

**Push** the docker image you created in the Dockerfiles workshop to it.

:::

## Workshop

<LockedContent password="ownership">

## Coach preparation

**Watch** [this video](https://drive.google.com/file/d/1mZ96qjoR8aANg8GBRDT9ILZabX2lFPxf/view) for a full walkthrough of how to run Docker images on ECS.

### Introduction

**Ask** trainees to explain what ECS is for.

**Explain** that ECS gives us **compute**: processing power on the cloud. Using ECS, we can run containers without having to manage the underlying infrastructure.

**Define** some key terms:

- **Task definition**: a description of what container(s) to run and the information they require
- **Task**: one or more running containers, based on a task definition
- **Service**: containers running based on a task definition, but automatically recreated if they fail

### ECR

**Introduce** ECR as a way to store Docker images on the cloud, accessible to other services.

**Stress** that this is a necessary first step for running containers on the cloud.

**Use** the image created in [the Dockerfiles workshop](./02-dockerfiles.md).

**Create** a new ECR repository.

**Work** through the four 'push commands' shown in the repository.

**Remember** to add `--platform "linux/amd64"` at the build stage; explain that this is because the architecture of trainee machines is different to the architecture AWS uses (by default), and so we need to accommodate for this: the ECR image needs to be one designed to run on AWS.

**Show** the uploaded image on the repository. Useful commands can be found below.

```zsh
# Step 1: Authenticate Docker to ECR
aws ecr get-login-password --region YOUR_AWS_REGION | docker login --username AWS --password-stdin YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_AWS_REGION.amazonaws.com

# Step 2: Create an ECR repository (if not already created)
aws ecr create-repository --repository-name YOUR_REPOSITORY_NAME --region YOUR_AWS_REGION

# Step 3: Build your Docker image
docker buildx build -t YOUR_IMAGE_NAME . --platform "linux/amd64"

# Step 4: Tag your Docker image
docker tag YOUR_IMAGE_NAME:latest YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_AWS_REGION.amazonaws.com/YOUR_REPOSITORY_NAME:latest

# Step 5: Push the image to ECR
docker push YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_AWS_REGION.amazonaws.com/YOUR_REPOSITORY_NAME:latest

```

### ECS

**Create** an ECS task definition:

- Running on `FARGATE` (automatically-handled infrastructure, so that we don't need to set up our own EC2 instances)
- Using the image we just put on ECR
- Point out where environment variables/port mappings/etc. would be put if needed
- Note that logs are _automatically_ configured

**Explain** that we can either create a Task or a Service

> - `Service`. Is expected to be long running.
> - `Task`. Is expected to run and then finished.

**Gather** suggestions from the trainees of examples of when you would use each.

**Demonstrate** how to run a `Task` based on a task definition.

**Focus** particularly on the following:

> - Select Task and not Service
> - Compute configuration
>   - Use `FARGATE`
> - Network configuration
>   - The correct VPC
>   - Only public subnets
>   - Assigning a public IP
>   - Using a security group that allows (at least) outbound access everywhere

**Inspect** the running `Task`, watching it move through the different stages.

**View** the logs, showing that the task has worked successfully.

### Conclusion

**Warn** trainees that running a `Task` or `Service` on ECS is the final point in a multi-stage process; by the time they get this far, they should have checked and rechecked at each intermediate stage for any problems. It's a lot harder to debug at this point than it is if you test all the way through.

**Stress** that ECS will be a common tool throughout the rest of the course; trainees should make sure they are comfortable with it.

</LockedContent>
