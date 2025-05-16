const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const { name, message, category } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('circle_posts')
      .insert([{
        name: name || 'Anonymous Soul',
        message,
        category,
        likes: 0,
        comments: []
      }])
      .single();

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
