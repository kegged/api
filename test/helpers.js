export const omitUserPassWord = user => {
  const cp = { ...user }
  delete cp.passWord
  return cp
}
