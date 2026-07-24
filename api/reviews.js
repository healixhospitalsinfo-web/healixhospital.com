const GOOGLE_REVIEWS_API_URL = process.env.GOOGLE_REVIEWS_API_URL || 'https://script.google.com/macros/s/AKfycbxJV_Qq63_Y5sB8bOvHV53vXTazP1iewGhB1CpbUrhi662cjmiEbgZmZXLYxCRjyccM/exec';

module.exports = async function handler(req, res) {
  const allowedOrigin = '*';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    const response = await fetch(GOOGLE_REVIEWS_API_URL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers && req.headers.authorization ? { Authorization: req.headers.authorization } : {})
      },
      body: req.method === 'POST' ? JSON.stringify(req.body || {}) : undefined
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json';

    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Unable to reach reviews backend.' });
  }
};
