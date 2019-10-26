import React, { Component } from 'react';
import './App.css';
import Content from './Content';

const API_URL = "http://localhost:3001/searchtweet?search=";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      data: []
    };
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoadMore=this.handleLoadMore.bind(this)
  }
  onChange(e) {
    this.setState({ searchText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const URL = API_URL + this.state.searchText
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log("data: ", data)
        this.setState({ data });
      })
  }

  handleLoadMore(e){
    e.preventDefault();
    const URL = API_URL + this.state.searchText+'&limit=100'
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log("data: ", data)
        this.setState({ data });
      })
  }
  
  render() {
    const { searchText, data } = this.state;
    return (
      <div className="App">
        <div className="inputSearch">
          <input type="text" value={searchText} onChange={this.onChange} className= "input-bar"/>   
          <button type="button" onClick={this.handleSubmit} className="btn-bar" >Search</button>
        </div>
          <button type= "button" onClick= {this.handleLoadMore} className= "load-more">LoadMore</button>
        <Content data={data} />
      </div>
    );
  }
}

export default App;
