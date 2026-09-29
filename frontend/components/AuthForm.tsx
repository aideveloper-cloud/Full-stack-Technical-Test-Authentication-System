"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Props = {
  title: string;
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  footer: { text: string; href: string; linkLabel: string };
};

export function AuthForm({ title, submitLabel, onSubmit, footer }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-4 rounded-xl border border-black/10 p-6 shadow-sm dark:border-white/15"
      >
        <h1 className="text-2xl font-semibold">{title}</h1>

        <label className="block space-y-1">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-md border border-black/20 bg-transparent px-3 py-2 dark:border-white/25"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-md border border-black/20 bg-transparent px-3 py-2 dark:border-white/25"
          />
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-foreground px-3 py-2 font-medium text-background disabled:opacity-50"
        >
          {loading ? "Please wait..." : submitLabel}
        </button>

        <p className="text-center text-sm">
          {footer.text}{" "}
          <Link href={footer.href} className="underline">
            {footer.linkLabel}
          </Link>
        </p>
      </form>
    </main>
  );
}
