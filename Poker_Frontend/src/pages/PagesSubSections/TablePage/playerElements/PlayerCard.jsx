import React, { Component } from "react";


export class PlayerCard extends Component {
  render() {
    
    const { cardImage } = this.props;
    const imageUrl =`/SVG-cards-1.3/${cardImage}`;
    return (
      <div className="w-[50%] h-full  ">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={cardImage}
            className="w-full h-full object-contain"
          />
        ) : (
          <p>Image not found: {cardImage}</p>
        )}
      </div>
    );
  }
}

export default PlayerCard;
