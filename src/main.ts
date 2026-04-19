import { Plugin, WorkspaceLeaf } from 'obsidian';
import { OPSESettings, DEFAULT_SETTINGS, AdventureStateManager } from './core/adventure-state';
import { OPSESettingTab } from './settings';
import { I18n, t } from './i18n/i18n';
import { HistoryManager } from './core/history';
import { AdventureModal } from './ui/modals/adventure-modal';
import { SceneModal } from './ui/modals/scene-modal';
import { OracleModal } from './ui/modals/oracle-modal';
import { OracleCommands } from './commands/oracle';
import { GeneratorCommands } from './commands/generators';
import { ExplorationCommands } from './commands/exploration';
import { ControlPanelView, VIEW_TYPE_OPSE_CONTROL } from './ui/control-view';
import { ExplorationView, VIEW_TYPE_OPSE_EXPLORATION } from './ui/exploration-view';
import { Deck } from './core/deck';

export default class OPSEOraclePlugin extends Plugin {
    settings: OPSESettings;
    adventureManager: AdventureStateManager;
    historyManager: HistoryManager;
    deck: Deck;

    async onload() {
        await this.loadSettings();
        I18n.setLanguage(this.settings.language);
        this.applyAccentColor(this.settings.accentColor);

        this.addRibbonIcon('dice', 'OPSE Control', () => {
            this.activateView(VIEW_TYPE_OPSE_CONTROL);
        });

        // Initialize deck — jokers enabled when using card modes (OPSE v1.6)
        const useJokers = this.settings.randomMode !== 'dice';
        this.deck = new Deck(useJokers);
        if (this.settings.randomMode === 'persistent_deck' &&
            this.settings.deckCards && this.settings.deckCards.length > 0) {
            this.deck.setState(this.settings.deckCards, this.settings.deckDiscard || []);
        }

        this.adventureManager = new AdventureStateManager(
            this.settings,
            async (s) => await this.saveSettings(s)
        );

        this.historyManager = new HistoryManager(
            this.settings.history,
            this.settings.historyMaxEntries,
            async (h) => {
                this.settings.history = h;
                await this.saveSettings();
                this.refreshViews();
            }
        );

        this.registerView(VIEW_TYPE_OPSE_CONTROL, (leaf) => new ControlPanelView(leaf, this));
        this.registerView(VIEW_TYPE_OPSE_EXPLORATION, (leaf) => new ExplorationView(leaf, this));

        this.addSettingTab(new OPSESettingTab(this.app, this));

        this.addCommand({
            id: 'opse-open-control',
            name: `OPSE: ${t().SETTINGS.OPEN_CONTROL}`,
            callback: () => this.activateView(VIEW_TYPE_OPSE_CONTROL)
        });

        this.addCommand({
            id: 'opse-open-history',
            name: `OPSE: ${t().SETTINGS.OPEN_HISTORY}`,
            callback: () => this.activateView(VIEW_TYPE_OPSE_CONTROL)
        });

        this.addCommand({
            id: 'opse-open-exploration',
            name: `OPSE: ${t().SETTINGS.OPEN_EXPLORATION}`,
            callback: () => this.activateView(VIEW_TYPE_OPSE_EXPLORATION)
        });

        this.addCommand({
            id: 'opse-start-adventure',
            name: `OPSE: ${t().ADVENTURE.NEW}`,
            callback: () => new AdventureModal(this.app, this).open()
        });

        this.addCommand({
            id: 'opse-set-scene',
            name: `OPSE: ${t().SCENE.NEW}`,
            callback: () => new SceneModal(this.app, this).open()
        });

        this.addCommand({
            id: 'opse-ask-oracle',
            name: `OPSE: ${t().ORACLE.YESNO_TITLE}`,
            callback: () => new OracleModal(this.app, this).open()
        });

        OracleCommands.registerCommands(this);
        GeneratorCommands.registerCommands(this);
        ExplorationCommands.registerCommands(this);

        // eslint-disable-next-line no-console
        console.log('OPSE Oracle plugin loaded');
    }

    async activateView(type: string) {
        const { workspace } = this.app;
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(type);

        if (leaves.length > 0) {
            leaf = leaves[0];
        } else {
            leaf = workspace.getRightLeaf(false);
            if (leaf) {await leaf.setViewState({ type, active: true });}
        }

        if (leaf) {workspace.revealLeaf(leaf);}
    }

    refreshViews() {
        this.app.workspace.getLeavesOfType(VIEW_TYPE_OPSE_EXPLORATION).forEach(leaf => {
            if (leaf.view instanceof ExplorationView) {leaf.view.refresh();}
        });
        this.app.workspace.getLeavesOfType(VIEW_TYPE_OPSE_CONTROL).forEach(leaf => {
            if (leaf.view instanceof ControlPanelView) {leaf.view.refresh();}
        });
    }

    onunload() {
        // eslint-disable-next-line no-console
        console.log('OPSE Oracle plugin unloaded');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        // Migration: ensure all fields exist for users upgrading from older versions
        if (!this.settings.dungeons) { this.settings.dungeons = {}; }
        if (!this.settings.regions) { this.settings.regions = {}; }
        if (!this.settings.historyMaxEntries) { this.settings.historyMaxEntries = 100; }
        if (this.settings.deckCards === undefined) { this.settings.deckCards = null; }
        if (this.settings.deckDiscard === undefined) { this.settings.deckDiscard = null; }
        if (!this.settings.tabContentHeight) { this.settings.tabContentHeight = 260; }
        if (!this.settings.defaultTab) { this.settings.defaultTab = 'oracle'; }
        if (this.settings.compactHistory === undefined) { this.settings.compactHistory = false; }
        if (!this.settings.accentColor) { this.settings.accentColor = '#8b5cf6'; }
        if (!this.settings.historyOrder) { this.settings.historyOrder = 'newest'; }
        if (!this.settings.timestampFormat) { this.settings.timestampFormat = 'time'; }
        if (!this.settings.insertFormat) { this.settings.insertFormat = 'plain'; }
        if (this.settings.showRawRolls === undefined) { this.settings.showRawRolls = true; }
        if (this.settings.showDomain === undefined) { this.settings.showDomain = true; }
        if (!this.settings.defaultLikelihood) { this.settings.defaultLikelihood = 'even'; }
        if (!this.settings.hexEventThreshold) { this.settings.hexEventThreshold = 5; }
        if (!this.settings.exportFormat) { this.settings.exportFormat = 'markdown'; }
        if (this.settings.resetDeckOnAdventureChange === undefined) { this.settings.resetDeckOnAdventureChange = false; }
        if (this.settings.autoOpenExploration === undefined) { this.settings.autoOpenExploration = true; }
    }

    applyAccentColor(color: string) {
        document.documentElement.style.setProperty('--opse-accent', color);
        // Derive soft version with 10% opacity
        document.documentElement.style.setProperty('--opse-accent-soft', `${color}1a`);
    }

    async saveSettings(settings?: OPSESettings) {
        if (settings) {this.settings = settings;}
        // Persist deck state when using persistent_deck mode
        if (this.settings.randomMode === 'persistent_deck' && this.deck) {
            const state = this.deck.getState();
            this.settings.deckCards = state.cards;
            this.settings.deckDiscard = state.discard;
        }
        await this.saveData(this.settings);
    }
}
