import { useState, useEffect, useRef } from "react"

export var command;
const commands = [
    "Arc",
    "Line",
    "Circle",
    "Copy",
    "Array",
    "Offset",
    "Dimension",
]; commands.sort()

export const CommandBar = () => {
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isShowOptions, setShowOptions] = useState(false);
    const [isShowCommandBar, setShowCommandBar] = useState(false);
    const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(-1);
    const options = commands.filter( opt => opt.toLowerCase().includes(value.toLowerCase()))

    useEffect(() => {
        const handleCommandInput = (event) => {
            if (!isShowCommandBar && event.key !== 'Meta' && event.key !== 'Control' && event.key !== 'Enter') {
                setShowCommandBar(true);
            } 
            if (event.key === 'Escape') {
                setShowCommandBar(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleCommandInput);

        return () => { 
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleCommandInput);
        };
    }, [isShowCommandBar]);

    useEffect(() => {
        if (isShowCommandBar && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isShowCommandBar]);

    const handleMouseMove = (event) => {
        setPosition({ x: event.clientX + 15, y: event.clientY + 15 });
    };
    const handleOnChange = (event) => {
        setShowOptions(true);
        setValue(event.target.value);
        setHighlightedOptionIndex(0)

        if ((event.target.value) === "") {
            setShowOptions(false)
        }
    }
    const handleOnFocus = (event) => {
        setValue('');
    }
    const handleOnBlur = (event) => {
        setHighlightedOptionIndex(-1)
        if (!event.relatedTarget) {
            event.target.focus();
        }
    }
    const handleOnSelect = (selected) => {
        setShowOptions(false);
        setShowCommandBar(false);
        setValue(selected);

        command = selected;
        console.log("Command: ", selected)
    }
    const handleKeyDown = (event) => {
        
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setHighlightedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setHighlightedOptionIndex((prevIndex) =>
            Math.min(prevIndex + 1, options.length - 1)
          );
        } else if (event.key === 'Enter') {
          event.preventDefault();
          if ((highlightedOptionIndex !== -1) && (options[highlightedOptionIndex] !== undefined)) {
            handleOnSelect(options[highlightedOptionIndex]);
            console.log(options[highlightedOptionIndex])
          }
        } else if (event.key === 'Escape') {
            setShowOptions(false);
            setShowCommandBar(false);
        }
    };

    // RETURN COMPONENT
    return (
        <div className="commandbar"
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                visibility: isShowCommandBar ? "visible" : "hidden"
            }}
        >
            <input id="commandbar-input"
                autoFocus
                autoComplete="off"
                type="text"
                placeholder="Search"
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyDown={handleKeyDown}
                value={value}
                ref={inputRef}
            />
            {isShowOptions && (
                <ul className="options-list">
                    {options.map((option, index) => (
                        <li 
                            onClick={() => handleOnSelect(option)}
                            key={option}
                            style={{
                                backgroundColor: index === highlightedOptionIndex ? 'mediumpurple ' : 'transparent',
                                color: index === highlightedOptionIndex ? 'white ' : 'black',
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}