# Day 1 - Exercises - Solution

## Table of contents

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

## Exercise 0 - Initial Setup

- install [Angular CLI](https://cli.angular.io/):

    ```bash
    npm install -g @angular/cli
    ```

- go to *Day-1\Exercise\Code*:

    ```bash
    cd 3-Days-of-Angular-magic\Day-1\Exercise\Code
    ```

- let's generate a new Angular project using CLI. When prompting the question: *Would you like to add Angular routing?*, please answer with *Y*. Also, we will use *CSS* as stylesheet format.

    ```bash
    ng new fx-trading-app
    ```

- start the project:

    ```bash
    cd fx-trading-app
    ng serve
    ```

- you should be now able to see your first Angular application on http://localhost:4200/

## Exercise 1 - Pages, Routing and Navigation

### Create pages

- go to *Day-1\Exercise\Code\fx-trading-app*:

    ```bash
    cd 3-Days-of-Angular-magic\Day-1\Exercise\Code\fx-trading-app
    ```

- create a folder for our views in *fx-trading-app\src\app*:

    ```bash
    cd src\app
    mkdir pages
    cd pages
    ```

- generate page components using CLI:

    ```bash
    ng generate component dashboard-page
    ng generate component login-page
    ng generate component not-found-page
    ng generate component register-page
    ```

### Add routes

- in *app-routing.module.ts* import all the components you have to make them available for routing:

    ```JS
    import { LoginPageComponent } from './pages/login-page/login-page.component';
    import { RegisterPageComponent } from './pages/register-page/register-page.component';
    import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
    import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
    ```

- then populate the *routes* array by linking all our components:

    ```JS
    // imports

    const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'dashboard', component: DashboardPageComponent },
    { path: '**', component: NotFoundPageComponent }
    ];

    // @NgModule({...})
    ```

- *routes* describes how to navigate through the app

- remove the old markup from *app.component.html* and then add the *RouterOutlet* directive:

```HTML
<router-outlet></router-outlet>
```

## Exercise 2 - Update favicon

- let's update favicon by first deleting _favicon.ico_ file from _fx-trading-app_ and updating _angular.json_ by deleting `src/favicon.ico` line

- download [fav icon package](https://github.com//WebToLearn/3-days-of-Angular-magic/raw/master/Design/fx-trading-favicon-package.zip) and unzip it, then copy and replace all files to _assets_ folder

- replace the following code in the head section of _src/index.html_ file with:

    ```html
    <meta charset="utf-8">
    <title>FxTradingApp</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">

    <link rel="icon" href="assets/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png" />
    <link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content="Fx Trading application" />
    ```

## Exercise 3 - Add global styles

- let's update the global style file, *styles.css*, which contains the style used in the whole application:

```CSS
/* You can add global styles to this file, and also import other style files */

html, body{
    height: 100%;
    color: #373A3C;
}

h1,h2,h3,h4,h5,h6 {
    color: #7C7C7C;
}

.btn-primary {
    background-color: #3496F0;
}

.btn-link {
    color: #3496F0;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: #F2F2F2;
}

.flex {
    display: flex;
}

.flex-vertical-centered {
    display: flex;
    align-items: center;
}

.title {
    margin-bottom: 30px;
    padding-bottom: 20px;
}

.title-border {
    border-bottom: 1px solid #DDDDDD;
}

.screen-full-height {
    height: 100vh;
}

.is-invalid {
  border-left: 5px solid #D9534F;
}
```

## Exercise 4 - Add Fontawesome

- add this in *head* section of *index.html*:

  ```HTML
  <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
  crossorigin="anonymous">
  ```

## Exercise 5 - Add Bootstrap

- install Bootstrap dependency:

  ```bash
  npm install ngx-bootstrap
  ```

- add this in *head* section of *index.html*:
  
  ```HTML
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
  ```

## Exercise 6 - Add Datepicker

- add this in *head* section of *index.html*:

  ```HTML
   <link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
  ```

- *app.module.ts*:

    ```JavaScript
    import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

    imports: [
        ...
        BsDatepickerModule.forRoot()
    ]

    ```

## Exercise 7 - Add Alerts package

- install *ngx-toastr* to see the alerts in a nice way:

    ```bash
    npm install ngx-toastr
    npm install @angular/animations
    ```

- *toast* has its own style, so let's update *angular.json* by adding the file which contains it:

```JSON
"styles": [
  "styles.css", // already here
  "node_modules/ngx-toastr/toastr.css" // add this
]
```

- we will also update *app.module.ts* by adding *ToastrModule*:

    ```JavaScript
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { ToastrModule } from 'ngx-toastr';
    ...
    imports: [
        ...,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    ...
    ```
