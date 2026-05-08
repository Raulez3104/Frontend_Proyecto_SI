import React, { useState } from "react";
import type { ReactNode } from "react";

// ── Icons ──────────────────────────────────────────────────
const LinkIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#3b5bdb" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#e03131" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ animation: "spin 0.8s linear infinite" }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

// ── Badge ──────────────────────────────────────────────────
interface BadgeProps {
  label: string;
  color: "green" | "red" | "blue" | "yellow";
}

function Badge({ label, color }: BadgeProps) {
  const styles = {
    green: "bg-green-100 text-green-700 border border-green-200",
    red: "bg-red-100 text-red-600 border border-red-200",
    blue: "bg-blue-100 text-blue-700 border border-blue-200",
    yellow: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[color]}`}>
      {label}
    </span>
  );
}

// ── Stat Card ──────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-[#1a2c5b]">{value}</p>
      </div>
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────
type RiskLevel = "alto" | "medio" | "bajo" | "seguro";

interface AnalysisResult {
  riesgo: RiskLevel;
  puntuacion: number;
  resumen: string;
  razones: string[];
  recomendacion: string;
}

interface RiskConfig {
  label: string;
  bar: string;
  badge: "red" | "yellow" | "blue" | "green";
  icon: string;
  bg: string;
  text: string;
}

const riskConfig: Record<RiskLevel, RiskConfig> = {
  alto: {
    label: "Riesgo Alto",
    bar: "bg-red-500",
    badge: "red",
    icon: "🚨",
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
  },
  medio: {
    label: "Riesgo Medio",
    bar: "bg-yellow-400",
    badge: "yellow",
    icon: "⚠️",
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-yellow-700",
  },
  bajo: {
    label: "Riesgo Bajo",
    bar: "bg-blue-400",
    badge: "blue",
    icon: "🔍",
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
  seguro: {
    label: "Seguro",
    bar: "bg-green-500",
    badge: "green",
    icon: "✅",
    bg: "bg-green-50 border-green-200",
    text: "text-green-700",
  },
};

// ── Analyze Modal ──────────────────────────────────────────
interface AnalyzeModalProps {
  onClose: () => void;
  onResult: (result: AnalysisResult, url: string) => void;
}

function AnalyzeModal({ onClose, onResult }: AnalyzeModalProps) {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error ?? "Error del servidor");
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
      onResult(data, url.trim());
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(`No se pudo conectar al backend. Verifica que esté corriendo en localhost:3000. (${msg})`);
    } finally {
      setLoading(false);
    }
  };

  const cfg = result ? (riskConfig[result.riesgo] ?? riskConfig["medio"]) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(10,18,40,0.55)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ animation: "fadeIn 0.18s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <LinkIcon />
            <span className="font-bold text-[#1a2c5b] text-sm">Analizar Enlace</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
            URL a analizar
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && analyze()}
              placeholder="https://ejemplo.com/..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2c5b]/20 focus:border-[#1a2c5b]"
              disabled={loading}
              autoFocus
            />
            <button
              onClick={analyze}
              disabled={loading || !url.trim()}
              className="flex items-center gap-2 bg-[#1a2c5b] hover:bg-[#243d7a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {loading ? <SpinnerIcon /> : <LinkIcon />}
              {loading ? "Analizando..." : "Analizar"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Result */}
          {result && cfg && (
            <div className={`mt-5 rounded-xl border p-4 ${cfg.bg}`} style={{ animation: "fadeIn 0.2s ease-out" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cfg.icon}</span>
                  <span className={`font-bold text-base ${cfg.text}`}>{cfg.label}</span>
                </div>
                <span className={`text-xs font-bold ${cfg.text}`}>{result.puntuacion}/100</span>
              </div>

              <div className="h-2 bg-white/60 rounded-full mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${cfg.bar}`}
                  style={{ width: `${result.puntuacion}%` }}
                />
              </div>

              <p className={`text-sm mb-3 font-medium ${cfg.text}`}>{result.resumen}</p>

              {result.razones?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Motivos detectados
                  </p>
                  <ul className="space-y-1">
                    {result.razones.map((r, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="mt-0.5 shrink-0">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recomendacion && (
                <div className="bg-white/70 rounded-lg px-3 py-2 text-xs text-gray-700">
                  <span className="font-semibold">Recomendación: </span>
                  {result.recomendacion}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
          <span>Análisis por IA — TVU UMSS</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-medium transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Activity Row type (moved outside component) ────────────
interface ActivityRow {
  event: string;
  type: string;
  date: string;
  badge: ReactNode;
}

// ── Main Component ─────────────────────────────────────────
export default function Dashboard() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [analyses, setAnalyses] = useState<number>(24);
  const [threats, setThreats] = useState<number>(8);

  const [recentActivity, setRecentActivity] = useState<ActivityRow[]>([
    {
      event: "Análisis de enlace sospechoso",
      type: "Análisis",
      date: "07 may 2026",
      badge: <Badge label="Riesgo Alto" color="red" />,
    },
    {
      event: "Reporte enviado: soporte@fakebank.com",
      type: "Reporte",
      date: "07 may 2026",
      badge: <Badge label="Pendiente" color="blue" />,
    },
    {
      event: "Correo verificado correctamente",
      type: "Sistema",
      date: "06 may 2026",
      badge: <Badge label="Seguro" color="green" />,
    },
  ]);

  const handleResult = (result: AnalysisResult, url: string) => {
    const riskMap: Record<RiskLevel, { label: string; color: "red" | "yellow" | "blue" | "green" }> = {
      alto: { label: "Riesgo Alto", color: "red" },
      medio: { label: "Riesgo Medio", color: "yellow" },
      bajo: { label: "Riesgo Bajo", color: "blue" },
      seguro: { label: "Seguro", color: "green" },
    };
    const cfg = riskMap[result.riesgo] ?? riskMap["medio"];
    const short = url.length > 40 ? url.slice(0, 40) + "…" : url;
    const today = new Date().toLocaleDateString("es-BO", { day: "2-digit", month: "short", year: "numeric" });

    setRecentActivity((prev) => [
      {
        event: `Análisis: ${short}`,
        type: "Análisis",
        date: today,
        badge: <Badge label={cfg.label} color={cfg.color} />,
      },
      ...prev.slice(0, 4),
    ]);

    setAnalyses((n) => n + 1);
    if (result.riesgo === "alto" || result.riesgo === "medio") setThreats((n) => n + 1);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {showModal && (
        <AnalyzeModal onClose={() => setShowModal(false)} onResult={handleResult} />
      )}

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1a2c5b] leading-tight">
              Centro de Monitoreo de Seguridad
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Analice enlaces sospechosos y gestione reportes de phishing.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 border border-[#1a2c5b] text-[#1a2c5b] font-semibold text-sm px-4 py-2 rounded-md hover:bg-[#1a2c5b]/5 transition-colors"
            >
              <LinkIcon /> Analizar Enlace
            </button>

            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition-colors">
              <MailIcon /> Reportar Incidente
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          <StatCard title="Análisis Realizados" value={String(analyses)} icon={<ShieldIcon />} />
          <StatCard title="Amenazas Detectadas" value={String(threats)} icon={<AlertIcon />} />
          <StatCard title="Reportes Registrados" value="5" icon={<MailIcon />} />
          <StatCard title="Riesgo Promedio" value="Medio" icon={<LinkIcon />} />
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">Actividad Reciente</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Evento", "Tipo", "Fecha", "Estado"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest pb-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivity.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-xs text-gray-700">{row.event}</td>
                  <td className="py-3 text-xs text-gray-500">{row.type}</td>
                  <td className="py-3 text-xs text-gray-500">{row.date}</td>
                  <td className="py-3">{row.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-gray-200 pt-6 flex justify-between items-start text-xs text-gray-400">
          <div>
            <span className="font-bold text-[#1a2c5b] text-sm">TVU</span>
            <p className="mt-1 leading-relaxed">
              © 2026 UMSS TVU Créditos Institucionales.
              <br />
              Todos los derechos reservados.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-right">
            <a href="#" className="hover:text-gray-600 transition-colors">Política de Seguridad</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Soporte</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Acerca del Proyecto</a>
          </div>
        </div>
      </div>
    </div>
  );
}