"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/validations/auth";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "Invalid credentials"); return; }
      window.location.href = "/admin";
    } catch { setError("Something went wrong"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#111] rounded-2xl p-10 border border-[#333]">
          <div className="text-center mb-10">
            <p className="text-white font-bold text-lg tracking-[0.05em] uppercase">Taxi Service Bristol</p>
            <h1 className="text-white text-2xl font-bold mt-4">Admin Login</h1>
          </div>
          {error && <div className="bg-[#E53E3E]/10 border border-[#E53E3E]/30 rounded-lg p-4 mb-6"><p className="text-[#E53E3E] text-sm">{error}</p></div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div><input {...register("email")} type="email" placeholder="Email address" className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white placeholder:text-[#666] focus:border-[#FFD900] transition-colors" />{errors.email && <p className="text-[#E53E3E] text-xs mt-1">{errors.email.message}</p>}</div>
            <div><input {...register("password")} type="password" placeholder="Password" className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white placeholder:text-[#666] focus:border-[#FFD900] transition-colors" />{errors.password && <p className="text-[#E53E3E] text-xs mt-1">{errors.password.message}</p>}</div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#FFD900] text-black py-3.5 rounded-lg font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" />Signing in...</> : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center"><a href="/" className="text-[#FFD900] text-sm hover:underline">Return to Website</a></div>
        </div>
      </div>
    </div>
  );
}
