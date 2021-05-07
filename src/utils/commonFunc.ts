export const deepClone = (obj: any) => {
  const temp = JSON.stringify(obj)
  return JSON.parse(temp) || null
}
