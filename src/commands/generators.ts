import { Notice } from 'obsidian';
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
            name: `OPSE: ${t().ADVENTURE.GENERIC}`,
            callback: async () => {
                const focus1 = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focus2 = Random.drawFocus(plugin.settings.randomMode, plugin.deck);

                const action = OPSE.getAction(focus1.rank);
                const theme = OPSE.getTheme(focus2.rank);
                const domain = OPSE.getDomain(focus1.suit);

                const content = `${action} + ${theme}`;
                const raw = plugin.settings.randomMode === 'dice'
                    ? '(2× foco dados)'
                    : `(Cartas: ${focus1.rank}${focus1.suit.charAt(0)}, ${focus2.rank}${focus2.suit.charAt(0)})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw,
                    timestamp: Date.now(),
                    type: 'event',
                    domain
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.GENERIC, content, raw, domain);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focus1.wasJoker || focus2.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (plugin.app as any).commands.executeCommandById('opse-oracle:opse-random-event');
                }
            }
        });

        plugin.addCommand({
            id: 'opse-generate-hook',
            name: `OPSE: ${t().ADVENTURE.HOOK}`,
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

                const raw = `(3d6: ${r1}, ${r2}, ${r3})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw,
                    timestamp: Date.now(),
                    type: 'hook'
                });

                const markdown = MarkdownUtils.formatResult(strings.TITLE, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });

        plugin.addCommand({
            id: 'opse-generate-npc',
            name: `OPSE: ${t().ADVENTURE.NPC}`,
            callback: async () => {
                // Identity and objective use proper NPC tables from OPSE v1.6
                const focusId = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focusGoal = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const traitRoll = Random.d(6);
                const focusDetail = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const attitudeRoll = Random.d(6);
                const focusTopic = Random.drawFocus(plugin.settings.randomMode, plugin.deck);

                const identity = OPSE.getNPCIdentity(focusId.rank);
                const goal = OPSE.getNPCObjective(focusGoal.rank);
                // Trait: complication (notable feature type) + detail focus (description of the trait)
                const traitType = OPSE.getComplication(traitRoll - 1);
                const traitDesc = OPSE.getDetail(focusDetail.rank);
                // traitRoll=1 maps to "nothing notable" per OPSE v1.6 NPC traits table
                const trait = traitRoll === 1 ? OPSE.getComplication(0) : `${traitType} / ${traitDesc}`;
                const attitude = t().ORACLE.SCALES[attitudeRoll - 1];
                const topic = OPSE.getTheme(focusTopic.rank);

                const fields = t().ADVENTURE.NPC_FIELDS;
                let content = `**${fields.IDENTITY}:** ${identity}\n`;
                content += `**${fields.GOAL}:** ${goal}\n`;
                content += `**${fields.TRAIT}:** ${trait}\n`;
                content += `**${fields.ATTITUDE}:** ${attitude}\n`;
                content += `**${fields.TOPIC}:** ${topic}`;

                const raw = `(${t().ADVENTURE.NPC} / ${plugin.settings.randomMode})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw,
                    timestamp: Date.now(),
                    type: 'npc'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.NPC, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focusId.wasJoker || focusGoal.wasJoker || focusDetail.wasJoker || focusTopic.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (plugin.app as any).commands.executeCommandById('opse-oracle:opse-random-event');
                }
            }
        });

        plugin.addCommand({
            id: 'opse-generate-generic',
            name: `OPSE: ${t().ADVENTURE.GENERIC}`,
            callback: async () => {
                const focusAction = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const focusDetail = Random.drawFocus(plugin.settings.randomMode, plugin.deck);
                const magnitudeRoll = Random.d(6);

                const action = OPSE.getAction(focusAction.rank);
                const appearance = OPSE.getDetail(focusDetail.rank);
                const domain = `${OPSE.getDomain(focusAction.suit)} / ${OPSE.getDomain(focusDetail.suit)}`;
                const magnitude = t().ORACLE.SCALES[magnitudeRoll - 1];

                const content = `${action} / ${appearance} (${magnitude})`;
                const raw = `(Acc: ${focusAction.rank}, Det: ${focusDetail.rank}, Mag: ${magnitudeRoll})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw,
                    timestamp: Date.now(),
                    type: 'event',
                    domain
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.GENERIC, content, raw, domain);
                await MarkdownUtils.smartInsert(app, plugin, markdown);

                if (focusAction.wasJoker || focusDetail.wasJoker) {
                    new Notice(t().COMMON.JOKER_NOTICE);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (plugin.app as any).commands.executeCommandById('opse-oracle:opse-random-event');
                }
            }
        });

        plugin.addCommand({
            id: 'opse-plot-twist',
            name: `OPSE: ${t().ADVENTURE.PLOT_TWIST}`,
            callback: async () => {
                const roll = Random.d(6);
                const content = OPSE.getPlotTwist(roll - 1);
                const raw = `(1d6=${roll})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw,
                    timestamp: Date.now(),
                    type: 'event'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.PLOT_TWIST, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });

        plugin.addCommand({
            id: 'opse-flavor',
            name: `OPSE: ${t().ADVENTURE.FLAVOR}`,
            callback: async () => {
                const rollAtm = Random.d(6);
                const rollWea = Random.d(6);
                const atmosphere = OPSE.getAtmosphere(rollAtm - 1);
                const weather = OPSE.getWeather(rollWea - 1);
                const content = `${atmosphere} / ${weather}`;
                const raw = `(2d6: ${rollAtm}, ${rollWea})`;

                await plugin.historyManager.addEntry({
                    id: crypto.randomUUID(),
                    answer: content,
                    raw,
                    timestamp: Date.now(),
                    type: 'event'
                });

                const markdown = MarkdownUtils.formatResult(t().ADVENTURE.FLAVOR, content, raw);
                await MarkdownUtils.smartInsert(app, plugin, markdown);
            }
        });
    }
}
