import React from "react";

const Character = React.memo(function Character({
  text,
  currentCharacter,
  correctTyped,
  unbox,
}: {
  text: string;
  currentCharacter: boolean;
  correctTyped?: boolean | null;
  unbox: boolean;
}) {
  const isBoxed = !unbox;

  if (isBoxed) {
    let boxStyles = "bg-card border border-border text-muted-foreground";
    if (correctTyped === true)
      boxStyles = "bg-success text-white border-success shadow-sm";
    if (correctTyped === false)
      boxStyles = "bg-destructive/10 border-destructive/20 text-destructive";

    let currentStyles = currentCharacter
      ? "ring-2 ring-foreground/20 ring-offset-2 border-border scale-[1.02]"
      : "";

    return (
      <span
        className={`inline-flex items-center justify-center min-w-[3rem] h-[3.5rem] px-2 m-1.5 rounded-xl text-3xl font-medium transition-all duration-200 ${boxStyles} ${currentStyles}`}
      >
        {text}
      </span>
    );
  }

  let textStyles = "text-muted-foreground/60 h-[3.5rem]";
  if (correctTyped === true) textStyles = "text-success font-medium";
  if (correctTyped === false)
    textStyles = "text-destructive bg-destructive/10 rounded-sm";

  let currentStyles = currentCharacter
    ? "border-b-[3px] border-foreground pb-0.5"
    : "";
  let spaceStyles = text === " " ? "w-[1.2ch] inline-block" : "";

  return (
    <span
      className={`text-4xl tracking-wide leading-relaxed transition-colors duration-150 md:text-5xl ${textStyles} ${spaceStyles} ${currentStyles}`}
    >
      {text}
    </span>
  );
});

export default Character;
