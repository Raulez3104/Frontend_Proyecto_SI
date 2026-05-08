import React, { useState } from "react";
import type { ReactNode } from "react";


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

// ── StatCard ───────────────────────────────────────────────────────────────

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


interface ActivityRow {
  event: string;
  type: string;
  date: string;
  badge: ReactNode;
}


interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [analyses] = useState<number>(24);
  const [threats] = useState<number>(8);

  const [recentActivity] = useState<ActivityRow[]>([
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

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
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
              onClick={() => onNavigate("analisis")}
              className="flex items-center gap-2 border border-[#1a2c5b] text-[#1a2c5b] font-semibold text-sm px-4 py-2 rounded-md hover:bg-[#1a2c5b]/5 transition-colors"
            >
              <LinkIcon /> Analizar Enlace
            </button>

            <button
              onClick={() => onNavigate("reportes")}
             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition-colors">
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
                  <th
                    key={h}
                    className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest pb-2"
                  >
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