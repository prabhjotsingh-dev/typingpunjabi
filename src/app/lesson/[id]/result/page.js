"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
function Result({ params }) {
    const [data,setData]=useState({})
    
    useEffect(()=>{
        async function fetchData() {
            
            const res = await fetch(`/api/${params.id}`);
            const item = await res.json();
            setData(item)
            
        }
        fetchData()
    },[params.id]);

    console.log(data)

    const { speed , accuracy } = data
    return (
    <div className="flex flex-col items-center w-screen h-screen bg-gradient-to-tr from-sky-200 via-sky-300 to-sky-200">
        <div className="flex flex-col items-center justify-center w-3/4 mt-20 border-2 border-black rounded-md h-1/3 bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-400">
                <p className="text-lg ">good typing</p>
                <div className="flex items-center justify-center text-6xl">
                <p>{accuracy>=40 ? "⭐" : "☆"}</p>
                <p>{accuracy>=70 ? "⭐" : "☆"}</p>
                <p>{accuracy>=90 ? "⭐" : "☆"}</p>
                </div>
            </div>
            <p className="text-sm">your speed was {speed || 0} CPM with {(accuracy || 0).toFixed(0) }% accuracy</p>
            <div className="flex justify-between w-3/4">
            
            
            <Link href={`/lesson/${data.id}`} className="w-1/4 text-center border-2 border-black rounded-md bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-400">
                Again
            </Link>
   
                
            <Link href={`/lesson/${data.id}nextlesson`} className={`bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-400 border-2 border-black rounded-md w-1/4 text-center`} >
                Next
            </Link>
                
            
            </div>
    </div>
  )
}

export default Result
