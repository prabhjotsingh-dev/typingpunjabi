"use client"
import Link from 'next/link'
import { useEffect,useState } from 'react'
import { RadioGroup } from '@headlessui/react'

function Aside ({data}){
    const level=["Bignner","Intermediate","Advance"]
    const [plan, setPlan] = useState('Bignner')
    const [show, setShow] = useState(false)
    data(plan)
    
    return(<>
        <aside className={`h-[calc(100svh-2.5lh)] absolute sm:left-0 top-14 -left-32 flex flex-col items-center w-32 sm:w-[20vw] p-2 rounded-r-md border-r-2 text-black sm:translate-x-0 transform transition-transform overflow-scroll hide-scrollbar bg-gradient-to-tr from-sky-300 via-sky-400 to-sky-500 ${ show ? "translate-x-full" : "translate-x-0"}`}>
            <RadioGroup value={plan} onClick={() => setShow(false)} onChange={setPlan} className="w-full rounded-md">
                <RadioGroup.Label >learn <hr/></RadioGroup.Label>
                    {level.map((a)=>
                    <RadioGroup.Option value={a} className="" >
                        {({ checked }) => (
                        <p className={`${checked ? 'bg-blue-400 mr-0 ml-2 text-lg ' : 'bg-slate-300'} m-1 p-2 rounded-md hover:mr-0 hover:ml-2 `}>{a}</p>)}
                    </RadioGroup.Option>
                )}
                <br/>
                <RadioGroup.Label >practice<hr/></RadioGroup.Label>
                    <RadioGroup.Option value="Practice" className="" >
                            {({ checked }) => (
                            <p className={`${checked ? 'bg-blue-400 mr-0 ml-2 text-lg ' : 'bg-slate-300'} m-1 p-2 rounded-md hover:mr-0 hover:ml-2 `}>Practice</p>)}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="test" className="" >
                            {({ checked }) => (
                            <p className={`${checked ? 'bg-blue-400 mr-0 ml-2 text-lg ' : 'bg-slate-300'} m-1 p-2 rounded-md hover:mr-0 hover:ml-2 `}>speed test</p>)}
                    </RadioGroup.Option>
            </RadioGroup>
        </aside>
        <button onClick={ () => setShow(old => old ? false : true)}
            className="absolute w-6 h-6 rounded-md top-7 left-2 sm:h-8 sm:hidden">
            
            <div className="flex flex-col items-center w-full h-full sm:hidden justify-evenly">
                <div className="w-[80%] border-2 border-black rounded-lg"></div>
                <div className={`w-[80%] border-2 border-black rounded-lg`}></div>
                <div className="w-[80%] border-2 border-black rounded-lg"></div>
            </div>
            
        </button>
    </>)
}



export default Aside