"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Timer(data){
    // var { time, setTime, setSpeed ,setAccuracy} = useStore()
    const [time,setTime]=useState(0)
    
    const [i,setI] = useState(null)
    useEffect(()=>{if(data.start){
        const id =setInterval(()=>{
                setTime(old=>old+1)
            },1000)
        console.log(id)
        return ()=>clearInterval(id)
                
        }},[data.start])
        
    if (time>=180){
        const putdata = async () => {
            await fetch(`/api/${data.id}`,{
                method: "PUT",
                body: JSON.stringify({"speed":((data.correct+data.incorrect)/(time/60) || 0).toFixed(1),"accuracy":(data.correct/(data.correct+data.incorrect))*100})})
        }
        putdata()
        const router = useRouter()
        router.push(`/lesson/${data.id}/result`)  
    }
    
    return (<>
                <p className={`${data.timeClass} h-[1lh]`} >Time:{time>=60 ? Math.trunc(time/60)+":"+time%60+"m" : time+"s"}</p>
                <p className={` ${data.speedClass} h-[1lh]`} >speed:{((data.correct+data.incorrect)/(time/60) || 0).toFixed(1) } cpm</p>
    </>)
}

export default Timer