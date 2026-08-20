import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Optional: If you want to log what document was published from Sanity
    const body = await request.json();
    console.log(`Sanity webhook triggered for document: ${body._id}`);

    const deployHookUrl = import.meta.env.CLOUDFLARE_DEPLOY_HOOK_URL;
    
    if (!deployHookUrl) {
      return new Response('Missing Cloudflare Deploy Hook URL in environment variables', { status: 500 });
    }

    // Fire a clean, empty POST request to Cloudflare Pages' deploy hook
    const cfResponse = await fetch(deployHookUrl, {
      method: 'POST',
    });

    if (!cfResponse.ok) {
      throw new Error(`Cloudflare failed with status: ${cfResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'Rebuild triggered successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
