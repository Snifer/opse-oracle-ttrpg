import { ItemView, WorkspaceLeaf, setIcon, TFile, Notice, Setting } from 'obsidian';
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

export const VIEW_TYPE_OPSE_CONTROL = "opse-control-view";

export class ControlPanelView extends ItemView {
    plugin: OPSEOraclePlugin;

    constructor(leaf: WorkspaceLeaf, plugin: OPSEOraclePlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_OPSE_CONTROL;
    }

    getDisplayText() {
        return t().DASHBOARD.TITLE;
    }

    getIcon() {
        return "dice";
    }

    async onOpen() {
        this.refresh();
    }

    refresh() {
        const container = this.containerEl.children[1];
        container.empty();

        const mainRoot = container.createDiv({ cls: "opse-unified-root" });
        const activeAdventure = this.plugin.adventureManager.getActiveAdventure();

        const scrollRoot = mainRoot.createDiv({ cls: "opse-control-root" });

        // --- ADVENTURE / CAMPAIGN DASHBOARD ---
        if (activeAdventure) {
            const adventureDetails = scrollRoot.createEl("details", { cls: "opse-adventure-card" });
            adventureDetails.createEl("summary", { text: activeAdventure.title });

            const content = adventureDetails.createDiv({ cls: "opse-section-content" });

            // Scene Rank
            const rankRow = content.createDiv({ cls: "opse-rank-row" });
            rankRow.createSpan({ text: `${t().DASHBOARD.RANK}: `, cls: "opse-label" });
            rankRow.createSpan({ text: (activeAdventure.sceneRank ?? 1).toString(), cls: "opse-rank-value" });

            const rankControls = rankRow.createDiv({ cls: "opse-rank-controls" });
            const rankMinus = rankControls.createEl("button", { text: "-", cls: "opse-rank-btn" });
            rankMinus.addEventListener("click", async () => {
                await this.plugin.adventureManager.setSceneRank(activeAdventure.activeNotePath, (activeAdventure.sceneRank ?? 1) - 1);
                this.refresh();
            });

            const rankPlus = rankControls.createEl("button", { text: "+", cls: "opse-rank-btn" });
            rankPlus.addEventListener("click", async () => {
                await this.plugin.adventureManager.setSceneRank(activeAdventure.activeNotePath, (activeAdventure.sceneRank ?? 1) + 1);
                this.refresh();
            });

            // Threads Manager
            const threadSection = content.createDiv({ cls: "opse-thread-section" });
            threadSection.createEl("h5", { text: t().DASHBOARD.THREADS });
            const threadList = threadSection.createDiv({ cls: "opse-thread-list" });
            (activeAdventure.threads ?? []).forEach((thread, index) => {
                const item = threadList.createDiv({ cls: "opse-thread-item" });
                item.createSpan({ text: thread });
                const delBtn = item.createEl("button", { text: "×", cls: "opse-del-btn" });
                delBtn.addEventListener("click", async () => {
                    await this.plugin.adventureManager.removeThread(activeAdventure.activeNotePath, index);
                    this.refresh();
                });
            });

            const addThreadRow = threadSection.createDiv({ cls: "opse-add-thread" });
            const threadInput = addThreadRow.createEl("input", { attr: { placeholder: t().DASHBOARD.NEW_THREAD } });
            const addBtn = addThreadRow.createEl("button", { text: "+" });
            addBtn.addEventListener("click", async () => {
                if (threadInput.value) {
                    await this.plugin.adventureManager.addThread(activeAdventure.activeNotePath, threadInput.value);
                    this.refresh();
                }
            });
        }

        // --- CONTROLS SECTIONS ---

        // Aventura / Config
        this.createCollapsibleSection(scrollRoot, t().ADVENTURE.NEW, [
            { text: t().ADVENTURE.NEW, callback: () => new AdventureModal(this.app, this.plugin).open() }
        ], false);

        // Escena
        this.createCollapsibleSection(scrollRoot, t().SCENE.NEW, [
            { text: t().SCENE.GENERATE, callback: () => new SceneModal(this.app, this.plugin).open() },
            { text: t().SCENE.CHECK_ALTERATION, callback: () => this.handleCheckAlteration() },
            { text: t().SCENE.ALTERED_ONLY, callback: () => this.handleAlteredRoll() },
            { text: t().SCENE.COMPLICATION_BTN, callback: () => this.handleComplicationRoll() }
        ], true);

        // Oráculos
        this.createCollapsibleSection(scrollRoot, t().ORACLE.TITLE, [
            { text: t().ORACLE.ASK, callback: () => new OracleModal(this.app, this.plugin).open() },
            { text: t().ORACLE.HOW_MUCH, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-ask-how-much") }
        ], true);

        // Oráculo (Enfoque)
        this.createCollapsibleSection(scrollRoot, t().ORACLE.FOCUS_TITLE, [
            { text: t().ORACLE.ACTION, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-focus-action") },
            { text: t().ORACLE.DETAIL, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-focus-detail") },
            { text: t().ADVENTURE.DOUBLE_FOCUS, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-focus-double") }
        ], true);

        // Generadores Pro
        this.createCollapsibleSection(scrollRoot, t().DASHBOARD.GENERATORS, [
            { text: t().ADVENTURE.NPC, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-generate-npc") },
            { text: t().ADVENTURE.PLOT_TWIST, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-plot-twist") },
            { text: t().ADVENTURE.HOOK, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-generate-hook") },
            { text: t().ADVENTURE.GENERIC, callback: () => (this.app as any).commands.executeCommandById("opse-oracle:opse-generate-generic") }
        ], true);

        // Sesión
        this.createCollapsibleSection(scrollRoot, t().DASHBOARD.SESSION, [
            {
                text: t().DASHBOARD.EXPORTAR, callback: async () => {
                    const success = await ExportUtils.exportSession(this.app, this.plugin);
                    if (success) new Notice(t().EXPORT.SUCCESS);
                    else new Notice(t().EXPORT.ERROR);
                }
            },
            {
                text: t().DASHBOARD.BARAJAR, callback: () => {
                    this.plugin.deck.shuffle();
                    new Notice(t().DASHBOARD.SHUFFLE_SUCCESS);
                }
            }
        ], false);

        // Procedimientos (Collapsible)
        const helpDetails = scrollRoot.createEl("details", { cls: "opse-control-section opse-help-details" });
        helpDetails.createEl("summary", { text: t().HELP.TITLE });
        const helpContent = helpDetails.createDiv({ cls: "opse-section-content opse-help-content" });
        helpContent.createEl("p", { text: t().HELP.SCENE_STEREOTYPE });
        helpContent.createEl("p", { text: t().HELP.SCENE_ALTERED });
        helpContent.createEl("p", { text: t().HELP.EVENT_TRIGGER });
        helpContent.createEl("p", { text: t().HELP.GM_MOVES });

        // --- HISTORY SECTION ---
        const historyWrapper = mainRoot.createDiv({ cls: "opse-history-wrapper" });
        historyWrapper.createEl("h4", { text: t().DASHBOARD.HISTORY });
        const historyRoot = historyWrapper.createDiv({ cls: "opse-history-root" });

        const entries = this.plugin.historyManager.getHistory();
        if (entries.length === 0) {
            historyRoot.createEl("p", { text: t().DASHBOARD.NO_HISTORY, cls: "opse-muted" });
        } else {
            entries.forEach(entry => this.renderEntry(historyRoot, entry));
        }
    }

    private createCollapsibleSection(parent: HTMLElement, title: string, actions: { text: string, callback: () => void }[], open: boolean = false) {
        const details = parent.createEl("details", { cls: "opse-control-section" });
        if (open) details.setAttribute("open", "");
        details.createEl("summary", { text: title });

        const content = details.createDiv({ cls: "opse-section-content" });
        const grid = content.createDiv({ cls: "opse-control-grid" });

        actions.forEach(action => {
            const btn = grid.createEl("button", { text: action.text });
            btn.addEventListener("click", action.callback);
        });
    }

    private renderEntry(parent: HTMLElement, entry: HistoryEntry) {
        const card = parent.createDiv({ cls: `opse-history-card ${entry.pinned ? 'is-pinned' : ''}` });

        // Pin Button
        const pinBtn = card.createEl("button", { cls: `opse-pin-btn ${entry.pinned ? 'is-active' : ''}`, title: entry.pinned ? t().COMMON.UNPIN : t().COMMON.PIN });
        setIcon(pinBtn, "pin");
        pinBtn.addEventListener("click", async () => {
            entry.pinned = !entry.pinned;
            await this.plugin.saveSettings();
            this.refresh();
        });

        const header = card.createDiv({ cls: "opse-history-header" });
        header.createSpan({ text: entry.type.toUpperCase(), cls: "opse-type-tag" });
        header.createSpan({ text: new Date(entry.timestamp).toLocaleTimeString(), cls: "opse-timestamp" });

        if (entry.question) {
            card.createDiv({ text: entry.question, cls: "opse-history-question" });
        }

        const content = card.createDiv({ cls: "opse-history-content" });
        content.createEl("strong", { text: entry.answer });

        if (entry.domain) {
            card.createDiv({ text: entry.domain, cls: "opse-history-domain" });
        }

        card.createDiv({ text: entry.raw, cls: "opse-history-raw" });

        // Editable Interpretation
        const interpretationEdit = card.createEl("input", {
            cls: "opse-interpretation-edit",
            attr: {
                placeholder: t().METADATA.NOTE + "...",
                value: entry.interpretation || ""
            }
        });
        interpretationEdit.addEventListener("change", async (e) => {
            entry.interpretation = (e.target as HTMLInputElement).value;
            await this.plugin.saveSettings();
        });

        const actions = card.createDiv({ cls: "opse-history-actions" });

        const copyBtn = actions.createEl("button", { cls: "opse-action-btn", title: t().COMMON.COPY });
        setIcon(copyBtn, "copy");
        copyBtn.createSpan({ text: t().COMMON.COPY });
        copyBtn.addEventListener("click", () => {
            const formatted = MarkdownUtils.formatResult(
                entry.question ? `${t().METADATA.RESULT}: ${entry.question}` : entry.type,
                entry.answer,
                entry.raw,
                entry.domain,
                entry.interpretation
            );
            navigator.clipboard.writeText(formatted);
            new Notice(t().COMMON.COPIED);
        });

        const insertBtn = actions.createEl("button", { cls: "opse-action-btn", title: t().COMMON.INSERT });
        setIcon(insertBtn, "edit");
        insertBtn.createSpan({ text: t().COMMON.INSERT });
        insertBtn.addEventListener("click", async () => {
            const markdown = MarkdownUtils.formatResult(
                entry.question ? `${entry.type}: ${entry.question}` : entry.type,
                entry.answer,
                entry.raw,
                entry.domain,
                entry.interpretation
            );
            await MarkdownUtils.insertAtCursor(this.app, markdown, this.plugin.adventureManager.getActiveAdventure()?.activeNotePath);
        });

        const rerollBtn = actions.createEl("button", { cls: "opse-action-btn", title: t().COMMON.REROLL });
        setIcon(rerollBtn, "refresh-cw");
        rerollBtn.createSpan({ text: t().COMMON.REROLL });
        rerollBtn.addEventListener("click", () => {
            this.handleReroll(entry);
        });
    }

    private handleReroll(entry: HistoryEntry) {
        const commandsMap: Record<string, string> = {
            'yesno': 'opse-oracle:opse-ask-oracle',
            'howmuch': 'opse-oracle:opse-ask-how-much',
            'focus': 'opse-oracle:opse-focus-action',
            'event': 'opse-oracle:opse-random-event',
            'move': 'opse-oracle:opse-roll-beat-move',
            'npc': 'opse-oracle:opse-generate-npc',
            'hook': 'opse-oracle:opse-generate-hook'
        };

        const cmdId = commandsMap[entry.type];
        if (cmdId) {
            (this.app as any).commands.executeCommandById(cmdId);
        }
    }

    private async handleCheckAlteration() {
        const roll = Random.d(6);
        const isAltered = roll >= 5;
        const result = isAltered ? t().SCENE.ALTERED_NOTICE : t().SCENE.NOT_ALTERED;
        const meta = t().METADATA;
        const raw = `(1d6=${roll} ${isAltered ? `>= 5` : `< 5`})`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(),
            answer: result,
            raw: raw,
            timestamp: Date.now(),
            type: 'scene'
        });

        const markdown = MarkdownUtils.formatResult(t().SCENE.CHECK_ALTERATION, result, raw);
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);
        this.refresh();
        
        if (isAltered) {
            new Notice(result);
        }
    }

    private async handleAlteredRoll() {
        const roll = Random.d(6);
        const result = OPSE.getAltered(roll);
        const meta = t().METADATA;
        const raw = `(1d6=${roll} [${meta.RESULT}])`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(),
            answer: result,
            raw: raw,
            timestamp: Date.now(),
            type: 'scene'
        });

        const markdown = MarkdownUtils.formatResult(t().SCENE.ALTERED_ONLY, result, raw);
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);
        this.refresh();
    }

    private async handleComplicationRoll() {
        const roll = Random.d(6);
        const result = OPSE.getComplication(roll - 1);
        const meta = t().METADATA;
        const raw = `(1d6=${roll} [${meta.COMPLICATION}])`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(),
            answer: result,
            raw: raw,
            timestamp: Date.now(),
            type: 'scene'
        });

        const markdown = MarkdownUtils.formatResult(t().SCENE.COMPLICATION_BTN, result, raw);
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);
        this.refresh();
    }

    private async handleDirectOracle(likelihood: 'probable' | 'even' | 'improbable') {
        const strings = t().ORACLE;
        const roll = Random.roll2d6();
        const { answer, modifier } = OPSE.resolveYesNo(roll.d1, roll.d2, likelihood);

        let content = `${answer}${modifier ? ` ${modifier}` : ""}`;
        let raw = `(d1=${roll.d1} [Respuesta], d2=${roll.d2} [Mod], Prob: ${likelihood})`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(),
            answer: content,
            raw: raw,
            timestamp: Date.now(),
            type: 'yesno'
        });

        const markdown = MarkdownUtils.formatResult(t().ORACLE.YESNO_TITLE, content, raw);
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);
        this.refresh();
    }

    async onClose() {
        // Nothing to clean up
    }
}
