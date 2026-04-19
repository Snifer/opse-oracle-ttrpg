import { App, Modal, Notice, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { HexManager } from '../../core/hex';
import { MarkdownUtils } from '../../utils/markdown';
import { t } from '../../i18n/i18n';
import { VIEW_TYPE_OPSE_EXPLORATION } from '../exploration-view';

export class HexModal extends Modal {
    plugin: OPSEOraclePlugin;
    name = 'Región';
    common = '';
    uncommon = '';
    rare = '';

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        const strings = t().EXPLORATION;
        contentEl.createEl('h2', { text: strings.HEX_TITLE });

        new Setting(contentEl)
            .setName(t().ADVENTURE.TITLE)
            .addText(text => text
                .setPlaceholder('Nombre de la región')
                .setValue(this.name)
                .onChange(value => this.name = value));

        new Setting(contentEl)
            .setName(strings.COMMON_TERRAIN)
            .addText(text => text
                .setPlaceholder('Ej: Bosque')
                .setValue(this.common)
                .onChange(value => this.common = value));

        new Setting(contentEl)
            .setName(strings.UNCOMMON_TERRAIN)
            .addText(text => text
                .setPlaceholder('Ej: Pantano')
                .setValue(this.uncommon)
                .onChange(value => this.uncommon = value));

        new Setting(contentEl)
            .setName(strings.RARE_TERRAIN)
            .addText(text => text
                .setPlaceholder('Ej: Montaña')
                .setValue(this.rare)
                .onChange(value => this.rare = value));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText(t().ADVENTURE.START)
                .setCta()
                .onClick(() => {
                    this.startRegion();
                    this.close();
                }));
    }

    async startRegion() {
        const common = this.common || 'Terreno común';
        const uncommon = this.uncommon || 'Terreno poco común';
        const rare = this.rare || 'Terreno raro';

        const region = HexManager.createRegion(this.name, common, uncommon, rare);
        region.eventThreshold = this.plugin.settings.hexEventThreshold ?? 5;
        const startHex = region.hexes[HexManager.getHexKey(0, 0)];

        // Persist region to settings
        this.plugin.settings.regions[region.id] = region;

        // Link to active adventure if one exists
        const active = this.plugin.adventureManager.getActiveAdventure();
        if (active) {
            active.regionId = region.id;
            await this.plugin.adventureManager.linkRegion(active.activeNotePath, region.id);
        }

        await this.plugin.saveSettings();
        new Notice(t().COMMON.REGION_CREATED);

        // Insert summary into active note
        let content = `**Terrenos:** ${common} / ${uncommon} / ${rare}\n\n`;
        content += '**Hex inicial (0,0):**\n';
        content += `**Terreno:** ${startHex.terrain}\n`;
        content += `**Contenido:** ${startHex.contents}`;
        if (startHex.eventTriggered) {content += '\n**¡EVENTO DISPARADO!**';}

        const markdown = MarkdownUtils.formatResult(`Exploración: ${this.name}`, content, '(Inicio de la exploración)');
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);

        // Open exploration view if setting enabled
        if (this.plugin.settings.autoOpenExploration) {
            await this.plugin.activateView(VIEW_TYPE_OPSE_EXPLORATION);
        }
        this.plugin.refreshViews();
    }

    onClose() {
        this.contentEl.empty();
    }
}
