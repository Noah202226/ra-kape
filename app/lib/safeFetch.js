export class FetchError extends Error {
  constructor(message, status = 500, response = null) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.response = response;
  }
}

export async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = options.timeout || 30000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new FetchError(text || `HTTP ${response.status}`, response.status, response);
    }

    try {
      const json = await response.json();
      return json;
    } catch (err) {
      throw new FetchError('Invalid JSON response', response.status, response);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new FetchError('Request timeout', 408);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function safeFetchPost(url, data, options = {}) {
  const merged = {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(data),
  };
  return safeFetch(url, merged);
}

export async function safeFetchUpload(url, formData, options = {}) {
  const merged = { ...options, method: 'POST', body: formData };
  return safeFetch(url, merged);
}
