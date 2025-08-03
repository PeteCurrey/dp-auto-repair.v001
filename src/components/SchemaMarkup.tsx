import { useEffect } from 'react';

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  useEffect(() => {
    // Create script element with JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    
    // Add to head
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null; // This component doesn't render anything visible
};

export default SchemaMarkup;