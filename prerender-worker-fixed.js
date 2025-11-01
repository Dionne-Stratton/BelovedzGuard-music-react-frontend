// User agents handled by Prerender
const BOT_AGENTS = [
  "googlebot",
  "yahoo! slurp",
  "bingbot",
  "yandex",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest/0.",
  "developers.google.com/+/web/snippet",
  "slackbot",
  "vkshare",
  "w3c_validator",
  "redditbot",
  "applebot",
  "whatsapp",
  "flipboard",
  "tumblr",
  "bitlybot",
  "skypeuripreview",
  "nuzzel",
  "discordbot",
  "google page speed",
  "qwantify",
  "pinterestbot",
  "bitrix link preview",
  "xing-contenttabreceiver",
  "chrome-lighthouse",
  "telegrambot",
  "integration-test", // Integration testing
  "google-inspectiontool",
  "prerender", // Add explicit prerender bot
];

// These are the extensions that the worker will skip prerendering
// even if any other conditions pass.
const IGNORE_EXTENSIONS = [
  ".js",
  ".css",
  ".xml",
  ".less",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".pdf",
  ".doc",
  ".txt",
  ".ico",
  ".rss",
  ".zip",
  ".mp3",
  ".rar",
  ".exe",
  ".wmv",
  ".doc",
  ".avi",
  ".ppt",
  ".mpg",
  ".mpeg",
  ".tif",
  ".wav",
  ".mov",
  ".psd",
  ".ai",
  ".xls",
  ".mp4",
  ".m4a",
  ".swf",
  ".dat",
  ".dmg",
  ".iso",
  ".flv",
  ".m4v",
  ".torrent",
  ".woff",
  ".ttf",
  ".svg",
  ".webmanifest",
];

export default {
  /**
   * Hooks into the request, and changes origin if needed
   */
  async fetch(request, env) {
    return await handleRequest(request, env).catch(
      (err) => new Response(err.stack, { status: 500 })
    );
  },
};

/**
 * @param {Request} request
 * @param {any} env
 * @returns {Promise<Response>}
 */
async function handleRequest(request, env) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent")?.toLowerCase() || "";
  const isPrerender = request.headers.get("X-Prerender");
  const pathName = url.pathname.toLowerCase();
  const extension = pathName
    .substring(pathName.lastIndexOf(".") || pathName.length)
    ?.toLowerCase();

  // Debug logging (remove in production if needed)
  console.log("Request received:", {
    url: request.url,
    userAgent: userAgent,
    isPrerender: isPrerender,
    extension: extension,
  });

  // Check if it's a bot
  const isBot = BOT_AGENTS.some((bot) => userAgent.includes(bot));
  console.log("Is bot:", isBot);

  // Prerender loop protection
  // Non robot user agent
  // Ignore extensions
  if (
    isPrerender ||
    !isBot ||
    (extension.length && IGNORE_EXTENSIONS.includes(extension))
  ) {
    console.log("Skipping prerender - returning normal request");
    return fetch(request);
  }

  // Make sure we have the token
  if (!env.PRERENDER_TOKEN) {
    console.error("PRERENDER_TOKEN is not set in environment variables");
    // Fall back to normal request if token is missing
    return fetch(request);
  }

  // Build Prerender request
  const newURL = `https://service.prerender.io/${request.url}`;
  const newHeaders = new Headers(request.headers);

  newHeaders.set("X-Prerender-Token", env.PRERENDER_TOKEN);

  console.log("Forwarding to Prerender.io:", newURL);

  return fetch(
    new Request(newURL, {
      headers: newHeaders,
      redirect: "manual",
    })
  );
}
