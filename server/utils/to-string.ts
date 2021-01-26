export function toThousand(value: number) {
  return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export function toPretty(value: number) {
  return (value || 0).toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1 ')
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
