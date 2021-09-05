# Day 2 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Development setup](#exercise-0---development-setup)
- [Exercise 1 - Create add component](#exercise-1---create-add-component)
- [Exercise 2 - Create Modal component](#exercise-2---create-modal-component)
- [Exercise 3 - CRUD](#exercise-3---crud)

## General indications

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

🔥 You can find the exercises solutions for this day at _Day-2\Exercise-Blog\Solution_. Please check the solutions after you finish the exercises to compare your code.

## Exercise 0 - Development setup

### Clone repo

Use the terminal to clone this repo if you didn't clone it yesterday: `https://github.com/WebToLearn/3-days-of-Angular-magic.git`

```bash
git clone https://github.com/WebToLearn/3-days-of-Angular-magic.git
```

### Navigate to the location

The working folder for this day will be _Day-2\Exercise-Blog\Code\Blog_. Navigate to it using terminal.

```bash
cd 3-days-of-Angular-magic\Day-2\Exercise-Blog\Code\Blog
```

### Install packages

We need to install node modules packages using the terminal:

```bash
npm install
```

### Start backend server

Open a new terminal in the same location _Day-2\Exercise-Blog\Code_ and start the JSON server:

```bash
json-server --watch db.json -p 4000
```

If the command is not recognized as an internal command, open another terminal and install JSON server:

```bash
npm install -g json-server
```

## Exercise 1 - Create add component

🚀 Something is missing from the Home page, isn't it? Let's fix this together!

🎁 Create the *Add* button component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD).

## Exercise 2 - Create Modal component

🚀 Let's use a Modal to manage the list of articles!

🎁 Create the Modal component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD) and add it to *Home* page.

🎁 Create click events on *Add* and *Edit* buttons to open the modal.

🎁 Create an event on *Cancel* button in the modal to close it.

### Exercise 3 - CRUD

🚀 Now we have all the components required to to add, edit and delete the articles, so let's create now this functionality.

🎁 Create a new variable (`tempArticle`) in home page to be used when adding and editing articles. Then pass it (via [input](https://angular.io/guide/inputs-outputs)) to the Modal component to be linked to the modal form.

🎁 By using *EventEmitter*, we can update `tempArticle` from modal form.

🎁 Let's build the _Create_ , _Update_ and _Delete_ methods to call the server and add them to *ArticleService*. In the table below, we can find the CRUD operations (_Create_, _Read_, _Update_ and _Delete_) associated with the appropiate HTTP methods:

| CRUD Operations | HTTP Methods | URL           | URL Parameters | Request body | Examples                     |
| --------------- | ------------ | ------------- | -------------- | ------------ | ---------------------------- |
| _Create_        | POST         | /articles     |                | body: {...}  | POST /articles body: {...}   |
| _Read One_      | GET          | /articles/:id | :id            |              | GET /articles/123            |
| _Read All_      | GET          | /articles     |                |              | GET /articles                |
| _Update_        | PUT          | /articles/:id | :id            | body: {...}  | PUT /articles/123 body:{...} |
| _Delete_        | DELETE       | /articles/:id | :id            |              | DELETE /articles/123         |

> POST and PUT methods should contain `Content-Type: application/json` in the header, along with the informations from `body`.
