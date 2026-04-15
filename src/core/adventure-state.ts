import { HistoryEntry, AdventureState } from "../types";
import { DungeonState } from "./dungeon";
import { RegionState } from "./hex";

export interface OPSESettings {
    adventures: Record<string, AdventureState>; // Keyed by file path
    activeAdventureId: string | null;
    randomMode: 'dice' | 'cards' | 'persistent_deck';
    autoInsert: boolean;
    language: 'en' | 'es';
    history: HistoryEntry[];
    dungeons: Record<string, DungeonState>;
    regions: Record<string, RegionState>;
}

export const DEFAULT_SETTINGS: OPSESettings = {
    adventures: {},
    activeAdventureId: null,
    randomMode: 'dice',
    autoInsert: true,
    language: 'es',
    history: [],
    dungeons: {},
    regions: {}
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
            // Migration for older adventures
            if (adventure.sceneRank === undefined) adventure.sceneRank = 1;
            if (!adventure.threads) adventure.threads = [];
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

    getActiveAdventure(): AdventureState | null {
        if (!this.settings.activeAdventureId) return null;
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
        if (adventure && adventure.threads[index]) {
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
}
