import { Notice } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { DungeonModal } from '../ui/modals/dungeon-modal';
import { HexModal } from '../ui/modals/hex-modal';
import { DungeonManager } from '../core/dungeon';
import { HexManager } from '../core/hex';
import { VIEW_TYPE_OPSE_EXPLORATION } from '../ui/exploration-view';
import { t } from '../i18n/i18n';

export class ExplorationCommands {
    static registerCommands(plugin: OPSEOraclePlugin) {
        plugin.addCommand({
            id: 'opse-create-dungeon',
            name: 'OPSE: Crear rastreador de mazmorra',
            callback: () => new DungeonModal(plugin.app, plugin).open()
        });

        plugin.addCommand({
            id: 'opse-create-hex-region',
            name: 'OPSE: Crear región de hexágonos',
            callback: () => new HexModal(plugin.app, plugin).open()
        });

        plugin.addCommand({
            id: 'opse-explore-room',
            name: 'OPSE: Explorar siguiente sala de la mazmorra',
            callback: async () => {
                const active = plugin.adventureManager.getActiveAdventure();
                if (!active?.dungeonId) {
                    new Notice(t().EXPLORATION.NO_DUNGEON);
                    return;
                }
                const dungeon = plugin.settings.dungeons[active.dungeonId];
                if (!dungeon) {
                    new Notice(t().EXPLORATION.NO_DUNGEON);
                    return;
                }
                const next = DungeonManager.moveToNextRoom(dungeon);
                if (next) {
                    await plugin.saveSettings();
                    new Notice(`Sala explorada: ${next.name} — ${next.location}`);
                    plugin.refreshViews();
                } else {
                    new Notice(t().EXPLORATION.NO_EXITS);
                }
            }
        });

        // Hex navigation commands for each direction (usable from command palette)
        const hexDirections: Array<{ id: string, dir: 'N' | 'NE' | 'SE' | 'S' | 'SW' | 'NW', label: string }> = [
            { id: 'opse-hex-north',     dir: 'N',  label: 'Norte' },
            { id: 'opse-hex-northeast', dir: 'NE', label: 'Noreste' },
            { id: 'opse-hex-southeast', dir: 'SE', label: 'Sureste' },
            { id: 'opse-hex-south',     dir: 'S',  label: 'Sur' },
            { id: 'opse-hex-southwest', dir: 'SW', label: 'Suroeste' },
            { id: 'opse-hex-northwest', dir: 'NW', label: 'Noroeste' }
        ];

        for (const { id, dir, label } of hexDirections) {
            plugin.addCommand({
                id,
                name: `OPSE: Moverse al ${label} (Hex)`,
                callback: async () => {
                    const active = plugin.adventureManager.getActiveAdventure();
                    if (!active?.regionId) {
                        new Notice(t().EXPLORATION.NO_REGION);
                        return;
                    }
                    const region = plugin.settings.regions[active.regionId];
                    if (!region) {
                        new Notice(t().EXPLORATION.NO_REGION);
                        return;
                    }
                    HexManager.moveToNeighbor(region, dir);
                    await plugin.saveSettings();
                    new Notice(`Movido al ${label}.`);
                    plugin.refreshViews();
                    await plugin.activateView(VIEW_TYPE_OPSE_EXPLORATION);
                }
            });
        }
    }
}
