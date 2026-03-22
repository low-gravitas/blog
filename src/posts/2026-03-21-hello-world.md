---
title: Hello, World!
date: 2026-03-21
author: Low Gravitas
description: Welcome to the Low Gravitas blog — introducing our new space for writing about themes, fonts, developer tools, and the philosophy behind warm, low-blue-light design.
layout: post.njk
tags:
  - meta
  - design
---

Welcome to the Low Gravitas blog. This is where we'll write about the projects we're building, the design decisions behind them, and the broader ideas around making developer environments warmer and easier on the eyes.

## What we're about

Most developer tools default to high-contrast, high-blue-light interfaces. That's fine for short sessions, but if you're spending 8+ hours a day in a terminal or editor, it adds up. Low Gravitas is an attempt to build a coherent set of tools around a different aesthetic — warm backgrounds, reduced blue light, and careful attention to contrast ratios that are comfortable rather than just technically compliant.

The two main projects so far:

- **[Low Gravitas Zen](/low-gravitas-zen-theme/)** — a color theme for editors and terminals. The palette is built around warm browns and yellows for backgrounds, with carefully tuned ANSI colors that maintain WCAG AA contrast while staying in the warm end of the spectrum.
- **[Low Gravitas Symbols](/low-gravitas-symbol-font/)** — a single font file with 11,800+ glyphs from Nerd Fonts, Font Awesome, Material Design Icons, and more. One font, no subsetting headaches.

## A quick code example

Here's the kind of thing the Zen theme is designed for — Python with warm syntax highlighting:

```python
from typing import Generator

def fibonacci(n: int) -> Generator[int, None, None]:
    """Yield the first n Fibonacci numbers."""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Print the first 10
for i, value in enumerate(fibonacci(10)):
    print(f"  F({i}) = {value}")
```

And some JavaScript, because why not:

```javascript
async function fetchTheme(name) {
  const res = await fetch(`/api/themes/${name}`);
  if (!res.ok) throw new Error(`Theme not found: ${name}`);
  const { palette, metadata } = await res.json();
  return { palette, metadata };
}

// Usage
const { palette } = await fetchTheme('low-gravitas-zen');
console.log(`Loaded ${Object.keys(palette).length} color tokens`);
```

## What's next

We'll be writing about:

- The design process behind the Zen palette — why these specific colors, how we handle the light/dark split, and what "WCAG AA but comfortable" actually means in practice
- Technical deep-dives on the symbol font — how 11,800 glyphs get packed into one file, the CSS subset builder, and terminal rendering quirks
- Tooling and workflow posts — the scripts and automation we use to maintain the projects

If any of that sounds interesting, grab the [RSS feed](/blog/feed.xml) or watch the [GitHub org](https://github.com/low-gravitas).

---

*The blog is built with [Eleventy 3](https://www.11ty.dev/) and styled with the Zen theme itself. Source is on [GitHub](https://github.com/low-gravitas/blog).*
