import { ItemView, WorkspaceLeaf, setIcon, Notice } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { DungeonState, DungeonRoom, DungeonManager } from '../core/dungeon';
import { RegionState, Hex, HexManager } from '../core/hex';

export const VIEW_TYPE_OPSE_EXPLORATION = "opse-exploration-view";

export class ExplorationView extends ItemView {
    plugin: OPSEOraclePlugin;

    constructor(leaf: WorkspaceLeaf, plugin: OPSEOraclePlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_OPSE_EXPLORATION;
    }

    getDisplayText() {
        return "OPSE Exploration";
    }

    getIcon() {
        return "map";
    }

    async onOpen() {
        this.refresh();
    }

    refresh() {
        const container = this.containerEl.children[1];
        container.empty();
        
        const activeAdventure = this.plugin.adventureManager.getActiveAdventure();
        if (!activeAdventure) {
            container.createEl("p", { text: "No active adventure. Start one to enable exploration trackers.", cls: "opse-muted" });
            return;
        }

        const explorationRoot = container.createDiv({ cls: "opse-exploration-root" });

        // Dungeon Tracker
        if (activeAdventure.dungeonId && this.plugin.settings.dungeons[activeAdventure.dungeonId]) {
            this.renderDungeon(explorationRoot, this.plugin.settings.dungeons[activeAdventure.dungeonId]);
        }

        // Region Tracker
        if (activeAdventure.regionId && this.plugin.settings.regions[activeAdventure.regionId]) {
            this.renderRegion(explorationRoot, this.plugin.settings.regions[activeAdventure.regionId]);
        }

        if (!activeAdventure.dungeonId && !activeAdventure.regionId) {
            container.createEl("p", { text: "No active dungeon or region. Use the command palette to start exploring." });
        }
    }

    private renderDungeon(parent: HTMLElement, dungeon: DungeonState) {
        const card = parent.createDiv({ cls: "opse-exploration-card" });
        card.createEl("h3", { text: `Dungeon: ${dungeon.name}` });
        card.createEl("p", { text: `${dungeon.themeAppearance} / ${dungeon.themeFunction}`, cls: "opse-muted" });

        const currentRoom = dungeon.currentRoomId ? dungeon.rooms[dungeon.currentRoomId] : null;
        if (currentRoom) {
            const roomEl = card.createDiv({ cls: "opse-current-location" });
            roomEl.createEl("h4", { text: `Sala: ${currentRoom.name}` });
            roomEl.createEl("p", { text: `📍 ${currentRoom.location}` });
            roomEl.createEl("p", { text: `💀 ${currentRoom.encounter}` });
            roomEl.createEl("p", { text: `💎 ${currentRoom.object}` });
            roomEl.createEl("p", { text: `🚪 Exits: ${currentRoom.exits}` });

            // Interactive Controls
            const controls = card.createDiv({ cls: "opse-exploration-controls" });
            
            // Backtracking (Move to connected rooms)
            if (currentRoom.connectedTo.length > 0) {
                const backRow = controls.createDiv({ cls: "opse-navigation-row" });
                backRow.createEl("span", { text: "Volver a: ", cls: "opse-label" });
                currentRoom.connectedTo.forEach(targetId => {
                    const targetRoom = dungeon.rooms[targetId];
                    if (targetRoom) {
                        const btn = backRow.createEl("button", { text: targetRoom.name, cls: "opse-nav-btn" });
                        btn.addEventListener("click", async () => {
                            dungeon.currentRoomId = targetId;
                            dungeon.path.push(`Retroceder: ${targetRoom.name}`);
                            await this.plugin.saveSettings();
                            this.refresh();
                        });
                    }
                });
            }

            if (currentRoom.exits > 0) {
                const exploreBtn = controls.createEl("button", { text: "Explorar nueva área", cls: "opse-action-btn" });
                exploreBtn.addEventListener("click", async () => {
                    DungeonManager.moveToNextRoom(dungeon);
                    await this.plugin.saveSettings();
                    this.refresh();
                });
            } else {
                controls.createEl("p", { text: "No quedan salidas en esta sala.", cls: "opse-alert" });
            }

            // Note adding
            const noteInput = card.createEl("textarea", { cls: "opse-interpretation-edit", attr: { placeholder: "Añadir notas a la sala...", value: currentRoom.notes || "" } });
            noteInput.addEventListener("change", async (e) => {
                currentRoom.notes = (e.target as HTMLTextAreaElement).value;
                await this.plugin.saveSettings();
            });
        }

        // Path Map
        this.renderPathMap(card, dungeon.path);
    }

    private renderRegion(parent: HTMLElement, region: RegionState) {
        const card = parent.createDiv({ cls: "opse-exploration-card" });
        card.createEl("h3", { text: `Region: ${region.name}` });
        
        const currentHex = region.hexes[`${region.currentHex.q},${region.currentHex.r}`];
        if (currentHex) {
            const hexEl = card.createDiv({ cls: "opse-current-location" });
            hexEl.createEl("h4", { text: `Hex: (${currentHex.q}, ${currentHex.r})` });
            hexEl.createEl("p", { text: `🌲 ${currentHex.terrain}` });
            hexEl.createEl("p", { text: `🏛️ ${currentHex.contents}` });
            hexEl.createEl("p", { text: `✨ ${currentHex.trait}` });

            // Interactive Compass
            card.createEl("h5", { text: "Moverse:" });
            const compass = card.createDiv({ cls: "opse-compass-grid" });
            const directions: ("NW" | "N" | "NE" | "SW" | "S" | "SE")[] = ["NW", "N", "NE", "SW", "S", "SE"];
            
            directions.forEach(dir => {
                const btn = compass.createEl("button", { text: dir });
                btn.addEventListener("click", async () => {
                    HexManager.moveToNeighbor(region, dir);
                    await this.plugin.saveSettings();
                    this.refresh();
                });
            });

            // Note adding
            const noteInput = card.createEl("textarea", { cls: "opse-interpretation-edit", attr: { placeholder: "Añadir notas al hexágono...", value: currentHex.notes || "" } });
            noteInput.addEventListener("change", async (e) => {
                currentHex.notes = (e.target as HTMLTextAreaElement).value;
                await this.plugin.saveSettings();
            });
        }

        // Path Map
        this.renderPathMap(card, region.path);
    }

    private renderPathMap(parent: HTMLElement, path: string[]) {
        if (path && path.length > 0) {
            const mapEl = parent.createDiv({ cls: "opse-path-map" });
            mapEl.createEl("h5", { text: "Mapa de Ruta:" });
            const pathText = path.join(" ➔ ");
            mapEl.createDiv({ text: pathText, cls: "opse-path-text" });
        }
    }
}
