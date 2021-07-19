import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class DisplayBooks extends Component {

    render() {
        let imageLink = ""
        try{
        if(this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail){
            imageLink=this.props.book.imageLinks.smallThumbnail
        }
        else if(this.props.book.imageLinks && this.props.book.imageLinks.thumbnail){
            imageLink=this.props.book.imageLinks.thumbnail
        }
    }
    catch(error){}

        let authors=""
        try{
        if(this.props.book.authors){
            authors=this.props.book.authors.reduce((acc,author) => {acc+=author+',' 
        return acc}, "")
        }
    }
    catch(error){}

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLink})` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.props.book.shelf? this.props.book.shelf : "none"} onChange={(e) => this.props.changeShelf(this.props.book, e.target.value )}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        )
    }
}
DisplayBooks.propTypes={
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }
  