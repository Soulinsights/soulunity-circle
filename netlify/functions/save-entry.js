const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const entry = {
    name: data.name || "Anonymous",
    category: data.category || "Other",
    message: data.message,
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(__dirname, '../../data/submissions.json');
  let submissions = [];

  if (fs.existsSync(filePath)) {
    submissions = JSON.parse(fs.readFileSync(filePath));
  }

  submissions.unshift(entry);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    console.log("DATA RECEIVED:", data); // 🪵 Loggt an Netlify Dashboard

    ...
  } catch (error) {
    console.error("SAVE ENTRY ERROR:", error); // 🪵 Fehlerausgabe
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Saved", entry })
  };
  

};
