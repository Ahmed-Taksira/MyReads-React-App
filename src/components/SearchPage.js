import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import DisplayBooks from './DisplayBooks'
import PropTypes from 'prop-types'


export default class SearchPage extends Component {
    state={
      searchedBooks:[]
    }

    searchforBook= async (query) =>{
      if(query){
        const outputBooks= await BooksAPI.search(query)
        if(!outputBooks.error){
          const filteredBooks= outputBooks.map(book => {
            if(this.props.books.filter(shelfBook => shelfBook.id===book.id).length!==0){
              book.shelf=this.props.books.filter(shelfBook => shelfBook.id===book.id)[0].shelf
            }
            else{
              book.shelf="none"
            }
            return book
          })
          this.setState({ searchedBooks: filteredBooks})
        }
        else{
          this.setState({ searchedBooks:[] })
        }
      }

      else{
        this.setState({ searchedBooks:[] })
      }
    }

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
              <Link  to= '/'
                        className='close-search'
                        >Back to Homepage</Link>
                <div className="search-books-input-wrapper">

                  <input type="text" 
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.searchforBook(event.target.value)}
                  />
  
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.searchedBooks.map(book =>
                    <DisplayBooks changeShelf={this.props.changeShelf} shelf={book.shelf} key={book.id} book={book}/>
                    )}
                </ol>
              </div>
            </div>
          )
    }
}
SearchPage.propTypes={
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}
