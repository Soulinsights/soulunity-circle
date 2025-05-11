const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../data/submissions.json');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name = 'Anonymous', message = '' } = JSON.parse(event.body);

  if (!message || message.length < 3) {
    return { statusCode: 400, body: 'Message is too short.' };
  }

  try {
    const timestamp = new Date().toISOString();
    const newEntry = { name, message, timestamp };

    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath);
      existing = JSON.parse(raw);
    }

    existing.unshift(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, entry: newEntry })
    };
  } catch (err) {
    return { statusCode: 500, body: 'Failed to save entry.' };
  }
};
