"use client";

import React, { useState } from "react";
import { Store, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function TiendanubeSuccessPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");

    try {
      // Reemplazar la URL por la URL real del webhook de n8n
      const response = await fetch("https://n8n.tu-dominio.com/webhook/tiendaNubeRegistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      setStatus("success");
    } catch (error) {
      console.error("Error submitting registration:", error);
      setStatus("error");
      setErrorMessage("Hubo un error al registrar tus datos. Por favor, intenta de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 card-enterprise text-center">
          <div className="mx-auto h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 mb-6 shadow-sm">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ¡Registro Completado!
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mt-4">
            Tu cuenta ha sido creada y enlazada correctamente con tu tienda.
          </p>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              href="/dashboard?source=tiendanube&user_id=123"
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-all bg-blue-600 hover:bg-blue-700 hover:shadow-md cursor-pointer"
            >
              <span>Ir a Panel de Gestión</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 card-enterprise">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 mb-6 shadow-sm">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ¡Conexión Exitosa!
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mt-4">
            Tu tienda de Tiendanube ha sido enlazada correctamente. Para finalizar el registro, por favor crea tu cuenta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="confirmPassword">
                Repetir Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {errorMessage}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-all bg-blue-600 hover:bg-blue-700 hover:shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registrando...</span>
                </>
              ) : (
                <>
                  <span>Completar Registro</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
