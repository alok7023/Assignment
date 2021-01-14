# Library Management Assignment 



-   This repo has backend api architectre with implementation for following scenarios
    -   As a user, I want to see the books present in the library so that I can chose which book to borrow.
        -   Given, there are no books in the library .When, I view the books in the library Then, I see an empty library
        -   Given, there are books in the library. When, I view the books in the library Then, I see the list of books in the library 

    -   User can borrow a book from the library
        -   Given, there are books in the library. When, I choose a book to add to my borrowed list Then, the book is added to my borrowed list And, the book is removed from the library
        
-   Note - Each User has a borrowing limit of 2 books at any point of time 



## Development Tech used Nodejs, Express Js and MongoDB as database
Follow these steps to get the server up and running :
1. set up db config
2. `npm install` - to install server dependencies
3. `npm start` - to get the server running
4. Used Postman for making request to the server
