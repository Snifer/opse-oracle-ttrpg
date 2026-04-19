import { App, PluginSettingTab, Setting } from 'obsidian';
import OPSEOraclePlugin from './main';
import { t, I18n } from './i18n/i18n';
import { Deck } from './core/deck';
import { DEFAULT_SETTINGS } from './core/adventure-state';

export class OPSESettingTab extends PluginSettingTab {
    plugin: OPSEOraclePlugin;

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.addClass('opse-settings');

        const s = t().SETTINGS;

        containerEl.createEl('h2', { text: s.TITLE, cls: 'opse-settings-title' });

        // ── General ────────────────────────────────────────────────────────────
        this.sectionHeader(containerEl, '' + s.LANGUAGE);

        new Setting(containerEl)
            .setName(s.LANGUAGE)
            .setDesc(s.LANGUAGE_DESC)
            .addDropdown(d => d
                .addOption('en', 'English')
                .addOption('es', 'Español')
                .setValue(this.plugin.settings.language)
                .onChange(async (v: string) => {
                    const val = v as 'en' | 'es';
                    this.plugin.settings.language = val;
                    I18n.setLanguage(val);
                    await this.plugin.saveSettings();
                    this.display();
                }));

        new Setting(containerEl)
            .setName(s.RANDOM_MODE)
            .setDesc(s.RANDOM_MODE_DESC)
            .addDropdown(d => d
                .addOption('dice', s.DICE)
                .addOption('cards', s.CARDS)
                .addOption('persistent_deck', s.PERSISTENT_DECK)
                .setValue(this.plugin.settings.randomMode)
                .onChange(async (v: string) => {
                    const val = v as 'dice' | 'cards' | 'persistent_deck';
                    this.plugin.settings.randomMode = val;
                    this.plugin.deck = new Deck(val !== 'dice');
                    if (val !== 'persistent_deck') {
                        this.plugin.settings.deckCards = null;
                        this.plugin.settings.deckDiscard = null;
                    }
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.AUTO_INSERT)
            .setDesc(s.AUTO_INSERT_DESC)
            .addToggle(tg => tg
                .setValue(this.plugin.settings.autoInsert)
                .onChange(async v => {
                    this.plugin.settings.autoInsert = v;
                    await this.plugin.saveSettings();
                }));

        // ── Interface ──────────────────────────────────────────────────────────
        this.sectionHeader(containerEl, '' + s.SECTION_INTERFACE);

        new Setting(containerEl)
            .setName(s.DEFAULT_TAB)
            .setDesc(s.DEFAULT_TAB_DESC)
            .addDropdown(d => {
                d.addOption('scene', t().DASHBOARD.TAB_SCENE);
                d.addOption('oracle', t().DASHBOARD.TAB_ORACLE);
                d.addOption('generators', t().DASHBOARD.TAB_GENERATORS);
                d.addOption('explore', t().DASHBOARD.TAB_EXPLORE);
                d.addOption('session', t().DASHBOARD.TAB_SESSION);
                d.setValue(this.plugin.settings.defaultTab);
                d.onChange(async (v: string) => {
                    this.plugin.settings.defaultTab = v as typeof this.plugin.settings.defaultTab;
                    await this.plugin.saveSettings();
                });
                return d;
            });

        new Setting(containerEl)
            .setName(s.ACCENT_COLOR)
            .setDesc(s.ACCENT_COLOR_DESC)
            .addColorPicker(cp => cp
                .setValue(this.plugin.settings.accentColor)
                .onChange(async v => {
                    this.plugin.settings.accentColor = v;
                    this.plugin.applyAccentColor(v);
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.COMPACT_HISTORY)
            .setDesc(s.COMPACT_HISTORY_DESC)
            .addToggle(tg => tg
                .setValue(this.plugin.settings.compactHistory)
                .onChange(async v => {
                    this.plugin.settings.compactHistory = v;
                    await this.plugin.saveSettings();
                    this.plugin.refreshViews();
                }));

        new Setting(containerEl)
            .setName(s.HISTORY_ORDER)
            .setDesc(s.HISTORY_ORDER_DESC)
            .addDropdown(d => d
                .addOption('newest', s.NEWEST_FIRST)
                .addOption('oldest', s.OLDEST_FIRST)
                .setValue(this.plugin.settings.historyOrder)
                .onChange(async (v: string) => {
                    this.plugin.settings.historyOrder = v as 'newest' | 'oldest';
                    await this.plugin.saveSettings();
                    this.plugin.refreshViews();
                }));

        new Setting(containerEl)
            .setName(s.TIMESTAMP_FORMAT)
            .setDesc(s.TIMESTAMP_FORMAT_DESC)
            .addDropdown(d => d
                .addOption('time', s.TIMESTAMP_TIME)
                .addOption('datetime', s.TIMESTAMP_DATETIME)
                .addOption('relative', s.TIMESTAMP_RELATIVE)
                .setValue(this.plugin.settings.timestampFormat)
                .onChange(async (v: string) => {
                    this.plugin.settings.timestampFormat = v as 'time' | 'datetime' | 'relative';
                    await this.plugin.saveSettings();
                    this.plugin.refreshViews();
                }));

        // ── Insert format ──────────────────────────────────────────────────────
        this.sectionHeader(containerEl, ' ' + s.SECTION_INSERT);

        new Setting(containerEl)
            .setName(s.INSERT_FORMAT)
            .setDesc(s.INSERT_FORMAT_DESC)
            .addDropdown(d => d
                .addOption('plain', s.INSERT_PLAIN)
                .addOption('callout', s.INSERT_CALLOUT)
                .addOption('answer-only', s.INSERT_ANSWER)
                .setValue(this.plugin.settings.insertFormat)
                .onChange(async (v: string) => {
                    this.plugin.settings.insertFormat = v as 'plain' | 'callout' | 'answer-only';
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.SHOW_RAW)
            .setDesc(s.SHOW_RAW_DESC)
            .addToggle(tg => tg
                .setValue(this.plugin.settings.showRawRolls)
                .onChange(async v => {
                    this.plugin.settings.showRawRolls = v;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.SHOW_DOMAIN)
            .setDesc(s.SHOW_DOMAIN_DESC)
            .addToggle(tg => tg
                .setValue(this.plugin.settings.showDomain)
                .onChange(async v => {
                    this.plugin.settings.showDomain = v;
                    await this.plugin.saveSettings();
                }));

        // ── Oracles ────────────────────────────────────────────────────────────
        this.sectionHeader(containerEl, '' + s.SECTION_ORACLES);

        new Setting(containerEl)
            .setName(s.DEFAULT_LIKELIHOOD)
            .setDesc(s.DEFAULT_LIKELIHOOD_DESC)
            .addDropdown(d => d
                .addOption('probable', t().ORACLE.PROBABLE)
                .addOption('even', t().ORACLE.EVEN)
                .addOption('improbable', t().ORACLE.IMPROBABLE)
                .setValue(this.plugin.settings.defaultLikelihood)
                .onChange(async (v: string) => {
                    this.plugin.settings.defaultLikelihood = v as 'probable' | 'even' | 'improbable';
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.HEX_EVENT_THRESHOLD)
            .setDesc(s.HEX_EVENT_THRESHOLD_DESC)
            .addSlider(sl => sl
                .setLimits(2, 6, 1)
                .setValue(this.plugin.settings.hexEventThreshold)
                .setDynamicTooltip()
                .onChange(async v => {
                    this.plugin.settings.hexEventThreshold = v;
                    await this.plugin.saveSettings();
                }));

        // ── Session & data ──────────────────────────────────────────────────────
        this.sectionHeader(containerEl, '' + s.SECTION_SESSION);

        new Setting(containerEl)
            .setName(s.EXPORT_FORMAT)
            .setDesc(s.EXPORT_FORMAT_DESC)
            .addDropdown(d => d
                .addOption('markdown', s.EXPORT_MD)
                .addOption('json', s.EXPORT_JSON)
                .setValue(this.plugin.settings.exportFormat)
                .onChange(async (v: string) => {
                    this.plugin.settings.exportFormat = v as 'markdown' | 'json';
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.AUTO_OPEN_EXPLORATION)
            .setDesc(s.AUTO_OPEN_EXPLORATION_DESC)
            .addToggle(tg => tg
                .setValue(this.plugin.settings.autoOpenExploration)
                .onChange(async v => {
                    this.plugin.settings.autoOpenExploration = v;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(s.RESET_DECK)
            .setDesc(s.RESET_DECK_DESC)
            .addToggle(tg => tg
                .setValue(this.plugin.settings.resetDeckOnAdventureChange)
                .onChange(async v => {
                    this.plugin.settings.resetDeckOnAdventureChange = v;
                    await this.plugin.saveSettings();
                }));

        this.sectionHeader(containerEl, s.DATA_MANAGEMENT);

        new Setting(containerEl)
            .setName(s.HISTORY_LIMIT)
            .addSlider(sl => sl
                .setLimits(10, 500, 10)
                .setValue(this.plugin.settings.historyMaxEntries)
                .setDynamicTooltip()
                .onChange(async v => {
                    this.plugin.settings.historyMaxEntries = v;
                    await this.plugin.historyManager.setMaxEntries(v);
                }));

        new Setting(containerEl)
            .setName(s.CLEAR_HISTORY)
            .addButton(btn => btn
                .setButtonText(s.CLEAR_BTN)
                .setWarning()
                .onClick(async () => {
                    if (confirm(s.CLEAR_CONFIRM)) {
                        await this.plugin.historyManager.clearHistory();
                        this.plugin.refreshViews();
                    }
                }));

        new Setting(containerEl)
            .setName(s.ABOUT_RESET_DEFAULTS)
            .setDesc(s.ABOUT_RESET_CONFIRM)
            .addButton(btn => btn
                .setButtonText(s.RESET_BTN)
                .setWarning()
                .onClick(async () => {
                    if (confirm(s.ABOUT_RESET_CONFIRM)) {
                        // Preserve user data, reset only UI/behavior settings
                        const keep = {
                            adventures: this.plugin.settings.adventures,
                            activeAdventureId: this.plugin.settings.activeAdventureId,
                            history: this.plugin.settings.history,
                            dungeons: this.plugin.settings.dungeons,
                            regions: this.plugin.settings.regions
                        };
                        this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS, keep);
                        this.plugin.applyAccentColor(DEFAULT_SETTINGS.accentColor);
                        await this.plugin.saveSettings();
                        this.plugin.refreshViews();
                        this.display();
                    }
                }));

        // ── About ───────────────────────────────────────────────────────────────
        this.sectionHeader(containerEl, '' + s.SECTION_ABOUT);

        const aboutCard = containerEl.createDiv({ cls: 'opse-settings-about' });

        const logoRow = aboutCard.createDiv({ cls: 'opse-about-logo-row' });
        logoRow.createDiv({ cls: 'opse-about-logo', text: '🎲' });
        const logoText = logoRow.createDiv({ cls: 'opse-about-logo-text' });
        logoText.createEl('strong', { text: 'OPSE Oracle' });
        logoText.createSpan({ text: ' v1.0.0', cls: 'opse-about-version' });

        const grid = aboutCard.createDiv({ cls: 'opse-about-grid' });

        this.aboutRow(grid, s.ABOUT_AUTHOR, 'Snifer · Bastion del Dinosaurio');
        this.aboutRow(grid, s.ABOUT_BASED_ON, s.ABOUT_OPSE_DESC);
        this.aboutRow(grid, s.ABOUT_LICENSE, 'MIT (plugin) · CC-BY-SA 4.0 (OPSE tables)');

        const linksRow = aboutCard.createDiv({ cls: 'opse-about-links' });
        linksRow.createEl('a', {
            text: '📦 GitHub',
            href: 'https://github.com/snifer/OPSE-Oracle',
            cls: 'opse-about-link'
        });
        linksRow.createEl('a', {
            text: '🎲 OPSE',
            href: 'https://inflatablestudios.itch.io/',
            cls: 'opse-about-link'
        });
        linksRow.createEl('a', {
            text: '☕ Ko-fi',
            href: 'https://ko-fi.com/bastiondeldino',
            cls: 'opse-about-link'
        });
    }

    private sectionHeader(parent: HTMLElement, title: string) {
        parent.createEl('h3', { text: title, cls: 'opse-settings-section' });
    }

    private aboutRow(parent: HTMLElement, label: string, value: string) {
        const row = parent.createDiv({ cls: 'opse-about-row' });
        row.createSpan({ text: label, cls: 'opse-about-label' });
        row.createSpan({ text: value, cls: 'opse-about-value' });
    }
}
