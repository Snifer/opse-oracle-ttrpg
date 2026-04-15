/**
 * OPSE Oracle for Obsidian - Typed definitions
 */

export type Likelihood = 'probable' | 'even' | 'improbable';

export interface OracleResult {
    id: string;
    question?: string;
    answer: string;
    modifier?: string; // e.g., "but...", "and..."
    raw: string; // Original roll result, e.g., "2d6=7"
    timestamp: number;
    type: 'yesno' | 'howmuch' | 'focus' | 'event' | 'scene' | 'move' | 'dungeon' | 'hex' | 'hook' | 'npc';
    domain?: string;
    interpretation?: string;
    pinned?: boolean;
}

export interface FocusResult extends OracleResult {
    focusType: 'action' | 'detail' | 'theme';
    domain?: string; // Suit name
    symbol?: string; // Card or symbol
    rank?: string;
}

export type SceneComplication = d6Result;

export type d6Result = 1 | 2 | 3 | 4 | 5 | 6;

export interface SceneResult {
    location?: string;
    objective?: string;
    complication?: string;
    isAltered: boolean;
    alteredResult?: string;
    rawComplication: number;
    rawAltered: number;
    timestamp: number;
}

export interface PlotHook {
    goal: string;
    adversary: string;
    reward: string;
    raw: string; // e.g., "3,5,2"
}

export interface NPC {
    identity: string;
    goal: string;
    trait: string;
    attitude: string;
    topic: string;
    raw: string;
}

export interface Card {
    rank: string;
    suit: Suit;
    value: number; // 1-13
}

export enum Suit {
    Hearts = 'Hearts',
    Diamonds = 'Diamonds',
    Clubs = 'Clubs',
    Spades = 'Spades',
    Joker = 'Joker'
}

export interface AdventureState {
    id: string;
    title: string;
    system: string;
    genre: string;
    activeNotePath: string;
    timestamp: number;
    dungeonId?: string;
    regionId?: string;
    sceneRank: number;
    threads: string[];
}

export type HistoryEntry = OracleResult;
