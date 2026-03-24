import React from 'react';

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;