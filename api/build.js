import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false })
  }

  const { appName, appUrl, iconUrl = '' } = req.query

  if (!appName || !appUrl) {
    return res.status(400).json({
      creator: 'Joomodss',
      success: false,
      message: 'Missing appName or appUrl'
    })
  }
  
  const jobId = Date.now().toString()

  try {
    await axios.post(
      'https://api.github.com/repos/Joodev65/joomods/actions/workflows/main.yml/dispatches',
      {
        ref: 'main',
        inputs: {
          appName,
          appUrl,
          iconUrl,
          jobId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json'
        }
      }
    )

    return res.json({
      creator: 'Joomodss',
      success: true,
      status: 'Building',
      jobId
    })
  } catch (err) {
    return res.status(500).json({
      creator: 'Joomodss',
      success: false,
      error: err.response?.data || err.message
    })
  }
}
