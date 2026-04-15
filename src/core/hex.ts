import { Random } from "./random";

/**
 * Hex exploration logic for OPSE
 */

export interface Hex {
    q: number;
    r: number;
    terrain: string;
    contents: string;
    trait: string;
    eventTriggered: boolean;
    notes: string;
}

export interface RegionState {
    id: string;
    name: string;
    commonTerrain: string;
    uncommonTerrain: string;
    rareTerrain: string;
    hexes: Record<string, Hex>; // Keyed by "q,r"
    currentHex: { q: number, r: number };
    path: string[]; // List of hex terrain/coordinates visited
}

export class HexManager {
    static getHexKey(q: number, r: number): string {
        return `${q},${r}`;
    }

    static generateHex(region: RegionState, q: number, r: number): Hex {
        const roll = Random.d(12);
        let terrain = region.commonTerrain;
        if (roll === 10 || roll === 11) terrain = region.uncommonTerrain;
        if (roll === 12) terrain = region.rareTerrain;
        
        const contentsList = ["Ruinas", "Asentamiento", "Guarida", "Recurso", "Punto de interés", "Nada notable"];
        const traits = ["Encantado", "Peligroso", "Sagrado", "Bello", "En ruinas", "Oculto"];
        
        const hex: Hex = {
            q, r,
            terrain,
            contents: Random.pickOne(contentsList),
            trait: Random.pickOne(traits),
            eventTriggered: Random.d(6) >= 5, // Event on 5+
            notes: ""
        };
        
        region.hexes[this.getHexKey(q, r)] = hex;
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
        
        // Generate starting hex
        this.generateHex(region, 0, 0);
        
        return region;
    }

    static moveToNeighbor(region: RegionState, direction: 'N' | 'NE' | 'SE' | 'S' | 'SW' | 'NW'): Hex {
        const current = region.currentHex;
        let dq = 0, dr = 0;

        switch (direction) {
            case 'N': dq = 0; dr = -1; break;
            case 'NE': dq = 1; dr = -1; break;
            case 'SE': dq = 1; dr = 0; break;
            case 'S': dq = 0; dr = 1; break;
            case 'SW': dq = -1; dr = 1; break;
            case 'NW': dq = -1; dr = 0; break;
        }

        const nq = current.q + dq;
        const nr = current.r + dr;
        
        const key = this.getHexKey(nq, nr);
        let hex = region.hexes[key];
        
        if (!hex) {
            hex = this.generateHex(region, nq, nr);
        }

        region.currentHex = { q: nq, r: nr };
        return hex;
    }

    static addHexNote(region: RegionState, q: number, r: number, note: string) {
        const key = this.getHexKey(q, r);
        if (region.hexes[key]) {
            region.hexes[key].notes = note;
        }
    }
}
