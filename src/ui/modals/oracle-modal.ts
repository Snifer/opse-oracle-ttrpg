import { App, Modal, Setting } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { OPSE } from '../../core/opse';
import { Random } from '../../core/random';
import { MarkdownUtils } from '../../utils/markdown';
import { Likelihood } from '../../types';
import { t } from '../../i18n/i18n';

export class OracleModal extends Modal {
    plugin: OPSEOraclePlugin;
    question: string = "";

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

        const buttonRow = contentEl.createDiv({ cls: "opse-likelihood-row" });
        
        const btnProbable = buttonRow.createEl("button", { text: strings.PROBABLE, cls: "mod-cta" });
        btnProbable.addEventListener("click", () => {
            this.askOracle('probable');
            this.close();
        });

        const btnEven = buttonRow.createEl("button", { text: strings.EVEN, cls: "mod-cta" });
        btnEven.addEventListener("click", () => {
            this.askOracle('even');
            this.close();
        });

        const btnImprobable = buttonRow.createEl("button", { text: strings.IMPROBABLE, cls: "mod-cta" });
        btnImprobable.addEventListener("click", () => {
            this.askOracle('improbable');
            this.close();
        });
    }

    async askOracle(likelihood: Likelihood) {
        const strings = t().ORACLE;
        const meta = t().METADATA;
        const roll = Random.roll2d6();
        const { answer, modifier } = OPSE.resolveYesNo(roll.d1, roll.d2, likelihood);

        let title = `${strings.YESNO_TITLE}: ${this.question || "..."}`;
        let content = `${answer}${modifier ? ` ${modifier}` : ""}`;
        let raw = `(2d6=${roll.d1 + roll.d2}: d1=${roll.d1} [${meta.ANSWER}], d2=${roll.d2} [${meta.MOD}], ${meta.LIKELIHOOD}: ${likelihood})`;

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
