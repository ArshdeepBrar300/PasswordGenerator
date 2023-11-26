import { useState,useCallback ,useEffect,useRef} from 'react'
import styles from "./index.css"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState("")
  const [password,setPassword]=useState()

  const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="@#$%&*+-=!"
    for(let i=1;i<=length;i++){
      pass+=str.charAt(Math.floor(Math.random() * str.length+1))
    }    
   setPassword(pass)

  },
  [length,numberAllowed,charAllowed])

  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)},[password])
  useEffect(()=>{
    passwordGenerator()
  },
  [length,numberAllowed,charAllowed])
  return (
    <>
   <div className="w-full max-w-md mx-auto rounded-lg px-4 text-orange-500 py-3 my-8 bg-gray-800">
    <h1 className='text-white text-center'>
      Password Generator
      </h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-2'>
<input type="text" value={password} placeholder='Password' className='outline-none w-full py-1 px-3' readOnly ref={passwordRef}/>
<button className='outline-none bg-blue-500 hover:bg-sky-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipboard}>copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" id="range" min={8} max={50} value={length} className='cursor-pointer'  onChange={(e)=>{setLength(e.target.value)}}/>
      <label htmlFor="range" > Length: {length}</label>
    </div>
    
    <div className='flex items-center gap-x-1'>

      <input type="checkbox" name="numberChecked" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{ setNumberAllowed(prev=>!prev)}} />
      <label htmlFor="numberInput">Numbers</label>
      <input type="checkbox" name="charChecked" defaultChecked={charAllowed} id='charInput' onChange={()=>{ setCharAllowed(prev=>!prev)}} />
      <label htmlFor="charInput">Characters</label>
    </div>
    </div>
      </div>
    </>
  )
}

export default App
