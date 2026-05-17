"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  PackageSearch, 
  BarChart, 
  Layers, 
  Store,
  Loader2,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  UserCircle,
  LogOut,
  ShieldCheck,
  Settings
} from "lucide-react";

// Placeholder para la URL de n8n
const N8N_WEBHOOK_URL = "SU_WEBHOOK_URL_AQUI_2";

function DashboardContent() {
  const searchParams = useSearchParams();
  
  // Detección "Context-Aware" del origen
  const source = searchParams.get("source");
  const isEmbedded = source === "tiendanube" || searchParams.has("token");
  
  const userId = searchParams.get("user_id") || "";
  const token = searchParams.get("token") || "";

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (N8N_WEBHOOK_URL === "SU_WEBHOOK_URL_AQUI_2") {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess(true);
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
          token,
          source: isEmbedded ? "tiendanube_embedded" : "native",
          action: "optimize_products"
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      setSuccess(true);
    } catch (err) {
      setErrorMsg("Ocurrió un error al intentar iniciar el proceso. Por favor, intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      
      {/* 1. NAVEGACIÓN GLOBAL (Sólo en Modo Nativo) */}
      {!isEmbedded && (
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 hidden md:flex">
          {/* Logo Nativo */}
          <div className="p-6 border-b border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-900 tracking-tight">
                Plataforma SEO
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Panel de Control
              </p>
            </div>
          </div>

          {/* Menú Principal */}
          <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            <div>
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Herramientas
              </p>
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-colors bg-blue-50 text-blue-700 border border-blue-100">
                  <PackageSearch className="w-5 h-5 shrink-0 text-blue-600" />
                  <span className="text-left">Optimización de Productos</span>
                </button>
                <div className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors text-slate-400 bg-transparent cursor-not-allowed opacity-70">
                  <BarChart className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span>Auditoría SEO General</span>
                    <span className="text-[10px] text-slate-400 font-normal">Próximamente</span>
                  </div>
                </div>
              </nav>
            </div>
            
            {/* Sección de Facturación Nativa */}
            <div className="pt-4 border-t border-slate-100">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Cuenta
              </p>
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <CreditCard className="w-5 h-5 shrink-0 text-slate-400" />
                  <span className="text-left">Mi Suscripción</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <Settings className="w-5 h-5 shrink-0 text-slate-400" />
                  <span className="text-left">Configuración</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Autenticación y Sesión Nativa */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
              <UserCircle className="w-5 h-5 text-slate-500" />
              <span>Mi Perfil</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5 text-red-500" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>
      )}

      {/* Header Móvil (Sólo Modo Nativo) */}
      {!isEmbedded && (
        <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-10 flex items-center justify-between p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">Plataforma SEO</span>
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* ÁREA DE CONTENIDO CENTRAL (Visible en ambos modos) */}
      <main className={`flex-1 min-w-0 ${!isEmbedded ? "md:pt-0 pt-16" : ""}`}>
        <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Encabezado */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Optimización de Contenido para Productos
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Desde esta sección analizaremos y mejoraremos los títulos y descripciones de todos los productos de tu tienda utilizando IA, para ayudarte a vender más y mejorar tu posicionamiento SEO.
            </p>
          </div>

          {/* Gestión de Suscripción (Context-Aware) */}
          {isEmbedded && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <Store className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900">Integración Activa</p>
                <p className="text-sm text-blue-800 mt-0.5">
                  Estás gestionando tus optimizaciones desde la integración oficial. La facturación de tu plan activo se gestiona directamente desde la plataforma de terceros.
                </p>
              </div>
            </div>
          )}

          {/* Formulario Principal de la Herramienta */}
          <div className="card-enterprise p-8 space-y-6">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">¡Proceso iniciado!</h3>
                  <p className="text-slate-600">
                    Estamos analizando tus productos. Te enviaremos un correo a <span className="font-semibold text-slate-900">{email}</span> con los detalles en unos minutos.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-bold text-slate-900">
                      Correo Electrónico para Reportes
                    </label>
                    <p className="text-xs text-slate-500 mb-2">
                      Ingresa o confirma el email donde recibirás las alertas y el reporte final de la optimización.
                    </p>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      placeholder="tu@correo.com"
                      className="block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm bg-white"
                    />
                  </div>

                  {/* Nota sobre alcance futuro */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-700 flex items-center gap-2">
                      <span className="font-medium">Alcance:</span> Se auditará todo el catálogo disponible en tu tienda.
                    </p>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 font-medium">{errorMsg}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className={`w-full md:w-auto px-8 py-3.5 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-all flex items-center justify-center gap-2
                      ${isSubmitting || !email
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-md cursor-pointer"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <PackageSearch className="w-5 h-5" />
                        <span>Iniciar Optimización de Catálogo</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ContextAwareDashboardPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
