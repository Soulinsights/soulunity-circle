
const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const filePath = path.join(__dirname, "../../data/submissions.json");

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      return {
        statusCode: 200,
        body: data.toString(),
      };
    } else {
      return {
        statusCode: 200,
        body: "[]",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to read entries" }),
    };
  }
};
