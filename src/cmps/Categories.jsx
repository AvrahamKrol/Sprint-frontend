import { useState } from "react"

export function Categories(){
    
    const [ tags,setTags ] = useState()

    return <section>
    <div className='categories'>
        <button>Design And Creative</button>
        <button>Web Development</button>
        <button>Video And Audio</button>
        <button>Writing And Translation</button>
        <button>Digital Marketing</button>
    </div>
    </section>
}