import dotenv from 'dotenv'

dotenv.config()

export default function(req, res, next) {
  if(!req.headers['access-key'])return res.status(401).json({ success: false, message: 'Na prístup k týmto informáciam je potrebný klúč' })

  if(req.headers['access-key'] !== process.env['ACCESS_KEY']) return res.status(401).json({ success: false, message: 'Prístupový kľúč je nesprávný' })

  next()
}