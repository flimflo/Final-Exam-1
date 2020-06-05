import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      bookName : "",
      title : "",
      author : "",
      thumbnail : "",
      textSnippet : ""
    }
  }

  /* 
    Your code goes here
  */
fetchBook( () => {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${this.props.bookName}`;

  settings = {
    method: "GET"
  }

  fetch(url,settings)
  .then(res =>{
    if(res.ok){
      return res.statusCode(200).json()
    }
    this.props.title = "Error";
    this.props.author = "Error";
    this.props.thumbnail = "Error";
    this.props.textSnippet = "Error";
    throw new Error("Error");
  }
  .then(responseJSON =>{

      this.props.title = responseJSON.items[0].title;
      this.props.author = responseJSON.items[0].authors[0];
      this.props.thumbnail = responseJSON.imageLinks.thumbnail;
      this.props.textSnippet = responseJSON.items[0].id;
  })
  .catch(err =>{
    console.log(err);
  })
  
  })
});

  render(){
    return(
      <div>
        {<BookForm />}
      </div>
      <div>
        <h2>
          {this.props.title}
        </h2>
        <h2>
          {this.props.author}
        </h2>
        <h2>
          {this.props.thumbnail}
        </h2>
        <h2>
          {this.props.textSnippet}
        </h2>
    </div>
    )
  }

}

export default App;
