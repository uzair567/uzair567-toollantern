import type { ToolContent } from '../types';

const updated = '2026-10-07';
const privacy = 'Everything runs in your browser. Nothing you paste is uploaded or stored.';

export const devTools: ToolContent[] = [
  {
    slug: 'json-formatter', name: 'JSON Formatter & Validator', category: 'developer', popular: true, updated,
    title: 'JSON Formatter & Validator – Beautify, Minify, Check',
    description: 'Format, validate and minify JSON in your browser. Pinpoints errors by line and column, sorts keys and copies with one click. Private — no upload.',
    lead: 'Paste JSON to pretty-print it, minify it, or find exactly where it’s broken. ' + privacy,
    keywords: ['json beautifier', 'json validator', 'json minifier', 'pretty print json', 'json lint', 'format json online', 'json viewer'],
    about: [
      'API responses and config files are often a single unreadable line. Formatting adds indentation and line breaks so you can see the structure; minifying does the opposite for smaller payloads.',
      'Validation uses the browser’s own strict JSON parser, so if it passes here it will parse in any standards-compliant language. Common mistakes it catches: trailing commas, single quotes, unquoted keys, comments and stray characters.',
    ],
    howTo: ['Paste your JSON on the left.', 'Choose Format or Minify and your indentation.', 'Tick “Sort keys” to order object keys alphabetically — handy for comparing two payloads.', 'Copy the result.'],
    example: { title: 'Fixing a common error', steps: ['Input: {"a": 1, "b": 2,} — note the trailing comma.', 'The validator reports an unexpected token and its position.', 'Remove the comma and the JSON validates.'] },
    faqs: [
      { q: 'Is my JSON sent to a server?', a: 'No. Parsing and formatting happen entirely in your browser, so it’s safe for API keys, tokens or customer data — though you should still avoid pasting secrets into any website you don’t trust.' },
      { q: 'Why is my JSON invalid when it works in JavaScript?', a: 'JavaScript object literals allow single quotes, unquoted keys, trailing commas and comments. Strict JSON allows none of those.' },
      { q: 'How large a file can I format?', a: 'Several megabytes work fine on a modern computer. Very large files may make the page slow because everything is processed locally.' },
    ],
    related: ['jwt-decoder', 'base64-encode-decode', 'url-encode-decode', 'unix-timestamp-converter'],
  },
  {
    slug: 'base64-encode-decode', name: 'Base64 Encoder & Decoder', category: 'developer', updated,
    title: 'Base64 Encode & Decode Online – UTF-8 Safe',
    description: 'Encode text to Base64 or decode Base64 to text, with full UTF-8 support and a URL-safe (Base64URL) option. Runs locally in your browser.',
    lead: 'Convert text to Base64 and back, with emoji and accented characters handled correctly. ' + privacy,
    keywords: ['base64 encode', 'base64 decode', 'base64url', 'base64 to text', 'text to base64', 'btoa atob'],
    about: [
      'Base64 represents any data using 64 safe characters (A–Z, a–z, 0–9, + and /). It’s used in data URIs, email attachments, HTTP Basic auth headers and JWTs. It is an encoding, not encryption — anyone can decode it.',
      'Browsers’ built-in btoa() fails on characters outside Latin-1. This tool converts text to UTF-8 bytes first, so “café ✓” encodes and decodes correctly.',
    ],
    howTo: ['Choose Encode or Decode.', 'Paste your text or Base64 string.', 'For URLs and JWTs, tick URL-safe to use - and _ instead of + and /.', 'Use Swap to round-trip and check the result.'],
    formula: { expression: 'Every 3 bytes → 4 Base64 characters', explanation: ['Output is about 33% larger than the input.', '“=” padding fills the last group when the input length isn’t a multiple of 3.'] },
    faqs: [
      { q: 'Is Base64 secure?', a: 'No. It hides nothing — it is trivially reversible. Use real encryption for sensitive data.' },
      { q: 'What is Base64URL?', a: 'A variant that swaps + for - and / for _ and usually drops the = padding, so the result can sit in URLs and filenames without escaping. JWTs use it.' },
      { q: 'Why does decoding give an error?', a: 'Either the input has characters outside the Base64 alphabet, or it decodes to binary data (like an image) rather than readable text.' },
    ],
    related: ['url-encode-decode', 'jwt-decoder', 'json-formatter', 'uuid-generator'],
  },
  {
    slug: 'url-encode-decode', name: 'URL Encoder & Decoder', category: 'developer', updated,
    title: 'URL Encode & Decode Online – Percent-Encoding Tool',
    description: 'Percent-encode text for URLs and query strings, or decode %20-style URLs back to readable text. Explains encodeURIComponent vs encodeURI.',
    lead: 'Encode values for query strings, encode whole URLs, or decode percent-encoded links back to plain text. ' + privacy,
    keywords: ['url encode', 'url decode', 'percent encoding', 'encodeURIComponent', 'query string encoder', '%20'],
    about: [
      'URLs can only contain a limited set of characters. Everything else — spaces, accents, & and = inside values — has to be percent-encoded as % followed by hex bytes. A space becomes %20 and “é” becomes %C3%A9.',
      'Use “Encode value” for a single query-string value so characters like & and = don’t break the URL. Use “Encode full URL” when you have a complete address and only need to fix spaces and non-ASCII characters.',
    ],
    howTo: ['Pick a mode.', 'Paste your text or URL.', 'Copy the result.'],
    faqs: [
      { q: 'Should a space be %20 or +?', a: 'In paths, always %20. In query strings submitted by HTML forms, + also means a space. The decoder treats + as a space.' },
      { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI leaves URL structure characters (: / ? & = #) alone; encodeURIComponent encodes them too, which is what you want for a value inside a query string.' },
      { q: 'Why does decoding fail?', a: 'A % sign not followed by two hex digits is malformed. Encode stray % signs as %25.' },
    ],
    related: ['base64-encode-decode', 'utm-builder', 'slug-generator', 'json-formatter'],
  },
  {
    slug: 'jwt-decoder', name: 'JWT Decoder', category: 'developer', popular: true, updated,
    title: 'JWT Decoder – Decode JSON Web Tokens Online',
    description: 'Decode a JWT to read its header and payload, see expiry and issued-at times in plain dates, and check if it has expired. Decoded locally — never uploaded.',
    lead: 'Paste a JSON Web Token to see its header, claims and expiry in plain English. ' + privacy,
    keywords: ['jwt decode', 'json web token', 'decode token', 'jwt parser', 'jwt exp', 'bearer token decoder'],
    about: [
      'A JWT has three Base64URL-encoded parts separated by dots: a header (the algorithm), a payload (the claims) and a signature. The first two are just encoded JSON, so they can be read without any key.',
      'Timestamps such as exp (expiry), iat (issued at) and nbf (not before) are Unix seconds. The decoder converts them to dates and flags expired tokens — the most common reason an API returns 401.',
      'Decoding is not verification. To trust a token’s contents your server must check the signature with the correct secret or public key.',
    ],
    howTo: ['Paste the token — with or without “Bearer ”.', 'Read the header and payload.', 'Check the status bar for expiry.', 'Copy either section as formatted JSON.'],
    faqs: [
      { q: 'Is it safe to paste a production token here?', a: 'Decoding happens in your browser and nothing is sent anywhere. Still, a valid token works like a password until it expires — treat it carefully.' },
      { q: 'Can this tool verify the signature?', a: 'No. Verification needs the signing secret or public key and should happen on your server.' },
      { q: 'What do sub, aud and iss mean?', a: 'sub is the subject (usually the user ID), aud the intended audience (which API should accept it), and iss the issuer (who created it).' },
    ],
    related: ['base64-encode-decode', 'json-formatter', 'unix-timestamp-converter', 'uuid-generator'],
  },
  {
    slug: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', category: 'developer', updated,
    title: 'Unix Timestamp Converter – Epoch to Date & Back',
    description: 'Convert Unix epoch timestamps to human dates (UTC and local) and dates back to timestamps. Auto-detects seconds, milliseconds and microseconds.',
    lead: 'Convert epoch timestamps to readable dates and back, with automatic seconds/milliseconds detection and a live clock.',
    keywords: ['epoch converter', 'unix time', 'timestamp to date', 'date to timestamp', 'epoch time now', 'milliseconds to date'],
    about: [
      'A Unix timestamp counts seconds since 00:00:00 UTC on 1 January 1970. It’s the same everywhere on Earth, which is why databases, logs and APIs use it.',
      'JavaScript and many APIs use milliseconds (13 digits) instead of seconds (10 digits). The converter detects the unit from the size of the number so you don’t get dates in the year 50,000.',
    ],
    howTo: ['Paste a timestamp in the left box to see it as a date.', 'Or pick a date and time on the right to get the timestamp.', 'Copy the current timestamp from the live clock.'],
    formula: { expression: 'Date = 1970-01-01T00:00:00Z + timestamp seconds', explanation: ['Milliseconds = seconds × 1000.'] },
    faqs: [
      { q: 'What is the year 2038 problem?', a: 'Systems that store Unix time as a signed 32-bit integer overflow on 19 January 2038. Modern systems use 64-bit values, which last billions of years.' },
      { q: 'Do Unix timestamps include leap seconds?', a: 'No. Unix time treats every day as exactly 86,400 seconds.' },
      { q: 'Why does my converted time look wrong?', a: 'Usually a time-zone mix-up. The timestamp is always UTC; your local time is shown separately.' },
    ],
    related: ['date-difference-calculator', 'jwt-decoder', 'age-calculator', 'json-formatter'],
  },
  {
    slug: 'uuid-generator', name: 'UUID Generator', category: 'developer', updated,
    title: 'UUID Generator – Random v4 GUIDs in Bulk',
    description: 'Generate random version 4 UUIDs (GUIDs) instantly — one or hundreds at once, uppercase or without hyphens. Uses your browser’s secure random generator.',
    lead: 'Create cryptographically random v4 UUIDs, one at a time or in bulk. ' + privacy,
    keywords: ['guid generator', 'uuid v4', 'random uuid', 'generate guid', 'bulk uuid', 'unique id generator'],
    about: [
      'A UUID is a 128-bit identifier written as 32 hex digits in five groups (8-4-4-4-12). Version 4 UUIDs are random: 122 of the bits come from a random number generator.',
      'The chance of two random v4 UUIDs colliding is so small it can be ignored for practical purposes, which is why they’re used as database keys, request IDs and file names without a central counter.',
    ],
    howTo: ['Choose how many UUIDs you need (up to 500).', 'Set uppercase or remove hyphens if your system needs it.', 'Click Generate, then Copy all.'],
    faqs: [
      { q: 'Is a UUID the same as a GUID?', a: 'Yes. GUID is Microsoft’s name for the same standard.' },
      { q: 'Should I use UUIDs as database primary keys?', a: 'They work well in distributed systems. Random v4 keys can fragment some database indexes; time-ordered UUID v7 is a good alternative when insert performance matters.' },
      { q: 'Are these UUIDs secure?', a: 'They come from crypto.randomUUID(), a cryptographically secure generator — but a UUID is an identifier, not a secret, so don’t use one as a password or token on its own.' },
    ],
    related: ['base64-encode-decode', 'json-formatter', 'slug-generator', 'jwt-decoder'],
  },
];

export const textTools: ToolContent[] = [
  {
    slug: 'word-counter', name: 'Word Counter', category: 'text-seo', popular: true, updated,
    title: 'Word Counter – Words, Characters & Reading Time',
    description: 'Count words, characters (with and without spaces), sentences and paragraphs as you type. Also shows reading time, speaking time and most-used words.',
    lead: 'Paste or type your text for an instant count of words, characters, sentences, reading time and keyword frequency. ' + privacy,
    keywords: ['character counter', 'word count', 'letter counter', 'sentence counter', 'reading time', 'essay word count', 'count characters'],
    about: [
      'Essays, job applications, meta descriptions and social posts all have limits — some in words, some in characters. This counter shows both, with and without spaces, and updates on every keystroke.',
      'Reading time assumes about 238 words per minute, a widely cited average for adult silent reading of non-fiction. Speaking time assumes about 140 words per minute, a comfortable presentation pace.',
      'The most-used words list ignores common filler words, so you can spot repetition or check that a key term appears naturally.',
    ],
    howTo: ['Type or paste your text.', 'Read the counts on the right.', 'Check the most-used words for repetition.'],
    faqs: [
      { q: 'How are words counted?', a: 'A word is any run of letters or numbers, including apostrophes and hyphens inside it. “Don’t” and “well-known” each count as one word.' },
      { q: 'Do emojis count as characters?', a: 'Each emoji counts as one character here. Some platforms count certain emojis as two, so leave a little margin near hard limits.' },
      { q: 'How many words is a 5-minute speech?', a: 'At about 140 words per minute, roughly 700 words.' },
    ],
    related: ['case-converter', 'slug-generator', 'serp-snippet-preview', 'utm-builder'],
  },
  {
    slug: 'case-converter', name: 'Case Converter', category: 'text-seo', updated,
    title: 'Case Converter – Upper, Lower, Title, camelCase & More',
    description: 'Convert text to UPPER CASE, lower case, Title Case, Sentence case, camelCase, snake_case, kebab-case and more. See every format at once and copy.',
    lead: 'Type once and get every case style side by side — for headlines, code variables, file names and fixing accidental caps lock.',
    keywords: ['uppercase to lowercase', 'title case converter', 'sentence case', 'camelcase converter', 'snake case', 'capitalize text'],
    about: [
      'Title Case here follows common headline style: small words like “a”, “of” and “the” stay lowercase unless they start the title. Style guides differ slightly, so review headlines before publishing.',
      'The programming cases (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE) split on spaces, punctuation and existing capital letters, so “userProfile id” becomes user_profile_id.',
    ],
    howTo: ['Paste your text.', 'Find the style you need below.', 'Click Copy on that card.'],
    faqs: [
      { q: 'What is the difference between Title Case and Sentence case?', a: 'Title Case capitalises the main words of a headline. Sentence case only capitalises the first word and proper nouns, like a normal sentence.' },
      { q: 'Which case should I use for URLs?', a: 'kebab-case (lowercase with hyphens). Use the slug generator for a fully cleaned URL slug.' },
      { q: 'Will it change my proper nouns?', a: 'Lowercase and sentence case will lowercase names like “London”. Re-capitalise those after converting.' },
    ],
    related: ['slug-generator', 'word-counter', 'serp-snippet-preview', 'url-encode-decode'],
  },
  {
    slug: 'slug-generator', name: 'Slug Generator', category: 'text-seo', updated,
    title: 'URL Slug Generator – Clean, SEO-Friendly Slugs',
    description: 'Turn titles into clean, lowercase URL slugs. Removes accents and symbols, optional stop-word removal and length limit, bulk mode for many titles.',
    lead: 'Turn any title into a clean URL slug — accents removed, symbols stripped, one title per line for bulk.',
    keywords: ['slugify', 'url slug', 'permalink generator', 'seo friendly url', 'title to slug', 'kebab case url'],
    about: [
      'A slug is the readable part of a URL that identifies a page, like /paint-calculator/. Short, descriptive slugs are easier to share and read, and they show users what the page is about before they click.',
      'Removing stop words (the, and, of) shortens slugs without losing meaning, but keep them if the slug would become unclear. Avoid changing slugs on published pages — if you must, add a 301 redirect from the old URL.',
    ],
    howTo: ['Paste a title — or many, one per line.', 'Choose hyphens (recommended) or underscores.', 'Optionally remove stop words or set a maximum length.', 'Copy the slugs.'],
    faqs: [
      { q: 'Hyphens or underscores?', a: 'Hyphens. Google treats hyphens as word separators in URLs, while underscores can join words together.' },
      { q: 'How long should a slug be?', a: 'There’s no fixed limit, but 3–6 meaningful words is a good target. Leave out dates if you plan to update the page.' },
      { q: 'What happens to non-English characters?', a: 'Accented Latin letters are transliterated (é → e, ü → u, ß → ss). Scripts like Arabic or Chinese are removed, so write those slugs by hand.' },
    ],
    related: ['case-converter', 'serp-snippet-preview', 'utm-builder', 'url-encode-decode'],
  },
  {
    slug: 'utm-builder', name: 'UTM Builder', category: 'text-seo', popular: true, updated,
    title: 'UTM Builder – Campaign URL Builder for Google Analytics',
    description: 'Build UTM-tagged campaign URLs for GA4 with source, medium, campaign, term and content. Validates your URL, warns about missing tags and forces lowercase.',
    lead: 'Add UTM parameters to any link so Google Analytics shows exactly which campaign, email or post sent the visitor.',
    keywords: ['campaign url builder', 'utm generator', 'utm parameters', 'ga4 utm', 'tracking link', 'utm_source utm_medium'],
    about: [
      'UTM parameters are tags added to a link’s query string. When someone clicks, analytics tools read the tags and attribute the visit to your campaign instead of lumping it into “direct” or “referral”.',
      'GA4 is case-sensitive: “Email” and “email” appear as separate rows. Keeping everything lowercase (the default here) avoids fragmented reports. Use consistent mediums like email, cpc, social and affiliate so GA4’s default channel grouping classifies traffic correctly.',
    ],
    howTo: ['Paste the landing page URL.', 'Fill in source (where the traffic comes from) and medium (what type of traffic).', 'Name the campaign.', 'Optionally add term (paid keyword) and content (to tell two links in the same email apart).', 'Copy the tagged URL.'],
    example: { title: 'A newsletter link', steps: ['URL: https://example.com/pricing', 'Source: newsletter · Medium: email · Campaign: october_launch', 'Result: https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=october_launch'] },
    faqs: [
      { q: 'Which UTM parameters are required?', a: 'Source is the minimum, but use source, medium and campaign together for useful reports.' },
      { q: 'Should I use UTMs on internal links?', a: 'No. Tagging links between pages of your own site starts a new session and overwrites the original traffic source.' },
      { q: 'Do UTM parameters hurt SEO?', a: 'Not when used on links in emails, ads and social posts. Avoid them in internal links, and keep a canonical tag on your pages.' },
    ],
    related: ['serp-snippet-preview', 'url-encode-decode', 'slug-generator', 'word-counter'],
  },
  {
    slug: 'serp-snippet-preview', name: 'SERP Snippet Preview', category: 'text-seo', updated,
    title: 'SERP Snippet Preview – Google Title & Meta Checker',
    description: 'Preview how your title tag and meta description appear in Google search results. Measures pixel width, not just characters, so you see what gets cut off.',
    lead: 'See your page the way searchers will — with live pixel-width measurement for title tags and meta descriptions.',
    keywords: ['google serp preview', 'meta description length', 'title tag length checker', 'serp simulator', 'snippet optimizer', 'seo title checker'],
    about: [
      'Google truncates titles and descriptions by display width, not character count. A title full of wide letters (W, M) gets cut sooner than one with narrow letters (i, l). This tool measures text in Google’s fonts to show where truncation is likely.',
      'Roughly 600 px fits in a desktop title and about 920 px in a two-line description. Treat these as guides: Google rewrites many titles and descriptions based on the search query.',
    ],
    howTo: ['Enter your title tag.', 'Enter your meta description.', 'Enter the page URL to see the breadcrumb.', 'Watch the bars — green is safe, amber is close, red will probably be cut.'],
    faqs: [
      { q: 'How long should a title tag be?', a: 'Aim for under about 600 pixels, which is usually 50–60 characters. Put the most important words first in case it gets shortened.' },
      { q: 'How long should a meta description be?', a: 'About 150–160 characters on desktop. Write it as a short pitch for the page — it influences clicks, not rankings directly.' },
      { q: 'Why does Google show a different title?', a: 'Google may rewrite titles it considers too long, stuffed with keywords or not matching the page. Clear, accurate titles get rewritten less often.' },
    ],
    related: ['slug-generator', 'word-counter', 'utm-builder', 'case-converter'],
  },
];
