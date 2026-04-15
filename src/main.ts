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
        
        // Add Ribbon Icon
        this.addRibbonIcon('dice', 'OPSE control', () => {
            this.activateView(VIEW_TYPE_OPSE_CONTROL);
        });
        
        this.deck = new Deck();
        if (this.settings.randomMode === 'persistent_deck') {
            // Logic to restore deck state if it was saved?
            // For now, new deck on reload.
        }

        this.adventureManager = new AdventureStateManager(
            this.settings,
            async (s) => await this.saveSettings(s)
        );

        this.historyManager = new HistoryManager(
            this.settings.history,
            100,
            async (h) => {
                this.settings.history = h;
                await this.saveSettings();
                this.refreshViews();
            }
        );

        // Register View Creators
        this.registerView(VIEW_TYPE_OPSE_CONTROL, (leaf) => new ControlPanelView(leaf, this));
        this.registerView(VIEW_TYPE_OPSE_EXPLORATION, (leaf) => new ExplorationView(leaf, this));

        // Setting Tab
        this.addSettingTab(new OPSESettingTab(this.app, this));

        // Commands
        this.addCommand({
            id: 'opse-open-control',
            name: `OPSE: ${t().SETTINGS.OPEN_CONTROL}`,
            callback: () => this.activateView(VIEW_TYPE_OPSE_CONTROL)
        });

        this.addCommand({
            id: 'opse-open-history',
            name: `OPSE: ${t().SETTINGS.OPEN_HISTORY}`,
            callback: () => this.activateView(VIEW_TYPE_OPSE_CONTROL) // History is now in Control Panel
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

        // Register Modular Commands
        OracleCommands.registerCommands(this);
        GeneratorCommands.registerCommands(this);
        ExplorationCommands.registerCommands(this);

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
            await leaf.setViewState({ type, active: true });
        }

        workspace.revealLeaf(leaf);
    }

    refreshViews() {
        this.app.workspace.getLeavesOfType(VIEW_TYPE_OPSE_EXPLORATION).forEach(leaf => {
            if (leaf.view instanceof ExplorationView) leaf.view.refresh();
        });
        this.app.workspace.getLeavesOfType(VIEW_TYPE_OPSE_CONTROL).forEach(leaf => {
            if (leaf.view instanceof ControlPanelView) leaf.view.refresh();
        });
    }

    onunload() {
        console.log('OPSE Oracle plugin unloaded');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings(settings?: OPSESettings) {
        if (settings) this.settings = settings;
        await this.saveData(this.settings);
    }
}
