"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { api } from "@/lib/api";
import { tokenStore } from "@/lib/token";

export default function RegisterPage() {
  const router = useRouter();

  // สมัครเสร็จแล้ว login ต่อทันที เพื่อทดสอบทั้งสอง endpoint ในครั้งเดียว
  async function register(email: string, password: string) {
    await api.register(email, password);
    const { accessToken } = await api.login(email, password);
    tokenStore.set(accessToken);
    router.push("/profile");
  }

  return (
    <AuthForm
      title="Register"
      submitLabel="Create account"
      onSubmit={register}
      footer={{
        text: "Already have an account?",
        href: "/login",
        linkLabel: "Login",
      }}
    />
  );
}
