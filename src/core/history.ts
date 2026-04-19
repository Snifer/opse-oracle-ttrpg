import { HistoryEntry } from '../types';

/**
 * Management of history entries
 */

export class HistoryManager {
    private history: HistoryEntry[] = [];
    private maxEntries = 100;
    private saveCallback: (history: HistoryEntry[]) => Promise<void>;

    constructor(history: HistoryEntry[], maxEntries: number, saveCallback: (history: HistoryEntry[]) => Promise<void>) {
        this.history = history;
        this.maxEntries = maxEntries;
        this.saveCallback = saveCallback;
    }

    async addEntry(entry: HistoryEntry): Promise<void> {
        this.history.unshift(entry);
        this.cleanup();
        await this.saveCallback(this.history);
    }

    private cleanup() {
        if (this.history.length <= this.maxEntries) {return;}

        // Keep all pinned entries, and only as many unpinned as fit the limit
        const pinned = this.history.filter(e => e.pinned);
        const unpinned = this.history.filter(e => !e.pinned);
        
        const remainingUnpinnedCount = Math.max(0, this.maxEntries - pinned.length);
        const trimmedUnpinned = unpinned.slice(0, remainingUnpinnedCount);
        
        this.history = [...pinned, ...trimmedUnpinned].sort((a, b) => b.timestamp - a.timestamp);
    }

    getHistory(): HistoryEntry[] {
        return this.history;
    }

    async clearHistory(): Promise<void> {
        // Only clear unpinned entries
        this.history = this.history.filter(e => e.pinned);
        await this.saveCallback(this.history);
    }

    async setMaxEntries(max: number): Promise<void> {
        this.maxEntries = max;
        this.cleanup();
        await this.saveCallback(this.history);
    }
}
