import { App, TFile, normalizePath } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { t } from '../i18n/i18n';

export class ExportUtils {
    static async exportSession(app: App, plugin: OPSEOraclePlugin): Promise<boolean> {
        try {
            const history = plugin.historyManager.getHistory();
            if (history.length === 0) return false;

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `OPSE-Session-${timestamp}.md`;
            
            let content = `# OPSE Session Report\n`;
            content += `Exported on: ${new Date().toLocaleString()}\n\n`;
            
            const meta = t().METADATA;
            history.forEach(entry => {
                content += `### ${new Date(entry.timestamp).toLocaleTimeString()} - ${entry.type.toUpperCase()}\n`;
                if (entry.question) content += `**${meta.RESULT}:** ${entry.question}\n`;
                content += `**${meta.ANSWER}:** ${entry.answer}\n`;
                if (entry.domain) content += `*${meta.DOMAIN}:* ${entry.domain}\n`;
                if (entry.interpretation) content += `*${meta.NOTE}:* ${entry.interpretation}\n`;
                content += `*${meta.RAW}:* ${entry.raw}\n\n---\n\n`;
            });

            // Create in the active folder if possible
            let folderPath = "/";
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
}
