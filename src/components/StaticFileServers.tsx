import { useEffect } from 'react';

const SitemapComponent = () => {
  useEffect(() => {
    // Set content type header and serve XML content
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Primary Pages -->
  <url>
    <loc>https://dpautorepair.co.uk/</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/services</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/about</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/contact</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Service Pages -->
  <url>
    <loc>https://dpautorepair.co.uk/tuning</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/dpf</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/general-repairs</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/diagnostics</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/routine-servicing</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/electrical-services</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/performance-tuning</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/collision-repair</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/air-conditioning</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/tyre-installation</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/mot</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/recovery-breakdown</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/clutch-replacement</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/timing-chain-belt</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/brake-service</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/suspension-repairs</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/fleet-support</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- SEO Landing Pages - Car Manufacturers -->
  <url>
    <loc>https://dpautorepair.co.uk/ford-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/bmw-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/audi-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/volkswagen-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/mercedes-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/alfa-romeo-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/bentley-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/citroen-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/chrysler-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/dodge-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/abarth-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/aston-martin-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/chevrolet-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/cupra-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/ferrari-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/fiat-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/honda-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/hyundai-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/isuzu-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/jaguar-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/jeep-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/kia-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/lamborghini-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/land-rover-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/lexus-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/lotus-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/mazda-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/mitsubishi-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/mini-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/peugeot-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/porsche-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/renault-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/rolls-royce-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/seat-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/skoda-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/subaru-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/suzuki-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/toyota-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/vauxhall-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/tvr-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/westfield-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://dpautorepair.co.uk/volvo-servicing-chesterfield</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    // Create a new Response with XML content
    const response = new Response(sitemapContent, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });

    // Download the sitemap file for the user
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Sitemap content for dpautorepair.co.uk -->
  <!-- View source to see full XML structure -->
</urlset>`}
    </div>
  );
};

const RobotsComponent = () => {
  useEffect(() => {
    const robotsContent = `User-agent: *
Allow: /

# Specific crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Sitemap
Sitemap: https://dpautorepair.co.uk/sitemap.xml`;

    // Download the robots.txt file for the user
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      {`User-agent: *
Allow: /

# Specific crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Sitemap
Sitemap: https://dpautorepair.co.uk/sitemap.xml`}
    </div>
  );
};

export { SitemapComponent, RobotsComponent };