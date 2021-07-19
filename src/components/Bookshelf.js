import React, { Component } from 'react'
import DisplayBooks from './DisplayBooks'
import PropTypes from 'prop-types'


export default class Bookshelf extends Component {
    render() {
        let shelves={
            "currentlyReading": 'Currently Reading',
            "wantToRead": 'Want to Read',
            "read": 'Read'
        }
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelves[this.props.shelf]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map(book =>
                    <DisplayBooks changeShelf={this.props.changeShelf}shelf={this.props.shelf} key={book.id} book={book} />
                  )}

                </ol>
              </div>
            </div>
        )
    }
}
Bookshelf.propTypes={
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired
}
