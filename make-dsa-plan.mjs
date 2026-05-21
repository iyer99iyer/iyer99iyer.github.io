import { writeFile } from 'node:fs/promises';

const SOURCE_URL =
  'https://gist.githubusercontent.com/mayiwrite/c77a64f52a634c860732e96e5d8ca7e9/raw/d473376a93d9e0743626c7e5f743904f24bc225d/NeetCode150.md';
const OUTPUT_FILE = 'dsa-study-plan.html';
const NEETCODE_INDEX_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/';
const NEETCODE_2D_DP_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/two-dp.html';
const NEETCODE_ARRAY_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/array.html';
const NEETCODE_TWO_POINTERS_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/two-pointers.html';
const NEETCODE_SLIDING_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/sliding-window.html';
const NEETCODE_LIST_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/list.html';
const NEETCODE_TREES_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/trees.html';
const NEETCODE_BACKTRACKING_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/backtracking.html';
const NEETCODE_GRAPHS_URL =
  'https://tryyang2001.github.io/Neetcode-150-Writeups/html/topics/graphs.html';

const patternResources = {
  'Arrays & Hashing': {
    youtube: 'NeetCode Arrays and Hashing',
    reference: { label: 'Written walkthrough', url: NEETCODE_ARRAY_URL },
  },
  'Two Pointers': {
    youtube: 'NeetCode Two Pointers',
    reference: { label: 'Written walkthrough', url: NEETCODE_TWO_POINTERS_URL },
  },
  'Sliding Window': {
    youtube: 'NeetCode Sliding Window',
    reference: { label: 'Written walkthrough', url: NEETCODE_SLIDING_URL },
  },
  Stack: {
    youtube: 'NeetCode Stack',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  'Binary Search': {
    youtube: 'NeetCode Binary Search',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  'Linked List': {
    youtube: 'NeetCode Linked List',
    reference: { label: 'Written walkthrough', url: NEETCODE_LIST_URL },
  },
  Trees: {
    youtube: 'NeetCode Trees',
    reference: { label: 'Written walkthrough', url: NEETCODE_TREES_URL },
  },
  'Heap / Priority Queue': {
    youtube: 'NeetCode Heap Priority Queue',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  Backtracking: {
    youtube: 'NeetCode Backtracking',
    reference: { label: 'Written walkthrough', url: NEETCODE_BACKTRACKING_URL },
  },
  Tries: {
    youtube: 'NeetCode Trie',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  Graphs: {
    youtube: 'NeetCode Graphs',
    reference: { label: 'Written walkthrough', url: NEETCODE_GRAPHS_URL },
  },
  'Advanced Graphs': {
    youtube: 'NeetCode Advanced Graphs',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  '1-D Dynamic Programming': {
    youtube: 'NeetCode Dynamic Programming',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  '2-D Dynamic Programming': {
    youtube: 'NeetCode Dynamic Programming',
    reference: { label: 'Written walkthrough', url: NEETCODE_2D_DP_URL },
  },
  Greedy: {
    youtube: 'NeetCode Greedy',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  Intervals: {
    youtube: 'NeetCode Intervals',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  'Math & Geometry': {
    youtube: 'NeetCode Math and Geometry',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
  'Bit Manipulation': {
    youtube: 'NeetCode Bit Manipulation',
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  },
};

const weekPlan = [
  {
    week: 'Week 1',
    title: 'Arrays, hashing, pointers',
    focus: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window'],
    note:
      'Build your base with frequency maps, pointer movement, and contiguous-window thinking.',
  },
  {
    week: 'Week 2',
    title: 'Stacks, search, linked lists',
    focus: ['Stack', 'Binary Search', 'Linked List'],
    note:
      'Train your ability to maintain invariants, shrink search space, and manipulate pointers cleanly.',
  },
  {
    week: 'Week 3',
    title: 'Trees and heaps',
    focus: ['Trees', 'Heap / Priority Queue'],
    note:
      'Spend extra time on recursion, tree traversal templates, and priority queue usage.',
  },
  {
    week: 'Week 4',
    title: 'Backtracking and tries',
    focus: ['Backtracking', 'Tries'],
    note:
      'Focus on state-space exploration, pruning, and prefix-tree thinking.',
  },
  {
    week: 'Week 5',
    title: 'Graphs and advanced graphs',
    focus: ['Graphs', 'Advanced Graphs'],
    note:
      'Practice BFS, DFS, topological order, and shortest-path style reasoning.',
  },
  {
    week: 'Week 6',
    title: '1-D dynamic programming',
    focus: ['1-D Dynamic Programming'],
    note:
      'Convert each problem into state, transition, and base-case language.',
  },
  {
    week: 'Week 7',
    title: '2-D dynamic programming',
    focus: ['2-D Dynamic Programming'],
    note:
      'Work on table-based thinking, recursion-to-DP conversion, and memoization.',
  },
  {
    week: 'Week 8',
    title: 'Greedy, intervals, math, bits',
    focus: ['Greedy', 'Intervals', 'Math & Geometry', 'Bit Manipulation'],
    note:
      'Finish the unique set and use the remaining time for timed re-solves and weak-topic review.',
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseSections(markdown) {
  const sections = [];
  const sectionRegex = /##\s+([^\n]+)\n([\s\S]*?)(?=\n##\s+|$)/g;
  for (const match of markdown.matchAll(sectionRegex)) {
    const title = match[1].trim();
    const body = match[2];
    const problems = [];
    const problemRegex =
      /\d+\.\s+\[([^\]]+)\]\((https?:\/\/[^)]+)\)\s+\((Easy|Medium|Hard)\)/g;
    for (const problemMatch of body.matchAll(problemRegex)) {
      problems.push({
        title: problemMatch[1],
        url: problemMatch[2],
        difficulty: problemMatch[3],
      });
    }
    if (problems.length) {
      sections.push({ title, problems });
    }
  }
  return sections;
}

function difficultyClass(difficulty) {
  if (difficulty === 'Easy') return 'easy';
  if (difficulty === 'Medium') return 'medium';
  return 'hard';
}

function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function getPatternResources(title) {
  const entry = patternResources[title] ?? {
    youtube: `NeetCode ${title}`,
    youtubeAlt: `${title} interview tutorial`,
    reference: { label: 'NeetCode writeup index', url: NEETCODE_INDEX_URL },
  };
  return {
    youtube: youtubeSearchUrl(entry.youtube),
    youtubeAlt: youtubeSearchUrl(entry.youtubeAlt ?? `${title} interview tutorial`),
    reference: entry.reference,
  };
}

function renderProblemCard(problem, number) {
  const difficulty = difficultyClass(problem.difficulty);
  return `
    <a class="problem-card" href="${escapeHtml(problem.url)}" target="_blank" rel="noreferrer">
      <div class="problem-topline">
        <span class="problem-number">#${String(number).padStart(3, '0')}</span>
        <span class="difficulty ${difficulty}">${escapeHtml(problem.difficulty)}</span>
      </div>
      <div class="problem-title">${escapeHtml(problem.title)}</div>
      <div class="problem-footer">Open LeetCode problem</div>
    </a>
  `;
}

function renderSection(section, startNumber) {
  const resources = getPatternResources(section.title);
  const cards = section.problems
    .map((problem, index) => renderProblemCard(problem, startNumber + index))
    .join('');
  return `
    <details class="pattern-card" open>
      <summary>
        <div>
          <div class="pattern-title">${escapeHtml(section.title)}</div>
          <div class="pattern-meta">${section.problems.length} problems</div>
        </div>
        <div class="summary-pill">Core pattern block</div>
      </summary>
      <div class="pattern-resources">
        <div class="resource-heading">
          <span class="resource-kicker">Watch first</span>
          <div class="resource-note">Start with a short video lesson, then move into the linked problems.</div>
        </div>
        <div class="resource-links">
          <a class="resource-link video" href="${escapeHtml(resources.youtube)}" target="_blank" rel="noreferrer">
            Primary YouTube lesson
          </a>
          <a class="resource-link video alt" href="${escapeHtml(resources.youtubeAlt)}" target="_blank" rel="noreferrer">
            Backup YouTube lesson
          </a>
          <a class="resource-link reference" href="${escapeHtml(resources.reference.url)}" target="_blank" rel="noreferrer">
            ${escapeHtml(resources.reference.label)}
          </a>
        </div>
      </div>
      <div class="pattern-grid">
        ${cards}
      </div>
    </details>
  `;
}

function renderWeekCard(week, uniqueCount) {
  const reviewCount = Math.max(0, 30 - uniqueCount);
  const focusBadges = week.focus
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join('');
  return `
    <article class="week-card">
      <div class="week-header">
        <span class="week-label">${escapeHtml(week.week)}</span>
        <span class="week-total">${uniqueCount} new + ${reviewCount} review = 30 attempts</span>
      </div>
      <h3>${escapeHtml(week.title)}</h3>
      <p>${escapeHtml(week.note)}</p>
      <div class="chip-row">${focusBadges}</div>
    </article>
  `;
}

async function main() {
  const markdown = await fetch(SOURCE_URL).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch source markdown: ${res.status} ${res.statusText}`);
    }
    return res.text();
  });

  const sections = parseSections(markdown);
  const sectionCounts = new Map(sections.map((section) => [section.title, section.problems.length]));
  const totalUnique = sections.reduce((sum, section) => sum + section.problems.length, 0);
  const totalAttempts = 240;
  const totalReview = totalAttempts - totalUnique;

  const weekCards = weekPlan
    .map((week) => {
      const uniqueCount = week.focus.reduce(
        (sum, sectionTitle) => sum + (sectionCounts.get(sectionTitle) ?? 0),
        0,
      );
      return renderWeekCard(week, uniqueCount);
    })
    .join('');

  let runningNumber = 1;
  const patternSections = sections
    .map((section) => {
      const rendered = renderSection(section, runningNumber);
      runningNumber += section.problems.length;
      return rendered;
    })
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>8-Week DSA Plan for a React Developer</title>
  <style>
    :root {
      --bg: #ffffff;
      --bg-soft: #f8fbff;
      --panel: rgba(255, 255, 255, 0.9);
      --panel-strong: rgba(255, 255, 255, 0.98);
      --line: rgba(76, 121, 255, 0.14);
      --line-strong: rgba(76, 121, 255, 0.22);
      --text: #182235;
      --muted: #5f6f88;
      --accent: #2563eb;
      --accent2: #8b5cf6;
      --accent3: #14b8a6;
      --accent4: #f97316;
      --shadow: 0 18px 60px rgba(15, 23, 42, 0.08);
      --radius-xl: 28px;
      --radius-lg: 22px;
      --radius-md: 16px;
    }

    * { box-sizing: border-box; }

    html {
      color-scheme: light;
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      font-family: 'Manrope', 'Segoe UI', sans-serif;
      background:
        radial-gradient(circle at top left, rgba(37, 99, 235, 0.11), transparent 26%),
        radial-gradient(circle at top right, rgba(139, 92, 246, 0.11), transparent 24%),
        radial-gradient(circle at bottom left, rgba(20, 184, 166, 0.09), transparent 26%),
        radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.08), transparent 22%),
        linear-gradient(180deg, #ffffff 0%, #fbfdff 58%, #f5f8ff 100%);
    }

    .shell {
      width: min(1280px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 56px;
    }

    .hero {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 248, 255, 0.98));
      box-shadow: var(--shadow);
      padding: 32px;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: -140px -100px auto auto;
      width: 340px;
      height: 340px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.16), transparent 66%);
      pointer-events: none;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.10), rgba(139, 92, 246, 0.10));
      border: 1px solid rgba(37, 99, 235, 0.14);
      color: var(--accent);
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 800;
    }

    h1 {
      margin: 18px 0 12px;
      font-family: 'Space Grotesk', 'Manrope', sans-serif;
      font-size: clamp(2.2rem, 5vw, 4.6rem);
      line-height: 0.98;
      letter-spacing: -0.04em;
    }

    .hero-copy {
      max-width: 860px;
      font-size: 1.06rem;
      line-height: 1.7;
      color: var(--muted);
      margin: 0;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
      margin-top: 24px;
    }

    .metric {
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 251, 255, 0.98));
      padding: 18px;
    }

    .metric strong {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.8rem;
      letter-spacing: -0.04em;
      margin-bottom: 6px;
    }

    .metric span {
      color: var(--muted);
      line-height: 1.5;
      font-size: 0.96rem;
    }

    .section {
      margin-top: 24px;
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      background: rgba(255, 255, 255, 0.95);
      box-shadow: var(--shadow);
      padding: 24px;
    }

    .section h2 {
      margin: 0 0 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.65rem;
      letter-spacing: -0.03em;
    }

    .section p.lead {
      margin: 0 0 18px;
      color: var(--muted);
      line-height: 1.7;
    }

    .step-grid,
    .week-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .step {
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 255, 0.96));
      padding: 18px;
    }

    .step .num {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(20, 184, 166, 0.18));
      border: 1px solid rgba(37, 99, 235, 0.18);
      color: var(--text);
      font-weight: 800;
      margin-bottom: 12px;
    }

    .step h3,
    .week-card h3 {
      margin: 0 0 8px;
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: -0.03em;
      font-size: 1.16rem;
    }

    .step p,
    .week-card p {
      margin: 0;
      color: var(--muted);
      line-height: 1.6;
    }

    .week-card {
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(250, 251, 255, 0.96));
      padding: 18px;
    }

    .week-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .week-label,
    .week-total,
    .summary-pill,
    .difficulty,
    .chip,
    .pattern-meta {
      font-size: 0.82rem;
      letter-spacing: 0.02em;
      font-weight: 800;
    }

    .week-label {
      color: var(--accent);
      text-transform: uppercase;
    }

    .week-total {
      color: var(--muted);
      text-align: right;
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }

    .chip,
    .summary-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      padding: 8px 12px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.09), rgba(139, 92, 246, 0.09));
      border: 1px solid rgba(37, 99, 235, 0.12);
      color: var(--text);
    }

    .pattern-card {
      margin-top: 16px;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background: rgba(255, 255, 255, 0.96);
      overflow: hidden;
    }

    .pattern-card summary {
      cursor: pointer;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 20px;
      background: linear-gradient(180deg, rgba(250, 252, 255, 0.98), rgba(243, 247, 255, 0.98));
      border-bottom: 1px solid rgba(76, 121, 255, 0.10);
    }

    .pattern-card summary::-webkit-details-marker {
      display: none;
    }

    .pattern-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.15rem;
      letter-spacing: -0.03em;
      margin-bottom: 4px;
    }

    .pattern-meta {
      color: var(--muted);
      font-weight: 700;
    }

    .pattern-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      padding: 18px;
    }

    .pattern-resources {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 18px 0;
      flex-wrap: wrap;
    }

    .resource-heading {
      display: grid;
      gap: 6px;
      min-width: 220px;
    }

    .resource-kicker {
      color: var(--accent3);
      font-size: 0.8rem;
      font-weight: 900;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }

    .resource-note {
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.5;
      max-width: 420px;
    }

    .resource-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .resource-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 13px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 800;
      letter-spacing: 0.01em;
      border: 1px solid transparent;
      transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .resource-link:hover {
      transform: translateY(-1px);
    }

    .resource-link.video {
      color: #fff;
      background: linear-gradient(135deg, #ff7a18, #ff3d77);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .resource-link.video.alt {
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
    }

    .resource-link.reference {
      color: var(--text);
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.10), rgba(20, 184, 166, 0.10));
      border-color: rgba(37, 99, 235, 0.14);
    }

    .problem-card {
      display: block;
      text-decoration: none;
      color: inherit;
      border-radius: 18px;
      border: 1px solid rgba(76, 121, 255, 0.14);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 248, 255, 0.96));
      padding: 14px;
      min-height: 126px;
      transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
      box-shadow: 0 12px 34px rgba(15, 23, 42, 0.06);
    }

    .problem-card:hover {
      transform: translateY(-2px);
      border-color: rgba(37, 99, 235, 0.32);
      box-shadow: 0 16px 42px rgba(15, 23, 42, 0.10);
    }

    .problem-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;
    }

    .problem-number {
      color: var(--muted);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.06em;
    }

    .problem-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.02rem;
      letter-spacing: -0.02em;
      line-height: 1.35;
      margin-bottom: 16px;
    }

    .problem-footer {
      color: var(--muted);
      font-size: 0.84rem;
    }

    .difficulty {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid transparent;
      min-width: 72px;
    }

    .difficulty.easy {
      background: rgba(20, 184, 166, 0.12);
      border-color: rgba(20, 184, 166, 0.24);
      color: #0f8b7d;
    }

    .difficulty.medium {
      background: rgba(37, 99, 235, 0.10);
      border-color: rgba(37, 99, 235, 0.20);
      color: #1d4ed8;
    }

    .difficulty.hard {
      background: rgba(249, 115, 22, 0.12);
      border-color: rgba(249, 115, 22, 0.22);
      color: #c2410c;
    }

    .footer {
      margin-top: 24px;
      padding: 18px 8px 0;
      color: var(--muted);
      font-size: 0.94rem;
      line-height: 1.7;
    }

    .footer a {
      color: var(--accent);
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 1100px) {
      .hero-grid,
      .step-grid,
      .week-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .shell {
        width: min(100% - 20px, 1280px);
        padding-top: 16px;
      }

      .hero,
      .section {
        padding: 18px;
        border-radius: 22px;
      }

      .hero-grid,
      .step-grid,
      .week-grid {
        grid-template-columns: 1fr;
      }

      .pattern-card summary,
      .week-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .pattern-resources {
        align-items: flex-start;
        flex-direction: column;
      }

      .resource-heading {
        min-width: 0;
      }

      .week-total {
        text-align: left;
      }
    }
  </style>
</head>
<body>
  <main class="shell">
    <section class="hero">
      <span class="eyebrow">DSA roadmap for a React / React Native developer</span>
      <h1>8 weeks, 240 attempts, 150 core LeetCode problems</h1>
      <p class="hero-copy">
        This plan is built from the NeetCode 150 pattern order and tuned for someone with real shipping experience.
        The unique set gives you the core patterns; the review slots push the total attempt count into your 200-300 goal.
        The links point to the canonical LeetCode problems so you can move fast and stay organized.
      </p>
      <div class="hero-grid">
        <div class="metric">
          <strong>${totalUnique}</strong>
          <span>unique LeetCode problems in the core set</span>
        </div>
        <div class="metric">
          <strong>${totalAttempts}</strong>
          <span>total attempts target across 8 weeks</span>
        </div>
        <div class="metric">
          <strong>${totalReview}</strong>
          <span>review / re-solve attempts to lock in patterns</span>
        </div>
        <div class="metric">
          <strong>8</strong>
          <span>pattern-heavy weeks with a final mixed revision block</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>How to use the plan</h2>
      <p class="lead">
        Each day, do one focused block of new problems and one smaller block of review. If a problem takes too long,
        read the hint or solution, then close the page and solve it again from scratch. That second solve is where the pattern starts to stick.
      </p>
      <div class="step-grid">
        <div class="step">
          <div class="num">1</div>
          <h3>Recognize the pattern first</h3>
          <p>Before coding, ask whether the problem is really a window, pointer, stack, tree, graph, or DP question.</p>
        </div>
        <div class="step">
          <div class="num">2</div>
          <h3>Limit the first attempt</h3>
          <p>Give yourself 20 to 30 minutes. If you are stuck, get unstuck quickly, then re-derive the answer yourself.</p>
        </div>
        <div class="step">
          <div class="num">3</div>
          <h3>Re-solve the misses</h3>
          <p>At the end of the day, re-open one missed question and solve it without looking. This is how speed builds.</p>
        </div>
        <div class="step">
          <div class="num">4</div>
          <h3>Track the takeaway</h3>
          <p>Write one short note: pattern, invariant, and the key trick. A tiny notebook beats vague memory every time.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Weekly cadence</h2>
      <p class="lead">The weekly attempt budget is fixed at 30 attempts, which is aggressive but realistic for your 2-month target.</p>
      <div class="week-grid">
        ${weekCards}
      </div>
    </section>

    <section class="section">
      <h2>Pattern library</h2>
      <p class="lead">
        These are the core problems you should solve in pattern order. Use the sections as your checklist and the review slots above to repeat the hardest misses.
      </p>
      ${patternSections}
    </section>

    <section class="footer">
      <p>
        Source list used for the core set:
        <a href="https://neetcode.io/practice/practice/neetcode150" target="_blank" rel="noreferrer">NeetCode 150 practice page</a>
        and the
        <a href="https://gist.github.com/mayiwrite/c77a64f52a634c860732e96e5d8ca7e9" target="_blank" rel="noreferrer">NeetCode 150 markdown list</a>.
        All problem links in this page point to LeetCode.
      </p>
      <p>
        If you want a companion version, I can also turn this into a Codewars-first tracker by pattern after you try the LeetCode core set.
      </p>
    </section>
  </main>
</body>
</html>`;

  await writeFile(OUTPUT_FILE, html, 'utf8');
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
