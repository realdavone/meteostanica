import Record from '../models/record.js'

export async function getAllRecords(req, res) {
  try {
    const records = await Record.find().sort({ 'timestamp': -1 }).limit(20)

    res.json({ records })
  } catch (error) {
    res.status(500).json({ success: false, message: error || 'Niečo sa pokazilo' })
  }

}

export async function postNewRecord(req, res) {
  const { temperature, humidity, pressure, gasResistance } = req.body

  try {
    await Record.create({ temperature, humidity, pressure, gasResistance })

    res.json({ success: true, message: 'Údaj úspešne pridaný' })
  } catch (error) {
    res.status(500).json({ success: false, message: error || 'Niečo sa pokazilo' })
  }
}

export async function removeAllRecords(req, res) {
  try {
    await Record.deleteMany()

    res.json({ success: true, message: 'Všetky údaje úspešne zmazané' })
  } catch (error) {
    res.status(500).json({ success: false, message: error || 'Niečo sa pokazilo' })
  }
}

export async function removeRecord(req, res) {
  const { id } = req.body

  if(!id) return res.status(400).json({ success: false, message: 'Nesprávny request' })

  try {
    await Record.findOneAndRemove({ timestamp: id })

    res.json({ success: true, message: 'Údaj bol úspešne zmazaný' })
  } catch (error) {
    res.status(500).json({ success: false, message: error || 'Niečo sa pokazilo' })
  }
}