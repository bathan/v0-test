export function getPort(): number {
  return parseInt(process.env.PORT || '3000', 10)
}
