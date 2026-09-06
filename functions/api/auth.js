// Cloudflare Pages Function: startet den GitHub-OAuth-Login fuer Decap CMS.
// Endpunkt: /api/auth
// Benoetigt die Umgebungsvariable GITHUB_CLIENT_ID (in Cloudflare Pages gesetzt).
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // GitHub-Autorisierungsseite mit unseren Parametern aufrufen
  const redirectUrl = new URL("https://github.com/login/oauth/authorize");
  redirectUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  redirectUrl.searchParams.set(
    "redirect_uri",
    `${url.origin}/api/callback`
  );
  // "repo" = Schreibrechte auf das Inhalts-Repository
  redirectUrl.searchParams.set("scope", "repo");
  redirectUrl.searchParams.set("state", crypto.randomUUID());

  return Response.redirect(redirectUrl.href, 302);
}
