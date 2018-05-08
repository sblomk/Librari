import firebase from "../firebase.js"

const BookModel = function() {

	let userId = null;

  // en observer för som hämtar inloggningsuppgifter om någon är inne
  // sätter userId till den inloggades id
  this.addListener = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.userId = user.uid;
        /*
        var mail = user.email;
        var displayName = user.displayName;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        */
      }
      else {
        // User is signed out.
      }
    }.bind(this));
  }
  this.addListener();

  let apiKey = 'AIzaSyCdfNCyUlSSV9AkebmZhTW_Rfw2yjzJHK4';
  let observers = [];

  // saves the chosen book in local storage
  let book = JSON.parse(localStorage.getItem('chosen'));

  // Saving initial values for filter and shelves in local storage

  if (localStorage.getItem('filter') === null){
    localStorage.setItem('filter', 'Tolkien');
  }
  if (localStorage.getItem('shelves') === null){
    let initialshelves = [{id:1, name: 'Shelf 1', books: []}, {id:2, name: 'Shelf 2', books: []}];
    localStorage.setItem('shelves', JSON.stringify(initialshelves));
    //let shelves = JSON.parse(localStorage.getItem('shelves'));
  }
  //let shelves = JSON.parse(localStorage.getItem('shelves'));

  // saves the initial search result in local storage
  let search = JSON.parse(localStorage.getItem('search'));
  if (search === null) {
    search = []
  };

  this.getSearchResults = function() {
    console.log(JSON.parse(localStorage.getItem('search')));
    return JSON.parse(localStorage.getItem('search'));
  }


  this.setFilter = function(q) {
    // the API does not allow empty queries
    // so if the search bar is emptied, we will hold on to the latest non-empty search value
    if (!(Object.is(q, ''))){
      //filter = q;
      localStorage.setItem('filter', q);
      notifyObservers();
    }
  }

  // saves the search result in local storage
  this.setSearch = function(results){
    search = results;
    localStorage.setItem('search', JSON.stringify(search));
  }

  // getSearch is called with the id of the book that has been clicked
  // it returns the corresponding book object
  this.getSearch = function(id){

    for (var i = 0; i < search.length; i++){
      if (search[i].id === id){
        this.setChosen(search[i]);
        return search[i];
      }
    }
    // if there is no matching id, return the first object
    return search[0];
  }

  // saving the chosen book object to local storage
  this.setChosen = function(b){
    book = b;
    localStorage.setItem('chosen', JSON.stringify(book));
  }
  this.getChosen = function(){
    return book;
  }

  // API call returning a maximum of 40 books, with the filter set by the user
  this.getAllBooks = function() {
    let filter = localStorage.getItem('filter');
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&maxResults=32' + '&key=' + apiKey;
    return fetch(url)
        .then(processResponse)
        .catch(handleError)
  }

  this.getShelfByID = function(id) {
    var shelves = JSON.parse(localStorage.getItem('shelves'));
    for (var i = 0; i < shelves.length; i++) {
      if (shelves[i].id === id) {
        return shelves[i];
      }
    }
  }

  // adding the chosen book to the chosen shelf
  this.addToShelf = function(shelfId, bookId) {
    var shelves = JSON.parse(localStorage.getItem('shelves'));
    for (var i = 0; i < shelves.length; i++) {
      if (shelves[i].id === shelfId) {
        for(var j = 0; j < shelves[i].books.length; j++){
          // if the chosen book is already in the chosen shelf, return
          if(shelves[i].books[j].id === bookId){
            return
          }
        }
        // if not, add the book to the shelf
        shelves[i].books.push(this.getSearch(bookId));

        // pushar till databasen
        firebase.database().ref('users/' + this.userId).set({
          shelves: shelves
        });
        localStorage.setItem('shelves', JSON.stringify(shelves));
      }
    }
  }


  this.removeBookFromShelf = function(shelfId, bookId) {
    //console.log('shelf ' + shelfId);
    //console.log('book ' + bookId);
    var shelves = JSON.parse(localStorage.getItem('shelves'));
    for (var i = 0; i < shelves.length; i++) {
      if (shelves[i].id === shelfId) {
        for(var j = 0; j < shelves[i].books.length; j++){
          if(shelves[i].books[j].id === bookId){
            console.log("tar bort " + shelves[i].books[j].id)
            shelves[i].books.splice(j,1);
            localStorage.setItem('shelves', JSON.stringify(shelves));
            notifyObservers();
          }
        }
      }
    }
  }

  // checks the number of shelves and assigns the next unused integer as the id to the new shelf
  this.createShelfId = function() {
    var shelves = JSON.parse(localStorage.getItem('shelves'));
    let counter = 1
    for(var i = 0; i < shelves.length; i++) {
      if(shelves[i].id === counter){
        counter += 1;
      } else {
        return counter
      }
    }
    return counter
  }

  this.createShelf = function(id, name){
    var shelves = JSON.parse(localStorage.getItem('shelves'));
    let shelf = {
      id: id,
      name: name,
      books: []
    }
    shelves.push(shelf)
    localStorage.setItem('shelves',JSON.stringify(shelves));
    console.log("i createShelf" + shelves);
    notifyObservers();
  }

  this.getShelves = function() {
    console.log("i getShelf" + JSON.parse(localStorage.getItem('shelves')));
    return JSON.parse(localStorage.getItem('shelves'));
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

  this.addObserver = function (observer) {
      observers.push(observer);
    };

  this.removeObserver = function (observer) {
      observers = observers.filter(o => o !== observer);
    };

  const notifyObservers = function () {
      observers.forEach(o => o.update());
    };

};

export const modelInstance = new BookModel();
