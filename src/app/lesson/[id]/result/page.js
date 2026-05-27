"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAuth } from '@/supabaseServices/AuthProvider'

function Result() {
    const { id } = useParams()
    const { user, loading } = useAuth()
    const [data, setData] = useState({})

    useEffect(() => {
        if (loading || !user || !id) return;

        async function fetchData() {
            try {
                const res = await fetch(`/api/${id}`);
                const item = await res.json();
                if (item && !item.error) {
                    setData(item)
                } else {
                    console.error("Failed to fetch result details:", item)
                }
            } catch (err) {
                console.error("Error fetching result details:", err)
            }
        }
        fetchData()
    }, [id, loading, user]);

    console.log(data)

    const progress = data.lesson_progress?.[0] ?? {}
    const speed = progress.highest_wpm ?? 0
    const accuracy = progress.highest_accuracy ?? 0
    const stars = progress.stars ?? 0
    return (
        <div className="flex flex-col items-center w-screen h-screen bg-gradient-to-tr from-sky-200 via-sky-300 to-sky-200">
            <div className="flex flex-col justify-center items-center mt-20 w-3/4 h-1/3 bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-400 rounded-md border-2 border-black">
                <p className="text-lg">good typing</p>
                <div className="flex justify-center items-center text-6xl">
                    <p>{stars >= 1 ? "⭐" : "☆"}</p>
                    <p>{stars >= 2 ? "⭐" : "☆"}</p>
                    <p>{stars >= 3 ? "⭐" : "☆"}</p>
                </div>
            </div>
            <p className="text-sm">your speed was {speed || 0} WPM with {Number(accuracy || 0).toFixed(0)}% accuracy</p>
            <div className="flex justify-between w-3/4">


                <Link href={`/lesson/${data.id}`} className="w-1/4 text-center bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-400 rounded-md border-2 border-black">
                    Again
                </Link>


                <Link href={`/lesson/${data.id}nextlesson`} className={`w-1/4 text-center bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-400 rounded-md border-2 border-black`} >
                    Next
                </Link>


            </div>
        </div>
    )
}

export default Result
