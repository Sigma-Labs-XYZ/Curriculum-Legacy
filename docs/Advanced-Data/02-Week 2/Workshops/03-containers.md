---
objectives:
  [
    'List the benefits of containerisation',
    'Run Docker containers locally',
    'Manage multiple containers with Docker compose.',
    'Use Docker compose to communicate between containers.'
  ]
module: Advanced-Data
week: 2
workshop: true
title: Containers
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
/prework Containers
```

:::info Task

Install Docker Desktop on Mac Silicon using Homebrew:

```sh
brew install --cask docker
```

After installation, open Docker Desktop and verify it is running. Then confirm the installation by running:

```sh
docker run hello-world
```

You should see a "Hello from Docker!" message.

:::

### Research - Containers

:::info Research - containers

Find answers to the following questions:

- What is Docker?
- What is "containerisation"?
- What are the benefits of containerisation?
- At a high level, how does Docker work?

:::

### Experiment

:::info Task

Run the following commands in your terminal and observe the output carefully. What can you work out about what is happening? Which commands make persistent changes?

- `docker ps -a`
- `docker image ls`
- `docker run hello-world`

:::

## Workshop

<LockedContent password="ownership">

### Warm-up

**Put** the trainees into pairs

**Tell** the trainees that they should teach each other their understanding of what a Container is, what it's benefits are and roughly how they work

### Containers

**Introduce** the concept of a **Kernel**: the core part of an operating system that manages communication between software and hardware (CPU, memory, devices). Every operating system has one.

**Explain** what a **Virtual Machine (VM)** is: a complete, isolated computer running inside your physical computer. A VM includes its own operating system (kernel and all), and uses a program called a **hypervisor** to share the underlying hardware. VMs are isolated and portable, but they are large and slow to start because each one carries a full OS.

**Explain** what a **Container** is: similar to a VM in that it packages up an application with everything it needs to run, but instead of including a full operating system, containers share the host machine's kernel. This makes containers much lighter, faster to start, and more efficient than VMs.

**Summarise** the progression: hardware → OS kernel → VM (full OS on top) → container (shared kernel, isolated process).

**Ask** trainees to explain what 'containerisation' is, and why it is useful.

**Introduce** Docker as one example of a tool used for containerisation.

**Check** that all trainees have Docker installed and can run Docker Desktop.

**Introduce** key terminology:

- Image (a blueprint for an application and all its dependencies)
- Container (an application built from a container)

### Command-line Docker

**Demonstrate** how to run a simple Ubuntu container in the terminal:

```sh
docker run -it ubuntu
```

**Talk** through the process of pulling the image and spinning up the container.

**Show** that the container can be interacted with just like a normal computer.

**Switch** to another terminal and show the running container with `docker ps`.

**Highlight** key details:

- The randomly-assigned name
- The container status

**Show** trainees Docker hub, and all the different images they can build containers from.

**Stop** the Ubuntu container and run a Python one instead.

```sh
docker run -it python
```

**Explore**, with trainees, the options for viewing stopped containers (`docker ps -a`) and starting them again (`docker run -i [name]`).

**Mirror** the same options in Docker Desktop.

### Docker compose

**Point** out that some Docker commands can get quite lengthy:

```sh
docker run --name example-container -p 3000:3000 ubuntu
```

**Explain** the above command - an Ubuntu container with a specific name that has its port 3000 mapped to 3000 on the local machine, allowing communication with the container from outside.

**Wonder**, aloud, if there is some easier-to-type/-organise solution.

**Introduce** the idea of a compose file.

<Tabs>
  <TabItem label="compose.yaml" value="compose.yaml">

```yaml
services:
  comp:
    image: ubuntu
    container_name: example-container
    ports:
      - 3000:3000
```

  </TabItem>
</Tabs>

**Explain** that using compose files has two benefits:

- Complex shell commands can be written in a more maintainable way
- Multiple different containers can be started with the same command

**Demonstrate** starting (`docker compose up`) and stopping (`docker compose down`) composed containers.

**Demonstrate** that you can add postgres to your `compose.yaml` like so

```yaml
services:
  comp:
    image: ubuntu
    container_name: chris_ubuntu_compose
    ports:
      - 3000:3000
  database:
    image: postgres
    container_name: chris_postgres
    environment:
      - POSTGRES_PASSWORD=verysafepassword
    ports:
      - 4768:5432
```

**Demonstrate** that you can then connect to the database

> `psql -d postgres -h localhost -p 4768 --u postgres`

### Conclusion

**Mention** that, in future weeks, trainees will learn to create their own Docker images.

**Stress** that, for now, they need to be comfortable with the basic idea and able to start containers from provided scripts.

**Allow** sufficient time for 'how do I...' questions.

</LockedContent>
