import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { AddLink } from "./AddLink";

export const MovieCard = ({ id, imgSource, name, link, locale }) => {
  const { removeMovie, changeLink, watchlist } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const editLink = () => {
    let newLink = prompt("enter link: ");
    if (!newLink.includes("https://")) {
      newLink = "https://" + newLink;
    }
    changeLink(id, newLink);
    let storedMovie = watchlist.find((o) => o[0] === id);
    watchlist[watchlist.indexOf(storedMovie)][3] = newLink;
  };
  return (
    <div className="movie-card">
      <a href={link}>
        <div className="overlay"></div>
        <img src={imgSource} alt={`${name} Poster`} />
      </a>
      <div className="inner-card-controls">
        <>
          <button className="ctrl-btn" onClick={onOpenModal}>
            <i className="fa-fw fa fa-pen-square"></i>
          </button>
          <button className="ctrl-btn" onClick={() => removeMovie(id)}>
            <i className="fa-fw fa fa-times"></i>
          </button>
          <Modal open={open} onClose={onCloseModal} center>
            <AddLink
              edit={true}
              movie={[id, name, imgSource, link]}
              closeModal={onCloseModal}
              locale={locale}
            />
          </Modal>
        </>
      </div>
      {/* <p>{name}</p> */}
    </div>
  );
};
