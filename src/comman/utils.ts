export const ToProperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const GetStart = (accuracy: number): 0 | 1 | 2 | 3 => {
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;
    if (accuracy >= 50) return 1;
    return 0;
}