import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonRow } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { MovieI } from "../App";
import CastList from "../components/CastList";
import "../app.css"
import "./movie.css"
import { arrowBack } from "ionicons/icons";
import MovieBlocks from "../components/MovieBlocks";

interface movieI {
  movie: string;
}

const Movie: React.FC<movieI> = () => {
  let history = useHistory();
  let movie = history.location.state as MovieI;

  return (
    <>
      <header className="header">
        <div>
          <IonButton color="medium" fill="clear" routerLink="/" routerDirection="back">
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
        </div>
      </header>
      <IonContent fullscreen>
        <div className="wrapper">
          <img src={movie?.image?.original} />
          <MovieBlocks schedule={movie?.schedule} rating={movie?.rating} />
          <IonList lines="none">
            <IonItem>
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol className="title">{movie?.name}</IonCol>
                  <IonCol className="genres">
                    {movie?.genres[0] ? `${movie?.genres[0]} - ` : ""} {movie?.language ? `${movie?.language}` : ""}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <p style={{ margin: 0, paddingRight: '7px' }} dangerouslySetInnerHTML={{ __html: movie?.summary }}></p>
            </IonItem>
          </IonList>
          <CastList castList={movie?._embedded?.cast} />
        </div>
      </IonContent>
      <div className="footer"></div>
    </>
  );
};

export default Movie;
