# Movies-App
## Overview
This repository demonstrates a basic __web application using ASP.NET Core Web API and React__  using __Vite__. It serves as an example of application will manage a list of favorite movies.

## Features
- **Display a List of Favorite Movies by Rating Sorted:** Show a list of favorite movies on the homepage, sorted in descending order by rating.
- **Add a New Movie:** Provide a form to add a new movie.
- **Edit or Delete an Existing Movie:** Allow editing or deleting an existing movie.
- **Unique Movie Titles:** Prevent adding a movie that already exists - show an appropriate error message if a duplicate title is entered.

## Getting Started
### Prerequisites
- _.NET Core SDK_
- _Node.js and npm for React Vite_
-_Visual Studio Code or any other platform_

### Installation
* [x] Clone the repository:<br>
git clone https://github.com/oryaaharoni/movies-app.git .<br>
cd movies-app

* [x] Backend Setup (ASP.NET Core):<br>
Open the backend project folder.
dotnet restore
dotnet run

* [x] Frontend Setup:<br>
Open the frontend project folder.
npm install
npm start

### Data Storage
Movie data should be stored in either a simple JSON file.

### Design
Use basic CSS styling to make the application look clean and organized. Use styled component.

### API Endpoints
Movies API
- **GET** /api/movies: Retrieve the list of movies.
- **POST** /api/movies: Add a new movie.
- **PUT** /api/movies/{id}: Update an existing movie.
- **DELETE** /api/movies/{id}: Delete a movie.


### Open Source
- https://medium.com/@serhiikokhan/mastering-the-use-of-system-text-json-e4d37564ab44
- https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-8.0
- https://www.c-sharpcorner.com/article/convert-an-enum-to-a-string/
- https://elementor.com/blog/how-to-underline-text-in-css/?utm_source=google&utm_medium=cpc&utm_campaign=13060922353&utm_term=&gad_source=1&gclid=CjwKCAjwvvmzBhA2EiwAtHVrb5powCXG22HzlEnOnhFMishiQwm2F_gcsS4HduIrpG7hzUhvABG57hoCDB0QAvD_BwE
- https://styled-components.com/docs
