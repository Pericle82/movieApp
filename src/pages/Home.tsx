import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import Card from "../components/Card";
import "./home.css";

const Home: React.FC<RouteComponentProps> = ({ ...props }) => {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [initialMovieList, setinitialMovieList] = useState([]);
  const [loading, setloading] = useState<boolean>(false);
  const [searchKey, setsearchKey] = useState<string>("");

  const getMovie = () => {
    return movieList.length > 0 ? movieList : searchKey.length > 0 ? movieList : initialMovieList;
  };

  useEffect(() => {
    setsearchKey('')
    setloading(true);
    fetch("https://api.tvmaze.com/shows?page=1")
      .then(async (resp) => {
        const data = await resp.json();
        setMovieList(data);
        setinitialMovieList(data);
        setloading(false);
      })
      .catch((e) => setloading(false));
  }, []);

  const movieSearch = (querySearch: string | undefined) => {
    if (querySearch && querySearch.length > 0) {
      setsearchKey(querySearch);
      setloading(true);
      fetch(`http://api.tvmaze.com/search/shows?q=${querySearch}`)
        .then(async (resp) => {
          const data: any[] = await resp.json();
          const shows = data.map((item) => item.show);
          setMovieList(shows);
          setloading(false);
        })
        .catch((e) => setloading(false));
    } else {
      setsearchKey("");
      setMovieList([]);
    }
  };

  const movieDetails = (id: string) => {
    setloading(true);
    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then(async (resp) => {
        const data: any = await resp.json();
        setloading(false);
        props.history.push({ pathname: `home/movie/${id}`, state: data });
      })
      .catch((e) => setloading(false));
  };

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonSearchbar
            className="ion-padding-none"
            mode="ios"
            onIonChange={(e) => movieSearch(e.detail.value)}
            debounce={500}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {getMovie().length > 0 ? (
               getMovie().map((movie) => {
                return (
                  <IonCol sizeMd="4" sizeXs="6">
                    <Card className="card_wrapper" movie={movie} onClick={() => movieDetails(movie.id)} />
                  </IonCol>
                );
              })
            ): (
              <IonCol>Searching {searchKey} has none results</IonCol>
            )
             }
          </IonRow>
        </IonGrid>

        <IonLoading cssClass="my-custom-class" isOpen={loading} message={"Please wait..."} duration={5000} />
      </IonContent>
    </>
  );
};

export default Home;
