import React from 'react'
import { useState } from 'react'
import { CodeBlock,CopyBlock,dracula } from 'react-code-blocks';

export default function Main() {
    const [htmlUrl, setHtmlUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState('<h1>Made by Faran with Love<h2>');
    const [selectedHtml, setSelectedHtml] = useState('');

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
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-purple-500 to bg-orange-300'>Web Parser</h1>
        <input
        type="text"
        placeholder="Paste HTML URL..."
        className='bg-white w-72 p-4 rounded-full font-light'
        value={htmlUrl}
        onChange={(event)=>setHtmlUrl(event.target.value)}
      />
      <button className='bg-purple-300 px-6 py-3 rounded-full' onClick={fetchHtmlContent}>Submit</button>
         <div>
         <CopyBlock
      text={htmlContent}
      language={"html"}
      showLineNumbers={true}
      wrapLines={true}
      theme={dracula}
      codeBlock
    />     
    </div>
     
    </div>
  )
}
