const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const { post_id } = JSON.parse(event.body);

    // Get current likes
    const { data: post, error: fetchError } = await supabase
      .from('circle_posts')
      .select('likes')
      .eq('id', post_id)
      .single();

    if (fetchError) throw fetchError;

    // Update likes
    const { data, error } = await supabase
      .from('circle_posts')
      .update({ likes: post.likes + 1 })
      .eq('id', post_id)
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_likes: data.likes })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
