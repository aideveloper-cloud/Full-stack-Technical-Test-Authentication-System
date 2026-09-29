"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiError, api, type User } from "@/lib/api";
import { tokenStore } from "@/lib/token";

type State =
  | { status: "loading" }
  | { status: "ready"; user: User }
  | { status: "error"; message: string };

export default function ProfilePage() {
  const router = useRouter();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      router.replace("/login");
      return;
    }

    api
      .me(token)
      .then((user) => setState({ status: "ready", user }))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          tokenStore.clear();
          router.replace("/login");
          return;
        }
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Failed to load",
        });
      });
  }, [router]);

  function logout() {
    tokenStore.clear();
    router.replace("/login");
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <section className="w-full max-w-sm space-y-4 rounded-xl border border-black/10 p-6 shadow-sm dark:border-white/15">
        <h1 className="text-2xl font-semibold">Profile</h1>

        {state.status === "loading" && <p className="text-sm">Loading...</p>}

        {state.status === "error" && (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            {state.message}
          </p>
        )}

        {state.status === "ready" && (
          <>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="opacity-60">ID</dt>
                <dd>{state.user.id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="opacity-60">Email</dt>
                <dd className="break-all">{state.user.email}</dd>
              </div>
            </dl>

            <details className="text-xs">
              <summary className="cursor-pointer opacity-60">
                Raw response from GET /users/me
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-md bg-black/5 p-2 dark:bg-white/10">
                {JSON.stringify(state.user, null, 2)}
              </pre>
            </details>
          </>
        )}

        <button
          onClick={logout}
          className="w-full rounded-md border border-black/20 px-3 py-2 font-medium dark:border-white/25"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
