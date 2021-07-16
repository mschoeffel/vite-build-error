export const copyObjectByValues = (obj: unknown): unknown => {
  return JSON.parse(JSON.stringify(obj))
}
