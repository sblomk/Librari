import firebase from "../firebase.js"

const BookModel = function() {
  
  this.addListener = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { this.userId = user.uid; }
      else { }
    }.bind(this));
  }
  this.addListener();


  // let apiKey = 'AIzaSyCdfNCyUlSSV9AkebmZhTW_Rfw2yjzJHK4';

  let apiKey = "AIzaSyCH6Rel4hni_csxJ_S258w-yEU8Dl7Wupg"; // 'AIzaSyCdfNCyUlSSV9AkebmZhTW_Rfw2yjzJHK4';
  let shelves = [];
  let searchResults = [];
  let observers = [];
  let chosenBook = null;


  
  var shelveRef = firebase.database().ref('users/' + this.userId);
  shelveRef.on('value', function(snapshot) {
    shelves = snapshot.val();
  });

  // get all shelves
  this.getShelves = (callback, errorcallback) => { 
    this.getDatabase(callback, errorcallback);
  }  

  // update database
  this.setDatabase = () => {
    firebase.database().ref('users/' + this.userId).set(
      { allShelves: shelves }
    );
  }

  // get books from db
  this.getDatabase = () => {

  var ref = firebase.database().ref('/users/' + this.userId + '/shelves');

  ref.then(function(snapshot) {
    shelves = snapshot.val();
  }); 

  }

  // get and set searchresults
  this.setSearchResults = (results) => { searchResults = results; }
  this.getSearchResults = () => { return searchResults; }

  // get book from search results by id
  this.getBookFromSearchResults = (id) => {
    return this.getSearchResults().filter((b) => { return b.id === id; })[0];
  }

  // get and set chosen book
  this.setChosen = (book) => { chosenBook = book; }
  this.getChosen = () => { return chosenBook; }

  // get a shelf by id
  this.getShelfByID = (id) => { return shelves.filter((s) => { return s.id === id})[0]; }

  // adding the chosen book to the chosen shelf
  this.addToShelf = (shelfId, book) => {
    let exists = this.getShelfByID(shelfId).books.find((b) => { return b.id === book.id; });
    if (!exists) {
      this.getShelfByID(shelfId).books.push(book);
      this.setDatabase();
    }
  }

  // remove book from chosen shelf
  this.removeBookFromShelf = (shelfId, bookId) => {
    this.getShelfByID(shelfId).books.filter((b) => { return b.id !== bookId });
  }

  // create a new shelf
  this.createShelf = (name) => {
    shelves.push({ id: this.createShelfId(), name: name, books: [] })
  }

  // generate new id for shelf
  this.createShelfId = () => {
    let counter = 1;
    shelves.forEach((s) => { if (s.id >= counter) { counter = s.id + 1; } });
    return counter;
  }

  // create new shelf and add a book to it
  this.createNewShelfAndAddBook = (name, book) => {
    this.createShelf(name);
    this.addToShelf(this.getShelfId(name), book);
  }

  // get id of shelf
  this.getShelfId = (name) => {
    return shelves.filter((s) => { return s.name === name; })[0].id;
  }

  // API call returning a maximum of 40 books, with the filter set by the user
  this.getAllBooks = function(filter) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&maxResults=32' + '&key=' + apiKey;
    return fetch(url)
        .then(processResponse)
        .catch(handleError)
  }

  // API Helper methods
  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllBooks() API Error:', error.message || error)
      })
    } else {
      console.error('getAllBooks() API Error:', error.message || error)
    }
  }

  //this.getShelves();

};

export const modelInstance = new BookModel();
