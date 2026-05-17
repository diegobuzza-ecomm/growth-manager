import React from "react";
import { Settings, Save, Bell, Globe, Languages } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <main className="flex-1 min-w-0 p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Encabezado */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <Settings className="w-6 h-6 text-slate-600" />
              Configuración General
            </h2>
            <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
              &larr; Volver al Panel
            </Link>
          </div>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            Ajusta las preferencias de optimización y comportamiento por defecto de la Inteligencia Artificial.
          </p>
        </div>

        {/* Formulario Dummy */}
        <div className="card-enterprise p-8 space-y-8">
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
              Preferencias de Idioma y Tono
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-slate-500" />
                  Idioma Principal
                </label>
                <select disabled className="block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 bg-slate-50 cursor-not-allowed">
                  <option>Español (Argentina)</option>
                  <option>Español (España)</option>
                  <option>Inglés (USA)</option>
                  <option>Portugués (Brasil)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-500" />
                  Tono de Redacción SEO
                </label>
                <select disabled className="block w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 bg-slate-50 cursor-not-allowed">
                  <option>Profesional y Confiable</option>
                  <option>Casual y Cercano</option>
                  <option>Urgente (Promocional)</option>
                  <option>Lujoso y Exclusivo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
              Notificaciones
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-not-allowed opacity-70">
                <input type="checkbox" defaultChecked disabled className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300" />
                <div>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-slate-500" />
                    Alertas por Correo Electrónico
                  </p>
                  <p className="text-xs text-slate-500">Recibir un resumen detallado cada vez que finalice una optimización masiva de catálogo.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
            <button disabled className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-500 bg-slate-100 cursor-not-allowed">
              Cancelar
            </button>
            <button disabled className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-400 cursor-not-allowed shadow-sm">
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}
