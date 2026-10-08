import type { LegalTexts } from "./types";

const es: LegalTexts = {
  terms: {
    title: "Términos y condiciones",
    lead: "Estas condiciones regulan el uso del test de CI online disponible en el sitio web {site}, así como del resultado de pago y de la suscripción asociados. Te rogamos que las leas con atención antes de pagar.",
    sections: [
      {
        h: "1. Datos del proveedor",
        p: [
          "- Razón social: {company}",
          "- Domicilio social: {address}, {country}",
          "- Registro: {register}",
          "- Número de identificación de la empresa (IČO): {ico}",
          "- Número de identificación fiscal (DIČ): {dic}",
          "- Capital social: {capital}",
          "- Correo electrónico: {email}",
          "- Sitio web: {site}",
          "En adelante, el «Proveedor». La persona física que utiliza el sitio web, en adelante, el «Usuario».",
        ],
      },
      {
        h: "2. El servicio",
        p: [
          "En el sitio web se puede realizar de forma gratuita y sin registro un test de CI online de 30 preguntas. Una vez completado, el resultado detallado (estimación del CI, percentil, desglose por áreas y solución explicada de las preguntas) puede desbloquearse previo pago.",
          "El resultado es una *estimación orientativa* basada en una breve serie de preguntas online. No constituye un diagnóstico médico, psicológico ni profesional de ningún otro tipo, y no es apto para fundamentar decisiones educativas, laborales, sanitarias ni jurídicas.",
          "Las modalidades de pago del servicio solo pueden contratarlas personas mayores de 18 años y, en el caso de menores de edad, exclusivamente con el consentimiento de su representante legal.",
        ],
      },
      {
        h: "3. Planes y precios",
        p: [
          "El resultado detallado se desbloquea con el *acceso completo de {days} días*, cuyo precio es de *{trial}* (se cobra de inmediato al realizar el pago). El acceso incluye el resultado detallado de ese intento y, mientras dure, un número ilimitado de tests y resultados adicionales.",
          "Si el Usuario no lo cancela durante los primeros {days} días, al finalizar esos {days} días el acceso *se convierte automáticamente en una suscripción mensual de {monthly}*; la primera cuota mensual se cobra el día {nextDay} y, a partir de entonces, cada mes por adelantado hasta que el Usuario la cancele.",
          "Los precios indicados son los importes finales que el Usuario paga efectivamente; no existen gastos adicionales (p. ej., de envío o de gestión). En la conversión de los precios expresados en euros, el banco del Usuario puede aplicar su propio tipo de cambio y sus propias comisiones.",
          "El Proveedor se reserva el derecho de modificar los precios en el futuro. La modificación no afecta a los periodos ya pagados; el Proveedor informará al Usuario por correo electrónico con al menos 30 días de antelación a su entrada en vigor, y el Usuario podrá cancelar la suscripción sin coste antes de que se aplique el nuevo precio.",
        ],
      },
      {
        h: "4. Celebración del contrato y pago",
        p: [
          "En la pantalla de pago, el Usuario acepta estas condiciones y la declaración relativa a la ejecución inmediata del contenido digital; a continuación, el botón «Continuar al pago» lo redirige a la página de pago segura de Stripe, donde introduce su correo electrónico y sus datos de pago. Antes de enviar el pago, el Usuario puede volver al sitio web en cualquier momento y modificar sus respuestas y los datos introducidos.",
          "El contrato entre el Proveedor y el Usuario se celebra al completarse correctamente el pago, en el idioma en que el Usuario utiliza el sitio web. El Proveedor no archiva el contrato por separado; Stripe envía por correo electrónico un recibo del pago a la dirección indicada por el Usuario. Estas condiciones pueden consultarse y guardarse en cualquier momento en el sitio web.",
          "El pago lo procesa Stripe Payments Europe, Ltd. Métodos de pago aceptados: tarjeta bancaria, Apple Pay y Google Pay. Los datos de la tarjeta los gestiona exclusivamente Stripe; el Proveedor no tiene acceso a ellos.",
          "En el caso de la suscripción, el Usuario autoriza al Proveedor a cargar, a través de Stripe, la cuota mensual en el método de pago indicado al final del periodo de prueba y, después, cada mes, hasta que cancele la suscripción. Si un cargo falla, Stripe puede reintentarlo; si el fallo de pago persiste, la suscripción se extingue.",
        ],
      },
      {
        h: "5. Ejecución y acceso",
        p: [
          "El resultado detallado se muestra inmediatamente después del pago correcto y puede consultarse más adelante a través del enlace de la página de resultados.",
          "El acceso ilimitado incluido en la suscripción lo ofrece el sitio web en el navegador en el que se contrató la suscripción (para ello instala una cookie necesaria). En otros dispositivos, el Usuario puede acceder al portal de cliente con su dirección de correo electrónico desde la página [Gestionar / cancelar suscripción](subscription).",
        ],
      },
      {
        h: "6. Cancelación de la suscripción",
        p: [
          "La suscripción *puede cancelarse en cualquier momento y sin necesidad de justificación*: mediante el enlace [Gestionar / cancelar suscripción](subscription) situado al final del sitio web, en pocos clics en el portal de cliente de Stripe, o por correo electrónico a {email}.",
          "La cancelación surte efecto al final del periodo (de prueba) en curso; hasta entonces se mantiene el acceso y no se realizan más cargos. Si el Usuario cancela la suscripción durante el periodo de prueba, no se le cobrará ninguna cuota mensual.",
          "El Proveedor no reembolsa el importe de un periodo ya iniciado, salvo en los casos previstos por la ley.",
        ],
      },
      {
        h: "7. Derecho de desistimiento",
        p: [
          "En los contratos celebrados a distancia, el consumidor dispone, como regla general, de un derecho de desistimiento de 14 días (conforme a la Directiva 2011/83/UE del Parlamento Europeo y del Consejo y a la Ley eslovaca n.º 108/2024 Rec.).",
          "El servicio consiste en contenido digital que no se suministra en un soporte material. Antes del pago, el Usuario *solicita expresamente el inicio inmediato de la ejecución* y reconoce que, con ello, pierde su derecho de desistimiento. Por consiguiente, una vez iniciada la ejecución (la visualización del resultado), el Usuario no tiene derecho de desistimiento. Con independencia de ello, la suscripción puede cancelarse en cualquier momento conforme al punto 6.",
          "Si por cualquier motivo la ejecución no ha comenzado (por ejemplo, si tras el pago no se ha mostrado el resultado), el Usuario puede desistir en un plazo de 14 días desde la celebración del contrato mediante una declaración inequívoca enviada a {email}; en ese caso, el Proveedor reembolsará el importe íntegro en un plazo máximo de 14 días, a través del método de pago original.",
        ],
      },
      {
        h: "8. Garantía y responsabilidad",
        p: [
          "El Proveedor garantiza que el contenido digital se ajusta a su descripción. Si el resultado no se muestra o es defectuoso, el Usuario puede comunicarlo a {email}; el Proveedor subsanará el defecto en un plazo razonable y, en su defecto, el Usuario podrá solicitar una reducción del precio o resolver el contrato (conforme a la Directiva (UE) 2019/770).",
          "El resultado es una estimación; el Proveedor no responde de las decisiones tomadas en función de él. Salvo en caso de daños causados con dolo o negligencia grave, y de incumplimientos contractuales que lesionen la vida, la integridad física o la salud, la responsabilidad del Proveedor se limita al importe pagado por el Usuario por el servicio correspondiente.",
          "El Proveedor procura que el sitio web esté disponible de forma continua, pero no responde de las interrupciones temporales debidas a tareas de mantenimiento o a fallos de terceros (p. ej., del proveedor de alojamiento o de pagos).",
        ],
      },
      {
        h: "9. Reclamaciones y vías de recurso",
        p: [
          "Puedes enviar tu reclamación a {email}. El Proveedor la examinará y responderá por escrito en un plazo máximo de 30 días.",
          "Autoridad de supervisión: Slovenská obchodná inšpekcia (Inspección Comercial Eslovaca), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk. La Slovenská obchodná inšpekcia actúa también como entidad de resolución alternativa de litigios de consumo al margen de los tribunales.",
          "Los consumidores residentes en otros Estados miembros de la UE pueden obtener ayuda gratuita en los litigios transfronterizos a través del Centro Europeo del Consumidor de su país (red ECC-Net, https://www.eccnet.eu).",
        ],
      },
      {
        h: "10. Propiedad intelectual",
        p: [
          "Las preguntas, los textos, las figuras, los elementos gráficos y el código fuente del sitio web son propiedad intelectual del Proveedor (o de sus titulares de derechos). Queda prohibida su copia, distribución o uso con fines comerciales sin la autorización previa y por escrito del Proveedor. Se permite compartir el enlace al propio resultado.",
        ],
      },
      {
        h: "11. Protección de datos",
        p: ["El tratamiento de los datos personales se detalla en la [Política de privacidad](privacy)."],
      },
      {
        h: "12. Legislación aplicable y modificación de las condiciones",
        p: [
          "El contrato se rige por el Derecho de la República Eslovaca. Ello no priva al consumidor de la protección que le otorgan las disposiciones que no pueden excluirse mediante acuerdo en virtud del Derecho de su país de residencia habitual; el consumidor también puede presentar una demanda ante los tribunales de su lugar de residencia.",
          "El Proveedor puede modificar estas condiciones con efectos para el futuro. A los contratos ya celebrados se les aplican las condiciones vigentes en el momento de su celebración; en el caso de la suscripción, el Proveedor notificará cualquier cambio sustancial por correo electrónico con al menos 30 días de antelación, y el Usuario podrá cancelar la suscripción sin coste.",
          "La invalidez de alguna disposición de estas condiciones no afectará a la validez de las demás.",
        ],
      },
    ],
  },

  privacy: {
    title: "Política de privacidad",
    lead: "Esta política explica qué datos personales tratamos cuando utilizas el sitio web {site}, con qué fines, durante cuánto tiempo y qué derechos tienes. El tratamiento se realiza conforme al Reglamento General de Protección de Datos (UE) 2016/679 (RGPD).",
    sections: [
      {
        h: "1. El responsable del tratamiento",
        p: [
          "{company}, {address}, {country} · N.º de identificación (IČO): {ico} · Registro: {register}",
          "Contacto para cuestiones de protección de datos: {email}",
        ],
      },
      {
        h: "2. ¿Qué datos tratamos y con qué fines?",
        p: [
          "*Realización del test.* Tus respuestas, el grupo de edad indicado y el tiempo empleado se guardan en tu propio navegador (localStorage) para que puedas continuar el test. Para hacerlo no se necesita nombre, dirección de correo electrónico ni cuenta de usuario. Estos datos solo nos llegan cuando desbloqueas el resultado.",
          "*Desbloqueo del resultado y pago.* Al desbloquearlo, tus respuestas se asocian en forma breve y codificada a los datos de la transacción de pago, para que el servidor pueda calcular el resultado a partir de ellas. El pago lo realiza Stripe: es quien solicita los datos de la tarjeta (a los que nosotros no tenemos acceso), así como tu dirección de correo electrónico para el recibo y la gestión de la suscripción. De Stripe recibimos el estado del pago, tu dirección de correo electrónico, tu país y un identificador de cliente. Base jurídica: la ejecución del contrato (art. 6.1.b) del RGPD) y el cumplimiento de obligaciones contables (art. 6.1.c)).",
          "*Reconocimiento de la suscripción.* En caso de suscripción, instalamos en tu navegador una cookie necesaria y firmada (elm_sub), que contiene tu identificador de cliente de Stripe, para que el navegador reconozca la suscripción activa. Base jurídica: la ejecución del contrato.",
          "*Comunicación.* Si nos escribes un correo electrónico, tratamos tu nombre, tu dirección de correo electrónico y tu mensaje para responder a tu consulta. Base jurídica: el interés legítimo o, en su caso, la ejecución del contrato.",
          "*Registros técnicos.* Al servir el sitio web, el proveedor de alojamiento puede registrar durante un breve periodo datos técnicos (dirección IP, hora, tipo de navegador) por motivos de seguridad y de resolución de errores. Base jurídica: el interés legítimo (art. 6.1.f) del RGPD).",
          "No se toman decisiones automatizadas ni se elaboran perfiles que produzcan efectos jurídicos sobre ti. El cálculo de la estimación del CI es orientativo y no sirve de base para ninguna decisión.",
        ],
      },
      {
        h: "3. Cookies y almacenamiento local",
        p: [
          "Las cookies y el almacenamiento local estrictamente necesarios (ver abajo) no requieren consentimiento. Solo utilizamos cookies analíticas y publicitarias con tu consentimiento (ver abajo).",
          "- *lang*: el idioma elegido (1 año)",
          "- *elm_sub*: reconocimiento de la suscripción, solo para suscriptores (hasta 400 días o hasta que se elimine)",
          "- *tma_consent*: recuerda tu elección sobre las cookies (180 días)",
          "- *localStorage*: el estado del test, las preguntas ya vistas y el resultado aún no desbloqueado (en tu navegador, hasta que lo borres)",
          "- *sessionStorage*: tras el pago, el enlace a tu resultado para la página de agradecimiento (hasta que cierres la pestaña)",
          "*Cookies analíticas y publicitarias, solo con tu consentimiento.* Si haces clic en «Aceptar» en el banner de cookies, cargamos la etiqueta de Google de Google Ireland Limited (Gordon House, Barrow Street, Dublín 4, Irlanda) con dos fines: Google Analytics nos muestra cómo usan el sitio los visitantes, y la medición de conversiones de Google Ads indica si nuestros anuncios generan compras. Google instala entonces sus propias cookies (por ejemplo, _ga y _ga_… durante un máximo de 2 años, _gcl_au durante un máximo de 90 días) y recibe tu dirección IP, datos de tu navegador y dispositivo, las direcciones de las páginas visitadas, el identificador del clic en el anuncio si llegas desde un anuncio y, en caso de compra, su importe y el identificador de la transacción del pago. Base jurídica: tu consentimiento (art. 6.1.a) del RGPD). Sin tu consentimiento, la etiqueta de Google no se carga en absoluto. Puedes dar o retirar tu consentimiento en cualquier momento con el enlace «Configuración de cookies» del pie de página; la retirada no afecta a la licitud del tratamiento anterior. Google también puede transferir datos a los Estados Unidos (Marco de Privacidad de Datos UE-EE. UU.); su política de privacidad: https://policies.google.com/privacy.",
        ],
      },
      {
        h: "4. ¿Quién recibe los datos?",
        p: [
          "- *Stripe Payments Europe, Ltd.* (1 Grand Canal Street Lower, Dublín 2, Irlanda): pagos, suscripción y facturación. Stripe puede transferir algunos datos a los Estados Unidos; dichas transferencias se basan en el Marco de Privacidad de Datos UE-EE. UU. y en las cláusulas contractuales tipo de la Comisión Europea.",
          "- *Proveedor de alojamiento*: funcionamiento del sitio web, como encargado del tratamiento.",
          "- *Google Ireland Limited* (Gordon House, Barrow Street, Dublín 4, Irlanda): Google Analytics y medición de conversiones de Google Ads, solo con tu consentimiento (ver punto 3).",
          "No vendemos datos. Aparte de la medición de Google basada en tu consentimiento descrita en el punto 3, no cedemos datos a terceros con fines de marketing. Solo facilitamos datos a las autoridades cuando estamos obligados por ley.",
        ],
      },
      {
        h: "5. ¿Durante cuánto tiempo conservamos los datos?",
        p: [
          "- Datos de pago y contables: 10 años, conforme a la ley de contabilidad eslovaca.",
          "- Datos de suscriptores: mientras exista la suscripción y, después, durante el plazo de conservación contable.",
          "- Correspondencia: hasta 3 años tras el cierre del asunto (para el ejercicio de reclamaciones dentro del plazo de prescripción).",
          "- Registros técnicos: hasta 30 días.",
        ],
      },
      {
        h: "6. Tus derechos",
        p: [
          "Puedes solicitar información sobre los datos que tratamos sobre ti, así como su rectificación, supresión, la limitación de su tratamiento y la portabilidad, y puedes oponerte al tratamiento basado en el interés legítimo. Envía tu solicitud a {email}; te responderemos en el plazo máximo de un mes.",
          "Puedes presentar una reclamación ante la autoridad eslovaca de protección de datos (Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk) o ante la autoridad de protección de datos de tu país de residencia.",
        ],
      },
      {
        h: "7. Seguridad y menores de edad",
        p: [
          "Transmitimos los datos mediante una conexión cifrada (HTTPS); las respuestas correctas y la puntuación permanecen en el servidor, y protegemos las cookies con una firma criptográfica. Solo pueden pagar los usuarios mayores de edad o que actúen con el consentimiento de su representante legal; no tratamos a sabiendas datos de menores de 16 años sin el consentimiento de sus padres.",
          "Podemos actualizar esta política cuando cambie el servicio; la versión vigente está siempre disponible en esta página.",
        ],
      },
    ],
  },
};

export default es;
