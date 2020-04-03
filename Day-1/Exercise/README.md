# Day 1 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Initial Setup](#exercise-0---initial-setup)
- [Exercise 1 - Pages, Routing and Navigation](#exercise-1---pages-routing-and-navigation)
  - [Create pages](#create-pages)
  - [Add routes](#add-routes)
- [Exercise 2 - Update favicon](#exercise-2---update-favicon)
- [Exercise 3 - Add global styles](#exercise-3---add-global-styles)
- [Exercise 4 - Add Fontawesome](#exercise-4---add-fontawesome)
- [Exercise 5 - Add Bootstrap](#exercise-5---add-bootstrap)
- [Exercise 6 - Add Datepicker](#exercise-6---add-datepicker)
- [Exercise 7 - Add Alerts package](#exercise-7---add-alerts-package)

## General indications

🔥 The working folder for this day will be _Day-1\Exercise\Code_. T

🔥 You can find the exercises solutions for this day at _Day-1\Exercise\Solution_.

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

## Exercise 0 - Initial Setup

🚀 Let's do the first step to build our first Angular application. We should start generating a new project with Angular and Typescript.

  🎁 One very easy method is to use [Angular CLI](https://cli.angular.io/). You first should install it via *npm*.

  🎁 Then, use *Angular CLI* it to generate your new project. You should allow adding *Angular routing* and use *CSS* as stylesheet format.

  🎁 After generating the project, you should start it. *npm start* will do the job.

## Exercise 1 - Pages, Routing and Navigation

### Create pages

🚀 Our application will have many pages. Can you identify these ones based on the design? Let's create them as dummy Angular components.

  🎁 A very important thing when you write code is to be organized. So put these newly-created components into a new folder named *pages* under *fx-trading-app\src\app*.

  🎁 You can generate the components using *ng generate component* CLI command.

### Add routes

🚀 You should also can navigate through the pages you just created. So let's create now the navigation part.

  🎁 You already have a file that deals with routes: *app-routing.module.ts*.

  🎁 The first thing you need to do is to import all the components you have to make them available for routing and then populate the *routes* array by linking all your components.

  🎁 Then, replace the old lines from your root markup file (*app.component.html*) with the tag which allows routing (*router-outlet*).

## Exercise 2 - Update favicon

🚀 It is nice to have a logo for each application. Ours already has one. Let's put it as favicon to help users easily identify our app.

  🎁 We already packed the logo files for you [here](https://github.com//WebToLearn/3-days-of-Angular-magic/raw/master/Design/fx-trading-favicon-package.zip)

  🎁 After downloading and unzipping, put them in _assets_ folder.

  🎁 Remove the default Angular favicon.

  🎁 Link these images with our application via *head* section of *src/index.html* file.

## Exercise 3 - Add global styles

🚀 Even if our application has many pages, they should seem to be from the same story. This means that a global style file should be filled in with some CSS. Does your styles makes the app look the same as in the design mockups?

  🎁 The global style file is *styles.css.

  🎁 You should define the style for some common tags and classes like _h1_..._h6_, _.btn-primary_ and so on.

## Exercise 4 - Add Fontawesome

🚀 Our app looks prettier with icons. [Font Awesome](https://fontawesome.com) library will provide them to us.

  🎁 *index.html* is the place where you should import the library.

## Exercise 5 - Add Bootstrap

🚀 [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/) helps us with styling. Let's install it.

  🎁 You should install *ngx-bootstrap* via *npm*.

  🎁 Then you should import its CSS file into _index.html_ file.

## Exercise 6 - Add Datepicker

🚀 We need to manipulate dates and it is already known that it's not an easy task. The datepicker library from *ngx-bootstrap* comes for helping us.

  🎁 Add its CSS file into _index.html_ file.

  🎁 Every new module should be added into *app.module.ts*. So, import _BsDatepickerModule_ there.

## Exercise 7 - Add Alerts package

🚀 It is important to give feedback to the user and tell him if their requests were successfully or not. [ngx-toastr](https://github.com/scttcper/ngx-toastr) alerts are a nice way to display that info.

  🎁 Install *ngx-toastr* via *npm*.

  🎁 Add its style file into *angular.json*.
  
  🎁 Update *app.module.ts* by adding *ToastrModule*.
