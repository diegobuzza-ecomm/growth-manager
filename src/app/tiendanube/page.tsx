import React from "react";
import { Store, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TiendanubeSuccessPage() {
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
            Tu tienda de Tiendanube ha sido enlazada correctamente con nuestra plataforma. Ya estamos listos para optimizar tu SEO.
          </p>
        </div>

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
