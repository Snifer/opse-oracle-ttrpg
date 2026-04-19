import { Random } from './random';
import { OPSE } from './opse';

/**
 * Dungeon exploration logic for OPSE v1.6
 */

export interface DungeonRoom {
    id: string;
    name: string;
    location: string;
    encounter: string;
    object: string;
    exits: number;
    connectedTo: string[];
    notes: string;
}

export interface DungeonState {
    id: string;
    name: string;
    themeAppearance: string;
    themeFunction: string;
    rooms: Record<string, DungeonRoom>;
    currentRoomId: string | null;
    path: string[];
}

export class DungeonManager {
    // OPSE v1.6: exits — 1-2: 0 (dead end), 3-4: 1, 5-6: 2
    private static rollExits(): number {
        const roll = Random.d(6);
        if (roll <= 2) {return 0;}
        if (roll <= 4) {return 1;}
        return 2;
    }

    static generateRoom(dungeon: DungeonState, name: string, fixedExits?: number): DungeonRoom {
        const id = crypto.randomUUID();
        const locRoll = Random.d(6);
        const encRoll = Random.d(6);
        const objRoll = Random.d(6);

        const room: DungeonRoom = {
            id,
            name,
            location: OPSE.getDungeonLocation(locRoll - 1),
            encounter: OPSE.getDungeonEncounter(encRoll - 1),
            object: OPSE.getDungeonObject(objRoll - 1),
            exits: fixedExits !== undefined ? fixedExits : DungeonManager.rollExits(),
            connectedTo: [],
            notes: ''
        };

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

        // First room always has 3 exits per OPSE v1.6
        const firstRoom = this.generateRoom(dungeon, 'Entrada', 3);
        dungeon.currentRoomId = firstRoom.id;

        return dungeon;
    }

    static moveToNextRoom(dungeon: DungeonState, name?: string): DungeonRoom | null {
        const currentRoom = dungeon.currentRoomId ? dungeon.rooms[dungeon.currentRoomId] : null;
        if (!currentRoom || currentRoom.exits <= 0) {return null;}

        currentRoom.exits--;

        const roomNumber = Object.keys(dungeon.rooms).length + 1;
        const nextRoom = this.generateRoom(dungeon, name || `Sala ${roomNumber}`);

        currentRoom.connectedTo.push(nextRoom.id);
        nextRoom.connectedTo.push(currentRoom.id);

        dungeon.currentRoomId = nextRoom.id;

        return nextRoom;
    }

    static backtrackToRoom(dungeon: DungeonState, targetId: string): DungeonRoom | null {
        const target = dungeon.rooms[targetId];
        if (!target) {return null;}
        dungeon.currentRoomId = targetId;
        dungeon.path.push(`↩ ${target.name}`);
        return target;
    }

    static addRoomNote(dungeon: DungeonState, roomId: string, note: string): void {
        if (dungeon.rooms[roomId]) {
            dungeon.rooms[roomId].notes = note;
        }
    }
}
