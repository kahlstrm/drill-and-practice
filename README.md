# Drill And Practice

A web app for creating topic based quiz questions with auth

Creating questions and options for questions is limited to users and creating
question topics is limited to administrators.

Using the Oak-framework, PostgreSQL for the Database and Bootstrap for styling.

## Development

You need [Docker](https://docs.docker.com/get-docker/)

start with `docker compose up` and go to http://localhost:7777

If you are using an M1/M2 Mac: then do the following :

replace

    FROM denoland/deno:alpine-1.22.

In `/drill-and-practice/Dockerfile` to

    FROM lukechannings/deno:v1.22.0

## Usage

The application is hosted on

### Main page

Has a small introduction text explaining the application, including some
statistics. Users can either create a user/login OR use a guest account if they
don't want to create an account. Creating questions and options for questions
and being counted towards the question answer statistics is limited to users.

### Quiz Tab

Lists all the topic in which you can take a quiz in. Clicking on a topic
redirects you to a random question about the topic.

Choosing an answer redirects you to the page which shows you if were correct or
not. If you were wrong, shows the correct answer. On both pages there's a link
to get a new question on the same topic.

If there are no questions for a certain topic it tells you this and has a link
back to topic selection.

### Topics Tab

This page lists all the topics in the question, each question linking to the
specific question page.

In admin-view there's form for creating topics and buttons for deleting topics.

### Topic Page

For topics there's a page for adding questions for the topic, also showing a
list of questions for the topic, each linking to the question page for creating
options.

Each question shows its current option count.

### Question Page

There's a form for adding options, where you have a textfield for writing the
question and a checkbox marking the option correct.

Each option shows the amount of guesses made for that specific option, and
colored based on its correctness.

If there are no options for the question, there's a button for deleting the
question.

### API

Endpoints:

- GET `/api/questions/random` for getting a random question from any topic
- POST `/api/question/answer` with a JSON including variables `questionId` and
  `optionId`. Returns a JSON with boolean attribute `correct` telling if the
  option was correct or not.

## Static files

Static files are served from `/static`. This is currently serving gzipped
bootstrap locally with ETA-tag caching.
