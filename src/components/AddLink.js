import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import blank from "../assets/blank.jpg";
import axios from "axios";

export const AddLink = ({ movie, closeModal, edit, locale }) => {
  const [link, setLink] = useState("Loading..");
  const [customLink, setCustomLink] = useState("");
  //const [offers, setOffers] = useState([]);
  const [netflix, setNetflix] = useState("");
  const [prime, setPrime] = useState("");
  const [disney, setDisney] = useState("");
  const [bbc, setBBC] = useState("");
  const [hbo, setHBO] = useState("");
  const [crunchyroll, setCruchyroll] = useState("");

  console.log("addlink locale: ", locale);

  const { removeMovie, addMovieToWatchlist, watchlist } =
    useContext(GlobalContext);
  const addMovie = (event) => {
    const selectedLink = event.target.attributes.value.value;
    console.log("add mobie link: ", selectedLink);
    const movieWithLink = [movie[0], movie[1], movie[2], selectedLink];
    if (edit) {
      removeMovie(movie[0]);
    }
    addMovieToWatchlist(movieWithLink);
    closeModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var clink = customLink;
    if (!clink.includes("https://")) {
      clink = "https://" + clink;
    }
    const movieWithLink = [movie[0], movie[1], movie[2], clink];
    if (edit) {
      removeMovie(movie[0]);
    }
    addMovieToWatchlist(movieWithLink);
    closeModal();
  };

  const q = movie[1];
  useEffect(() => {
    const search = async () => {
      console.log("locale: ", locale);
      //var locale = "en_GB";
      var type = "show";
      var n = 1;
      try {
        var data = await axios.get(
          "https://apis.justwatch.com/content/titles/" +
            locale +
            '/popular?body={"page_size":' +
            n +
            ',"page":1,"query":"' +
            q.split(" ").join("+") +
            '","content_types":["' +
            type +
            '"]}'
        );
        var results = data.data;
        var offers = results.items[0].offers;

        var links = [];
        console.log(offers);
        //return offers;
        //setOffers(offers);
        var someLinks = false;
        for (const i in offers) {
          var service = offers[i].package_short_name;

          //console.log(service);
          // if (service == "nfx") {
          //   const resultLink = offers[i].urls.deeplink_web;
          //   console.log("url: ", resultLink);
          //   setLink(resultLink);
          //   return;
          // }
          const resultLink = offers[i].urls.deeplink_web
            ? offers[i].urls.deeplink_web
            : offers[i].urls.standard_web;
          // if (resultLink && !links.includes(resultLink)) {
          //   links.push(resultLink);
          // }

          // if (resultLink && !links.inlcudes(resultLink)) {
          //   console.log(service);
          //   if (service == "nfx") {
          //     setNetflix(resultLink);
          //     setLinks[...resultLink];
          //   } else if (service == "amp") {
          //     setPrime(resultLink);
          //   } else if (service == "dnp") {
          //     setDisney(resultLink);
          //   } else if (service == "bbc") {
          //     setBBC(resultLink);
          //   }
          // }
          switch (service) {
            case "nfx":
              console.log("netflix");
              setNetflix(resultLink);
              someLinks = true;
              break;
            case "amp":
              console.log("prime");
              setPrime(resultLink);
              someLinks = true;
              break;
            case "dnp":
              console.log(resultLink);
              setDisney(resultLink);
              someLinks = true;
              break;
            case "bbc":
              console.log(resultLink);
              setBBC(resultLink);
              someLinks = true;
              break;
            case "hbo":
              console.log("hbo");
              setHBO(resultLink);
              someLinks = true;
              break;
            case "cru":
              console.log("crunchyroll");
              setCruchyroll(resultLink);
              someLinks = true;
              break;
            default:
              break;
          }
          // console.log("CLEAR");
        }
        if (!someLinks) {
          setLink("No links found");
        } else {
          setLink("");
        }
        //
        //setLinks(links);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [q]);

  //search(movie[1]);
  return (
    <div>
      <p>{movie[1]}</p>
      <p>{link}</p>
      {netflix != "" && (
        <button onClick={addMovie} value={netflix}>
          netflix
        </button>
      )}
      {prime != "" && (
        <button onClick={addMovie} value={prime}>
          prime
        </button>
      )}
      {disney != "" && (
        <button onClick={addMovie} value={disney}>
          disney
        </button>
      )}
      {bbc != "" && (
        <button onClick={addMovie} value={bbc}>
          bbc
        </button>
      )}
      {hbo != "" && (
        <button onClick={addMovie} value={hbo}>
          hbo
        </button>
      )}
      {crunchyroll != "" && (
        <button onClick={addMovie} value={crunchyroll}>
          crunchyroll
        </button>
      )}
      {/* <p>{netflix}</p>
      <p>{prime}</p>
      <p>{disney}</p>
      <p>{bbc}</p>
      <p>{hbo}</p>
      <p>{crunchyroll}</p> */}
      <div className="add-link">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder={"enter your own link"}
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
