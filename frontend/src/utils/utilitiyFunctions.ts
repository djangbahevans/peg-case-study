export const commaStringsToArray = (val: string): string[] => val.split(",").map(s => s.trim())

export const arrayToCommaStrings = (val: string[]): string => {
  const reduced = val.reduce((prev, curr) => {
    return prev + curr + ","
  }, "")

  return reduced.replace(/,$/, "")
}
