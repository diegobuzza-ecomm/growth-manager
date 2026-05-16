"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Link as LinkIcon, 
  Trash2, 
  Layers,
  ArrowRight,
  Loader2,
  RefreshCw,
  Database
} from "lucide-react";

export default function Home() {
  // Configuración técnica de red segmentada con el valor por defecto solicitado
  const [n8nBaseUrl, setN8nBaseUrl] = useState("http://localhost");
  const [n8nPort, setN8nPort] = useState("5001");
  const [workflowPath, setWorkflowPath] = useState("/webhook/pdp-seo-audit");
  
  // Entrada del usuario final
  const [rawInput, setRawInput] = useState("");
  
  // Estados de ejecución puros (Caja Negra)
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ submittedCount: number; batchId: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Análisis y depuración de enlaces en tiempo real
  const parsedUrls = useMemo(() => {
    if (!rawInput.trim()) return [];
    const lines = rawInput.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    
    const seen = new Set<string>();
    const result: { url: string; isValid: boolean; isDuplicate: boolean }[] = [];
    
    lines.forEach(line => {
      let urlStr = line;
      if (!urlStr.startsWith("http://") && !urlStr.startsWith("https://")) {
        urlStr = "https://" + urlStr;
      }
      
      let isValid = false;
      try {
        new URL(urlStr);
        isValid = true;
      } catch {
        isValid = false;
      }

      const isDuplicate = seen.has(urlStr);
      if (isValid && !isDuplicate) {
        seen.add(urlStr);
      }

      result.push({
        url: urlStr,
        isValid,
        isDuplicate
      });
    });

    return result;
  }, [rawInput]);

  const validUrls = useMemo(() => {
    return parsedUrls.filter(u => u.isValid && !u.isDuplicate).map(u => u.url);
  }, [parsedUrls]);

  const hasExceededLimit = validUrls.length > 10;

  // Ejecución de la solicitud de red canalizada de forma segura a través del proxy interno
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validUrls.length === 0) {
      setErrorMsg("Se requiere ingresar al menos el enlace de un producto.");
      return;
    }
    if (hasExceededLimit) {
      setErrorMsg("Para garantizar un reporte detallado, procesamos un máximo de 10 productos por solicitud.");
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);
    setSuccessData(null);

    // Composición inteligente de la URL de destino final en n8n
    const cleanBase = n8nBaseUrl.trim().replace(/\/+$/, "");
    const cleanPath = workflowPath.trim().replace(/^\/+/, "");
    const cleanPort = n8nPort.trim();

    let targetEndpoint = cleanBase;
    if (cleanPort) {
      // Validamos que el servidor base no termine ya en el puerto indicado para evitar duplicaciones
      const portSuffix = `:${cleanPort}`;
      if (!targetEndpoint.endsWith(portSuffix)) {
        targetEndpoint += portSuffix;
      }
    }
    targetEndpoint += `/${cleanPath}`;

    try {
      // Petición canalizada hacia nuestro proxy de Next.js para eludir políticas CORS del navegador
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: validUrls,
          targetEndpoint,
          timestamp: new Date().toISOString(),
          client: "SaaS Universal Optimizer",
        }),
      });

      const resultData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resultData?.error || "El servidor destino rechazó la petición o no se encuentra disponible.");
      }

      // Confirmación exitosa real
      setSuccessData({
        submittedCount: validUrls.length,
        batchId: "REP-" + Math.floor(100000 + Math.random() * 900000)
      });
      setRawInput("");
    } catch (err: any) {
      // Notificación fidedigna del fallo de conexión
      setErrorMsg("No se logró conectar con el servidor de procesamiento. Verifique que el servicio esté activo y accesible.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadExampleBatch = () => {
    const examples = [
      "https://midominio.com/productos/articulo-catalogo-principal",
      "https://midominio.com/productos/item-destacado-estandar",
      "https://midominio.com/productos/producto-base-referencia-a",
      "https://midominio.com/productos/producto-base-referencia-b",
      "https://midominio.com/productos/articulo-complementario"
    ];
    setRawInput(examples.join("\n"));
    setErrorMsg(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Panel lateral con inyección de los tres parámetros de red base */}
      <Sidebar 
        n8nBaseUrl={n8nBaseUrl}
        onBaseUrlChange={setN8nBaseUrl}
        n8nPort={n8nPort}
        onPortChange={setN8nPort}
        workflowPath={workflowPath}
        onWorkflowPathChange={setWorkflowPath}
      />

      {/* Área de Trabajo Principal (Caja Negra de cara al usuario final) */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Cabecera Limpia */}
        <header className="h-20 border-b border-slate-200 px-10 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded border border-blue-200">
              Panel Activo
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Optimización de Descripciones de Producto
            </h2>
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-500 font-medium">Salida del Reporte</p>
            <p className="text-sm font-bold text-blue-600">Bandeja de Correo</p>
          </div>
        </header>

        {/* Contenedor General */}
        <div className="flex-1 p-10 max-w-5xl w-full mx-auto space-y-10">
          {/* Banner de Instrucciones Claro y Directo */}
          <div className="rounded-xl p-8 bg-white border border-slate-200 shadow-sm">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-6 h-6 text-blue-600 shrink-0" />
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Generación Inteligente de Descripciones para su Tienda
                </h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Ingrese las direcciones web de sus productos (hasta 10 por envío). 
                Nuestro sistema analizará automáticamente las características y detalles actuales publicados en su sitio, 
                redactará sugerencias orientadas a captar clientes y mejorar su visibilidad en buscadores, 
                y le enviará un reporte unificado directamente a su correo electrónico.
              </p>
              
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={loadExampleBatch}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
                  Cargar lista de productos de ejemplo
                </button>
              </div>
            </div>
          </div>

          {/* Alerta Real de Errores de Conexión */}
          {errorMsg && (
            <div className="p-5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-900 text-base shadow-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold text-red-950">Atención:</p>
                <p className="text-red-800 font-normal mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Estado de Confirmación Verídico */}
          {successData && (
            <div className="p-8 rounded-xl bg-white border border-emerald-300 shadow-sm space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">¡Solicitud recibida correctamente!</h4>
                  <p className="text-sm text-slate-600 font-normal mt-0.5">
                    Código de reporte: <span className="font-mono font-bold text-slate-900">{successData.batchId}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-slate-900 font-bold flex items-center gap-2 text-sm">
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  Proceso en curso:
                </p>
                <ol className="list-decimal list-inside text-slate-700 space-y-2 font-normal text-sm pl-1">
                  <li>Lectura de las <span className="text-slate-900 font-bold">{successData.submittedCount} páginas</span> indicadas.</li>
                  <li>Análisis automático de títulos, precios e información actual.</li>
                  <li>Redacción de propuestas optimizadas y claras.</li>
                  <li>Envío del documento final consolidado a su correo.</li>
                </ol>
              </div>

              <p className="text-sm text-slate-500 font-normal italic">
                El sistema ya está trabajando en sus textos. Recibirá la notificación en su bandeja de entrada.
              </p>
            </div>
          )}

          {/* Formulario de Entrada de Datos */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-blue-600 shrink-0" />
                  Enlaces de sus productos
                </label>
                <span className={`text-xs px-3 py-1 rounded font-bold border ${
                  validUrls.length === 0
                    ? "bg-slate-50 text-slate-500 border-slate-200"
                    : hasExceededLimit
                    ? "bg-red-50 text-red-800 border-red-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}>
                  {validUrls.length} de 10 productos permitidos
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  disabled={isLoading}
                  rows={8}
                  placeholder="Pegue aquí los enlaces de sus productos (un enlace por renglón)...&#10;https://midominio.com/productos/producto-1&#10;https://midominio.com/productos/producto-2"
                  className={`w-full bg-white border rounded-lg p-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors leading-relaxed ${
                    hasExceededLimit 
                      ? "border-red-400 focus:border-red-600" 
                      : "border-slate-300 focus:border-blue-600"
                  }`}
                />
                {rawInput && !isLoading && (
                  <button
                    type="button"
                    onClick={() => setRawInput("")}
                    className="absolute right-4 top-4 p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                    title="Vaciar recuadro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Listado de enlaces detectados */}
              {parsedUrls.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 px-1 uppercase tracking-wider">
                    Desglose de enlaces reconocidos:
                  </p>
                  <div className="max-h-48 overflow-y-auto space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {parsedUrls.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs px-3 py-2 rounded bg-white border border-slate-200 font-mono">
                        <span className="truncate max-w-[65%] text-slate-800">{item.url}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          {!item.isValid ? (
                            <span className="text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-bold text-[11px]">
                              Revisar enlace
                            </span>
                          ) : item.isDuplicate ? (
                            <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold text-[11px]">
                              Repetido
                            </span>
                          ) : (
                            <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[11px]">
                              Correcto
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Infracción del límite */}
              {hasExceededLimit && (
                <p className="text-sm text-red-700 font-bold flex items-center gap-2 pt-1">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  Por favor, deje un máximo de 10 productos para procesar la solicitud correctamente.
                </p>
              )}
            </div>

            {/* Panel de Carga Real y Limpio */}
            {isLoading && (
              <div className="p-6 rounded-xl bg-white border border-slate-300 flex items-center gap-4 shadow-sm animate-pulse">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin shrink-0" />
                <div>
                  <p className="text-base font-bold text-slate-900">Conectando con el servidor...</p>
                  <p className="text-xs text-slate-500 mt-0.5">Transmitiendo los enlaces para su análisis automatizado.</p>
                </div>
              </div>
            )}

            {/* Controles de Disparo */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div className="text-xs text-slate-500 font-normal flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <span>El documento llegará de forma directa a su email</span>
              </div>

              <button
                type="submit"
                disabled={isLoading || validUrls.length === 0 || hasExceededLimit}
                className={`px-6 py-3 rounded-md text-sm font-bold flex items-center gap-2 transition-colors ${
                  isLoading || validUrls.length === 0 || hasExceededLimit
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    <span>Enviando Solicitud...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    <span>Generar Reporte de Textos</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
