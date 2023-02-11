import dotenv from 'dotenv'

dotenv.config()

export function login(req, res) {
  const { username, password } = req.body

  if(!username && !password) return res.status(400).json({ success: false, message: 'Chýba meno alebo heslo' })

  if(username !== 'admin' || password !== 'admin') return res.status(400).json({ success: false, message: 'Zlé meno alebo heslo' })

  res.json({ success: true, message: 'Úspešné prihlásenie', key: process.env['ACCESS_KEY'] })
}