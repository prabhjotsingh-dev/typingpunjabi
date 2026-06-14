import React from "react";
import {
  Delete,
  CornerDownLeft,
  ArrowBigUp,
  ArrowLeftRight,
  MonitorUp,
} from "lucide-react";

interface KeyConfig {
  id: string;
  chars: string | string[];
  className: string;
  show: React.ReactNode;
}

const DualKey = ({
  en,
  pb1,
  pb2,
}: {
  en: string;
  pb1: string;
  pb2?: string;
}) => (
  <div className="flex relative justify-center items-center w-full h-full">
    <span
      style={{ fontSize: "18cqh", lineHeight: 1 }}
      className="absolute top-[8%] right-[8%] text-text-muted font-sans font-medium"
    >
      {en}
    </span>
    <div
      className="flex flex-col items-center w-full"
      style={{ lineHeight: 1, gap: "5cqh", marginTop: "10cqh" }}
    >
      {pb2 && <span className="mr-[38%]" style={{ fontSize: "22cqh", opacity: 0.8 }}>{pb2}</span>}
      <span className="ml-[30%]" style={{ fontSize: "30cqh" }}>{pb1}</span>
    </div>
  </div>
);

const NumKey = ({ top, bottom }: { top: string; bottom: string }) => (
  <div
    className="flex flex-col justify-center items-center font-sans text-text"
    style={{ lineHeight: 1, gap: "8cqh" }}
  >
    <span style={{ fontSize: "25cqh", opacity: 0.8 }}>{top}</span>
    <span style={{ fontSize: "38cqh" }}>{bottom}</span>
  </div>
);

const ModKey = ({ text, icon }: { text?: string; icon?: React.ReactNode }) => (
  <div
    className="flex justify-center items-center font-sans text-text"
    style={{ gap: "4cqh" }}
  >
    {icon && <span className="flex">{icon}</span>}
    {text && (
      <span
        style={{
          fontSize: text.length > 4 ? "20cqh" : "26cqh",
          lineHeight: 1,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    )}
  </div>
);

export const KEYBOARD_KEYS: KeyConfig[] = [
  // Numbers row
  {
    id: "Backquote",
    chars: "~`",
    className: "",
    show: <NumKey top="~" bottom="`" />,
  },
  {
    id: "Digit1",
    chars: "!1",
    className: "",
    show: <NumKey top="!" bottom="1" />,
  },
  {
    id: "Digit2",
    chars: "@2",
    className: "",
    show: <NumKey top="@" bottom="2" />,
  },
  {
    id: "Digit3",
    chars: "#3",
    className: "",
    show: <NumKey top="#" bottom="3" />,
  },
  {
    id: "Digit4",
    chars: "$4",
    className: "",
    show: <NumKey top="$" bottom="4" />,
  },
  {
    id: "Digit5",
    chars: "%5",
    className: "",
    show: <NumKey top="%" bottom="5" />,
  },
  {
    id: "Digit6",
    chars: "^6",
    className: "",
    show: <NumKey top="^" bottom="6" />,
  },
  {
    id: "Digit7",
    chars: "&7",
    className: "",
    show: <NumKey top="&" bottom="7" />,
  },
  {
    id: "Digit8",
    chars: "*8",
    className: "",
    show: <NumKey top="*" bottom="8" />,
  },
  {
    id: "Digit9",
    chars: "(9",
    className: "",
    show: <NumKey top="(" bottom="9" />,
  },
  {
    id: "Digit0",
    chars: ")0",
    className: "",
    show: <NumKey top=")" bottom="0" />,
  },
  {
    id: "Minus",
    chars: "_-",
    className: "",
    show: <NumKey top="_" bottom="-" />,
  },
  {
    id: "Equal",
    chars: "+=",
    className: "",
    show: <NumKey top="+" bottom="=" />,
  },
  {
    id: "Backspace",
    chars: ["Backspace"],
    className: "w-[13%]",
    show: <ModKey text="Back" icon={<Delete size={10} />} />,
  },

  // Row 1
  {
    id: "Tab",
    chars: ["Tab", "\t"],
    className: "w-[8%]",
    show: <ModKey text="Tab" icon={<ArrowLeftRight size={10} />} />,
  },
  {
    id: "KeyQ",
    chars: "qQੌਔ",
    className: "",
    show: <DualKey en="Q" pb1="ੌ" pb2="ਔ" />,
  },
  {
    id: "KeyW",
    chars: "ੈਐ",
    className: "",
    show: <DualKey en="W" pb1="ੈ" pb2="ਐ" />,
  },
  {
    id: "KeyE",
    chars: "ਾਆ",
    className: "",
    show: <DualKey en="E" pb1="ਾ" pb2="ਆ" />,
  },
  {
    id: "KeyR",
    chars: "ੀਈ",
    className: "",
    show: <DualKey en="R" pb1="ੀ" pb2="ਈ" />,
  },
  {
    id: "KeyT",
    chars: "ੂਊ",
    className: "",
    show: <DualKey en="T" pb1="ੂ" pb2="ਊ" />,
  },
  {
    id: "KeyY",
    chars: "ਬਭ",
    className: "",
    show: <DualKey en="Y" pb1="ਬ" pb2="ਭ" />,
  },
  {
    id: "KeyU",
    chars: "ਹਙ",
    className: "",
    show: <DualKey en="U" pb1="ਹ" pb2="ਙ" />,
  },
  {
    id: "KeyI",
    chars: "ਗਘ",
    className: "",
    show: <DualKey en="I" pb1="ਗ" pb2="ਘ" />,
  },
  {
    id: "KeyO",
    chars: "ਦਧ",
    className: "",
    show: <DualKey en="O" pb1="ਦ" pb2="ਧ" />,
  },
  {
    id: "KeyP",
    chars: "ਝਜ",
    className: "",
    show: <DualKey en="P" pb1="ਜ" pb2="ਝ" />,
  },
  {
    id: "BracketLeft",
    chars: "ਡਢ",
    className: "",
    show: <DualKey en="[" pb1="ਡ" pb2="ਢ" />,
  },
  {
    id: "BracketRight",
    chars: "਼ਞ",
    className: "",
    show: <DualKey en="]" pb1="਼" pb2="ਞ" />,
  },
  {
    id: "Enter",
    chars: ["Enter", "\n"],
    className: "w-[11%]",
    show: <ModKey text="Enter" icon={<CornerDownLeft size={10} />} />,
  },

  // Row 2
  {
    id: "CapsLock",
    chars: ["CapsLock"],
    className: "w-[11%]",
    show: <ModKey text="Caps" icon={<MonitorUp size={10} />} />,
  },
  {
    id: "KeyA",
    chars: "ੋਓ",
    className: "",
    show: <DualKey en="A" pb1="ੋ" pb2="ਓ" />,
  },
  {
    id: "KeyS",
    chars: "ੇਏ",
    className: "",
    show: <DualKey en="S" pb1="ੇ" pb2="ਏ" />,
  },
  {
    id: "KeyD",
    chars: "੍ਅ",
    className: "",
    show: <DualKey en="D" pb1="੍" pb2="ਅ" />,
  },
  {
    id: "KeyF",
    chars: "ਿਇ",
    className: "",
    show: <DualKey en="F" pb1="ਿ" pb2="ਇ" />,
  },
  {
    id: "KeyG",
    chars: "ੁਉ",
    className: "",
    show: <DualKey en="G" pb1="ੁ" pb2="ਉ" />,
  },
  {
    id: "KeyH",
    chars: "ਪਫ",
    className: "",
    show: <DualKey en="H" pb1="ਪ" pb2="ਫ" />,
  },
  {
    id: "KeyJ",
    chars: "ਰੜ",
    className: "",
    show: <DualKey en="J" pb1="ਰ" pb2="ੜ" />,
  },
  {
    id: "KeyK",
    chars: "ਖਕ",
    className: "",
    show: <DualKey en="K" pb1="ਕ" pb2="ਖ" />,
  },
  {
    id: "KeyL",
    chars: "ਤਥ",
    className: "",
    show: <DualKey en="L" pb1="ਤ" pb2="ਥ" />,
  },
  {
    id: "Semicolon",
    chars: "ਛਚ",
    className: "",
    show: <DualKey en=";" pb1="ਚ" pb2="ਛ" />,
  },
  {
    id: "Quote",
    chars: "ਟਠ",
    className: "",
    show: <DualKey en="'" pb1="ਟ" pb2="ਠ" />,
  },
  {
    id: "Backslash",
    chars: "|\\",
    className: "",
    show: <NumKey top="|" bottom="\" />,
  },
  {
    id: "key13_1",
    chars: ["Enter"],
    className: "w-[8.5%]",
    show: <ModKey icon={<CornerDownLeft size={10} />} />,
  },

  // Row 3
  {
    id: "ShiftLeft",
    chars: ["Shift"],
    className: "w-[13%]",
    show: <ModKey text="Shift" icon={<ArrowBigUp size={10} />} />,
  },
  { id: "KeyZ", chars: "Zz", className: "", show: <DualKey en="Z" pb1="z" /> },
  {
    id: "KeyX",
    chars: "ੰਂ",
    className: "",
    show: <DualKey en="X" pb1="ੰ" pb2="ਂ" />,
  },
  {
    id: "KeyC",
    chars: "ਮਣ",
    className: "",
    show: <DualKey en="C" pb1="ਮ" pb2="ਣ" />,
  },
  { id: "KeyV", chars: "ਨ", className: "", show: <DualKey en="V" pb1="ਨ" /> },
  {
    id: "KeyB",
    chars: "ਵੲ",
    className: "",
    show: <DualKey en="B" pb1="ਵ" pb2="ੲ" />,
  },
  {
    id: "KeyN",
    chars: "ਲਲ਼",
    className: "",
    show: <DualKey en="N" pb1="ਲ" pb2="ਲ਼" />,
  },
  {
    id: "KeyM",
    chars: "ਸਸ਼",
    className: "",
    show: <DualKey en="M" pb1="ਸ" pb2="ਸ਼" />,
  },
  {
    id: "Comma",
    chars: ",",
    className: "",
    show: <NumKey top="<" bottom="," />,
  },
  {
    id: "Period",
    chars: ".।",
    className: "",
    show: <DualKey en="." pb1="।" />,
  },
  {
    id: "Slash",
    chars: "ਯ/?",
    className: "",
    show: <DualKey en="/" pb1="ਯ" pb2="?" />,
  },
  {
    id: "ShiftRight",
    chars: ["Shift"],
    className: "w-[19.5%]",
    show: <ModKey text="Shift" icon={<ArrowBigUp size={10} />} />,
  },

  // Bottom row
  {
    id: "ControlLeft",
    chars: ["Control"],
    className: "w-[7.5%]",
    show: <ModKey text="Ctrl" />,
  },
  {
    id: "MetaLeft",
    chars: ["Meta"],
    className: "w-[7.5%]",
    show: <ModKey text="Win" />,
  },
  {
    id: "AltLeft",
    chars: ["Alt"],
    className: "w-[7.5%]",
    show: <ModKey text="Alt" />,
  },
  { id: "Space", chars: [" "], className: "w-[46.5%]", show: null },
  {
    id: "AltRight",
    chars: ["AltGraph", "Alt"],
    className: "w-[7.5%]",
    show: <ModKey text="Alt" />,
  },
  {
    id: "MetaRight",
    chars: ["Meta"],
    className: "w-[7.5%]",
    show: <ModKey text="Win" />,
  },
  {
    id: "ContextMenu",
    chars: ["ContextMenu"],
    className: "w-[7.5%]",
    show: <ModKey text="Menu" />,
  },
  {
    id: "ControlRight",
    chars: ["Control"],
    className: "w-[7.5%]",
    show: <ModKey text="Ctrl" />,
  },
];
