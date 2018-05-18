import firebase from "../firebase.js"

const BookModel = function() {

  // Add this as a listener to the Firebase API.
  // Listens if/which user is signed in to the Firebase Auth.
  // This model uses the user ID in order to save/get the users data.
  this.addListener = function() {
    firebase.auth().onAuthStateChanged(function(user){
      if (user) { 
        this.userId = user.uid;
        localStorage.setItem("userId",this.userId);
      }
      else { }
    }.bind(this));
  }
  this.addListener();

  // apiKey for Google Books API.
  let apiKey = "AIzaSyCH6Rel4hni_csxJ_S258w-yEU8Dl7Wupg";

  // Observers to this model.
  let observers = [];

  // Set initial user status.
  let userStatus = "LoggedOut"

  this.setUserStatus = function (status){
    userStatus = status
    if (status === "LoggedOut") { 
      localStorage.setItem("userId", ""); 
      localStorage.setItem("query", ""); 
    }
    notifyObservers('user')
  }

  this.getUserStatus = function(){ 
    return userStatus;
  }

  // Get all shelves from db. Used from components.
  this.getShelves = (callback) => { 
    this.getDatabase(callback);
  }  

  // Update db.
  this.setDatabase = (shelves) => {
    firebase.database().ref('users/' + this.userId).set(
      { allShelves: shelves }
    );
  }

  // Get books from db. Takes a callback which handles request results.
  this.getDatabase = (callback) => {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        var ref = firebase.database().ref('users/' + localStorage.getItem("userId") + "/allShelves");
        ref.once('value', function(snapshot) {
          if (Array.isArray(snapshot.val())) {
            callback(snapshot.val());
          } else if (!(snapshot.val())) {
            callback(snapshot.val());
          } else {
            callback([snapshot.val()])
          }
        });
      }
      else {
        callback('error');
      }
    });
  }

  // Get and set the search results.
  this.setSearchResults = (results) => {localStorage.setItem('search', JSON.stringify(results))}
  this.getSearchResults = () => {return localStorage.getItem('search');}

  // Get book from the search results by id.
  this.getBookFromSearchResults = (id) => {
    var search = JSON.parse(localStorage.getItem('search'))
    for (var i=0; i < search.length; i++){
      if (search[i].id === id){
        return search[i];
      }
    }
  }

  // Get and set the query for searching books.
  this.setQuery = (query) => {localStorage.setItem('query', query)}
  this.getQuery = () => {
    var query = localStorage.getItem('query')
    if (!query){
      query = 'Tove Jansson'
    }
    return query;
  }

  // Get a shelf by id
  this.getShelfByID = (manyShelves, id) => {
    if (manyShelves){
      return manyShelves.filter((s) => { 
        return s.id === id})[0]; 
    }
  }

  // Add a book to a chosen shelf. Takes a callback in case a book already exists.
  this.addToShelf = (shelfId, book, callback) => {
    this.getDatabase((shelves) => {
      if (shelves){
        for ( var i=0; i < shelves.length; i++){
          if(shelves[i].id === shelfId){
            if (shelves[i].books === undefined){
              shelves[i].books = [];
              break;
            }
          }
        }
        if (shelfId) {
          let exists = this.getShelfByID(shelves, shelfId).books.find((b) => { return b.id === book.id; });

          if (!exists) {
            this.getShelfByID(shelves, shelfId).books.push(book);
            this.setDatabase(shelves);
          }
          else{
            callback()
          }
        }
      }
    })
  }

  // Remove a book from a chosen shelf.
  this.removeBookFromShelf = (shelfId, bookId) => {
    this.getDatabase((shelves) => {
        var updatedBooks = this.getShelfByID(shelves, shelfId).books.filter((b) => { return b.id !== bookId; });
        this.getShelfByID(shelves, shelfId).books = updatedBooks;
        this.setDatabase(shelves);
        notifyObservers(); 
      })
  }

  this.changeShelfName = (shelfId, newName) => {
    this.getDatabase((shelves) => {
      if (shelves){
        var updatedShelves = shelves.filter((s) => { 
          if (parseInt(s.id, 10) === parseInt(shelfId, 10)){
            if(newName){
              s.name = newName
            }
          }
          return s
        });      
        this.setDatabase(updatedShelves);
        notifyObservers();
      }
    })
  }

  this.removeShelf = (shelfId) => {
    this.getDatabase((shelves) => {
      var updatedShelves = shelves.filter((s) => { return s.id !== shelfId; });
      this.setDatabase(updatedShelves);
      notifyObservers();
    })
  }

  this.createNewShelfAndAddBook = (name, book) => {
    this.getDatabase((shelves) => {
      let counter = 1;
      if (shelves !== null){
        shelves.forEach((s) => { if (s.id >= counter) { counter = s.id + 1; } });
      }
      let emptyShelf = { id: counter, name: name, books: [] }
      emptyShelf.books.push(book);
      if ( shelves === null){
        shelves = [];
      }
      shelves.push(emptyShelf)
      this.setDatabase(shelves);
    })
  }

  // API call returning a maximum of 40 books, with the filter set by the user.
  this.getAllBooks = function(filter) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&maxResults=40&key=' + apiKey;
    return fetch(url)
        .then(processResponse)
        .catch(handleError)
  }

  // API Helper methods.
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

  // Handle observers.
  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function (details) {
    observers.forEach(o => o.update(details));
  };

};

export const modelInstance = new BookModel();
