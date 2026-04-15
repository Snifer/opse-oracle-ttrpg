import { App, Modal, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { HexManager } from '../../core/hex';
import { MarkdownUtils } from '../../utils/markdown';
import { t } from '../../i18n/i18n';

export class HexModal extends Modal {
    plugin: OPSEOraclePlugin;
    name: string = "Región";
    common: string = "...";
    uncommon: string = "...";
    rare: string = "...";

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: "Hex Exploration" });

        new Setting(contentEl)
            .setName(t().ADVENTURE.TITLE)
            .addText(text => text.setValue(this.name).onChange(value => this.name = value));

        new Setting(contentEl)
            .setName("Common Terrain")
            .addText(text => text.setValue(this.common).onChange(value => this.common = value));

        new Setting(contentEl)
            .setName("Uncommon Terrain")
            .addText(text => text.setValue(this.uncommon).onChange(value => this.uncommon = value));

        new Setting(contentEl)
            .setName("Rare Terrain")
            .addText(text => text.setValue(this.rare).onChange(value => this.rare = value));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText(t().ADVENTURE.START)
                .setCta()
                .onClick(() => {
                    this.startRegion();
                    this.close();
                }));
    }

    startRegion() {
        const region = HexManager.createRegion(this.name, this.common, this.uncommon, this.rare);
        const startHex = region.hexes[HexManager.getHexKey(0, 0)];

        let title = `Exploration: ${this.name}`;
        let content = `**Terrain Schema:** ${this.common} / ${this.uncommon} / ${this.rare}\n\n`;
        content += `**Starting Hex (0,0):**\n`;
        content += `**Terrain:** ${startHex.terrain}\n`;
        content += `**Contents:** ${startHex.contents}\n`;
        content += `**Trait:** ${startHex.trait}\n`;
        if (startHex.eventTriggered) content += `**EVENT TRIGGERED!**\n`;

        const markdown = MarkdownUtils.formatResult(title, content, "(Start of region exploration)");
        MarkdownUtils.insertAtCursor(this.app, markdown);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
