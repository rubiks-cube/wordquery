// TODO: content script
import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import DialogBox from "./dialogBox";

const App: React.FC<{}> = () => {
  const [text,setText ] = useState<string|null>(null)
 useEffect(()=>{
  chrome.runtime.onMessage.addListener((msg,sender,senderRes)=>{
     console.log(msg)
     setText(msg.toLowerCase().trim())
  })
  
 },[])
  return (<>
   {text && <DialogBox text={text} onClear={()=>setText(null)}/>}
   </>
  )
} 

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)