const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: 'Method Not Allowed',
      headers: {'Access-Control-Allow-Origin': '*'} 
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ 
        name, 
        email, 
        message, 
        timestamp: new Date().toISOString()  
      }]);

    if (error) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: error.message }),
        headers: {'Access-Control-Allow-Origin': '*'} 
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: {'Access-Control-Allow-Origin': '*'}
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers: {'Access-Control-Allow-Origin': '*'}
    };
  }
};
