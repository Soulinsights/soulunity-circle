const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }

  // Parse the request body defensively — a malformed body simply leaves
  // email empty, which the validation check below will reject.
  let email = '';
  let name = '';
  let source = 'soulunity_waiting_page';
  try {
    const body = JSON.parse(event.body || '{}');
    if (typeof body.email === 'string') email = body.email.trim();
    if (typeof body.name === 'string') name = body.name.trim();
    if (typeof body.source === 'string' && body.source.trim()) source = body.source.trim();
  } catch (err) {
    // Fall through to the invalid-email response below.
  }

  if (!EMAIL_RE.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: 'invalid_email', message: 'Please enter a valid email.' }),
      headers: HEADERS
    };
  }

  try {
    const { error } = await supabase
      .from('waitlist_signups')
      .insert([{
        email,
        name: name || null,
        source
      }]);

    if (error) {
      // Postgres unique_violation — this email is already on the waitlist.
      // Not a failure from the visitor's perspective, so respond 200.
      if (error.code === '23505') {
        return {
          statusCode: 200,
          body: JSON.stringify({ status: 'duplicate', message: 'You are already on the waitlist.' }),
          headers: HEADERS
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify({ status: 'server_error', message: 'Something went wrong. Please try again later.' }),
        headers: HEADERS
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', message: 'You are on the waitlist.' }),
      headers: HEADERS
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'server_error', message: 'Something went wrong. Please try again later.' }),
      headers: HEADERS
    };
  }
};
