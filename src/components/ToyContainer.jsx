import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toyCollection.map(toy => 
        <ToyCard 
        toy={toy} 
        key={toy.id} 
        deleteToy={props.deleteToy}
        likeBtn={props.likeBtn}
        />)}
    </div>
  );
}

export default ToyContainer;
