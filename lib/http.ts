export async function parseJsonResponse<T>(
  response: Response,
): Promise<T | undefined> {
  const text = await response.text();

  if (!text.trim()) {
    return undefined;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}
