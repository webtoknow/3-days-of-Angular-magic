# Design

## Table of contents

- [Requirements](#requirements)
    - [Register page](#register-page)
    - [Login page](#login-page)
    - [FX Trading Dashboard](#fx-trading-dashboard)
    - [FX Rate View](#fx-rate-view)
    - [Blotter View](#blotter-view)
- [Design Sketches](#design-sketches)
  - [Mind map - Mindmeister](#mind-map---mindmeister)
  - [Wireframe - Balsamiq](#wireframe---balsamiq)
  - [Prototype - Axure RP](#prototype---axure-rp)
  - [Visual Design - Adobe XD](#visual-design---adobe-xd)

## Requirements

### Register page

- a page that allows the creation of a new account
- the page contains:
    - *Register a new account* page title
    - *Username* field
    - *Email address* field
    - *Password* field
    - *Confirm password* field  
    - *Register* button
    - *Already have an account?* link that redirects the user to the login page

### Login page

- a page that allows users to login, giving them access to the FX Trading Dashboard
- the page contains:
    - *Login to your account* page title
    - *Username* field
    - *Password* field
    - *Login* button
    - *Don’t have an account* link that redirects the user to the Register page
    - *Forgot my password* link

### FX Trading Dashboard

- this page will give the users the option to sell and buy currency (called *FX Rate View*) and also view a history of the trades (called *Blotter View*)
- the user is going to be part of a team and is able to see other team members’ activity

### FX Rate View

- *FX Rate View* gives to user the option to trade several currencies (USD, EUR, GBP, RON and CHF)
- users must use one currency to buy one of the other currencies
- users should be able to customize some aspects of the User Interface
- values needed:
    - *Currency to buy* (eg. EUR)
    - *Currency to sell* (eg. RON)
    - *Currency exchange rates* for sell/buy actions (eg. EUR/RON - buy: 4,6100 / sell: 4,7350)
    - *Notional* - amount to buy/sell (eg. 1.000.000)
    - *Tenor* - when the trade will take place (eg. Now / 1 Month / 3 Months)
    - *Buy* Button
    - *Sell* Button
- the user must be able to add more currency combinations to the dashboard (EUR/RON, EUR/USD, CHF/USD, etc.)

### Blotter View

- the *Blotter View* displays a transaction history for the user and other users in their team
- values displayed:
    - *Transaction ID*
    - *Username*
    - *CCY Pair* (eg. USD/EUR)
    - *Rate* i.e. Currency Exchange Rate
    - *Action* i.e. (Sell/Buy)
    - *Notional*
    - *Tenor*
    - *Transaction Date*
- the user should be able to apply 3 filters to the dataset described above (*CCY Pair*, *Username*, *Date*)

## Design Sketches

### Mind map - Mindmeister

![LoginPage](img/Mindmap.PNG "Mindmap")

### Wireframe - Balsamiq

![LoginPage](img/Login-W.png "Login page")

![RegisterPage](img/Register-W.png "Register Page")

![Dashboard](img/Dashboard-W.png "Dashboard")

### Prototype - Axure RP

![LoginPage](img/Login-PT.png "Login page")

![RegisterPage](img/Register-PT.png "Register Page")

![Dashboard](img/Dashboard-PT.png "Dashboard")

### Visual Design - Adobe XD

![LoginPage](img/Login-VD.png "Login page")

![RegisterPage](img/Register-VD.png "Register Page")

![Dashboard](img/Dashboard-VD.png "Dashboard")

![404Page](img/404.png "Error 404 - Page not found")

![Assets](img/Assets-VD.png "Assets")
