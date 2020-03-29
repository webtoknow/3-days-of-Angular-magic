# Day 3 - Exercises

## Table of contents

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
  - [Authentication guard](#authentication-guard)
  - [JWT Interceptor](#jwt-interceptor)
  - [Error Interceptor](#error-interceptor)
  - [Update Application Module with new added classes](#update-application-module-with-new-added-classes)
  - [Login component](#login-component)
- [Exercise 3 - Not found page](#exercise-3---not-found-page)

## Exercise 0 - Configuration

### Download all npm dependencies

- go to *Day-3\Exercise\Code\fx-trading-app*:

    ```bash
    cd 3-Days-of-Angular-magic\Day-3\Exercise\Code\fx-trading-app
    ```

- run *npm install* to download all dependencies:

    ```bash
    npm install
    ```

### Configure Mock Server

- it is used to create a fake API to mock the backend data
- it is based on [JSON Server](https://github.com/typicode/json-server)
- we will be able to start all microservices in the same time
- let's install its packages:

```bash
cd 3-Days-of-Angular-magic\Day-3\Exercise\Code\fx-trading-app\mock-server
npm install
```

- start all microservices in a single terminal:

```bash
npm start
```

- now we can access these APIs:
  - `/user/authenticate` - sign-in
  - `/user/register` - register
  - `/transactions` - get all transactions
  - `/currencies` - get all currencies
  - `/fx-rate` - get fx rates for specific currencies

## Exercise 1 - Register page

### User model

- by taking a look at the register page's design, we can identify the required fields for user entity:
  - id
  - username
  - email
  - password
- create a new file *user.ts* into *fx-trading-app\src\app\models* containing the fields above:

    ```JavaScript
    export class User {
        id: number;
        username: string;
        email: string
        password: string;
    }
    ```

### User service

- we want to send the user details through HTTP request to the server, so let's create into *fx-trading-app/src/app/services* a new file named *user.service.ts*:

    ```JavaScript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    import { User } from '../models/user';
    import { backendUrl } from '../constants';

    @Injectable()
    export class UserService {
        constructor(private http: HttpClient) { }

        register(user: User) {
            return this.http.post(backendUrl.authService.register, user) as any;
        }

    }
    ```

- so, the service:
  - will be marked as injectable through *@Injectable()* adnotation
  - will contain a constructor, in which we will inject *HTTPClient* in order to be able to make HTTP requests
  - will contain also the *register* method, receiving an *User* object - the one we want to save in order to create a new account - which will actually do the HTTP request: a **POST** on the URL estabilished in *constants.ts* (*backendUrl.authService.register*) with *user* as *Request Body*

### Update Application Module

- include *User Service* into *app.module.ts*:

    ```JavaScript
    import { UserService } from 'src/app/services/user.service';

    providers: [
        ...
        UserService,
        ...
    ]
    ```

### Register component

- **register-page.component.html**:

    ```HTML
    <div class="row screen-full-height">
    <div class="col-md-6 login-logo-container container-center">
        <img class="fx-grayscale-logo" alt="fx-logo" src="./assets/img/logo-grayscale.svg">
    </div>
    <div class="col-md-6">
        <div class="container-center screen-full-height">

        <div class="content">
            <div class="title title-border">
            <h4>Register a new account</h4>
            </div>
            <form id="register" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-group flex">
                <div class="col">
                <label for="username">Username</label>
                <input type="text" class="form-control form-control-sm" id="inputUsername"
                    formControlName="username" placeholder="username" autocomplete="username"
                    [ngClass]="{ 'is-invalid': submitted && f.username.errors }" />
                <span *ngIf="submitted && f.username.errors" class="invalid-feedback">
                    <span *ngIf="f.username.errors.required">Username is required!</span>
                </span>
                </div>
            </div>
            <div class="form-group flex">
                <div class="col">
                <label for="email">Email</label>
                <input type="text" class="form-control form-control-sm" id="inputEmail"
                    formControlName="email" placeholder="email address"
                    [ngClass]="{ 'is-invalid': submitted && f.email.errors }" />
                <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
                    <div *ngIf="f.email.errors.required">Email is required!</div>
                </div>
                </div>
            </div>
            <div class="form-group flex">
                <div class="col">
                <label for="password">Password</label>
                <input type="password" class="form-control form-control-sm" id="inputPassword"
                    formControlName="password" placeholder="password" autocomplete="new-password"
                    [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
                <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                    <div *ngIf="f.password.errors.required">Password is required!</div>
                    <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters!</div>
                </div>
                </div>
            </div>
            <div class="form-group flex">
                <div class="col">
                <label for="password">Confirm password</label>
                <input type="password" class="form-control form-control-sm" id="inputConfirmPassword"
                    formControlName="confirmPassword" placeholder="confirm password" autocomplete="new-password"
                    [ngClass]="{ 'is-invalid': submitted && f.confirmPassword.errors }" />
                <div *ngIf="submitted && f.confirmPassword.errors" class="invalid-feedback">
                    <div *ngIf="f.confirmPassword.errors.required">Password confirmation is required!</div>
                </div>
                </div>
            </div>
            <button [disabled]="loading" type="submit" class="btn btn-primary btn-block">Register</button>
            <div class="text-container">
                <span>Already have an account?&nbsp;</span>
                <a [routerLink]="['/login']" class="btn btn-link">Login</a>
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>
    ```

- we can notice here:
  - fields are grouped in a form: *[formGroup]="registerForm"*
  - when we press on *Register*, the *onSubmit* function is triggered: *(ngSubmit)="onSubmit()"*
  - we have some validations here:
  - required validations:
    - *e.g.*:

    ```HTML
    <span *ngIf="submitted && f.username.errors" class="invalid-feedback">
        <span *ngIf="f.username.errors.required">Username is required!</span>
    </span>
    ```

  - minimum length validations:
    - *e.g.*:

    ```HTML
    <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
    <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters!
    </div>
    </div>
    ```

  - we have a link to *Login Page*:

    ```HTML
    <div class="text-container">
        <span>Already have an account?&nbsp;</span>
        <a [routerLink]="['/login']" class="btn btn-link">Login</a>
    </div>
    ```

- **register-page.component.css**:

    ```CSS
    .container-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-logo-container {
        background-color: rgb(141,213,170);
    }

    .fx-grayscale-logo {
        width: 350px;
        height: 350px;
    }

    .content {
        width: 350px;
    }

    .col {
        padding: 0;
    }

    .flex {
        display: flex;
    }

    .invalid-feedback {
        font-weight: bold;
    }

    .btn-link {
        padding: 0;
    }

    .text-container {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    ```

- **register-page.component.ts**:

    ```JavaScript
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { first } from 'rxjs/operators';
    import { ToastrService } from 'ngx-toastr';

    import { UserService } from '../../services/user.service';

    @Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
    })
    export class RegisterPageComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
        })
    }

    //getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        //if form is invalid
        if (this.registerForm.invalid) {
        return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
            this.toastr.success('Registration successful!');
            this.loading = false;
            this.router.navigate(['/login']);
            },
            error => {
            this.toastr.error(error);
            this.loading = false;
            }
        )
    }

    }
    ```

- we can notice here:
  - the component is declared through *@Component* adnotation, by specifying the selector, template and style files
  - the form, its fields and validations are specified in the class
  - in *onSubmit* function, if the form is valid, we use *userService.register* to send the entity to the server to be saved. If the request is successful, we will display a message and redirect the user to *login* page, but if it is not, we just display an error message

## Exercise 2 - Login page

### Authentication service

- this service will be responsible for logging the user in and out, by putting on *localStorage* the *currentUser* or by removing it
- in *fx-trading-app\src\app\services*, we will create a new file, *authentication.service.ts*:

    ```JavaScript
    // used for login and logout of the application
    // login -> posts the users credentials to api and checks the response for a JWT token
    // logged in user details are stored in local storage

    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { map } from 'rxjs/operators';
    import { backendUrl } from '../constants';

    @Injectable()
    export class AuthenticationService {

        constructor(
            private http: HttpClient
        ) { }

        login(username: string, password: string) {
            return this.http.post<any>(backendUrl.authService.authenticate, { username: username, password: password })
                .pipe(map(user => {
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }

                    return user;
                }))
        }

        logout() {
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
        }

    }
    ```

- this service:
  - will be marked as injectable
  - in the constructor, we will inject *HTTPClient* in order to have the possibility to make HTTP requests
  - will contain 2 methods: *login* and *logout*
  - *login* method will receive as parameters 2 strings, username and password. It will make a *POST* HTTP request to the API responsible for this (*backendUrl.authService.authenticate*, as declared in *constants*) and will send a *Request Body* as on object containing these 2 properties. If they are valid, the backend will put a token on the response and we will set the *currentUser* on *localStorage* to log in
  - *logout* method will remove the *currentUser* property from localStorage

### Authentication guard

- we need a method to allow the user to view some pages only if he is logged in
- for this purpose, we will create a new folder into *fx-trading-app\src\app* named *guards* and, inside it, a new file, *auth.guard.ts*. This class will be responsible to check if the user has access to view the  pages linked with some routes or not. It will be possible by verifying if the *currentUser* property has been set on *localStorage*. If yes, the access is permitted, else, the user will be redirected to */login* page:

    ```JavaScript
    import { Injectable } from '@angular/core';
    import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

    @Injectable()
    export class AuthGuard implements CanActivate {

        constructor(private router: Router) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            if (localStorage.getItem('currentUser')) {
                // we are logged in => return true
                return true;
            }

            // we are not logged in => redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }

    }
    ```

- after creating the class, we need to update the some routes in *app-routing.module.ts* to be private:

    ```JavaScript
    import { AuthGuard } from 'src/app/guards/auth.guard';

    const routes: Routes = [
        { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'login', component: LoginPageComponent },
        { path: 'register', component: RegisterPageComponent },
        { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
        { path: '**', component: NotFoundPageComponent }
    ];
    ```

- this means that *dashboard* will be private and if the user is not logged in, (s)he will be redirected to */login*

### JWT Interceptor

- our interceptor will be responsible for intercepting HTTP requests from the application to add a JWT auth token to the Authentication header if the user is logged in
- we will create a new folder into *fx-trading-app\src\app* named *helpers*. Inside it, we will create a new file, *jwt.interceptor.ts*:

    ```JavaScript

    import { Injectable } from '@angular/core';
    import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
    import { Observable } from 'rxjs';

    @Injectable()
    export class JwtInterceptor implements HttpInterceptor {
        intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
            // add authorization header with jwt token if available
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                })
            }

            return next.handle(request);
        }
    }
    ```

### Error Interceptor

- we will also need a class which intercepts the errors and handles them
- let's create a new file *error.interceptor.ts* into *fx-trading-app\src\app\helpers*, *error.interceptor.ts*:

    ```JavaScript
    // intercepts http responses from the api to check if there were any errors.
    // If there is a 401 Unauthorized response the user is automatically logged out of the application.
    // All other errors are re-thrown to be caught by the calling service so an alert will be displayed to the user

    import { Injectable } from '@angular/core';
    import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';
    import { catchError } from 'rxjs/operators';

    import { AuthenticationService } from '../services/authentication.service';

    @Injectable()
    export class ErrorInterceptor implements HttpInterceptor {
        constructor(private authenticationService: AuthenticationService) {}

        intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
            return next.handle(request).pipe(catchError(err => {
                if (err.status === 401) {
                    //logout if 401 response is returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            }))
        }

    }
    ```

- so, the way we handle the errors is:
  - if the error has 401 status, means that the user is not authorized to view the page, so he will be logged out
  - the error thrown will contain the message or the status

### Update Application Module with new added classes

- in *app.module.ts*:

  - include *Authentication Service*:

    ```JavaScript
    import { AuthenticationService } from 'src/app/services/authentication.service';

    providers: [
        ...
        AuthenticationService,
        ...
    ```

    - include *Authorization Guard*:

        ```JavaScript
        import { AuthGuard } from 'src/app/guards/auth.guard';

        providers: [
            AuthGuard,
            ...
        ```

    - add *JWT* and *Error Interceptors*:

        ```JavaScript
        import { HTTP_INTERCEPTORS } from '@angular/common/http';
        import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
        import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';

        providers: [
            ...
            { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        ],

        ```

### Login component

- **login-page.component.html**:

    ```HTML
    <div class="row screen-full-height">
    <div class="col-md-6 login-logo-container container-center">
        <img class="fx-grayscale-logo" alt="fx-grayscale-logo" src="./assets/img/logo-grayscale.svg">
    </div>
    <div class="col-md-6">
        <div class="container-center screen-full-height">
        <div class="content">
            <div class="title title-border">
            <h4>Login to your account</h4>
            </div>
            <form id="login" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Username -->
            <div class="form-group flex">
                <i class="fa fa-user icon" aria-hidden="true"></i>
                <div class="col">
                <input type="text" class="form-control form-control-sm" formControlName="username"
                    placeholder="username" autocomplete="username" id="username"
                    [ngClass]="{ 'is-invalid': submitted && f.username.errors }" />
                <span *ngIf="submitted && f.username.errors" class="invalid-feedback">
                    <span *ngIf="f.username.errors.required">Username is required!</span>
                </span>
                </div>
            </div>
            <!-- Password -->
            <div class="form-group flex">
                <i class="fa fa-lock icon" aria-hidden="true"></i>
                <div class="col">
                <input type="password" class="form-control form-control-sm" formControlName="password"
                    placeholder="password" autocomplete="current-password" id="password"
                    [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
                <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                    <div *ngIf="f.password.errors.required">Password is required!</div>
                </div>
                </div>
            </div>
            <button [disabled]="loading" type="submit" class="btn btn-primary btn-block">Login</button>
            <div class="text-container">
                <span>You don't have an account?&nbsp;</span>
                <a [routerLink]="['/register']" class="btn btn-link">Register</a>
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>
    ```

- Here we have:
  - a form containing *username* and *password* fields, grouped in *[formGroup]="loginForm"*
  - when we press on *Login*, the *onSubmit* function is triggered: *(ngSubmit)="onSubmit()"*
  - we have here required validations:
    - *e.g.*:

        ```HTML

        <span *ngIf="submitted && f.username.errors" class="invalid-feedback">
            <span *ngIf="f.username.errors.required">Username is required!</span>
        </span>
        ```

    - we have a link to *Register Page*:

        ```HTML
        <div class="text-container">
            <span>You don't have an account?&nbsp;</span>
            <a [routerLink]="['/register']" class="btn btn-link">Register</a>
        </div>
        ```

- **login-page.component.css**:

    ```CSS
    .container-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-logo-container {
        background-color: rgb(141,213,170);
    }

    .fx-grayscale-logo {
        width: 350px;
        height: 350px;
    }

    .content {
        width: 350px;
    }

    .icon {
        font-size: 24px;
        color: #dddddd;
        margin-right: 15px;
        line-height: 31px;
    }

    .col {
        padding: 0;
    }

    .invalid-feedback {
        font-weight: bold;
    }

    .btn-link {
        padding: 0;
    }

    .text-container {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    ```

- **login-page.comonent.ts**:

    ```JavaScript
    import { Component, OnInit } from '@angular/core';
    import { Router, ActivatedRoute } from '@angular/router';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { first } from 'rxjs/operators';
    import { ToastrService } from 'ngx-toastr';
    import { AuthenticationService } from 'src/app/services/authentication.service';

    @Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
    })
    export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
        });

        this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // Exit function if form is invalid
        if (this.loginForm.invalid) {
        return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
            this.router.navigate([this.returnUrl]);
            },
            error => {
            this.toastr.error(error);
            this.loading = false;
            }
        )
    }

    }
    ```

- we can observe here:
  - the component is declared through *@Component* adnotation
  - the form, its fields and validations are specified in the class
  - in *onSubmit* function, if the form is valid, we use *authenticationService.login* to send the username and password to the server. If the request is successful, we will be redirected to *Dashboard* page or the previous accessed page where we did not have access initially (*returnUrl*). Else, we will display an error message

## Exercise 3 - Not found page

- if the user access a route that does not exist, we should display a page containing the *Page not found* message

- **not-found-page.component.html**:

    ```HTML
    <div class="screen-full-height fx-not-found-container">
        <img class="fx-not-found-logo" alt="fx-not-found-logo" src="./assets/img/error_404.png">
        <div class="fx-not-found-text">Sorry, the page you are looking for does not exist.</div>
        <button class="btn btn-primary btn-block fx-not-found-go-login" (click)="goToLogin()">Go to Login</button>
    </div>
    ```

- in this page, we will display:
  - a *404 Not found page* image
  - an appropriate message
  - a button which redirects to the Login page

- **not-found-page.component.css**:

    ```CSS
    .fx-not-found-container {
        background-color: rgb(141,213,170);
        padding-top: 120px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .fx-not-found-logo {
        margin-bottom: 40px;
        width: 395px;
    }

    .fx-not-found-text {
        font-size: 16px;
        color: #7C7C7C;
        margin-left: 60px;
    }

    .fx-not-found-go-login {
        margin-top: 20px;
        margin-left: 50px;
        width: 250px;
    }
    ```

- **not-found-page.component.ts**:

    ```JavaScript
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router';

    @Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.css']
    })
    export class NotFoundPageComponent implements OnInit {

        constructor(
            private router: Router
        ) { }

        ngOnInit() {
        }

        goToLogin() {
            this.router.navigate(['/login']);
        }
    }
    ```
