import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

export default class HomePage extends Component {

  render() {
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf changeShelf={this.props.changeShelf} shelf="currentlyReading" books={this.props.books.filter(book => book.shelf === 'currentlyReading')}/>
            <Bookshelf changeShelf={this.props.changeShelf} shelf="wantToRead" books={this.props.books.filter(book => book.shelf === 'wantToRead')}/>
            <Bookshelf changeShelf={this.props.changeShelf} shelf="read" books={this.props.books.filter(book => book.shelf === 'read')}/>
          </div>
        </div>
        <div>
          <Link className='open-search'
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
  
}
HomePage.propTypes={
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}