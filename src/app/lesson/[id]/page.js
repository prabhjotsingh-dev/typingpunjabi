"use client"
import Keyboard from '@/components/keyboard'
import React from 'react'
import { useState, useEffect } from 'react'
import Timer from '@/components/timer'


function Character(data) {

    return (<span className={`
       
        ${data.correctTyped === true ? data.unbox === false ? "bg-green-500" : "text-green-500" : ""} 
        ${data.correctTyped === false ? data.unbox === false ? "bg-red-500" : "text-red-500 " : ""} 
        ${data.text === " " && data.currentCharacter ? " border-b-2 border-b-black rounded-none" : ""}
        ${data.text === " " ? "w-3" : ""}
        ${data.unbox === false ? "border-2 border-black px-1 m-1 h-[1.2lh] w-[1lh] rounded-md" : ""}
         text-2xl italic rounded-md`} >
        <span className={` 
                
                ${data.currentCharacter ? "border-b-2 border-b-black" : ""} `}>
            {data.text}
        </span>
    </span>)
}



Character = React.memo(Character)
// Typing=React.memo(Typing)


function Typing({ params }) {

    const row = (x) => {
        let text = `${x[0].repeat(4) + x[1].repeat(4) + x[0].repeat(2) + x[1].repeat(2) + x[0].repeat(2) + x[1].repeat(2) + (x[0] + x[1]).repeat(4)}`

        return text.repeat(2).split("")
    }

    let eng_to_pun_words = { "q": "ੌ", "w": "ੈ", "e": "ਾ", "r": "ੀ", "t": "ੂ", "y": "ਬ", "u": "ਹ", "i": "ਗ", "o": "ਦ", "p": "ਜ", "[": "ਡ", "]": "਼", "a": "ੋ", "s": "ੇ", "d": "੍", "f": "ਿ", "g": "ੁ", "h": "ਪ", "j": "ਰ", "k": "ਕ", "l": "ਤ", ";": "ਚ", "'": "ਟ", "x": "ੰ", "c": "ਮ", "v": "ਨ", "b": "ਵ", "n": "ਲ", "m": "ਸ", "/": "ਯ", "Q": "ਔ", "W": "ਐ", "E": "ਆ", "R": "ਈ", "T": "ਊ", "Y": "ਭ", "U": "ਙ", "I": "ਘ", "O": "ਧ", "P": "ਝ", "{": "ਢ", "}": "ਞ", "A": "ਓ", "S": "ਏ", "D": "ਅ", "F": "ਇ", "G": "ਉ", "H": "ਫ", "J": "ੜ", "K": "ਖ", "L": "ਥ", ":": "ਛ", '"': "ਠ", "X": "ਂ", "C": "ਣ", "V": "ਨ", "B": "ੲ", "N": "ਲ਼", "M": "ਸ਼", "<": ",", ">": "।", "?": "ਯ", "$": "ੱ" };

    const [allCharacters, setAllCharacters] = useState();
    console.log(params.id)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/${params.id}`);
            const { text } = await res.json();
            console.log(text)
            setAllCharacters(Array.isArray(text) ? text : eval(text))
        }


        fetchData()


    }, [params.id]);



    const [noOfCorrectChar, setNoOfCorrectChar] = useState(0)
    const [typed, setTyped] = useState({})
    const [noOfIncorrectChar, setNoOfIncorrectChar] = useState(0)
    const [input, setInput] = useState()
    const [value, setValue] = useState()
    const [start, setStart] = useState(0)
    const [keytype, setKeytype] = useState([true])
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)



    const inputtab = (e) => {
        let punjabi_input = e.target.value
        if ("qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?$".includes(punjabi_input.slice(-1))) {
            punjabi_input = punjabi_input.replace(punjabi_input.slice(-1), x => eng_to_pun_words[x])
        }
        if (e.target.value === "") {
            setValue("")
        } else if (allCharacters[currentCharacterIndex].length <= punjabi_input.length) {
            if (allCharacters[currentCharacterIndex] === punjabi_input) {
                setTyped({ ...typed, [currentCharacterIndex]: true })
                setNoOfCorrectChar(old => old + allCharacters[currentCharacterIndex].length)
            } else {
                setTyped({ ...typed, [currentCharacterIndex]: false })
                setNoOfIncorrectChar(old => old + allCharacters[currentCharacterIndex].length)
            }
            setInput(punjabi_input)
            setValue("")
            setCurrentCharacterIndex(currentCharacterIndex + 1)
        } else {
            setValue(punjabi_input)
            setInput(punjabi_input)
        }
        setKeytype([punjabi_input.slice(-1), punjabi_input.slice(-1) === allCharacters[currentCharacterIndex].slice(punjabi_input.length - 1, punjabi_input.length) ? true : false])

        if (Object.keys(typed).length >= allCharacters.length - 1) {
            setCurrentCharacterIndex(0)
            setTyped({})
            setStart(0)
        }
        if (Object.keys(typed).length >= start + 19) {
            setStart(old => old + 20)
        }
    }

    return (<section className="flex flex-col items-center h-screen pt-10 overflow-auto bg-gradient-to-tr from-sky-200 via-sky-300 to-sky-300 " >

        <section className="flex flex-col w-[70vw] ">
            <div className="flex gap-10">
                <Timer start={noOfCorrectChar + noOfIncorrectChar >= 1}
                    correct={noOfCorrectChar}
                    incorrect={noOfIncorrectChar}
                    id={params.id} />
            </div>
            <input id="typingText" className="w-10 h-0 outline-0" value={value} onChange={(e) => { inputtab(e) }}
                onKeyDown={(e) => {

                    if (e.key === "Backspace" && currentCharacterIndex > 0) {
                        setTyped({ ...typed, [currentCharacterIndex - 1]: null })
                        setCurrentCharacterIndex(currentCharacterIndex - 1)
                        setInput("<<")
                    }
                }} />
            <div className="flex">
                <label htmlFor="typingText" className="flex flex-wrap border-2 border-black rounded-md bg-sky-200 break-words w-[65vw] py-1 px-2" >
                    {allCharacters != null ?
                        allCharacters.slice(start, start + 20).map((Char, i) => {
                            return <Character text={Char}
                                currentCharacter={currentCharacterIndex === start + i}
                                correctTyped={typed[i + start]}
                                unbox={allCharacters.includes(" ")}
                            />
                        }) : "loading...."}</label>
                <section className="flex flex-col justify-items-start ">
                    <p className="border-2 border-black h-10 bg-sky-200 rounded-sm m-1 w-[1lh] overflow-auto">{input}</p>
                    <p className="border-2 border-black h-10 bg-sky-200 rounded-sm m-1 w-[1lh] overflow-auto">{allCharacters != null ? allCharacters[currentCharacterIndex] : ".."}</p>
                </section>
            </div>
        </section>

        <Keyboard className="w-[60vw] h-[16vw] my-10" keyblink={keytype} />

    </section>)
}


export default Typing