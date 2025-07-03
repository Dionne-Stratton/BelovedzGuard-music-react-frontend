import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Merch(props) {
  const { filtered } = props;
  const { id } = useParams();
  //these are the arrows that will be clicked on to navigate through the items in the items array in the UI. I had to create them as variables and set them to strings with spaces in order to get them to display instead of throwing an error. Might change them to images later.
  const leftArrow = " < ";
  const rightArrow = " > ";
  //index is the index of the item in the items array that is being displayed on the page. It is set to the id parameter from the url which is a string so we have to convert it to a number. We are using the index to display the item in the items array that matches the index. We are also using the index to set the indexLeft and indexRight variables which are used to navigate through the items array.
  const [index, setIndex] = useState(Number(id));
  const [indexLeft, setIndexLeft] = useState(0);
  const [indexRight, setIndexRight] = useState(0);
  const [item, setItem] = useState([]);

  useEffect(() => {
    //if the items array is not empty, set the item variable to the item in the items array that matches the index. Set the indexLeft variable to the index - 1 and the indexRight variable to the index + 1. This will allow us to navigate through the items array in the UI.
    if (filtered.length > 0) {
      setItem([filtered[index]]);
      setIndexLeft(index - 1);
      setIndexRight(index + 1);
    }
  }, [id, filtered, index]);

  return (
    <>
      {/* if the item array is empty, display the loading message. Otherwise, display the data. */}
      {item.length === 0 ? (
        <p>Loading... Please wait...</p>
      ) : (
        <div className="homepage">
          {item.map((image) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(image.img.data.data))
            );
            return (
              <div className="Merch" key={item.id}>
                <div className="sectionStyle image">
                  {/* if the index is greater than 0, display the left arrow with a Link that sends the user to the current url but with the index being the indexLeft and set className arrow. Otherwise, display the left arrow as a simple <p> and the class of disabled.  */}
                  {index > 0 ? (
                    <Link
                      to={`/Music/${indexLeft}`}
                      onClick={() => setIndex(index - 1)}
                      className="arrow"
                    >
                      {leftArrow}
                    </Link>
                  ) : (
                    <p className="arrow disabled">{leftArrow}</p>
                  )}
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    alt={image.title}
                  />
                  {/* if the index is less than the length of the items array - 1, display the right arrow with a Link that sends the user to the current url but with the index being the indexRight and set className arrow. Otherwise, display the right arrow as a simple <p> and the class of disabled.  */}
                  {index < filtered.length - 1 ? (
                    <Link
                      to={`/Music/${indexRight}`}
                      onClick={() => setIndex(index + 1)}
                      className="arrow"
                    >
                      {rightArrow}
                    </Link>
                  ) : (
                    <p className="arrow disabled">{rightArrow}</p>
                  )}
                </div>
                <div className="sectionStyle">
                  <h3>{image.title}</h3>
                  <br></br>
                  <p>Price: ${image.price} </p>
                  <p>Size: {image.size}</p>
                  <br></br>
                  <p>{image.description}</p>
                  <br></br>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buyPrints"
                    href={image.podLink}
                  >
                    Buy Prints
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
