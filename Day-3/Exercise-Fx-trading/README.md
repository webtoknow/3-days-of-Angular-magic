# Day 3 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Configure Mock Server](#configure-mock-server)
- [Exercise 1 - Register page](#exercise-1---register-page)
  - [User model](#user-model)
  - [User service](#user-service)
  - [Update Application Module](#update-application-module)
  - [Register component](#register-component)
- [Exercise 2 - Login page](#exercise-2---login-page)
  - [Authentication service](#authentication-service)
  - [Logout](#logout)
  - [Authentication guard](#authentication-guard)
  - [JWT Interceptor](#jwt-interceptor)
  - [Error Interceptor](#error-interceptor)
  - [Update Application Module with new added classes](#update-application-module-with-new-added-classes)
  - [Login component](#login-component)
- [Exercise 3 - Not found page](#exercise-3---not-found-page)

## General indications

🔥 The working folder for this day will be _Day-3\Exercise\Code_. The code from previous days is already here.

🔥 You can find the exercises solutions for this day at _Day-3\Exercise\Solution_.

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

## Exercise 0 - Configuration

### Download all npm dependencies

🚀 You already have all the names and versions of dependencies in *package.json*. To complete this exercise, you only need to download them.

  🎁 Use *npm* to download all dependencies.

  🎁 Take care from where you run the command. The folder should contain *package.json*.

### Configure Mock Server

🚀 Previously, you used JSON Server to simulate a Back-end server. But you had to open many terminal windows (one for each microservice). This time, a better option can be used: Mock Server (also based on JSON Server). Let's install it and then start all the microservices in a single terminal.

  🎁 All database files are now in *mock-server* folder, also the *package.json* for this server. So, install and start npm commands from there.

## Exercise 1 - Register page

### User model

🚀 At the end of this day, you will be able to login and register the user. So, a new model is now required: *User*. Let's take a look at the design mockups and identify the fields. Then, implement the model.

  🎁 Your interface will be created into _models_ folder.

### User service

🚀 A new service is needed to send the user details through HTTP request to the server. We are talking about *UserService*. Let's make it!

  🎁 For the moment, this service will contain the *register* method which will receive an *User* object, the one we want to save in order to create a new account.

### Update Application Module

🚀 You manually created a new service, so it should be declared into *Application Module* in order to be used by your app's components.

  🎁 *UserService* should be included into *providers* array.

### Register component

🚀 Register component allows the user to make an account in the application by completing a form. After that, the data should be sent to the server. Let's follow the mockups and create this component.

  🎁 Fields will be grouped in a form.

  🎁 *Register* button will have attached the *onSubmit* function which will send the *User* entity to Back-end if the form is valid.

  🎁 If the register action was successful, use *ngx-toastr* to display a message and then redirect the user to *Login* page. If not, display an appropriate text.

  🎁 You should also have a link to the *Login* page to connect the two pages.

  🎁 The style of this component will be put into _register-page.component.css_. Do your best to make your design to look like the mockup!

## Exercise 2 - Login page

### Authentication service

🚀 You should create a new service which will be responsible for logging the user in and out: *AuthenticationService*.

  🎁 This new service can be created into *services* folder.

  🎁 The login and logout actions will be possible by putting on *localStorage* the *currentUser* or by removing it.

### Logout

🚀 It's time to put a click action for *Logout* button!

  🎁 You already have the *Logout* button on *Dashboard* page. Put a function on it and start coding!

  🎁 This method will remove the *currentUser* property from *localStorage* and the redirect to user to *Login* page.

### Authentication guard

🚀 Why you want to implement login functionality? Because you want a method to restrict the access for the user to some pages if he is not logged in. Create a *canActivate* function to check if the user has access to view the pages.

  🎁 The *canActivate* function will be implemented into *AuthGuard* class in a new folder named *guards*.

  🎁 You need a method to check if the user is logged in (or not) to allow (or not allow) to view our private page. How about verifying if the *currentUser* property has been set on *localStorage*?

  🎁 If *currentUser* is not there, redirect the user to */login* page.

  🎁 *canActivate* will be applied to our private route: *Dashboard*.

### JWT Interceptor

🚀 An interceptor for requests and responses is also needed. For HTTP requests, a JWT auth token will be added to the Authentication header if the user is logged in. For the responses, it will check if the user is not authorized to view the response, so he will be logged out.

  🎁 You should create a new folder into *\app* named *helpers*. Inside it, put a new file, *jwt.interceptor.ts*

### Error Interceptor

🚀 You also need a class which intercepts the errors and handles them. Let's create it!

  🎁 In the same folder, *helpers*, create a new file, *error.interceptor.ts*. Put you code here!

  🎁 If the error has 401 status, means that the user is not authorized to view the page, so he will be logged out.
  
  🎁 The error thrown will contain the message or the status.

### Update Application Module with new added classes

🚀 You have some new classes. Don't forget to update *Application Module*!

  🎁 Put *AuthenticationService* and *AuthGuard* to *providers*.

  🎁 Add also *JWT* and *Error Interceptors*.

### Login component

🚀 After the register step, the user will want to log in into our application. A form will be completed and sent to the server. Let's create this new component!

- the form, its fields and validations are specified in the class
- in *onSubmit* function, if the form is valid, we use *authenticationService.login* to send the username and password to the server. If the request is successful, we will be redirected to *Dashboard* page or the previous accessed page where we did not have access initially (*returnUrl*). Else, we will display an error message

  🎁 The form, its fields and validations should be specified in the class.

  🎁 *Login* button will have attached the *onSubmit* function which will send the *User* entity to Back-end if the form is valid.

  🎁 If the user logged in successfully, he will be redirected to *Dashboard* page.  Else, you will display an error message.

  🎁 You should also have a link to the *Register* page.

  🎁 Don't forget to put the style into _login-page.component.css_!

## Exercise 3 - Not found page

🚀 All applications should have a page which will be displayed if the user accesses a route that does not exist. Let's implement ours and inspiring ourselves from the design!

  🎁 The page should display an image, a message and a button which redirects the user to the *login* page.
  
  🎁 For a nice layout, you need to fill in the file *not-found-page.component.css*.
