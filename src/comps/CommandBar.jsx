import ReactDOM from 'react-dom/client'
import { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Autocomplete from '@mui/joy/Autocomplete';
import { lineDrawCancel } from '../scripts/lineDraw.js'

let newValueParam = null;
export var selectionModeNew, lineModeNew, isDrawingNew;

export const DynamicCommandBar = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDynamicCommandBar, setIsDynamicCommandBar] = useState(true);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => { document.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX + 10, y: event.clientY - 40 });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsDynamicCommandBar(false);
    } else {
      setIsDynamicCommandBar(true);
    }
  };
  
  return isDynamicCommandBar ? (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
      }}
    >
      <CommandBar handleDynamicCommandBar={setIsDynamicCommandBar} />
    </div>
  ) : (
    <CommandBar handleCommandVisibility={setIsDynamicCommandBar} />
  );
  
}; 

export function CommandBar() {
  // Command aliases
  const commands = [
    { command: 'Line' },
    { command: 'Copy' },
    { command: 'Trim' }
  ];

  // Define refs and states
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  // Set focus upon mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Event Handlers
  const handleOnChange = (event, newValue) => {
    const commandExists = commands.some((cmd) => cmd.command === newValue);
    if (commandExists) {
      setValue(newValue);
      newValueParam = newValue;
      handleCommand(newValueParam);
    }
  };
  const handleKeyDown = (event, newValue) => {
    const commandExists = commands.some((cmd) => cmd.command === newValue);
    if (event.key === 'Escape') {
      inputRef.current.blur();
      lineDrawCancel(false, false);
      hideCommandBar();
    }
    if (event.key === 'Enter' && commandExists) {
      console.log("Enter pressed");
    }
  };
  const handleOnBlur = (event) => {
    if (!event.relatedTarget) {
      event.target.focus();
    }
  }

  return (
    <Stack spacing={2} sx={{ width: 150 }}>
      <FormControl id="commandbar-input">
        <Autocomplete
          freeSolo
          autoFocus
          autoHighlight
          autoComplete
          clearOnEscape
          selectOnFocus
          size="sm"
          variant="solid"
          placeholder="Type anything"
          value={value}
          options={commands.map((option) => option.command)}
          ref={inputRef}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          sx={{
            '--Input-focusedThickness': '0',
            '--Input-minHeight': '25px',
            '--Input-radius': '10px',
          }}
        />
      </FormControl>
    </Stack>
  )
}

export function handleCommand(newValueParam){

  if (newValueParam === "Line") {
    selectionModeNew = false;
    lineModeNew = true;
    isDrawingNew = true;
    console.log("Command: ", "Line")
  }
  if (newValueParam === "Copy") {
    console.log("Command: ", "Copy")
  }
  if (newValueParam === "Trim") {
    console.log("Command: ", "Trim")
  }

  returnCommand(selectionModeNew, lineModeNew, isDrawingNew);
  hideCommandBar();
} 

export function returnCommand(selectionModeParam, lineModeParam, isDrawingParam) {
  selectionModeNew = selectionModeParam;
  lineModeNew = lineModeParam;
  isDrawingNew = isDrawingParam;
  console.log("Selection: ", selectionModeNew)
  console.log("Line mode: ", lineModeNew)
  
  return { selectionModeNew, lineModeNew, isDrawingNew };
}

export function hideCommandBar() {
  const commandBarContainer = document.getElementById('commandbar-container');
  commandBarContainer.style.display = 'none';
  console.log("Hide commandbar")
}

export function showCommandBar() {
  const commandBarContainer = document.getElementById('commandbar-container');
  const commandBarInput = document.getElementById('commandbar-input');
  commandBarContainer.style.display = 'block';
  commandBarInput.focus();
  commandBarInput.value = "";
  console.log("Show commandbar")
}