import { Suit } from "../types";
import { t } from "../i18n/i18n";

/**
 * OPSE v1.6 Logic (Language-agnostic logic using i18n strings)
 */

export class OPSE {
    static resolveYesNo(d1: number, d2: number, likelihood: 'probable' | 'even' | 'improbable'): { answer: string, modifier?: string } {
        const strings = t().ORACLE;
        let successThreshold = 4;
        if (likelihood === 'probable') successThreshold = 3;
        if (likelihood === 'improbable') successThreshold = 5;
        
        const isSuccess = d1 >= successThreshold;
        const answer = isSuccess ? strings.YES : strings.NO;
        
        let modifier: string | undefined;
        if (d2 === 1) modifier = strings.BUT;
        if (d2 === 6) modifier = strings.AND;
        
        return { answer, modifier };
    }
    
    static getAction(rank: string): string {
        return (t().TABLES.ACTIONS as any)[rank] || "???";
    }
    
    static getDetail(rank: string): string {
        return (t().TABLES.DETAILS as any)[rank] || "???";
    }
    
    static getTheme(rank: string): string {
        return (t().TABLES.THEMES as any)[rank] || "???";
    }
    
    static getDomain(suit: Suit): string {
        return (t().TABLES.DOMAINS as any)[suit] || "???";
    }

    static getComplication(index: number): string {
        return t().TABLES.COMPLICATIONS[index] || "???";
    }

    static getAltered(index: number): string {
        return (t().TABLES.ALTERED as any)[(index).toString()] || "???";
    }

    static getBeatMove(index: number): string {
        return t().TABLES.GM_MOVES_BEAT[index] || "???";
    }

    static getFailureMove(index: number): string {
        return t().TABLES.GM_MOVES_FAILURE[index] || "???";
    }

    static getPlotTwist(index: number): string {
        return t().TABLES.PLOT_TWIST[index] || "???";
    }

    static getAtmosphere(index: number): string {
        return t().TABLES.FLAVOR.ATMOSPHERE[index] || "???";
    }

    static getWeather(index: number): string {
        return t().TABLES.FLAVOR.WEATHER[index] || "???";
    }
}
