import { useState, useEffect } from "react"

import { sortGigTags } from "../services/gig/gig.service.local"


export function Categories({setFilterBy}){
    
    const [ tags,setTags ] = useState(null)
    
    function laodTags(category){
       setTags(sortGigTags[category])
    }

    function handelTagFilter(chosenTag){
       setFilterBy(prev=>({...prev,tag:chosenTag}))
    }


    return <section className="categories-container">
    <div className='categories'>
        <button onClick={()=>laodTags('designAndCreative')}>Design And Creative</button>
        <button onClick={()=>laodTags('webDevelopment')}>Web Development</button>
        <button onClick={()=>laodTags('videoAndAudio')}>Video And Audio</button>
        <button onClick={()=>laodTags('writingAndTranslation')}>Writing And Translation</button>
        <button onClick={()=>laodTags('digitalMarketing')}>Digital Marketing</button>
        {tags && <ul className="tags" onClick={()=>setTags(null)}>
    {tags.map(tag =><li key={tag} onClick={()=>handelTagFilter(tag)}>{tag}</li>)}
    </ul> } 
    </div>
    
    </section>
}