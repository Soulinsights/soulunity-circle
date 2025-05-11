const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../data/submissions.json');

exports.handler = async () => {
  try {
    const data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath))
      : [];

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not read entries' })
    };
  }
};
