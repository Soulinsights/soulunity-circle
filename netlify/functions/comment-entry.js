const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const { post_id, comment } = JSON.parse(event.body);
    const timestamp = new Date().toISOString();

    // Get existing comments
    const { data: post, error: fetchError } = await supabase
      .from('circle_posts')
      .select('comments')
      .eq('id', post_id)
      .single();

    if (fetchError) throw fetchError;

    // Add new comment
    const newComment = {
      text: comment,
      author: 'Anonymous',
      timestamp
    };

    const { data, error } = await supabase
      .from('circle_posts')
      .update({
        comments: [...post.comments, newComment]
      })
      .eq('id', post_id)
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
