## How to use
1. Clone this repository
2. Run `npm install` inside of my-app
3. Run `npm start`

## Librari 

Librari is your personal library, where you are able to search for books and save them to your personalized bookshelves. The app could be of use when trying to keep track of the books that you have read, the books that you want to read, your all time favorites books, etc. 

We are using the Google Books API in order to retrieve information about books, and collect some of the books' metadata for the functionalities of this app.  

------------------------

## File structure and the thought of each component.
- About: In this component you can read about Librari and also about its' creators.

- AddBook: In this component the user can choose to add a selected book to an existing shelf or create a new shelf for the user to put books into.

  /- CreateShelf: In this component the user specifies the name of the new shelf that a book is going to be put into.
  /- ChooseShelf: In this component the user selects the shelf, amongst previously saved shelves, that a book is going to be put into.
  
- Book: This is the view you get to after clicking a book thumbnail after a search has been made. Here you can review information about a book and decide whether you want to add it to a shelf. 

- Header: Our header.

- Login: This is the component in which the user can log in to his/hers existing account or sign up a new account.

- MyLibrari: In this component the user should be able to overview his/hers different shelves and the books inside each shelf. Within this view you are also able to delete books within shelves. There is also a button for each shelf which redirects you to the component EditShelf.
   /- EditShelf: In this component the user can change the name of the selected shelf, delete shelves and also delete separate books within the selected shelves.

- Navbar: In this component the user can navigate within the app.

- Search: This is a component for the search bar. 

- SearchResults: In this component the results of a search is displayed.

- SearchView: In this component Search.js and SearchResults.js is displayed.

- SignIn: In this component the user can sign in to his/hers existing account.

- SignOut: In this component the user can sign out of his/hers existing account.

- data: Here is our model.

------------------------
