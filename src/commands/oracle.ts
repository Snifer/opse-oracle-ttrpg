import { App } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { Random } from '../core/random';
import { OPSE } from '../core/opse';
import { MarkdownUtils } from '../utils/markdown';
import { t } from '../i18n/i18n';

export class OracleCommands {
    static registerCommands(plugin: OPSEOraclePlugin) {
        const app = plugin.app;

        plugin.addCommand({
            id: 'opse-ask-how-much',
            name: `${t().ORACLE.HOW_MUCH}`,
            callback: async () => {
                const strings = t().ORACLE;
                const roll = Random.d(6);
                const content = strings.SCALES[roll - 1];
                const meta = t().METADATA;
                const raw = `(1d6=${roll})`;
                
                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'howmuch'
                });

                const markdown = MarkdownUtils.formatResult(strings.HOW_MUCH, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });

        plugin.addCommand({
            id: 'opse-roll-beat-move',
            name: 'OPSE: Beat Move',
            callback: async () => {
                const roll = Random.d(6);
                const content = OPSE.getBeatMove(roll - 1);
                const meta = t().METADATA;
                const raw = `(1d6=${roll})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'move'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.HOOK, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });

        plugin.addCommand({
            id: 'opse-roll-failure-move',
            name: 'OPSE: Failure Move',
            callback: async () => {
                const roll = Random.d(6);
                const content = OPSE.getFailureMove(roll - 1);
                const meta = t().METADATA;
                const raw = `(1d6=${roll})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'move'
                });

                const markdown = MarkdownUtils.formatResult("Failure Move", content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });
        
        plugin.addCommand({
            id: 'opse-focus-action',
            name: 'OPSE: Action Focus',
            callback: async () => {
                const focus = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const content = OPSE.getAction(focus.rank);
                const domain = OPSE.getDomain(focus.suit);
                const meta = t().METADATA;
                const raw = `${plugin.settings.randomMode === 'dice' ? `(${meta.DICE} Focus)` : `(${meta.DICE}: ${focus.rank} ${focus.suit})`}`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'focus',
                    domain: domain
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.NPC_FIELDS.GOAL, content, raw, domain);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focus.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    plugin.app.commands.executeCommandById("opse-oracle:opse-random-event");
                }
            }
        });

        plugin.addCommand({
            id: 'opse-focus-detail',
            name: 'OPSE: Detail Focus',
            callback: async () => {
                const focus = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const content = OPSE.getDetail(focus.rank);
                const domain = OPSE.getDomain(focus.suit);
                const meta = t().METADATA;
                const raw = `${plugin.settings.randomMode === 'dice' ? `(${meta.DICE} Focus)` : `(${meta.DICE}: ${focus.rank} ${focus.suit})`}`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'focus',
                    domain: domain
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.HOOK, content, raw, domain);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focus.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    plugin.app.commands.executeCommandById("opse-oracle:opse-random-event");
                }
            }
        });

        plugin.addCommand({
            id: 'opse-focus-double',
            name: 'OPSE: Foco Doble (Acción + Detalle)',
            callback: async () => {
                const focus1 = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focus2 = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                
                const action = OPSE.getAction(focus1.rank);
                const detail = OPSE.getDetail(focus2.rank);
                const domain = `${OPSE.getDomain(focus1.suit)} / ${OPSE.getDomain(focus2.suit)}`;

                const content = `${action} + ${detail}`;
                const meta = t().METADATA;
                const raw = `${plugin.settings.randomMode === 'dice' ? `(${meta.DICE} Focus x2)` : `(${meta.DICE}: ${focus1.rank}${focus1.suit.charAt(0)}, ${focus2.rank}${focus2.suit.charAt(0)})`}`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'focus',
                    domain: domain
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.DOUBLE_FOCUS, content, raw, domain);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focus1.wasJoker || focus2.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    plugin.app.commands.executeCommandById("opse-oracle:opse-random-event");
                }
            }
        });
    }
}
