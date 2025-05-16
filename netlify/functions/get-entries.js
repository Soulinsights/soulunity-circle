const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const { limit } = event.queryStringParameters;
    const query = supabase
      .from('circle_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) query.limit(parseInt(limit));

    const { data, error } = await query;

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
