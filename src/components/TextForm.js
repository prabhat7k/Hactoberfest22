import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = ()=>{ 
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
        let newText = text.toLowerCase();
        
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = ()=>{ 
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event)=>{
        setText(event.target.value) 
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
    }

    // Credits: A
    const handleCopy = () => {
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard!", "success");
    }

    // Credits: Coding Wala
    const handleExtraSpaces = () => {
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleReadAloud = () => {
        if ('speechSynthesis' in window) {
            var synth = speechSynthesis;
            var utterance = new SpeechSynthesisUtterance(text);
            synth.speak(utterance);
        }
        else {
            alert("speech synthesis not supported ")
        }
    }
    const handleUndoText = () => {
        redoTextHistory.push(text);
        updateRedoTextHistory(redoTextHistory);
        const lastText = undoTextHistory[undoTextHistory.length - 1];
        undoTextHistory.pop();
        updateUndoTextHistory(undoTextHistory);
        setText(lastText);
        props.showAlert("Successfully recovered your last text!", "success");
    }
      const handleRedoText = () => {
        undoTextHistory.push(text);
        updateUndoTextHistory(undoTextHistory);
        const lastText = redoTextHistory[redoTextHistory.length - 1];
        redoTextHistory.pop();
        updateRedoTextHistory(redoTextHistory);
        setText(lastText);
        props.showAlert("Successfully recovered your last text!", "success");
    };

    const [redoTextHistory, updateRedoTextHistory] = useState([]);
    const [undoTextHistory, updateUndoTextHistory] = useState([]);

    const [text, setText] = useState(''); 
    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3"> 
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8" spellCheck="true"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" type="submit" onClick={handleUndoText}>Undo Text</button>            
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleReadAloud}>Read Aloud</button>
            <button
          disabled={redoTextHistory.length === 0}
          className="btn btn-primary mx-1 my-1"
          type="submit"
          onClick={handleRedoText}
        >
          Redo Text
        </button>
        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>
        </div>
        </>
    )
}
