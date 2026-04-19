import { HistoryEntry, AdventureState, Card } from '../types';
import { DungeonState } from './dungeon';
import { RegionState } from './hex';

export interface OPSESettings {
    adventures: Record<string, AdventureState>;
    activeAdventureId: string | null;
    randomMode: 'dice' | 'cards' | 'persistent_deck';
    autoInsert: boolean;
    language: 'en' | 'es';
    history: HistoryEntry[];
    historyMaxEntries: number;
    dungeons: Record<string, DungeonState>;
    regions: Record<string, RegionState>;
    // Deck persistence for persistent_deck mode
    deckCards: Card[] | null;
    deckDiscard: Card[] | null;
    // UI layout
    tabContentHeight: number;
    defaultTab: 'scene' | 'oracle' | 'generators' | 'explore' | 'session';
    compactHistory: boolean;
    accentColor: string;
    historyOrder: 'newest' | 'oldest';
    timestampFormat: 'time' | 'datetime' | 'relative';

    // Insert format
    insertFormat: 'plain' | 'callout' | 'answer-only';
    showRawRolls: boolean;
    showDomain: boolean;

    // Oracle defaults
    defaultLikelihood: 'probable' | 'even' | 'improbable';
    hexEventThreshold: number;

    // Session & data
    exportFormat: 'markdown' | 'json';
    resetDeckOnAdventureChange: boolean;
    autoOpenExploration: boolean;
}

export const DEFAULT_SETTINGS: OPSESettings = {
    adventures: {},
    activeAdventureId: null,
    randomMode: 'dice',
    autoInsert: true,
    language: 'es',
    history: [],
    historyMaxEntries: 100,
    dungeons: {},
    regions: {},
    deckCards: null,
    deckDiscard: null,
    tabContentHeight: 260,
    defaultTab: 'oracle',
    compactHistory: false,
    accentColor: '#8b5cf6',
    historyOrder: 'newest',
    timestampFormat: 'time',
    insertFormat: 'plain',
    showRawRolls: true,
    showDomain: true,
    defaultLikelihood: 'even',
    hexEventThreshold: 5,
    exportFormat: 'markdown',
    resetDeckOnAdventureChange: false,
    autoOpenExploration: true
};

export class AdventureStateManager {
    private settings: OPSESettings;
    private saveCallback: (settings: OPSESettings) => Promise<void>;

    constructor(settings: OPSESettings, saveCallback: (settings: OPSESettings) => Promise<void>) {
        this.settings = settings;
        this.saveCallback = saveCallback;
    }

    async createAdventure(title: string, system: string, genre: string, notePath: string): Promise<AdventureState> {
        const id = crypto.randomUUID();
        const adventure: AdventureState = {
            id,
            title,
            system,
            genre,
            activeNotePath: notePath,
            timestamp: Date.now(),
            sceneRank: 1,
            threads: []
        };

        this.settings.adventures[notePath] = adventure;
        this.settings.activeAdventureId = id;
        await this.saveCallback(this.settings);
        return adventure;
    }

    getAdventure(notePath: string): AdventureState | undefined {
        const adventure = this.settings.adventures[notePath];
        if (adventure) {
            if (adventure.sceneRank === undefined) {adventure.sceneRank = 1;}
            if (!adventure.threads) {adventure.threads = [];}
        }
        return adventure;
    }

    async updateActiveAdventure(notePath: string): Promise<void> {
        const adventure = this.getAdventure(notePath);
        if (adventure) {
            this.settings.activeAdventureId = adventure.id;
            await this.saveCallback(this.settings);
        }
    }

    isNewAdventure(id: string): boolean {
        return this.settings.activeAdventureId !== id;
    }

    getActiveAdventure(): AdventureState | null {
        if (!this.settings.activeAdventureId) {return null;}
        return Object.values(this.settings.adventures).find(a => a.id === this.settings.activeAdventureId) || null;
    }

    async addThread(notePath: string, thread: string): Promise<void> {
        const adventure = this.getAdventure(notePath);
        if (adventure) {
            adventure.threads.push(thread);
            await this.saveCallback(this.settings);
        }
    }

    async removeThread(notePath: string, index: number): Promise<void> {
        const adventure = this.getAdventure(notePath);
        if (adventure && adventure.threads[index] !== undefined) {
            adventure.threads.splice(index, 1);
            await this.saveCallback(this.settings);
        }
    }

    async setSceneRank(notePath: string, rank: number): Promise<void> {
        const adventure = this.getAdventure(notePath);
        if (adventure) {
            adventure.sceneRank = Math.max(1, Math.min(6, rank));
            await this.saveCallback(this.settings);
        }
    }

    async linkDungeon(notePath: string, dungeonId: string): Promise<void> {
        const adventure = this.getAdventure(notePath);
        if (adventure) {
            adventure.dungeonId = dungeonId;
            await this.saveCallback(this.settings);
        }
    }

    async linkRegion(notePath: string, regionId: string): Promise<void> {
        const adventure = this.getAdventure(notePath);
        if (adventure) {
            adventure.regionId = regionId;
            await this.saveCallback(this.settings);
        }
    }
}
