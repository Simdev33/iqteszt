import type { Dict } from "./hu";

const es: Dict = {
  lowerNames: true,

  meta: {
    siteTitle: "Test de CI online con resultado inmediato",
    siteDescription:
      "¿Cuál es tu CI? 30 preguntas de reconocimiento de patrones, series numéricas, razonamiento verbal y lógico. Sin registro, con estimación inmediata del CI, percentil y desglose por áreas.",
    keywords: ["test de CI", "test de CI online", "test de inteligencia", "medir el CI", "test de matrices", "escala de CI", "coeficiente intelectual"],
    ogTitle: "¿Cuál es tu CI? · Test de CI online",
    ogDescription: "30 preguntas, unos 12 minutos, resultado inmediato y sin registro.",
    testTitle: "Hacer el test de CI",
    testDescription: "30 preguntas de reconocimiento de patrones, series numéricas, razonamiento verbal y lógico. Sin límite de tiempo y con resultado inmediato.",
    scaleTitle: "Escala de CI y calculadora de percentiles",
    scaleDescription: "¿Qué significa un valor de CI? Los tramos de la escala de CI, las proporciones en la población y una calculadora de percentiles, explicados con claridad.",
    methodTitle: "Metodología: así calculamos el CI",
    methodDescription:
      "Cómo están construidas las preguntas, la ponderación por dificultad, la corrección por edad y la fórmula para llevar la puntuación a la escala de CI, además de las limitaciones de un test online.",
    resultTitle: "Resultado",
    resultTitleIq: "CI {iq} – {band}",
    resultDescription: "Estimación del CI: {iq} ({band}). {correct}/{total} respuestas correctas. ¡Haz tú también el test!",
    termsTitle: "Términos y condiciones",
    privacyTitle: "Política de privacidad",
    subscriptionTitle: "Gestionar suscripción",
    demoTitle: "Pago (simulación de desarrollo)",
  },

  brand: {
    tagline: "Test de CI online con resultado inmediato",
    home: "{brand} – página de inicio",
  },

  nav: {
    test: "El test",
    scale: "Escala de CI",
    method: "Metodología",
    faq: "Preguntas frecuentes",
    main: "Navegación principal",
    mobile: "Navegación móvil",
    open: "Abrir menú",
    close: "Cerrar menú",
    start: "Empezar el test",
    startShort: "Test",
    language: "Idioma",
  },

  domains: {
    matrix: {
      name: "Reconocimiento de patrones",
      short: "Matrices",
      blurb: "Descubrir reglas visuales en cuadrículas de 3×3 figuras: la medida más pura de la inteligencia fluida.",
    },
    numeric: {
      name: "Razonamiento numérico",
      short: "Números",
      blurb: "Leyes de las series numéricas, proporciones y breves problemas de cálculo mental.",
    },
    verbal: {
      name: "Razonamiento verbal",
      short: "Palabras",
      blurb: "Analogías, antónimos y palabras intrusas: reconocer las relaciones entre conceptos.",
    },
    logic: {
      name: "Razonamiento lógico",
      short: "Lógica",
      blurb: "Orden, tiempo, visión espacial y silogismos: el pensamiento paso a paso que sigue reglas.",
    },
  },

  difficulty: { easy: "Fácil", medium: "Media", hard: "Difícil" },

  ages: { u16: "Menos de 16 años", none: "sin indicar" },

  bands: {
    top: {
      label: "Excepcionalmente alto",
      text: "Solo en torno al 2 % de la población obtiene un resultado así. Reconoces las reglas abstractas con rapidez y fiabilidad, incluso en situaciones complejas.",
    },
    high: {
      label: "Alto",
      text: "Has rendido claramente por encima de la media: también se te dan bien las tareas más complicadas, en las que hay que seguir varias reglas a la vez.",
    },
    above: {
      label: "Por encima de la media",
      text: "Te has desenvuelto mejor que la mayoría. Captas rápido los patrones nuevos y retienes bien los detalles.",
    },
    avg: { label: "Medio", text: "En este tramo se encuentra la mitad de la población. Un perfil de razonamiento estable y equilibrado." },
    below: {
      label: "Por debajo de la media",
      text: "El resultado de un test online depende de muchas cosas: el cansancio, la atención, la presión del tiempo. Vale la pena volver a intentarlo descansado.",
    },
    low: { label: "Bajo", text: "Este resultado procede de una breve serie de preguntas online, así que no saques conclusiones de largo alcance." },
    vlow: {
      label: "Muy bajo",
      text: "Una breve serie de preguntas online no sirve para hacer un diagnóstico. Si necesitas una medición real, la solución es un test administrado por un profesional.",
    },
  },

  scaleBands: {
    vlow: {
      label: "Muy bajo",
      desc: "Para valorarlo de verdad hace falta una evaluación estandarizada realizada por un profesional; un test online no sirve para ello.",
    },
    low: { label: "Bajo", desc: "En un test online, el cansancio, la falta de atención o la barrera del idioma a menudo también hacen bajar el resultado." },
    below: { label: "Por debajo de la media", desc: "Un razonamiento abstracto algo más lento que la media: un rango de sobra suficiente para la vida cotidiana." },
    avg: { label: "Medio", desc: "Aquí se encuentra la mitad de la población: es el rango «normal», con un perfil de razonamiento equilibrado." },
    above: { label: "Por encima de la media", desc: "Reconocimiento rápido de patrones y buena memoria de trabajo: las reglas nuevas se captan enseguida." },
    high: { label: "Alto", desc: "También se dan bien las tareas complejas en las que hay que seguir varias reglas a la vez." },
    top: { label: "Excepcional", desc: "Aproximadamente el 2 % de la población. Reconocimiento rápido y fiable de reglas abstractas, incluso en situaciones complicadas." },
  },

  ordinal: "{n}.º",

  charts: {
    bellHint: "Pasa el ratón (o toca) sobre un tramo",
    bellShare: "· ~{share} % de la población",
    bellAria: "Distribución normal de los valores de CI",
    bellYou: "Tú: {iq}",
    radarAria: "Resultado por áreas",
    gaugeLabel: "Estimación del CI",
    betterThan: "Mejor que el {p} % de la población",
  },

  home: {
    hero: {
      chip: "Test de CI online · resultado inmediato",
      title: ["¿Cuál es", "tu *CI?*"],
      lead: "De un banco de {pool} preguntas, en cada intento recibes {total} preguntas nuevas de reconocimiento de patrones, series numéricas, palabras y lógica. Al final, estimación inmediata del CI, percentil y desglose por áreas, sin registro.",
      cta: "Empezar el test",
      try: "Pruébalo con una pregunta",
      facts: { tasks: "preguntas", minutes: "minutos", areas: "áreas de capacidad" },
      scroll: "Desplázate",
      ruleLabel: "Regla:",
      rules: { nested: "Dos cuadrados latinos", sum: "1.ª + 2.ª = 3.ª", rotate: "Giro de +90°", fill: "Relleno por columnas" },
    },
    marquee: ["Patrones", "Series numéricas", "Analogías", "Rotaciones", "Cuadrados latinos", "Silogismos", "Visión espacial", "Palabra intrusa", "Proporciones", "Ordenaciones"],
    domains: {
      eyebrow: "¿Qué mide el test?",
      title: ["Cuatro capacidades,", "*un número.*"],
      lead: "Las preguntas cubren cuatro áreas que se complementan entre sí. Al final no solo obtienes un valor de CI, sino que también ves en qué área destacas.",
      count: "{n} preguntas",
      word: { a: "perro", b: "cachorro", c: "gato", tries: ["ratón", "leche", "gatito"] },
      people: ["Lucía", "Hugo", "Marta", "Pablo"],
      sorted: "mayor → menor",
      unsorted: "afirmaciones desordenadas",
    },
    steps: {
      eyebrow: "¿Cómo funciona?",
      title: ["Tres pasos,", "unos doce minutos."],
      items: [
        {
          title: "Indica tu grupo de edad",
          text: "Un solo clic. Ajustamos la referencia según la edad; no hace falta registrarse ni crear una cuenta.",
        },
        {
          title: "Resuelve las {total} preguntas",
          text: "Sin límite de tiempo. Puedes avanzar también con el teclado (A–F, flechas), volver atrás y saltar a cualquier pregunta.",
        },
        {
          title: "Recibe tu resultado",
          text: "Nada más desbloquearlo: estimación del CI con percentil, desglose por áreas y la solución de cada pregunta con su explicación.",
        },
      ],
    },
    tryIt: {
      eyebrow: "Pregunta de prueba",
      title: ["¿Qué figura va", "en el lugar del signo de interrogación?"],
      lead: "Un calentamiento fácil: en el test te esperan {n} preguntas de este tipo.",
      correct: "¡Exacto! Esa es la respuesta correcta.",
      wrong: "No del todo: la respuesta correcta es la {letter}.",
      explain:
        "En cada fila se mantienen la figura y el relleno, y de izquierda a derecha aumenta el tamaño: pequeña, mediana, grande. El elemento que falta es la estrella grande y vacía.",
      full: "Al test completo",
      again: "Otra vez",
      hint: "Fíjate en qué cambia en cada fila y en cada columna (figura, tamaño, relleno) y elige una de las seis opciones.",
    },
    scale: {
      eyebrow: "La escala de CI",
      title: ["La media es 100.", "La mayoría, entre 85 y 115."],
      lead: "El CI no es una medida absoluta, sino relativa: indica dónde te sitúas dentro de la distribución de la población. La escala tiene una media de 100 y una desviación típica de 15, así que unas dos terceras partes de las personas quedan entre 85 y 115.",
      link: "Escala de CI detallada y calculadora de percentiles →",
    },
    preview: {
      eyebrow: "Tu resultado",
      title: ["No es solo un número:", "*es un perfil completo.*"],
      sample: "Resultado de ejemplo",
      sampleChip: "{band} · {ord} percentil",
      points: [
        { t: "Estimación del CI y percentil", d: "Dónde te sitúas respecto a la población, con un único número fácil de entender." },
        { t: "Desglose por áreas", d: "Patrones, números, palabras, lógica: descubre cuál es tu punto fuerte." },
        { t: "Soluciones explicadas", d: "La respuesta correcta de las 30 preguntas, con su razonamiento." },
        { t: "Enlace para compartir", d: "Envíaselo a tus amigos con un clic: ellos también pueden probar." },
      ],
      price:
        "Hacer el test es gratis. Puedes desbloquear todo tu resultado con el acceso completo de {days} días por *{trial}*; si no cancelas, a partir del día {nextDay} cuesta {monthly} al mes. Puedes cancelarlo cuando quieras.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: ["Preguntas", "frecuentes."],
      lead: "Todo lo que conviene saber antes de empezar, en pocas palabras y con sinceridad.",
    },
    final: {
      eyebrow: "¿Preparado?",
      title: "Doce minutos y *lo sabrás.*",
      text: "{total} preguntas, sin límite de tiempo y sin registro. Hacer el test es gratis; el resultado detallado está disponible con el acceso completo de {days} días ({trial}).",
      cta: "¡Empecemos!",
    },
  },

  faq: [
    {
      q: "¿Cuánto cuesta?",
      a: "Hacer el test es gratis y no requiere registro. Puedes desbloquear el resultado detallado con el acceso completo de {days} días, que cuesta {trial}; durante ese tiempo puedes hacer tests ilimitados y ver todos sus resultados. Si no lo cancelas durante los primeros {days} días, a partir del día {nextDay} el acceso continúa como suscripción mensual de {monthly} hasta que la canceles; puedes cancelarla en cualquier momento, con un clic. Puedes pagar con tarjeta bancaria, Apple Pay o Google Pay.",
    },
    {
      q: "¿Cómo cancelo la suscripción?",
      a: "Cuando quieras, en pocos clics: pulsa el enlace «Gestionar / cancelar suscripción» al final de la página y cancélala en el portal de cliente seguro de Stripe. Si la cancelas durante el periodo de prueba, no habrá más cargos; conservas el acceso hasta el final del periodo ya pagado.",
    },
    {
      q: "¿Cuánto se tarda en hacer el test?",
      a: "Las 30 preguntas se resuelven de media en 10–15 minutos. No hay límite de tiempo y el tiempo no cuenta para la puntuación: mejor piensa bien las preguntas que ir con prisas.",
    },
    {
      q: "¿Qué precisión tiene un test de CI online?",
      a: "Una breve serie de preguntas online ofrece una buena estimación de tu rendimiento en tareas de razonamiento abstracto, pero no sustituye una evaluación estandarizada realizada por un psicólogo (p. ej., la WAIS). Considera el resultado como orientativo.",
    },
    {
      q: "¿Cómo calculáis el CI?",
      a: "Cada respuesta correcta vale unos puntos ponderados según su dificultad (fácil 1, media 1,5, difícil 2). Comparamos esa puntuación con una distribución supuesta de la población, con una pequeña corrección por grupo de edad, y la llevamos a la escala habitual con media 100 y desviación típica 15. Los detalles están en la página de Metodología.",
    },
    {
      q: "¿Puedo volver a una pregunta anterior?",
      a: "Sí. Durante el test puedes volver atrás cuando quieras, saltarte preguntas e ir directamente a cualquiera de ellas desde la barra superior. Antes de enviar las respuestas verás además un resumen de las preguntas que te has saltado.",
    },
    {
      q: "¿Qué pasa con mis respuestas?",
      a: "Solo usamos tus respuestas para la evaluación: al pagar se asocian en forma breve y codificada a la transacción de pago, y a partir de ellas calculamos el resultado. No pedimos tu nombre ni una cuenta de usuario; los datos de tu tarjeta los gestiona Stripe y nosotros no los vemos. Para el pago, Stripe te pide una dirección de correo electrónico para el recibo. A los suscriptores les instalamos además una cookie para que el navegador reconozca la suscripción activa.",
    },
    {
      q: "¿Puedo hacerlo varias veces?",
      a: "Claro. De un banco de 90 preguntas, en cada intento recibes una combinación distinta y tienen prioridad las preguntas que aún no has visto: en tres intentos seguidos no se repite ni una sola pregunta. Eso sí, con la práctica te acostumbras a los tipos de pregunta, así que el resultado de un nuevo intento suele ser algo más alto.",
    },
    {
      q: "¿Es adecuado para niños?",
      a: "Las preguntas se pueden entender a partir de los 12 años. El resultado de los menores de 16 se calcula con una pequeña corrección por edad, pero en el caso de los niños es especialmente cierto que un test online solo sirve como orientación lúdica. Solo pueden pagar y suscribirse usuarios mayores de edad (o que actúen con el consentimiento de su representante legal).",
    },
  ],

  footer: {
    blurb: "90 preguntas de desarrollo propio en cuatro áreas de capacidad, sin registro.",
    pages: "Páginas",
    takeTest: "Hacer el test de CI",
    important: "Importante",
    disclaimer:
      "El resultado es una estimación orientativa, no un diagnóstico médico ni psicológico. Los datos de la tarjeta los gestiona Stripe; nosotros no los vemos ni los guardamos.",
    legal: "Información legal",
    terms: "Términos y condiciones",
    privacy: "Política de privacidad",
    subscription: "Gestionar / cancelar suscripción",
    operator: "Titular",
    companyId: "N.º de identificación (IČO)",
    taxId: "N.º fiscal (DIČ)",
    contact: "Contacto",
  },

  test: {
    runner: {
      elapsed: "Tiempo transcurrido",
      exit: "Salir",
      questions: "Preguntas",
      questionN: "Pregunta {n}",
      answeredMark: " (respondida)",
      answeredCount: "{a} / {total} respondidas",
      paging: "Navegación",
      back: "Atrás",
      keysAnswer: "responder ·",
      keysPage: "navegar",
      summary: "Resumen",
      next: "Siguiente",
      skip: "Saltar",
    },
    intro: {
      eyebrow: "Antes de empezar",
      title: "Busca un *rincón tranquilo.*",
      lead: "Desactiva las notificaciones y resuelve las preguntas sin ayuda. Puedes usar papel y lápiz, pero no calculadora ni búsquedas en internet.",
      rules: {
        tasks: "preguntas, seleccionadas de un banco de {pool}",
        minutes: "minutos de duración media",
        noLimit: "sin límite de tiempo; el tiempo no cuenta",
        back: "puedes volver atrás y saltar preguntas",
      },
      pendingTitle: "Te espera el resultado de un test que ya has terminado.",
      pendingText: "Has respondido {a} de {total} preguntas. Puedes desbloquear el resultado cuando quieras.",
      pendingCta: "Desbloquear resultado",
      savedTitle: "Tienes un test a medias.",
      savedText: "Ya has respondido {a} de {total} preguntas. Puedes continuar donde lo dejaste.",
      savedCta: "Continuar",
      age: "Grupo de edad",
      ageHint: "– para la referencia (opcional)",
      tip: "Consejo: puedes responder con las teclas {a}–{f} y pasar de pregunta con las flechas.",
      startNew: "Empezar un test nuevo",
      start: "Empezar",
    },
    question: {
      difficulty: "Dificultad: {d}",
      pickMissing: "Elige el elemento que falta:",
    },
    review: {
      eyebrow: "Resumen",
      allDone: "Has respondido *todas las preguntas.*",
      open: { one: "Aún queda {n} pregunta *sin responder.*", other: "Aún quedan {n} preguntas *sin responder.*" },
      allDoneText: "Si quieres, todavía puedes revisar tus respuestas: basta un clic en el número.",
      openText: "Las preguntas que te saltes cuentan como respuestas incorrectas. Si no estás seguro, vale la pena intentar adivinar.",
      unanswered: " – sin responder",
      answerLetter: " – respuesta {l}",
      toSkipped: "Ir a las preguntas saltadas",
      toQuestions: "Volver a las preguntas",
      submit: "Evaluar",
    },
    analyzing: {
      title: "Evaluando…",
      steps: ["Comprobando las respuestas", "Ponderando la dificultad", "Comparando con tu grupo de edad", "Calculando el percentil", "Elaborando el perfil"],
    },
  },

  paywall: {
    eyebrow: "Evaluación completada",
    title: "Tu resultado *está listo.*",
    summary: "Has respondido {a} de {total} preguntas{time}. Desbloquéalo y descubre dónde te sitúas.",
    summaryTime: " en {t}",
    preview: "Tu resultado",
    cancelled: "El pago se ha interrumpido y no se te ha cobrado nada. Puedes volver a intentarlo cuando quieras.",
    includes: "El acceso completo de {days} días incluye:",
    perks: [
      { t: "Estimación del CI y percentil", d: "Dónde te sitúas exactamente respecto a la población." },
      { t: "Desglose por áreas", d: "Patrones, números, palabras, lógica: cuál es tu punto fuerte." },
      { t: "La solución de las {total} preguntas", d: "Las respuestas correctas con su razonamiento, junto a tus propias respuestas." },
      { t: "Tests nuevos ilimitados", d: "Mientras dure el acceso, también verás al instante todos tus resultados siguientes." },
    ],
    accessName: "Acceso completo de {days} días",
    consent:
      "Acepto los [Términos y condiciones](terms) y la [Política de privacidad](privacy), solicito el inicio inmediato del servicio y acepto que con ello pierdo mi derecho de desistimiento de 14 días.",
    consentNeeded: "Para continuar, acepta la declaración anterior.",
    methodLabel: "Método de pago",
    card: "Tarjeta de débito o crédito",
    loading: "Cargando el formulario de pago…",
    close: "Cancelar",
    busy: "Redirigiendo…",
    trust: ["SSL de 256 bits", "Pago a través de Stripe", "Cancela cuando quieras"],
    renewal:
      "Si no cancelas durante los primeros {days} días, tu suscripción continúa a partir del día {nextDay} por {monthly} al mes hasta que la canceles. Puedes cancelarla en cualquier momento, con un clic, en la página [Gestionar suscripción](subscription).",
    restart: "Prefiero empezar un test nuevo",
    unknownError: "Error desconocido.",
    member: {
      title: "Tienes una suscripción activa",
      text: "Mientras dure tu suscripción, puedes abrir todos tus resultados sin coste adicional.",
      cta: "Abrir resultado",
      manage: "Gestionar suscripción",
    },
  },

  result: {
    eyebrow: "Tu resultado",
    verdict: { top: "Excepcional", strong: "Fuerte", avg: "Medio", grow: "Mejorable" },
    shareText: "Mi CI estimado en el test de Elmeszint es {iq}. ¿Y el tuyo?",
    shareTitle: "Mi resultado de CI",
    copied: "¡Enlace copiado!",
    share: "Compartir resultado",
    again: "Repetir el test",
    stats: { correct: "respuestas correctas", time: "tiempo empleado", percentile: "percentil", age: "grupo de edad" },
    topShare: "Estás aproximadamente en el {top} % superior.",
    strongest: "Tu área más fuerte: {domain}.",
    bell: {
      eyebrow: "¿Dónde te sitúas?",
      title: ["En la distribución", "de la población."],
      lead: "La zona sombreada muestra qué parte de la población obtiene una puntuación inferior a la tuya: aproximadamente el {p} %.",
    },
    domains: { eyebrow: "Desglose por áreas", title: ["Aquí es donde", "*más destacas.*"] },
    solutions: { eyebrow: "Soluciones", title: ["Todas las preguntas,", "con su razonamiento."] },
    subBanner:
      "Tu suscripción está activa: también verás al instante el resultado de tus próximos tests hasta que la canceles. [Gestionar / cancelar suscripción](sub)",
    disclaimer:
      "*Importante:* esta es una estimación basada en una breve serie de preguntas online. No sustituye una evaluación estandarizada de la inteligencia realizada por un psicólogo y no puede servir de base para decisiones médicas ni laborales. Los detalles del cálculo están en la página de [Metodología](method).",
    review: {
      all: "Todas",
      wrong: "Incorrectas / saltadas",
      right: "Correctas",
      ok: "correcta",
      skipped: "saltada",
      bad: "incorrecta",
      matrixItem: "Matriz: ¿qué figura va en el lugar del signo de interrogación?",
      you: "tú:",
      good: "correcta:",
    },
    locked: {
      eyebrow: "Resultado",
      unpaidTitle: "Aún no hemos recibido el pago.",
      invalidTitle: "Este enlace no corresponde a ningún resultado.",
      unpaidText:
        "Si acabas de pagar, actualiza la página dentro de unos segundos. Si interrumpiste el pago, puedes volver a intentarlo en cualquier momento desde la página del test.",
      invalidText: "Puede que el enlace se haya dañado al copiarlo. Si ya has hecho el test, puedes desbloquear tu resultado desde la página del test.",
      back: "Volver al test",
      open: "Abrir el test",
    },
  },

  scalePage: {
    eyebrow: "Escala de CI",
    title: ["¿Qué significa", "*un valor de CI?*"],
    lead: "El CI indica dónde te sitúas dentro de la distribución de la población. Mueve el control deslizante y descubre qué porcentaje representa cada valor.",
    bandsEyebrow: "Los tramos",
    bandsTitle: ["La escala de CI,", "tramo a tramo."],
    topics: [
      {
        t: "¿Por qué la media es precisamente 100?",
        d: "El CI es una medida relativa. Los tests se calibran con una muestra amplia de modo que el rendimiento medio valga 100 puntos y una desviación típica, 15 puntos. Así, cualquier valor se traduce de inmediato en el porcentaje de la población al que superas.",
      },
      {
        t: "¿Qué mide y qué no?",
        d: "Los tests de CI miden el razonamiento abstracto, el reconocimiento de patrones, la memoria de trabajo y el razonamiento lingüístico-lógico. No miden la creatividad, la inteligencia emocional, la constancia ni los conocimientos profesionales, aunque estos cuentan al menos lo mismo.",
      },
      {
        t: "El efecto Flynn",
        d: "A lo largo del siglo XX, las puntuaciones brutas en los tests mejoraron unos 3 puntos por década en los países desarrollados. Por eso hay que recalcular las normas con regularidad: un CI medido con una norma antigua sale inflado.",
      },
    ],
    cta: "Mide el tuyo",
    calc: {
      eyebrow: "Calculadora de percentiles",
      iqValue: "Valor de CI",
      percentile: "percentil",
      ofHundred: "de cada 100 personas, puntúan por debajo",
    },
  },

  methodPage: {
    eyebrow: "Metodología",
    title: ["Así se convierten tus respuestas", "*en un número.*"],
    lead: "Un cálculo transparente y verificable, y palabras sinceras sobre para qué sirve un test de CI online y para qué no.",
    tasks: {
      title: "Las preguntas",
      p1: "El banco consta de {pool} preguntas de desarrollo propio, de las que en cada intento aparecen {total}. Para cada una de las {total} posiciones del test hay {variants} variantes de la misma área y la misma dificultad, de modo que todas las combinaciones tienen la misma estructura y los resultados son comparables.",
      pairNote: "El par de números: preguntas por test / preguntas en el banco.",
      p2: "Las preguntas de matrices (tipo Raven, cuadrículas de 3×3 figuras) son la medida más pura de la inteligencia fluida, por eso suponen casi la mitad de las preguntas. La dificultad aumenta más o menos progresivamente: cada test tiene {easy} preguntas fáciles, {medium} de dificultad media y {hard} difíciles, y las áreas se van alternando.",
      p3: "El navegador recuerda qué preguntas ya has visto y en el siguiente intento da prioridad a las que aún no has visto; así, en tres intentos seguidos no se repite ni una sola pregunta.",
    },
    scoring: {
      title: "Puntuación",
      p1: "Cada respuesta correcta vale unos puntos ponderados según su dificultad; las respuestas saltadas o incorrectas valen 0 puntos.",
      points: "{d} = peso {w}",
      p2: "Dividimos la puntuación ponderada entre el máximo posible (con lo que obtenemos un valor entre 0 y 1) y la llevamos a la escala de CI habitual:",
      formula: "s  = puntos ponderados / máximo\nz  = (s − ({mean} + corrección)) / {sd}\nCI = 100 + 15 · z        (limitado entre {min} y {max})",
      p3: "La media de {mean} y la desviación típica de {sd} corresponden a la distribución estimada de la población para esta serie de preguntas. El percentil se obtiene de la función de distribución normal: un CI de 115, por ejemplo, corresponde aproximadamente al percentil 84.",
    },
    age: {
      title: "Corrección por edad",
      p1: "El rendimiento del razonamiento fluido alcanza su máximo a mediados de los veinte años y después disminuye lentamente. Por eso, el resultado de las personas mayores y de los menores de 16 años se compara con una media esperada algo más baja.",
    },
    limits: {
      title: "Limitaciones",
      items: [
        "El error de medición de un test online de 30 preguntas es bastante mayor que el de una evaluación de 1–2 horas realizada por un psicólogo. Conviene interpretar el resultado como un intervalo de ±8–10 puntos.",
        "La norma es una estimación y no procede de una muestra representativa, así que el valor numérico exacto es orientativo.",
        "Repetir el test infla el resultado por el efecto del aprendizaje.",
        "El resultado no es un diagnóstico y no sirve de base para decisiones educativas, laborales ni médicas.",
      ],
    },
    payment: {
      title: "Pago y protección de datos",
      p1: "Hacer el test es gratis; el resultado detallado está disponible con el acceso completo de {days} días ({trial}; si no cancelas, {monthly}/mes a partir del día {nextDay}; se puede cancelar en cualquier momento). La puntuación se calcula en el servidor y las respuestas correctas nunca llegan a tu navegador. Al pagar, tus respuestas se asocian en forma breve y codificada a la transacción de pago de Stripe, y la página de resultados calcula el resultado a partir de ellas; no las guardamos en ninguna base de datos aparte.",
      p2: "El estado de un test a medias solo lo guarda tu propio navegador, para que puedas continuarlo. No pedimos tu nombre ni una cuenta de usuario; los datos de la tarjeta los gestiona Stripe y nosotros no los vemos.",
      cta: "Empezar el test",
    },
  },

  subscriptionPage: {
    eyebrow: "Suscripción",
    title: ["Gestionar", "*suscripción.*"],
    lead: "Aquí ves el estado de tu suscripción y puedes cancelarla. La cancelación se registra al instante; conservas el acceso hasta el final del periodo ya pagado.",
    status: "Estado",
    trialing: "Periodo de prueba: termina el {date}. Si no cancelas antes, después se cobrarán {monthly} al mes.",
    active: "Activa. Próximo cobro: {date}, {amount}.",
    canceling: "Cancelada. Tu acceso sigue activo hasta el {date}; no habrá más cobros.",
    pastDue: "No se ha podido realizar el último cobro. Actualiza el método de pago en el portal de cliente.",
    none: "No hay ninguna suscripción activa en este dispositivo.",
    manage: "Gestionar / cancelar suscripción",
    manageHint: "Se abrirá el portal de cliente seguro de Stripe: allí puedes cancelar la suscripción, cambiar de tarjeta y descargar tus facturas.",
    noDevice:
      "Si te suscribiste desde otro dispositivo o navegador, entra en el portal de cliente con la dirección de correo electrónico que indicaste al pagar: te enviaremos un código de un solo uso y allí podrás cancelar la suscripción.",
    portalLogin: "Entrar en el portal de cliente con tu correo electrónico",
    help: "¿Tienes alguna pregunta o no consigues cancelar? Escríbenos a {email}",
    portalError: "El portal de cliente no está disponible ahora mismo. Vuelve a intentarlo dentro de un minuto o escríbenos a {email}",
    demoNote: "Modo de desarrollo: no hay ninguna clave de Stripe configurada, así que aquí no hay ninguna suscripción real.",
  },

  demoPay: {
    chip: "Modo de desarrollo: no hay pago real",
    title: "Simulación de pago",
    text: "No hay ninguna clave de Stripe configurada, así que esta página sustituye a la página de pago de Stripe. Una vez configurada la STRIPE_SECRET_KEY, aquí aparecerá el pago real con tarjeta.",
    item: "Resultado del test de CI",
    pay: "Simular un pago correcto",
    cancel: "Cancelar el pago",
  },

  notFound: {
    title: "Esta página no existe.",
    text: "Puede que haya un error en la dirección o que la página se haya eliminado.",
    home: "Volver a la página de inicio",
  },

  legal: {
    updated: "En vigor desde: {date}",
    draftNote: "",
    toc: "Índice",
  },

  stripe: {
    subName: "Suscripción a Elmeszint",
    subDesc: "Tests de CI y resultados detallados ilimitados. Se renueva cada mes; puedes cancelarla en cualquier momento.",
    trialName: "Acceso completo de {days} días",
    submitNote:
      "Hoy se te cobrará {trial} por el acceso completo de {days} días. Si no cancelas durante los primeros {days} días, a partir del día {nextDay} se te cobrarán automáticamente {monthly} al mes hasta que canceles. Puedes cancelar en cualquier momento desde el enlace «Gestionar / cancelar suscripción», al final de la página web.",
  },

  api: {
    invalid: "Test no válido.",
    unavailable: "La página de pago no está disponible ahora mismo. Vuelve a intentarlo dentro de un minuto.",
    notConfigured: "El pago todavía no está configurado en este sitio.",
    notMember: "No hay ninguna suscripción activa en este dispositivo.",
  },
};

export default es;
