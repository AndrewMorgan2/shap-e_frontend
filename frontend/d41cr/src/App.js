import "./styles.css";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios';

export default function App() {
  const modelRef = React.useRef();
  const [annots, setAnnots] = useState([]);

  const handleClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
      if (hit) {
        setAnnots((annots) => {
          return [...annots, hit];
        });
      }
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  const [inputValue, setInputValue] = useState('');
  const [inputBatch, setBatch] = useState(4);
  const [inputGuide, setGuide] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputBatch = (e) => {
    setBatch(e.target.value);
  };
  const handleInputGuide = (e) => {
    setGuide(e.target.value);
  };
  // Define a function to run when the button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    //Run command
    //TO DO MAKE SURE TEXT INPUT DOES HAVE / IN THEM
    executeCommand(`${inputValue}/${inputGuide}/${inputBatch}`);

    setIsLoading(true);

    // Simulate some asynchronous task
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Change this time to simulate a different loading duration (in milliseconds)
    
  };

  const executeCommand = async (command) => {
    try {
      const response = await axios.post('http://localhost:3001/run-command', { command });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ display: "block", color: "black", verticalAlign: "middle" }}>
        <div style={{ display: "inline-flex"}}>
        <form>
          <label style={{verticalAlign: "middle"}}>
            Output Name:
            <input type="text" name="outputname" />
          </label>
        </form>
        </div>

        <div style={{display: "inline-flex"}}>
          <div style={{ paddingRight:"25px"}}>
            <h4>
              Batch Size
            </h4>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Batch Size"
                defaultValue={4}
                value={inputBatch}
                onChange={handleInputBatch}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
            </Box>
          </div>
          <div>
            <h4>
              Guidance Scale
            </h4>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Guidance Scale"
                defaultValue={15}
                value={inputGuide}
                onChange={handleInputGuide}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                min={1}
                max={100}
              />
            </Box>
          </div>
        </div>
        <div style={{display: "inline-flex"}}>
          <form onSubmit={handleSubmit} style={{display: "flex"}}>
            <label style={{verticalAlign: "middle"}}>
                Text Inputt:
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder=""
                />
            </label>
            <button disabled={isLoading} style={{display: "inline-flex", borderRadius: "5px",height: "auto", backgroundColor: "#3498db", color: "#fff", padding: "10px 20px", width: "auto", marginLeft:"25px", marginRight:"25px"}} type="submit">
              {isLoading ? 'Loading...' : 'Generate Model'}
            </button>
          </form>
        </div>
      </div>

      <div>
        <model-viewer
          // className="model-viewer"
          src="./M08.glb"
          alt="A rock"
          exposure="0.008"
          camera-controls
          ar
          ar-modes="webxr"
          onClick={handleClick}
          ref={(ref) => {
            modelRef.current = ref;
          }}
        >
        </model-viewer>  
      </div>

    </div>
  );
}
