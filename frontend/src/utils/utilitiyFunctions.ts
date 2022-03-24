export const processHobbies = (val: string): string[] => val.split(",").map(s => s.trim())
