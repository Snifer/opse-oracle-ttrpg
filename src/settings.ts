import { App, PluginSettingTab, Setting } from 'obsidian';
import OPSEOraclePlugin from './main';
import { t, I18n } from './i18n/i18n';

export class OPSESettingTab extends PluginSettingTab {
    plugin: OPSEOraclePlugin;

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        const strings = t().SETTINGS;

        containerEl.createEl('h2', { text: strings.TITLE });

        new Setting(containerEl)
            .setName(strings.LANGUAGE)
            .setDesc(strings.LANGUAGE_DESC)
            .addDropdown(dropdown => dropdown
                .addOption('en', 'English')
                .addOption('es', 'Español')
                .setValue(this.plugin.settings.language)
                .onChange(async (value: 'en' | 'es') => {
                    this.plugin.settings.language = value;
                    I18n.setLanguage(value);
                    await this.plugin.saveSettings();
                    this.display(); // Refresh to update labels
                }));

        new Setting(containerEl)
            .setName(strings.RANDOM_MODE)
            .setDesc(strings.RANDOM_MODE_DESC)
            .addDropdown(dropdown => dropdown
                .addOption('dice', strings.DICE)
                .addOption('cards', strings.CARDS)
                .addOption('persistent_deck', strings.PERSISTENT_DECK)
                .setValue(this.plugin.settings.randomMode)
                .onChange(async (value: 'dice' | 'cards' | 'persistent_deck') => {
                    this.plugin.settings.randomMode = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(strings.AUTO_INSERT)
            .setDesc(strings.AUTO_INSERT_DESC)
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.autoInsert)
                .onChange(async (value) => {
                    this.plugin.settings.autoInsert = value;
                    await this.plugin.saveSettings();
                }));

        containerEl.createEl('h3', { text: 'Gestión de Datos' });

        new Setting(containerEl)
            .setName('Límite de historial')
            .addSlider(slider => slider
                .setLimits(10, 500, 10)
                .setValue(this.plugin.settings.history.length > 100 ? this.plugin.settings.history.length : 100)
                .onChange(async (value) => {
                    await this.plugin.historyManager.setMaxEntries(value);
                }));

        new Setting(containerEl)
            .setName('Limpiar historial')
            .addButton(btn => btn
                .setButtonText('Limpiar')
                .setWarning()
                .onClick(async () => {
                    if (confirm('¿Limpiar historial?')) {
                        await this.plugin.historyManager.clearHistory();
                        this.plugin.refreshViews();
                    }
                }));
    }
}
