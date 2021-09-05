# Day 3 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Development setup](#exercise-0---development-setup)
- [Exercise 1 - Pass article id to details page](#exercise-1---pass-article-id-to-details-page)
- [Exercise 2 - Update Details page](#exercise-2---update-details-page)
- [Exercise 3 - Create pagination](#exercise-3---create-pagination)

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

The working folder for this day will be _Day-3\Exercise-Blog\Code\Blog_. Navigate to it using terminal.

```bash
cd 3-days-of-Angular-magic\Day-3\Exercise-Blog\Code\Blog
```

### Install packages

We need to install node modules packages using the terminal:

```bash
npm install
```

### Start backend server

Open a new terminal in the same location _Day-3\Exercise-Blog\Code_ and start the JSON server:

```bash
json-server --watch db.json -p 4000
```

If the command is not recognized as an internal command, open another terminal and install JSON server:

```bash
npm install -g json-server
```

## Exercise 1 - Pass article id to details page

🚀 Let's add some navigation functionality to *Read More* button!

🎁 Pass `articleId` via router when navigate from *Home* page to *Details* page.

## Exercise 2 - Update Details page

🚀 Now it's time to see the full article here!

🎁 Use the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD) to build the *Details* page.

🎁 Split the article content into two parts and add the *Saying* in the middle.

### Exercise 3 - Create pagination

🚀 Life will be easier if you can go to other articles directly from the *Details* page.

🎁 Create the logic to navigate to the previous and the next article in our blog. Don't forget to make the *previous article* and *next article* buttons to have the same style like in the *Home* page.
