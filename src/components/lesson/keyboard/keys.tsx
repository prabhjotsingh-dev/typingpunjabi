interface KeyConfig {
  id: string;
  chars: string | string[];
  className: string;
  show: React.ReactNode;
}

export const KEYBOARD_KEYS: KeyConfig[] = [
  {
    id: "Backquote",
    chars: "~`",
    className: "",
    show: (
      <>
        ~<br />`
      </>
    ),
  },
  {
    id: "Digit1",
    chars: "!1",
    className: "",
    show: (
      <>
        !<br />1
      </>
    ),
  },
  {
    id: "Digit2",
    chars: "@2",
    className: "",
    show: (
      <>
        @<br />2
      </>
    ),
  },
  {
    id: "Digit3",
    chars: "#3",
    className: "",
    show: (
      <>
        #<br />3
      </>
    ),
  },
  {
    id: "Digit4",
    chars: "$4",
    className: "",
    show: (
      <>
        $<br />4
      </>
    ),
  },
  {
    id: "Digit5",
    chars: "%5",
    className: "",
    show: (
      <>
        %<br />5
      </>
    ),
  },
  {
    id: "Digit6",
    chars: "^6",
    className: "",
    show: (
      <>
        ^<br />6
      </>
    ),
  },
  {
    id: "Digit7",
    chars: "&7",
    className: "",
    show: (
      <>
        &amp;
        <br />7
      </>
    ),
  },
  {
    id: "Digit8",
    chars: "*8",
    className: "",
    show: (
      <>
        *<br />8
      </>
    ),
  },
  {
    id: "Digit9",
    chars: "(9",
    className: "",
    show: (
      <>
        (<br />9
      </>
    ),
  },
  {
    id: "Digit0",
    chars: ")0",
    className: "",
    show: (
      <>
        )<br />0
      </>
    ),
  },
  {
    id: "Minus",
    chars: "_-",
    className: "",
    show: (
      <>
        _<br />-
      </>
    ),
  },
  {
    id: "Equal",
    chars: "+=",
    className: "",
    show: (
      <>
        +<br />=
      </>
    ),
  },
  {
    id: "Backspace",
    chars: ["Backspace"],
    className: "w-[13%]",
    show: <>&#x2190;</>,
  },
  {
    id: "Tab",
    chars: ["Tab", "\t"],
    className: "w-[8%]",
    show: (
      <>
        Tab
        <hr />
        &#x2190;
        <br />
        &#x2192;
      </>
    ),
  },
  { id: "KeyQ", chars: "qQੌਔ", className: "", show: "Q" },
  { id: "KeyW", chars: "ੈਐ", className: "", show: "W" },
  { id: "KeyE", chars: "ਾਆ", className: "", show: "E" },
  { id: "KeyR", chars: "ੀਈ", className: "", show: "R" },
  { id: "KeyT", chars: "ੂਊ", className: "", show: "T" },
  { id: "KeyY", chars: "ਬਭ", className: "", show: "Y" },
  { id: "KeyU", chars: "ਹਙ", className: "", show: "U" },
  { id: "KeyI", chars: "ਗਘ", className: "", show: "I" },
  { id: "KeyO", chars: "ਦਧ", className: "", show: "O" },
  { id: "KeyP", chars: "ਝਜ", className: "", show: "P" },
  {
    id: "BracketLeft",
    chars: "ਡਢ",
    className: "",
    show: (
      <>
        <br />[
      </>
    ),
  },
  {
    id: "BracketRight",
    chars: "਼ਞ",
    className: "",
    show: (
      <>
        <br />]
      </>
    ),
  },
  { id: "Enter", chars: ["Enter", "\n"], className: "w-[11%]", show: "Enter" },
  {
    id: "CapsLock",
    chars: ["CapsLock"],
    className: "w-[11%]",
    show: "CapsLock",
  },
  { id: "KeyA", chars: "ੋਓ", className: "", show: "A" },
  { id: "KeyS", chars: "ੇਏ", className: "", show: "S" },
  { id: "KeyD", chars: "੍ਅ", className: "", show: "D" },
  { id: "KeyF", chars: "ਿਇ", className: "", show: "F" },
  { id: "KeyG", chars: "ੁਉ", className: "", show: "G" },
  { id: "KeyH", chars: "ਪਫ", className: "", show: "H" },
  { id: "KeyJ", chars: "ਰੜ", className: "", show: "J" },
  { id: "KeyK", chars: "ਖਕ", className: "", show: "K" },
  { id: "KeyL", chars: "ਤਥ", className: "", show: "L" },
  {
    id: "Semicolon",
    chars: "ਛਚ",
    className: "",
    show: (
      <>
        :<br />;
      </>
    ),
  },
  {
    id: "Quote",
    chars: "ਟਠ",
    className: "",
    show: (
      <>
        &quot;
        <br />
        &apos;
      </>
    ),
  },
  {
    id: "Backslash",
    chars: "|\\",
    className: "",
    show: (
      <>
        |<br />\
      </>
    ),
  },
  {
    id: "key13_1",
    chars: ["Enter"],
    className: "w-[8.5%]",
    show: <>&#9166;</>,
  },
  { id: "ShiftLeft", chars: ["Shift"], className: "w-[13%]", show: "Shift" },
  { id: "KeyZ", chars: "Zz", className: "", show: "Z" },
  { id: "KeyX", chars: "ੰਂ", className: "", show: "X" },
  { id: "KeyC", chars: "ਮਣ", className: "", show: "C" },
  { id: "KeyV", chars: "ਨ", className: "", show: "V" },
  { id: "KeyB", chars: "ਵੲ", className: "", show: "B" },
  { id: "KeyN", chars: "ਲਲ਼", className: "", show: "N" },
  { id: "KeyM", chars: "ਸਸ਼", className: "", show: "M" },
  {
    id: "Comma",
    chars: ",",
    className: "",
    show: (
      <>
        <br />,
      </>
    ),
  },
  {
    id: "Period",
    chars: ".।",
    className: "",
    show: (
      <>
        <br />.
      </>
    ),
  },
  {
    id: "Slash",
    chars: "ਯ/?",
    className: "",
    show: (
      <>
        ?<br />/
      </>
    ),
  },
  { id: "ShiftRight", chars: ["Shift"], className: "w-[19.5%]", show: "Shift" },
  {
    id: "ControlLeft",
    chars: ["Control"],
    className: "w-[7.5%]",
    show: "Ctrl",
  },
  { id: "MetaLeft", chars: ["Meta"], className: "w-[7.5%]", show: null },
  { id: "AltLeft", chars: ["Alt"], className: "w-[7.5%]", show: "Alt" },
  { id: "Space", chars: [" "], className: "w-[46.5%]", show: null },
  {
    id: "AltRight",
    chars: ["AltGraph", "Alt"],
    className: "w-[7.5%]",
    show: "Alt",
  },
  { id: "MetaRight", chars: ["Meta"], className: "w-[7.5%]", show: null },
  {
    id: "ContextMenu",
    chars: ["ContextMenu"],
    className: "w-[7.5%]",
    show: null,
  },
  {
    id: "ControlRight",
    chars: ["Control"],
    className: "w-[7.5%]",
    show: "Ctrl",
  },
];
