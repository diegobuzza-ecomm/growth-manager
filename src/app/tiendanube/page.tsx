"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Store, Mail, CheckCircle2, Loader2, Send } from "lucide-react";

const N8N_WEBHOOK_URL = "SU_WEBHOOK_URL_AQUI";

function TiendanubeInstallForm() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id") || "";
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Si la URL no está configurada, simulamos éxito en dev para testear UI
      if (N8N_WEBHOOK_URL === "SU_WEBHOOK_URL_AQUI") {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        return;
      }

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user_id: userId,
          source: "tiendanube_install"
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      setIsSuccess(true);
    } catch (error) {
      setErrorMsg("Ocurrió un error al enviar tus datos. Por favor intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center transition-all duration-500 ease-in-out space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">¡Perfecto! Tu auditoría está en camino.</h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-sm mx-auto">
            Revisa tu bandeja de entrada en los próximos 5 minutos (mira también en Spam por las dudas).
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-300">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-bold text-slate-900">
          Correo Electrónico
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder="tu@correo.com"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm bg-white"
          />
        </div>
        {errorMsg && (
          <p className="text-sm text-red-600 mt-2 font-medium">{errorMsg}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !email}
        className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-all
          ${isSubmitting || !email 
            ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-md cursor-pointer"
          }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generando...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Generar Auditoría de SEO Gratis</span>
          </>
        )}
      </button>
      
      {userId && (
        <p className="text-xs text-center text-slate-400 pt-2 font-medium">
          ID de Tienda vinculado: {userId}
        </p>
      )}
    </form>
  );
}

export default function TiendanubeSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200 card-enterprise">
        <div className="text-center space-y-2">
          <div className="mx-auto h-14 w-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 mb-6 shadow-sm">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ¡Conexión Exitosa con tu Tienda!
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mt-4">
            Estamos listos para analizar el SEO de tus productos y categorías. Introduce tu correo electrónico y te enviaremos el reporte completo en unos minutos.
          </p>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>}>
            <TiendanubeInstallForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
