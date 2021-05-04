import React, { Component } from 'react';

class ToyCard extends Component {
  // state = {
  //   likes: this.props.toy.likes
  // }

  render() {
    const { name, image, likes, id } = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" 
        onClick={() => {
          this.props.likeBtn(id, likes)
          // this.setState({likes: likes + 1})
        }}
        >Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.deleteToy(id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
