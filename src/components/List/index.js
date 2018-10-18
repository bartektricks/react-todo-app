import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ContentEditable from "react-contenteditable";

import CloseIcon from '../../assets/CloseIcon';

export default class List extends Component {
  deleteItem = (e, key) => {
    e.preventDefault();
    this.props.handleDelete(key)
  }

  render() {
    return (
      <ul className='list-wrapper'>
        {
          this.props.list.map( (listElement) => 
            <li key={listElement.key} className='list-element'>
              <ContentEditable 
                id={listElement.key}
                onChange={(e) => this.props.handleUpdate(e, listElement.key)}
                className='list-item'
                tagName='p'
                html={listElement.text}
              />
              <a href='/' className='remove-item' onClick={(e) => this.deleteItem(e, listElement.key)}>
                <CloseIcon className='remove-item-icon' />
              </a>
            </li>
          )
        }
      </ul>
    )
  }
}

List.PropTypes = {
  list: PropTypes.shape({
    key: PropTypes.number,
    text: PropTypes.string,
  }),
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
}
