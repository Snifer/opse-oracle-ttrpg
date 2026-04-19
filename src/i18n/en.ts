/**
 * English translations and tables
 */
export const en = {
    SETTINGS: {
        TITLE: 'OPSE Oracle Settings',
        RANDOM_MODE: 'Randomization Mode',
        RANDOM_MODE_DESC: 'Choose between dice (d6) or a virtual card deck (as in OPSE v1.6).',
        DICE: 'Dice (d6)',
        CARDS: 'Cards (Standard Deck)',
        PERSISTENT_DECK: 'Persistent Deck (runs out)',
        AUTO_INSERT: 'Auto-insert',
        AUTO_INSERT_DESC: 'If enabled, results will be automatically inserted into the active note.',
        LANGUAGE: 'Language',
        LANGUAGE_DESC: 'Select the plugin language.',
        OPEN_CONTROL: 'Open control panel',
        OPEN_HISTORY: 'Open history',
        OPEN_EXPLORATION: 'Open exploration tracker',
        DATA_MANAGEMENT: 'Data Management',
        HISTORY_LIMIT: 'History limit',
        CLEAR_HISTORY: 'Clear history',
        CLEAR_BTN: 'Clear',
        CLEAR_CONFIRM: 'Clear history? This action cannot be undone.',
        // Interface
        SECTION_INTERFACE: 'Interface',
        DEFAULT_TAB: 'Default tab',
        DEFAULT_TAB_DESC: 'Which tab opens when the control panel loads.',
        COMPACT_HISTORY: 'Compact mode',
        COMPACT_HISTORY_DESC: 'Smaller history cards to display more entries at once.',
        ACCENT_COLOR: 'Accent color',
        ACCENT_COLOR_DESC: 'Main UI color. Default: #8b5cf6 (violet).',
        HISTORY_ORDER: 'History order',
        HISTORY_ORDER_DESC: 'How to sort history entries.',
        NEWEST_FIRST: 'Newest first',
        OLDEST_FIRST: 'Oldest first',
        TIMESTAMP_FORMAT: 'Timestamp format',
        TIMESTAMP_FORMAT_DESC: 'How to display the time on each history entry.',
        TIMESTAMP_TIME: 'Time (HH:MM)',
        TIMESTAMP_DATETIME: 'Date and time',
        TIMESTAMP_RELATIVE: 'Relative ("5 min ago")',
        // Insert format
        SECTION_INSERT: 'Result insertion',
        INSERT_FORMAT: 'Insert format',
        INSERT_FORMAT_DESC: 'How results are inserted into notes.',
        INSERT_PLAIN: 'Plain markdown',
        INSERT_CALLOUT: 'Obsidian callout (> [!oracle])',
        INSERT_ANSWER: 'Answer only (no raw)',
        SHOW_RAW: 'Show raw rolls',
        SHOW_RAW_DESC: 'Include dice/card results (e.g. 1d6=4) in inserted text.',
        SHOW_DOMAIN: 'Show domain/suit',
        SHOW_DOMAIN_DESC: 'Show the suit domain (Physical, Social…) in focus results.',
        // Oracles
        SECTION_ORACLES: 'Oracles',
        DEFAULT_LIKELIHOOD: 'Default likelihood',
        DEFAULT_LIKELIHOOD_DESC: 'Pre-selected likelihood level when opening the Yes/No oracle.',
        HEX_EVENT_THRESHOLD: 'Hex event threshold',
        HEX_EVENT_THRESHOLD_DESC: 'An event triggers when the d6 roll meets or exceeds this value. Default: 5 (OPSE v1.6).',
        // Session
        SECTION_SESSION: 'Session & data',
        EXPORT_FORMAT: 'Export format',
        EXPORT_FORMAT_DESC: 'File format when exporting the session.',
        EXPORT_MD: 'Markdown (.md)',
        EXPORT_JSON: 'JSON (.json)',
        RESET_DECK: 'Reset deck on adventure change',
        RESET_DECK_DESC: 'If enabled, the deck resets whenever a different adventure is activated.',
        AUTO_OPEN_EXPLORATION: 'Auto-open exploration',
        AUTO_OPEN_EXPLORATION_DESC: 'Open the exploration view automatically when creating a dungeon or hex region.',
        // About
        SECTION_ABOUT: 'About',
        ABOUT_VERSION: 'Version',
        ABOUT_AUTHOR: 'Author',
        ABOUT_BASED_ON: 'Based on',
        ABOUT_LICENSE: 'License',
        ABOUT_OPSE_DESC: 'One Page Solo Engine v1.6 by Karl Hendricks',
        ABOUT_RESET_DEFAULTS: 'Reset to defaults',
        ABOUT_RESET_CONFIRM: 'Reset all settings to defaults? History and adventures will not be affected.',
        RESET_BTN: 'Reset'
    },
    ADVENTURE: {
        NEW: 'Start New Adventure',
        TITLE: 'Title',
        SYSTEM: 'RPG System',
        GENRE: 'Genre / Tone',
        PROTAGONISTS: 'Protagonists',
        PROMPT: 'Starting Premise',
        START: 'Start',
        NOTE_HEADER: '## Premise',
        SCENE_HEADER: '## Scene Log',
        NPC: 'Generate NPC',
        HOOK: 'Generate Plot Hook',
        DOUBLE_FOCUS: 'Double Focus',
        PLOT_TWIST: 'Plot Twist',
        FLAVOR: 'Atmosphere / Weather',
        GENERIC: 'Generic Content',
        NPC_FIELDS: {
            IDENTITY: 'Identity',
            GOAL: 'Goal',
            TRAIT: 'Notable Trait',
            ATTITUDE: 'Attitude',
            TOPIC: 'Conversation Topic'
        }
    },
    HELP: {
        TITLE: 'Procedures & Help',
        SCENE_STEREOTYPE: '1. Imagine the scene stereotype.',
        SCENE_ALTERED: '2. Check if the scene is Altered (1d6 <= current Scene Rank).',
        EVENT_TRIGGER: '3. Roll a Random Event if a check fails or you are stuck.',
        GM_MOVES: '4. Use GM Moves to advance threats or complicate things.'
    },
    EXPORT: {
        BUTTON: 'Export Session',
        SUCCESS: 'Session exported to: ',
        ERROR: 'Error exporting session.'
    },
    SCENE: {
        NEW: 'Prepare New Scene',
        OBJECTIVE: 'Scene Objective',
        OBJECTIVE_DESC: 'What are the characters trying to achieve?',
        LOCATION: 'Location',
        GENERATE: 'Generate Scene',
        ALTERED_NOTICE: 'ALTERED SCENE!',
        ALTERED_ONLY: 'Altered Scene',
        CHECK_ALTERATION: 'Check Alteration',
        NOT_ALTERED: 'Normal Scene',
        COMPLICATION: 'Scene Complication',
        COMPLICATION_BTN: 'Scene Complication'
    },
    ORACLE: {
        TITLE: 'Oracles',
        FOCUS_TITLE: 'Oracle (FOCUS)',
        ACTION: 'Action',
        DETAIL: 'Detail',
        YES: 'Yes',
        NO: 'No',
        BUT: 'but...',
        AND: 'and...',
        YESNO_TITLE: 'Ask Oracle (Yes/No)',
        QUESTION: 'Question',
        QUESTION_DESC: 'What do you want to know?',
        LIKELIHOOD: 'Likelihood',
        PROBABLE: 'Probable (3+)',
        EVEN: 'Even (4+)',
        IMPROBABLE: 'Improbable (5+)',
        ASK: 'Ask',
        HOW_MUCH: 'How Much? / What level?',
        THEME: 'Theme',
        CMD_HOW_MUCH: 'How Much / Level',
        CMD_BEAT_MOVE: 'Beat Move',
        CMD_FAILURE_MOVE: 'Failure Move',
        CMD_FOCUS_ACTION: 'Action Focus',
        CMD_FOCUS_DETAIL: 'Detail Focus',
        CMD_FOCUS_THEME: 'Theme Focus',
        CMD_FOCUS_DOUBLE: 'Double Focus (Action + Detail)',
        // Oracle (How much) — OPSE v1.6: 1, 2, 3-4, 5, 6
        SCALES: [
            'Surprisingly scarce',
            'Less than expected',
            'About average',
            'About average',
            'More than expected',
            'Extraordinary'
        ]
    },
    DASHBOARD: {
        TITLE: 'OPSE Dashboard',
        GENERATORS: 'Generators',
        SESSION: 'Session',
        HISTORY: 'OPSE History Log',
        HELP: 'Help',
        RANK: 'Scene Rank',
        THREADS: 'Threads / Goals',
        NEW_THREAD: 'New thread...',
        NO_HISTORY: 'No history yet.',
        BARAJAR: 'Shuffle',
        EXPORTAR: 'Export Log',
        SHUFFLE_SUCCESS: 'Deck shuffled.',
        EXPLORATION: 'Exploration',
        DUNGEON_BTN: 'Dungeon',
        HEX_BTN: 'Hex Region',
        EXPLORE_BTN: 'Explore room',
        FILTER_ALL: 'All',
        FILTER_LABEL: 'Filter:',
        DECK_INFO: 'Deck:',
        TAB_DUNGEON: 'Dungeon',
        TAB_HEX: 'Hexagons',
        TAB_SCENE: 'Scene',
        TAB_ORACLE: 'Oracle',
        TAB_GENERATORS: 'Generate',
        TAB_EXPLORE: 'Explore',
        TAB_SESSION: 'Session',
        GM_MOVES: 'GM Moves'
    },
    METADATA: {
        ANSWER: 'Answer',
        MOD: 'Mod',
        DICE: '',
        LIKELIHOOD: 'Likelihood',
        COMPLICATION: 'Complication',
        ALTERED: 'Altered',
        NORMAL: 'Normal',
        RESULT: 'Result',
        DOMAIN: 'Domain',
        NOTE: 'Note',
        RAW: 'Raw'
    },
    COMMON: {
        COPY: 'Copy',
        INSERT: 'Insert',
        REROLL: 'Re-roll',
        PIN: 'Pin',
        UNPIN: 'Unpin',
        COPIED: 'Copied to clipboard',
        JOKER_NOTICE: 'JOKER! A Random Event is automatically triggered.',
        NO_ACTIVE_ADVENTURE: 'No active adventure. Create one first.',
        DUNGEON_CREATED: 'Dungeon created and linked to the adventure.',
        REGION_CREATED: 'Region created and linked to the adventure.',
        DECK_REMAINING: 'Cards remaining'
    },
    EXPLORATION: {
        DUNGEON_TITLE: 'Dungeon Tracker',
        HEX_TITLE: 'Hex Exploration',
        APPEARANCE: 'Appearance / Visual Theme',
        FUNCTION: 'Function / Purpose',
        COMMON_TERRAIN: 'Common Terrain',
        UNCOMMON_TERRAIN: 'Uncommon Terrain',
        RARE_TERRAIN: 'Rare Terrain',
        CURRENT_ROOM: 'Current room',
        EXPLORE_NEXT: 'Explore new area',
        NO_EXITS: 'No exits remaining in this room.',
        BACKTRACK: 'Return to: ',
        MOVE: 'Move:',
        PATH_MAP: 'Route Map:',
        ADD_NOTES: 'Add notes...',
        NO_DUNGEON: 'No active dungeon. Use the command to create one.',
        NO_REGION: 'No active region. Use the command to create one.',
        NO_EXPLORATION: 'No active explorations. Use the control panel to start one.'
    },
    // OPSE Tables — OPSE v1.6
    TABLES: {
        // Scene Complication (d6)
        COMPLICATIONS: [
            'Hostile forces oppose you',
            'An obstacle blocks your path',
            "Wouldn't it suck if…",
            'An NPC acts suddenly',
            'Not everything is as it seems',
            'Things go as planned'
        ],
        // Altered Scene (d6)
        ALTERED: {
            '1': 'An important detail of the scene is improved or worsened in some way',
            '2': 'The environment is different',
            '3': 'Unexpected NPCs are present',
            '4': 'Add a **Scene Complication**',
            '5': 'Add a **Beat Move**',
            '6': 'Add a **Random Event**'
        },
        // Plot Twist (extra, not in OPSE v1.6 core)
        PLOT_TWIST: [
            'An ally turns out to be a traitor',
            'The goal is not what it seemed',
            'A third party unexpectedly appears',
            'Time is running out faster than expected',
            'A victory turns into a complication',
            'An enemy offers a truce'
        ],
        // Flavor (extra)
        FLAVOR: {
            ATMOSPHERE: ['Tense', 'Melancholic', 'Oppressive', 'Hopeful', 'Mysterious', 'Chaotic'],
            WEATHER: ['Heavy rain', 'Thick fog', 'Scorching sun', 'Freezing wind', 'Thunderstorm', 'Clear skies']
        },
        // Action Focus (cards 2–A) — OPSE v1.6
        ACTIONS: {
            '2': 'Seek',
            '3': 'Oppose',
            '4': 'Communicate',
            '5': 'Move',
            '6': 'Harm',
            '7': 'Create',
            '8': 'Reveal',
            '9': 'Command',
            '10': 'Take',
            'J': 'Protect',
            'Q': 'Help',
            'K': 'Transform',
            'A': 'Deceive'
        },
        // Detail Focus (cards 2–A) — OPSE v1.6
        DETAILS: {
            '2': 'Small',
            '3': 'Large',
            '4': 'Old',
            '5': 'New',
            '6': 'Mundane',
            '7': 'Simple',
            '8': 'Complex',
            '9': 'Bland',
            '10': 'Special',
            'J': 'Unexpected',
            'Q': 'Exotic',
            'K': 'Worthy',
            'A': 'Unique'
        },
        // Theme Focus (cards 2–A) — OPSE v1.6
        THEMES: {
            '2': 'Immediate Need',
            '3': 'Allies',
            '4': 'Community',
            '5': 'History',
            '6': 'Future Plans',
            '7': 'Enemies',
            '8': 'Knowledge',
            '9': 'Rumors',
            '10': 'Plot Arc',
            'J': 'Recent Events',
            'Q': 'Equipment',
            'K': 'Faction',
            'A': 'The PCs'
        },
        // Suit Domain — OPSE v1.6: ♣=Physical, ♦=Technical, ♠=Mystic, ♥=Social
        DOMAINS: {
            'Clubs': 'Physical (appearance, existence)',
            'Diamonds': 'Technical (mental, function)',
            'Spades': 'Mystic (meaning, capacity)',
            'Hearts': 'Social (personal, connection)'
        },
        // Beat Moves (d6) — OPSE v1.6
        GM_MOVES_BEAT: [
            'Foreshadow a problem',
            'Reveal a new detail',
            'An NPC takes action',
            'Advance a thread',
            'Advance a plot',
            'Add a Random Event to the scene'
        ],
        // Failure Moves (d6) — OPSE v1.6
        GM_MOVES_FAILURE: [
            'Cause harm',
            'Put someone in a spot',
            'Offer a choice',
            'Advance a thread',
            'Reveal an uncomfortable truth',
            'Foreshadow a problem'
        ],
        // NPC Generator — Identity (cards 2–A) — OPSE v1.6
        NPC_IDENTITY: {
            '2': 'Outlaw',
            '3': 'Wanderer',
            '4': 'Merchant',
            '5': 'Commoner',
            '6': 'Soldier',
            '7': 'Trader',
            '8': 'Specialist',
            '9': 'Entertainer',
            '10': 'Retainer',
            'J': 'Leader',
            'Q': 'Mystic',
            'K': 'Adventurer',
            'A': 'Knight'
        },
        // NPC Generator — Objective (cards 2–A) — OPSE v1.6
        NPC_OBJECTIVE: {
            '2': 'Obtain',
            '3': 'Learn',
            '4': 'Harm',
            '5': 'Restore',
            '6': 'Find',
            '7': 'Travel',
            '8': 'Protect',
            '9': 'Enrich',
            '10': 'Avenge',
            'J': 'Duty',
            'Q': 'Escape',
            'K': 'Create',
            'A': 'Serve'
        },
        // Plot Hook Generator
        HOOKS: {
            TITLE: 'Plot Hook',
            GOAL_LABEL: 'Goal',
            ADVERSARY_LABEL: 'Adversaries',
            REWARD_LABEL: 'Rewards',
            GOAL: [
                'Eliminate a threat',
                'Learn the truth',
                'Recover something of value',
                'Escort or deliver for safety',
                'Restore something broken',
                'Save an ally in danger'
            ],
            ADVERSARY: [
                'A powerful organization',
                'Outlaws',
                'Guardians',
                'Local population',
                'Hordes or enemy forces',
                'A new or recurring villain'
            ],
            REWARD: [
                'Money or goods',
                'Money or goods',
                'Knowledge or Secrets',
                'Help an ally',
                'Advance a plot arc',
                'A unique object of power'
            ]
        },
        // Dungeon Tracker — Location (d6) — OPSE v1.6
        DUNGEON_LOCATIONS: [
            'Typical area',
            'Transition area',
            'Common room or meeting place',
            'Work area or utilities',
            'Area with a special feature',
            'Location for a special purpose'
        ],
        // Dungeon Tracker — Encounter (d6) — OPSE v1.6 (1-2: nothing, 3-4: enemies, 5: obstacle, 6: adversary)
        DUNGEON_ENCOUNTERS: [
            'Nothing',
            'Nothing',
            'Hostile enemies',
            'Hostile enemies',
            'An obstacle blocks the path',
            'Unique adversary or NPC'
        ],
        // Dungeon Tracker — Object (d6) — OPSE v1.6 (1-2: nothing, 3: clue, 4: tool, 5: valuable, 6: special)
        DUNGEON_OBJECTS: [
            'Nothing, or common objects',
            'Nothing, or common objects',
            'An interesting clue or object',
            'Device, key, or useful tool',
            'Something valuable',
            'Special or strange object'
        ],
        // Hex Tracker — Contents (d6) — OPSE v1.6 (1-5: nothing, 6: trait)
        HEX_CONTENTS: [
            'Nothing notable',
            'Nothing notable',
            'Nothing notable',
            'Nothing notable',
            'Nothing notable',
            'TRAIT'
        ],
        // Hex Tracker — Traits (d6) — OPSE v1.6
        HEX_TRAITS: [
            'Notable structure',
            'Dangerous hazard',
            'Settlement',
            'Strange natural feature',
            'New region',
            'Enter Dungeon Tracker'
        ]
    }
};
