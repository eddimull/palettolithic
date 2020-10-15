import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// scripts
import generateTailwind from "../scripts/generateTailwind";
import generateBootstrap from "../scripts/generateBootstrap";

// packages
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import scss from "react-syntax-highlighter/dist/esm/languages/hljs/scss";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 * @param {*} props
 */
function CodeContent(props) {
  //
  /**
   * WHAT: copy status to display if code is copied.
   * WHY: so the user gets feedback if code is copied to clipboard.
   * It uses useEffect to change back to 'Copy' anytime the palette or active framework changes.
   * When user clicks on "Copy" span button then the handleOnClick sets the state to "Copied"
   */
  const [copyStatus, setCopyStatus] = useState("Copy");

  useEffect(() => {
    setCopyStatus("Copy");
  }, [props.palette, props.activeFramework]);

  function handleOnClick(e) {
    setCopyStatus("Copied");
  }

  /* ------------------------------ Code handle ----------------------------- */

  /**
   * This part of code applies syntax highlighting and copy button
   */

  SyntaxHighlighter.registerLanguage("javascript", js);
  SyntaxHighlighter.registerLanguage("scss", scss);

  const tailwindCode = (
    <>
      <CopyToClipboard text={generateTailwind(props.palette)}>
        <div className="flex justify-end">
          <span
            onClick={handleOnClick}
            className="cursor-pointer font-mono bg-teal-300 rounded text-teal-900 px-1 hover:bg-teal-900 hover:text-teal-300 transition duration-100"
          >
            {copyStatus}
          </span>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language="javascript" style={tomorrowNight}>
        {generateTailwind(props.palette)}
      </SyntaxHighlighter>
    </>
  );

  const bootstrapCode = (
    <>
      <CopyToClipboard text={generateBootstrap(props.palette)}>
        <div className="flex justify-end">
          <span
            onClick={handleOnClick}
            className="cursor-pointer font-mono bg-purple-300 rounded text-purple-900 px-1 hover:bg-purple-900 hover:text-purple-300 transition duration-100"
          >
            {copyStatus}
          </span>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language="scss" style={tomorrowNight}>
        {generateBootstrap(props.palette)}
      </SyntaxHighlighter>
    </>
  );

  /* -------------------------------- Render -------------------------------- */

  function renderCode(activeFramework) {
    switch (activeFramework) {
      case "tailwind":
        return tailwindCode;
      case "bootstrap":
        return bootstrapCode;
      default:
        return "nothing selected";
    }
  }

  return <>{renderCode(props.activeFramework)}</>;
}

export default CodeContent;
