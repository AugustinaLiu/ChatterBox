import React, {useState} from 'react';
import './App.css';

function App() {
  var [outputs, setOutputs] = useState([])

  return <main>

    <header> 
      <img className="logo"
        src="https://previews.123rf.com/images/sabelskaya/sabelskaya1704/sabelskaya170400204/75484604-red-and-green-logo-template-with-stylized-watermelon-slice-with-two-bites-vector-illustration-isolat.jpg"
      />
      Chatter Box 
    </header>
    <div className="output-container">
      {outputs.map(output=> <TextOutput text={output}/>)}
    </div>
    {/* message */}

    <TextInput onSend={newOutput=>setOutputs(prevState=>[
      ...prevState, newOutput
    ])} /> {/*custom element*/}

  </main>
}

function TextInput(props){
  var [text, setText] = useState('')

  return (
    <div className="text-input">
      <input value={text} className="input"
        placeholder="write your message"
        onChange={e=> setText(e.target.value)}
      />
      <button onClick ={()=>{ 
        props.onSend(text)
        setText('')
      }}>
        ↑
      </button>
    </div>
  );
}

function TextOutput(props){
  return(
    <div className="text-output">
      {props.text}
    </div>
  )
}


export default App;
