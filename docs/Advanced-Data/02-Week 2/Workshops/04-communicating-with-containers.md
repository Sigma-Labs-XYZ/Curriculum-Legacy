---
title: Communicating with Containers
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
/prework Communicating with Containers
```

### Research - Containers

:::info Task

Find answers to the following questions:

- What are 'volumes' in Docker? What types of volume can there be?
- What are the benefits of using Docker compose?
- How does inter-container communication work using Docker compose?

:::

### Experiment

:::info Task

Run a docker container interactively with `docker run -it ubuntu`.

In a separate terminal, use the `docker exec` command to communicate with the running container.

What happens when you create a file in one terminal and then `ls` in the other? Is this what you expected to happen?

:::

## Workshop

<LockedContent password="ownership">

### Introduction

**Remind** trainees that a container is a [lightweight, standalone unit of software](https://www.docker.com/resources/what-container/).

**Highlight** that, while that's sometimes what we need, we more commonly want software to communicate in some way with users or other software. A completely standalone unit is impossible to interact with or modify. Frequently, we require a way to talk to our containers.

**Mention** that we've already done this to some extent, using the `-it` flags to run a container that still listens to our terminal commands.

### Bind mounts

**Introduce** the idea of a **volume**: storage that persists longer than the lifetime of a container.

**Focus**, initially, on [bind mounts](https://docs.docker.com/storage/bind-mounts/) - mapping a folder on the host machine to one on the container.

**Create** a folder called `api` containing an `app.py` and a `requirements.txt`. Add a `compose.yaml` outside this folder.

<Tabs>

  <TabItem label="compose.yaml" value="compose.yaml">

```yaml
services:
api:
  image: python:latest
  working_dir: /api
  volumes:
    - ./api:/api
  environment:
    - PORT=8080
    - HOST=0.0.0.0
  command: bash -c "pip install -r requirements.txt && python main.py"
```

  </TabItem>

  <TabItem label="api/app.py" value="api/app.py">

```py
from os import environ as env

from flask import Flask

app = Flask(__name__)

@app.get("/horse")
def index():
  return {
    "message": "Eventually a list of horses."
  }


if __name__ == "__main__":

  app.run(port=env.get("PORT"),
          host=env.get("HOST"),
          debug=False)
```

  </TabItem>

  <TabItem label="api/requirements.txt" value="api/requirements.txt">

```
flask
psycopg2-binary
```

  </TabItem>

</Tabs>

**Talk** through the setup of the `compose.yaml` file

- The use of `environment` to pass in variables
- The mounting of the `./api` folder into the container

**Demonstrate** that the file on your machine can be read by the container with `docker compose up`.

**Attempt** to visit the server, but fail.

**Ask** trainees what the problem is: the bind mount lets us put information into the container, but we haven't set up a way to let the container communicate as a server.

### Ports

**Adapt** the `compose.yaml` file, adding a `ports` key.

```yaml
api:
  image: python:latest
  working_dir: /api
  volumes:
    - ./api:/api
  environment:
    - PORT=8080
    - HOST=0.0.0.0
  ports:
    - 8080:8080
  command: bash -c "pip install -r requirements.txt && python main.py"
```

**Explain** that this is another mapping - just as the `api` folder is mirrored between the host and the container, so too is the port now.

**Run** `docker compose up` again and visit the server once more, checking that it's operating.

### Databases

**Demonstrate** the same principles again with a database by adding a new service to the `compose.yaml`:

```yaml
db:
  image: postgres:latest
  volumes:
    - ./db:/docker-entrypoint-initdb.d:ro
  ports:
    - 5432:5432
  environment:
    - POSTGRES_PASSWORD=password
```

**Create** a `./db` folder with a `1_schema.sql` file in it:

```sql
  CREATE TABLE horse (
    horse_id INT GENERATED ALWAYS AS IDENTITY,
    horse_name VARCHAR(30)
);

INSERT INTO
    horse (horse_name)
VALUES
    ('Millicent'),
    ('Rory'),
    ('Elastoplast'),
    ('Rolling Thunder')
;
```

**Explain**, as before, the key elements:

- A different port being mapped
- A folder mounted into the container, but this time with a **read-only** flag

**Run** `docker compose up` and then `docker compose exec db psql -U postgres` (from another terminal) to show the working database.

### Networks

**Add** on the last piece: now that we can communicate with containers, we can also get them to communicate with each other.

**Adapt** `compose.yaml` and `app.py` one final time:

<Tabs>
<TabItem label="compose.yaml" value="compose.yaml">

```yaml
services:
api:
  image: python:latest
  working_dir: /api
  volumes:
    - ./api:/api
  ports:
    - 8080:8080
  environment:
    - PORT=8080
    - HOST=0.0.0.0
    - DB_HOST=db
    - DB_PASSWORD=password
  command: bash -c "pip install -r requirements.txt && python main.py"
db:
  image: postgres:latest
  volumes:
    - ./db:/docker-entrypoint-initdb.d:ro
  ports:
    - 5432:5432
  environment:
    - POSTGRES_PASSWORD=password
```

  </TabItem>

  <TabItem label="api/app.py" value="api/app.py">

```py
from os import environ as env

from flask import Flask
from psycopg2 import connect

app = Flask(__name__)

conn = connect(
  dbname="postgres",
  user="postgres",
  password=env.get("DB_PASSWORD"),
  host=env.get("DB_HOST"),
  port=5432
)


@app.get("/horse")
def index():
  with conn.cursor() as cur:
      cur.execute("SELECT * FROM horse;")
      return cur.fetchall()


if __name__ == "__main__":

  app.run(port=env.get("PORT"),
          host=env.get("HOST"),
          debug=False)
```

  </TabItem>

</Tabs>

**Highlight** the use of `db` as the host location for the database; `docker compose` automatically puts services onto a default network where the containers know how to locate each other.

**Demonstrate** that the server is now communicating with the database.

### Conclusion

**Stress** that Docker compose is just one way of managing multiple containers, and not the main one that we'll be using.

**Note**, however, that a well-written `compose.yaml` allows you to create and connect arbitrary services together without worrying too much about the underlying machine. This makes it a common option for interviews, as you can easily share/demonstrate projects this way. It's a good idea to be comfortable with this way of doing things.

### Completed code

The below is an example of completed code for the session.

<Tabs>

  <TabItem label="compose.yaml" value="compose.yaml">

```yaml
services:
api:
  image: python:latest
  working_dir: /api
  volumes:
    - ./api:/api
  ports:
    - 8080:8080
  environment:
    - PORT=8080
    - HOST=0.0.0.0
    - DB_HOST=db
    - DB_PASSWORD=password
  command: bash -c "pip install -r requirements.txt && python main.py"
db:
  image: postgres:latest
  volumes:
    - ./db:/docker-entrypoint-initdb.d:ro
  ports:
    - 5432:5432
  environment:
    - POSTGRES_PASSWORD=password
```

  </TabItem>

  <TabItem label="db/1_schema.sql" value="db/1_schema.sql">

```sql
CREATE TABLE horse (
  horse_id INT GENERATED ALWAYS AS IDENTITY,
  horse_name VARCHAR(30)
);

INSERT INTO
  horse (horse_name)
VALUES
  ('Millicent'),
  ('Rory'),
  ('Elastoplast'),
  ('Rolling Thunder')
;
```

  </TabItem>

  <TabItem label="api/requirements.txt" value="api/requirements.txt">

```
flask
psycopg2-binary
```

  </TabItem>

  <TabItem label="api/app.py" value="api/app.py">

```py
from os import environ as env

from flask import Flask
from psycopg2 import connect

app = Flask(__name__)

conn = connect(
  dbname="postgres",
  user="postgres",
  password=env.get("DB_PASSWORD"),
  host=env.get("DB_HOST"),
  port=5432
)


@app.get("/horse")
def index():
  with conn.cursor() as cur:
      cur.execute("SELECT * FROM horse;")
      return cur.fetchall()


if __name__ == "__main__":

  app.run(port=env.get("PORT"),
          host=env.get("HOST"),
          debug=False)
```

  </TabItem>

</Tabs>

</LockedContent>
