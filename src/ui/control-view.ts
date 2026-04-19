import { ItemView, WorkspaceLeaf, setIcon, Notice } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { OracleModal } from './modals/oracle-modal';
import { SceneModal } from './modals/scene-modal';
import { AdventureModal } from './modals/adventure-modal';
import { t } from '../i18n/i18n';
import { HistoryEntry } from '../types';
import { MarkdownUtils } from '../utils/markdown';
import { ExportUtils } from '../utils/exporter';
import { Random } from '../core/random';
import { OPSE } from '../core/opse';

export const VIEW_TYPE_OPSE_CONTROL = 'opse-control-view';

type DashboardTab = 'scene' | 'oracle' | 'generators' | 'explore' | 'session';
type HistoryFilter = 'all' | 'yesno' | 'howmuch' | 'focus' | 'event' | 'scene' | 'move' | 'npc' | 'hook' | 'dungeon' | 'hex';

const MIN_TAB_HEIGHT = 80;
const MIN_HISTORY_HEIGHT = 80;

export class ControlPanelView extends ItemView {
    plugin: OPSEOraclePlugin;
    private activeTab: DashboardTab = 'oracle';
    private activeFilter: HistoryFilter = 'all';

    constructor(leaf: WorkspaceLeaf, plugin: OPSEOraclePlugin) {
        super(leaf);
        this.plugin = plugin;
        // Use configured default tab on first open
        this.activeTab = plugin.settings.defaultTab ?? 'oracle';
    }

    getViewType() { return VIEW_TYPE_OPSE_CONTROL; }
    getDisplayText() { return t().DASHBOARD.TITLE; }
    getIcon() { return 'dice'; }

    async onOpen() { this.refresh(); }

    refresh() {
        const container = this.containerEl.children[1];
        container.empty();

        const root = container.createDiv({ cls: 'opse-unified-root' });

        // --- ADVENTURE CARD (always visible) ---
        const activeAdventure = this.plugin.adventureManager.getActiveAdventure();
        if (activeAdventure) {
            const adventureCard = root.createEl('details', { cls: 'opse-adventure-card' });
            adventureCard.createEl('summary', { text: activeAdventure.title });
            const cardContent = adventureCard.createDiv({ cls: 'opse-section-content' });

            // Scene rank controls
            const rankRow = cardContent.createDiv({ cls: 'opse-rank-row' });
            rankRow.createSpan({ text: `${t().DASHBOARD.RANK}: `, cls: 'opse-label' });
            rankRow.createSpan({ text: (activeAdventure.sceneRank ?? 1).toString(), cls: 'opse-rank-value' });
            const rankControls = rankRow.createDiv({ cls: 'opse-rank-controls' });
            rankControls.createEl('button', { text: '-', cls: 'opse-rank-btn' })
                .addEventListener('click', async () => {
                    await this.plugin.adventureManager.setSceneRank(activeAdventure.activeNotePath, (activeAdventure.sceneRank ?? 1) - 1);
                    this.refresh();
                });
            rankControls.createEl('button', { text: '+', cls: 'opse-rank-btn' })
                .addEventListener('click', async () => {
                    await this.plugin.adventureManager.setSceneRank(activeAdventure.activeNotePath, (activeAdventure.sceneRank ?? 1) + 1);
                    this.refresh();
                });

            // Thread manager
            const threadSection = cardContent.createDiv({ cls: 'opse-thread-section' });
            threadSection.createEl('h5', { text: t().DASHBOARD.THREADS });
            const threadList = threadSection.createDiv({ cls: 'opse-thread-list' });
            (activeAdventure.threads ?? []).forEach((thread, index) => {
                const item = threadList.createDiv({ cls: 'opse-thread-item' });
                item.createSpan({ text: thread });
                item.createEl('button', { text: '×', cls: 'opse-del-btn' })
                    .addEventListener('click', async () => {
                        await this.plugin.adventureManager.removeThread(activeAdventure.activeNotePath, index);
                        this.refresh();
                    });
            });
            const addRow = threadSection.createDiv({ cls: 'opse-add-thread' });
            const threadInput = addRow.createEl('input', { attr: { placeholder: t().DASHBOARD.NEW_THREAD } });
            addRow.createEl('button', { text: '+' })
                .addEventListener('click', async () => {
                    if (threadInput.value) {
                        await this.plugin.adventureManager.addThread(activeAdventure.activeNotePath, threadInput.value);
                        this.refresh();
                    }
                });
        }

        // --- TAB BAR ---
        const tabDefs: { id: DashboardTab, label: string }[] = [
            { id: 'scene',      label: t().DASHBOARD.TAB_SCENE },
            { id: 'oracle',     label: t().DASHBOARD.TAB_ORACLE },
            { id: 'generators', label: t().DASHBOARD.TAB_GENERATORS },
            { id: 'explore',    label: t().DASHBOARD.TAB_EXPLORE },
            { id: 'session',    label: t().DASHBOARD.TAB_SESSION }
        ];

        const tabBar = root.createDiv({ cls: 'opse-tab-bar opse-dashboard-tabs' });
        tabDefs.forEach(({ id, label }) => {
            tabBar.createEl('button', {
                text: label,
                cls: `opse-tab ${this.activeTab === id ? 'is-active' : ''}`
            }).addEventListener('click', () => {
                this.activeTab = id;
                this.refresh();
            });
        });

        // --- TAB CONTENT (resizable) ---
        const tabContentHeight = this.plugin.settings.tabContentHeight;
        const tabContent = root.createDiv({ cls: 'opse-tab-content' });
        tabContent.style.height = `${tabContentHeight}px`;

        switch (this.activeTab) {
            case 'scene':      this.renderSceneTab(tabContent); break;
            case 'oracle':     this.renderOracleTab(tabContent); break;
            case 'generators': this.renderGeneratorsTab(tabContent); break;
            case 'explore':    this.renderExploreTab(tabContent); break;
            case 'session':    this.renderSessionTab(tabContent); break;
        }

        // --- RESIZE HANDLE ---
        const resizeHandle = root.createDiv({ cls: 'opse-resize-handle' });
        resizeHandle.title = 'Drag to resize';
        this.attachResizeHandler(resizeHandle, tabContent);

        // --- HISTORY (always visible at bottom) ---
        const historyWrapper = root.createDiv({ cls: 'opse-history-wrapper' });
        const historyHeader = historyWrapper.createDiv({ cls: 'opse-history-header-row' });
        historyHeader.createEl('h4', { text: t().DASHBOARD.HISTORY });

        // Filter bar
        const filterBar = historyWrapper.createDiv({ cls: 'opse-filter-bar' });
        filterBar.createSpan({ text: t().DASHBOARD.FILTER_LABEL, cls: 'opse-label' });

        const filterTypes: { key: HistoryFilter, label: string }[] = [
            { key: 'all',     label: t().DASHBOARD.FILTER_ALL },
            { key: 'yesno',   label: 'S/N' },
            { key: 'howmuch', label: '?' },
            { key: 'focus',   label: 'Foco' },
            { key: 'event',   label: 'Evento' },
            { key: 'scene',   label: 'Escena' },
            { key: 'move',    label: 'Mov.' },
            { key: 'npc',     label: 'PNJ' },
            { key: 'hook',    label: 'Gancho' }
        ];
        filterTypes.forEach(({ key, label }) => {
            filterBar.createEl('button', {
                text: label,
                cls: `opse-filter-btn ${this.activeFilter === key ? 'is-active' : ''}`
            }).addEventListener('click', () => {
                this.activeFilter = key;
                this.refresh();
            });
        });

        // History entries
        const compact = this.plugin.settings.compactHistory;
        const historyRoot = historyWrapper.createDiv({ cls: `opse-history-root${compact ? ' is-compact' : ''}` });

        let allEntries = this.plugin.historyManager.getHistory();
        // Apply sort order
        if (this.plugin.settings.historyOrder === 'oldest') {
            allEntries = [...allEntries].reverse();
        }
        const entries = this.activeFilter === 'all'
            ? allEntries
            : allEntries.filter(e => e.type === this.activeFilter);

        if (entries.length === 0) {
            historyRoot.createEl('p', { text: t().DASHBOARD.NO_HISTORY, cls: 'opse-muted' });
        } else {
            entries.forEach(entry => this.renderEntry(historyRoot, entry));
        }
    }

    // ── Tab renderers ──────────────────────────────────────────────────────────

    private renderSceneTab(parent: HTMLElement) {
        this.renderButtonGroup(parent, t().SCENE.NEW, [
            { text: t().SCENE.GENERATE,          callback: () => new SceneModal(this.app, this.plugin).open() },
            { text: t().SCENE.CHECK_ALTERATION,  callback: () => this.handleCheckAlteration() },
            { text: t().SCENE.ALTERED_ONLY,      callback: () => this.handleAlteredRoll() },
            { text: t().SCENE.COMPLICATION_BTN,  callback: () => this.handleComplicationRoll() }
        ]);

        this.renderButtonGroup(parent, t().DASHBOARD.GM_MOVES, [
            { text: t().ORACLE.CMD_BEAT_MOVE,    callback: () => this.execCmd('opse-roll-beat-move') },
            { text: t().ORACLE.CMD_FAILURE_MOVE, callback: () => this.execCmd('opse-roll-failure-move') }
        ]);

        // Help section
        const helpEl = parent.createDiv({ cls: 'opse-help-content opse-tab-help' });
        helpEl.createEl('p', { text: t().HELP.SCENE_STEREOTYPE });
        helpEl.createEl('p', { text: t().HELP.SCENE_ALTERED });
        helpEl.createEl('p', { text: t().HELP.EVENT_TRIGGER });
        helpEl.createEl('p', { text: t().HELP.GM_MOVES });
    }

    private renderOracleTab(parent: HTMLElement) {
        this.renderButtonGroup(parent, t().ORACLE.TITLE, [
            { text: t().ORACLE.ASK,     callback: () => new OracleModal(this.app, this.plugin).open() },
            { text: t().ORACLE.HOW_MUCH, callback: () => this.execCmd('opse-ask-how-much') }
        ]);

        this.renderButtonGroup(parent, t().ORACLE.FOCUS_TITLE, [
            { text: t().ORACLE.ACTION,        callback: () => this.execCmd('opse-focus-action') },
            { text: t().ORACLE.DETAIL,        callback: () => this.execCmd('opse-focus-detail') },
            { text: t().ORACLE.THEME,         callback: () => this.execCmd('opse-focus-theme') },
            { text: t().ADVENTURE.DOUBLE_FOCUS, callback: () => this.execCmd('opse-focus-double') }
        ]);
    }

    private renderGeneratorsTab(parent: HTMLElement) {
        this.renderButtonGroup(parent, t().DASHBOARD.GENERATORS, [
            { text: t().ADVENTURE.NPC,        callback: () => this.execCmd('opse-generate-npc') },
            { text: t().ADVENTURE.HOOK,       callback: () => this.execCmd('opse-generate-hook') },
            { text: t().ADVENTURE.GENERIC,    callback: () => this.execCmd('opse-generate-generic') },
            { text: t().ADVENTURE.PLOT_TWIST, callback: () => this.execCmd('opse-plot-twist') },
            { text: t().ADVENTURE.FLAVOR,     callback: () => this.execCmd('opse-flavor') },
            { text: 'Random Event',           callback: () => this.execCmd('opse-random-event') }
        ]);
    }

    private renderExploreTab(parent: HTMLElement) {
        this.renderButtonGroup(parent, t().DASHBOARD.EXPLORATION, [
            { text: t().DASHBOARD.DUNGEON_BTN, callback: () => this.execCmd('opse-create-dungeon') },
            { text: t().DASHBOARD.HEX_BTN,     callback: () => this.execCmd('opse-create-hex-region') },
            { text: t().DASHBOARD.EXPLORE_BTN, callback: () => this.execCmd('opse-explore-room') }
        ]);
    }

    private renderSessionTab(parent: HTMLElement) {
        this.renderButtonGroup(parent, t().ADVENTURE.NEW, [
            { text: t().ADVENTURE.NEW, callback: () => new AdventureModal(this.app, this.plugin).open() }
        ]);

        this.renderButtonGroup(parent, t().DASHBOARD.SESSION, [
            {
                text: t().DASHBOARD.EXPORTAR, callback: async () => {
                    const success = await ExportUtils.exportSession(this.app, this.plugin);
                    new Notice(success ? t().EXPORT.SUCCESS : t().EXPORT.ERROR);
                }
            },
            {
                text: t().DASHBOARD.BARAJAR, callback: () => {
                    this.plugin.deck.shuffle();
                    new Notice(t().DASHBOARD.SHUFFLE_SUCCESS);
                    this.refresh();
                }
            }
        ]);

        // Deck info when using card mode
        const mode = this.plugin.settings.randomMode;
        if (mode !== 'dice') {
            const remaining = this.plugin.deck.getRemainingCount();
            const total = remaining + this.plugin.deck.getDiscardCount();
            parent.createDiv({ cls: 'opse-deck-info' })
                .createSpan({ text: `${t().DASHBOARD.DECK_INFO} ${remaining}/${total}`, cls: 'opse-muted' });
        }
    }

    // ── Shared helpers ─────────────────────────────────────────────────────────

    private renderButtonGroup(parent: HTMLElement, title: string, actions: { text: string, callback: () => void }[]) {
        const section = parent.createDiv({ cls: 'opse-tab-section' });
        section.createEl('h5', { text: title, cls: 'opse-section-label' });
        const grid = section.createDiv({ cls: 'opse-control-grid' });
        actions.forEach(({ text, callback }) => {
            grid.createEl('button', { text }).addEventListener('click', callback);
        });
    }

    private execCmd(id: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.app as any).commands.executeCommandById(`opse-oracle:${id}`);
    }

    // ── History entry renderer ──────────────────────────────────────────────────

    private renderEntry(parent: HTMLElement, entry: HistoryEntry) {
        const card = parent.createDiv({ cls: `opse-history-card ${entry.pinned ? 'is-pinned' : ''}` });

        const pinBtn = card.createEl('button', {
            cls: `opse-pin-btn ${entry.pinned ? 'is-active' : ''}`,
            title: entry.pinned ? t().COMMON.UNPIN : t().COMMON.PIN
        });
        setIcon(pinBtn, 'pin');
        pinBtn.addEventListener('click', async () => {
            entry.pinned = !entry.pinned;
            await this.plugin.saveSettings();
            this.refresh();
        });

        const header = card.createDiv({ cls: 'opse-history-header' });
        header.createSpan({ text: entry.type.toUpperCase(), cls: 'opse-type-tag' });
        header.createSpan({ text: this.formatTimestamp(entry.timestamp), cls: 'opse-timestamp' });

        if (entry.question) {
            card.createDiv({ text: entry.question, cls: 'opse-history-question' });
        }

        card.createDiv({ cls: 'opse-history-content' })
            .createEl('strong', { text: entry.answer });

        if (entry.domain) {
            card.createDiv({ text: entry.domain, cls: 'opse-history-domain' });
        }

        card.createDiv({ text: entry.raw, cls: 'opse-history-raw' });

        const interpretationEdit = card.createEl('input', {
            cls: 'opse-interpretation-edit',
            attr: { placeholder: `${t().METADATA.NOTE}...`, value: entry.interpretation || '' }
        });
        interpretationEdit.addEventListener('change', async (e) => {
            entry.interpretation = (e.target as HTMLInputElement).value;
            await this.plugin.saveSettings();
        });

        const actionsEl = card.createDiv({ cls: 'opse-history-actions' });

        const copyBtn = actionsEl.createEl('button', { cls: 'opse-action-btn', title: t().COMMON.COPY });
        setIcon(copyBtn, 'copy');
        copyBtn.createSpan({ text: t().COMMON.COPY });
        copyBtn.addEventListener('click', () => {
            const formatted = MarkdownUtils.formatResult(
                entry.question ? `${t().METADATA.RESULT}: ${entry.question}` : entry.type,
                entry.answer, entry.raw, entry.domain, entry.interpretation
            );
            navigator.clipboard.writeText(formatted);
            new Notice(t().COMMON.COPIED);
        });

        const insertBtn = actionsEl.createEl('button', { cls: 'opse-action-btn', title: t().COMMON.INSERT });
        setIcon(insertBtn, 'edit');
        insertBtn.createSpan({ text: t().COMMON.INSERT });
        insertBtn.addEventListener('click', async () => {
            const markdown = MarkdownUtils.formatResult(
                entry.question ? `${entry.type}: ${entry.question}` : entry.type,
                entry.answer, entry.raw, entry.domain, entry.interpretation
            );
            await MarkdownUtils.insertAtCursor(this.app, markdown, this.plugin.adventureManager.getActiveAdventure()?.activeNotePath);
        });

        const rerollBtn = actionsEl.createEl('button', { cls: 'opse-action-btn', title: t().COMMON.REROLL });
        setIcon(rerollBtn, 'refresh-cw');
        rerollBtn.createSpan({ text: t().COMMON.REROLL });
        rerollBtn.addEventListener('click', () => this.handleReroll(entry));
    }

    private formatTimestamp(ts: number): string {
        const fmt = this.plugin.settings.timestampFormat ?? 'time';
        const date = new Date(ts);
        if (fmt === 'datetime') {
            return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        }
        if (fmt === 'relative') {
            const diff = Date.now() - ts;
            const mins = Math.floor(diff / 60000);
            if (mins < 1) { return 'ahora'; }
            if (mins < 60) { return `hace ${mins} min`; }
            const hours = Math.floor(mins / 60);
            if (hours < 24) { return `hace ${hours} h`; }
            return `hace ${Math.floor(hours / 24)} d`;
        }
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    private handleReroll(entry: HistoryEntry) {
        const map: Record<string, string> = {
            'yesno':   'opse-ask-oracle',
            'howmuch': 'opse-ask-how-much',
            'focus':   'opse-focus-action',
            'event':   'opse-random-event',
            'move':    'opse-roll-beat-move',
            'npc':     'opse-generate-npc',
            'hook':    'opse-generate-hook',
            'scene':   'opse-set-scene',
            'dungeon': 'opse-create-dungeon',
            'hex':     'opse-create-hex-region'
        };
        const cmdId = map[entry.type];
        if (cmdId) { this.execCmd(cmdId); }
    }

    // ── Scene helpers ──────────────────────────────────────────────────────────

    private async handleCheckAlteration() {
        const roll = Random.d(6);
        const isAltered = roll >= 5;
        const result = isAltered ? t().SCENE.ALTERED_NOTICE : t().SCENE.NOT_ALTERED;
        const raw = `(1d6=${roll} ${isAltered ? '>= 5' : '< 5'})`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(), answer: result, raw, timestamp: Date.now(), type: 'scene'
        });

        await MarkdownUtils.smartInsert(this.app, this.plugin, MarkdownUtils.formatResult(t().SCENE.CHECK_ALTERATION, result, raw));
        this.refresh();
        if (isAltered) { new Notice(result); }
    }

    private async handleAlteredRoll() {
        const roll = Random.d(6);
        const result = OPSE.getAltered(roll);
        const raw = `(1d6=${roll} [${t().METADATA.RESULT}])`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(), answer: result, raw, timestamp: Date.now(), type: 'scene'
        });

        await MarkdownUtils.smartInsert(this.app, this.plugin, MarkdownUtils.formatResult(t().SCENE.ALTERED_ONLY, result, raw));
        this.refresh();
    }

    private async handleComplicationRoll() {
        const roll = Random.d(6);
        const result = OPSE.getComplication(roll - 1);
        const raw = `(1d6=${roll} [${t().METADATA.COMPLICATION}])`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(), answer: result, raw, timestamp: Date.now(), type: 'scene'
        });

        await MarkdownUtils.smartInsert(this.app, this.plugin, MarkdownUtils.formatResult(t().SCENE.COMPLICATION_BTN, result, raw));
        this.refresh();
    }

    private attachResizeHandler(handle: HTMLElement, tabContent: HTMLElement) {
        let dragging = false;
        let startY = 0;
        let startHeight = 0;

        const onMouseMove = (e: MouseEvent) => {
            if (!dragging) { return; }
            const delta = e.clientY - startY;
            const newHeight = Math.max(MIN_TAB_HEIGHT, startHeight + delta);

            // Clamp so history always has at least MIN_HISTORY_HEIGHT visible
            const rootHeight = handle.closest('.opse-unified-root')?.getBoundingClientRect().height ?? 600;
            const clamped = Math.min(newHeight, rootHeight - MIN_HISTORY_HEIGHT - 40);

            tabContent.style.height = `${clamped}px`;
        };

        const onMouseUp = async () => {
            if (!dragging) { return; }
            dragging = false;
            handle.classList.remove('is-dragging');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Persist new height
            const newHeight = parseInt(tabContent.style.height, 10);
            if (!isNaN(newHeight)) {
                this.plugin.settings.tabContentHeight = newHeight;
                await this.plugin.saveSettings();
            }
        };

        handle.addEventListener('mousedown', (e) => {
            dragging = true;
            startY = e.clientY;
            startHeight = tabContent.getBoundingClientRect().height;
            handle.classList.add('is-dragging');
            e.preventDefault();
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    async onClose() {
        // Nothing to clean up
    }
}
