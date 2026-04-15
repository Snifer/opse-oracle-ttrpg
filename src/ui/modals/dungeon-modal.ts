import { App, Modal, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { DungeonManager } from '../../core/dungeon';
import { MarkdownUtils } from '../../utils/markdown';
import { t } from '../../i18n/i18n';

export class DungeonModal extends Modal {
    plugin: OPSEOraclePlugin;
    name: string = "Mazmorra";
    appearance: string = "...";
    function: string = "...";

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: "Dungeon tracker" });

        new Setting(contentEl)
            .setName(t().ADVENTURE.TITLE)
            .addText(text => text.setValue(this.name).onChange(value => this.name = value));

        new Setting(contentEl)
            .setName("Appearance / theme")
            .addText(text => text.setValue(this.appearance).onChange(value => this.appearance = value));

        new Setting(contentEl)
            .setName("Function / purpose")
            .addText(text => text.setValue(this.function).onChange(value => this.function = value));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText(t().ADVENTURE.START)
                .setCta()
                .onClick(() => {
                    this.startDungeon();
                    this.close();
                }));
    }

    startDungeon() {
        const dungeon = DungeonManager.createDungeon(this.name, this.appearance, this.function);
        const firstRoom = dungeon.rooms[dungeon.currentRoomId!];

        let title = `Dungeon: ${this.name}`;
        let content = `**Theme:** ${this.appearance} (${this.function})\n\n`;
        content += `**Entrance:** ${firstRoom.location}\n`;
        content += `**Encounter:** ${firstRoom.encounter}\n`;
        content += `**Object:** ${firstRoom.object}\n`;
        content += `**Exits:** ${firstRoom.exits}`;

        const markdown = MarkdownUtils.formatResult(title, content, "(Start of dungeon crawl)");
        MarkdownUtils.insertAtCursor(this.app, markdown);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
