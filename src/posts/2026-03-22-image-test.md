---
title: Image layout test
date: 2026-03-22
author: Mike Abney
description: Demonstrating the four image layout modes — full, center, left float, and right float — with click-to-zoom lightbox.
layout: post.njk
---

This post tests the image embedding system. All four layout modes are shown below, along with the lightbox (click any image to zoom). The bird photo is used throughout.

## Full width

A full-width image spans the entire content column. Good for hero shots, panoramas, or any image where you want maximum visual impact.

{% image "img/bird.jpg", "A bird perched on a branch, shot against soft bokeh foliage", "full", "Full-width — the image spans the entire content column" %}

The image above fills the content width and breaks the rhythm of the text deliberately. Use it sparingly — one per post section at most.

## Centered block

A centered image sits in the middle of the column at 80% width. Text runs above and below it, not alongside. Good for diagrams, screenshots, and square-ish photos where wrapping text would look awkward.

Some preceding text to establish context. The image below is centered at 80% of the content width, with the caption underneath.

{% image "img/bird.jpg", "A bird perched on a branch, facing left", "center", "Center — 80% width, no text wrapping" %}

The paragraph continues after the image. On screens narrower than 900px, center images expand to full width automatically.

## Float left

A left-floated image sits at 40% width with text wrapping around its right side. This is the most readable layout for portrait photos and pull-quote style images alongside running prose.

{% image "img/bird.jpg", "A bird with ruffled feathers perched on a mossy branch", "left", "Left float — text wraps to the right" %}

Notice how this paragraph wraps around the right side of the image. For this to work well you need enough text — at least three or four lines of body copy alongside the image. The palette behind Low Gravitas leans into warm ochres and muted greens, which is why a bird in natural light fits so naturally into the aesthetic. The warm background tones of `--lgz-bg-deep` and the cool blue of `--lgz-bright-blue` for headings come directly from the same instinct: reduce blue channel fatigue while preserving contrast where it matters. A floated image sitting in the flow of text is one of the oldest tricks in editorial typography, and it still works when the image earns its place.

This paragraph follows after the float clears. The clearfix on `.post-content::after` ensures the section boundary is respected even if the image is taller than the adjacent text.

## Float right

A right-floated image mirrors the left variant — 40% width, text wraps on the left side.

{% image "img/bird.jpg", "A bird in profile, feathers catching warm afternoon light", "right", "Right float — text wraps to the left" %}

This paragraph wraps to the left of the image. Right floats work well when you want to balance a page that has already used a left float, or when the image has a directional subject that naturally faces into the text. Typographically, the float margin is set to `1.75em` on the text side and `0` on the outer edge, keeping the image flush with the content boundary while giving the prose room to breathe. At mobile widths all four layout modes collapse to full-width — the float is cleared, the width becomes 100%, and the reading experience stays linear.

## Code blocks

Code blocks use the Zen theme palette for syntax highlighting. Here's a Python example:

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

And some JavaScript:

```js
async function fetchTheme(name) {
  const res = await fetch(`/api/themes/${name}`);
  if (!res.ok) throw new Error(`Theme not found: ${name}`);
  const { palette, metadata } = await res.json();
  return { palette, metadata };
}

const { palette } = await fetchTheme('low-gravitas-zen');
console.log(`Loaded ${Object.keys(palette).length} color tokens`);
```

Inline code like `--lgz-bg-deep` and `var(--accent)` uses a slightly different style — a subtle background with a green tint.

---

All images are clickable — a native `<dialog>` lightbox opens with a blurred backdrop. Escape closes it. The `<a class="img-link">` wrapper also provides progressive enhancement: without JavaScript, clicking navigates directly to the source image.
