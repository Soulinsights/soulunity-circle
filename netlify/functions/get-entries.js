const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async () => {
  const { data, error } = await supabase
    .from('circle_posts')
    .select('*')
    .order('timestamp', { ascending: false })
    //.limit(2); // zeigt nur 2 Einträge an

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

  return {
  statusCode: 200,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  },
  body: JSON.stringify(data)
};
};
