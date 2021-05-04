import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toyCollection: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => this.setState({toyCollection: json}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (e, newToyObj) => {
    e.preventDefault()
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToyObj)
    }
    fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(json => {
      this.setState({toyCollection: [...this.state.toyCollection, json]})
      this.handleClick()
    })
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {method: "DELETE"})
    .then(resp => resp.json())
    .then(() => this.setState({toyCollection: this.state.toyCollection.filter(toy => toy.id !== id)}))
  }

  likeBtn = (id, currentLikes) => {
    const updateLikes = {likes: currentLikes + 1}
    const configObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updateLikes)
    }
    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(resp => resp.json())
    .then((json) => this.setState({
      toyCollection: this.state.toyCollection.map(toy => {
        if (toy.id === id) {
          return json
        } else {
          return toy
        }
      })
    }))

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
        toyCollection={this.state.toyCollection} 
        deleteToy={this.deleteToy}
        likeBtn={this.likeBtn}
        />
      </>
    );
  }

}

export default App;
