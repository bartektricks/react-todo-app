import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';

import Title from '../Title';
import List from '../List';
import Input from '../Input';

class App extends Component {
  
  state = {
    listElements: [],
    currentItem: { key: '', text: '' },
  }

  /* Config for sanitizeHtml */
  sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong"],
  };

  componentDidMount() {
    const localStorageElements = JSON.parse(localStorage.getItem('listElements'));
    const welcomeTask = [{key: 0, text: 'Add a new task or click to edit this one :)'}];

    if(localStorageElements !== null) {
      this.setState({
        listElements: [ ...localStorageElements, ...this.state.listElements ],
      });
    } else {
      this.setState({
        listElements: welcomeTask,
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      currentItem: { key: Date.now(), text: e.target.value }
    })
  }

  handleAdd = (e) => {
    const { listElements, currentItem } = this.state;  
    e.preventDefault();
    currentItem.text = sanitizeHtml(currentItem.text, this.sanitizeConf);

    console.log(currentItem);

    if(currentItem.text.length > 0) {
      this.setState({
        listElements: [ currentItem, ...listElements ],
        currentItem: { key: '', text: '' },
      });

      localStorage.setItem('listElements', JSON.stringify([ currentItem, ...listElements ]));
    }
  }

  handleDelete = (id) => {

    const filteredItems = this.state.listElements.filter( (element) => {
      return element.key !== id;
    });

    this.setState({
      listElements: filteredItems,
    });

    /* Local Storage */
    (filteredItems.length === 0) ? localStorage.removeItem('listElements') : localStorage.setItem('listElements', JSON.stringify(filteredItems));
  }

  handleUpdate = (e, id) => {
    const value = e.target.value;

    if(value === '') {
      this.handleDelete(id);
    } else {
      const listElementsCopy = this.state.listElements.map( (element) => {

        if(element.key === id) element.text = value;
         
        return element;
      });

      this.setState({
        listElements: listElementsCopy,
      });

      localStorage.setItem('listElements', JSON.stringify(listElementsCopy));
    }

  }

  render() {
    return (
      <div className='app-wrapper'>
        <div className='container'>
          <div className='components-wrapper'>
            <Title title='to do list' />
            <List 
              list={this.state.listElements} 
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete} 
            />
            <Input 
              text={this.state.currentItem.text} 
              handleChange={this.handleChange} 
              handleAdd={this.handleAdd} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
