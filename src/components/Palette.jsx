import React from "react";
import Color from "./Color";
import DownloadBox from "./DownloadBox";

/**
 * Hold the complete Palette. Which consists of Colors, inside Colors are Shades
 */
function Palette(props) {
  // get the list of colors from palette
  const colors = Object.keys(props.palette);

  // render the list of Color components based on colors.map and
  // pass the shades as props to the Color component, which it will use it to render
  // list of Shade component
  return (
    <div className="my-10 flex flex-col items-center">
      <DownloadBox palette={props.palette} />
      {colors.map((color, i) => (
        <Color key={i} shades={props.palette[color]} color={color} />
      ))}
    </div>
  );
}

export default Palette;
