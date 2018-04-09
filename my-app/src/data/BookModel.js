const BookModel = function(){
    let apiKey = 'AIzaSyBnc2ubpX3pUGpAfNpxFsjO3RfWK-r1nzg';
    let filter = 'Tolkien';
    let observers = [];
    let book;

    this.setFilter = function(q) {
      if (!(Object.is(q, ''))){
        filter = q;
        notifyObservers();
      }
    }
    
    this.setChosen = function(b){
      console.log("i modellen, vald bok är " + b);
      book = b;
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