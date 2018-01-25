import bcrypt from 'bcryptjs'

export default async password => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return { salt, hash }
}
