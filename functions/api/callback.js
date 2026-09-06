// Cloudflare Pages Function: verarbeitet die GitHub-OAuth-Antwort fuer Decap CMS.
// Endpunkt: /api/callback
// Benoetigt GITHUB_CLIENT_ID und GITHUB_CLIENT_SECRET (in Cloudflare Pages gesetzt).
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Fehlender OAuth-Code.", { status: 400 });
  }

  // Code gegen ein Access-Token eintauschen
  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const data = await tokenResponse.json();

  // Ergebnis an das Decap-CMS-Fenster zurueckgeben (postMessage-Handshake)
  const content =
    data && data.access_token
      ? { token: data.access_token, provider: "github" }
      : { error: data.error || "Kein Token erhalten." };

  const status = data && data.access_token ? "success" : "error";

  const script = `
    <!doctype html><html><body><script>
    (function () {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
    </script></body></html>`;

  return new Response(script, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
