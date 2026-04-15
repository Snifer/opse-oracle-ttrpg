import { App } from 'obsidian';
import OPSEOraclePlugin from '../main';
import { Random } from '../core/random';
import { OPSE } from '../core/opse';
import { MarkdownUtils } from '../utils/markdown';
import { t } from '../i18n/i18n';

export class GeneratorCommands {
    static registerCommands(plugin: OPSEOraclePlugin) {
        const app = plugin.app;

        plugin.addCommand({
            id: 'opse-random-event',
            name: 'OPSE: Random event',
            callback: async () => {
                const focus1 = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focus2 = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                
                const action = OPSE.getAction(focus1.rank);
                const theme = OPSE.getTheme(focus2.rank);
                const domain = OPSE.getDomain(focus1.suit);
                const meta = t().METADATA;

                const content = `${action} + ${theme}`;
                const raw = `${plugin.settings.randomMode === 'dice' ? `(2d6 Focus)` : `(Cards: ${focus1.rank} ${focus1.suit}, ${focus2.rank} ${focus2.suit})`}`;
                
                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'event',
                    domain: domain
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.GENERIC, content, raw, domain);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focus1.wasJoker || focus2.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    plugin.app.commands.executeCommandById("opse-oracle:opse-random-event");
                }
            }
        });

        plugin.addCommand({
            id: 'opse-generate-hook',
            name: 'OPSE: Plot hook',
            callback: async () => {
                const r1 = Random.d(6);
                const r2 = Random.d(6);
                const r3 = Random.d(6);
                
                const strings = t().TABLES.HOOKS;
                const goal = strings.GOAL[r1 - 1];
                const adversary = strings.ADVERSARY[r2 - 1];
                const reward = strings.REWARD[r3 - 1];

                let content = `**${strings.GOAL_LABEL}:** ${goal}\n`;
                content += `**${strings.ADVERSARY_LABEL}:** ${adversary}\n`;
                content += `**${strings.REWARD_LABEL}:** ${reward}`;
                
                const meta = t().METADATA;
                const raw = `(3d6=${r1}, ${r2}, ${r3})`;
                
                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'hook'
                });

                const markdown = MarkdownUtils.formatResult(strings.TITLE, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });

        plugin.addCommand({
            id: 'opse-generate-npc',
            name: 'OPSE: NPC generator',
            callback: async () => {
                const focusId = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focusGoal = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const traitRoll = Random.d(6);
                const focusDetail = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const attitudeRoll = Random.d(6);
                const focusTopic = Random.drawFocus(plugin.settings.randomMode, plugin.deck);

                const identity = OPSE.getAction(focusId.rank);
                const goal = OPSE.getTheme(focusGoal.rank);
                const trait = `${OPSE.getComplication(traitRoll - 1)} / ${OPSE.getDetail(focusDetail.rank)}`;
                const attitudeResults = t().ORACLE.SCALES;
                const attitude = attitudeResults[attitudeRoll - 1];
                const topic = OPSE.getTheme(focusTopic.rank);

                const fields = t().ADVENTURE.NPC_FIELDS;
                let content = `**${fields.IDENTITY}:** ${identity}\n`;
                content += `**${fields.GOAL}:** ${goal}\n`;
                content += `**${fields.TRAIT}:** ${trait}\n`;
                content += `**${fields.ATTITUDE}:** ${attitude}\n`;
                content += `**${fields.TOPIC}:** ${topic}`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: `(${t().ADVENTURE.NPC} / ${plugin.settings.randomMode})`,
                    timestamp: Date.now(),
                    type: 'npc'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.NPC, content, `(${t().METADATA.RESULT})`);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focusId.wasJoker || focusGoal.wasJoker || focusDetail.wasJoker || focusTopic.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    plugin.app.commands.executeCommandById("opse-oracle:opse-random-event");
                }
            }
        });

        plugin.addCommand({
            id: 'opse-generate-generic',
            name: 'OPSE: Generic content',
            callback: async () => {
                const focusAction = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focusDetail = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const magnitudeRoll = Random.d(6);

                const action = OPSE.getAction(focusAction.rank);
                const appearance = OPSE.getDetail(focusDetail.rank);
                const magnitude = t().ORACLE.SCALES[magnitudeRoll - 1];

                const content = `${action} / ${appearance} (${magnitude})`;
                const meta = t().METADATA;
                const raw = `(Act: ${focusAction.rank}, Det: ${focusDetail.rank}, Mag: ${magnitudeRoll})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: raw,
                    timestamp: Date.now(),
                    type: 'event'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.GENERIC, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focusAction.wasJoker || focusDetail.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    plugin.app.commands.executeCommandById("opse-oracle:opse-random-event");
                }
            }
        });

        plugin.addCommand({
            id: 'opse-plot-twist',
            name: 'OPSE: Giro de trama',
            callback: async () => {
                const roll = Random.d(6);
                const content = OPSE.getPlotTwist(roll - 1);
                
                const meta = t().METADATA;
                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: `(1d6=${roll})`,
                    timestamp: Date.now(),
                    type: 'event'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.PLOT_TWIST, content, `(1d6=${roll})`);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });

        plugin.addCommand({
            id: 'opse-flavor',
            name: 'OPSE: Ambiente / clima',
            callback: async () => {
                const rollAtm = Random.d(6);
                const rollWea = Random.d(6);
                const atmosphere = OPSE.getAtmosphere(rollAtm - 1);
                const weather = OPSE.getWeather(rollWea - 1);
                const content = `${atmosphere} / ${weather}`;
                
                const meta = t().METADATA;
                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw: `(2d6 Focus: ${rollAtm}, ${rollWea})`,
                    timestamp: Date.now(),
                    type: 'event'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.FLAVOR, content, `(2d6: ${rollAtm}, ${rollWea})`);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });
    }
}
