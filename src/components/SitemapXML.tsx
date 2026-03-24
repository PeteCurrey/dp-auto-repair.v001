"use client";

import { useEffect } from 'react';

const SitemapXML = () => {
  useEffect(() => {
    // Set the content type to XML
    const metaElement = document.createElement('meta');
    metaElement.httpEquiv = 'Content-Type';
    metaElement.content = 'application/xml; charset=utf-8';
    document.head.appendChild(metaElement);

    return () => {
      document.head.removeChild(metaElement);
    };
  }, []);

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dpautorepair.co.uk/</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/services</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/about</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/contact</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/mot</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/car-remap</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/ecu-remapping</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/tuning</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/diagnostics</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/brake-service</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/clutch-replacement</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/air-conditioning</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/dpf</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/electrical-services</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/exhaust-fabrication</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/general-repairs</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/routine-servicing</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/suspension-repairs</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/timing-chain-belt</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dpautorepair.co.uk/tyre-installation</loc>
    <lastmod>2024-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  // Return the XML content as text
  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      fontSize: '12px', 
      whiteSpace: 'pre-wrap',
      margin: 0,
      padding: 0
    }}>
      {sitemapContent}
    </pre>
  );
};

export default SitemapXML;