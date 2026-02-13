
# Enhanced Performance Gain Calculator with AI-Powered Vehicle Data

## Overview

The current calculator relies on a hardcoded local database (`remap-db.ts`) with only ~20 makes and limited models/variants. We'll enhance it by adding an AI-powered lookup that can provide real performance data for virtually any make, model, and engine variant -- falling back to the local database when available for instant results.

## What Changes

### 1. New Edge Function: `remap-lookup`

A new backend function that uses Lovable AI (Gemini) with **tool calling** to return structured vehicle performance data. When a user searches for a vehicle not in the local database, the frontend calls this function with the make, model, and variant. The AI returns:
- Stock horsepower (bhp)
- Stock torque (Nm)
- Engine type (petrol turbo, diesel turbo, or naturally aspirated)
- Realistic Stage 1 and Stage 2 remapped figures based on known tuning data for that specific engine

This gives accurate, vehicle-specific estimates rather than generic percentage multipliers.

### 2. Enhanced Calculator Component

- **"Search any vehicle" input**: A free-text search field (e.g. "BMW 320d F30") that triggers the AI lookup for vehicles not in the local database
- **AI loading state**: A brief loading indicator while the AI fetches real-world data
- **Smarter results display**: When AI data is used, show a note that figures are based on known tuning data for that specific engine rather than generic estimates
- **Keep existing functionality**: The local database dropdown and manual mode remain as fast, offline-first options
- **Visual progress bars**: Replace the plain table with animated progress bars showing original vs remapped power/torque for a more engaging visual

### 3. Updated Local Database Fallback

The existing `REMAP_DB` stays as-is for instant results. The AI lookup only fires when the user searches for a vehicle not covered locally, or when they use the new free-text search.

## How It Works

1. User can still use dropdowns (local DB) or manual entry as before -- these work instantly
2. New "Search any vehicle" tab lets users type their car (e.g. "2018 Golf GTI")
3. On submit, the frontend calls the `remap-lookup` edge function
4. The edge function asks Gemini for real performance specs using tool calling to get structured data
5. Results populate the calculator with vehicle-specific figures
6. Stage gains are calculated using the returned engine type combined with tuning-specific data from the AI

## Technical Details

### Edge Function (`supabase/functions/remap-lookup/index.ts`)
- Uses Lovable AI Gateway with `google/gemini-3-flash-preview` model
- Tool calling schema enforces structured output: `{ make, model, variant, engineType, stockHp, stockNm, stage1Hp, stage1Nm, stage2Hp, stage2Nm }`
- System prompt instructs the AI to use real-world tuning data and be conservative with estimates
- Non-streaming (uses tool calling, returns JSON)
- `verify_jwt = false` in config.toml (public-facing calculator)

### Component Changes (`src/components/PerformanceGainCalculator.tsx`)
- Add third tab: "Search any vehicle" alongside existing "By vehicle" and "Manual"
- New state for AI query, loading, and AI-sourced results
- When AI results arrive, override the stage calculations with vehicle-specific figures
- Add visual progress bars for power/torque comparisons
- Add fuel economy estimate indication (economy remap option)

### Config Update (`supabase/config.toml`)
- Add `[functions.remap-lookup]` with `verify_jwt = false`
