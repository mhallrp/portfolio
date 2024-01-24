// pages/api/login.tsx
'use server'
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key is undefined' }), { status: 500 });
  }

  try {
    const { username, password } = await request.json();
    const backendResponse = await fetch('https://request.matt-hall.dev/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ user: { username, password } }),
      credentials: 'include',
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      const errorMessage = errorData.errorMessage || 'Login failed for an unknown reason';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 401 });
    }

    const setCookieHeader = backendResponse.headers.get('set-cookie');
    const data = await backendResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: setCookieHeader ? { 'set-cookie': setCookieHeader } : {},
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
