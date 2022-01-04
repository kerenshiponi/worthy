import React from 'react';
import './style.css';

const { useState } = React;

export default function App() {
  const cuts = ['Excellent', 'Very Good', 'Good', 'Fair'];
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  const clarities = ['F', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];
  let classname = '';

  const [caratvalue, setCaratValue] = useState(0.1);
  const handleCaratChange = (e) => setCaratValue(e.target.value);

  const [cutval, setCutVal] = useState(1);
  const handleCutChange = (e) => {
    setCutVal(e.target.value);
    //document.getElementById(cuts[cutval]).className += " selected";
  }
  const [colorval, setColorVal] = useState(1);
  const handleColorChange = (e) => setColorVal(e.target.value);

  const [clarval, setClarVal] = useState(1);
  const handleClarChange = (e) => setClarVal(e.target.value);

  const GetPrice = () => {
    let xmlHttp = new XMLHttpRequest();
    //alert(caratvalue + " " + cutval + " " + colorval + " " + clarval);
    xmlHttp.open('POST', '/search', false); // false for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.send(
      JSON.stringify({
        cut: cuts[cutval],
        weight: Number(caratvalue),
        color: colors[colorval],
        clarity: clarities[clarval],
      })
    );
    
    let obj = JSON.parse(xmlHttp.responseText);
    if(obj.price === null) 
      alert("No Matches Found");
    else 
      alert("Diamond Price: " + obj.price);
  };

  return (
    <div>
      <h1>Diamond Search</h1>
      <h3>Diamons Categories:</h3>
      <div>
        <h4>Carat Weight:</h4>
        <p>{caratvalue}</p>
        <input
          type="range"
          className="slider"
          min="0.1"
          max="5"
          step="0.01"
          value={caratvalue}
          onChange={handleCaratChange}
        ></input>
      </div>

      <div>
        <h4>Cut:</h4>
        <ul>
          <li className="cutcat">Excellent</li>
          <li className="cutcat">Very Good</li>
          <li className="cutcat">Good</li>
          <li className="cutcat">Fair</li>
        </ul>
        <input
          type="range"
          className="slider"
          list="cutmarks"
          min="0"
          max="3"
          value={cutval}
          onChange={handleCutChange}
        ></input>
        <datalist id="cutmarks">
          <option value="0" label="Exellent"></option>
          <option value="1" label="Very Good"></option>
          <option value="2" label="Good"></option>
          <option value="3" label="Fair"></option>
        </datalist>
      </div>

      <div>
        <h4>Color:</h4>
        <ul>
          <li className="colorcat">D</li>
          <li className="colorcat">E</li>
          <li className="colorcat">F</li>
          <li className="colorcat">G</li>
          <li className="colorcat">H</li>
          <li className="colorcat">I</li>
          <li className="colorcat">J</li>
          <li className="colorcat">K</li>
          <li className="colorcat">L</li>
          <li className="colorcat">M</li>
        </ul>
        <input
          type="range"
          className="slider"
          list="colormarks"
          min="0"
          max="9"
          value={colorval}
          onChange={handleColorChange}
        ></input>
        <datalist id="colormarks">
          <option value="0" label="D"></option>
          <option value="1" label="E"></option>
          <option value="2" label="F"></option>
          <option value="3" label="G"></option>
          <option value="4" label="H"></option>
          <option value="5" label="I"></option>
          <option value="6" label="J"></option>
          <option value="7" label="K"></option>
          <option value="8" label="L"></option>
          <option value="9" label="M"></option>
        </datalist>
      </div>

      <div>
        <h4>Clarity:</h4>
        <ul>
          <li className="claritycat">F</li>
          <li className="claritycat">IF</li>
          <li className="claritycat">VVS1</li>
          <li className="claritycat">VVS2</li>
          <li className="claritycat">VS1</li>
          <li className="claritycat">VS2</li>
          <li className="claritycat">SI1</li>
          <li className="claritycat">SI2</li>
          <li className="claritycat">I1</li>
        </ul>
        <input
          type="range"
          className="slider"
          list="claritymarks"
          min="0"
          max="8"
          value={clarval}
          onChange={handleClarChange}
        ></input>
        <datalist id="claritymarks">
          <option value="0" label="F"></option>
          <option value="1" label="IF"></option>
          <option value="2" label="VVS1"></option>
          <option value="3" label="VVS2"></option>
          <option value="4" label="VS1"></option>
          <option value="5" label="VS2"></option>
          <option value="6" label="SI1"></option>
          <option value="7" label="SI2"></option>
          <option value="8" label="I1"></option>
        </datalist>
      </div>

      <button onClick={GetPrice}>Get Price</button>
    </div>
  );
}
