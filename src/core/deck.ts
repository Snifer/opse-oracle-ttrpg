import { Card, Suit } from "../types";
import { Random } from "./random";

/**
 * Virtual deck management for OPSE
 */

export class Deck {
    private cards: Card[] = [];
    private discard: Card[] = [];
    private useJokers: boolean = false;

    constructor(useJokers: boolean = false) {
        this.useJokers = useJokers;
        this.reset();
    }

    reset(): void {
        this.cards = [];
        this.discard = [];
        const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for (const suit of suits) {
            for (let i = 0; i < ranks.length; i++) {
                this.cards.push({
                    rank: ranks[i],
                    suit,
                    value: i + 1
                });
            }
        }
        
        if (this.useJokers) {
            this.cards.push({ rank: 'Joker', suit: Suit.Joker, value: 0 });
            this.cards.push({ rank: 'Joker', suit: Suit.Joker, value: 0 });
        }
        
        this.shuffle();
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(): Card {
        if (this.cards.length === 0) {
            this.cards = [...this.discard];
            this.discard = [];
            this.shuffle();
        }
        
        if (this.cards.length === 0) {
            this.reset();
        }
        
        const card = this.cards.pop()!;
        this.discard.push(card);
        
        // OPSE v1.6: If Joker is drawn, reshuffle all cards immediately after the draw
        if (card.suit === Suit.Joker) {
            this.reset();
        }
        
        return card;
    }

    getRemainingCount(): number {
        return this.cards.length;
    }

    getDiscardCount(): number {
        return this.discard.length;
    }
}
