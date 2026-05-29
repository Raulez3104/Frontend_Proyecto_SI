/* ─────────────────────────────────────────────
   EDUCATION MODULE
   Plataforma educativa interactiva
   Tema: Prevención de Phishing en Medios de Comunicación Universitarios
───────────────────────────────────────────── */

import React, { useMemo, useState, useRef } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Section = {
  title: string;
  content: string[];
};

type Lesson = {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: string;
  risk: string;
  description: string;
  objectives: string[];
  sections: Section[];
  alerts: string[];
  practices: string[];
  institutionalCases: string[];
  fakeEmails: {
    title: string;
    content: string;
    analysis: string[];
  }[];
  glossary: string[];
  quiz: QuizQuestion[];
  summary?: string;
  resources?: { label: string; url?: string }[];
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const lessons: Lesson[] = [
  {
    id: "intro-phishing",
    title: "Introducción al Phishing en Medios",
    category: "Fundamentos",
    duration: "65 min",
    difficulty: "Básico",
    risk: "ALTO",
    description:
      "Una visión profunda de cómo los atacantes utilizan el phishing para comprometer cadenas de televisión universitarias. Analizaremos sus motivaciones, desde el robo de primicias periodísticas hasta el secuestro de la señal de transmisión en vivo.",
    objectives: [
      "Definir qué es el phishing y por qué los medios de comunicación son un blanco principal.",
      "Comprender la psicología detrás de la ingeniería social en entornos de alta presión como un estudio de TV.",
      "Reconocer los vectores de ataque más comunes dirigidos a productores y periodistas.",
      "Aplicar protocolos de verificación de fuentes antes de abrir material de prensa.",
      "Reportar incidentes de manera eficiente al departamento de sistemas."
    ],
    sections: [
      {
        title: "El panorama de amenazas en medios audiovisuales",
        content: [
          "A diferencia de una empresa tradicional, un canal de televisión universitario maneja información sensible antes de que sea pública (embargos de prensa, investigaciones estudiantiles, entrevistas exclusivas). Los atacantes buscan acceder a este material, alterar la programación o utilizar la plataforma del canal para difundir desinformación masiva.",
          "El entorno de una redacción es acelerado. Los periodistas necesitan abrir correos de desconocidos constantemente para buscar notas, lo que los convierte en el objetivo perfecto para el phishing. Los atacantes saben que el afán por conseguir la 'exclusiva' reduce el nivel de alerta técnica.",
          "Tendencias actuales: Los ciberdelincuentes investigan los perfiles de redes sociales de los presentadores y técnicos para lanzar ataques de 'Spear Phishing' (phishing altamente dirigido). Por ejemplo, enviar un supuesto guion actualizado minutos antes de salir al aire."
        ]
      },
      {
        title: "La psicología del engaño: Por qué hacemos clic",
        content: [
          "El phishing no es un fallo tecnológico, es un 'hackeo' a la mente humana. Los atacantes explotan sesgos cognitivos comunes. En televisión, explotan el 'Sentido de Urgencia' (ej. 'Falla en la transmisión de hoy') o la 'Autoridad' (ej. 'Mensaje urgente del Director de Contenidos o del Rector de la Universidad').",
          "El miedo a equivocarse o perder una oportunidad es una palanca poderosa. Un mensaje que amenaza con la cancelación de una pauta publicitaria o una demanda por derechos de autor (Copyright) en un reportaje emitido genera una respuesta emocional que nubla el juicio crítico, llevando a la víctima a descargar archivos maliciosos sin pensar."
        ]
      },
      {
        title: "Modelos de mitigación y defensa en redacción",
        content: [
          "La defensa comienza con barreras tecnológicas invisibles, como el filtrado de spam y la Autenticación Multifactor (MFA), que exige un segundo paso de verificación incluso si el atacante consigue la contraseña de la red social del canal.",
          "Establecimiento de un 'Canal Cero': Un protocolo donde cualquier solicitud urgente de cambio de credenciales, transferencias de dinero o acceso remoto al servidor de emisión se verifica obligatoriamente mediante una llamada telefónica directa al implicado, rompiendo el ciclo de la urgencia digital."
        ]
      }
    ],
    summary:
      "Este módulo asienta las bases teóricas del phishing aplicado al periodismo y la producción audiovisual. Demuestra que la urgencia y la necesidad de abrir archivos externos son el talón de Aquiles de cualquier canal de TV, y enseña las primeras líneas de defensa humana y tecnológica.",
    alerts: [
      "Correos urgentes exigiendo descargar un 'Material Exclusivo' o 'Evidencia' a través de un enlace externo.",
      "Notificaciones de demandas por Derechos de Autor (Copyright) en videos publicados recientemente.",
      "Mensajes de supuestas autoridades universitarias solicitando ignorar protocolos de seguridad bajo pretexto de emergencia.",
      "Enlaces acortados (bit.ly, tinyurl) en comunicados de prensa no solicitados."
    ],
    practices: [
      "Activar MFA (Autenticación de dos pasos) en las cuentas de acceso al Switcher, servidores de almacenamiento de video y redes sociales.",
      "Utilizar la regla de los '5 segundos' antes de abrir un archivo adjunto inesperado, revisando detalladamente la dirección del remitente.",
      "Previsualizar los enlaces pasando el cursor del ratón por encima sin hacer clic para ver el destino real.",
      "Tener a mano el contacto directo del área de soporte técnico de la universidad para reportar sospechas de inmediato."
    ],
    resources: [
      { label: "OWASP: Entendiendo la Ingeniería Social", url: "https://owasp.org/" },
      { label: "Guía para Periodistas: Seguridad Digital (CPJ)", url: "https://cpj.org/" }
    ],
    institutionalCases: [
      "Un productor descargó un supuesto 'Dossier de Prensa' en PDF que resultó ser un ransomware, encriptando los archivos de edición de toda la semana.",
      "Suplantación de identidad del Rector: El departamento de finanzas del canal recibió un correo falso del rector pidiendo el pago urgente a un proveedor de escenografía ficticio.",
      "Secuestro del canal de YouTube institucional mediante un correo que simulaba ser de 'Soporte Técnico de Google' exigiendo validar la cuenta para no perder la monetización."
    ],
    fakeEmails: [
      {
        title: "Simulación: Falsa Demanda por Derechos de Autor",
        content:
          "De: legal-copyright@youtube-support-center.com\nAsunto: AVISO LEGAL URGENTE: Retiro de monetización en Canal Universitario\n\nEstimado equipo de producción,\nSe ha registrado una infracción severa de derechos de autor en su reportaje emitido ayer. Su canal será suspendido en 24 horas si no presenta una apelación.\n\nRevise la evidencia del material infractor y el formulario de apelación aquí:\nhttp://apelacion-derechos-tv-univ.example.com",
        analysis: [
          "Sentido de urgencia extremo: Amenaza con la suspensión del canal en 24 horas para evitar la verificación calmada.",
          "Dominio fraudulento: El correo proviene de 'youtube-support-center.com' en lugar del dominio oficial 'youtube.com' o 'google.com'.",
          "El enlace dirige a un portal falso diseñado para robar las credenciales de la cuenta principal de transmisión del canal."
        ]
      }
    ],
    glossary: [
      "Phishing: Técnica de engaño utilizada para robar credenciales o instalar malware haciéndose pasar por una entidad de confianza.",
      "Spear Phishing: Phishing altamente personalizado dirigido a una persona específica (ej. un periodista de investigación).",
      "MFA (Autenticación Multifactor): Uso de dos o más métodos diferentes para verificar la identidad al iniciar sesión (ej. contraseña + código SMS o App).",
      "Ransomware: Malware que secuestra (encripta) los archivos de una computadora exigiendo un pago para recuperarlos."
    ],
    quiz: [
      { question: "¿Por qué los periodistas y productores son objetivos especialmente vulnerables al phishing?", options: ["Porque su trabajo requiere abrir correos y archivos adjuntos de desconocidos constantemente.", "Porque utilizan equipos muy antiguos.", "Porque no saben usar antivirus.", "Porque los canales de TV no tienen contraseñas."], answer: 0, explanation: "El periodismo obliga a interactuar con fuentes externas, lo que los atacantes aprovechan enviando malware camuflado como 'exclusivas' o 'comunicados de prensa'." },
      { question: "¿Qué sesgo cognitivo explota un correo que dice 'Su canal de YouTube será eliminado en 2 horas'?", options: ["Sentido de urgencia y pánico.", "El principio de escasez.", "Exceso de confianza.", "El sesgo de confirmación."], answer: 0, explanation: "Generar pánico y urgencia evita que la víctima se detenga a analizar lógicamente la situación o consultar a sistemas." },
      { question: "Si recibes un correo del Director pidiendo una transferencia urgente de fondos saltándose el protocolo formal, ¿qué debes hacer?", options: ["Llamarlo por teléfono a un número conocido para verificar la solicitud (Canal Cero).", "Hacer la transferencia rápido para no meterte en problemas.", "Responder el correo pidiendo más explicaciones.", "Reenviar el correo a todo el canal."], answer: 0, explanation: "Verificar por un canal de comunicación diferente (como una llamada de voz a un número guardado) es la mejor forma de confirmar la identidad ante peticiones inusuales." },
      { question: "¿Qué es el Spear Phishing en un contexto de televisión?", options: ["Un correo malicioso diseñado específicamente usando información pública de un periodista o del programa que conduce.", "Un correo masivo ofreciendo tarjetas de regalo falsas.", "Un virus que borra videos.", "Un tipo de cámara oculta."], answer: 0, explanation: "El Spear Phishing está altamente personalizado. El atacante investiga a la víctima para hacer el engaño casi indetectable." },
      { question: "Antes de hacer clic en un enlace de 'Evidencia' dentro de un correo, debes...", options: ["Pasar el cursor sobre el enlace para ver la dirección web real (URL) en la esquina de la pantalla.", "Hacer clic pero tener el antivirus abierto.", "Reenviarlo a otro computador para probar.", "Copiarlo en un documento de Word."], answer: 0, explanation: "Previsualizar la URL permite detectar si un enlace lleva a un sitio web malicioso en lugar del destino prometido." },
      { question: "¿Qué busca obtener un atacante al infectar con Ransomware la red de un canal de televisión?", options: ["Bloquear el acceso a los servidores de almacenamiento de video y exigir un pago para devolverlos.", "Mejorar la calidad de la transmisión de forma gratuita.", "Aumentar los seguidores de las redes sociales institucionales.", "Borrar únicamente los correos no deseados (Spam)."], answer: 0, explanation: "El ransomware cifra los archivos críticos (como crudos de video, pautas y bases de datos) extorsionando a la organización para recuperar la operatividad." },
      { question: "Un correo te ofrece una primicia noticiosa, pero te exige introducir tus credenciales institucionales para 'verificar que eres prensa'. ¿Qué deberías hacer?", options: ["Ignorar el enlace; ninguna fuente externa legítima necesita tus credenciales de la universidad para compartir información.", "Ingresar los datos rápidamente para no perder la noticia.", "Usar la contraseña personal del banco por si acaso.", "Reenviar el correo al público general."], answer: 0, explanation: "Los portales de fuentes externas no están vinculados a tu Active Directory; pedir credenciales institucionales es un claro intento de robo de identidad." },
      { question: "¿Cómo ayuda la MFA (Autenticación Multifactor) a mitigar el Phishing?", options: ["Incluso si entregas tu contraseña por error, el atacante no podrá entrar sin el segundo factor (ej. código en tu celular).", "Evita que recibas correos de spam en tu bandeja de entrada.", "Escanea automáticamente los archivos adjuntos en busca de virus.", "Hace que las contraseñas no caduquen nunca."], answer: 0, explanation: "La MFA es la barrera más efectiva contra el robo de contraseñas, ya que requiere un dispositivo físico adicional que el atacante remoto no posee." },
      { question: "Si un pasante de producción recibe un enlace sospechoso por correo, ¿cuál es el procedimiento institucional correcto?", options: ["No hacer clic y reportarlo inmediatamente al equipo de soporte técnico (Sistemas).", "Hacer clic para ver si es peligroso antes de avisar.", "Eliminar el correo sin decirle a nadie.", "Compartirlo en el grupo de WhatsApp del canal para preguntar qué es."], answer: 0, explanation: "Reportar a sistemas permite que el equipo de TI bloquee el correo a nivel de servidor para todos los demás empleados que pudieran haberlo recibido." },
      { question: "¿Por qué un canal de TV universitario es considerado infraestructura crítica por los atacantes?", options: ["Porque posee alcance masivo para difundir mensajes, bases de datos de estudiantes y un alto valor reputacional.", "Porque siempre tienen equipos de última generación para robar físicamente.", "Porque los canales universitarios no tienen ningún tipo de seguridad.", "Porque transmiten programas de entretenimiento en HD."], answer: 0, explanation: "El poder de difusión y la confianza que el público tiene en una institución universitaria convierten sus plataformas en objetivos lucrativos para estafas a gran escala." }
    ]
  },

  {
    id: "email-phishing",
    title: "Email Phishing en Producción",
    category: "Tipos de Phishing",
    duration: "95 min",
    difficulty: "Intermedio",
    risk: "CRÍTICO",
    description: "Técnicas avanzadas de detección en correos electrónicos. Aprenderás a leer encabezados, identificar suplantación de dominios y analizar archivos adjuntos peligrosos en el flujo de trabajo de recepción de material audiovisual y pautas.",
    objectives: [
      "Inspeccionar los encabezados ocultos de un correo para rastrear su verdadero origen.",
      "Diferenciar entre el nombre de remitente mostrado y la dirección real de correo electrónico.",
      "Identificar formatos de archivos adjuntos (macros, ejecutables camuflados) que ponen en riesgo la isla de edición.",
      "Comprender superficialmente los protocolos de seguridad de correo (SPF, DKIM, DMARC) para evaluar la legitimidad de un remitente institucional."
    ],
    sections: [
      {
        title: "Anatomía profunda de un correo fraudulento",
        content: [
          "Los clientes de correo suelen mostrar un 'Nombre Amistoso' (ej. 'Rectorado UNIFRANZ'). Un atacante puede poner ese nombre, pero ocultar que la dirección real es 'rector-unifranz@hotmail.com'. El primer paso es siempre expandir y verificar la dirección de correo exacta.",
          "El uso de adjuntos doblemente extensionados: En producción de TV es común recibir guiones o pautas. Los atacantes envían archivos nombrados 'Pauta_Entrevista.pdf.exe'. Si Windows tiene oculta la extensión conocida, el usuario solo verá 'Pauta_Entrevista.pdf' y al hacer doble clic ejecutará un programa malicioso.",
          "Los documentos de Microsoft Office (Word, Excel) pueden contener 'Macros' (pequeños programas). Un atacante enviará un guion en formato .docm y pedirá que 'Habilites el contenido' para verlo correctamente. Al hacerlo, el macro descarga ransomware en el sistema de la redacción."
        ]
      },
      {
        title: "Tácticas de Evasión y Dominios Look-alike",
        content: [
          "Typosquatting: Los atacantes compran dominios casi idénticos a los reales. Por ejemplo, en lugar de '@ministeriodecomunicacion.gob.bo', podrían usar '@ministerlodecomunicacion.gob.bo' (cambiando la 'i' por una 'l'). A simple vista, en el apuro del cierre de edición, pasa desapercibido.",
          "URL Masking: El texto en azul que dice 'Haz clic aquí para descargar el crudo del video' puede dirigir a una página completamente diferente. Siempre hay que contrastar el texto visible con la URL real en la barra de estado inferior del navegador.",
          "Falsa confianza del HTTPS: Que una página web tenga el candado (HTTPS) solo significa que la comunicación está encriptada, no que el sitio sea legítimo o seguro. Los atacantes configuran sitios de phishing con certificados HTTPS válidos para engañar a los periodistas."
        ]
      },
      {
        title: "Respuesta y manejo seguro de material",
        content: [
          "Uso de entornos seguros: Si es estrictamente necesario abrir material dudoso enviado por una fuente anónima, debe hacerse en un 'Sandbox' (un entorno aislado) o en una máquina virtual que no esté conectada a la red principal de transmisión del canal.",
          "Las herramientas técnicas como SPF, DKIM y DMARC son configuradas por el departamento de TI para asegurar que nadie pueda usar el dominio del canal para enviar correos falsos, y ayudan a rechazar correos falsificados que intentan entrar."
        ]
      }
    ],
    alerts: [
      "Documentos de Word o Excel que solicitan 'Habilitar Edición' o 'Habilitar Macros' para visualizar el contenido.",
      "Correos de proveedores de equipos o agencias de noticias desde cuentas genéricas (Gmail, Yahoo) en lugar de dominios corporativos.",
      "Discrepancias entre la firma corporativa al final del correo y la dirección del remitente.",
      "Enlaces que dirigen a páginas de inicio de sesión de Microsoft 365 o Google Workspace alojadas en dominios extraños."
    ],
    summary:
      "Lección esencial para cualquier miembro del canal que reciba material externo. Enfocada en desarmar las tácticas de ocultación que usan los ciberdelincuentes en los adjuntos (falsos guiones, comunicados) y enlaces, protegiendo así la integridad de los equipos de edición y emisión.",
    practices: [
      "Configurar el sistema operativo (Windows/Mac) para mostrar SIEMPRE las extensiones de archivo completas.",
      "Jamás habilitar macros en documentos de Office enviados por fuentes no verificadas.",
      "Usar servicios en la nube legítimos (como WeTransfer o Google Drive corporativo) para la recepción de material audiovisual pesado, evitando adjuntos sospechosos directos.",
      "Si un correo parece legítimo pero solicita una contraseña, abrir el navegador, escribir manualmente la dirección oficial de la plataforma y verificar desde allí."
    ],
    resources: [
      { label: "Cómo leer los encabezados de correo electrónico (Google Workspace)", url: "https://support.google.com/mail/answer/22454?hl=es" },
      { label: "VirusTotal: Escaneo seguro de archivos adjuntos dudosos", url: "https://www.virustotal.com/" }
    ],
    institutionalCases: [
      "Una campaña donde se suplantó a la agencia nacional de noticias. Enviaron un 'Boletín Urgente.docm' a la sala de redacción; al abrirlo e intentar imprimirlo, el archivo ejecutó un script que robó los contactos de todo el canal.",
      "Robo de credenciales de un presentador estrella mediante una página clonada perfecta de Outlook 365 enviada en un correo que pedía 'Actualizar cuota de buzón lleno'."
    ],
    fakeEmails: [
      {
        title: "Caso de Estudio: Falso Guion con Macros",
        content: "De: ProduccionExterna <produccion.colaboracion@hotmail.com>\nAsunto: RE: Guion final documental Universitario (Actualizado)\n\nHola equipo,\nAdjunto el guion final con las correcciones de la entrevista de ayer. Tuve un problema con mi correo institucional, así que se los mando desde aquí.\nNOTA: Por problemas de formato, deben hacer clic en 'Habilitar Contenido' al abrir el documento de Word para ver los cambios marcados.\n\n[Adjunto: Guion_Final_Correcciones.docm]",
        analysis: [
          "Pretexting: El remitente inventa una excusa ('problemas con mi correo institucional') para justificar el uso de una cuenta de Hotmail no verificable.",
          "Extensión peligrosa: El archivo es un .docm, un documento de Word habilitado para macros capaz de ejecutar código.",
          "Ingeniería Social Instructiva: El atacante da instrucciones explícitas para bajar las defensas de seguridad de Office ('Hacer clic en Habilitar Contenido')."
        ]
      },
      {
        title: "Caso de Estudio: Suplantación de Mantenimiento de Servidores",
        content: "De: Soporte IT TV <admin@soportetv-unv.com>\nAsunto: Migración de Servidor NAS de Video - Acción Requerida\n\nNotificación automática:\nEstamos migrando los servidores de almacenamiento crudo (NAS). Por favor, inicie sesión en el nuevo portal para migrar sus carpetas de edición o serán eliminadas esta noche.\n\nAcceso al portal: https://login-microsoft-unv.server-update.xyz",
        analysis: [
          "Dominio Look-alike: El remitente usa 'soportetv-unv.com' intentando parecer oficial, pero no pertenece a la infraestructura de la universidad.",
          "Dominio extraño en el enlace: El destino '.xyz' es frecuentemente utilizado en sitios desechables de ciberdelincuentes.",
          "Amenaza de pérdida de datos: Presiona a los editores de video con la posible eliminación de su trabajo para forzar un clic inmediato."
        ]
      }
    ],
    glossary: [
      "Macros: Pequeños programas integrados en documentos de Office que automatizan tareas, frecuentemente abusados para instalar virus.",
      "Typosquatting: Registro de nombres de dominio similares a marcas conocidas, aprovechando errores tipográficos de los usuarios.",
      "Sandbox: Entorno informático aislado y seguro utilizado para ejecutar programas o abrir archivos sospechosos sin arriesgar la red principal.",
      "URL Masking: Práctica de poner un texto de anclaje (enlace visual) que difiere del destino real de la dirección web."
    ],
    quiz: [
      { question: "¿Qué debes hacer si recibes una nota de prensa urgente en un archivo .docm y al abrirlo te pide 'Habilitar Macros' o 'Habilitar Contenido'?", options: ["Cerrar el archivo inmediatamente y no habilitar el contenido, luego reportarlo a sistemas.", "Habilitar el contenido rápido para leer la nota de prensa y dársela al presentador.", "Habilitar el contenido pero solo leerlo rápido y cerrarlo.", "Reenviárselo al director para que él decida."], answer: 0, explanation: "Habilitar macros en documentos de origen desconocido es una de las vías más comunes de infección por ransomware en redes corporativas." },
      { question: "¿Qué significa que la URL real de un correo no coincida con el texto azul que lees?", options: ["Es un claro intento de engaño (URL Masking) para redirigirte a un sitio web fraudulento.", "Es un error común de los servidores de correo y no tiene importancia.", "Significa que la página web original está caída y es un respaldo.", "Indica que el correo fue enviado desde un teléfono móvil."], answer: 0, explanation: "Los atacantes ocultan el destino real para que confíes en el enlace visual. Siempre debes verificar la URL pasando el cursor por encima." },
      { question: "En un correo, el campo 'Nombre del remitente' dice 'Rectorado', pero la dirección entre los símbolos '< >' es 'ofertas@ventasonline247.com'. ¿Qué deduces?", options: ["Que es un ataque de suplantación de identidad (spoofing); el correo no proviene del Rectorado.", "Que el Rectorado está haciendo una campaña de ventas.", "Que el servidor de correo se confundió de etiqueta.", "Que es un correo seguro porque el nombre es una autoridad."], answer: 0, explanation: "El nombre visible puede ser modificado por cualquiera para decir lo que sea. La verdadera fuente de origen siempre es la dirección de correo subyacente." },
      { question: "¿Un certificado SSL (el candado cerrado de HTTPS) garantiza que la página web a la que te mandaron no es de phishing?", options: ["No, solo garantiza que la comunicación viaja encriptada, pero el sitio puede estar administrado por un delincuente.", "Sí, el candado verde significa que el sitio es 100% seguro y oficial.", "Sí, pero solo en Google Chrome.", "No, el HTTPS solo sirve para sitios de comercio electrónico."], answer: 0, explanation: "Hoy en día, la mayoría de los sitios web de phishing obtienen certificados SSL gratuitos para generar una falsa sensación de seguridad en las víctimas." },
      { question: "Un periodista recibe un documento nombrado 'Declaracion_Exclusiva.pdf.exe'. ¿Cuál es el peligro de este archivo?", options: ["Es un archivo ejecutable (.exe) disfrazado de documento PDF; al abrirlo se instalará malware en la computadora.", "No hay peligro, el .exe sirve para que el PDF se abra más rápido.", "Es un formato exclusivo para videos de alta calidad.", "Es un documento encriptado por el gobierno."], answer: 0, explanation: "Esta es la técnica de doble extensión. Si las computadoras ocultan las extensiones conocidas, el usuario creerá que está abriendo un documento inofensivo, cuando en realidad está ejecutando un virus." },
      { question: "Si necesitas recibir un archivo de video crudo (pesado) de un freelancer externo, ¿cuál es el método más seguro?", options: ["Solicitar que lo suba al Google Drive o OneDrive corporativo del canal usando una carpeta compartida autorizada.", "Que lo envíe fraccionado en 20 correos con adjuntos comprimidos en .zip.", "Que envíe un enlace de descarga en un servidor desconocido de Rusia.", "Que lo pase por Bluetooth en un pendrive."], answer: 0, explanation: "Utilizar las herramientas corporativas aprobadas garantiza que el material pase por los filtros antivirus institucionales de la nube antes de llegar a la redacción." },
      { question: "¿Qué táctica de suplantación es el 'Typosquatting'?", options: ["Registrar un dominio de correo que se escribe casi igual al real (ej. @g0ogle.com en lugar de @google.com) para engañar al ojo humano.", "Gritar por teléfono para asustar a la víctima.", "Enviar correos en otro idioma.", "Infectar el teclado para cambiar lo que escribes."], answer: 0, explanation: "El typosquatting se aprovecha de la lectura rápida en entornos de presión, haciendo pasar desapercibido un error tipográfico sutil en el nombre del dominio." },
      { question: "¿Para qué sirve un entorno 'Sandbox' en el departamento de edición?", options: ["Para abrir archivos sospechosos en un entorno virtual aislado que no puede afectar a los servidores de transmisión si resulta ser un virus.", "Para guardar arena en caso de incendio eléctrico.", "Para editar videos más rápido usando recursos externos.", "Para almacenar las contraseñas de los presentadores."], answer: 0, explanation: "Un sandbox es vital para periodistas de investigación que deben abrir filtraciones anónimas sin comprometer la infraestructura de la redacción." },
      { question: "Si un correo legítimo aparenta venir de Microsoft 365 pidiendo que inicies sesión para evitar que tu cuenta caduque, ¿qué regla de oro debes aplicar?", options: ["Nunca hacer clic en el enlace del correo; en su lugar, abrir el navegador y escribir 'office.com' manualmente.", "Hacer clic en el enlace y cambiar la contraseña de inmediato por si acaso.", "Reenviar el correo a los directivos.", "Desconectar el internet inmediatamente."], answer: 0, explanation: "Escribir la URL manualmente garantiza que te diriges al sitio oficial y anula cualquier intento de URL Masking o redirección engañosa." },
      { question: "¿Qué indican las tecnologías SPF, DKIM y DMARC configuradas por el área de Sistemas del canal?", options: ["Son estándares criptográficos que verifican si un correo realmente fue enviado desde el servidor oficial de una institución, evitando la suplantación pura.", "Son formatos de compresión de video para enviarlos por correo.", "Son protocolos de cámaras de seguridad del estudio.", "Son leyes de derechos de autor internacionales."], answer: 0, explanation: "DMARC asegura que el dominio visible coincida con el servidor de origen real. Si un atacante intenta enviar un correo usando @tucanal.edu, DMARC hará que el correo sea rechazado." }
    ]
  },

  {
    id: "smishing",
    title: "Smishing (Phishing por SMS y WhatsApp)",
    category: "Tipos de Phishing",
    duration: "40 min",
    difficulty: "Básico",
    risk: "MEDIO",
    description: "Ataques realizados a través de mensajes de texto (SMS) y aplicaciones de mensajería como WhatsApp o Telegram. Aprenderemos cómo protegen los equipos móviles institucionales de los engaños de campo y logística.",
    objectives: [
      "Identificar las diferencias clave entre comunicaciones legítimas e intentos de fraude por SMS/WhatsApp.",
      "Establecer protocolos de seguridad para equipos de campo (camarógrafos, reporteros) frente a enlaces móviles maliciosos.",
      "Evitar el secuestro de cuentas de WhatsApp institucionales ('SIM Swapping' y robo de PIN).",
      "Reconocer fraudes logísticos, como falsas retenciones de equipos de grabación en aduanas o correos."
    ],
    sections: [
      {
        title: "Smishing en el periodismo móvil",
        content: [
          "El uso constante de smartphones para reportar en exteriores hace que los equipos de prensa dependan de notificaciones SMS o WhatsApp. Los ataques de smishing son mensajes cortos que incluyen enlaces acortados y un gancho urgente. En una pantalla pequeña, es más difícil analizar URLs completas, lo que incrementa la tasa de clic.",
          "Remitentes suplantados (Sender ID Spoofing): En los mensajes SMS tradicionales, los atacantes pueden manipular el nombre que aparece como remitente. Tu teléfono podría recibir un SMS que dice 'BANCO' o 'UNIV-ALERTA', y lo agrupará en la misma conversación que mensajes legítimos anteriores, dándole gran credibilidad."
        ]
      },
      {
        title: "Fraudes logísticos y Secuestro de Cuentas (WhatsApp)",
        content: [
          "Secuestro de WhatsApp: Un atacante configura la cuenta del canal en otro dispositivo y solicita el código de verificación por SMS. Luego, escribe a un productor desde un número desconocido haciéndose pasar por soporte técnico pidiendo que 'le reenvíe el código de 6 dígitos que le acaba de llegar' para solucionar un error. Si se entrega, el atacante roba la cuenta instantáneamente.",
          "Ataques de paquetería: Mensajes SMS falsos indicando que 'Sus repuestos de cámaras están retenidos en la aduana, pague un impuesto mínimo aquí'. Los equipos de logística del canal, temiendo retrasar una grabación, pueden caer en la trampa y comprometer la tarjeta de crédito corporativa."
        ]
      }
    ],
    alerts: [
      "Cualquier mensaje (SMS o WhatsApp) solicitando un código de 6 dígitos que te haya llegado a tu teléfono.",
      "Mensajes de supuestos servicios postales (DHL, FedEx, Correos de Bolivia) con enlaces a páginas para pagar aranceles imprevistos.",
      "Alertas bancarias por SMS sobre bloqueos de la tarjeta corporativa del canal, con enlaces a 'solucionarlo'.",
      "Números internacionales o desconocidos en WhatsApp ofreciendo entrevistas exclusivas mediante enlaces de descarga dudosos."
    ],
    summary:
      "El Smishing lleva el fraude directamente al bolsillo del periodista. Al estudiar tácticas como el robo de PIN de WhatsApp y los engaños de paquetería, blindamos las comunicaciones móviles de los equipos desplegados en campo y la logística del canal.",
    practices: [
      "Activar inmediatamente la 'Verificación en dos pasos' (PIN de 6 dígitos) dentro de los ajustes de WhatsApp de la línea institucional y las personales.",
      "NUNCA compartir códigos numéricos recibidos por SMS con nadie, sin importar la excusa (soporte técnico, verificación de identidad, errores del sistema).",
      "No hacer clic en enlaces de seguimiento de paquetes que lleguen por SMS inesperados. En su lugar, ir directamente a la página web oficial de la empresa de envíos e ingresar manualmente el número de guía.",
      "Configurar vistas previas de enlaces seguras en las apps de mensajería y desconfiar de URLs acortadas que no revelen su destino."
    ],
    resources: [
      { label: "Cómo proteger tu cuenta de WhatsApp", url: "https://faq.whatsapp.com/general/security-and-privacy/how-to-protect-your-account/?lang=es" },
      { label: "Alertas sobre fraudes de paquetería", url: "https://www.interpol.int/es/Noticias-y-acontecimientos/Noticias/2021/Tenga-cuidado-con-las-estafas-en-servicios-de-entrega-en-linea" }
    ],
    institutionalCases: [
      "El robo de la cuenta oficial de WhatsApp del canal universitario porque un practicante entregó el código de verificación SMS a un atacante que se hizo pasar por 'Soporte de META'.",
      "Fraude financiero donde el departamento de compras pagó un 'impuesto de desaduanización' falso de $150 dólares tras recibir un SMS urgente por unos lentes de cámara que sí estaban esperando del exterior."
    ],
    fakeEmails: [
      {
        title: "SMS: Falsa Retención de Equipos",
        content: "De: Aduanas-Bol\nMensaje: Su paquete (Equipos Audiovisuales) ha sido retenido por aranceles impagos (BOB 85.00). Evite su devolución pagando antes de 12hrs: http://aduanas-pagos-rapidos.tv/track",
        analysis: [
          "Sender ID Spoofing: Aparece como una institución oficial.",
          "Explotación del contexto: El canal realiza compras de equipos frecuentes, lo que hace que el pretexto sea verosímil.",
          "Monto bajo y urgencia alta: El monto es pequeño (BOB 85), lo que desincentiva solicitar aprobaciones financieras largas, facilitando el robo rápido de los datos de la tarjeta de crédito en el portal falso."
        ]
      },
      {
        title: "WhatsApp: Robo de Código de Verificación",
        content: "De: +1 (234) 555-0192 [Foto de logo de WhatsApp]\nMensaje: Hola, somos de Soporte Técnico de WhatsApp. Hemos detectado inicios de sesión inusuales en la cuenta del canal. Para confirmar que es usted, le hemos enviado un código por SMS. Por favor respóndanos con ese código de 6 dígitos para evitar la suspensión definitiva de la cuenta corporativa.",
        analysis: [
          "Suplantación visual: El número usa el logo de la empresa para dar credibilidad, aunque el número sea claramente particular.",
          "Ingeniería Social Inversa: El atacante es quien genera la supuesta alerta de seguridad para resolver el 'problema' que él mismo creó al intentar loguearse con el número de la víctima.",
          "Objetivo claro: Obtener el código SMS que la víctima recibe, lo que le dará control total sobre el WhatsApp institucional."
        ]
      }
    ],
    glossary: [
      "Smishing: Fusión de las palabras 'SMS' y 'Phishing'. Práctica fraudulenta mediante mensajes de texto.",
      "Verificación en dos pasos (WhatsApp): Código PIN secundario creado por el usuario, requerido periódicamente y fundamental para evitar secuestros de cuenta.",
      "Sender ID Spoofing: Manipulación de las redes telefónicas para alterar el nombre del remitente que aparece en el celular receptor."
    ],
    quiz: [
      { question: "¿Qué debes hacer si recibes un SMS con un enlace sobre un paquete de micrófonos retenido en la aduana?", options: ["Ingresar a la página oficial de la empresa de paquetería manualmente e ingresar el número de rastreo que nos dio el proveedor.", "Hacer clic en el enlace del SMS y pagar rápidamente con la tarjeta del canal para no retrasar la grabación.", "Reenviar el enlace por WhatsApp al director para que él pague.", "Ignorarlo siempre, las aduanas nunca retienen paquetes."], answer: 0, explanation: "La verificación independiente (ir a la página web real escribiéndola tú mismo) es la única forma segura de confirmar el estado de un envío." },
      { question: "Un contacto con la foto de 'Soporte Técnico' te escribe por WhatsApp y te pide que le reenvíes un código numérico que te acaba de llegar por SMS. ¿Cuál es el riesgo?", options: ["Están intentando configurar el WhatsApp del canal en otro dispositivo; si les das el código, robarán la cuenta.", "Quieren actualizar la versión de la aplicación para que funcione más rápido.", "Quieren darte la insignia azul de canal verificado.", "Ninguno, el soporte técnico a veces necesita esos códigos."], answer: 0, explanation: "Las empresas legítimas nunca te pedirán que les leas o reenvíes los códigos de autenticación OTP (One Time Password)." },
      { question: "¿Por qué los ataques de Smishing son particularmente efectivos contra periodistas en el campo de trabajo (exteriores)?", options: ["Porque usan pantallas más pequeñas, andan de prisa y es más difícil examinar detalladamente la estructura de una URL sospechosa en un celular.", "Porque los teléfonos móviles no tienen ninguna medida de seguridad.", "Porque las operadoras de telefonía venden los datos a los atacantes.", "Porque el Wi-Fi en la calle no está encriptado."], answer: 0, explanation: "El entorno móvil, sumado al estrés del trabajo en calle, dificulta la revisión meticulosa de enlaces (como pasar el mouse por encima), aumentando el riesgo de hacer clics impulsivos." },
      { question: "¿Qué función de seguridad debe estar activada obligatoriamente en el teléfono institucional destinado a la comunicación por WhatsApp con el público?", options: ["La Verificación en Dos Pasos (PIN de 6 dígitos configurado internamente).", "El modo ahorro de batería.", "La eliminación automática de mensajes en 24 horas.", "Compartir la ubicación en tiempo real 24/7."], answer: 0, explanation: "El PIN de verificación en dos pasos de WhatsApp actúa como una barrera final inquebrantable; incluso si el atacante intercepta tu código SMS, no podrá acceder sin ese PIN interno." },
      { question: "Recibes un mensaje de texto donde el remitente dice ser explícitamente 'UNIFRANZ-IT' informando de un cambio de contraseñas. ¿Es garantía de que el mensaje es real?", options: ["No, los sistemas de SMS permiten el 'Spoofing', donde los atacantes pueden falsificar el nombre de quien envía.", "Sí, las operadoras verifican la identidad de todos los que envían SMS institucionales.", "Sí, pero solo si no tiene errores ortográficos.", "No, la universidad solo se comunica por carta física."], answer: 0, explanation: "El Sender ID Spoofing es común; los atacantes usan servicios internacionales baratos para enviar SMS que aparentan ser de nombres institucionales de confianza." },
      { question: "Pierdes la señal celular repentinamente en tu teléfono corporativo, y solo dice 'Llamadas de emergencia'. Horas después, alguien vacía la cuenta de Twitter del canal. ¿Qué pudo ocurrir?", options: ["Un ataque de 'SIM Swapping'. El atacante clonó tu número en otra tarjeta SIM para recibir tus códigos SMS de recuperación.", "Un fallo masivo en las antenas de la ciudad que borró las cuentas conectadas.", "El teléfono se quedó sin batería y reseteó las contraseñas.", "Fue hackeado a través del Bluetooth."], answer: 0, explanation: "El SIM Swapping es un ataque donde engañan a la operadora telefónica para transferir tu línea a una nueva SIM bajo control del atacante, dándole acceso a tus SMS (y tokens)." },
      { question: "Para evitar abrir enlaces acortados engañosos en un teléfono móvil, una buena práctica es:", options: ["Usar aplicaciones o páginas de previsualización (Expand URL) antes de abrirlos, o no abrirlos en absoluto si no son solicitados.", "Hacer clic muy rápido y cerrar si la página es rara.", "Abrirlos solo si estás conectado a una red Wi-Fi.", "Reenviarlos por correo a un compañero."], answer: 0, explanation: "Las herramientas de expansión de URL revelan el destino final de un enlace como bit.ly, permitiéndote juzgar su seguridad antes de que tu navegador cargue el sitio." },
      { question: "¿Por qué los SMS son inherentemente inseguros para enviar claves o información confidencial de la institución?", options: ["Porque el protocolo de las redes celulares (SS7) es antiguo, no encripta los mensajes de extremo a extremo y puede ser interceptado.", "Porque los SMS se borran automáticamente en 30 días.", "Porque Google lee todos los SMS para publicidad.", "Porque cuestan dinero a la universidad."], answer: 0, explanation: "El protocolo SS7 carece de encriptación fuerte end-to-end, por lo que los SMS viajan en 'texto claro' por las infraestructuras de las operadoras y son vulnerables a espionaje." },
      { question: "Un camarógrafo recibe un SMS indicando: 'Su licencia de conducir será suspendida por una multa impaga de tránsito. Pague aquí: [Enlace]'. ¿Cómo se llama esta táctica?", options: ["Ingeniería social basada en la coerción/autoridad gubernamental.", "Vishing de multas.", "Phishing de Consentimiento.", "Ransomware vehicular."], answer: 0, explanation: "Utilizar el miedo a sanciones legales o de tránsito es un gancho común para forzar al usuario a proporcionar los datos de su tarjeta de crédito." },
      { question: "¿Cuál es la política corporativa correcta respecto a los grupos de WhatsApp para coordinar producciones (periodistas, fuentes, técnicos)?", options: ["No compartir archivos confidenciales, guiones embargados o contraseñas en grupos de WhatsApp, ya que se pierde el control de quién accede a esa información.", "Usarlos para todo porque el cifrado los hace invulnerables.", "Añadir a todas las fuentes y contactos externos para facilitar el trabajo.", "Exigir que todos los miembros usen el mismo modelo de teléfono."], answer: 0, explanation: "Aunque WhatsApp tiene cifrado de extremo a extremo, si un solo miembro del grupo pierde su teléfono o es víctima de SIM Swapping, todo el contenido compartido en el grupo queda expuesto." }
    ]
  },

  {
    id: "vishing",
    title: "Vishing en la Sala de Control",
    category: "Tipos de Phishing",
    duration: "35 min",
    difficulty: "Básico",
    risk: "MEDIO",
    description: "Conocido como Phishing por voz, el vishing es crítico en medios audiovisuales. Veremos cómo los atacantes usan la urgencia telefónica para saltarse protocolos técnicos, realizar fraudes o sabotear transmisiones en vivo.",
    objectives: [
      "Reconocer las técnicas persuasivas y el tono de urgencia falso utilizados en ataques telefónicos (vishing).",
      "Entender que el Identificador de Llamadas (Caller ID) puede ser falsificado y no prueba la identidad.",
      "Implementar el protocolo 'Call-Back' (Llamar de vuelta) en las áreas de Máster, Soporte y Administración.",
      "Reconocer el fraude del CEO (o del Rector) a través de llamadas de suplantación."
    ],
    sections: [
      {
        title: "Operaciones en Master y Control Central",
        content: [
          "El Control Máster es el corazón de la emisión. Los técnicos están acostumbrados a resolver crisis en segundos. Un atacante llama directamente al teléfono de la cabina de transmisión, haciéndose pasar por un técnico de la proveedora de fibra óptica o de satélite, exigiendo una reconfiguración de la IP de emisión o puertos en el firewall 'porque se va a caer la señal del partido en 5 minutos'.",
          "Esta ingeniería social paraliza el pensamiento racional mediante el miedo a la 'pantalla negra' (corte de transmisión), forzando al operador a introducir comandos dictados por el atacante o entregar contraseñas de equipos críticos."
        ]
      },
      {
        title: "Suplantación Telefónica (Caller ID Spoofing) y Deepfakes de Voz",
        content: [
          "Caller ID Spoofing: Al igual que en el SMS, los atacantes pueden hacer que en la pantalla del teléfono de la oficina aparezca 'Extensión 205 - Dirección General' o el número real de un proveedor conocido. No se debe confiar ciegamente en lo que dice la pantalla del teléfono.",
          "El Fraude del CEO y la Inteligencia Artificial: La tecnología actual permite clonar la voz (Deepfake de audio) del Director del Canal, un Presentador o el Rector con solo unos segundos de audio extraídos de la televisión. El estafador llama al equipo de finanzas pidiendo un pago confidencial y urgente, sonando exactamente igual a la autoridad real."
        ]
      }
    ],
    alerts: [
      "Llamadas no programadas solicitando contraseñas, reinicio de servidores de emisión o cambios de IP pública.",
      "Instrucciones de realizar transferencias bancarias de 'emergencia', que no se ajustan a los flujos normales, bajo acuerdos de 'estricta confidencialidad'.",
      "El interlocutor se vuelve agresivo, amenaza con despidos o usa tácticas de presión extrema cuando se le piden métodos de verificación.",
      "Llamadas donde la voz suena metálica, monótona, o tiene pausas extrañas al responder preguntas imprevistas (posible uso de IA clonada)."
    ],
    summary:
      "Un módulo vital para frenar a los atacantes más audaces: los que usan el teléfono. Protege las áreas técnicas de control de emisión y los departamentos financieros de caer ante estafadores que simulan emergencias inminentes o utilizan inteligencia artificial para clonar voces de autoridades.",
    practices: [
      "Protocolo 'Call-Back': Si alguien llama pidiendo información sensible o un cambio crítico, indicar: 'Entiendo la urgencia, colgaré y le devolveré la llamada inmediatamente al número que tenemos en el directorio oficial' para verificar.",
      "Establecer 'Palabras Clave de Seguridad' o Códigos PAA (Pregunta-Respuesta de Autenticación) entre el personal crítico para confirmar identidades en llamadas inusuales.",
      "Entender que entregar contraseñas por teléfono está estrictamente prohibido bajo las políticas de seguridad del canal, sin excepciones jerárquicas."
    ],
    resources: [
      { label: "Fraude del CEO y estafas telefónicas empresariales (FBI)", url: "https://www.ic3.gov/" }
    ],
    institutionalCases: [
      "Sabotaje en vivo: Un individuo llamó a la cabina del máster simulando ser el Jefe de Ingeniería indicando un 'pico de tensión inminente' y obligó al pasante de turno a apagar el transmisor principal durante un noticiero.",
      "Deepfake de Voz en Finanzas: El contador del canal de TV autorizó la compra de $10,000 en equipos en el extranjero tras recibir una llamada telefónica clonada por IA que simulaba ser el gerente exigiendo el adelanto urgente para asegurar stock."
    ],
    fakeEmails: [
      {
        title: "Transcripción: Vishing al Switcher",
        content: "Pantalla del Teléfono: Ext 101 - Jefatura de Sistemas\n\n[Timbra el teléfono en la sala de control]\nTécnico: Máster de Emisión, buenas tardes.\nAtacante: Hola, soy Carlos de Sistemas. Escúchame bien, tenemos un intento de hackeo al servidor de Playout. Si no cerramos la conexión SSH de inmediato, van a borrar la pauta comercial.\nTécnico: ¿Qué hago?\nAtacante: Entra a la consola, dítame rápido tu clave de admin temporal para autorizar el bloqueo desde mi panel o salimos del aire en 30 segundos.",
        analysis: [
          "Contexto letal: Atacar la sala de control donde la regla es evitar que la transmisión se caiga a cualquier costo.",
          "Suplantación interna: El atacante conoce los nombres del personal ('Carlos') y falsifica el identificador interno ('Ext 101').",
          "Vulneración del protocolo: Pide contraseñas en voz alta ('dítame rápido tu clave'), lo cual va contra todas las políticas de TI institucionales."
        ]
      }
    ],
    glossary: [
      "Vishing: Fusión de 'Voice' (Voz) y Phishing. Ingeniería social a través de llamadas telefónicas.",
      "Caller ID Spoofing: Técnica para modificar la información del número o nombre de quien llama que aparece en la pantalla del teléfono receptor.",
      "Deepfake de Audio: Uso de Inteligencia Artificial para clonar y sintetizar la voz de una persona real a partir de grabaciones previas.",
      "Call-Back Protocol: Procedimiento de seguridad que consiste en colgar una llamada sospechosa y devolverla usando los números de contacto oficiales y verificados de la institución."
    ],
    quiz: [
      { question: "¿Cuál es el protocolo correcto ('Call-back') si recibes una llamada urgente del Director pidiendo una contraseña para el servidor de pautas comerciales?", options: ["Decirle que por políticas de seguridad colgarás la llamada y le devolverás la llamada inmediatamente a su celular personal o número verificado en el directorio para confirmar.", "Darle la contraseña rápidamente, porque es el Director y si te demoras te pueden despedir.", "Mandar la contraseña por correo electrónico mientras siguen en la llamada.", "Inventar una contraseña falsa para probar si es él."], answer: 0, explanation: "Devolver la llamada a un canal previamente verificado asegura que estás hablando con la persona real y no con un estafador haciendo spoofing del número." },
      { question: "En el área de Máster de Emisión, te llama el proveedor de fibra óptica indicando que debes entrar a un enlace y descargar una actualización urgente o se cortará la señal. ¿Qué haces?", options: ["No hacer nada, notificar inmediatamente al jefe del departamento de sistemas del canal y escalar el requerimiento a través del sistema de tickets de TI.", "Descargar la actualización desde la computadora de emisión para salvar el partido en vivo.", "Pedirle instrucciones de cómo instalarlo tú mismo sin avisar a nadie.", "Apagar los equipos preventivamente."], answer: 0, explanation: "En infraestructuras críticas como televisión, los cambios técnicos deben escalar a través de los canales internos autorizados (TI), nunca de forma impulsiva por órdenes telefónicas de terceros." },
      { question: "¿Por qué el Identificador de Llamadas (Caller ID) de tu teléfono IP del canal NO es una prueba definitiva de identidad?", options: ["Porque los atacantes pueden manipular fácilmente los sistemas telefónicos (PBX) y troncales SIP para que muestren cualquier número o extensión interna falsa.", "Porque los teléfonos del canal son antiguos y leen mal los números.", "Porque siempre muestran el número de la centralita y no del individuo.", "Porque los números cambian dependiendo de la zona horaria."], answer: 0, explanation: "La tecnología de Caller ID tradicional no tiene validación criptográfica fuerte, haciendo el spoofing una táctica barata y accesible para los ciberdelincuentes." },
      { question: "¿Cómo impacta la Inteligencia Artificial (IA) en los ataques modernos de Vishing hacia departamentos financieros?", options: ["Permite a los estafadores clonar la voz exacta (Deepfake de audio) de las autoridades del canal y solicitar transferencias millonarias falsas.", "La IA bloquea automáticamente el Vishing.", "La IA traduce las llamadas del estafador en tiempo real.", "Ningún impacto, la IA aún no puede imitar voces humanas."], answer: 0, explanation: "Los deepfakes de voz están siendo usados activamente en 'Fraudes del CEO', superando la barrera de reconocer a un conocido por cómo habla." },
      { question: "Un estafador llama e intimida diciendo: 'Si no me pasas la IP pública del enlace satelital ahora, serás el responsable de que el noticiero no salga al aire'. Esta táctica se llama:", options: ["Explotación del miedo institucional y la autoridad coercitiva.", "Auditoría de cumplimiento tecnológico.", "Llamada de soporte proactivo.", "Protocolo de respaldo pasivo."], answer: 0, explanation: "El miedo a ser el responsable de una falla grave en el sistema anula la desconfianza natural del empleado, forzándolo a cometer un error de seguridad bajo presión." },
      { question: "Para combatir los Deepfakes de voz, el equipo de finanzas y dirección han acordado usar una 'Palabra de Seguridad'. ¿Cómo funciona esto?", options: ["Una palabra secreta acordada en persona (offline) que debe usarse al teléfono para autorizar cualquier transacción fuera de lo común.", "Una contraseña que se escribe en un correo electrónico en lugar de decirse en voz alta.", "El apellido de soltera de la madre del Rector.", "Un código de barras escaneado."], answer: 0, explanation: "Las palabras de seguridad preestablecidas no pueden ser adivinadas ni clonadas por la IA, asegurando la verificación de identidad (autenticación desafío-respuesta humana)." },
      { question: "¿Qué debes hacer si recibes una llamada de un supuesto técnico de Microsoft ofreciéndote limpiar virus del servidor de edición?", options: ["Colgar inmediatamente; ni Microsoft ni Apple realizan llamadas de soporte técnico proactivas a clientes sin una solicitud (ticket) previa.", "Aceptar la ayuda para proteger los crudos de video.", "Darle acceso remoto a través de AnyDesk o TeamViewer.", "Hacerle preguntas técnicas para comprobar si realmente sabe de sistemas."], answer: 0, explanation: "La estafa del soporte técnico falso es clásica. Las grandes tecnológicas jamás monitorean tu PC ni te llaman para ofrecer servicios técnicos." },
      { question: "Si el PBX (Central Telefónica) del canal no está configurado de forma segura frente a Internet, además del Vishing, ¿qué otro riesgo corremos?", options: ["El fraude de peaje (Toll Fraud), donde atacantes usan nuestro sistema para realizar miles de llamadas internacionales a nuestro cargo.", "Infección de virus informáticos a través del auricular.", "Desconexión de los micrófonos inalámbricos del set de TV.", "Robo de las cámaras de seguridad."], answer: 0, explanation: "Un PBX hackeado suele usarse para rutear llamadas de estafadores a números de tarifa premium internacionales, generando facturas gigantescas para la institución." },
      { question: "¿Qué actitud de la persona al otro lado de la línea debería levantar sospechas inmediatas de Vishing?", options: ["Negativa a que cuelgues, presión de tiempo ('hay que hacerlo ya') e insistencia en saltarse los procesos de autorización formales.", "Un tono calmado y profesional.", "Que pida agendar una reunión presencial.", "Que envíe documentación por canales oficiales."], answer: 0, explanation: "Los atacantes saben que si te dan tiempo para pensar o verificar, su estafa se cae, por lo que siempre exigen acciones instantáneas." },
      { question: "¿Por qué un empleado de Máster de emisión nunca debe modificar reglas del Firewall o accesos remotos solicitados por teléfono, incluso si parece una crisis?", options: ["Porque es una violación directa del Principio de Separación de Funciones y Control de Cambios; solo el área de Seguridad de Redes debe gestionar el perímetro.", "Porque el sistema no le dejará guardar los cambios sin reiniciar.", "Porque modificar el Firewall baja la calidad de la señal de video.", "Porque tarda demasiado tiempo realizarlo."], answer: 0, explanation: "La segmentación de roles es vital. Operaciones no debe tener privilegios para saltarse las reglas de seguridad perimetral de TI." }
    ]
  },

  {
    id: "social-media",
    title: "Compromiso de Redes Sociales Oficiales",
    category: "Superficies Públicas",
    duration: "45 min",
    difficulty: "Avanzado",
    risk: "CRÍTICO",
    description: "Análisis del robo de identidad corporativa. Veremos tácticas avanzadas como el 'Phishing de Consentimiento' (Rogue Apps), robo de cuentas verificadas, estafas por Mensajes Directos (DM) y la gestión de crisis reputacional.",
    objectives: [
      "Identificar el flujo del 'Phishing de Consentimiento' (Ataques a OAuth) en plataformas como Instagram, X (Twitter) o YouTube.",
      "Distinguir perfiles falsos y páginas de phishing diseñadas para suplantar Centros de Ayuda de Meta/Google.",
      "Configurar roles de seguridad y accesos mínimos (Principio de Menor Privilegio) para los Community Managers.",
      "Entender los riesgos de utilizar aplicaciones de terceros (programadores de publicaciones, análisis de métricas) no verificadas."
    ],
    sections: [
      {
        title: "El objetivo codiciado: Las cuentas con 'Check Azul'",
        content: [
          "Las cuentas de televisión universitaria tienen miles de seguidores, reputación académica y credibilidad periodística. Si un atacante toma control de ellas, las utilizará para lanzar estafas masivas (como falsos sorteos de criptomonedas, venta fraudulenta de artículos o distribución de Fake News políticas), lucrando con la confianza de la audiencia.",
          "Ataques por Mensaje Directo (DM): Los Community Managers reciben DMs de cuentas que aparentan ser 'Instagram Support' o 'X Trust & Safety' avisando que la cuenta va a perder su verificación o que han violado normas comunitarias. Incluyen un enlace engañoso hacia una página falsa de inicio de sesión idéntica a la oficial."
        ]
      },
      {
        title: "Phishing de Consentimiento y Aplicaciones de Terceros (OAuth)",
        content: [
          "A diferencia del phishing tradicional (robar contraseña), el Phishing de Consentimiento busca que el usuario instale u otorgue permisos a una aplicación web maliciosa. Un CM podría usar una nueva app de 'Analítica Gratuita para Redes'. Al conectarla, la plataforma pregunta: 'Esta aplicación quiere: Leer tus correos, publicar contenido en tu nombre, eliminar videos'.",
          "Si el usuario acepta, el atacante obtiene un 'Token de Acceso' invisible que le permite controlar la red social sin necesidad de conocer la contraseña real ni superar el código MFA por SMS. Cambiar la contraseña después no detiene este ataque; los permisos a la aplicación deben ser revocados manualmente desde la configuración."
        ]
      },
      {
        title: "Operaciones de Seguridad (OPSEC) para Community Managers",
        content: [
          "Separación de Cuentas: Nunca vincular las redes sociales del canal a correos personales ni teléfonos particulares de los periodistas o estudiantes en prácticas, ya que al terminar su ciclo se pierde el control de los accesos de recuperación.",
          "Uso de Plataformas de Gestión Centralizadas: Usar herramientas profesionales (ej. Hootsuite, Sprout Social) que permitan a los usuarios publicar sin conocer la contraseña nativa de la cuenta de Twitter o Instagram."
        ]
      }
    ],
    alerts: [
      "Mensajes Directos de soporte técnico no solicitados, con advertencias de suspensión inminente o violaciones de derechos de autor.",
      "Aplicaciones web de gestión de redes sociales que solicitan permisos excesivos ('Publicar en tu nombre', 'Leer correos privados', 'Modificar contraseñas').",
      "Solicitudes de agencias de publicidad falsas en redes sociales ofreciendo contratos millonarios e invitando a descargar 'Bases del contrato.pdf'.",
      "Enlaces en biografías o comentarios masivos de bots (cuentas spam automatizadas) en transmisiones en vivo del canal."
    ],
    summary:
      "Protección de la principal ventana digital del canal frente al público. Al blindar las cuentas corporativas contra ataques de consentimiento y estafas dirigidas, salvaguardamos la reputación de la institución universitaria y evitamos crisis mediáticas originadas por secuestros digitales.",
    practices: [
      "Realizar auditorías mensuales de 'Aplicaciones Conectadas' o 'Aplicaciones y Sitios Web' dentro de los menús de privacidad de Facebook, Instagram, X (Twitter) y Google, eliminando todo servicio inactivo o desconocido.",
      "Implementar roles de página (Administrador vs. Editor) y nunca otorgar privilegios de Administrador Global al personal de redacción temporal o pasantes.",
      "Establecer un manual de respuesta a incidentes: A quién llamar a las 3:00 AM si el canal de YouTube de la universidad está transmitiendo una estafa de criptomonedas.",
      "Recordar que las plataformas sociales NUNCA se comunican sobre temas críticos por Mensajes Directos; siempre envían notificaciones internas dentro del panel de control oficial y correos a la dirección registrada de facturación."
    ],
    resources: [
      { label: "Cómo revisar y eliminar accesos de aplicaciones a tu cuenta de Google", url: "https://myaccount.google.com/permissions" },
      { label: "Guía de Meta: Evita el phishing y estafas", url: "https://www.facebook.com/help/213481448684090" }
    ],
    institutionalCases: [
      "Ataque de Phishing de Consentimiento: Un Community Manager otorgó accesos a una app que prometía 'Filtros de video virales con IA'. La aplicación usó sus permisos para borrar la hemeroteca completa de videos del canal en YouTube e inundarlo con videos de fraudes con Bitcoin.",
      "Robo de credenciales vía DM: Una productora respondió un mensaje directo en Instagram que decía 'Hemos recibido quejas de plagio en su cuenta, ingrese aquí para resolverlo'. Perdió la cuenta con 100.000 seguidores de la revista matutina y los atacantes exigieron un rescate en criptomonedas."
    ],
    fakeEmails: [
      {
        title: "Mensaje Directo Falso: Violación de Normas en Instagram",
        content: "De: Verified-Copyright-Team [Insignia de cuenta falsa]\nMensaje:\nEstimado equipo de @TV_Universitaria_Oficial,\nHemos detectado múltiples reportes de infracción de música protegida en sus Reels recientes. Su cuenta ha sido programada para desactivación en 24 horas.\n\nPara cancelar la desactivación y apelar, inicie sesión inmediatamente en nuestro centro de seguridad:\nhttp://instagram-help-copyright.violation-appeal.com/loginnnGracias,nEl Equipo de Meta",
        analysis: [
          "Táctica del impostor: Crean un usuario y foto de perfil que imita logotipos de Meta, pero las redes sociales oficiales no envían advertencias de suspensión por DM.",
          "URL Phishing: La página dirige a 'violation-appeal.com', un sitio diseñado para parecerse a Instagram y robar el usuario y contraseña al escribirlos.",
          "Secuestro total: Si el Community Manager ingresa sus datos sin darse cuenta, el atacante cambiará el correo de recuperación al instante, dejando a la universidad sin red social."
        ]
      }
    ],
    glossary: [
      "Community Manager (CM): Profesional responsable de construir, gestionar y administrar la comunidad online alrededor de la marca del canal de televisión.",
      "Phishing de Consentimiento: Engaño donde se induce a un usuario a otorgar permisos de acceso a sus cuentas en la nube a una aplicación web fraudulenta (abuso del protocolo OAuth).",
      "Token OAuth: Una llave digital secreta que otorgan las plataformas para que aplicaciones de terceros se comuniquen con ellas sin necesidad de tener tu contraseña.",
      "Principio de Menor Privilegio (PoLP): Política de seguridad que exige otorgar a los usuarios (como pasantes o editores de redes) solo los permisos estrictamente necesarios para su tarea."
    ],
    quiz: [
      { question: "Un Community Manager de la TV universitaria necesita conectar una nueva herramienta para programar tuits. La herramienta solicita permisos para 'Ver, actualizar y borrar tus contactos, publicar tuits por ti y leer mensajes directos'. ¿Cuál es el riesgo?", options: ["Phishing de Consentimiento. Si la aplicación es fraudulenta o hackeada, tendrá control total sobre la cuenta y la privacidad, sin necesidad de conocer la contraseña.", "Ningún riesgo, todas las aplicaciones piden esos permisos para funcionar.", "El único riesgo es que la herramienta publique con faltas de ortografía.", "Que X (Twitter) les cobre dinero extra en la tarjeta de crédito institucional."], answer: 0, explanation: "Revisar los 'permisos' o 'alcances' de las aplicaciones conectadas es vital. Darle permisos de eliminación o de lectura de correos privados a una app de publicación es un exceso de privilegios (overscoping)." },
      { question: "¿Cuál es la mejor práctica operativa (OPSEC) para gestionar las publicaciones del canal sin exponer la clave maestra a todos los pasantes y periodistas?", options: ["Utilizar gestores de redes sociales empresariales (ej. Sprout Social, Hootsuite) que permitan otorgar perfiles de 'Editores' limitados a los empleados sin darles la clave nativa de la red social.", "Crear un documento compartido de Google Docs con las contraseñas para que todos puedan entrar cuando lo necesiten.", "Tener la clave escrita en una pizarra blanca en la redacción central.", "Asignar la clave maestra solo al estudiante más responsable de la promoción."], answer: 0, explanation: "Centralizar los accesos a través de herramientas corporativas protege las contraseñas raíz, permite revocar permisos al instante si alguien renuncia y deja registro (logs) de quién publicó qué." },
      { question: "Recibes un Mensaje Directo (DM) en la cuenta oficial del canal desde un perfil con la foto del logotipo de YouTube advirtiendo sobre la pérdida de la verificación e invitando a hacer clic. ¿Es oficial?", options: ["No, las plataformas como YouTube, Meta o X nunca comunican amenazas de suspensión, temas de copyright o verificaciones a través de mensajes directos en las propias plataformas.", "Sí, siempre avisan por DM para ser más rápidos.", "Sí, si el perfil tiene el nombre 'Support' escrito en inglés.", "No, solo avisan por llamadas de voz directamente al celular del Director."], answer: 0, explanation: "Cualquier DM alegando soporte técnico, resoluciones de copyright o verificación es 100% una estafa diseñada para generar pánico y llevar a sitios de robo de contraseñas." },
      { question: "En caso de que el canal sufra un robo de cuenta (Account Takeover) y cambien las contraseñas, ¿qué previene o retrasa significativamente a los atacantes de concretar el secuestro?", options: ["Tener una llave de hardware o MFA (Autenticación Multifactor) estricta vinculada a un número corporativo inamovible.", "Haber puesto una biografía en la cuenta indicando que es oficial.", "Tener un antivirus en las computadoras de la redacción.", "Que la cuenta de la universidad no siga a nadie."], answer: 0, explanation: "Incluso si el atacante obtiene la contraseña mediante phishing, un sistema robusto de Autenticación Multifactor detendrá el inicio de sesión no reconocido, salvando la cuenta." },
      { question: "¿Por qué cambiar la contraseña de Twitter (X) NO elimina a un atacante que usó Phishing de Consentimiento (App maliciosa)?", options: ["Porque el atacante usa un Token de Autorización invisible (OAuth) proporcionado por la aplicación conectada, el cual sigue activo sin importar si cambias la contraseña de tu cuenta.", "Porque el atacante clonó el disco duro de la redacción.", "Porque el atacante usó redes VPN que impiden desconectarlo.", "Porque la contraseña nueva tarda semanas en propagarse en los servidores."], answer: 0, explanation: "Para eliminar a estos intrusos silenciosos hay que ir explícitamente a 'Configuración > Seguridad > Aplicaciones y sesiones conectadas' y revocar el acceso manualmente." },
      { question: "¿Qué debes hacer si una cuenta de Instagram de una 'Agencia Internacional' te escribe por DM ofreciendo pautar publicidad en el canal, pidiéndote descargar un contrato en PDF?", options: ["Verificar la oferta por canales oficiales fuera de Instagram (ej. buscar el correo corporativo de la agencia en Google). Nunca descargar adjuntos enviados por DM de desconocidos.", "Descargar el contrato para revisarlo e imprimirlo.", "Aceptar la oferta rápidamente para no perder el cliente.", "Darles acceso a la cuenta para que pongan la publicidad ellos mismos."], answer: 0, explanation: "Los atacantes usan falsas ofertas de patrocinio lucrativo como cebo. Los contratos en PDF muchas veces esconden malware diseñado para robar tokens de sesión del navegador." },
      { question: "Durante un programa en vivo que se transmite por YouTube, el chat se llena de comentarios repetitivos con enlaces de inversión. ¿Qué está ocurriendo?", options: ["Es un ataque coordinado de Bots (Spam botnets) diseñado para aprovechar la audiencia en vivo del canal y redirigirla a páginas de estafa.", "Son espectadores legítimos muy emocionados.", "Es un error del servidor de YouTube.", "La red de la universidad está caída."], answer: 0, explanation: "Las transmisiones institucionales atraen ataques de bots que buscan pescar víctimas entre la audiencia legítima, afectando la reputación del evento." },
      { question: "Según el Principio de Menor Privilegio (PoLP), un diseñador gráfico externo que solo necesita subir arte para las historias de Instagram debería tener:", options: ["Un perfil con rol de 'Creador de Contenido' o 'Editor', pero bajo ningún concepto acceso de 'Administrador' o capacidad para añadir/quitar usuarios.", "La clave maestra de la cuenta de Google asociada.", "Permiso de Administrador Global para facilitarle el trabajo.", "Acceso completo a la facturación publicitaria."], answer: 0, explanation: "Otorgar privilegios excesivos expande la superficie de ataque; si la computadora del diseñador es hackeada, el daño a la red institucional será limitado por sus permisos." },
      { question: "Un empleado que administraba el Facebook de la universidad es despedido, pero la cuenta fue creada inicialmente con el número de teléfono celular personal de este empleado. ¿Cuál es la consecuencia operativa?", options: ["El canal pierde el control real sobre la recuperación de la cuenta; el exempleado podría solicitar un restablecimiento de contraseña en cualquier momento.", "El canal tendrá que pagar una multa a Facebook.", "El exempleado recibirá todas las notificaciones del canal.", "Ninguna, si se cambia la contraseña es suficiente."], answer: 0, explanation: "Por políticas de OPSEC, los métodos de recuperación (correos y teléfonos) de cuentas corporativas deben pertenecer 100% a la institución (ej. un chip prepago guardado en la gerencia) y nunca a empleados a título personal." },
      { question: "Si descubres que una cuenta clonada exacta del presentador de noticias está enviando mensajes a estudiantes, ¿cuál es el protocolo a seguir?", options: ["Reportar el perfil por suplantación en la plataforma, emitir una alerta pública en la cuenta oficial real y notificar al área legal/seguridad.", "Ignorarlo, porque a todos los presentadores les pasa.", "Insultar a la cuenta falsa por mensaje directo.", "Cerrar la cuenta oficial del canal por seguridad."], answer: 0, explanation: "La gestión de crisis exige actuar rápidamente en dos frentes: intentar el derribo técnico de la cuenta (takedown) y vacunar a la audiencia alertando sobre el engaño." }
    ]
  }
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function EducationModule() {
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);

  const tabs = ["Introducción", "Conceptos", "Escenarios", "Prevención", "Evaluación"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const contentRef = useRef<HTMLDivElement>(null);

  function InfoBox({ type, title, children }: { type: "info" | "tip" | "alert" | "case" | "important"; title: string; children: React.ReactNode }) {
    const bg = type === "alert" ? "bg-red-50 border-l-4 border-red-500" : type === "important" ? "bg-yellow-50 border-l-4 border-yellow-500" : type === "tip" ? "bg-green-50 border-l-4 border-green-500" : "bg-blue-50 border-l-4 border-blue-500";
    return (
      <div className={`${bg} p-5 rounded-2xl`}> 
        <h4 className="font-bold mb-2">{title}</h4>
        <div className="text-sm text-gray-800">{children}</div>
      </div>
    );
  }

  const [completed, setCompleted] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const selectedLesson = useMemo(() => {
    return lessons.find((lesson) => lesson.id === selectedLessonId) || lessons[0];
  }, [selectedLessonId]);

  const currentAnswers = answers[selectedLesson.id] || [];
  const progress = Math.round((completed.length / lessons.length) * 100);

  const score = useMemo(() => {
    let correct = 0;
    selectedLesson.quiz.forEach((q, index) => {
      if (currentAnswers[index] === q.answer) correct++;
    });
    return correct;
  }, [currentAnswers, selectedLesson]);

  const passed = score >= Math.ceil(selectedLesson.quiz.length * 0.7);

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const updated = [...currentAnswers];
    updated[questionIndex] = optionIndex;
    setAnswers((prev) => ({ ...prev, [selectedLesson.id]: updated }));
  };

  const submitQuiz = () => {
    setSubmitted((prev) => ({ ...prev, [selectedLesson.id]: true }));
    if (passed && !completed.includes(selectedLesson.id)) {
      setCompleted((prev) => [...prev, selectedLesson.id]);
    }
  };

  const currentIndex = tabs.indexOf(activeTab);

  const handleNextTab = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevTab = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#172554] to-[#1d4ed8] text-white">
        <div className="max-w-7xl mx-auto px-8 py-14">
          <div className="flex justify-between items-center gap-8">
            <div className="max-w-4xl">
              <p className="uppercase tracking-[0.3em] text-blue-200 text-sm font-bold mb-4">
                Plataforma Educativa Institucional
              </p>
              <h1 className="text-6xl font-black leading-tight mb-6">
                Academia de Prevención de Phishing Audiovisual
              </h1>
              <p className="text-blue-100 text-lg leading-loose">
                Capacitación interactiva orientada a periodistas, productores, editores y 
                personal técnico de la cadena de televisión universitaria.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 min-w-[250px]">
              <p className="text-blue-100 mb-2">Progreso General</p>
              <h2 className="text-6xl font-black">{progress}%</h2>
              <div className="w-full h-3 bg-white/20 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-6">

          {/* SIDEBAR FIJO */}
          <aside className="col-span-4 sticky top-6 h-fit max-h-[calc(100vh-3rem)]">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 h-full overflow-y-auto custom-scrollbar">
              <h2 className="text-2xl font-black text-[#1a2c5b] mb-6">Cursos para TV</h2>
              <div className="space-y-5">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      setActiveTab(tabs[0]);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left rounded-3xl border p-6 transition-all ${
                      selectedLesson.id === lesson.id
                        ? "border-[#1a56db] bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs uppercase font-bold tracking-widest text-[#1a56db] mb-2">
                          {lesson.category}
                        </p>
                        <h3 className="font-black text-xl text-[#1a2c5b]">{lesson.title}</h3>
                      </div>
                      {completed.includes(lesson.id) && (
                        <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✓</div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap mb-4">
                      <span className="bg-white border px-3 py-1 rounded-full text-xs">⏱ {lesson.duration}</span>
                      <span className="bg-white border px-3 py-1 rounded-full text-xs">📘 {lesson.difficulty}</span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{lesson.risk}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="col-span-8">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm relative">

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200 p-10 rounded-t-3xl">
                <p className="uppercase tracking-widest text-sm font-bold text-[#1a56db] mb-3">{selectedLesson.category}</p>
                <h2 className="text-5xl font-black text-[#1a2c5b] mb-5">{selectedLesson.title}</h2>
                <p className="text-lg text-gray-700 leading-loose">{selectedLesson.description}</p>
                {selectedLesson.summary && (
                  <p className="mt-4 text-gray-600 text-base">
                    <strong className="font-semibold">Resumen:</strong> {selectedLesson.summary}
                  </p>
                )}
              </div>

              {/* TABS STICKY (DISEÑO PÍLDORAS) */}
              <div 
                ref={contentRef} 
                className="px-10 py-6 sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all"
              >
                <nav className="flex gap-4 items-center overflow-x-auto pb-1">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveTab(t);
                        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                        activeTab === t 
                        ? 'bg-[#1a56db] text-white border-2 border-[#1a56db]' 
                        : 'bg-white text-black border-2 border-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-10">
                <div className="space-y-10">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white border rounded-2xl p-4 text-sm">
                      <div className="text-xs text-gray-500">Nivel de riesgo</div>
                      <div className="font-black text-lg text-red-600">{selectedLesson.risk}</div>
                    </div>
                    <div className="bg-white border rounded-2xl p-4 text-sm">
                      <div className="text-xs text-gray-500">Tiempo estimado</div>
                      <div className="font-black text-lg">{selectedLesson.duration}</div>
                    </div>
                    <div className="bg-white border rounded-2xl p-4 text-sm">
                      <div className="text-xs text-gray-500">Dificultad</div>
                      <div className="font-black text-lg">{selectedLesson.difficulty}</div>
                    </div>
                    <div className="bg-white border rounded-2xl p-4 text-sm">
                      <div className="text-xs text-gray-500">Tipo</div>
                      <div className="font-black text-lg">{selectedLesson.category}</div>
                    </div>
                  </div>

                  {activeTab === 'Introducción' && (
                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                      <h3 className="text-3xl font-black text-[#1a2c5b] mb-6">Objetivos de aprendizaje</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedLesson.objectives.map((obj, i) => (
                          <div key={i} className="bg-white border border-blue-100 rounded-2xl p-4">
                            ✓ {obj}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'Introducción' && (
                    <div className="space-y-6">
                      <div className="bg-white border rounded-3xl p-6">
                        <h3 className="text-2xl font-bold mb-3">Descripción General</h3>
                        <p className="text-gray-700">{selectedLesson.description}</p>
                      </div>
                      <div className="bg-white border rounded-3xl p-6">
                        <h4 className="font-bold mb-2">Resumen de Casos Institucionales Reales</h4>
                        <div className="space-y-3 mt-4">
                          {selectedLesson.institutionalCases.map((c, i) => (
                            <InfoBox key={i} type="case" title={`Antecedente Operativo ${i+1}`}>{c}</InfoBox>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Conceptos' && (
                    <div className="space-y-6">
                      {selectedLesson.sections.map((section, i) => (
                        <div key={i} className="bg-gradient-to-br from-blue-50 to-white border rounded-3xl p-6 shadow-sm">
                          <h3 className="text-2xl font-black mb-4">{section.title}</h3>
                          <div className="space-y-4">
                            {section.content.map((text, idx) => (
                              <section key={idx} className="space-y-2">
                                <p className="text-gray-700 leading-relaxed">{text}</p>
                              </section>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'Escenarios' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black">Escenarios y Simulaciones de Redacción</h3>
                      <div className="space-y-6">
                        {selectedLesson.fakeEmails.map((mail, i) => {
                          const lines = mail.content.split('\n');
                          const fromLine = lines.find(l => l.toLowerCase().startsWith('de:')) || '';
                          const subjectLine = lines.find(l => l.toLowerCase().startsWith('asunto:')) || '';
                          const subjectIndex = subjectLine ? lines.indexOf(subjectLine) : -1;
                          const body = subjectIndex >= 0 ? lines.slice(subjectIndex+1).join('\n') : lines.join('\n');
                          
                          return (
                            <div key={i} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                              <div className="bg-gray-100 border-b px-5 py-3">
                                <p className="text-sm"><strong>De:</strong> {fromLine.replace(/^De:\s*/i,'') || 'unknown'}</p>
                                <p className="text-sm"><strong>Asunto:</strong> {subjectLine.replace(/^Asunto:\s*/i,'') || mail.title}</p>
                              </div>
                              <div className="p-6">
                                <pre className="whitespace-pre-wrap text-sm bg-gray-50 border rounded-2xl p-5 overflow-auto font-mono text-gray-800">{body}</pre>
                                <div className="mt-5 space-y-3">
                                  <h4 className="font-bold text-red-700 mb-2">Análisis de la amenaza:</h4>
                                  {mail.analysis.map((a, ai) => (
                                    <div key={ai} className="bg-red-50 border border-red-100 rounded-xl p-3 text-red-700 text-sm">⚠ {a}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'Prevención' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white border rounded-3xl p-6 shadow-sm">
                          <h4 className="text-2xl font-black text-[#1a2c5b] mb-4">Puntos críticos (TV)</h4>
                          <div className="space-y-3">
                            {selectedLesson.alerts.map((a, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="text-red-600 font-bold mt-0.5">⚠</div>
                                <div className="text-gray-700">{a}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white border rounded-3xl p-6 shadow-sm">
                          <h4 className="text-2xl font-black text-[#1a2c5b] mb-4">Protocolos y Buenas Prácticas</h4>
                          <div className="space-y-3">
                            {selectedLesson.practices.map((p, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="text-green-600 font-bold mt-0.5">✓</div>
                                <div className="text-gray-700">{p}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                          <h4 className="text-xl font-black text-[#1a2c5b] mb-4">Glosario Técnico</h4>
                          <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            {selectedLesson.glossary.map((g, i) => (
                              <li key={i}>
                                <span className="font-semibold">{g.split(':')[0]}:</span>
                                {g.split(':')[1]}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                          <h4 className="text-xl font-black text-[#1a2c5b] mb-4">Recursos y Herramientas</h4>
                          <ul className="space-y-3">
                            {(selectedLesson.resources || []).map((r, i) => (
                              <li key={i}>
                                {r.url ? (
                                  <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline flex items-center gap-2">
                                    <span>🔗</span> {r.label}
                                  </a>
                                ) : (
                                  <span className="text-gray-700">{r.label}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Evaluación' && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10">
                        <h3 className="text-4xl font-black text-[#1a2c5b] mb-8">Evaluación del Módulo</h3>
                        <div className="space-y-8">
                          {selectedLesson.quiz.map((q, questionIndex) => (
                            <div key={questionIndex} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                              <p className="font-bold text-lg mb-5 text-gray-800">{questionIndex + 1}. {q.question}</p>
                              <div className="space-y-3">
                                {q.options.map((option, optionIndex) => (
                                  <button 
                                    key={optionIndex} 
                                    onClick={() => handleAnswer(questionIndex, optionIndex)} 
                                    className={`w-full text-left border-2 rounded-2xl px-6 py-4 transition-all ${
                                      currentAnswers[questionIndex] === optionIndex 
                                      ? 'border-[#1a56db] bg-blue-50 font-bold text-[#1a56db] shadow-sm' 
                                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                              {submitted[selectedLesson.id] && (
                                <div className={`mt-6 rounded-2xl p-5 border ${
                                  currentAnswers[questionIndex] === q.answer 
                                  ? 'bg-green-50 border-green-200' 
                                  : 'bg-red-50 border-red-200'
                                }`}>
                                  <p className="text-sm text-gray-800">
                                    <span className={`font-bold ${currentAnswers[questionIndex] === q.answer ? 'text-green-700' : 'text-red-700'}`}>
                                      {currentAnswers[questionIndex] === q.answer ? '✓ Respuesta correcta. ' : '✕ Respuesta incorrecta. '}
                                    </span> 
                                    {q.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}

                          <div className="mt-8 flex items-center gap-6 pt-6 border-t border-gray-200">
                            <button 
                              onClick={submitQuiz} 
                              disabled={currentAnswers.length < selectedLesson.quiz.length}
                              className={`font-bold px-8 py-4 rounded-full shadow-md transition-all ${
                                currentAnswers.length < selectedLesson.quiz.length 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-[#1a56db] hover:bg-blue-700 text-white'
                              }`}
                            >
                              Evaluar Respuestas
                            </button>
                            
                            {submitted[selectedLesson.id] && (
                              <div className={`px-6 py-4 rounded-full text-lg font-black border ${
                                passed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                              }`}>
                                {passed ? `🏆 APROBADO (${score}/${selectedLesson.quiz.length})` : `⚠️ REPROBADO (${score}/${selectedLesson.quiz.length})`}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* BOTONES DE NAVEGACIÓN INFERIOR Y AUTO-SCROLL */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                  <button
                    onClick={handlePrevTab}
                    disabled={currentIndex === 0}
                    className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                      currentIndex === 0
                        ? "opacity-0 pointer-events-none"
                        : "bg-white border-2 border-gray-800 text-black hover:bg-gray-50"
                    }`}
                  >
                    ← Anterior ({tabs[currentIndex - 1]})
                  </button>

                  {currentIndex < tabs.length - 1 ? (
                    <button
                      onClick={handleNextTab}
                      className="px-8 py-3 rounded-full font-bold transition-all flex items-center gap-3 shadow-md bg-[#1a56db] text-white hover:bg-blue-700"
                    >
                      Siguiente ({tabs[currentIndex + 1]}) →
                    </button>
                  ) : (
                    <div className="px-6 py-3 text-green-600 font-bold flex items-center gap-2">
                      ✓ Módulo completado
                    </div>
                  )}
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}