import { App, normalizePath } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { t } from '../i18n/i18n';

export class ExportUtils {
    static async exportSession(app: App, plugin: OPSEOraclePlugin): Promise<boolean> {
        try {
            const history = plugin.historyManager.getHistory();
            if (history.length === 0) { return false; }

            const format = plugin.settings.exportFormat ?? 'markdown';
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const ext = format === 'json' ? 'json' : 'md';
            const fileName = `OPSE-Session-${timestamp}.${ext}`;

            let content: string;
            if (format === 'json') {
                content = ExportUtils.buildJson(plugin);
            } else {
                content = ExportUtils.buildMarkdown(history);
            }

            let folderPath = '/';
            const activeFile = app.workspace.getActiveFile();
            if (activeFile && activeFile.parent) {
                folderPath = activeFile.parent.path;
            }

            const fullPath = normalizePath(`${folderPath}/${fileName}`);
            await app.vault.create(fullPath, content);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    private static buildMarkdown(history: ReturnType<OPSEOraclePlugin['historyManager']['getHistory']>): string {
        const meta = t().METADATA;
        let content = '# OPSE Session Report\n';
        content += `Exported on: ${new Date().toLocaleString()}\n\n`;

        history.forEach(entry => {
            content += `### ${new Date(entry.timestamp).toLocaleTimeString()} — ${entry.type.toUpperCase()}\n`;
            if (entry.question) { content += `**${meta.RESULT}:** ${entry.question}\n`; }
            content += `**${meta.ANSWER}:** ${entry.answer}\n`;
            if (entry.domain) { content += `*${meta.DOMAIN}:* ${entry.domain}\n`; }
            if (entry.interpretation) { content += `*${meta.NOTE}:* ${entry.interpretation}\n`; }
            content += `*${meta.RAW}:* ${entry.raw}\n\n---\n\n`;
        });

        return content;
    }

    private static buildJson(plugin: OPSEOraclePlugin): string {
        const active = plugin.adventureManager.getActiveAdventure();
        const payload = {
            exportedAt: new Date().toISOString(),
            adventure: active ? {
                title: active.title,
                system: active.system,
                genre: active.genre,
                sceneRank: active.sceneRank,
                threads: active.threads
            } : null,
            history: plugin.historyManager.getHistory().map(e => ({
                type: e.type,
                timestamp: new Date(e.timestamp).toISOString(),
                question: e.question ?? null,
                answer: e.answer,
                modifier: e.modifier ?? null,
                domain: e.domain ?? null,
                raw: e.raw,
                interpretation: e.interpretation ?? null,
                pinned: e.pinned ?? false
            }))
        };
        return JSON.stringify(payload, null, 2);
    }
}
