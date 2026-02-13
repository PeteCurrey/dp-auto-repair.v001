

# Fix Mobile Menu Display and Contrast

## Problem
The mobile menu opens with a semi-transparent white background (`bg-white/40 backdrop-blur-sm`) inherited from the header container. The menu text uses `text-foreground/80` which can be nearly invisible against this light background, especially over light page content. The screenshot shows a large blank white area with unreadable text and missing navigation sections.

## Solution
Give the mobile menu dropdown its own solid dark background with explicit white text, making it fully readable regardless of what content is behind it. This matches the dark automotive branding.

## Changes (single file: `src/components/Header.tsx`)

1. **Mobile menu container** (line 221): Change from inheriting the transparent header background to a solid dark background:
   - Add `bg-gray-900/95 backdrop-blur-md rounded-b-lg` to the mobile nav wrapper so it's always dark and readable

2. **Section headers** ("Services", "Tuning"): Change `text-foreground/70` to `text-white/60` for guaranteed visibility on dark background

3. **Menu links**: Change `text-foreground/80` and `text-foreground` to `text-white/90` so all items are clearly readable

4. **Buttons**: Update `text-black` on outline buttons to `text-white` and adjust borders for the dark context

This ensures the mobile menu is always legible with white text on a dark background, matching the site's dark automotive aesthetic, regardless of page content behind it.

