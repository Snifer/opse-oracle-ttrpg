import { App, Modal, Setting, normalizePath } from 'obsidian';
import OPSEOraclePlugin from '../../main';
import { t } from '../../i18n/i18n';
import { Deck } from '../../core/deck';

export class AdventureModal extends Modal {
    plugin: OPSEOraclePlugin;
    title = '';
    system = '...';
    genre = '...';
    protagonists = '';
    startingPrompt = '';

    constructor(app: App, plugin: OPSEOraclePlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        const strings = t().ADVENTURE;
        contentEl.createEl('h2', { text: strings.NEW });

        new Setting(contentEl)
            .setName(strings.TITLE)
            .addText(text => text.onChange(value => this.title = value));

        new Setting(contentEl)
            .setName(strings.SYSTEM)
            .addText(text => text.setValue(this.system).onChange(value => this.system = value));

        new Setting(contentEl)
            .setName(strings.GENRE)
            .addText(text => text.setValue(this.genre).onChange(value => this.genre = value));

        new Setting(contentEl)
            .setName(strings.PROTAGONISTS)
            .addTextArea(text => text.onChange(value => this.protagonists = value));

        new Setting(contentEl)
            .setName(strings.PROMPT)
            .addTextArea(text => text.onChange(value => this.startingPrompt = value));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText(strings.START)
                .setCta()
                .onClick(async () => {
                    await this.startAdventure();
                    this.close();
                }));
    }

    async startAdventure() {
        const strings = t().ADVENTURE;
        const defaultTitle = strings.NEW;
        const fileName = normalizePath(`${this.title || defaultTitle}.md`);
        
        // Check for existing file and handle collision
        let finalPath = fileName;
        let counter = 1;
        while (this.app.vault.getAbstractFileByPath(finalPath)) {
            finalPath = normalizePath(`${this.title || defaultTitle} (${counter}).md`);
            counter++;
        }

        // Construct YAML and Initial Content
        const content = `---
opse-adventure: true
title: "${this.title || defaultTitle}"
system: "${this.system}"
genre: "${this.genre}"
protagonists: "${this.protagonists.replace(/\n/g, ', ')}"
created: ${new Date().toISOString()}
---
# ${this.title || defaultTitle}

**${strings.SYSTEM}:** ${this.system} | **${strings.GENRE}:** ${this.genre}
${this.protagonists ? `**${strings.PROTAGONISTS}:** ${this.protagonists}\n` : ''}

---

${strings.NOTE_HEADER}
${this.startingPrompt || '...'}

${strings.SCENE_HEADER}

`;

        // Create the file
        const newFile = await this.app.vault.create(finalPath, content);

        if (this.plugin.settings.resetDeckOnAdventureChange) {
            this.plugin.deck = new Deck(this.plugin.settings.randomMode !== 'dice');
        }

        await this.plugin.adventureManager.createAdventure(
            this.title || defaultTitle,
            this.system,
            this.genre,
            newFile.path
        );

        const leaf = this.app.workspace.getLeaf(false);
        await leaf.openFile(newFile);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
