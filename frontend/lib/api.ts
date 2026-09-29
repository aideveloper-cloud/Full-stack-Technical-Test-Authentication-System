export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type User = {
  id: number | string;
  email: string;
};

export type LoginResponse = {
  accessToken: string;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

// NestJS ส่ง message ได้ทั้ง string และ string[] (จาก ValidationPipe)
function extractMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "message" in body) {
    const { message } = body as { message: unknown };
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
  }
  return fallback;
}

async function request<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...rest } = init;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    throw new ApiError(0, `ไม่สามารถเชื่อมต่อ Backend ได้ (${API_URL})`);
  }

  const body: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      extractMessage(body, `Request failed (${res.status})`),
    );
  }

  return body as T;
}

export const api = {
  register: (email: string, password: string) =>
    request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: (token: string) => request<User>("/users/me", { token }),
};
