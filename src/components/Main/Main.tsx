import React from 'react'
import { useState } from 'react'
import { CodeBlock,CopyBlock,dracula } from 'react-code-blocks';

export default function Main() {
    const [htmlUrl, setHtmlUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState('<h1>Made by Faran with Love<h2>');
    const [selectedHtml, setSelectedHtml] = useState('');
    const [tobeParesedContent,settobeParesedContent] = useState('');
    const [ParsingCode,SetParsingCode] = useState("Parsing Code Generated Here!");
    const [csv,setcsv] = useState('CSV generated here!')
    const [csvshown,setCsvShown] = useState(false);
    console.log("Fara",ParsingCode)
   const fetchHtmlContent =  async() => {
    try {
        const response = await fetch(htmlUrl);
        const data = await response.text();
        setHtmlContent(data);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
   }
   console.log("HTML",htmlContent);

  const ProcessElement = async() => {
    let encodedElement = btoa(tobeParesedContent);
    const res = await fetch('http://127.0.0.1:8000' + `/api/element/${encodedElement}`, {
      method: 'GET',
      headers: {
          'ngrok-skip-browser-warning': 'true'
          // 'Origin': window.location.origin,
      }
  })
  const response = await res.json();
  console.log(response)
  SetParsingCode(response.code);
  }

  const RunCode = () => {
   const csv = eval(ParsingCode);
   setcsv(csv);
  }

  return (
    <div className='flex flex-col gap-5 justify-center items-center pb-10'>
        <h1 className='text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-purple-500 to bg-orange-300'>Web Parser</h1>
        <input
        type="text"
        placeholder="Paste HTML URL..."
        className='bg-white w-72 p-4 rounded-full font-light'
        value={htmlUrl}
        onChange={(event)=>setHtmlUrl(event.target.value)}
      />
      <button className='bg-purple-300 px-6 py-3 rounded-full' onClick={fetchHtmlContent}>Submit</button>
         <div className='' style={{fontFamily:'Cutive Mono'}}>
         <CopyBlock
      text={htmlContent}
      language={"html"}
      showLineNumbers={true}
      wrapLines={true}
      theme={dracula}
      codeBlock
    />     
    </div>
    <div className='flex flex-col justify-center items-center gap-4'>
    <label htmlFor="" className='text-4xl'> Paste Code to Generate Pasing Code</label>   
      <textarea name="postContent" rows={4} cols={40} className='bg-gray-800 text-white' onChange={(e)=>settobeParesedContent(e.target.value)}/>
      <button className='bg-purple-300 w-32 px-6 py-3 rounded-full' onClick={ProcessElement}>Submit</button>
      <h1 className='text-4xl'>Parsing Code Generated</h1>
      <CopyBlock
      text={ParsingCode}
      language={"html"}
      showLineNumbers={true}
      wrapLines={true}
      theme={dracula}
      codeBlock
    />     
    <button className='bg-red-600 w-32 px-6 py-3 rounded-full' onClick={RunCode}>Run</button>
    <label htmlFor="" className='text-7xl text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to bg-orange-300 '>CSV</label>
    <CopyBlock
      text={csv}
      language={"html"}
      showLineNumbers={false}
      wrapLines={true}
      theme={dracula}
      codeBlock
    />     
   
    
    </div>   
    </div>

  )
}
