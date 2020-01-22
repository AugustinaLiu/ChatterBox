import React, {useState, useEffect} from 'react'
import './App.css'
import NamePicker from './NamePicker'
import {db} from './db'



function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('Augustina')

  useEffect(()=>{
    db.listen({
      receive: m=> {
        setMessages(current=> [m, ...current])
      },
      remove: id=> {
        setMessages(current=> [...current].filter(m => m.id !== id))
      },
    })
  },[])

  return <main>

    <header> 
      <div className="logo-wrap">
        <img className="logo"
          alt="logo"
          src="https://dcassetcdn.com/design_img/2738551/659842/659842_14945486_2738551_45d1fa94_image.jpg" 
        />
        Chatterbox
      </div>
      <NamePicker onSave={name=>{}} />
    </header>

    <div className="messages">
      {messages.map((m,i)=>{
        return <div key={i} className="message-wrap">
          <div className="message">{m.text}</div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text,name,ts: new Date(),
      })
      /*setMessages([text, ...messages])
      console.log(messages)*/
    }} />

    
  </main>
}


function TextInput(props){
  var [text, setText] = useState('') 
  return <div className="text-input-wrap">
    <input 
      value={text} 
      className="text-input"
      placeholder="write your message"
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />
    <button onClick={()=> {
      if(text) props.onSend(text)
        setText('')}
      } className="button"
      disabled={!text}>
      ↑
    </button>
  </div>
}

export default App

