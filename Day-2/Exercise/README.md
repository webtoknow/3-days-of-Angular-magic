# Day 2 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Install and use JSON Server](#install-and-use-json-server)
- [Exercise 1 - Create blotter-view, fx-rates-view and widget components](#exercise-1---create-blotter-view-fx-rates-view-and-widget-components)

- [Exercise 2 - Blotter View page](#exercise-2---blotter-view-page)
  - [Transaction model](#transaction-model)
  - [Constants file](#constants-file)
  - [Trade service](#trade-service)
  - [Update Application Module](#update-application-module)
  - [Implement polling mechanism](#implement-polling-mechanism)
  - [Blotter View component](#blotter-view-component)
- [Exercise 3 - FX Rates View page](#exercise-3---fx-rates-view-page)
  - [Rate model](#rate-model)
  - [Widget model](#widget-model)
  - [Update Trade service](#update-trade-service)
  - [Widget component](#widget-component)
  - [FX Rates View component](#fx-rates-view-component)

## General indications

🔥 The working folder for this day will be _Day-2\Exercise\Code_. The code from previous day is already here.

🔥 You can find the exercises solutions for this day at _Day-2\Exercise\Solution_.

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

## Exercise 0 - Configuration

### Download all npm dependencies

🚀 You already have all the names and versions of dependencies in *package.json*. To complete this exercise, you only need to download them.

  🎁 Use *npm* to download all dependencies.

  🎁 Take care from where you run the command. The folder should contain *package.json*.

### Install and use JSON Server

🚀 As you do not have a Back-end server, JSON Server will behave like one. Let's install it! Your database consists of 2 JSON files, so you should make JSON Server read from both of them.

  🎁 To avoid installing JSON Server for each place you will use it, install it globally via *npm*.

  🎁 Open one different terminal window for each database file and run JSON Server there on a different port.

## Exercise 1 - Create blotter-view, fx-rates-view and widget components

🚀 When you have to build one big page, an important step is to divide it into many sections and make a component for each one, then put them together. Can you identify ours from *Dashboard* page? Let's create the components for each section and put them into the *Dashboard* one! Also, the navbar should be put there!

  🎁 Because all the new components you will create are children of *Dashboard* page, let's generate these using *Angular CLI* into *dashboard-page* folder.

  🎁 Using CLI has a great advantage over manually creation: *app.module.ts* is automatically updated with the new components.

  🎁 The navbar should be placed in the *header* section and will contain the logo (already present in *src/assets/img* folder) and the *Log out* button (with no functionality at this moment).

  🎁 Do not forget also to fill in *dashboard-page.css* with the appropriate styles.

## Exercise 2 - Blotter View page

### Transaction model

🚀 Typescript helps you to not make mistakes regarding the types of the objects sent and received from the server. Build a *Transaction* interface containing all properties defining a transaction and their types. The design mockups should help finding them.

  🎁 You should be organized again and make a new folder called *models* into _src/app_. This folder will contain all models from our app.

  🎁 Create your *Transaction* model in this newly-created folder.

### Constants file

🚀 You will need to make Back-end calls to some URLs. Put all of them into a *constants* file.

  🎁 Create *constants.ts* file into _src/app_ folder.

  🎁 You have to use different ports depending on which microservice you call. We propose 8200 for *Auth*, 8210 for *Trade* and 8220 for *Quote* services.

### Trade service

🚀 The services make the link between your Front-end actions and Back-end calls. Let's create our first service, the trade one, which will get all the transactions to be displayed in the table from the right side of the page.

  🎁 Stay organized and make a new folder named *services* into _src/app_. This folder will contain all services needed in our app.

  🎁 *trade.service.ts* will use *HttpClient* service to do the calls to the server in order to get all the transactions.

### Update Application Module

🚀 *Application Module* gets updated only if you are using CLI to generate things. You created *Trade service* manually, so you need to update *app.module.ts*.

  🎁 Besides *Trade Service*, you also used *HttpClientModule*. Don't forget to import it!

  🎁 Forms will be also useful. Add *FormsModule* and *ReactiveFormsModule* into *app.module.ts*.

### Implement polling mechanism

🚀 Transactions should be as accurate as possible, so you should simulate a real-time behavior. This can be done by implementing polling mechanism into *Trade Service*.

  🎁 A new method will be implemented into *trade.service.ts*: *getTransactionsPolling*. It will be called at every 2s.

### Blotter View component

🚀 As now you already have the transactions loaded from the server, you can start displaying them. Put there the table as in the design mockups.

  🎁 You should update the *blotter-view.component.html* file and put there what you want to be displayed.

  🎁 In order to format the displayed date, use *date* filter.

  🎁 Put the CSS for this component into *botter-view.component.css*.

  🎁 *blotter-view.component.ts* will contain the logic. When we initiate this component, we should call *startPolling* method, which calls *tradeService.getTransactionsPolling()*. After that, the method should build *ccyPair* from *primaryCCY* and *secondaryCCY*.

  🎁 As we can see in the design, there is also the possibility to sort and order by the records. Do not forget to implement this behavior!

  🎁 It is very important from performance perspective to stop getting transactions when the component is destroyed.

## Exercise 3 - FX Rates View page

### Rate model

🚀 Rate is another model we should create. Let's do it!

  🎁 The new file will be created into *models* folder.

### Widget model

🚀 Create also the *Widget* model.

  🎁 The new file will be created into *models* folder.

  🎁 Until now we just created interfaces. These can also be classes and the fields can be declared into the constructor.

### Update Trade service

🚀 More functionalities are needed on trades. Can you identify them? Let's update *trade.service.ts* with these 4 new methods!

  🎁 *saveTransaction* will save the transaction (if the user presses *Sell* or *Buy* buttons).

  🎁 *getCurrencies* will get from the server all available currencies to fill in the two dropdowns from *Widget*: *Primary* and *Secondary*.

  🎁 *getFxRate* will get the rate corresponding with the 2 selected currencies.

  🎁 *getFxRatePolling* is needed because the rates values should also be real-time, like transactions.

### Widget component

🚀 Let's now implement the *Widget* component. The same one will be used for both states:

  - one state which allows adding a new currency pair to let the user follow SELL and BUY rates
  - the other which allows saving a transaction.

  🎁 The first state of the component contains 2 dropdowns where Primary and Secondary currencies can be selected from the ones obtained by calling the backend through *startPolling()* method.

  🎁 *startPolling()* continuously calls the method which get the FX Rates.

  🎁 The second one allows saving a transaction. For this, the user have to enter the amount he wants to trade, the tenor (SP - now, 1M - in a month or 3M - in three months) and then press on the button which describes the action he want to do: Sell or Buy.

  🎁 Saving a transaction on sell or buy actions can be also possible via a service method.

  🎁 The user should be also able to remove a widget.

  🎁 Fill in file named *widget.component.css* with the appropriate styles.

### FX Rates View component

🚀 It's time to take care of the left-side part of the screen. We will need to get the currencies pairs and display all widgets.

  🎁 Currencies pairs will be loaded from *getCurrencies* method from *Trade Service* via *HttpClient* when the component is initialized.

  🎁 We will need to implement a function which add a new widget when clicking on "+". This new one will have all fields empty.

  🎁 The widgets can also be removed - JavaScript *splice* method can help here.

  🎁 Style your component using *fx-rates-view.component.css* file.
