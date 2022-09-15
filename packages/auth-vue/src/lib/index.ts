export const isTokenExpired = (expireTime: number) => {
  const exp = expireTime * 1000
  return Date.now() > exp
}
