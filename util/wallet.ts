export function truncateAddress(
  address: string,
  visibleFirst: number = 8,
  visibleLast: number = 4
) {
  return `${address.substring(0, visibleFirst)}...${address.substring(
    address.length - visibleLast,
    address.length
  )}`
}
