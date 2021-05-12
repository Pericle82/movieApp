import { IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonRow, IonText, IonTextarea } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { MovieI } from "../App";
import "./card.css";

interface cardI {
  movie: MovieI;
  onClick?: Function;
  className: string;
  movieDetails?: boolean;
}
const Card: React.FC<cardI> = ({ movie, onClick = () => null, className, movieDetails = false }) => {
  let ref = useRef<HTMLImageElement>(null);
  const [imageComplete, setimageComplete] = useState(false);

  return (
    <div className={className} onClick={() => onClick()}>
      <img
        ref={ref}
        src={movie?.image?.original}
        className={`card_img${movieDetails ? "_full" : ""} ${!imageComplete ? { display: "none" } : ""}`}
        onLoad={() => setimageComplete(true)}
      />
      {!imageComplete && <div>Loading...</div>}

      <div className={"card_content"}>
        <h4>{movie?.name}</h4>
        <div>
          <span>
            {movie?.genres[0] ? `${movie?.genres[0]} - ` : ""}
            {movie?.language ? `${movie?.language} - ` : ""}
            {dateParser(movie?.premiered) ? `${dateParser(movie?.premiered)}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

const dateParser = (date: string) => {
  if (date) {
    const parsedDate = new Date(date);
    return parsedDate.getFullYear();
  }
  return null;
};

export default Card;
