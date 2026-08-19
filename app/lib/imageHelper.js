/**
 * Normalize image URL to use the correct Appwrite endpoint and project ID
 * @param {string} imageUrl - Image URL or file ID that might be from wrong endpoint/project
 * @returns {string} Normalized URL with correct endpoint and project ID
 */
export function normalizeImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder-product.svg";
  
  const correctEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://appwrite-g7kpzn0lrb8trwg58bhs7x2h.arctech.fun/v1";
  const correctProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "rakape";
  const bucketId = process.env.NEXT_PUBLIC_IMAGES_BUCKET || "images";
  
  if (typeof imageUrl === "string") {
    // If it's already an Appwrite URL from any host/project
    if (imageUrl.includes("appwrite") || imageUrl.includes("/storage/buckets/")) {
      const match = imageUrl.match(/\/storage\/buckets\/([^\/]+)\/files\/([^\/]+)\/(\w+)/);
      if (match) {
        const bucket = match[1];
        const fileId = match[2];
        const mode = match[3] || "view";
        return `${correctEndpoint}/storage/buckets/${bucket}/files/${fileId}/${mode}?project=${correctProject}`;
      }
    }
    
    // If it's a full http URL (non-Appwrite external), return as is
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    
    // If it's a relative path starting with '/', return as is
    if (imageUrl.startsWith("/")) {
      return imageUrl;
    }

    // Otherwise, treat as a raw Appwrite File ID
    return `${correctEndpoint}/storage/buckets/${bucketId}/files/${imageUrl}/view?project=${correctProject}`;
  }
  
  return imageUrl;
}

/**
 * Generate Appwrite file preview URL with dimension constraints
 */
export function getImageUrl(fileId, width = 400, height = 400) {
  if (!fileId) return "/placeholder-product.svg";
  return normalizeImageUrl(fileId);
}

/**
 * Get thumbnail URL (smaller size for lists)
 */
export function getThumbnailUrl(fileId) {
  if (!fileId) return "/placeholder-product.svg";
  return normalizeImageUrl(fileId);
}

/**
 * Get full size URL
 */
export function getFullImageUrl(fileId) {
  if (!fileId) return "/placeholder-product.svg";
  return normalizeImageUrl(fileId);
}

/**
 * Smart product image fallback based on product name and category
 */
export function getProductFallback(product) {
  if (!product) return "/downloads/pinching-coffee.jpg";
  const name = (product.productName || "").toLowerCase();
  const cat = (product.category || "").toLowerCase();

  if (name.includes("americano") || name.includes("black") || name.includes("pait")) {
    return "/downloads/iced-americano.jpg";
  }
  if (name.includes("tiramisu") || cat.includes("pastry") || name.includes("cake")) {
    return "/downloads/tiramisu.jpg";
  }
  if (name.includes("matcha") || name.includes("milo") || name.includes("choco") || name.includes("cioccolato") || cat.includes("non-coffee")) {
    return "/downloads/kaffee-meister-BIeXZhg_7sw-unsplash.jpg";
  }
  if (name.includes("espresso") || name.includes("drip") || cat.includes("hot-coffee")) {
    return "/downloads/pouring-machine.jpg";
  }
  return "/downloads/pinching-coffee.jpg";
}


