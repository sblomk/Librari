const BookModel = function(){
    let apiKey = 'AIzaSyBnc2ubpX3pUGpAfNpxFsjO3RfWK-r1nzg';
    let filter = 'Tolkien';
    let observers = [];

    // Sparar vald bok i cookies så en kan refrescha utan kaos
    let book = JSON.parse(localStorage.getItem('chosen'));
    if (book == null){
      book = {id: 'hej'};
    }
    let shelves = [{id:1, name: 'Shelf 1', books: []}, {id:2, name: 'Shelf 2', books: []}];

    // Sparar sökresultatet i cookies så en kan refrescha utan kaos
    let search = JSON.parse(localStorage.getItem('search'));
    if (search == null) {
      search = []
    };

    this.setFilter = function(q) {
      if (!(Object.is(q, ''))){
        filter = q;
        notifyObservers();
      }
    }

    this.setSearch = function(results){
      search = results;
      localStorage.setItem('search', JSON.stringify(search));
    }

    this.getSearch = function(id){
      for (var i = 0; i < search.length; i++){
        if (search[i].id === id){
          this.setChosen(search[i]);
          return search[i];
        }
      }
      return search[0];
    }
    
    this.setChosen = function(b){
      book = b;
      localStorage.setItem('chosen', JSON.stringify(book));
    }
    this.getChosen = function(){
      return book;
    }

    this.getAllBooks = function() {
        const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&key=' + apiKey;
        return fetch(url)
            .then(processResponse)
            .catch(handleError)
    }

    //Lägger till aktiv bok till shelf med id som skickas in. Just nu skickas alla böcker in i id=1.
    this.addToShelf = function(shelfId, bookId) {
      for (var i = 0; i < shelves.length; i++) {
        if (shelves[i].id === shelfId) {
          for(var j = 0; j < shelves[i].books.length; j++){
            if(shelves[i].books[j].id == bookId){
              return
            } 
          }
          shelves[i].books.push(this.getSearch(bookId));
        }
      }
    }

    this.createShelfId = function() {
      let counter = 1
      for(var i = 0; i < shelves.length; i++) {
        if(shelves[i].id == counter){
          counter += 1;
        } else {
          return counter
        }
      }
      return counter
    }

    this.createShelf = function(id, name){
      let shelf = {
        id: id,
        name: name,
        books: []
      }
      shelves.push(shelf)
    }

    this.getShelves = function() {
      return shelves;
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