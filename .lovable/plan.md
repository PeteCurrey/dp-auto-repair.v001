

## Design Enhancement Plan: Premium UX Overhaul

### Current State Assessment

The site has a solid foundation with a red/black automotive theme, but several areas feel generic and lack the premium polish of a high-end automotive brand site:

- **No scroll animations** on the homepage (only the ECU Remapping page has `ScrollReveal`)
- **Hero section** uses basic `animate-fade-up` CSS class with no stagger
- **Service cards** have no entrance animations
- **Testimonials carousel** is functional but lacks visual refinement
- **FAQ section** uses abrupt show/hide with no height animation
- **Footer** is plain with no visual separation or polish
- **No loading transitions** between page sections
- **Header** lacks scroll-aware behaviour (no shrink/colour change on scroll)
- **About section** images lack hover effects or parallax
- **Missing** subtle grain/noise texture, refined spacing, and micro-interactions

### Plan

#### 1. Enhanced Global CSS & Animation System
**File: `src/index.css`**
- Add new keyframes: `float`, `shimmer`, `count-up`, `blur-in`
- Add a subtle noise/grain texture utility class for premium backgrounds
- Add `.glass-card` utility for consistent glassmorphism across components
- Add smooth `::selection` colour styling
- Refine `hover-lift` with a subtler, more elegant cubic-bezier curve

**File: `tailwind.config.ts`**
- Add new animation entries for the keyframes above
- Add `backdrop-blur` extension values if needed

#### 2. Scroll-Aware Sticky Header
**File: `src/components/Header.tsx`**
- Add `useEffect` with scroll listener to track `scrollY`
- When scrolled past ~50px: shrink header height, add solid background with stronger blur, add bottom border shadow
- Smooth transition between transparent and solid states
- Add subtle slide-down entrance animation on page load

#### 3. Homepage Scroll Animations
**File: `src/pages/Index.tsx`**
- Wrap all major sections (`ServicesOverview`, `AboutSection`, `ServiceCategoryNav`, `TestimonialsSection`, `FAQSection`) in `ScrollReveal`

**File: `src/components/Hero.tsx`**
- Replace plain `animate-fade-up` with staggered entrance: badges first (delay 200ms), heading (400ms), subtitle (600ms), buttons (800ms)
- Add a subtle parallax scroll effect on the background image using a scroll listener
- Add animated gradient line or pulse accent under the heading

**File: `src/components/ServicesOverview.tsx`**
- Wrap each service card in `ScrollReveal` with staggered delays
- Add icon hover rotation/scale micro-interaction
- Add gradient border effect on hover

**File: `src/components/AboutSection.tsx`**
- Wrap content and images in `ScrollReveal` with left/right directions
- Add subtle image hover zoom effect (scale on hover with overflow-hidden)
- Animate stats numbers with a count-up visual cue

#### 4. Refined Testimonials Section
**File: `src/components/TestimonialsSection.tsx`**
- Add `ScrollReveal` to trust badges with stagger
- Improve carousel card design: larger quote icon with gradient, subtle card border glow on active
- Add smoother dot indicator transitions (width animation already exists, refine timing)

#### 5. Animated FAQ Section
**File: `src/components/FAQSection.tsx`**
- Replace abrupt show/hide with animated height transition using `grid-rows` trick (`grid-template-rows: 0fr` to `1fr`)
- Add chevron rotation animation (already partial, make smoother)
- Add `ScrollReveal` wrapper
- Add subtle left border accent on open items

#### 6. Footer Polish
**File: `src/components/Footer.tsx`**
- Add a gradient divider line at top (primary gradient)
- Add `ScrollReveal` to each column with stagger
- Add hover underline animation on links (slide-in underline)
- Improve social icon hover with scale + glow

#### 7. ScrollReveal Enhancement
**File: `src/components/ScrollReveal.tsx`**
- Add `scale` direction option for a subtle zoom-in entrance
- Add `once` prop (default true) so animations don't replay on scroll back

### Technical Approach
- All changes are CSS/Tailwind + React state, no new dependencies needed
- Scroll listener for header uses `requestAnimationFrame` or passive event for performance
- FAQ height animation uses CSS grid trick (no JS measurement needed)
- All animations respect `prefers-reduced-motion` media query

### Files to Edit
1. `src/index.css` -- new utilities and keyframes
2. `tailwind.config.ts` -- new animation config
3. `src/components/Header.tsx` -- scroll-aware behaviour
4. `src/components/Hero.tsx` -- staggered entrance, parallax
5. `src/components/ServicesOverview.tsx` -- scroll reveal, micro-interactions
6. `src/components/AboutSection.tsx` -- scroll reveal, image effects
7. `src/components/TestimonialsSection.tsx` -- scroll reveal, refinements
8. `src/components/FAQSection.tsx` -- height animation, accent styling
9. `src/components/Footer.tsx` -- polish and scroll reveal
10. `src/components/ScrollReveal.tsx` -- add scale direction
11. `src/pages/Index.tsx` -- wrap sections in ScrollReveal

