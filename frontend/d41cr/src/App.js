import "./styles.css";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

  return (
    <div>
      <div style={{ display: "block", color: "black" }}>
        <form>
          <label>
            <b>Text Input:</b>
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div style={{display: "flex"}}>
          <div style={{ paddingRight:"25px"}}>
            <h4>
              Batch Size
            </h4>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Batch Size"
                defaultValue={4}
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
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                min={1}
                max={100}
              />
            </Box>
          </div>
        </div>

      </div>

      <div style={{ display: "block",position: "absolute", height:"80%", width: "80%", top: "10%", left: "10%" }}>
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

      <div style={{ display: "flex"}}>
        <form>
          <label>
            Output Name:
            <input type="text" name="outputname" />
          </label>
          <input type="submit" value="Submit Output" />
        </form>
      </div>

    </div>
  );
}
