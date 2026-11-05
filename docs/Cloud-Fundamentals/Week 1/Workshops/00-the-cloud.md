---
title: The Cloud
objectives:
  [
    'Describe how deployment was managed before The Cloud',
    'Explain what the Cloud is and what problem it solves',
    'List the major cloud providers',
    'Compare IaaS, PaaS and SaaS and the problems they solve',
    'Compare and evaluate popular cloud tools and services',
    'Compare vertical and horizontal scaling in the cloud'
  ]
module: Intro-Cloud
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";

# The Cloud

<LearningObjectiveComponent />

## Pre-work

### Read

:::info Task

Complete [Challenge 1](../01-the-cloud.md) in the curriculum

:::

### Answer

:::info Task

Prepare answers to the following questions; do not share them before the workshops:

- What is IaaS?
- What is PaaS?
- What is SaaS?
- When would you use IaaS vs PaaS vs SaaS?

:::

### Prepare Questions

:::info Task

Prepare questions to ask during the workshop.

- What are you unsure of?
- What do you want to know more about?
- What are you struggling with?
- What new terms have you heard that you don't understand?
- etc

:::

## Workshop

<LockedContent password="ownership">

### Recap Questions

**Ask** the trainees to quickly answer the following question to recap knowledge

> 1. What is a Server?
> 2. What is a Client?

**Explain** that a server is a computer that provides data to other computers. A client is a computer that requests data from a server.

**Diagram** and explain that in previous weeks we built a server, connected to the backend but this could only be accessed by us. This week we'll be deploying our server to the cloud so that it can be accessed by anyone.

### History of the Cloud

**Run** through the history of deploying website to the internet.

**Ask** the trainees what they believe to be the positive and negative aspects of each version of deploying websites:

> Highly recommended to diagram this out on a tool like [Excalidraw](https://excalidraw.com/)
>
> _Setup_: Imagine you are a web developer at different points through history. How might you have gone about setting up your website so it was accessible all the time.
>
> 1. Computers running in University Computer Labs (_~1960s_)
>    - In the early days, people would setup their computers and hook them up to the internet for other people to access.
>    - _Good_
>      - It solves the problem of allowing people to grab files from your computer
>      - It's easy to setup and run (it's just your computer)
>    - _Bad_
>      - You computer has to stay on all the time
>      - You personal computer is accessible over the internet which makes it vulnerable
> 2. Servers in the basements of companies (_~1980s_)
>    - Later, Companies would have dedicated computer rooms that would host lots of servers all together.
>    - _Good_
>      - Lots more computing power
>      - You had teams on site to manage the servers
>      - Easy to deploy new software (you just walk down there)
>    - _Bad_
>      - Companies have to employ export engineers to do upgrades to them
>      - Companies have to keep on buying new hardware (there are stories of high growth start-ups (e.g. Flickr) who ran out of physical storage because they couldn't physically buy hard drives fast enough)
>      - You're paying for the servers even if nobody is using them
>      - Often had to take the servers offline to do upgrades (which means people couldn't visit the website)
> 3. Managed servers in Data Centers (_~1985 - 2000_)
>    - Later still, specialist companies started Data Centers where companies could then purchase servers from them to run their code.
>    - _Good_
>      - No longer have to manage the servers yourself
>      - LOTS more computing power
>    - _Bad_
>      - You're paying for the servers even if nobody is using them
>      - You (might) have to drive to the data center to add new software
> 4. Modern cloud computing (_2000 to Present_)
>    - Most recently companies (Amazon, Microsoft, Google) allow you to purchase small parts of a server whenever you need it.
>    - _Good_
>      - You only pay for the amount of data/compute power you need
>      - An almost infinite amount of computing power (more than more companies will ever use)
>    - _Bad_
>      - Relatively easy to rack up huge bills
>      - The complexity of managing the system can be large

### Modern Platforms

**Explain** the modern cloud computing landscape

> - AWS - Amazon Web Services (Amazon) (33% market share, 2021)
> - Azure (Microsoft) (21% market share, 2021)
> - GCP - Google Cloud Platform (Alphabet) (10% market share, 2021)
>
> There is a long tail of other cloud providers but these are the three month common.
>
> They are - on the whole - very similar with small differentiators.

**Explain** that for this course, we'll be using AWS since there is a high chance this is the platform you'll be using\*\*

### IaaS, PaaS, SaaS

**Draw** out a diagram of how each of these could be thought of sitting on a spectrum from _'Most Managed, Least Control'_ to _'Least Managed, Most Control'_.

> 1. **SaaS** (Software as a Service)
>
> - In the SaaS-based model, the cloud service provider; the user only needs to upload and download data.
> - Maintenance, downtime, upgradation, security are all taken care of by the service provider.
> - **Examples**: Dropbox, Google Drive, Gmail, Docusign,
>
> 2. **PaaS** (Platform as a Service)
>
> - In PaaS user manages applications along with data. Lot of times, the user wants to launch and maintain their own applications over the cloud, which is where PaaS comes into the picture.
> - The service provider meets all the Hardware, Networking, O/S needs. The user can use any programming language of choice. PaaS services are cheaper compared to SaaS.
> - **Examples**: Heroku, Netlify, Github
>
> 3. **IaaS** (Infrastructure as a Service)
>
> - In IaaS based service hardware, the company provides virtualisation and networking services while the user takes care of operating system, applications, and data.
> - **Examples**: AWS, Azure, GCP
>
> This module cares most about PaaS and IaaS cloud platform because these are which you will mostly be using.

### Virtualisation

**Explain** the concept of virtualisation:

> The main enabling technology for Modern Cloud Computing is **Virtualization**. Virtualization is the partitioning of a single physical server into multiple logical servers. Once the physical server is divided, each logical server behaves like a physical server and can run an operating system and applications independently. Many popular companies like VMware and Microsoft provide virtualization services. Instead of using your PC for storage and computation, you can use their virtual servers. They are fast, cost-effective, and less time-consuming.
>
> For software developers and testers, virtualization comes in very handy. It allows developers to write code that runs in many different environments for testing.

### Scaling

**Pose** the following case study

> Let's say we are a software start-up and we've been using the cloud. Suddenly, our software goes viral and we scale from 100 users per month, all the way up to 100,000 users a month. Great news for the CEO but now us - the technical team - need to get working.
>
> What do you do?

**Discuss** with the trainees possible solutions; ending up here

> We have two ways of scaling **Horizontal** and **Vertical**.
>
> Starting with Vertical - we could just got to AWS and say "Give us more compute and space". This is very easy, but we have an issue - computers can only go so large.
>
> Then with Horizontal - what if we said instead give us two, five or one hundred smaller servers and then we distribute the users across different servers. Easy as well, but needs a bit of forethought in how we build our system.
>
> A good analogy here is having a delivery car. If you want to go faster you could buy a ferrari (vertical) but you could also pay for two delivery cars (horizontal).

### Wrap-up Task

**Ask** the Trainees to spend a few moments, writing up the definition for these terms (definitions at the top of the workshop)

> - Data Center
> - Virtualization
> - Deploy
> - Cloud Computing
> - IaaS
> - PaaS
> - SaaS
> - Virtual Scaling
> - Horizontal Scaling
> - Vertical Scaling

**Ensure** every trainee is able to answer this key question:

> What are the benefits of cloud computing?

**Emphasise** the following:

> **It's a big week, but the key to succeeding is asking for help early and often.**

</LockedContent>
