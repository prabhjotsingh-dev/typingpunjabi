export const ToProperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const GetStart = (accuracy: number): 0 | 1 | 2 | 3 => {
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;
    if (accuracy >= 50) return 1;
    return 0;
}

export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const parts = [];

  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (sec > 0) parts.push(`${sec}s`);

  return parts.length ? parts.join(" ") : "0s";
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};