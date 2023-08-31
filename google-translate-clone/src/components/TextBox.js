import React from "react";
import SelectDropDown from "./SelectDropDown";

const TextBox = ({
  setShowModal,
  selectedLanguage,
  style,
  setTextToTranslate,
  textToTranslate,
  translatedText,
  setTranslatedText,
}) => {

    const handleClick = () => {
        setTextToTranslate('')
        setTranslatedText('')
    }

  return (
    <div className={style}>
      <SelectDropDown
        style={style}
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
      />
      <textarea
        placeholder={style === "input" ? "Enter text" : "Translation"}
        disabled={style === "output"}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style == 'input' ? textToTranslate : translatedText}
      />
      {style == "input" && (
        <div className="delete" onClick={handleClick}>˟</div>
      )}
    </div>
  );
};

export default TextBox;
