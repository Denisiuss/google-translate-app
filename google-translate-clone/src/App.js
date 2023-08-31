import { useState, useEffect } from "react";
import axios from "axios";
import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguege] = useState("Hebrew");
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [languagesData, setLanguagesData] = useState();

  const getLanguages = async () => {
    const options = {
      method: "GET",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      const arrayOfData = Object.values(response.data.languages).map(
        (a) => a.name
      );
      const dataGetted = response.data.languages;
      setLanguages(arrayOfData);
      setLanguagesData(dataGetted);
    } catch (error) {
      console.error(error);
    }
  };

  const translate = async () => {
    var resultOutput = languagesData.filter((obj) => {
      return obj.name == outputLanguage;
    });

    var resultInput = languagesData.filter((obj) => {
      return obj.name == inputLanguage;
    });
    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: {
        q: textToTranslate,
        source: resultInput[0].language,
        target: resultOutput[0].language,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const translatedTextFromData = Object.values(
        response.data.data.translations
      );
      setTranslatedText(translatedTextFromData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguege(inputLanguage);
  };

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            style="input"
            selectedLanguage={inputLanguage}
            setShowModal={setShowModal}
            textToTranslate={textToTranslate}
            setTextToTranslate={setTextToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

          <TextBox
            style="output"
            selectedLanguage={outputLanguage}
            setShowModal={setShowModal}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={showModal == "input" ? inputLanguage : outputLanguage}
          setChosenLanguage={
            showModal == "input" ? setInputLanguage : setOutputLanguege
          }
        />
      )}
    </div>
  );
};

export default App;
