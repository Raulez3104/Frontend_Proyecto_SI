import React, { useState, useRef } from "react";

const CheckCircleIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const BulbIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="12" y1="2" x2="12" y2="3" />
    <path d="M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.8C7.21 16.16 6 14.22 6 12a6 6 0 0 1 6-6z" />
    <line x1="9" y1="21" x2="15" y2="21" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg width="36" height="36" fill="none" stroke="#3b82f6" strokeWidth="1.5" viewBox="0 0 24 24">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

type Priority = "Baja" | "Media" | "Alta";

export default function ReportDashboard() {
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [suspiciousLink, setSuspiciousLink] = useState("");
  const [priority, setPriority] = useState<Priority>("Media");
  const [comments, setComments] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!senderEmail && !suspiciousLink && !file) {
      alert("Debe ingresar al menos un correo, enlace sospechoso o archivo.");
      return;
    }

    alert(`Reporte enviado correctamente

Correo: ${senderEmail || "No proporcionado"}
Asunto: ${subject || "No proporcionado"}
Link: ${suspiciousLink || "No proporcionado"}
Prioridad: ${priority}
Archivo: ${file ? file.name : "No adjunto"}
`);
  };

  const priorities: Priority[] = ["Baja", "Media", "Alta"];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8 ">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a2c5b] mb-2">
            Reportar Incidente Sospechoso
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            Reporte enlaces, correos electrónicos o archivos sospechosos para su
            revisión por el equipo de seguridad informática.
          </p>
        </div>

        <div className="flex gap-6">

          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

            <div className="flex gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Correo del remitente (opcional)
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@sospechoso.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Asunto o descripción breve
                </label>
                <input
                  type="text"
                  placeholder="Mensaje sospechoso"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Enlace sospechoso (opcional)
              </label>
              <input
                type="url"
                placeholder="https://sitio-sospechoso.com"
                value={suspiciousLink}
                onChange={(e) => setSuspiciousLink(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Pegue aquí un enlace para análisis.
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Nivel de Prioridad
              </label>

              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold border ${
                      priority === p
                        ? "border-[#1a2c5b] text-[#1a2c5b] ring-2 ring-[#1a2c5b]/20"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Subir archivo o captura
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg py-10 px-6 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-3">
                  <UploadCloudIcon />
                </div>

                {file ? (
                  <p className="text-sm font-semibold text-blue-600">
                    {file.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-blue-500">
                      Arrastre archivos aquí
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG, EML
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.eml"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Comentarios adicionales
              </label>
              <textarea
                rows={4}
                placeholder="Describa por qué considera este contenido sospechoso..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
              />
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 px-6 rounded-md transition-colors"
              >
                Enviar Reporte
                <SendIcon />
              </button>
            </div>
          </div>

          <div className="w-64 shrink-0 flex flex-col gap-4">

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#1a2c5b]">
                  <CheckCircleIcon />
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  Enrutamiento Activo
                </span>
              </div>

              <div className="h-0.5 bg-[#1a2c5b] rounded mb-3" />

              <p className="text-xs text-gray-600 leading-relaxed">
                Todos los reportes son enviados automáticamente al equipo de
                seguridad informática para su revisión y seguimiento.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500">
                  <BulbIcon />
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  Consejo de Seguridad
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                No haga clic en enlaces ni descargue archivos de remitentes
                desconocidos sin verificar primero su autenticidad.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-4 flex justify-between items-center text-xs text-gray-400">
          <span>
            © 2026 Créditos institucionales UMSS TVU. Todos los derechos reservados.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600">
              Política de Seguridad
            </a>
            <a href="#" className="hover:text-gray-600">
              Privacidad y Condiciones
            </a>
          </div>
        </div>
      </div>
  );
}