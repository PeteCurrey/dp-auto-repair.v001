import { useEffect } from 'react';

const SitemapRoute = () => {
  useEffect(() => {
    // Fetch and serve the sitemap.xml content
    fetch('/sitemap.xml')
      .then(response => response.text())
      .then(xmlContent => {
        // Create a new response with proper XML content type
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Replace current page content with XML
        document.documentElement.innerHTML = xmlContent;
      })
      .catch(() => {
        // If fetch fails, redirect to handle via static file serving
        window.location.href = '/sitemap.xml';
      });
  }, []);

  // Return null as the component will replace the entire document
  return null;
};

export default SitemapRoute;