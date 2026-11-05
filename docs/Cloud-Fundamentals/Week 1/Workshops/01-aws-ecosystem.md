---
title: The AWS ecosystem
objectives:
  [
    'List the major cloud providers',
    'Use AWS to start an EC2 instance',
    'Access an EC2 instance using SSH',
    'Compare and evaluate popular cloud tools and services',
    'Terminate an EC2 instance',
    'SSH into an EC2 instance via the AWS Cloud Terminal',
    'Describe networking principles in AWS',
    'Describe what a VPC is and what it achieves',
    'Detail the role of availability zones and what they help them achieve',
    'Describe how ports work in AWS'
  ]
module: Intro-Cloud
week: 1
workshop: true
---

import LearningObjectiveComponent from '@theme/LearningObjectiveComponent';
import LockedContent from "@theme/LockedContent";

# The AWS ecosystem

## Learning Objectives

<LearningObjectiveComponent />

## Pre-work

No prework as this is an afternoon workshop

## Workshop

<LockedContent password="ownership">

### Introduction

**Elicit** questions from the trainees about the prework.

**Remind** trainees of the complexity of the cloud.

**Assert** that, while our focus is AWS, the other big providers work in similar ways.

**Reassure** them that AWS understanding can be applied to other contexts as well, much like everything else on the programme.

### AWS

**Show** the AWS Dashboard, and the _vast_ number of different services/tools available.

**Talk** through, briefly, the purpose of some key ones:

- _EC2_ for virtual machines
- _S3_ for object storage
- _IAM_ for permissions management
- _RDS_ for SQL databases
- _Lambda_ for serverless functions

### Resources

**Explain** the AWS paradigm: we set up resources of different types and connect them together.

**Diagram** the idea of resources (of different types) inside a VPC inside AWS.

**Elicit** questions from the trainees, but emphasise that the many layers don't obscure the key aim; whenever we're working with the cloud, we're deploying resources and making them talk to each other.

### EC2

**Zoom** in on EC2 as the resource we're going to create in this session.

**Walk** through the process of setting up an EC2 instance, narrating each step as you go:

- Launch an instance
- Give it an meaningful name
- Check that it's a Linux machine
- Choose a `t2.nano`; explain that there are differences in both price and processing
- Generate a new key pair (explain that this will be used for access later)
- Network settings
  - Switch to the cohort VPC
  - Select one of the public subnets
  - Ensure it auto-assigns an IP
  - Create a new security group (with an appropriate name)
  - Ensure the security group allows SSH access on `22`
- Launch instance

**Wait** for the instance to spin up.

**Show** the various windows/tabs containing information about the instance.

**Connect** to the instance using the console; demonstrate that it is a computer just like their own.

**Create** a simple text file to prove the above.

### SSH

**Explain** that, while it is possible to connect to EC2 through the web interface, it's not how we normally do it.

**Introduce** `SSH` as a _secure_ protocol for connecting through the _shell_. Introduce `ssh` as a command-line tool for using the protocol.

**Jump** to a normal terminal, and walk through the process of connecting to the instance:

- Get the public IP of the instance
- `ssh ec2-user@[public IP]`
  - Confirm you want to continue
  - Get a permission denied error
  - Explain that this is because we provided no credentials (through an `-i`dentity_file)
- Ensure that the terminal is in the same location as your downloaded `.pem` file
- `ssh -i [.pem file] ec2-user@[public IP]`
  - Get rejected again
  - Explain that `.pem` files need to be secure before use
- `chmod 400 [.pem file]` to make the file read-only; don't dwell too long on this
- Admit that this is not really secure for anyone who has already got the file, but it is a required step
- `ssh -i [.pem file] ec2-user@[public IP]`
- Gain access to the instance

**Show** that the file we created earlier is still around.

**Pause** for applause.

**Point** out, if they haven't already noticed, that now we're talking to the instance through our terminal, we can do whatever we want. It's just a (virtual) computer, one that we now have full access to.

### Conclusion

**Mention** that this is just the start; soon trainees will be using `scp` (on top of `ssh`) to copy files from their machine to an EC2 instance. Shell access means control.

**Mention**, additionally, that the EC2 instance can be used for fancier things than manipulating files; we could, for example, run servers on it.

**Assure** trainees that, if it all feels overwhelming at the moment, that's okay; the trick with the cloud is to focus on just one thing at a time.

**Encourage** trainees to explore and experiment.

</LockedContent>
