# README

This is a basic setup of rails with react as frontend. Please follow the steps:

## Creating a new rails application using Docker

### Prepare the project directory

```shell
mkdir PROJECTNAME
cd PROJECTNAME
touch Dockerfile Gemfile Gemfile.lock docker-compose.yml
```

Copy the following contents into `Dockerfile`:

```dockerfile
FROM ruby

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install -y nodejs yarn --no-install-recommends \
  && gem install rails

WORKDIR /app

COPY Gemfile Gemfile.lock /app/
RUN bundle install

CMD ["/bin/bash"]
```

Copy the following contents into `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    depends_on:
      - db
    ports:
      - "3000:3000"
    volumes:
      - .:/app:delegated
version: '3'
```

Initialize your git repository and make an initial commit:

```shell
git init
git add .
git commit -m "Prepare the project directory"
```

### Create the rails project

First build the `web` container image using `docker-compose`:

```shell
docker-compose build web
```

Then run `rails new` to create the initial rails project:

```shell
docker-compose run web rails new . --force --no-deps --database=postgresql \
--webpack=react --skip-coffee
```

Add everything to git and make a new commit:

```shell
git add .
git commit -m "Run 'docker-compose run web rails new . --force --no-deps --database=postgresql --webpack=react --skip-coffee'"
```

If you are running linux, `chown` the newly generated files and directories.

Finally, re-build the `web` container so that it now includes the project dependencies:

```shell
docker-compose build web
```

### Configure the project to talk to the database container

Add the following to lines to the `default` section of `config.database.yml`:

```yaml
  host: db
  username: postgres
```

Make a commit:

```shell
git add .
git commit -m "Configure the project to talk to the database container"
```

### Create the development and test databases

```shell
docker-compose run web rails db:create
```

If you encounter permission errors in this step, try `chown` the current directory or run `docker-compose up`.

### Install frontend dependencies

Add frontend packages with `yarn`:

```shell
docker-compose run web yarn add react-router-dom bootstrap jquery popper.js
```

This will add corresponding packages in `package.json` and `yarn.lock`.

Commit the changes and rebuild the image

```shell
docker-compose build web
```

### Start the development server

```
docker-compose up
```

At this point you *should* be able to access the “Yay! You’re on Rails!” page via [http://localhost:3000](http://localhost:3000/).




# README


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
