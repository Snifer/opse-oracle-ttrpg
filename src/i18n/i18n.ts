import { en } from './en';
import { es } from './es';

export type Language = 'en' | 'es';

export class I18n {
    private static lang: Language = 'en'; // Default to Spanish as per the PDF reference

    static setLanguage(lang: Language) {
        this.lang = lang;
    }

    static getLanguage(): Language {
        return this.lang;
    }

    static t(): typeof es {
        return this.lang === 'es' ? es : en;
    }
}

/**
 * Shorthand for I18n.t()
 */
export const t = () => I18n.t();
