function Keyboard({className,keyblink}){
    return (<>
        <p>{keyblink[0]+"  "+keyblink[1]}</p>
        <div className={`flex flex-wrap justify-between text-[5px] lg:text-sm ${className}`}>
            <div id="Backquote" className={`key ${"~`".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
                ~<br />` 
            </div>
            <div id="Digit1" className={`key ${"!1".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
                !<br />1
            </div>
            <div id="Digit2" className={`key ${"@2".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
                @<br />2
            </div>
            <div id="Digit3" className={`key ${"#3".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
                #<br />3
            </div>
            <div id="Digit4" className={`key ${"$4".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            $<br />4
            </div>
            <div id="Digit5" className={`key ${"%5".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            %<br />5
            </div>
            <div id="Digit6" className={`key ${"^6".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            ^<br />6
            </div>
            <div id="Digit7" className={`key ${"&7".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            &<br />7
            </div>
            <div id="Digit8" className={`key ${"*8".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            *<br />8
            </div>
            <div id="Digit9" className={`key ${"(9".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            (<br />9
            </div>
            <div id="Digit0" className={`key ${")0".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            )<br />0
            </div>
            <div id="Minus" className={`key ${"_-".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            _<br />-
            </div>
            <div id="Equal" className={`key ${"+=".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`}>
            +<br />=
            </div>
            <div id="Backspace" className={`key ${" ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[13%]`}>
            &#x2190;
            </div>
            
            <div className={`key ${"    ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[8%]`} id="Tab">
            Tab<hr />&#x2190;<br />&#x2192;
            </div>
            <div className={`key ${"qQੌਔ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyQ">
            Q
            </div>
            <div className={`key ${"ੈਐ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyW">
            W
            </div>
            <div className={`key ${"ਾਆ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyE">
            E
            </div>
            <div className={`key ${"ੀਈ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyR">
            R
            </div>
            <div className={`key ${"ੂਊ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyT">
            T
            </div>
            <div className={`key ${"ਬਭ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyY">
            Y
            </div>
            <div className={`key ${"ਹਙ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyU">
            U
            </div>
            <div className={`key ${"ਗਘ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyI">
            I
            </div>
            <div className={`key ${"ਦਧ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyO">
            O
            </div>
            <div className={`key ${"ਝਜ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyP">
            P
            </div>
            <div className={`key ${"ਡਢ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="BracketLeft">
            <br />[
            </div>
            <div className={`key ${"਼ਞ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="BracketRight">
            <br />]
            </div>
            
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[11%]`} id="Enter">
            Enter
            </div>
            
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[11%]`} id="CapsLock">
            CapsLock
            </div>
            <div className={`key ${"ੋਓ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyA">
            A
            </div>
            <div className={`key ${"ੇਏ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyS">
            S
            </div>
            <div className={`key ${"੍ਅ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyD">
            D
            </div>
            <div className={`key ${"ਿਇ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyF">
            F
            </div>
            <div className={`key ${"ੁਉ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyG">
            G
            </div>
            <div className={`key ${"ਪਫ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyH">
            H
            </div>
            <div className={`key ${"ਰੜ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyJ">
            J
            </div>
            <div className={`key ${"ਖਕ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyK">
            K
            </div>
            <div className={`key ${"ਤਥ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyL">
            L
            </div>
            <div className={`key ${"ਛਚ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="Semicolon">
            :<br />;
            </div>
            <div className={`key ${"ਟਠ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="Quote">
            "<br />'
            </div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="Backslash">
            |<br />\
            </div>
            
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[8.5%]`} id="key13_1">
            &#9166;
            </div>
            
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[13%]`} id="ShiftLeft">
            Shift
            </div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyZ">
            Z
            </div>
            <div className={`key ${"ੰਂ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyX">
            X
            </div>
            <div className={`key ${"ਮਣ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyC">
            C
            </div>
            <div className={`key ${"ਨ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyV">
            V
            </div>
            <div className={`key ${"ਵੲ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyB">
            B
            </div>
            <div className={`key ${"ਲਲ਼".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyN">
            N
            </div>
            <div className={`key ${"ਸਸ਼".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="KeyM">
            M
            </div>
            <div className={`key ${",".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="Comma">
            <br />,
            </div>
            <div className={`key ${".।".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="Period">
            <br />.
            </div>
            <div className={`key ${"ਯ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "}`} id="Slash">
            ?<br />/
            </div>
            
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[19.5%]`} id="ShiftRight">
            Shift
            </div>
            
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="ControlLeft">
            Ctrl
            </div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="MetaLeft"></div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="AltLeft">
            Alt
            </div>
            <div className={`key ${" ".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[46.5%]`} id="Space"></div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="AltRight">Alt</div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="MetaRight"></div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="ContextMenu"></div>
            <div className={`key ${"".includes(keyblink[0]) ? `${ keyblink[1] ? " bg-green-300" : "bg-red-300" }` : " "} w-[7.5%]`} id="ControlRight">Ctrl</div>
</div>
        </>)
}
export default Keyboard