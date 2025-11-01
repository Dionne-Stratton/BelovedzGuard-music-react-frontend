// Cloudflare Pages Function middleware
// This runs for all requests to your Pages deployment

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
  "integration-test",
  "google-inspectiontool",
  "prerender",
];

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

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent")?.toLowerCase() || "";
  const isPrerender = request.headers.get("X-Prerender");
  const pathName = url.pathname.toLowerCase();
  const extension = pathName
    .substring(pathName.lastIndexOf(".") || pathName.length)
    ?.toLowerCase();

  // Debug logging
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
    // Continue with normal Pages request
    return context.next();
  }

  // Get token from environment variable
  const token = context.env.PRERENDER_TOKEN;
  if (!token) {
    console.error("PRERENDER_TOKEN is not set in environment variables");
    return context.next();
  }

  // Build Prerender request
  const newURL = `https://service.prerender.io/${request.url}`;
  const newHeaders = new Headers(request.headers);
  newHeaders.set("X-Prerender-Token", token);

  console.log("Forwarding to Prerender.io:", newURL);

  // Fetch from Prerender.io
  const prerenderResponse = await fetch(newURL, {
    headers: newHeaders,
    redirect: "manual",
  });

  return prerenderResponse;
}
