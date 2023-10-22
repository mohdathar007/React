import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(0)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const getBackgroundColor = () => {
    if (length >= 1 && length <= 6) {
      return 'bg-red-500';
    } else if (length >= 7 && length <= 10) {
      return 'bg-orange-500';
    } else if (length > 10 && length <= 100) {
      return 'bg-green-500';
    } else {
      return 'bg-gray-600'; // Default background color
    }
  };

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator,])
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-blue-500 " 
    >

    <div className={` border-white-60 w-full max-w-4xl mx-auto shadow-2xl rounded-lg px-4 py-3 ${getBackgroundColor()} text-white 	`}

    >
      <h1 className='text-white text-center my-12 text-5xl font-bold '>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 text-black">
        <input
            type="text"
            value={password }
            className="outline-none w-full py-1 px-3 text-2xl"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-lg text-white px-3 py-0.5 shrink-0'
        >Copy</button>
        
    </div>

  
    <label  className="block mb-2 text-lg font-medium ">Length: {length}</label>
    <input 
      type="range" 
      min={0}
      max={100}
      value={length } 
      className="w-full h-2 mb-6 rounded-lg appearance-none cursor-pointer  bg-gray-100" onChange={(e) => {setLength(e.target.value)}}></input>
      

    <div className='flex gap-x-5 text-lg' >
      
     <div className="flex items-center gap-x-2">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-2">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
</div>

    
  )
}

export default App