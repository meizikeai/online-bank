function ToThousand(value) {
  return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

function ToPretty(value) {
  return (value || 0).toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1 ')
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function BinaryToBase64(binary) {
  return Buffer.from(binary).toString('base64')
}

function Base64ToBinary(base64) {
  return Buffer.from(base64, 'base64')
}

function HexToBuffer(hexString) {
  return Buffer.from(hexString, 'hex')
}

function BufferToHex(buffer) {
  return buffer.toString('hex')
}

export default {
  BinaryToBase64,
  Base64ToBinary,
  HexToBuffer,
  BufferToHex,
  ToThousand,
  ToPretty,
  Random,
}
