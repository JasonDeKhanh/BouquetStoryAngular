# BouquetStory

BouquetStory invites you to show your own creativity by creating your own bouquets to give to your loved ones! Where most flower shops only allow you to choose from pre-made bouquets, BouquetStory lets you choose from a wide variety of fresh flowers, containers, and decorations to create your very own custom flower bundles. The unparalleled flexibility and convenience makes it possible for you to find the ideal gift for any occasion!

[Project Showcase](https://uvents.nus.edu.sg/event/20th-steps/module/IS3106/project/18)

[Project Demo - Admin Portal and Customer Portal Walkthrough](https://studio.youtube.com/video/EJkYN0Hd5ZQ/edit)

## Description

Bouquet Story is a multi-tier enterprise system that consists of an admin management functionalities as well as a customer e-commerce website for a flower shop.

## Tech Stack

The system comprises of 2 frontend applications and 1 common backend:

### Frontend

BouquetStory Customer E-Commerce website: Web application developed using Angular 13 and PrimeNG. [[Link]](https://github.com/JasonDeKhanh/BouquetStoryAngular)

BouquetStory Admin Management Portal: Web application developed using JavaServer Faces and PrimeFaces. Reports are generated using JasperReport.
[[Link]](https://github.com/JasonDeKhanh/BouquetStorySystem)

### Backend

BouquetStory Backend: Common backend developed using Java Enterprise Edition 8, JPQL and MySQL database. [[Link]](https://github.com/JasonDeKhanh/BouquetStorySystem/tree/main/BouquetStorySystem-ejb)

The common backend has a component-based architecture and a service-oriented architecture. Data storage utilises JPQL that is used in conjuction with MySQL for object relational mapping to store and read data from the database. RESTful Web Services are implemented to allow the angular app to call the backend.

The common backend incorporates both a component-based architecture and a service-oriented architecture. For data storage, MySQL is used and JPQL is the main query language used to insert and retrieve data from the database. To facilitate communication between the Angular application and the backend, RESTful Web Services have been implemented.

## Screenshots

 <img src="https://i.imgur.com/ae6Gkks.png" width="800" height="400" alt="E-commerce website home page"/>
 
 <img src="https://i.imgur.com/ZCcreS1.png" width="800" height="400" alt="E-commerce website shopping cart"/>
  
 <img src="https://i.imgur.com/9r09tOM.png" width="800" height="450" alt="Admin Home Page"/>
  
 <img src="https://i.imgur.com/7vxUlBx.png" width="250" height="400" alt="Poster"/>

# BouquetStoryAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
