import { useState, useEffect } from "react";
import { KEYBOARD_KEYS } from "./keys";

interface KeyboardProps {
  className?: string;
  keyblink?: [string, boolean] | null;
}

function Keyboard({ className = "", keyblink }: KeyboardProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const syncModifiers = (e: KeyboardEvent, nextSet: Set<string>) => {
      if (!e.ctrlKey) {
        nextSet.delete("ControlLeft");
        nextSet.delete("ControlRight");
      }
      if (!e.shiftKey) {
        nextSet.delete("ShiftLeft");
        nextSet.delete("ShiftRight");
      }
      if (!e.altKey) {
        nextSet.delete("AltLeft");
        nextSet.delete("AltRight");
      }
      if (!e.metaKey) {
        nextSet.delete("MetaLeft");
        nextSet.delete("MetaRight");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        syncModifiers(e, next);
        return next;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
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

  const getKeyClass = (chars: string | string[], id: string) => {
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
    <div
      className={`flex flex-wrap justify-between ${className}`}
    >
      {KEYBOARD_KEYS.map(({ id, chars, className: keyClassName, show }) => (
        <div
          key={id}
          id={id}
          className={`key ${getKeyClass(chars, id)} ${keyClassName}`.trim()}
        >
          {show}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
