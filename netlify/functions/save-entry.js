
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);
  if (!data.message || data.message.trim() === "") {
    return {
      statusCode: 400,
      body: "Message is required",
    };
  }

  const filePath = path.join(__dirname, "../../data/submissions.json");
  let submissions = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    submissions = JSON.parse(fileData);
  }

  const newEntry = {
    name: data.name || "Anonymous",
    category: data.category || "General",
    message: data.message.trim(),
    timestamp: new Date().toISOString(),
  };

  submissions.unshift(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Entry saved", entry: newEntry }),
  };
};
