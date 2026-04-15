import { Random } from "./random";
import { OPSE_TABLES } from "./opse";

/**
 * Dungeon exploration logic for OPSE
 */

export interface DungeonRoom {
    id: string;
    name: string;
    location: string;
    encounter: string;
    object: string;
    exits: number;
    connectedTo: string[]; // IDs of other rooms
    notes: string;
}

export interface DungeonState {
    id: string;
    name: string;
    themeAppearance: string;
    themeFunction: string;
    rooms: Record<string, DungeonRoom>;
    currentRoomId: string | null;
    path: string[]; // List of room names/IDs visited
}

export class DungeonManager {
    static generateRoom(dungeon: DungeonState, name: string, fixedExits?: number): DungeonRoom {
        const id = crypto.randomUUID();
        
        // OPSE Dungeon Tables (Simplified for MVP)
        const locations = ["Pasillo", "Habitación", "Cámara", "Escaleras", "Puente", "Almacén"];
        const encounters = ["Ninguno", "Trampa", "Enemigo débil", "Enemigo fuerte", "PNJ", "Peligro ambiental"];
        const objects = ["Ninguno", "Tesoro", "Herramienta", "Nota/Pista", "Mueble", "Estatua"];
        
        const room: DungeonRoom = {
            id,
            name,
            location: Random.pickOne(locations),
            encounter: Random.pickOne(encounters),
            object: Random.pickOne(objects),
            exits: fixedExits !== undefined ? fixedExits : Random.d(4) - 1, // 0-3 exits
            connectedTo: [],
            notes: ""
        };
        
        if (room.exits < 0) room.exits = 0;
        
        dungeon.rooms[id] = room;
        dungeon.path.push(room.name || room.location);
        return room;
    }

    static createDungeon(name: string, appearance: string, func: string): DungeonState {
        const dungeon: DungeonState = {
            id: crypto.randomUUID(),
            name,
            themeAppearance: appearance,
            themeFunction: func,
            rooms: {},
            currentRoomId: null,
            path: []
        };
        
        // Generate first room (3 exits per OPSE)
        const firstRoom = this.generateRoom(dungeon, "Entrada", 3);
        dungeon.currentRoomId = firstRoom.id;
        
        return dungeon;
    }

    static moveToNextRoom(dungeon: DungeonState, name?: string): DungeonRoom | null {
        const currentRoom = dungeon.currentRoomId ? dungeon.rooms[dungeon.currentRoomId] : null;
        if (!currentRoom || currentRoom.exits <= 0) return null;

        // Decrement exits in current room
        currentRoom.exits--;

        // Generate new room
        const nextRoom = this.generateRoom(dungeon, name || `Sala ${dungeon.path.length + 1}`);
        
        // Connect them (bidirectional for backtracking support later)
        currentRoom.connectedTo.push(nextRoom.id);
        nextRoom.connectedTo.push(currentRoom.id);
        
        dungeon.currentRoomId = nextRoom.id;
        
        return nextRoom;
    }

    static addRoomNote(dungeon: DungeonState, roomId: string, note: string) {
        if (dungeon.rooms[roomId]) {
            dungeon.rooms[roomId].notes = note;
        }
    }
}
