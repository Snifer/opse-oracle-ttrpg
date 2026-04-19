/**
 * Traducciones y tablas en Español
 */
export const es = {
    SETTINGS: {
        TITLE: 'Configuración de OPSE Oracle',
        RANDOM_MODE: 'Modo de Aleatorización',
        RANDOM_MODE_DESC: 'Elige entre dados (d6) o una baraja de cartas virtual (como en OPSE v1.6).',
        DICE: 'Dados (d6)',
        CARDS: 'Cartas (Baraja Estándar)',
        PERSISTENT_DECK: 'Baraja Persistente (se agota)',
        AUTO_INSERT: 'Inserción automática',
        AUTO_INSERT_DESC: 'Si está activado, los resultados se insertarán automáticamente en la nota activa.',
        LANGUAGE: 'Idioma',
        LANGUAGE_DESC: 'Selecciona el idioma del plugin.',
        OPEN_CONTROL: 'Abrir panel de control',
        OPEN_HISTORY: 'Abrir historial',
        OPEN_EXPLORATION: 'Abrir rastreador de exploración',
        DATA_MANAGEMENT: 'Gestión de Datos',
        HISTORY_LIMIT: 'Límite de historial',
        CLEAR_HISTORY: 'Limpiar historial',
        CLEAR_BTN: 'Limpiar',
        CLEAR_CONFIRM: '¿Limpiar historial? Esta acción no se puede deshacer.',
        // Interface
        SECTION_INTERFACE: 'Interfaz',
        DEFAULT_TAB: 'Tab por defecto',
        DEFAULT_TAB_DESC: 'Qué tab se muestra al abrir el panel de control.',
        COMPACT_HISTORY: 'Modo compacto',
        COMPACT_HISTORY_DESC: 'Cards más pequeñas en el historial para ver más entradas a la vez.',
        ACCENT_COLOR: 'Color de acento',
        ACCENT_COLOR_DESC: 'Color principal de la interfaz. Por defecto: #8b5cf6 (violeta).',
        HISTORY_ORDER: 'Orden del historial',
        HISTORY_ORDER_DESC: 'Cómo ordenar las entradas del historial.',
        NEWEST_FIRST: 'Más reciente primero',
        OLDEST_FIRST: 'Más antiguo primero',
        TIMESTAMP_FORMAT: 'Formato de timestamp',
        TIMESTAMP_FORMAT_DESC: 'Cómo mostrar la hora en cada entrada del historial.',
        TIMESTAMP_TIME: 'Hora (HH:MM)',
        TIMESTAMP_DATETIME: 'Fecha y hora',
        TIMESTAMP_RELATIVE: 'Relativo ("hace 5 min")',
        // Insert format
        SECTION_INSERT: 'Inserción de resultados',
        INSERT_FORMAT: 'Formato de inserción',
        INSERT_FORMAT_DESC: 'Cómo se insertan los resultados en las notas.',
        INSERT_PLAIN: 'Markdown plano',
        INSERT_CALLOUT: 'Callout de Obsidian (> [!oracle])',
        INSERT_ANSWER: 'Solo respuesta (sin raw)',
        SHOW_RAW: 'Mostrar tiradas raw',
        SHOW_RAW_DESC: 'Incluir el resultado de dados/cartas (ej: 1d6=4) en el texto insertado.',
        SHOW_DOMAIN: 'Mostrar dominio/palo',
        SHOW_DOMAIN_DESC: 'Mostrar el dominio (Físico, Social…) en resultados de foco.',
        // Oracles
        SECTION_ORACLES: 'Oráculos',
        DEFAULT_LIKELIHOOD: 'Probabilidad por defecto',
        DEFAULT_LIKELIHOOD_DESC: 'Nivel de probabilidad preseleccionado al abrir el oráculo Sí/No.',
        HEX_EVENT_THRESHOLD: 'Umbral de evento en hex',
        HEX_EVENT_THRESHOLD_DESC: 'Un evento se dispara cuando la tirada d6 alcanza este valor o más. Por defecto: 5 (OPSE v1.6).',
        // Session
        SECTION_SESSION: 'Sesión y datos',
        EXPORT_FORMAT: 'Formato de exportación',
        EXPORT_FORMAT_DESC: 'Formato del archivo al exportar la sesión.',
        EXPORT_MD: 'Markdown (.md)',
        EXPORT_JSON: 'JSON (.json)',
        RESET_DECK: 'Resetear baraja al cambiar aventura',
        RESET_DECK_DESC: 'Si está activado, la baraja se reinicia cada vez que se activa una aventura diferente.',
        AUTO_OPEN_EXPLORATION: 'Abrir exploración automáticamente',
        AUTO_OPEN_EXPLORATION_DESC: 'Abrir la vista de exploración al crear una mazmorra o región hexagonal.',
        // About
        SECTION_ABOUT: 'Acerca de',
        ABOUT_VERSION: 'Versión',
        ABOUT_AUTHOR: 'Autor',
        ABOUT_BASED_ON: 'Basado en',
        ABOUT_LICENSE: 'Licencia',
        ABOUT_OPSE_DESC: 'One Page Solo Engine v1.6 por Karl Hendricks',
        ABOUT_RESET_DEFAULTS: 'Restaurar valores por defecto',
        ABOUT_RESET_CONFIRM: '¿Restaurar toda la configuración a los valores por defecto? El historial y las aventuras no se verán afectados.',
        RESET_BTN: 'Restaurar'
    },
    ADVENTURE: {
        NEW: 'Nueva Aventura',
        TITLE: 'Título',
        SYSTEM: 'Sistema RPG',
        GENRE: 'Género / Tono',
        PROTAGONISTS: 'Protagonistas',
        PROMPT: 'Premisa Inicial',
        START: 'Comenzar',
        NOTE_HEADER: '## Premisa',
        SCENE_HEADER: '## Registro de Escenas',
        NPC: 'Generar PNJ',
        HOOK: 'Generar Vínculo/Misión',
        DOUBLE_FOCUS: 'Foco Doble',
        PLOT_TWIST: 'Giro de Trama',
        FLAVOR: 'Ambiente / Clima',
        GENERIC: 'Contenido Genérico',
        NPC_FIELDS: {
            IDENTITY: 'Identidad',
            GOAL: 'Objetivo',
            TRAIT: 'Rasgo Notable',
            ATTITUDE: 'Actitud',
            TOPIC: 'Tema de conversación'
        }
    },
    HELP: {
        TITLE: 'Procedimientos y Ayuda',
        SCENE_STEREOTYPE: '1. Imagina el estereotipo de la escena.',
        SCENE_ALTERED: '2. Comprueba si la escena está Alterada (1d6 <= Rango actual).',
        EVENT_TRIGGER: '3. Lanza un Evento Aleatorio si una prueba falla o te bloqueas.',
        GM_MOVES: '4. Usa los Movimientos del DJ para avanzar amenazas o complicar las cosas.'
    },
    EXPORT: {
        BUTTON: 'Exportar Sesión',
        SUCCESS: 'Sesión exportada a: ',
        ERROR: 'Error al exportar la sesión.'
    },
    SCENE: {
        NEW: 'Preparar Nueva Escena',
        OBJECTIVE: 'Objetivo de la Escena',
        OBJECTIVE_DESC: '¿Qué intentan lograr los personajes?',
        LOCATION: 'Ubicación',
        GENERATE: 'Generar Escena',
        ALTERED_NOTICE: '¡ESCENA ALTERADA!',
        ALTERED_ONLY: 'Escena Alterada',
        CHECK_ALTERATION: 'Chequear Alteración',
        NOT_ALTERED: 'Escena Normal',
        COMPLICATION: 'Complicación de la Escena',
        COMPLICATION_BTN: 'Complicación Escena'
    },
    ORACLE: {
        TITLE: 'Oráculos',
        FOCUS_TITLE: 'Oráculo (ENFOQUE)',
        ACTION: 'Acción',
        DETAIL: 'Detalle',
        YES: 'Sí',
        NO: 'No',
        BUT: 'pero...',
        AND: 'y...',
        YESNO_TITLE: 'Preguntar al Oráculo (Sí/No)',
        QUESTION: 'Pregunta',
        QUESTION_DESC: '¿Qué quieres saber?',
        LIKELIHOOD: 'Probabilidad',
        PROBABLE: 'Probable (3+)',
        EVEN: 'A nivel (4+)',
        IMPROBABLE: 'Improbable (5+)',
        ASK: 'Preguntar',
        HOW_MUCH: '¿Cuánto? / ¿Qué nivel?',
        THEME: 'Tema',
        CMD_HOW_MUCH: 'Cuánto/Nivel',
        CMD_BEAT_MOVE: 'Movimiento de Ritmo',
        CMD_FAILURE_MOVE: 'Movimiento de Fallo',
        CMD_FOCUS_ACTION: 'Foco de Acción',
        CMD_FOCUS_DETAIL: 'Foco de Detalle',
        CMD_FOCUS_THEME: 'Foco de Tema',
        CMD_FOCUS_DOUBLE: 'Foco Doble (Acción + Detalle)',
        // Oráculo (Cómo de) — OPSE v1.6: 1=1, 2=2, 3-4=3, 5=5, 6=6
        SCALES: [
            'Sorprendentemente escaso',
            'Menos de lo esperado',
            'Aproximadamente la media',
            'Aproximadamente la media',
            'Más de lo esperado',
            'Extraordinario'
        ]
    },
    DASHBOARD: {
        TITLE: 'Dashboard de OPSE',
        GENERATORS: 'Generadores',
        SESSION: 'Sesión',
        HISTORY: 'Historial de OPSE',
        HELP: 'Ayuda',
        RANK: 'Rango Escena',
        THREADS: 'Hilos / Objetivos',
        NEW_THREAD: 'Nuevo hilo...',
        NO_HISTORY: 'Sin historial aún.',
        BARAJAR: 'Barajar',
        EXPORTAR: 'Exportar Log',
        SHUFFLE_SUCCESS: 'Baraja barajada.',
        EXPLORATION: 'Exploración',
        DUNGEON_BTN: 'Mazmorra',
        HEX_BTN: 'Región Hex',
        EXPLORE_BTN: 'Explorar sala',
        FILTER_ALL: 'Todos',
        FILTER_LABEL: 'Filtrar:',
        DECK_INFO: 'Baraja:',
        TAB_DUNGEON: 'Mazmorra',
        TAB_HEX: 'Hexágonos',
        TAB_SCENE: 'Escena',
        TAB_ORACLE: 'Oráculo',
        TAB_GENERATORS: 'Generar',
        TAB_EXPLORE: 'Explorar',
        TAB_SESSION: 'Sesión',
        GM_MOVES: 'Movimientos DJ'
    },
    METADATA: {
        ANSWER: 'Respuesta',
        MOD: 'Mod',
        DICE: '',
        LIKELIHOOD: 'Probabilidad',
        COMPLICATION: 'Complicación',
        ALTERED: 'Alterado',
        NORMAL: 'Normal',
        RESULT: 'Resultado',
        DOMAIN: 'Dominio',
        NOTE: 'Nota',
        RAW: 'Crudo'
    },
    COMMON: {
        COPY: 'Copiar',
        INSERT: 'Insertar',
        REROLL: 'Relanzar',
        PIN: 'Fijar',
        UNPIN: 'Desfijar',
        COPIED: 'Copiado al portapapeles',
        JOKER_NOTICE: '¡COMODÍN! Se dispara un Evento Aleatorio automáticamente.',
        NO_ACTIVE_ADVENTURE: 'No hay aventura activa. Crea una primero.',
        DUNGEON_CREATED: 'Mazmorra creada y vinculada a la aventura.',
        REGION_CREATED: 'Región creada y vinculada a la aventura.',
        DECK_REMAINING: 'Cartas restantes'
    },
    EXPLORATION: {
        DUNGEON_TITLE: 'Rastreador de Mazmorra',
        HEX_TITLE: 'Exploración Hexagonal',
        APPEARANCE: 'Apariencia / Tema visual',
        FUNCTION: 'Función / Propósito',
        COMMON_TERRAIN: 'Terreno Común',
        UNCOMMON_TERRAIN: 'Terreno Poco Común',
        RARE_TERRAIN: 'Terreno Raro',
        CURRENT_ROOM: 'Sala actual',
        EXPLORE_NEXT: 'Explorar nueva área',
        NO_EXITS: 'No quedan salidas en esta sala.',
        BACKTRACK: 'Volver a: ',
        MOVE: 'Moverse:',
        PATH_MAP: 'Mapa de Ruta:',
        ADD_NOTES: 'Añadir notas...',
        NO_DUNGEON: 'No hay mazmorra activa. Usa el comando para crear una.',
        NO_REGION: 'No hay región activa. Usa el comando para crear una.',
        NO_EXPLORATION: 'Sin exploraciones activas. Usa el panel de control para iniciar una.'
    },
    // OPSE Tables — OPSE v1.6
    TABLES: {
        // Complicación de Escena (d6)
        COMPLICATIONS: [
            'Fuerzas hostiles se oponen a ti',
            'Un obstáculo bloquea tu camino',
            'No sería una mierda si…',
            'Un PNJ actúa repentinamente',
            'No todo es lo que parece',
            'Las cosas van como se planearon'
        ],
        // Escena Alterada (d6)
        ALTERED: {
            '1': 'Un detalle importante de la escena se mejora o empeora de alguna manera',
            '2': 'El entorno es diferente',
            '3': 'Hay presentes PNJs inesperados',
            '4': 'Añade una **Complicación de Escena**',
            '5': 'Añade un **Movimiento de Ritmo**',
            '6': 'Añade un **Evento Aleatorio**'
        },
        // Giro de Trama (extra, no en OPSE v1.6 original)
        PLOT_TWIST: [
            'Un aliado resulta ser un traidor',
            'El objetivo no es lo que parecía',
            'Aparece un tercer bando inesperado',
            'El tiempo se agota más rápido de lo previsto',
            'Una victoria se convierte en una complicación',
            'Un enemigo ofrece una tregua'
        ],
        // Ambiente (extra)
        FLAVOR: {
            ATMOSPHERE: ['Tenso', 'Melancólico', 'Opresivo', 'Esperanzador', 'Misterioso', 'Caótico'],
            WEATHER: ['Lluvia torrencial', 'Niebla densa', 'Sol abrasador', 'Viento helado', 'Tormenta eléctrica', 'Despejado']
        },
        // Enfoque de Acción (naipes 2–A) — OPSE v1.6
        ACTIONS: {
            '2': 'Buscar',
            '3': 'Oponerse',
            '4': 'Comunicar',
            '5': 'Mover',
            '6': 'Dañar',
            '7': 'Crear',
            '8': 'Revelar',
            '9': 'Mandar',
            '10': 'Tomar',
            'J': 'Proteger',
            'Q': 'Ayudar',
            'K': 'Transformar',
            'A': 'Engañar'
        },
        // Enfoque de Detalle (naipes 2–A) — OPSE v1.6
        DETAILS: {
            '2': 'Pequeño',
            '3': 'Grande',
            '4': 'Viejo',
            '5': 'Nuevo',
            '6': 'Mundano',
            '7': 'Simple',
            '8': 'Complejo',
            '9': 'Insulso',
            '10': 'Especial',
            'J': 'Inesperado',
            'Q': 'Exótico',
            'K': 'Digno',
            'A': 'Único'
        },
        // Enfoque de Tema (naipes 2–A) — OPSE v1.6
        THEMES: {
            '2': 'Necesidad Ya',
            '3': 'Aliados',
            '4': 'Comunidad',
            '5': 'Historia',
            '6': 'Planes Futuros',
            '7': 'Enemigos',
            '8': 'Conocimiento',
            '9': 'Rumores',
            '10': 'Arco Argumental',
            'J': 'Eventos Recientes',
            'Q': 'Equipo',
            'K': 'Facción',
            'A': 'Los PJs'
        },
        // Palo de la Baraja — OPSE v1.6: ♣=Físico, ♦=Técnico, ♠=Místico, ♥=Social
        DOMAINS: {
            'Clubs': 'Físico (apariencia, existencia)',
            'Diamonds': 'Técnico (mental, funcionamiento)',
            'Spades': 'Místico (significado, capacidad)',
            'Hearts': 'Social (personal, conexión)'
        },
        // Movimientos de Ritmo (d6) — OPSE v1.6
        GM_MOVES_BEAT: [
            'Presagia un problema',
            'Revela un nuevo detalle',
            'Un PNJ entra en acción',
            'Avanza un hilo',
            'Avanza una trama',
            'Añade un Evento Aleatorio a la escena'
        ],
        // Movimientos de Fallo (d6) — OPSE v1.6
        GM_MOVES_FAILURE: [
            'Causa daño',
            'Pon a alguien en un aprieto',
            'Ofrece una opción',
            'Avanza un hilo',
            'Revela una verdad incómoda',
            'Presagia un problema'
        ],
        // Generador PNJ — Identidad (naipes 2–A) — OPSE v1.6
        NPC_IDENTITY: {
            '2': 'Forajido',
            '3': 'Vagabundo',
            '4': 'Comerciante',
            '5': 'Plebeyo',
            '6': 'Soldado',
            '7': 'Mercante',
            '8': 'Especialista',
            '9': 'Animador',
            '10': 'Adherido',
            'J': 'Liderazgo',
            'Q': 'Místico',
            'K': 'Aventurero',
            'A': 'Caballero'
        },
        // Generador PNJ — Objetivo (naipes 2–A) — OPSE v1.6
        NPC_OBJECTIVE: {
            '2': 'Obtener',
            '3': 'Aprender',
            '4': 'Dañar',
            '5': 'Restaurar',
            '6': 'Encontrar',
            '7': 'Viajar',
            '8': 'Proteger',
            '9': 'Enriquecerse',
            '10': 'Vengarse',
            'J': 'Deber',
            'Q': 'Escapar',
            'K': 'Crear',
            'A': 'Servir'
        },
        // Generador de Gancho Argumental
        HOOKS: {
            TITLE: 'Gancho Argumental',
            GOAL_LABEL: 'Objetivo',
            ADVERSARY_LABEL: 'Adversarios',
            REWARD_LABEL: 'Recompensas',
            GOAL: [
                'Elimina una amenaza',
                'Aprende la verdad',
                'Recupera algo de valor',
                'Escolta o entrega por seguridad',
                'Restaura algo roto',
                'Salva a un aliado en peligro'
            ],
            ADVERSARY: [
                'Una poderosa organización',
                'Forajidos',
                'Guardianes',
                'Población local',
                'Hordas o fuerzas enemigas',
                'Un nuevo o recurrente villano'
            ],
            REWARD: [
                'Dinero o bienes',
                'Dinero o bienes',
                'Conocimientos o Secretos',
                'Ayuda a un aliado',
                'Avanza en un arco argumental',
                'Un objeto único de poder'
            ]
        },
        // Rastreador de Mazmorra — Localización (d6) — OPSE v1.6
        DUNGEON_LOCATIONS: [
            'Área típica',
            'Área de transición',
            'Sala de estar o lugar de reunión',
            'Área de trabajo o útiles',
            'Área con un rasgo especial',
            'Localización para un propósito especial'
        ],
        // Rastreador de Mazmorra — Encuentro (d6) — OPSE v1.6 (1-2: nada, 3-4: enemigos, 5: obstáculo, 6: adversario)
        DUNGEON_ENCOUNTERS: [
            'Nada',
            'Nada',
            'Enemigos hostiles',
            'Enemigos hostiles',
            'Un obstáculo bloquea el camino',
            'Adversario o PNJ único'
        ],
        // Rastreador de Mazmorra — Objeto (d6) — OPSE v1.6 (1-2: nada, 3: pista, 4: herramienta, 5: valioso, 6: especial)
        DUNGEON_OBJECTS: [
            'Nada, o objetos comunes',
            'Nada, o objetos comunes',
            'Una interesante pista u objeto',
            'Dispositivo, llave, o herramienta útil',
            'Algo valioso',
            'Objeto especial o extraño'
        ],
        // Rastreador de Hexágono — Contenidos (d6) — OPSE v1.6 (1-5: nada, 6: rasgo)
        HEX_CONTENTS: [
            'Nada notable',
            'Nada notable',
            'Nada notable',
            'Nada notable',
            'Nada notable',
            'RASGO'
        ],
        // Rastreador de Hexágono — Rasgos (d6) — OPSE v1.6
        HEX_TRAITS: [
            'Estructura notable',
            'Riesgo peligroso',
            'Asentamiento',
            'Rasgo natural extraño',
            'Nueva región',
            'Entra a un Rastreador de Mazmorra'
        ]
    }
};
