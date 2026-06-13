import { useState, useEffect } from "react";

function Keyboard({ className, keyblink }) {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const syncModifiers = (e, nextSet) => {
      if (!e.ctrlKey) { nextSet.delete("ControlLeft"); nextSet.delete("ControlRight"); }
      if (!e.shiftKey) { nextSet.delete("ShiftLeft"); nextSet.delete("ShiftRight"); }
      if (!e.altKey) { nextSet.delete("AltLeft"); nextSet.delete("AltRight"); }
      if (!e.metaKey) { nextSet.delete("MetaLeft"); nextSet.delete("MetaRight"); }
    };

    const handleKeyDown = (e) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        syncModifiers(e, next);
        return next;
      });
    };

    const handleKeyUp = (e) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        syncModifiers(e, next);
        return next;
      });
    };

    const handleClear = () => {
      setPressedKeys(new Set());
    };

    const handleVisibilityChange = () => {
      if (document.hidden) handleClear();
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keyup", handleKeyUp, { capture: true });
    window.addEventListener("blur", handleClear);
    window.addEventListener("focus", handleClear);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
      window.removeEventListener("blur", handleClear);
      window.removeEventListener("focus", handleClear);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getKeyClass = (chars, id) => {
    const isPressed = pressedKeys.has(id);
    
    if (keyblink && keyblink[0] && chars) {
      const isBlinking = Array.isArray(chars) 
        ? chars.includes(keyblink[0])
        : chars.includes(keyblink[0]);
        
      if (isBlinking) {
        return keyblink[1] ? " bg-success " : " bg-destructive ";
      }
    }

    if (isPressed) {
      return id === "Backspace" ? " bg-destructive " : " bg-success ";
    }
    return " ";
  };

  return (
    <>
      <div
        className={`flex flex-wrap justify-between text-[5px] lg:text-sm ${className}`}
      >
        <div id="Backquote" className={`key ${getKeyClass("~`", "Backquote")}`}>
          ~<br />`
        </div>
        <div id="Digit1" className={`key ${getKeyClass("!1", "Digit1")}`}>
          !<br />1
        </div>
        <div id="Digit2" className={`key ${getKeyClass("@2", "Digit2")}`}>
          @<br />2
        </div>
        <div id="Digit3" className={`key ${getKeyClass("#3", "Digit3")}`}>
          #<br />3
        </div>
        <div id="Digit4" className={`key ${getKeyClass("$4", "Digit4")}`}>
          $<br />4
        </div>
        <div id="Digit5" className={`key ${getKeyClass("%5", "Digit5")}`}>
          %<br />5
        </div>
        <div id="Digit6" className={`key ${getKeyClass("^6", "Digit6")}`}>
          ^<br />6
        </div>
        <div id="Digit7" className={`key ${getKeyClass("&7", "Digit7")}`}>
          &<br />7
        </div>
        <div id="Digit8" className={`key ${getKeyClass("*8", "Digit8")}`}>
          *<br />8
        </div>
        <div id="Digit9" className={`key ${getKeyClass("(9", "Digit9")}`}>
          (<br />9
        </div>
        <div id="Digit0" className={`key ${getKeyClass(")0", "Digit0")}`}>
          )<br />0
        </div>
        <div id="Minus" className={`key ${getKeyClass("_-", "Minus")}`}>
          _<br />-
        </div>
        <div id="Equal" className={`key ${getKeyClass("+=", "Equal")}`}>
          +<br />=
        </div>
        <div
          id="Backspace"
          className={`key ${getKeyClass(["Backspace"], "Backspace")} w-[13%]`}
        >
          &#x2190;
        </div>

        <div id="Tab" className={`key ${getKeyClass(["Tab", "\t"], "Tab")} w-[8%]`}>
          Tab
          <hr />
          &#x2190;
          <br />
          &#x2192;
        </div>
        <div id="KeyQ" className={`key ${getKeyClass("qQੌਔ", "KeyQ")}`}>
          Q
        </div>
        <div id="KeyW" className={`key ${getKeyClass("ੈਐ", "KeyW")}`}>
          W
        </div>
        <div id="KeyE" className={`key ${getKeyClass("ਾਆ", "KeyE")}`}>
          E
        </div>
        <div id="KeyR" className={`key ${getKeyClass("ੀਈ", "KeyR")}`}>
          R
        </div>
        <div id="KeyT" className={`key ${getKeyClass("ੂਊ", "KeyT")}`}>
          T
        </div>
        <div id="KeyY" className={`key ${getKeyClass("ਬਭ", "KeyY")}`}>
          Y
        </div>
        <div id="KeyU" className={`key ${getKeyClass("ਹਙ", "KeyU")}`}>
          U
        </div>
        <div id="KeyI" className={`key ${getKeyClass("ਗਘ", "KeyI")}`}>
          I
        </div>
        <div id="KeyO" className={`key ${getKeyClass("ਦਧ", "KeyO")}`}>
          O
        </div>
        <div id="KeyP" className={`key ${getKeyClass("ਝਜ", "KeyP")}`}>
          P
        </div>
        <div id="BracketLeft" className={`key ${getKeyClass("ਡਢ", "BracketLeft")}`}>
          <br />[
        </div>
        <div id="BracketRight" className={`key ${getKeyClass("਼ਞ", "BracketRight")}`}>
          <br />]
        </div>

        <div id="Enter" className={`key ${getKeyClass(["Enter", "\n"], "Enter")} w-[11%]`}>
          Enter
        </div>

        <div id="CapsLock" className={`key ${getKeyClass(["CapsLock"], "CapsLock")} w-[11%]`}>
          CapsLock
        </div>
        <div id="KeyA" className={`key ${getKeyClass("ੋਓ", "KeyA")}`}>
          A
        </div>
        <div id="KeyS" className={`key ${getKeyClass("ੇਏ", "KeyS")}`}>
          S
        </div>
        <div id="KeyD" className={`key ${getKeyClass("੍ਅ", "KeyD")}`}>
          D
        </div>
        <div id="KeyF" className={`key ${getKeyClass("ਿਇ", "KeyF")}`}>
          F
        </div>
        <div id="KeyG" className={`key ${getKeyClass("ੁਉ", "KeyG")}`}>
          G
        </div>
        <div id="KeyH" className={`key ${getKeyClass("ਪਫ", "KeyH")}`}>
          H
        </div>
        <div id="KeyJ" className={`key ${getKeyClass("ਰੜ", "KeyJ")}`}>
          J
        </div>
        <div id="KeyK" className={`key ${getKeyClass("ਖਕ", "KeyK")}`}>
          K
        </div>
        <div id="KeyL" className={`key ${getKeyClass("ਤਥ", "KeyL")}`}>
          L
        </div>
        <div id="Semicolon" className={`key ${getKeyClass("ਛਚ", "Semicolon")}`}>
          :<br />;
        </div>
        <div id="Quote" className={`key ${getKeyClass("ਟਠ", "Quote")}`}>
          "<br />'
        </div>
        <div id="Backslash" className={`key ${getKeyClass("|\\", "Backslash")}`}>
          |<br />\
        </div>

        <div id="key13_1" className={`key ${getKeyClass(["Enter"], "key13_1")} w-[8.5%]`}>
          &#9166;
        </div>

        <div
          id="ShiftLeft"
          className={`key ${getKeyClass(["Shift"], "ShiftLeft")} w-[13%]`}
        >
          Shift
        </div>
        <div id="KeyZ" className={`key ${getKeyClass("Zz", "KeyZ")}`}>
          Z
        </div>
        <div id="KeyX" className={`key ${getKeyClass("ੰਂ", "KeyX")}`}>
          X
        </div>
        <div id="KeyC" className={`key ${getKeyClass("ਮਣ", "KeyC")}`}>
          C
        </div>
        <div id="KeyV" className={`key ${getKeyClass("ਨ", "KeyV")}`}>
          V
        </div>
        <div id="KeyB" className={`key ${getKeyClass("ਵੲ", "KeyB")}`}>
          B
        </div>
        <div id="KeyN" className={`key ${getKeyClass("ਲਲ਼", "KeyN")}`}>
          N
        </div>
        <div id="KeyM" className={`key ${getKeyClass("ਸਸ਼", "KeyM")}`}>
          M
        </div>
        <div id="Comma" className={`key ${getKeyClass(",", "Comma")}`}>
          <br />,
        </div>
        <div id="Period" className={`key ${getKeyClass(".।", "Period")}`}>
          <br />.
        </div>
        <div id="Slash" className={`key ${getKeyClass("ਯ/?", "Slash")}`}>
          ?<br />/
        </div>

        <div
          id="ShiftRight"
          className={`key ${getKeyClass(["Shift"], "ShiftRight")} w-[19.5%]`}
        >
          Shift
        </div>

        <div
          id="ControlLeft"
          className={`key ${getKeyClass(["Control"], "ControlLeft")} w-[7.5%]`}
        >
          Ctrl
        </div>
        <div
          id="MetaLeft"
          className={`key ${getKeyClass(["Meta"], "MetaLeft")} w-[7.5%]`}
        ></div>
        <div id="AltLeft" className={`key ${getKeyClass(["Alt"], "AltLeft")} w-[7.5%]`}>
          Alt
        </div>
        <div
          id="Space"
          className={`key ${getKeyClass([" "], "Space")} w-[46.5%]`}
        ></div>
        <div
          id="AltRight"
          className={`key ${getKeyClass(["AltGraph", "Alt"], "AltRight")} w-[7.5%]`}
        >
          Alt
        </div>
        <div
          id="MetaRight"
          className={`key ${getKeyClass(["Meta"], "MetaRight")} w-[7.5%]`}
        ></div>
        <div
          id="ContextMenu"
          className={`key ${getKeyClass(["ContextMenu"], "ContextMenu")} w-[7.5%]`}
        ></div>
        <div
          id="ControlRight"
          className={`key ${getKeyClass(["Control"], "ControlRight")} w-[7.5%]`}
        >
          Ctrl
        </div>
      </div>
    </>
  );
}

export default Keyboard;
