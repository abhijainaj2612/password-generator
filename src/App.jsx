import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [specialCharacter, setSpecialCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  const generatePassword = useCallback(()=>{
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass="";
    if(number) str = str + "0123456789";
    if(specialCharacter) str = str + "!@#$%^&*(){}[]~";
    for (let i = 0; i < length; i++) {
      pass = pass + str[Math.floor(Math.random() * str.length)]
    }
    setPassword(pass);
  },[length, number, specialCharacter, setPassword])

  useEffect(()=>{
    generatePassword();
  },[length,specialCharacter,number,generatePassword])

  return (
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-orange-500">
          <h1 className="text-white text-center text-3xl mt-3 mb-5">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              placeholder="password"
              value={password}
              className="outline-none w-full py-1 px-3"
              readOnly
              ref={passwordRef}
            />
            <button 
            onClick={copyToClipboard} 
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 transition-transform duration-300 ease-in-out transform hover:scale-110"
            >
            Copy
            </button>

          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label className='font-medium'>Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={()=>{
                setNumber((prev)=>!prev)
              }}
              />
              <label htmlFor="numberInput" className='font-medium'>Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox"
              defaultChecked={specialCharacter}
              id="specialCharacterInput"
              onChange={()=>{
                setSpecialCharacter((prev)=>!prev)
              }}
              />
              <label 
              htmlFor="specialCharacterInput" className='font-medium'>Special Character</label>
            </div>
          </div>
            <div className='flex justify-center'>
              <button onClick={generatePassword} className=' bg-orange-500 text-white px-5 mt-3 py-2 rounded-full text-lg'>Change</button>
            </div>
        </div>

  )
}

export default App
