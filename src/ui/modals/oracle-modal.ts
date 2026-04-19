import { App, Modal, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { OPSE } from '../../core/opse';
import { Random } from '../../core/random';
import { MarkdownUtils } from '../../utils/markdown';
import { Likelihood } from '../../types';
import { t } from '../../i18n/i18n';

export class OracleModal extends Modal {
    plugin: OPSEOraclePlugin;
    question = '';

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        const strings = t().ORACLE;
        contentEl.createEl('h2', { text: strings.YESNO_TITLE });

        new Setting(contentEl)
            .setName(strings.QUESTION)
            .setDesc(strings.QUESTION_DESC)
            .addText(text => text.onChange(value => this.question = value));

        const buttonRow = contentEl.createDiv({ cls: 'opse-likelihood-row' });
        const defaultLikelihood = this.plugin.settings.defaultLikelihood ?? 'even';

        const likelihoods: { key: 'probable' | 'even' | 'improbable', label: string }[] = [
            { key: 'probable', label: strings.PROBABLE },
            { key: 'even', label: strings.EVEN },
            { key: 'improbable', label: strings.IMPROBABLE }
        ];

        likelihoods.forEach(({ key, label }) => {
            const btn = buttonRow.createEl('button', {
                text: label,
                cls: `mod-cta ${key === defaultLikelihood ? 'opse-default-likelihood' : ''}`
            });
            btn.addEventListener('click', () => {
                this.askOracle(key);
                this.close();
            });
        });
    }

    async askOracle(likelihood: Likelihood) {
        const strings = t().ORACLE;
        const meta = t().METADATA;
        const roll = Random.roll2d6();
        const { answer, modifier } = OPSE.resolveYesNo(roll.d1, roll.d2, likelihood);

        const title = `${strings.YESNO_TITLE}: ${this.question || '...'}`;
        const content = `${answer}${modifier ? ` ${modifier}` : ''}`;
        const raw = `(2d6=${roll.d1 + roll.d2}: d1=${roll.d1} [${meta.ANSWER}], d2=${roll.d2} [${meta.MOD}], ${meta.LIKELIHOOD}: ${likelihood})`;

        await this.plugin.historyManager.addEntry({
            id: crypto.randomUUID(),
            answer: content,
            raw: raw,
            timestamp: Date.now(),
            type: 'yesno',
            question: this.question
        });

        const markdown = MarkdownUtils.formatResult(title, content, raw);
        await MarkdownUtils.smartInsert(this.app, this.plugin, markdown);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
