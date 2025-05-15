const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const filePath = path.join(__dirname, '../../data/submissions.json');

  try {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
    return { statusCode: 200, body: data.toString() };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
