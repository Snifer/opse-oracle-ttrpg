import { App, Notice } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { DungeonModal } from '../ui/modals/dungeon-modal';
import { HexModal } from '../ui/modals/hex-modal';
import { DungeonManager } from '../core/dungeon';
import { HexManager } from '../core/hex';
import { VIEW_TYPE_OPSE_EXPLORATION } from '../ui/exploration-view';

export class ExplorationCommands {
    static registerCommands(plugin: OPSEOraclePlugin) {
        plugin.addCommand({
            id: 'opse-create-dungeon',
            name: 'Crear rastreador de mazmorra',
            callback: () => {
                new DungeonModal(plugin.app, plugin).open();
            }
        });

        plugin.addCommand({
            id: 'opse-create-hex-region',
            name: 'Crear región de hexágonos',
            callback: () => {
                new HexModal(plugin.app, plugin).open();
            }
        });

        plugin.addCommand({
            id: 'opse-explore-room',
            name: 'Explorar siguiente área de la mazmorra',
            callback: async () => {
                const active = plugin.adventureManager.getActiveAdventure();
                if (active && active.dungeonId) {
                    const dungeon = plugin.settings.dungeons[active.dungeonId];
                    if (dungeon) {
                        const next = DungeonManager.moveToNextRoom(dungeon);
                        if (next) {
                            await plugin.saveSettings();
                            new Notice(`Nueva sala explorada: ${next.name}`);
                            // Refresh view if open
                            const leaf = plugin.app.workspace.getLeavesOfType(VIEW_TYPE_OPSE_EXPLORATION)[0];
                            if (leaf) (leaf.view as any).refresh();
                        } else {
                            new Notice("No hay más salidas disponibles en esta sala.");
                        }
                    }
                } else {
                    new Notice("No hay ninguna mazmorra activa.");
                }
            }
        });

        plugin.addCommand({
            id: 'opse-explore-hex',
            name: 'Moverse al Norte (Región Hex)',
            callback: async () => {
                const active = plugin.adventureManager.getActiveAdventure();
                if (active && active.regionId) {
                    const region = plugin.settings.regions[active.regionId];
                    if (region) {
                        HexManager.moveToNeighbor(region, 'N');
                        await plugin.saveSettings();
                        new Notice(`Desplazado al Norte.`);
                        const leaf = plugin.app.workspace.getLeavesOfType(VIEW_TYPE_OPSE_EXPLORATION)[0];
                        if (leaf) (leaf.view as any).refresh();
                    }
                } else {
                    new Notice("No hay ninguna región de hexágonos activa.");
                }
            }
        });
    }
}
