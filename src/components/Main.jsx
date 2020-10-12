import React, { useEffect, useState } from "react";
import { createPalette } from "../scripts/createPalette";

import Palette from "./Palette";
import Menu from "./Menu";
import Code from "./Code";

/**
 * Main component that displays the first page with form and palette
 * @param {object} props palette and onSubmit
 */
function Main(props) {
  /**
   *WHAT: current color from color picker, or input field
   *WHY: we need it to create palette from. It's in Main so it can be passed to Palette
   */
  const [color, setColor] = useState("#aabbcc");
  /**
   * Palette is the collection of shades for each color. Curently 12 colors with 10 shades each.
   * {color:[shades],....}. createPalette function is used to create a collection after form submit
   */
  const [palette, setPalette] = useState({});

  /**
   * WHAT: renders the initial demo pallete on first page visit
   * WHY: so user can immediately see an example
   */
  useEffect(() => {
    const initialPallete = createPalette(color);
    setPalette(initialPallete);
  }, []);

  return (
    <div className="text-gray-900 bg-white p-4 h-screen w-screen flex">
      <Menu color={color} onChange={v => setColor(v)} />
      <Code />
      <Palette palette={palette} />

      {/* passing onSubmit from App to Form */}
      {/* <Form onSubmit={props.onSubmit} /> */}
    </div>
  );
}

export default Main;
