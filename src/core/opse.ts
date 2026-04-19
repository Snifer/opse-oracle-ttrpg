import { Suit } from '../types';
import { t } from '../i18n/i18n';

/**
 * OPSE v1.6 rules engine — pure table lookups, no UI concerns.
 * All strings come from i18n so results are language-aware.
 */

// Convenience type for record-based table lookups (card rank → string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CardTable = Record<string, any>;

export class OPSE {
    static resolveYesNo(d1: number, d2: number, likelihood: 'probable' | 'even' | 'improbable'): { answer: string, modifier?: string } {
        const strings = t().ORACLE;
        let threshold = 4;
        if (likelihood === 'probable') { threshold = 3; }
        if (likelihood === 'improbable') { threshold = 5; }

        const answer = d1 >= threshold ? strings.YES : strings.NO;
        let modifier: string | undefined;
        if (d2 === 1) { modifier = strings.BUT; }
        if (d2 === 6) { modifier = strings.AND; }

        return { answer, modifier };
    }

    static getAction(rank: string): string {
        return (t().TABLES.ACTIONS as CardTable)[rank] || '???';
    }

    static getDetail(rank: string): string {
        return (t().TABLES.DETAILS as CardTable)[rank] || '???';
    }

    static getTheme(rank: string): string {
        return (t().TABLES.THEMES as CardTable)[rank] || '???';
    }

    static getDomain(suit: Suit): string {
        return (t().TABLES.DOMAINS as CardTable)[suit] || '???';
    }

    static getNPCIdentity(rank: string): string {
        return (t().TABLES.NPC_IDENTITY as CardTable)[rank] || '???';
    }

    static getNPCObjective(rank: string): string {
        return (t().TABLES.NPC_OBJECTIVE as CardTable)[rank] || '???';
    }

    static getAltered(index: number): string {
        return (t().TABLES.ALTERED as CardTable)[index.toString()] || '???';
    }

    static getComplication(index: number): string {
        return t().TABLES.COMPLICATIONS[index] || '???';
    }

    static getBeatMove(index: number): string {
        return t().TABLES.GM_MOVES_BEAT[index] || '???';
    }

    static getFailureMove(index: number): string {
        return t().TABLES.GM_MOVES_FAILURE[index] || '???';
    }

    static getPlotTwist(index: number): string {
        return t().TABLES.PLOT_TWIST[index] || '???';
    }

    static getAtmosphere(index: number): string {
        return t().TABLES.FLAVOR.ATMOSPHERE[index] || '???';
    }

    static getWeather(index: number): string {
        return t().TABLES.FLAVOR.WEATHER[index] || '???';
    }

    static getDungeonLocation(index: number): string {
        return t().TABLES.DUNGEON_LOCATIONS[index] || '???';
    }

    static getDungeonEncounter(index: number): string {
        return t().TABLES.DUNGEON_ENCOUNTERS[index] || '???';
    }

    static getDungeonObject(index: number): string {
        return t().TABLES.DUNGEON_OBJECTS[index] || '???';
    }

    static getHexContent(index: number): string {
        return t().TABLES.HEX_CONTENTS[index] || '???';
    }

    static getHexTrait(index: number): string {
        return t().TABLES.HEX_TRAITS[index] || '???';
    }
}
