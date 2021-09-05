# Day 1 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Development setup](#exercise-0---development-setup)
- [Exercise 1 - Initial Setup](#exercise-1---initial-setup)
- [Exercise 2 - Pages, Routing and Navigation](#exercise-2---pages-routing-and-navigation)
  - [Create pages](#create-pages)
  - [Add routes using React Router](#add-routes-using-react-router)
- [Exercise 3 - Add global styles](#exercise-3---add-global-styles)
- [Exercise 4 - Add Google Fonts](#exercise-4---add-google-fonts)
- [Exercise 5 - Create menu component](#exercise-5---create-menu-component)
- [Exercise 6 - Article service](#exercise-6---article-service)
- [Exercise 7 - Display articles](#exercise-6---display-articles)
- [Exercise 8 - Create Footer component](#exercise-7---create-footer-component)

## General indications

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

🔥 You can find the exercises solutions for this day at _Day-1\Exercise-Blog\Solution_. Please check the solutions after you finish the exercises to compare your code.

## Exercise 0 - Development setup

### Clone repo

Use the terminal to clone this repo: `https://github.com/WebToLearn/3-days-of-Angular-magic.git`

```bash
git clone https://github.com/WebToLearn/3-days-of-Angular-magic.git
```

### Navigate to the location

The working folder for this day will be _Day-1\Exercise-Blog\Code_. Navigate to it using terminal.

```bash
cd 3-days-of-Angular-magic\Day-1\Exercise-Blog\Code
```

### Start backend server

Open a new terminal in the same location _Day-1\Exercise-Blog\Code_ and start the JSON server:

```bash
json-server --watch db.json -p 4000
```

If the command is not recognized as an internal command, open another terminal and install JSON server:

```bash
npm install -g json-server
```

## Exercise 1 - Initial Setup

🚀 Let's do the first step to build our first Angular application. We should start generating a new project with Angular and Typescript.

  🎁 One very easy method is to use [Angular CLI](https://cli.angular.io/). You should install it via *npm*.

  🎁 Then, use *Angular CLI* it to generate your new project named *Blog*. You should allow adding *Angular routing* and use *CSS* as stylesheet format.

  🎁 After generating the project, you should start it. *npm start* will do the job.

## Exercise 2 - Pages, Routing and Navigation

### Create pages

🚀 Our application will have two pages. Can you identify these ones based on the design? Let's create them as dummy Angular components.

  🎁 A very important thing when you write code is to be organized. So put these newly-created components (`home` and `details`) into a new folder named *pages* under *Blog\src\app*.

  🎁 You can generate the components using *ng generate component* CLI command.

### Add routes

🚀 You can also navigate through the pages you just created. So let's create now the navigation part.

  🎁 You already have a file that deals with routes: *app-routing.module.ts*.

  🎁 The first thing you need to do is to import all the components you have to make them available for routing and then populate the *routes* array by linking all your components.

  🎁 Then, replace the old lines from your root markup file (*app.component.html*) with the tag which allows routing (*router-outlet*).

  ```js
  const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: DetailsComponent },
];
  ```

## Exercise 3 - Add global styles

🚀 Even if our application has two pages, they should seem to be from the same story. This means that a global style file should be filled in with some CSS. Does your styles makes the app look the same as in the design mockups?

  🎁 The global style file is *styles.css*.

  🎁 The browsers can display the elements differently. To have the same standard, we need to import *normalize.css* file:

  - Install the normalize.css library:
    ```bash
    npm install --save normalize.css
    ```

  - Import it in your styles.css
    ```css
    @import-normalize;

    :root {
      --white-color: #FFFFFF;
      --black-color: #1e1e1e;
      --grey-color: #9b9b9b;
      --pink-color: #FFE3E3;
      --cardo-font: 'Cardo', serif;
      --montserrat-font: 'Montserrat', sans-serif;
    }
    ...
    ```

> The rest of the style can be found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD)

## Exercise 4 - Add Google Fonts

🚀 The fonts make the blog page looks really nice. Insert them in our project!

🎁 Use [Google Fonts](https://fonts.google.com/) to add `Cardo` and `Montserrat` fonts to the `<head>` of *Blog\src\index.html*.

## Exercise 5 - Create Menu component

🚀 If we want to extend our blog in the future, we need a menu component. Let's build it together!

🎁 In a new folder named *components* (located under *Blog\src*), create the *menu* component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD).

🎁 Integrate menu into *App.tsx*. App component should look like:

```js
<div class="container">
  <app-menu></app-menu>
  <router-outlet></router-outlet>
</div>
```
## Exercise 6 - Article service

🚀 The services make the link between your Front-end actions and Back-end calls. Let's create our first service (*article.service*) which will get all the articles to be displayed in the home page.

  🎁 Stay organized and make a new folder named *services* into _src/app_. This folder will contain all services needed in our app.

  🎁 *article.service.ts* will use *HttpClient* service to do the calls to the server in order to get all the articles.

  🎁 Use the service to get the articles list from server in *Home* component. You can find more about AJAX at [Angular's documentation](https://angular.io/guide/http).

## Exercise 7 - Display articles

🚀 We should display our articles in the Home page.

🎁 Create the article component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD) and use it to display the article. Don't forget to create article interface in *src/models/article.ts*.

🎁 Copy the *img* folder from [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD) to *Blog/src/assets*.

## Exercise 7 - Pagination

🚀 We can have many articles in our blog, so a pagination is really needed.

🎁 Create the Footer component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD).

🎁 Create the logic to display only 3 articles on the page and add functionality on the *next* and *prev* buttons to be able to navigate to other articles. Please also hide these buttons when there are no articles to display.
