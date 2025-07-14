'use client';

import React from 'react';

export default function ImagePreview({ fileUrl, alt = 'Image Preview', width = 300, height = 300 }) {
    console.log(fileUrl, "File url")
  if (!fileUrl) return <p>No image to preview.</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: width + 20 }}>
      <img
        src={fileUrl}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: 'cover', borderRadius: '4px' }}
      />
    </div>
  );
}
