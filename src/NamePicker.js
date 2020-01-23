import React, {useState, useRef} from 'react'
import { FiEdit, FiSave } from 'react-icons/fi'

function NamePicker(props) {
  const [name, setName] = useState('')
  const [editName, setEditName] = useState(true)
  const inputEl = useRef(null)

  function save(){
    inputEl.current.focus()
    if(name && !editName) {
      props.onSave(name)
    }
    setEditName(!editName)
  }
  return <div className="edit-username">
    <input value={name} ref={inputEl}
      className="name-input"
      style={{display: editName ? 'none' : 'flex'}}
      onChange={e=> setName(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') save()
      }}
    />

    {editName && <div>{name}</div>}
    {name==='' && editName && <div>Set Username:</div>}

    <button onClick={save} className="name-button">
      {editName ? <FiEdit /> : <FiSave />}
    </button>
  </div>
}

export default NamePicker