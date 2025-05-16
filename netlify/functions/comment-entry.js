const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { post_id, user_id = "guest", comment } = JSON.parse(event.body);

    if (!post_id || !comment) {
      return { statusCode: 400, body: "Missing post_id or comment" };
    }

    const { error } = await supabase
      .from("circle_comments")
      .insert([{ post_id, user_id, comment, timestamp: new Date().toISOString() }]);

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
