const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

export async function api(path, options = {}) {
  try {
    const isFormData = options.body instanceof FormData;

    const headers = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    };

    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    const response = await fetch(`${API_URL}${cleanPath}`, {
      ...options,
      headers,
      credentials: "include",
    });

    const contentType = response.headers.get("content-type") || "";

    let data = null;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const responseText = await response.text();

      data = responseText
        ? { message: responseText }
        : null;
    }

    if (!response.ok) {
      throw new Error(
        data?.error ||
        data?.message ||
        `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(`API Error [${path}]:`, error);
    throw error;
  }
}

export { API_URL };