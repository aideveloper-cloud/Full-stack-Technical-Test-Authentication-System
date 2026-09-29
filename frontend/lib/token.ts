// เก็บ token ใน localStorage เพื่อความเรียบง่ายของโจทย์
// (trade-off: เสี่ยง XSS มากกว่า HTTP-only cookie)
const KEY = "accessToken";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(KEY)),
  set: (token: string) => localStorage.setItem(KEY, token),
  clear: () => localStorage.removeItem(KEY),
};
