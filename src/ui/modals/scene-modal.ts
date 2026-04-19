import { App, Modal, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { OPSE } from '../../core/opse';
import { Random } from '../../core/random';
import { MarkdownUtils } from '../../utils/markdown';
import { t } from '../../i18n/i18n';

export class SceneModal extends Modal {
    plugin: OPSEOraclePlugin;
    objective = '';
    location = '';

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        const strings = t().SCENE;
        contentEl.createEl('h2', { text: strings.NEW });

        new Setting(contentEl)
            .setName(strings.OBJECTIVE)
            .setDesc(strings.OBJECTIVE_DESC)
            .addText(text => text.onChange(value => this.objective = value));

        new Setting(contentEl)
            .setName(strings.LOCATION)
            .addText(text => text.onChange(value => this.location = value));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText(strings.GENERATE)
                .setCta()
                .onClick(async () => {
                    await this.generateScene();
                    this.close();
                }));
    }

    async generateScene() {
        const strings = t().SCENE;
        const complicationRoll = Random.d(6);
        const complication = OPSE.getComplication(complicationRoll - 1);

        const title = `${strings.NEW}: ${this.objective || '...'}`;
        const content = `**${strings.LOCATION}:** ${this.location || '...'}
**${strings.OBJECTIVE}:** ${this.objective || '...'}

**${strings.COMPLICATION}:** ${complication}`;

        const meta = t().METADATA;
        const raw = `(1d6=${complicationRoll} [${meta.COMPLICATION}])`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(),
            answer: complication,
            question: title,
            raw: raw,
            timestamp: Date.now(),
            type: 'scene'
        });

        const markdown = MarkdownUtils.formatResult(title, content, raw);
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
