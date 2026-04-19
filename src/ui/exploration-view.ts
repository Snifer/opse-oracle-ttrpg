import { ItemView, WorkspaceLeaf } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { DungeonState, DungeonManager } from '../core/dungeon';
import { RegionState, HexManager } from '../core/hex';
import { t } from '../i18n/i18n';

export const VIEW_TYPE_OPSE_EXPLORATION = 'opse-exploration-view';

type ExplorationTab = 'dungeon' | 'hex';

export class ExplorationView extends ItemView {
    plugin: OPSEOraclePlugin;
    private activeTab: ExplorationTab = 'dungeon';

    constructor(leaf: WorkspaceLeaf, plugin: OPSEOraclePlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_OPSE_EXPLORATION;
    }

    getDisplayText() {
        return 'OPSE Exploration';
    }

    getIcon() {
        return 'map';
    }

    async onOpen() {
        this.refresh();
    }

    refresh() {
        const container = this.containerEl.children[1];
        container.empty();

        const activeAdventure = this.plugin.adventureManager.getActiveAdventure();
        if (!activeAdventure) {
            container.createEl('p', { text: t().EXPLORATION.NO_EXPLORATION, cls: 'opse-muted' });
            return;
        }

        const hasDungeon = !!(activeAdventure.dungeonId && this.plugin.settings.dungeons[activeAdventure.dungeonId]);
        const hasRegion = !!(activeAdventure.regionId && this.plugin.settings.regions[activeAdventure.regionId]);

        if (!hasDungeon && !hasRegion) {
            container.createEl('p', { text: t().EXPLORATION.NO_EXPLORATION, cls: 'opse-muted' });
            return;
        }

        // Auto-select tab if only one type exists
        if (!hasDungeon && hasRegion) { this.activeTab = 'hex'; }
        if (hasDungeon && !hasRegion) { this.activeTab = 'dungeon'; }

        // Tab bar
        const tabBar = container.createDiv({ cls: 'opse-tab-bar' });

        if (hasDungeon) {
            const dungeonTab = tabBar.createEl('button', {
                text: t().DASHBOARD.TAB_DUNGEON,
                cls: `opse-tab ${this.activeTab === 'dungeon' ? 'is-active' : ''}`
            });
            dungeonTab.addEventListener('click', () => {
                this.activeTab = 'dungeon';
                this.refresh();
            });
        }

        if (hasRegion) {
            const hexTab = tabBar.createEl('button', {
                text: t().DASHBOARD.TAB_HEX,
                cls: `opse-tab ${this.activeTab === 'hex' ? 'is-active' : ''}`
            });
            hexTab.addEventListener('click', () => {
                this.activeTab = 'hex';
                this.refresh();
            });
        }

        const explorationRoot = container.createDiv({ cls: 'opse-exploration-root' });

        if (this.activeTab === 'dungeon' && hasDungeon) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.renderDungeon(explorationRoot, this.plugin.settings.dungeons[activeAdventure.dungeonId!]);
        } else if (this.activeTab === 'hex' && hasRegion) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.renderRegion(explorationRoot, this.plugin.settings.regions[activeAdventure.regionId!]);
        }
    }

    private renderDungeon(parent: HTMLElement, dungeon: DungeonState) {
        const strings = t().EXPLORATION;
        const card = parent.createDiv({ cls: 'opse-exploration-card' });
        card.createEl('h3', { text: `${strings.DUNGEON_TITLE}: ${dungeon.name}` });
        card.createEl('p', { text: `${dungeon.themeAppearance} / ${dungeon.themeFunction}`, cls: 'opse-muted' });

        const currentRoom = dungeon.currentRoomId ? dungeon.rooms[dungeon.currentRoomId] : null;
        if (!currentRoom) { return; }

        const roomEl = card.createDiv({ cls: 'opse-current-location' });
        roomEl.createEl('h4', { text: `${strings.CURRENT_ROOM}: ${currentRoom.name}` });
        roomEl.createEl('p', { text: `📍 ${currentRoom.location}` });
        roomEl.createEl('p', { text: `⚔️ ${currentRoom.encounter}` });
        roomEl.createEl('p', { text: `💎 ${currentRoom.object}` });
        roomEl.createEl('p', { text: `🚪 ${currentRoom.exits}` });

        const controls = card.createDiv({ cls: 'opse-exploration-controls' });

        if (currentRoom.connectedTo.length > 0) {
            const backRow = controls.createDiv({ cls: 'opse-navigation-row' });
            backRow.createEl('span', { text: strings.BACKTRACK, cls: 'opse-label' });
            currentRoom.connectedTo.forEach(targetId => {
                const targetRoom = dungeon.rooms[targetId];
                if (targetRoom) {
                    backRow.createEl('button', { text: targetRoom.name, cls: 'opse-nav-btn' })
                        .addEventListener('click', async () => {
                            dungeon.currentRoomId = targetId;
                            dungeon.path.push(`↩ ${targetRoom.name}`);
                            await this.plugin.saveSettings();
                            this.refresh();
                        });
                }
            });
        }

        if (currentRoom.exits > 0) {
            controls.createEl('button', { text: strings.EXPLORE_NEXT, cls: 'opse-action-btn' })
                .addEventListener('click', async () => {
                    DungeonManager.moveToNextRoom(dungeon);
                    await this.plugin.saveSettings();
                    this.refresh();
                });
        } else {
            controls.createEl('p', { text: strings.NO_EXITS, cls: 'opse-alert' });
        }

        const noteInput = card.createEl('textarea', {
            cls: 'opse-interpretation-edit',
            attr: { placeholder: strings.ADD_NOTES, value: currentRoom.notes || '' }
        });
        noteInput.addEventListener('change', async (e) => {
            currentRoom.notes = (e.target as HTMLTextAreaElement).value;
            await this.plugin.saveSettings();
        });

        this.renderPathMap(card, dungeon.path);
    }

    private renderRegion(parent: HTMLElement, region: RegionState) {
        const strings = t().EXPLORATION;
        const card = parent.createDiv({ cls: 'opse-exploration-card' });
        card.createEl('h3', { text: `${strings.HEX_TITLE}: ${region.name}` });

        const currentHex = region.hexes[`${region.currentHex.q},${region.currentHex.r}`];
        if (!currentHex) { return; }

        const hexEl = card.createDiv({ cls: 'opse-current-location' });
        hexEl.createEl('h4', { text: `Hex: (${currentHex.q}, ${currentHex.r})` });
        hexEl.createEl('p', { text: `🌲 ${currentHex.terrain}` });
        hexEl.createEl('p', { text: `🏛️ ${currentHex.contents}` });
        if (currentHex.trait) {
            hexEl.createEl('p', { text: `✨ ${currentHex.trait}` });
        }
        if (currentHex.eventTriggered) {
            hexEl.createEl('p', { text: '⚡ Evento disparado', cls: 'opse-alert' });
        }

        card.createEl('h5', { text: strings.MOVE });
        const compass = card.createDiv({ cls: 'opse-compass-grid' });
        const directions: ('NW' | 'N' | 'NE' | 'SW' | 'S' | 'SE')[] = ['NW', 'N', 'NE', 'SW', 'S', 'SE'];
        directions.forEach(dir => {
            compass.createEl('button', { text: dir })
                .addEventListener('click', async () => {
                    HexManager.moveToNeighbor(region, dir);
                    await this.plugin.saveSettings();
                    this.refresh();
                });
        });

        const noteInput = card.createEl('textarea', {
            cls: 'opse-interpretation-edit',
            attr: { placeholder: strings.ADD_NOTES, value: currentHex.notes || '' }
        });
        noteInput.addEventListener('change', async (e) => {
            currentHex.notes = (e.target as HTMLTextAreaElement).value;
            await this.plugin.saveSettings();
        });

        this.renderPathMap(card, region.path);
    }

    private renderPathMap(parent: HTMLElement, path: string[]) {
        if (!path || path.length === 0) { return; }
        const mapEl = parent.createDiv({ cls: 'opse-path-map' });
        mapEl.createEl('h5', { text: t().EXPLORATION.PATH_MAP });
        mapEl.createDiv({ text: path.join(' ➔ '), cls: 'opse-path-text' });
    }
}
