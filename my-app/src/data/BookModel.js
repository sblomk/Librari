import firebase from "../firebase.js"

const BookModel = function() {

  
  this.addListener = function() {
    firebase.auth().onAuthStateChanged(function(user){
      if (user) { 
        this.userId = user.uid;
        localStorage.setItem("userId",this.userId);
        console.log('user id '+this.userId);
      }
      else { }
    }.bind(this));
  }
  this.addListener();


  // let apiKey = 'AIzaSyCdfNCyUlSSV9AkebmZhTW_Rfw2yjzJHK4';

  let apiKey = "AIzaSyCH6Rel4hni_csxJ_S258w-yEU8Dl7Wupg"; // 'AIzaSyCdfNCyUlSSV9AkebmZhTW_Rfw2yjzJHK4';
  let shelves = [];
  let observers = [];
  let chosenBook = null;
  let userStatus = "LoggedOut"

  this.setUserStatus = function (status){
    userStatus = status
    console.log("Ny status i BookModel: " + userStatus)
    notifyObservers('user')
  }

  this.getUserStatus= function(){ 
    return userStatus
  }

  // get all shelves
  this.getShelves = (callback, errorcallback) => { 
    this.getDatabase(callback, errorcallback);
  }  

  // update database
  this.setDatabase = (shelves) => {
    firebase.database().ref('users/' + this.userId).set(
      { allShelves: shelves }
    );
  }

  // get books from db
  this.getDatabase = (callback, errorcallback) => {
    var ref = firebase.database().ref('users/' + localStorage.getItem("userId") + "/allShelves");
    ref.once('value', function(snapshot) {

      console.log(snapshot.val() + " bra object från funktionen this.getDatabase");
      //console.log(snapshot.val());
      //console.log("user id " + this.userId)

      if (Array.isArray(snapshot.val())) {
        callback(snapshot.val());
      } else if (!(snapshot.val())) {
        callback(snapshot.val());
      } else {
        callback([snapshot.val()])
      }
    }.bind(this));

  }

  // get and set searchresults
  this.setSearchResults = (results) => {localStorage.setItem('search', JSON.stringify(results))}
  this.getSearchResults = () => {return localStorage.getItem('search');}

  // get book from search results by id
  this.getBookFromSearchResults = (id) => {
    var search = JSON.parse(localStorage.getItem('search'))
    for (var i=0; i < search.length; i++){
      if (search[i].id === id){
        return search[i];
      }
    }
    //return this.getSearchResults().filter((b) => { console.log(b.id); return b.id === id; })[0];
  }

  this.setQuery = (query) => {localStorage.setItem('query', query)}
  this.getQuery = () => {
    var query = localStorage.getItem('query')
    if (!query){
      query = 'Tolkien'
    }
    return query;
  }

  // get and set chosen book
  this.setChosen = (book) => { chosenBook = book; }
  this.getChosen = () => { return chosenBook; }

  // get a shelf by id
  this.getShelfByID = (manyShelves, id) => {

    return manyShelves.filter((s) => { 

      //console.log(s.id);
      return s.id === id})[0]; 

  }

  // adding the chosen book to the chosen shelf
  this.addToShelf = (shelfId, book) => {

    this.getDatabase((shelves) => {

      //console.log(shelves)
      for ( var i=0; i < shelves.length; i++){
        if(shelves[i].id === shelfId){
          if (shelves[i].books === undefined){
            shelves[i].books = [];
            break;
          }
        }
      }

      let exists = this.getShelfByID(shelves, shelfId).books.find((b) => { return b.id === book.id; });

      if (!exists) {
        this.getShelfByID(shelves, shelfId).books.push(book);
        this.setDatabase(shelves);
      }
    })
  }



  // remove book from chosen shelf
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
      var updatedShelves = shelves.filter((s) => { 
        if (s.id === shelfId){
          if(newName){
            s.name = newName
          }
        }
        return s
      });      
      
      this.setDatabase(updatedShelves);
      notifyObservers();
    })
  }

  this.removeShelf = (shelfId) => {
    console.log('tar bort hylla med id: ' + shelfId)
    this.getDatabase((shelves) => {
      var updatedShelves = shelves.filter((s) => { return s.id !== shelfId; });
      this.setDatabase(updatedShelves);
      notifyObservers();
    })
  }

  // create a new shelf
  this.createNewShelfAndAddBook = (name, book) => {

    this.getDatabase((shelves) => {
      
      let counter = 1;

      if (shelves !== null){
        shelves.forEach((s) => { if (s.id >= counter) { counter = s.id + 1; } });
      }
      
      let emptyShelf = { id: counter, name: name, books: [] }

      emptyShelf.books.push(book);
      if ( shelves === null){
        var shelves = [];
      }
      shelves.push(emptyShelf)

      this.setDatabase(shelves);

    })

  }


  // get id of shelf
  this.getShelfId = (name) => {
    return shelves.filter((s) => { return s.name === name; })[0].id;
  }

  // API call returning a maximum of 40 books, with the filter set by the user
  this.getAllBooks = function(filter) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&maxResults=40' + '&key=' + apiKey;
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
