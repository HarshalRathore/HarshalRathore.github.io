// build-writing.mjs — convert extracted legacy posts (.txt) into styled static
// HTML pages under public/writing/<slug>/index.html. Node ESM (.mjs).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'public', 'writing')
const SRC_DIR = '/home/harshal/portfolio-project/docs/legacy-posts'

const POSTS = [
  {
    slug: 'linked-lists',
    file: 'linked-lists-unleashed-mastering-the-art-of-dynamic-data-structures.txt',
  },
  { slug: 'git-for-beginners', file: 'git-for-beginners-by-me.txt' },
  { slug: 'linux-shell-guide', file: 'linux-shell-guide.txt' },
]

const escapeHtml = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/** Is this stripped line part of a scraped line-number gutter? */
const gutterValue = (line) => {
  const s = line.trim()
  return /^\d+$/.test(s) ? Number.parseInt(s, 10) : null
}

/**
 * Detect a scraped code block at lines[i]: a run of gutter numbers 1..n,
 * then a blank separator, then the code lines up to the next blank line.
 * Returns null when the pattern does not match.
 */
function matchCodeBlock(lines, i) {
  if (gutterValue(lines[i]) !== 1) return null
  let n = 1
  let j = i
  while (gutterValue(lines[j]) === n) {
    n += 1
    j += 1
  }
  const gutterEnd = j // one past last gutter line
  if (lines[gutterEnd]?.trim() !== '') return null
  const codeStart = gutterEnd + 1
  const codeLines = []
  for (let k = codeStart; k < lines.length && lines[k].trim() !== ''; k += 1) {
    codeLines.push(lines[k])
  }
  if (codeLines.length === 0 || codeStart >= lines.length) return null
  return { next: codeStart + codeLines.length, code: codeLines.join('\n') }
}

/** Convert post text to HTML body fragments using the ticket rules. */
function convertToBody(text) {
  const lines = text.split('\n')
  const out = []
  let idx = 0

  // First non-empty line becomes the <h1>.
  while (idx < lines.length && lines[idx].trim() === '') idx += 1
  const h1 = lines[idx] ? lines[idx].trim() : 'Untitled'
  out.push(`      <h1>${escapeHtml(h1)}</h1>`)
  idx += 1

  // Skip scrape metadata in the header region (date/read-time/author/tags):
  // whitespace-only lines, indented artifact lines, and lone bullet glyphs.
  while (
    idx < lines.length &&
    (lines[idx].trim() === '' ||
      /^[•\s]+$/.test(lines[idx]) ||
      /^\s+\S/.test(lines[idx]))
  ) {
    idx += 1
  }

  let paragraph = []
  const flushParagraph = () => {
    if (paragraph.length > 0) {
      out.push(`      <p>${escapeHtml(paragraph.join(' '))}</p>`)
      paragraph = []
    }
  }

  while (idx < lines.length) {
    const line = lines[idx]

    if (line.trim() === '') {
      flushParagraph()
      idx += 1
      continue
    }

    // Scraped code block: number-gutter run + blank + indented/plain code.
    const block = matchCodeBlock(lines, idx)
    if (block) {
      flushParagraph()
      out.push(
        `      <pre><code>${escapeHtml(block.code)}</code></pre>`
      )
      idx = block.next
      continue
    }

    if (/^### /.test(line)) {
      flushParagraph()
      out.push(`      <h3>${escapeHtml(line.slice(4).trim())}</h3>`)
      idx += 1
      continue
    }

    if (/^## /.test(line)) {
      flushParagraph()
      out.push(`      <h2>${escapeHtml(line.slice(3).trim())}</h2>`)
      idx += 1
      continue
    }

    if (/^- /.test(line)) {
      flushParagraph()
      const items = []
      while (idx < lines.length && /^- /.test(lines[idx])) {
        items.push(`        <li>${escapeHtml(lines[idx].slice(2).trim())}</li>`)
        idx += 1
      }
      out.push('      <ul>\n' + items.join('\n') + '\n      </ul>')
      continue
    }

    // Fenced code block (```lang ... ```)
    if (/^```/.test(line.trim())) {
      flushParagraph()
      const codeLines = []
      idx += 1
      while (idx < lines.length && !/^```/.test(lines[idx].trim())) {
        codeLines.push(lines[idx])
        idx += 1
      }
      idx += 1 // closing fence
      out.push(
        `      <pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
      )
      continue
    }

    paragraph.push(line.trim())
    idx += 1
  }
  flushParagraph()

  return { title: h1, body: out.join('\n') }
}

function renderPage(title, slug, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="/writing/${slug}/" />
    <title>${escapeHtml(title)}</title>
    <style>
      body {
        background: #0A1122;
        color: #E7E3DC;
        font-family: ui-sans-serif, system-ui;
        margin: 0;
        padding: 0;
      }
      article {
        max-width: 72ch;
        margin: 0 auto;
        padding: 4rem 1.25rem;
      }
      h1,
      h2,
      h3 {
        font-family: Georgia, 'Times New Roman', serif;
        color: #F3EDE2;
        line-height: 1.15;
      }
      a {
        color: #E8A05C;
      }
      pre,
      code {
        font-family: ui-monospace, Menlo, monospace;
        background: #101A33;
        border-radius: 8px;
      }
      pre {
        padding: 1rem;
        overflow-x: auto;
      }
      code {
        padding: 0.1rem 0.35rem;
      }
      .back {
        color: #E8A05C;
        text-decoration: none;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <article>
      <p><a class="back" href="/">&#8592; Back to the Archipelago</a></p>
${body}
    </article>
  </body>
</html>
`
}

let failures = 0
for (const post of POSTS) {
  const src = resolve(SRC_DIR, post.file)
  const text = readFileSync(src, 'utf8')
  const { title, body } = convertToBody(text)
  const html = renderPage(title, post.slug, body)
  const dir = resolve(OUT_DIR, post.slug)
  mkdirSync(dir, { recursive: true })
  const dest = resolve(dir, 'index.html')
  writeFileSync(dest, html)
  const bytes = html.length
  const pres = (html.match(/<pre>/g) ?? []).length
  if (!title || bytes < 2000 || pres === 0) {
    console.error(
      `FAIL ${post.slug}: bytes=${bytes} pre=${pres} title="${title}"`
    )
    failures += 1
  } else {
    console.log(
      `ok ${post.slug}: ${bytes} bytes, ${pres} <pre> block(s), h1="${title}"`
    )
  }
}

if (failures > 0) {
  process.exitCode = 1
}
