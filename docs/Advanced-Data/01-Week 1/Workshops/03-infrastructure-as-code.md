---
title: Infrastructure as Code
objectives:
  [
    'Explain the benefits of infrastructure as code approaches',
    'Create Terraform deployment configurations',
    'Deploy AWS resources using Terraform',
    'Use Terraform data sources to reference existing infrastructure'
  ]
module: Advanced-Data
week: 1
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
/prework Infrastructure as Code
```

### Setup

Run the following setup steps

1. `brew install terraform` to get Terraform on your machine.
2. Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) so that your machine can be authenticated with AWS.
3. `aws configure` and then providing [AWS access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html?icmpid=docs_iam_console#Using_CreateAccessKey)

### Research: Infrastructure as Code

:::info Task

Find answers to the following questions:

- What does the term "infrastructure as code" refer to?
- What is Terraform used for?
- What is the difference between a Terraform `resource` block and a `data` block?

:::

### Prediction

:::info Task

Read through the below code carefully.

```tf
data "aws_vpc" "c21-vpc" {
    id = "vpc-00e544d2dfe3f7848"
}

resource "aws_security_group" "db-sg" {
    name = "c21-dan-museum-sg"
    vpc_id = data.aws_vpc.c21-vpc.id
}

resource "aws_vpc_security_group_ingress_rule" "db-sg-inbound-postgres" {
  security_group_id = aws_security_group.db-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 5432
  ip_protocol       = "tcp"
  to_port           = 5432
}
```

What can you work out about the code? What are the syntax rules?

As specifically as possible, make a prediction about what the result of running the code would be.

:::

## Workshop

<LockedContent password="ownership">

<details>
  <summary>Click here to show a large, completed terraform file you can use in this workshop</summary>

```tf
provider "aws" {
  region = "eu-west-2"
}

resource "aws_security_group" "tf_chris_test_sg" {
  name        = "tf_chris_test_sg"
  description = "Allow inbound Postgres traffic"
  vpc_id      = "vpc-0344763624ac09cb6"

  ingress {
    description = "Postgres access"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH Access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All external access"
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Data source to lookup the subnet
data "aws_subnet" "vpc-subnet-c14" {
  filter {
    name   = "tag:Name"              # Specify the key of the tag you're filtering by
    values = ["c14-public-subnet-1"] # Set the value of the tag you're searching for
  }
}

resource "aws_instance" "tf-chris-test-ec2" {
  ami                         = "ami-0acc77abdfc7ed5a6"
  subnet_id                   = data.aws_subnet.vpc-subnet-c14.id
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.tf_chris_test_sg.id]
  associate_public_ip_address = true


  user_data = <<-EOF
            #!/bin/bash
            cd home
            cd ec2-user
            touch script.py
            echo "print('Hello Chris Owen')" > script.py
            python3 script.py
            EOF

  tags = {
    Name = "terraform-learn-state-ec2"
  }
}

resource "aws_db_instance" "museum-db" {
  allocated_storage            = 10
  db_name                      = "postgres"
  identifier                   = "test-chris-tf-db"
  engine                       = "postgres"
  engine_version               = "16.2"
  instance_class               = "db.t3.micro"
  publicly_accessible          = true
  performance_insights_enabled = false
  skip_final_snapshot          = true
  db_subnet_group_name         = "c14-public-subnet-group"
  vpc_security_group_ids       = [aws_security_group.tf_chris_test_sg.id]
  username                     = "postgres"
  password                     = "password"
}

```

</details>

### Introduction

**Ask** about the difficulties they've faced interacting with the cloud through UIs.

**Ensure** they at least answer the following

> - Manual
> - Lots of specific steps to remember
> - Hard to share with others
> - Hard to repeat _exactly_ in the future

**Ask** trainees to define the term 'infrastructure as code' and how it might help solve the above problems.

### Terraform

**Introduce** Terraform as a way of putting infrastructure definitions into the codebase, gaining all the convenience ofcollaboration, management, and version control.

**Direct** trainees to the docs:

- [Standard](https://developer.hashicorp.com/terraform/docs) for Terraform syntax
- [AWS-specific](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) for AWS resource definitions

**Explain** that, using the Terraform syntax and existing resource definitions, any required cloud services can be created in a repeatable, maintainable way.

**Highlight** that Terraform is a configuration tool rather than a language; they don't need to know every detail, they need to know the basics, and then search the documentation to find specifics for whatever task they are working on at the time.

### Setup

**Add** `.terraform` to your `.gitignore`. Explain that Terraform generates a lot of bulky files, and _we absolutely don't want them in the repository_.

**Walk** through the process of setting up the necessary software:

- `brew install terraform` to get Terraform on your machine.
- Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) so that your machine can be authenticated with AWS.
- `aws configure` and then providing [AWS access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html?icmpid=docs_iam_console#Using_CreateAccessKey)

**Ensure** that all trainees have completed the above steps.

**Create** a `main.tf` (the extension is vital, the name is convention)

**Place** a provider block in the file:

```tf
provider "aws" {
    region = "eu-west-2"
}
```

**Run** `terraform init` to allow Terraform to set up everything required to work with AWS.

**Highlight** the creation of a bunch of `.gitignore`d files.

### Defining resources

**Work** through the creation of a security group that allows inbound access for a database:

```tf
resource "aws_security_group" "database-sg" {
  name        = "XXXXXXXXXX"
  description = "Allow inbound Postgres traffic"
  vpc_id      = "XXXXXXXXXX"

  ingress {
    description      = "Postgres access"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
}
```

**Consult** the documentation stressing that you don't _know_ how to do this, but the documentation contains examples + details that give you everything you need.

**Highlight**, as you go, the following:

- The use of `resource` to create a new thing (as opposed to `data`, to refer to an existing one)
- The pattern of `resource [resource type] [name]`
- That the name of a resource inside Terraform is not the same as the name on AWS

### Creating and destroying resources

**Show** the use of `terraform plan` to see what resources will be created.

**Demonstrate** the use of `terraform apply`, and show the created resource in the AWS dashboard.

**Remove** it again with `terraform destroy`.

**Recreate** the resource.

### Data blocks

**Ask** trainees to recall the prediction exercise from pre-work — they saw `data` used alongside `resource`. Ask what they think the difference might be.

> - `resource` creates and manages something new; Terraform controls its full lifecycle
> - `data` reads information about something that already exists; Terraform does not create, update, or destroy it

**Explain** that a `data` block is a _data source_ — it fetches read-only information about infrastructure that exists outside of this Terraform configuration. This is how Terraform integrates with resources that were created manually, by a different team, or by a separate Terraform project.

**Highlight** the common situations where you would reach for a `data` block:

> - Referencing a VPC or subnet that was created by the cloud team and is shared across projects
> - Looking up an AMI ID by name rather than hardcoding a value that changes over time
> - Reading an existing IAM role or security group to avoid accidentally recreating it

**Show** the syntax side by side with a `resource` block so the contrast is clear:

```tf
# Creates a new security group — Terraform owns and manages this
resource "aws_security_group" "database-sg" {
  name   = "c14-database-sg"
  vpc_id = "vpc-00e544d2dfe3f7848"
}

# Reads an existing VPC — Terraform does NOT create or destroy this
data "aws_vpc" "main" {
  id = "vpc-00e544d2dfe3f7848"
}
```

**Explain** the pattern: `data [resource type] [local name]` mirrors the `resource` syntax, but the block only fetches information — it never provisions, modifies, or destroys anything in AWS.

**Demonstrate** referencing a data source inside a resource block. The reference format is `data.<type>.<local name>.<attribute>`:

```tf
data "aws_subnet" "public" {
  filter {
    name   = "tag:Name"
    values = ["c14-public-subnet-1"]
  }
}

resource "aws_instance" "app-server" {
  ami           = "ami-0acc77abdfc7ed5a6"
  instance_type = "t2.micro"
  subnet_id     = data.aws_subnet.public.id
}
```

**Highlight** the `filter` block as a way to look up a resource by its AWS tags rather than hardcoding an ID — a more robust approach when IDs differ between environments or accounts.

**Ask** trainees why hardcoding VPC and subnet IDs directly into a `resource` block might be a problem.

> - IDs differ between AWS accounts and regions, so the configuration is not portable
> - If a resource is recreated, its ID changes — breaking any hardcoded reference
> - Data sources make the configuration dynamic and environment-agnostic

**Run** `terraform plan` with the data source in place and draw attention to the output — Terraform shows what it _read_ separately from what it will _create_, making it easy to confirm the lookup succeeded before applying.

### Challenge

**Challenge** trainees to work in pairs and create an RDS database using Terraform.

**Provide** them with the following initial details:

- `allocated_storage` should be `10`
- `instance_class` should be `db.t3.micro`
- `db_subnet_group_name` should be `public_subnet_group`
- `vpc_security_group_ids` should contain the ID of the resource you just created.

**Extend** the challenge by pushing trainees to load the subnet group name and security group IDs dynamically using `data` blocks.

**See** the below code for a full example.

```tf
resource "aws_db_instance" "museum-db" {
    allocated_storage            = 10
    db_name                      = "postgres"
    identifier                   = "c9-dan-museum"
    engine                       = "postgres"
    engine_version               = "15.3"
    instance_class               = "db.t3.micro"
    publicly_accessible          = true
    performance_insights_enabled = false
    skip_final_snapshot          = true
    db_subnet_group_name         = "public_subnet_group"
    vpc_security_group_ids       = [aws_security_group.database-sg.id]
    username                     = "postgres"
    password                     = "password"
}
```

### Security

**Ask** trainees if they can spot a problem in our setup.

**Reveal** the issue: we're storing sensitive details (DB password, for example) in plaintext, accessible to anyone who sees this config file.

**Introduce** the idea of a `terraform.tfvars` file containing secrets.

```tf
DB_PASSWORD = "password"
DB_USERNAME = "postgres"
```

**Ensure** it is added to the `.gitignore`.

**Explain** the three-step process for loading variables into Terraform:

1. Put the sensitive details in a `terraform.tfvars` file.
2. Create a `variables.tf` file to define what variables are loaded:

```tf
variable "DB_USERNAME" {
    type = string
}

variable "DB_PASSWORD" {
    type = string
}
```

3. Refer to those variables inside resource definitions:

```tf
username = var.DB_USERNAME
password = var.DB_PASSWORD
```

**Demonstrate** that `terraform apply` still builds the same resources with the same details, but doesn't store the variables in plaintext.

**Warn** that some of the generated files will still contain the variables, so add all of them to the `.gitignore`.

### Conclusion

**Rhapsodise** about the benefits of Terraform: a little more initial effort, but then cloud services become a breeze to work with.

**Counsel** that - just as there are many cloud resources - there are many Terraform resource blocks. No one learns all of Terraform; they learn how to read the syntax, and they use the documentation from there.

**Encourage** trainees to use Terraform in future work.

</LockedContent>
