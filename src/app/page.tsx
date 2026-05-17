import React from "react";
import { HardHat } from "lucide-react";

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
          <HardHat className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Página en Construcción
        </h1>
        <p className="text-slate-500 max-w-sm mx-auto text-base">
          Estamos trabajando en la nueva versión de nuestro sitio web principal.
        </p>
      </div>
    </div>
  );
}
