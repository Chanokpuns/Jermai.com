export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TOKEN_KEY = "token";
const USER_KEY = "user";

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const getToken = () => read(TOKEN_KEY);
export const isLoggedIn = () => !!getToken();

export function getUser() {
  try {
    return JSON.parse(read(USER_KEY));
  } catch {
    return null;
  }
}

export function saveAuth({ token, user }) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
  }
}

export function imageUrl(path) {
  return path ? `${API_URL}${path}` : "/src/assets/it.jpg";
}

export async function api(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const isForm = body instanceof FormData;
  if (body && !isForm) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      method,
      headers,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    });
  } catch {
    throw new Error("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
  }

  if (res.status === 401 && token) clearAuth();
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "เกิดข้อผิดพลาด");
  return data;
}
