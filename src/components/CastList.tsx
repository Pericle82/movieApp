import { IonAvatar, IonCol, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import React from 'react';

interface castListI {
    castList: any[]
}

const CastList: React.FC<castListI> = ({castList}) => {
    return (
    <IonList lines="none">
        <IonListHeader>
        
                <IonCol>
                    <IonLabel style={{fontSize: '20px'}}>Cast</IonLabel>
                
                </IonCol>
                <IonCol>
                    <IonLabel style={{fontSize: '14px'}}>Actor name</IonLabel>
                
                </IonCol> 
                <IonCol>
                    <IonLabel style={{fontSize: '14px'}}>Hero name</IonLabel>
                </IonCol> 
         

        </IonListHeader>
        {
          castList &&  castList.map(actor => {
                const {person, character} = actor;
                return (
                    <IonItem>
               <IonCol>
                   <IonAvatar><img src={person?.image?.medium} /></IonAvatar>
                    </IonCol>
               <IonCol>{person?.name} </IonCol>
               <IonCol>{character?.name}</IonCol>
           </IonItem>
               )
            } )
        }
       
    </IonList>
    );
}

export default CastList;
