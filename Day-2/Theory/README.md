# Day 2 - Theory

## Table of contents

- [Services and Dependency Injection](#services-and-dependency-injection)
    - [Create and register an injectable service](#create-and-register-an-injectable-service)
    - [Injecting services](#injecting-services)
- [Observables and RxJS](#observables-and-rxjs)
    - [Observables](#observables)
    - [Push vs pull](#push-vs-pull)
    - [Observables - basic usage](#observables---basic-usage)
    - [Defining observers](#defining-observers)
    - [Subscribing to observables](#subscribing-to-observables)
    - [RxJS](#rxjs)
- [HttpClient](#httpclient)

## Services and Dependency Injection

- Angular has its own Dependency Injection (DI) framework used in the design of applications to increase their efficiency and modularity
- Dependencies are services or objects that a class need to perform its purpose
- DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself

### Create and register an injectable service

- DI framework lets us supply data to a component from an injectable *service* class
- to indicate that our class is an Angular service, we need to use **@Injectable**
- *e.g.*:

    ```javascript
    import { Injectable } from @angular/core;
    import { BOOKS } from './mock-books';

    @Injectable({
        // we declare that this service should be created
        // by the root application injector
        providedIn: 'root'
    })
    export class BookService {
        getBooks() { return BOOKS; }
    }
    ```

- we can use Angular CLI also to generate a new service class:

    ```sh
    ng generate service books
    ```

- the result of that Angular CLI command will be:

    ```javascript
    import { Injectable } from '@angular/core';

    @Injectable({
        providedIn: 'root',
    })
    export class BookService {
        constructor() { }
    }
    ```

### Injecting services

- in order to use some functions declared in services, we need to inject that service in the component's constructor:

    ```javascript
    constructor(private bookService: BookService)
    ```

## Observables and RxJS

### Observables

- provide support for passing messages between publishers and subscribers in our application
- practically, **Observables are lazy collections of multiple values over type**
- have benefits for event handling, asynchronous programming and handling multiple values
- observables are declarative - we define a function for publishing values, but it is not executed until a consumer subscribes to it
- the subscribed consumer then receives notifications until the function completes or until they unsubscribe
- an observable can deliver multiple values of any type: literals, messages or events

### Push vs pull

- push and pull are two different ways that describe how a *data producer* communicates with the *data consumer*
- **Pull**:
    - the data-consumer decides when it get's data from the data-producer
    - the producer is unaware of when data will be delivered to the consumer
    - **every JavaScript function uses the pull**: the function is a data-producer and the call of that function is consuming it
- **Push**:
    - the data-producer decides when the consumer gets the data
    - **promises are the most common way of push in JavaScript**: a promise is the producer and delivers a resolved value to the registered callbacks, which are the consumers
    - **observables are the new way of pushing data in JavaScript**: an observable is a producer of multiple values, pushing them to subscribers

### Observables - basic usage

- as a publisher, you create an *Observable* instance that defines a *subscriber* function - this is the function that will be executed when a consumer calls the *subscribe()* method
- to execute the observable and begin receiving notifications, we need to call its *subscribe()* method, passing an observer
- the *subscribe()* call returns a *Subscription* object that has an *unsubscribe()* method

### Defining observers

- an observer can send three types of notifications:
    - **next**: required, a handler for each delivered value
    - **error**: optional, a handler for an error notification
    - **complete**: optional, a handle for the execution-complete notification

- *e.g.*:

    ```javascript
    import { Observable } from 'rxjs';

    public getStudents(): any {
        const studentsObservable = new Observable(observer => {
            setTimeout(()=> {
                observer.next(this.students);
            }, 1000);
        });

        return studentsObservable;
    }
    ```

### Subscribing to observables

- an *Observable* instance begins publishing values only when someone subscribes to it by calling *subscribe()* method of the instance, passing an observer object to receive the notifications
- *e.g.*:

    ```javascript
    const studentsObservable = this.studentService.getStudents();
    studentsObservable.subscribe((studentsData: Student[]) => {
        this.students = studentsData;
    },
    (error) => console.log('Observer got an error: ' + error),
    () => console.log('Observer got a complete notification'))
    ```

### RxJS

- **Reactive programming** is an asynchronous programming paradigm concerned with data streams and the propagation of change
- **RxJS (Reactive Externsions for JavaScript)** is a library for reactive programming using observables
- RxJS provides an implementation of the Observable type, which is needed until the type becomes part of the language and until browsers supports it
- the library provides functions for creating and working with observables, such as:
    - converting existing code for async operations into observables
    - iterating through the values in a stream
    - mapping values to different types
    - filtering streams
    - composing multiple streams
- *e.g.*:

    ```javascript
    import { from } from 'rxjs';

    // Create an Observable out of a promise
    const data = from(fetch('/students'));

    // Subscribe to begin listening for async result
    data.subscribe({
        next(response) { console.log(response); },
        error(err) { console.log('Error: ' + err); },
        complete() { console.log('Completed'); }
    })
    ```

- **operators** are functions that enable complicated manipulation of collections
- *e.g.*: *map(), filter(), concat(), flatMap()*
- operators take configuration options and return a function that takes a source observable
- when executing this returned function, the operator observes the source observable's emitted values, transforms them and returns a new observable of those transformed values
- *e.g.*:

```javascript
import { map } from 'rxjs/operators';

const nums = of(1,2,3);

const squareValues = map((val: number) => val * val);
const squareNums = squareValues(nums);

squareNums.subscribe(x => console.log(x));

// 1
// 4
// 9
```

## HttpClient

- most Front-End applications communicate with Back-End services over HTTP protocol
- modern browsers support 2 APIs for making HTTP requests:
    - *XMLHttpRequest* interface
    - *fetch()* API
- *HttpClient* offers a simplified client HTTP API for Angular applications
- *HttpClient* is based on the XMLHttpRequest interface exposed by browsers
- additional benefits of *HttpClient* include testability features, *Observable* APIs and request/response interception
- to use *HttpClient*, we need to import it in the root *AppModule*
- *e.g.*:

    ```javascript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    @Injectable()
    export class BookService {
        constructor(private http: HttpClient) {}
    }
    ```

- best practice is to separate presentation of data from data access by encapsulating data access in a separate service and using that service in the component which needs it
- when making a call in the Back-End, the response will be an *Observable*
- if the request fails on the server, *HttpClient* will return an error object instead of a successful response
- *e.g.*:

     ```javascript
    this.books = this.http.get('https://api.com/books')
        .subscribe(
            data => console.log(data),
            error => console.log('Error: ' + error));
    ```
