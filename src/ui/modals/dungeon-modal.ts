import { App, Modal, Notice, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { DungeonManager } from '../../core/dungeon';
import { MarkdownUtils } from '../../utils/markdown';
import { t } from '../../i18n/i18n';
import { VIEW_TYPE_OPSE_EXPLORATION } from '../exploration-view';

export class DungeonModal extends Modal {
    plugin: OPSEOraclePlugin;
    name = 'Mazmorra';
    appearance = '';
    func = '';

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        const strings = t().EXPLORATION;
        contentEl.createEl('h2', { text: strings.DUNGEON_TITLE });

        new Setting(contentEl)
            .setName(t().ADVENTURE.TITLE)
            .addText(text => text
                .setPlaceholder('Nombre de la mazmorra')
                .setValue(this.name)
                .onChange(value => this.name = value));

        new Setting(contentEl)
            .setName(strings.APPEARANCE)
            .addText(text => text
                .setPlaceholder('Ej: Húmeda, oscura, piedra antigua')
                .setValue(this.appearance)
                .onChange(value => this.appearance = value));

        new Setting(contentEl)
            .setName(strings.FUNCTION)
            .addText(text => text
                .setPlaceholder('Ej: Tumba, cuartel, templo')
                .setValue(this.func)
                .onChange(value => this.func = value));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText(t().ADVENTURE.START)
                .setCta()
                .onClick(() => {
                    this.startDungeon();
                    this.close();
                }));
    }

    async startDungeon() {
        const dungeon = DungeonManager.createDungeon(
            this.name,
            this.appearance || 'Sin descripción',
            this.func || 'Sin descripción'
        );
        const firstRoom = dungeon.rooms[dungeon.currentRoomId!];

        // Persist dungeon to settings
        this.plugin.settings.dungeons[dungeon.id] = dungeon;

        // Link to active adventure if one exists
        const active = this.plugin.adventureManager.getActiveAdventure();
        if (active) {
            active.dungeonId = dungeon.id;
            await this.plugin.adventureManager.linkDungeon(active.activeNotePath, dungeon.id);
        }

        await this.plugin.saveSettings();
        new Notice(t().COMMON.DUNGEON_CREATED);

        // Insert summary into active note
        let content = `**Tema:** ${dungeon.themeAppearance} (${dungeon.themeFunction})\n\n`;
        content += `**Entrada:** ${firstRoom.location}\n`;
        content += `**Encuentro:** ${firstRoom.encounter}\n`;
        content += `**Objeto:** ${firstRoom.object}\n`;
        content += `**Salidas:** ${firstRoom.exits}`;

        const markdown = MarkdownUtils.formatResult(`Dungeon: ${this.name}`, content, '(Inicio de la mazmorra)');
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);

        if (this.plugin.settings.autoOpenExploration) {
            await this.plugin.activateView(VIEW_TYPE_OPSE_EXPLORATION);
        }
        this.plugin.refreshViews();
    }

    onClose() {
        this.contentEl.empty();
    }
}
