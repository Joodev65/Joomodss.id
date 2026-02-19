export default async function handler(req, res) {
  const { jobId } = req.query

  if (!jobId) {
    return res.status(400).json({
      creator: 'Joomodss',
      success: false,
      message: 'Missing jobId'
    })
  }

  const url = `https://raw.githubusercontent.com/Joodev65/Joomodss.id/main/X/app_${jobId}.zip`

  try {
    const r = await fetch(url, { method: 'HEAD' })

    if (r.status === 200) {
      return res.json({
        creator: 'Joomodss',
        status: 'done',
        download: url
      })
    }

    return res.json({ status: 'Building' })
  } catch {
    return res.json({ status: 'Building' })
  
