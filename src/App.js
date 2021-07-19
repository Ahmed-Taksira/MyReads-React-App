import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    shelvesBooks: [],
  }

   componentDidMount() {
    BooksAPI.getAll().then((shelvesBooks) => { this.setState(() => ({ shelvesBooks })) }
    )
  }

  changeShelf= async (book, shelf) => {
    await BooksAPI.update(book, shelf)
      if(this.state.shelvesBooks.filter(shelfBook => shelfBook.id===book.id).length!==0){
        this.setState({ shelvesBooks: this.state.shelvesBooks.map( b=> {
          if(b.id===book.id){
            b.shelf=shelf
          }
          return b
        })})
      }

      else{
        book.shelf=shelf
        this.setState({ shelvesBooks: [...this.state.shelvesBooks, book] })
      }
  }

  render() {
    console.log(this.state.shelvesBooks)
    return (
      <div>
        <Route exact path='/' render={({ history }) => (
          <HomePage
            books={this.state.shelvesBooks}
            changeShelf={this.changeShelf}
          />
        )}
        />
        
        <Route exact path='/search' render={({ history }) => (
          <SearchPage
            books={this.state.shelvesBooks}
            changeShelf={this.changeShelf}
            />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
