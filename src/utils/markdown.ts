import { App, MarkdownView } from 'obsidian';

/**
 * Utilities for inserting and formatting OPSE results in Markdown.
 * Insert format, raw rolls and domain visibility are controlled via plugin settings.
 */

export class MarkdownUtils {
    static async insertAtCursor(app: App, content: string, targetPath?: string): Promise<void> {
        let activeView: MarkdownView | null = null;

        if (targetPath) {
            app.workspace.iterateAllLeaves(leaf => {
                if (leaf.view instanceof MarkdownView && leaf.view.file?.path === targetPath) {
                    activeView = leaf.view as MarkdownView;
                }
            });
        }

        if (!activeView) {
            activeView = app.workspace.getActiveViewOfType(MarkdownView);
        }

        if (activeView) {
            const editor = (activeView as MarkdownView).editor;
            const cursor = editor.getCursor();
            const line = editor.getLine(cursor.line);
            const textToInsert = (line.trim().length > 0 ? '\n' : '') + content;

            editor.replaceRange(textToInsert, cursor);

            const lines = textToInsert.split('\n');
            if (lines.length > 1) {
                editor.setCursor({ line: cursor.line + lines.length - 1, ch: lines[lines.length - 1].length });
            } else {
                editor.setCursor({ line: cursor.line, ch: cursor.ch + textToInsert.length });
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async smartInsert(app: App, plugin: any, content: string): Promise<void> {
        if (!plugin.settings.autoInsert) { return; }
        const active = plugin.adventureManager.getActiveAdventure();
        await this.insertAtCursor(app, content, active?.activeNotePath);
    }

    static formatResult(
        title: string,
        answer: string,
        raw: string,
        footer?: string,
        interpretation?: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugin?: any
    ): string {
        // Read settings from plugin if available, otherwise use defaults
        const format: 'plain' | 'callout' | 'answer-only' = plugin?.settings?.insertFormat ?? 'plain';
        const showRaw: boolean = plugin?.settings?.showRawRolls ?? true;
        const showDomain: boolean = plugin?.settings?.showDomain ?? true;

        let label = title;
        let question = '';
        if (title.includes(':')) {
            const parts = title.split(':');
            label = parts[0].trim();
            question = parts.slice(1).join(':').trim();
        }

        if (format === 'callout') {
            return MarkdownUtils.formatCallout(label, question, answer, raw, footer, interpretation, showRaw, showDomain);
        }

        if (format === 'answer-only') {
            return `**${answer}**\n\n`;
        }

        // Plain markdown (default)
        let text = '';
        if (question) { text += `? ${question}\n`; }

        if (showRaw) {
            text += `${answer} <small>${raw}</small>\n`;
        } else {
            text += `${answer}\n`;
        }

        if (footer && showDomain) { text += `*${footer}*\n`; }
        text += `> ${interpretation || ''}\n\n`;

        return text;
    }

    private static formatCallout(
        label: string,
        question: string,
        answer: string,
        raw: string,
        footer?: string,
        interpretation?: string,
        showRaw = true,
        showDomain = true
    ): string {
        const calloutType = label.toLowerCase().replace(/\s+/g, '-') || 'oracle';
        let text = `> [!${calloutType}]`;
        if (question) { text += ` ${question}`; }
        text += `\n> **${answer}**`;
        if (showRaw) { text += ` <small>${raw}</small>`; }
        if (footer && showDomain) { text += `\n> *${footer}*`; }
        if (interpretation) { text += `\n> ${interpretation}`; }
        text += '\n\n';
        return text;
    }

    static formatSection(title: string): string {
        return `## ${title}\n\n`;
    }
}
