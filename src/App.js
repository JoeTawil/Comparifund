import React, { useRef, useState } from 'react';
import Fundlist from './Fundlist';
import './App.css';

function App() {
  const [click, setClick] = useState(false);
  const firstTime = useRef(false);
  const inputRefs = [useRef(), useRef(), useRef()];
  const [inputValues, setInputValues] = useState({
    roi: '',
    volatility: '',
    esg: '',
  });

  function handleInputChange(evt, index) {
    if (evt.key === 'Enter') {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      } else {
        handleSearch();
      }
    } else {
      const { name, value } = evt.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  }

  function handleKeyDown (evt, index) {
    if (evt.key === 'Enter') {
      if (index === 0) {
          document.getElementById("volatility").focus()
      }
      
      if (index === 1) {
        document.getElementById("esg").focus()
      }
    }
  }

  function handleSearch() {
    firstTime.current = true;
    setClick(!click);
    console.log(inputValues.roi, inputValues.volatility, inputValues.esg);
  }

  return (
    <div className="App">
      <div className="center">
        <div className="inputContainer">
          <label className="inputLabel">ROI</label>
          <input
          id = "roi" 
            type="text"
            className="inputField"
            name="roi"
            value={inputValues.roi}
            onChange={(e) => handleInputChange(e, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            ref={inputRefs[0]}
          />
        </div>

        <div className="inputContainer">
          <label className="inputLabel">Volatility</label>
          <input
           id = "volatility" 
            type="text"
            className="inputField"
            name="volatility"
            value={inputValues.volatility}
            onChange={(e) => handleInputChange(e, 1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            ref={inputRefs[1]}
          />
        </div>

        <div className="inputContainer">
          <label className="inputLabel">ESG</label>
          <input

           id = "esg" 
            type="text"
            className="inputField"
            name="esg"
            value={inputValues.esg}
            onChange={(e) => handleInputChange(e, 2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            ref={inputRefs[2]}
          />
        </div>
      </div>

      <div className="centerButton">
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>

      {firstTime.current && (
        <Fundlist
          roi={parseFloat(inputValues.roi)}
          volatility={parseInt(inputValues.volatility)}
          esg={parseInt(inputValues.esg)}
        />
      )}
    </div>
  );
}

export default App;