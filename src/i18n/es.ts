/**
 * Traducciones y tablas en Español
 */
export const es = {
    // UI Strings
    SETTINGS: {
        TITLE: "Configuración de OPSE Oracle",
        RANDOM_MODE: "Modo de Aleatorización",
        RANDOM_MODE_DESC: "Elige entre dados (d6) o una baraja de cartas virtual (como en OPSE v1.6).",
        DICE: "Dados (d6)",
        CARDS: "Cartas (Baraja Estándar)",
        PERSISTENT_DECK: "Baraja Persistente (se agota)",
        AUTO_INSERT: "Inserción automática",
        AUTO_INSERT_DESC: "Si está activado, los resultados se insertarán automáticamente en la nota activa.",
        LANGUAGE: "Idioma",
        LANGUAGE_DESC: "Selecciona el idioma del plugin.",
        OPEN_CONTROL: "Abrir panel de control",
        OPEN_HISTORY: "Abrir historial",
        OPEN_EXPLORATION: "Abrir rastreador de exploración"
    },
    ADVENTURE: {
        NEW: "Nueva Aventura",
        TITLE: "Título",
        SYSTEM: "Sistema RPG",
        GENRE: "Género / Tono",
        PROTAGONISTS: "Protagonistas",
        PROMPT: "Premisa Inicial",
        START: "Comenzar",
        NOTE_HEADER: "## Premisa",
        SCENE_HEADER: "## Registro de Escenas",
        NPC: "Generar PNJ",
        HOOK: "Generar Vínculo/Misión",
        DOUBLE_FOCUS: "Foco Doble",
        PLOT_TWIST: "Giro de Trama",
        FLAVOR: "Ambiente / Clima",
        GENERIC: "Contenido Genérico",
        NPC_FIELDS: {
            IDENTITY: "Identidad",
            GOAL: "Objetivo",
            TRAIT: "Rasgo Notable",
            ATTITUDE: "Actitud",
            TOPIC: "Tema de conversación"
        }
    },
    HELP: {
        TITLE: "Procedimientos y Ayuda",
        SCENE_STEREOTYPE: "1. Imagina el estereotipo de la escena.",
        SCENE_ALTERED: "2. Comprueba si la escena está Alterada (1d6 <= Rango actual).",
        EVENT_TRIGGER: "3. Lanza un Evento Aleatorio si una prueba falla o te bloqueas.",
        GM_MOVES: "4. Usa los Movimientos del DJ para avanzar amenazas o complicar las cosas."
    },
    EXPORT: {
        BUTTON: "Exportar Sesión",
        SUCCESS: "Sesión exportada a: ",
        ERROR: "Error al exportar la sesión."
    },
    SCENE: {
        NEW: "Preparar Nueva Escena",
        OBJECTIVE: "Objetivo de la Escena",
        OBJECTIVE_DESC: "¿Qué intentan lograr los personajes?",
        LOCATION: "Ubicación",
        GENERATE: "Generar Escena",
        ALTERED_NOTICE: "¡ESCENA ALTERADA!",
        ALTERED_ONLY: "Escena Alterada",
        CHECK_ALTERATION: "Chequear Alteración",
        NOT_ALTERED: "Escena Normal",
        COMPLICATION: "Complicación de la Escena",
        COMPLICATION_BTN: "Complicación Escena"
    },
    ORACLE: {
        TITLE: "Oráculos",
        FOCUS_TITLE: "Oráculo (ENFOQUE)",
        ACTION: "Acción",
        DETAIL: "Detalle",
        YES: "Sí",
        NO: "No",
        BUT: "pero...",
        AND: "y...",
        YESNO_TITLE: "Preguntar al Oráculo (Sí/No)",
        QUESTION: "Pregunta",
        QUESTION_DESC: "¿Qué quieres saber?",
        LIKELIHOOD: "Probabilidad",
        PROBABLE: "Probable (3+)",
        EVEN: "A nivel (4+)",
        IMPROBABLE: "Improbable (5+)",
        ASK: "Preguntar",
        HOW_MUCH: "¿Cuánto? / ¿Qué nivel?",
        SCALES: ["Escaso", "Bajo", "Normal", "Notable", "Extraordinario", "Extremo"]
    },
    DASHBOARD: {
        TITLE: "Dashboard de OPSE",
        GENERATORS: "Generadores",
        SESSION: "Sesión",
        HISTORY: "Historial de OPSE",
        HELP: "Ayuda",
        RANK: "Rango Escena",
        THREADS: "Hilos / Objetivos",
        NEW_THREAD: "Nuevo hilo...",
        NO_HISTORY: "Sin historial aún.",
        BARAJAR: "Barajar",
        EXPORTAR: "Exportar Log",
        SHUFFLE_SUCCESS: "Baraja barajada."
    },
    METADATA: {
        ANSWER: "Respuesta",
        MOD: "Mod",
        DICE: "",
        LIKELIHOOD: "Probabilidad",
        COMPLICATION: "Complicación",
        ALTERED: "Alterado",
        NORMAL: "Normal",
        RESULT: "Resultado",
        DOMAIN: "Dominio",
        NOTE: "Nota",
        RAW: "Crudo"
    },
    COMMON: {
        COPY: "Copiar",
        INSERT: "Insertar",
        REROLL: "Relanzar",
        PIN: "Fijar",
        UNPIN: "Desfijar",
        COPIED: "Copiado al portapapeles",
        JOKER_NOTICE: "¡COMODÍN! Se dispara un Evento Aleatorio automáticamente."
    },
    // OPSE Tables
    TABLES: {
        COMPLICATIONS: [
            "Fuerzas hostiles se oponen a ti",
            "Un obstáculo bloquea tu camino",
            "¿No sería una mierda si...",
            "Un PNJ actúa repentinamente",
            "No todo es lo que parece ",
            "Las cosas van como se planearon"
        ],
        ALTERED: {
            "1": "Un detalle importante de la escena se mejora o empeora de alguna manera",
            "2": "El entorno es diferente",
            "3": "Hay presentes PNJs inesperados",
            "4": "Añade una **Complicación de Escena**",
            "5": "Añade un Movimiento de Ritmo",
            "6": "Añade un Evento Aleatorio"
        },
        PLOT_TWIST: [
            "Un aliado resulta ser un traidor",
            "El objetivo no es lo que parecía",
            "Aparece un tercer bando inesperado",
            "El tiempo se agota más rápido de lo previsto",
            "Una victoria se convierte en una complicación",
            "Un enemigo ofrece una tregua"
        ],
        FLAVOR: {
            ATMOSPHERE: ["Tenso", "Melancólico", "Opresivo", "Esperanzador", "Misterioso", "Caótico"],
            WEATHER: ["Lluvia torrencial", "Niebla densa", "Sol abrasador", "Viento helado", "Tormenta eléctrica", "Despejado"]
        },
        ACTIONS: {
            "2": "Buscar", "3": "Oponerse", "4": "Comunicar", "5": "Mover", "6": "Dañar",
            "7": "Crear", "8": "Revelar", "9": "Comandar", "10": "Tomar",
            "J": "Proteger", "Q": "Asistir", "K": "Transformar", "A": "Engañar"
        },
        DETAILS: {
            "2": "Pequeño", "3": "Grande", "4": "Antiguo", "5": "Reciente", "6": "Valioso",
            "7": "Inútil", "8": "Peligroso", "9": "Desagradable", "10": "Importante",
            "J": "Simple", "Q": "Complejo", "K": "Mágico", "A": "Mundano"
        },
        THEMES: {
            "2": "Paz", "3": "Conflicto", "4": "Poder", "5": "Tiempo", "6": "Miedo",
            "7": "Muerte", "8": "Vida", "9": "Dinero", "10": "Conocimiento",
            "J": "Amor", "Q": "Guerra", "K": "Destino", "A": "Caos"
        },
        DOMAINS: {
            "Hearts": "Místico (Sentimientos, magia, salud, espiritual)",
            "Clubs": "Técnico (Herramientas, mente, planes, ciencia)",
            "Diamonds": "Social (Gente, relaciones, comercio, ley)",
            "Spades": "Físico (Combate, entorno, objetos, fuerza)"
        },
        GM_MOVES_BEAT: [
            "Presentir problemas", "Ofrecer una oportunidad", "Revelar un detalle nuevo",
            "Avanzar una amenaza", "Poner a alguien en un aprieto", "Anunciar un peligro inminente"
        ],
        GM_MOVES_FAILURE: [
            "Causar daño", "Gastar recursos", "Separarlos",
            "Girar su movimiento contra ellos", "Mostrar las desventajas de su equipo/clase",
            "Hacer un movimiento de amenaza"
        ],
        HOOKS: {
            TITLE: "Gancho Argumental",
            GOAL_LABEL: "Objetivo",
            ADVERSARY_LABEL: "Adversarios",
            REWARD_LABEL: "Recompensas",
            GOAL: ["Elimina una amenaza", "Aprende la verdad", "Recupera algo de valor", "Escolta o entrega por seguridad", "Restaura algo roto", "Salva a un aliado en peligro"],
            ADVERSARY: ["Una poderosa organización", "Forajidos", "Guardianes", "Población local", "Hordas o fuerzas enemigas", "Un nuevo o recurrente villano"],
            REWARD: ["Dinero o bienes", "Dinero o bienes", "Conocimientos o Secretos", "Ayuda a un aliado", "Avanza en un arco argumental", "Un objeto único de poder"]
        }
    }
};
