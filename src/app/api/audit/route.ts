import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urls, targetEndpoint, timestamp, client } = body;

    if (!targetEndpoint) {
      return NextResponse.json(
        { error: "No se especificó la ruta o servidor de destino en la configuración técnica." },
        { status: 400 }
      );
    }

    // Invocación HTTP de servidor a servidor hacia la instancia de orquestación n8n.
    // Al originarse desde el entorno Node.js del backend de Next.js, se omiten por completo
    // las políticas de Same-Origin y los chequeos preflight (OPTIONS) del navegador.
    const n8nResponse = await fetch(targetEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Cabeceras estándar para asegurar compatibilidad de ingesta en webhooks
        "Accept": "application/json",
      },
      body: JSON.stringify({
        urls,
        timestamp: timestamp || new Date().toISOString(),
        client: client || "Next.js Backend Proxy Server",
      }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text().catch(() => "Sin detalles adicionales");
      return NextResponse.json(
        { 
          error: `El servidor destino rechazó la conexión (Código ${n8nResponse.status})`, 
          details: errorText 
        },
        { status: n8nResponse.status }
      );
    }

    // Parseo flexible de la respuesta retornada por el webhook
    const contentType = n8nResponse.headers.get("content-type") || "";
    let responseData;
    if (contentType.includes("application/json")) {
      responseData = await n8nResponse.json().catch(() => ({}));
    } else {
      responseData = { text: await n8nResponse.text().catch(() => "OK") };
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error: any) {
    // Captura fidedigna si la instancia de n8n se encuentra inactiva o con puertos cerrados
    return NextResponse.json(
      { 
        error: "No se logró establecer contacto con el servidor de automatización.", 
        details: error?.message || "Fallo de red o timeout" 
      },
      { status: 500 }
    );
  }
}
