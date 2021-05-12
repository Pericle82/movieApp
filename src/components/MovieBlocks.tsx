import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import React from "react";
import { calendarClearOutline, starOutline } from "ionicons/icons";
import "./movieBlocks.css";

interface movieBlocksI {
  schedule: { days: string[]; time: string };
  rating: { average: number };
}

const MovieBlocks: React.FC<movieBlocksI> = ({ schedule, rating }) => {
  return (
    <IonRow className="blocksRow">
      <IonCol className="ion-text-center bodered">
        <div style={{padding:'10px'}}>
          <IonIcon color="medium" icon={calendarClearOutline} />
          <p>{schedule?.days[0] && schedule?.time ? `${schedule?.days[0]} - ${schedule?.time}` : '-'}</p>
        </div>
      </IonCol>
      <IonCol className="ion-text-center bodered">
        <div style={{padding:'10px'}}>
          <IonIcon color="medium" icon={starOutline} />
          <p>{rating?.average ?rating?.average: '-' }</p>
        </div>
      </IonCol>
    </IonRow>
  );
};

export default MovieBlocks;
