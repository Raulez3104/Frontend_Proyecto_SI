import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type RiskLevel = "alto" | "medio" | "bajo" | "seguro";

interface AnalysisResult {
  riesgo: RiskLevel;
  puntuacion: number;
  resumen: string;
  razones: string[];
  recomendacion: string;
}

// ── Risk config ────────────────────────────────────────────────────────────

const riskConfig: Record<
  RiskLevel,
  {
    label: string;
    labelUpper: string;
    bar: string;
    cardBg: string;
    cardBorder: string;
    textColor: string;
    iconColor: string;
    tagBg: string;
    tagText: string;
  }
> = {
  alto: {
    label: "Riesgo Alto",
    labelUpper: "CRÍTICO",
    bar: "bg-red-500",
    cardBg: "bg-red-50",
    cardBorder: "border-red-200",
    textColor: "text-red-600",
    iconColor: "text-red-500",
    tagBg: "bg-red-100",
    tagText: "text-red-700",
  },
  medio: {
    label: "Riesgo Medio",
    labelUpper: "MODERADO",
    bar: "bg-yellow-400",
    cardBg: "bg-yellow-50",
    cardBorder: "border-yellow-200",
    textColor: "text-yellow-700",
    iconColor: "text-yellow-500",
    tagBg: "bg-yellow-100",
    tagText: "text-yellow-700",
  },
  bajo: {
    label: "Riesgo Bajo",
    labelUpper: "BAJO",
    bar: "bg-blue-400",
    cardBg: "bg-blue-50",
    cardBorder: "border-blue-200",
    textColor: "text-blue-700",
    iconColor: "text-blue-500",
    tagBg: "bg-blue-100",
    tagText: "text-blue-700",
  },
  seguro: {
    label: "Seguro",
    labelUpper: "SEGURO",
    bar: "bg-green-500",
    cardBg: "bg-green-50",
    cardBorder: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-500",
    tagBg: "bg-green-100",
    tagText: "text-green-700",
  },
};

// ── Spinner ────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
      />
    </svg>
  );
}

// ── AnalysisPage ───────────────────────────────────────────────────────────

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<"url" | "email">("url");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? "Error del servidor");
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(
        `No se pudo conectar al backend. Verifica que esté corriendo en localhost:3000. (${msg})`
      );
    } finally {
      setLoading(false);
    }
  };

  const cfg = result ? riskConfig[result.riesgo] ?? riskConfig["medio"] : null;

  // Extract suspicious keywords found from reasons to show as tags
  const suspiciousKeywords = result?.razones
    .find((r) => r.includes("palabras de alerta") || r.includes("palabra sospechosa"))
    ?.match(/"([^"]+)"/g)
    ?.map((s) => s.replace(/"/g, ""))
    ?? [];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a2c5b] mb-2">
          Análisis Profundo de Enlaces y Correos
        </h1>
        <p className="mt-2 text-gray-500 text-sm max-w-2xl">
          Pega cualquier URL sospechosa, encabezado de correo o contenido de
          texto a continuación para escanear de forma segura amenazas,
          intenciones maliciosas e indicadores conocidos de phishing.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-5">
          <button
            className={`pb-3 px-1 mr-6 text-sm font-medium transition-colors ${
              activeTab === "url"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setActiveTab("url")}
          >
            Analizar URL
          </button>
          <button
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === "email"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setActiveTab("email")}
          >
            Analizar Contenido de Correo
          </button>
        </div>

        {/* Textarea */}
        <div className="relative mb-4">
          <textarea
            rows={3}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !loading) {
                e.preventDefault();
                analyze();
              }
            }}
            placeholder={
              activeTab === "url"
                ? "https://ejemplo-enlace-sospechoso.com/login/seguro..."
                : "Pega aquí el contenido del correo sospechoso..."
            }
            disabled={loading}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={() => navigator.clipboard.readText().then((t) => setInputValue(t)).catch(() => {})}
              title="Pegar"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            <button
              onClick={() => { setInputValue(""); setResult(null); setError(null); }}
              title="Limpiar"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-end gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Escaneo seguro y cifrado
          </span>
          <button
            onClick={analyze}
            disabled={loading || !inputValue.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            {loading ? <Spinner /> : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            {loading ? "Analizando..." : "Analizar Ahora"}
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {result && cfg && (
        <>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Resultados del Análisis
          </h2>

          {/* Top cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            {/* Threat level */}
            <div className={`${cfg.cardBg} border ${cfg.cardBorder} rounded-2xl p-6 flex flex-col items-center justify-center text-center`}>
              <div className={`${cfg.iconColor} mb-3`}>
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${cfg.textColor} opacity-75`}>
                Nivel de Amenaza
              </p>
              <p className={`text-3xl font-extrabold mb-3 ${cfg.textColor}`}>
                {cfg.labelUpper}
              </p>
              {/* Score bar */}
              <div className="w-full bg-white/60 rounded-full h-1.5 mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cfg.bar} transition-all duration-700`}
                  style={{ width: `${result.puntuacion}%` }}
                />
              </div>
              <p className={`text-xs leading-relaxed ${cfg.textColor}`}>
                {result.resumen}
              </p>
            </div>

            {/* Detected reasons */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-800">Motivos Detectados</h3>
              </div>
              <ul className="space-y-2">
                {result.razones.slice(0, 4).map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="mt-0.5 shrink-0 text-gray-400">•</span>
                    {r}
                  </li>
                ))}
                {result.razones.length === 0 && (
                  <li className="text-xs text-gray-400 italic">Sin motivos de riesgo.</li>
                )}
              </ul>
            </div>

            {/* Suspicious keywords */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">Tt</span>
                </div>
                <h3 className="text-sm font-bold text-gray-800">Palabras Clave Sospechosas</h3>
              </div>
              {suspiciousKeywords.length > 0 ? (
                <>
                  <p className="text-xs text-gray-500 mb-3">
                    La URL contiene marcadores de urgencia e intentos de suplantación.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suspiciousKeywords.map((tag) => (
                      <span
                        key={tag}
                        className={`${cfg.tagBg} ${cfg.tagText} text-xs font-medium px-2.5 py-1 rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No se detectaron palabras clave sospechosas.
                </p>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-base font-bold text-gray-900">Acciones Recomendadas</h3>
            </div>
            <div className="space-y-4">
              {/* Recomendación del backend */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0">
                  <svg className={`w-5 h-5 ${cfg.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Recomendación principal</p>
                  <p className="text-xs text-gray-500 mt-0.5">{result.recomendacion}</p>
                </div>
              </div>

              {/* Acciones fijas según nivel */}
              {(result.riesgo === "alto" || result.riesgo === "medio") && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">No interactúes con este enlace.</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        No hagas clic en el enlace, no ingreses credenciales ni descargues archivos adjuntos si se trataba de un correo electrónico.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Informa a Seguridad Informática.</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Reenvía el correo original al soporte técnico de TI de TVU para una protección de red más amplia.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Revisa el módulo de capacitación: Anatomía de URLs.</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Repasa cómo detectar dominios engañosos en la pestaña de Educación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty state (no result yet and no error) */}
      {!result && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
          <svg className="w-12 h-12 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm">Ingresa una URL arriba y presiona <strong>Analizar Ahora</strong> para ver los resultados.</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between text-xs text-gray-400">
        <span>© 2026 UMSS TVU Créditos Institucionales. Todos los derechos reservados.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-600 transition-colors">Política de Seguridad</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Términos de Privacidad</a>
        </div>
      </div>
    </div>
  );
}