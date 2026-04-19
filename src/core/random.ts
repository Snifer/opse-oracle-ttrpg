import { Suit } from '../types';
import { Deck } from './deck';

/**
 * Randomization utilities for OPSE
 */

export class Random {
    static d(sides: number): number {
        return Math.floor(Math.random() * sides) + 1;
    }

    static roll2d6(): { total: number, d1: number, d2: number } {
        const d1 = this.d(6);
        const d2 = this.d(6);
        return { total: d1 + d2, d1, d2 };
    }

    static drawFocus(mode: 'dice' | 'cards' | 'persistent_deck', deck: Deck): { rank: string, suit: Suit, wasJoker?: boolean } {
        if (mode === 'cards' || mode === 'persistent_deck') {
            const card = deck.draw();
            if (card.suit === Suit.Joker) {
                return { rank: 'Joker', suit: Suit.Joker, wasJoker: true };
            }
            return { rank: card.rank, suit: card.suit };
        } else {
            // Dice only mode (v1.6)
            const rankRoll = this.d(12);
            let rank = rankRoll.toString();
            if (rankRoll === 11) {rank = 'J';}
            if (rankRoll === 12) {rank = this.d(2) === 1 ? 'Q' : 'K';}
            if (rankRoll === 1) {rank = 'A';}

            const suitRoll = this.d(4);
            // v1.6 Dice Suit Mapping: 1=Clubs, 2=Diamonds, 3=Spades, 4=Hearts
            const suits: Suit[] = [Suit.Clubs, Suit.Diamonds, Suit.Spades, Suit.Hearts];
            return { rank, suit: suits[suitRoll - 1] };
        }
    }

    static pickOne<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
}
