import { Random } from './random';
import { OPSE } from './opse';

/**
 * Hex exploration logic for OPSE v1.6
 */

export interface Hex {
    q: number;
    r: number;
    terrain: string;
    contents: string;
    trait: string | null;
    eventTriggered: boolean;
    notes: string;
}

export interface RegionState {
    id: string;
    name: string;
    commonTerrain: string;
    uncommonTerrain: string;
    rareTerrain: string;
    hexes: Record<string, Hex>;
    currentHex: { q: number, r: number };
    path: string[];
    eventThreshold?: number;
}

export class HexManager {
    static getHexKey(q: number, r: number): string {
        return `${q},${r}`;
    }

    // OPSE v1.6: d6 — 1-2: same as current, 3-4: common, 5: uncommon, 6: rare
    private static rollTerrain(region: RegionState, currentTerrain: string): string {
        const roll = Random.d(6);
        if (roll <= 2) {return currentTerrain;}
        if (roll <= 4) {return region.commonTerrain;}
        if (roll === 5) {return region.uncommonTerrain;}
        return region.rareTerrain;
    }

    // OPSE v1.6: d6 — 1-5: nothing notable, 6: trait
    private static rollContents(): string {
        const roll = Random.d(6);
        return OPSE.getHexContent(roll - 1);
    }

    // OPSE v1.6: d6 — 1-6 trait table
    private static rollTrait(): string {
        const roll = Random.d(6);
        return OPSE.getHexTrait(roll - 1);
    }

    // Event threshold is configurable (default 5+ per OPSE v1.6)
    private static rollEvent(threshold = 5): boolean {
        return Random.d(6) >= threshold;
    }

    static generateHex(region: RegionState, q: number, r: number): Hex {
        const currentKey = HexManager.getHexKey(region.currentHex.q, region.currentHex.r);
        const currentHex = region.hexes[currentKey];
        const currentTerrain = currentHex ? currentHex.terrain : region.commonTerrain;

        const contentsRoll = HexManager.rollContents();
        const hasTrait = contentsRoll === 'RASGO' || contentsRoll === 'TRAIT';

        const hex: Hex = {
            q, r,
            terrain: HexManager.rollTerrain(region, currentTerrain),
            contents: hasTrait ? HexManager.rollTrait() : contentsRoll,
            trait: hasTrait ? HexManager.rollTrait() : null,
            eventTriggered: HexManager.rollEvent(region.eventThreshold ?? 5),
            notes: ''
        };

        region.hexes[HexManager.getHexKey(q, r)] = hex;
        region.path.push(`${hex.terrain} (${q},${r})`);
        return hex;
    }

    static createRegion(name: string, common: string, uncommon: string, rare: string): RegionState {
        const region: RegionState = {
            id: crypto.randomUUID(),
            name,
            commonTerrain: common,
            uncommonTerrain: uncommon,
            rareTerrain: rare,
            hexes: {},
            currentHex: { q: 0, r: 0 },
            path: []
        };

        // Generate starting hex (use common terrain, no event on first hex)
        const startHex: Hex = {
            q: 0, r: 0,
            terrain: common,
            contents: 'Punto de partida',
            trait: null,
            eventTriggered: false,
            notes: ''
        };
        region.hexes[HexManager.getHexKey(0, 0)] = startHex;
        region.path.push(`${common} (0,0)`);

        return region;
    }

    static moveToNeighbor(region: RegionState, direction: 'N' | 'NE' | 'SE' | 'S' | 'SW' | 'NW'): Hex {
        const current = region.currentHex;
        let dq = 0, dr = 0;

        // Axial coordinate offsets for pointy-top hexagons
        switch (direction) {
            case 'N':  dq =  0; dr = -1; break;
            case 'NE': dq =  1; dr = -1; break;
            case 'SE': dq =  1; dr =  0; break;
            case 'S':  dq =  0; dr =  1; break;
            case 'SW': dq = -1; dr =  1; break;
            case 'NW': dq = -1; dr =  0; break;
        }

        const nq = current.q + dq;
        const nr = current.r + dr;
        const key = HexManager.getHexKey(nq, nr);

        let hex = region.hexes[key];
        if (!hex) {
            hex = HexManager.generateHex(region, nq, nr);
        }

        region.currentHex = { q: nq, r: nr };
        return hex;
    }

    static addHexNote(region: RegionState, q: number, r: number, note: string): void {
        const key = HexManager.getHexKey(q, r);
        if (region.hexes[key]) {
            region.hexes[key].notes = note;
        }
    }
}
