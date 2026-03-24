"use client";

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to create or update meta tags
    const ensureMeta = (
      nameOrProperty: string,
      content: string,
      isProperty = false
    ) => {
      let el = document.querySelector(
        isProperty
          ? `meta[property="${nameOrProperty}"]`
          : `meta[name="${nameOrProperty}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', nameOrProperty);
        } else {
          el.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    // Meta description
    ensureMeta('description', description);

    // Meta keywords (optional)
    if (keywords) {
      ensureMeta('keywords', keywords);
    }

    // Canonical URL (defaults to current URL)
    const canonicalUrl = canonical || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Open Graph tags
    ensureMeta('og:title', ogTitle || title, true);
    ensureMeta('og:description', ogDescription || description, true);
    ensureMeta('og:type', 'website', true);
    ensureMeta('og:url', canonicalUrl, true);
    if (ogImage) {
      ensureMeta('og:image', ogImage, true);
    }

    // Twitter Card tags
    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:title', ogTitle || title);
    ensureMeta('twitter:description', ogDescription || description);
    if (ogImage) {
      ensureMeta('twitter:image', ogImage);
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage]);
};