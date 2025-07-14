'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/appwrite';
import ImagePreview from '@/app/components/ImagePreview';

export default function ImageDisplay({ bucketId, fileId }) {
    console.log(bucketId, fileId)
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const url = storage.getFileView(bucketId, fileId);
    console.log(url, "URL")
    setImageUrl(url.href); // .href converts URL object to string
  }, [bucketId, fileId]);

  return (
    <div>
      <h2>Image Preview</h2>
      <ImagePreview fileUrl={imageUrl} />
    </div>
  );
}
