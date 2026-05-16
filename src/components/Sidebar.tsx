import React, { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  Layers, 
  Settings, 
  Cpu,
  HelpCircle,
  ExternalLink,
  Database,
  Lock
} from "lucide-react";

interface SidebarProps {
  n8nBaseUrl?: string;
  onBaseUrlChange?: (url: string) => void;
  n8nPort?: string;
  onPortChange?: (port: string) => void;
  workflowPath?: string;
  onWorkflowPathChange?: (path: string) => void;
}

export default function Sidebar({ 
  n8nBaseUrl, 
  onBaseUrlChange, 
  n8nPort,
  onPortChange,
  workflowPath, 
  onWorkflowPathChange 
}: SidebarProps) {
  const [showAdminConfig, setShowAdminConfig] = useState(false);

  const menuItems = [
    { name: "Auditoría de Productos", icon: Database, active: true, badge: "Activo" },
    { name: "Análisis de Enlaces", icon: Search, active: false, badge: "Módulo" },
    { name: "Rendimiento Web", icon: Cpu, active: false, badge: "Módulo" },
    { name: "Estructura de Títulos", icon: Layers, active: false, badge: "Módulo" },
    { name: "Historial de Reportes", icon: FileText, active: false },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen">
      {/* Brand / Logo corporativo limpio */}
      <div className="p-6 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base text-slate-900 tracking-tight">
            Panel de Auditoría
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Plataforma SEO
          </p>
        </div>
      </div>

      {/* Menú Principal */}
      <div className="flex-1 px-4 py-6 space-y-6">
        <div>
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Módulos del Sistema
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  disabled={!item.active}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-not-allowed opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${item.active ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      item.active 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Panel Informativo Limpio (Caja Negra para el Usuario) */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 space-y-2">
          <p className="text-xs font-bold text-slate-900">Capacidad del Sistema</p>
          <p className="text-xs text-slate-600 leading-normal">
            El procesamiento se realiza de forma centralizada enviando un reporte consolidado directamente a su bandeja de correo.
          </p>
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Lote máximo:</span>
            <span className="font-bold text-slate-900">10 Enlaces</span>
          </div>
        </div>
      </div>

      {/* Footer / Sección de Configuración Interna (Administrador) */}
      <div className="p-4 border-t border-slate-200 mt-auto space-y-3 bg-slate-50">
        {/* Toggle para mostrar configuración de red (en un futuro restringido por Auth) */}
        {onBaseUrlChange && onPortChange && onWorkflowPathChange && (
          <div className="space-y-2">
            <button 
              type="button"
              onClick={() => setShowAdminConfig(!showAdminConfig)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Configuración Interna (Admin)
              </span>
              <span className="text-[10px] text-slate-400">{showAdminConfig ? "Ocultar" : "Mostrar"}</span>
            </button>

            {showAdminConfig && (
              <div className="p-3 bg-white rounded-md border border-slate-200 space-y-3">
                {/* Campo 1: Servidor Central de n8n */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Servidor Base n8n
                  </label>
                  <input
                    type="text"
                    value={n8nBaseUrl || ""}
                    onChange={(e) => onBaseUrlChange(e.target.value)}
                    placeholder="http://localhost"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-600"
                  />
                  <p className="text-[9px] text-slate-400 leading-tight">
                    Dominio o IP raíz de orquestación.
                  </p>
                </div>

                {/* Campo 2: Puerto del Servidor */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Puerto (Opcional)
                  </label>
                  <input
                    type="text"
                    value={n8nPort || ""}
                    onChange={(e) => onPortChange(e.target.value)}
                    placeholder="5001"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-600"
                  />
                  <p className="text-[9px] text-slate-400 leading-tight">
                    Puerto asignado (ej. 5001).
                  </p>
                </div>

                {/* Campo 3: Ruta del Flujo Actual */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Ruta del Flujo (Endpoint)
                  </label>
                  <input
                    type="text"
                    value={workflowPath || ""}
                    onChange={(e) => onWorkflowPathChange(e.target.value)}
                    placeholder="/webhook/pdp-seo-audit"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-600"
                  />
                  <p className="text-[9px] text-slate-400 leading-tight">
                    Ruta asignada al receptor de auditoría.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Soporte y Manuales</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}
