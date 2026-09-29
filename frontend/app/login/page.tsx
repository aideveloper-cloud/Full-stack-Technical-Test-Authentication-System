"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { api } from "@/lib/api";
import { tokenStore } from "@/lib/token";

export default function LoginPage() {
  const router = useRouter();

  async function login(email: string, password: string) {
    const { accessToken } = await api.login(email, password);
    tokenStore.set(accessToken);
    router.push("/profile");
  }

  return (
    <AuthForm
      title="Login"
      submitLabel="Login"
      onSubmit={login}
      footer={{
        text: "No account yet?",
        href: "/register",
        linkLabel: "Register",
      }}
    />
  );
}
