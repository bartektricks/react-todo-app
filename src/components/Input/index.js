import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Input extends Component {

  handleFocus = (e) => {
    e.target.select();
  }

  render() {
    return (
      <div className='form-container'>
        <form className='input-wrapper'>
          <input
            onChange={this.props.handleChange} 
            className='task-input' 
            type='text' 
            placeholder='Your daily task'
            value={this.props.text} 
          />
          <input 
            onClick={this.props.handleAdd}
            className='add-task' 
            type='submit' 
            value='+' 
          />
        </form>
      </div>
    )
  }
}

Input.PropTypes = {
  handleChange: PropTypes.func,
  handleAdd: PropTypes.func,
  text: PropTypes.string,
}
