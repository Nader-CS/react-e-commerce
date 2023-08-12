import React, { useState } from "react";
import classes from "./ImageComponent.module.scss";

function ImageComponent(props) {
  const [isOverlayShown, setOverlayShown] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  const handleImageClick = (imageURL) => {
    setClickedImage(imageURL);
    setOverlayShown(true);
  };

  const handleCloseOverlay = () => {
    setOverlayShown(false);
  };

  return (
    <div className={classes["image-container"]}>
      <img
        src={props.src}
        alt="Clickable Image"
        onClick={() => handleImageClick(props.src)}
        className={classes.img}
      />
      {isOverlayShown && (
        <div className={classes["overlay"]} onClick={handleCloseOverlay}>
          <img
            src={clickedImage}
            alt="Large Image"
            className={classes["large-image"]}
          />
        </div>
      )}
    </div>
  );
}

export default ImageComponent;
