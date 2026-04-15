/**
 * English translations and tables
 */
export const en = {
    // UI Strings
    SETTINGS: {
        TITLE: "OPSE Oracle Settings",
        RANDOM_MODE: "Randomization Mode",
        RANDOM_MODE_DESC: "Choose between dice (d6) or a virtual card deck (as in OPSE v1.6).",
        DICE: "Dice (d6)",
        CARDS: "Cards (Standard Deck)",
        PERSISTENT_DECK: "Persistent Deck (runs out)",
        AUTO_INSERT: "Auto-insert",
        AUTO_INSERT_DESC: "If enabled, results will be automatically inserted into the active note.",
        LANGUAGE: "Language",
        LANGUAGE_DESC: "Select the plugin language.",
        OPEN_CONTROL: "Open control panel",
        OPEN_HISTORY: "Open history",
        OPEN_EXPLORATION: "Open exploration tracker"
    },
    ADVENTURE: {
        NEW: "Start New Adventure",
        TITLE: "Title",
        SYSTEM: "RPG System",
        GENRE: "Genre / Tone",
        PROTAGONISTS: "Protagonists",
        PROMPT: "Starting Premise",
        START: "Start",
        NOTE_HEADER: "## Premise",
        SCENE_HEADER: "## Scene Log",
        NPC: "Generate NPC",
        HOOK: "Generate Plot Hook",
        DOUBLE_FOCUS: "Double Focus",
        PLOT_TWIST: "Plot Twist",
        FLAVOR: "Atmosphere / Weather",
        GENERIC: "Generic Content",
        NPC_FIELDS: {
            IDENTITY: "Identity",
            GOAL: "Goal",
            TRAIT: "Notable Trait",
            ATTITUDE: "Attitude",
            TOPIC: "Conversation Topic"
        }
    },
    HELP: {
        TITLE: "Procedures & Help",
        SCENE_STEREOTYPE: "1. Imagine the scene stereotype.",
        SCENE_ALTERED: "2. Check if the scene is Altered (1d6 <= current Scene).",
        EVENT_TRIGGER: "3. Roll a Random Event if a check fails or you are stuck.",
        GM_MOVES: "4. Use GM Moves to advance threats or complicate things."
    },
    EXPORT: {
        BUTTON: "Export Session",
        SUCCESS: "Session exported to: ",
        ERROR: "Error exporting session."
    },
    SCENE: {
        NEW: "Prepare New Scene",
        OBJECTIVE: "Scene Objective",
        OBJECTIVE_DESC: "What are the characters trying to achieve?",
        LOCATION: "Location",
        GENERATE: "Generate Scene",
        ALTERED_NOTICE: "ALTERED SCENE!",
        ALTERED_ONLY: "Altered Scene",
        CHECK_ALTERATION: "Check Alteration",
        NOT_ALTERED: "Normal Scene",
        COMPLICATION: "Scene Complication",
        COMPLICATION_BTN: "Scene Complication"
    },
    ORACLE: {
        TITLE: "Oracles",
        FOCUS_TITLE: "Oracle (FOCUS)",
        ACTION: "Action",
        DETAIL: "Detail",
        YES: "Yes",
        NO: "No",
        BUT: "but...",
        AND: "and...",
        YESNO_TITLE: "Ask Oracle (Yes/No)",
        QUESTION: "Question",
        QUESTION_DESC: "What do you want to know?",
        LIKELIHOOD: "Likelihood",
        PROBABLE: "Probable (3+)",
        EVEN: "Even (4+)",
        IMPROBABLE: "Improbable (5+)",
        ASK: "Ask",
        HOW_MUCH: "How Much? / What level?",
        SCALES: ["Scarce", "Low", "Normal", "Notable", "Extraordinary", "Extreme"]
    },
    DASHBOARD: {
        TITLE: "OPSE Dashboard",
        GENERATORS: "Generators",
        SESSION: "Session",
        HISTORY: "OPSE History Log",
        HELP: "Help",
        RANK: "Scene Rank",
        THREADS: "Threads / Goals",
        NEW_THREAD: "New thread...",
        NO_HISTORY: "No history yet.",
        BARAJAR: "Shuffle",
        EXPORTAR: "Export Log",
        SHUFFLE_SUCCESS: "Deck shuffled."
    },
    METADATA: {
        ANSWER: "Answer",
        MOD: "Mod",
        DICE: "",
        LIKELIHOOD: "Likelihood",
        COMPLICATION: "Complication",
        ALTERED: "Altered",
        NORMAL: "Normal",
        RESULT: "Result",
        DOMAIN: "Domain",
        NOTE: "Note",
        RAW: "Raw"
    },
    COMMON: {
        COPY: "Copy",
        INSERT: "Insert",
        REROLL: "Re-roll",
        PIN: "Pin",
        UNPIN: "Unpin",
        COPIED: "Copied to clipboard",
        JOKER_NOTICE: "JOKER! A Random Event is automatically triggered."
    },
    // OPSE Tables
    TABLES: {
        COMPLICATIONS: [
            "Hostile forces (an enemy or group opposes you)",
            "Obstacle (something blocks physical path or progress)",
            "Wouldn't it suck if... (ironic or unforeseen complication)",
            "NPC acts (a character takes the initiative)",
            "Not everything is as it seems (hidden revelation)",
            "As planned (no immediate setbacks)"
        ],
        ALTERED: {
            "1": "An important detail of the scene is improved or worsened in some way",
            "2": "The environment is different",
            "3": "Unexpected NPCs are present",
            "4": "Add a **Scene Complication**",
            "5": "Add a Beat Move",
            "6": "Add a Random Event"
        },
        ACTIONS: {
            "2": "Seek", "3": "Oppose", "4": "Communicate", "5": "Move", "6": "Harm",
            "7": "Create", "8": "Reveal", "9": "Command", "10": "Take",
            "J": "Protect", "Q": "Assist", "K": "Transform", "A": "Deceive"
        },
        DETAILS: {
            "2": "Small", "3": "Large", "4": "Ancient", "5": "Recent", "6": "Valuable",
            "7": "Worthless", "8": "Dangerous", "9": "Unsavory", "10": "Important",
            "J": "Simple", "Q": "Complex", "K": "Magical", "A": "Mundane"
        },
        THEMES: {
            "2": "Peace", "3": "Conflict", "4": "Power", "5": "Time", "6": "Fear",
            "7": "Death", "8": "Life", "9": "Money", "10": "Knowledge",
            "J": "Love", "Q": "War", "K": "Fate", "A": "Chaos"
        },
        DOMAINS: {
            "Hearts": "Mystic (Feelings, magic, health, spiritual)",
            "Clubs": "Technical (Tools, mind, plans, science)",
            "Diamonds": "Social (People, relationships, trade, law)",
            "Spades": "Physical (Combat, environment, objects, strength)"
        },
        GM_MOVES_BEAT: [
            "Foreshadow trouble", "Offer an opportunity", "Reveal a new detail",
            "Advance a threat", "Put someone in a spot", "Announce an imminent danger"
        ],
        GM_MOVES_FAILURE: [
            "Cause harm", "Spend resources", "Separate them",
            "Turn their move against them", "Show the downsides of their class/gear",
            "Make a threat move"
        ],
        PLOT_TWIST: [
            "An ally turns out to be a traitor",
            "The goal is not what it seemed",
            "A third party unexpectedly appears",
            "Time is running out faster than expected",
            "A victory turns into a complication",
            "An enemy offers a truce"
        ],
        FLAVOR: {
            ATMOSPHERE: ["Tense", "Melancholic", "Oppressive", "Hopeful", "Mysterious", "Chaotic"],
            WEATHER: ["Heavy rain", "Thick fog", "Scorching sun", "Freezing wind", "Thunderstorm", "Clear skies"]
        },
        HOOKS: {
            TITLE: "Plot Hook",
            GOAL_LABEL: "Goal",
            ADVERSARY_LABEL: "Adversaries",
            REWARD_LABEL: "Rewards",
            GOAL: ["Eliminate a threat", "Learn the truth", "Recover something of value", "Escort or delivery for safety", "Restore something broken", "Save a clear ally in danger"],
            ADVERSARY: ["A powerful organization", "Outlaws", "Guardians", "Local population", "Hordes or enemy forces", "A new or recurring villain"],
            REWARD: ["Money or goods", "Money or goods", "Knowledge or Secrets", "Help an ally", "Advance a plot arc", "A unique object of power"]
        }
    }
};
