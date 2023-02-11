import express from 'express'

import { getAllRecords, postNewRecord, removeAllRecords, removeRecord } from '../controllers/temp.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/all', auth, getAllRecords)
router.post('/new', auth, postNewRecord)
router.delete('/remove/all', auth, removeAllRecords)
router.delete('/remove', auth, removeRecord)

export default router