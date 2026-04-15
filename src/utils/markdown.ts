import { Editor, App, TFile, MarkdownView } from 'obsidian';

/**
 * Utilities for inserting and formatting OPSE results in Markdown
 */

export class MarkdownUtils {
    static async insertAtCursor(app: App, content: string, targetPath?: string): Promise<void> {
        let activeView: MarkdownView | null = null;

        // 1. Try to find the leaf for the target file if provided (Adventure Note)
        if (targetPath) {
            app.workspace.iterateAllLeaves(leaf => {
                if (leaf.view instanceof MarkdownView && leaf.view.file?.path === targetPath) {
                    activeView = leaf.view;
                }
            });
        }

        // 2. Fallback to currently active view if not found or no target
        if (!activeView) {
            activeView = app.workspace.getActiveViewOfType(MarkdownView);
        }

        if (activeView) {
            const editor = (activeView as MarkdownView).editor;
            const cursor = editor.getCursor();
            
            // Ensure we are adding space if needed
            const line = editor.getLine(cursor.line);
            const textToInsert = (line.trim().length > 0 ? "\n" : "") + content;
            
            editor.replaceRange(textToInsert, cursor);
            
            // Move cursor after insertion
            const lines = textToInsert.split('\n');
            if (lines.length > 1) {
                editor.setCursor({ line: cursor.line + lines.length - 1, ch: lines[lines.length - 1].length });
            } else {
                editor.setCursor({ line: cursor.line, ch: cursor.ch + textToInsert.length });
            }
        }
    }

    /**
     * Helper to insert only if autoInsert is enabled, targeting the active adventure note.
     */
    static async smartInsert(app: App, plugin: any, content: string): Promise<void> {
        if (!plugin.settings.autoInsert) return;
        const active = plugin.adventureManager.getActiveAdventure();
        await this.insertAtCursor(app, content, active?.activeNotePath);
    }

    static formatResult(title: string, answer: string, raw: string, footer?: string, interpretation?: string): string {
        let text = "";
        
        // Extract label and question
        let label = title;
        let question = "";
        if (title.includes(":")) {
            const parts = title.split(":");
            label = parts[0].trim();
            question = parts.slice(1).join(":").trim();
        }

        // Line 1: Question (prefixed with ?)
        if (question) {
            text += `? ${question}\n`;
        } else if (label && label !== "Result") {
            // If no question but we have a label (like "Plot Twist"), maybe skip it or add it
            // User requested ? [Question], so if no question, we just start with Answer
        }

        // Line 2: Answer and Metadata
        text += `${answer} <small>${raw}</small>\n`;
        
        // Footer (e.g. Domain)
        if (footer) {
            text += `*${footer}*\n`;
        }

        // Line 3: Blockquote with interpretation exclusively (always present if wanted as "registry")
        text += `> ${interpretation || ""}\n\n`;

        return text;
    }
    
    static formatSection(title: string): string {
        return `## ${title}\n\n`;
    }
}
