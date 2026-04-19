# OPSE Oracle for Obsidian

> A solo roleplaying game engine integrated directly into your Obsidian vault.

> This is the English version of the documentation. For the Spanish version, see [`README.md`](./README.md).

**OPSE Oracle** is a plugin for [Obsidian](https://obsidian.md/) that implements the full **One Page Solo Engine v1.6** system — the minimalist all-in-one engine to play any TTRPG without a Game Master. It automates rolls, oracle queries, content generation and exploration tracking, leaving the player free to interpret and improvise.

[![Version](https://img.shields.io/badge/version-1.0.0-8b5cf6?style=flat-square)](https://github.com/snifer/OPSE-oracle-ttrpg)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15.0+-8b5cf6?style=flat-square)](https://obsidian.md)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
![GitHub Downloads](https://img.shields.io/github/downloads/Snifer/opse-oracle-ttrpg/total?logo)
[![OPSE](https://img.shields.io/badge/OPSE-v1.6-orange?style=flat-square)](https://inflatablestudios.itch.io/)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-ff5f5f?logo=ko-fi&logoColor=white)](https://ko-fi.com/bastiondeldino)

---

## Features

### Full OPSE v1.6 engine

- **Yes/No Oracle** with three probability levels (3+/4+/5+) and `but…` / `and…` modifiers  
- **How Much? Oracle** with a 6-step magnitude scale  
- **Oracle Focuses**: Action, Detail, Theme and Double Focus — supporting both cards and dice  
- **GM Moves**: Beat Moves and Failure Moves (inspired by PbtA)  
- **Random Event** combining Action + Theme  

### Content generators

- **Plot Hook** — Goal, Adversaries, Reward (3×d6)  
- **NPC Generator** — Identity, Goal, Trait, Attitude, Conversation Theme  
- **Generic Content** — Action, Appearance, Magnitude  
- **Plot Twist** and **Flavor / Weather**  

### Scene engine

- **Scene Complication** roll (d6)  
- **Altered Scene** check (1d6 ≥ 5)  
- **Alteration** table roll when the scene is modified  

### Persistent exploration

- **Dungeon Tracker** with a graph of rooms, exits and per-room notes  
- **Hexcrawl Exploration** with terrain schema and navigation compass  
- Exploration state is **saved across Obsidian sessions**  

### Full interface

- **Control panel** in the right sidebar with 5 tabs (Scene / Oracle / Generate / Explore / Session)  
- **Exploration view** with Dungeon / Hex tabs  
- **Persistent history** with filters, pins, editable interpretation, re-roll and withdraw  
- **Resizable panel** via drag handle between tabs and history  
- **Session export** to Markdown or JSON  

### Advanced settings

- **Custom accent color** (live color picker)  
- **Compact mode** for the history  
- **Timestamp format** (time / full date / relative)  
- **Insertion format** (plain markdown / Obsidian callout / answer only)  
- **History order** (newest / oldest)  
- **Default probability** for Yes/No oracle  
- **Hex event threshold** (configurable, default 5+)  
- **Export format** in Markdown or JSON  
- **Language**: English and Spanish  

---

## Installation

### Manual installation

1. Download `main.js`, `manifest.json` and `styles.css` from the latest release.  
2. Create the folder `.obsidian/plugins/opse-oracle/` in your vault.  
3. Copy the three files into that folder.  
4. Open Obsidian → **Settings → Community plugins** → enable **OPSE Oracle**.

### BRAT (recommended for beta)

1. Install the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin.  
2. In BRAT settings → **Add Beta Plugin** → paste this repository URL.  
3. Enable OPSE Oracle in the Community plugins list.  

---

## Quick start

### 1. Create an adventure

Run `OPSE: Start New Adventure` from the command palette (`Ctrl+P`). Fill in:

- **Title** — name of the campaign or session  
- **RPG System** — the game you are using (D&D, Ironsworn, etc.)  
- **Genre / Tone** — epic fantasy, sci-fi, horror, etc.  
- **Protagonists** (optional)  
- **Initial premise** (optional)  

The plugin creates a Markdown file with YAML frontmatter, initializes the adventure state and opens the note.

### 2. Open the control panel

Click the 🎲 icon in the left ribbon, or run `OPSE: Open control panel`. The panel opens in the right sidebar and stays accessible throughout the session.

### 3. Set up the scene

In the **Scene** tab, click **Generate Scene**. Enter the location and goal of your characters. The plugin rolls:

- 1d6 → Scene Complication  
- 1d6 → Altered Scene check (if ≥ 5, roll on the Alteration table)  

### 4. Play the session

Use the buttons in the panel tabs to:

- Ask the oracle  
- Roll focuses when you need inspiration  
- Generate NPCs, events or hooks on the fly  
- Use GM Moves to push the narrative forward  

Results are automatically inserted into the active note (if **Auto-insert** is enabled) and recorded in the history.

### 5. Explore

If you need to track a dungeon or hex map, create the trackers from the **Explore** tab. The state persists between sessions.

---

## Control panel

The panel is the main play interface. It is organized into **5 tabs** plus the adventure card and the history.

### Adventure card (always visible)

Shows the active adventure with:

- **Scene Rank** with +/− controls (1–6, used for the alteration check)  
- **Thread Manager** — add and remove active goals or subplots  

### Tabs

| Tab       | Content                                                                                                                                          |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Scene**   | Generate Scene, Check Alteration, Roll Alteration, Complication, Beat Move, Failure Move, OPSE Help                                           |
| **Oracle**  | Yes/No, How Much?, Action Focus, Detail Focus, Theme Focus, Double Focus                                                                      |
| **Generate**| NPC, Plot Hook, Generic, Plot Twist, Flavor/Weather, Random Event                                                                             |
| **Explore** | Create Dungeon, Create Hex Region, Explore next room                                                                                          |
| **Session** | New Adventure, Export log, Shuffle deck, Card counter                                                                                         |

### Resize handle

There is a separator bar between the tabs and the history that you can **drag** to adjust how much space each section uses. The position is saved automatically.

---

## Oracle system

### Yes/No Oracle

Implements OPSE v1.6's 2d6 mechanic:

| Probability | Threshold | Shortcut |
|------------|-----------|----------|
| Likely     | d1 ≥ 3    | 3+       |
| Even       | d1 ≥ 4    | 4+       |
| Unlikely   | d1 ≥ 5    | 5+       |

The **second die** (d2) adds a narrative modifier:

- `1` → `but…` (complication)  
- `2–5` → no modifier  
- `6` → `and…` (additional benefit)  

The default probability is configurable in settings.

### How Much? Oracle (OracleComoDe)

Single d6 roll using the OPSE v1.6 scale:

| d6 | Result                    |
|----|---------------------------|
| 1  | Surprisingly little       |
| 2  | Less than expected        |
| 3–4| About average             |
| 5  | More than expected        |
| 6  | Extraordinary             |

### Oracle Focuses

Focuses use playing cards (ranks 2–A + suit) or dice (d12 + d4 in Dice mode). The suit defines the **domain** that contextualizes the result:

| Suit      | Domain                                 |
|-----------|----------------------------------------|
| ♣ Clubs   | Physical (appearance, existence)       |
| ♦ Diamonds| Technical (mental, functioning)        |
| ♠ Spades  | Mystic (meaning, capability)           |
| ♥ Hearts  | Social (personal, connection)          |

**Action Focus** — What does it do?  
**Detail Focus** — What kind of thing is it?  
**Theme Focus** — What is this about?  
**Double Focus** — Combines Action + Detail in a single roll.

### Randomization modes

| Mode                | Description                                                                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Dice**            | d12 for rank, d4 for suit. No deck, always available.                                                                                                              |
| **Cards**           | Virtual 54-card deck (52 + 2 Jokers) shuffled. Jokers trigger an automatic Random Event and reshuffle the deck (OPSE v1.6 rule).                                   |
| **Persistent Deck** | Same as Cards, but deck state is saved when closing Obsidian. Cards do not return to the deck until it is exhausted.                                               |

---

## Generators

### Plot Hook

Roll 3 independent d6 to generate:

```
Goal → d6 (Eliminate threat / Learn the truth / Recover value / …)  
Adversaries → d6 (Organization / Outlaws / Guardians / Locals / …)  
Reward → d6 (Money / Knowledge / Ally's help / Plot arc / …)
```

### NPC Generator

Combines 4 card focuses + 2 dice rolls:

```
Identity → Card focus (NPC_IDENTITY table)  
Goal → Card focus (NPC_OBJECTIVE table)  
Trait → 1d6 trait type + Detail Focus (description)  
Attitude → 1d6 How Much? scale  
Theme → Card focus (THEMES table)
```

### Random Event

Composes two focuses:

```
What happens → Action Focus + Domain  
What it involves → Theme Focus
```  

If you draw a Joker in any focus, an additional chained Random Event is triggered.

### Generic Generator

Useful for cities, ships, magic items, taverns, monsters:

```
What it does → Action Focus + Domain  
What it looks like → Detail Focus + Domain  
How striking it is → How Much? (1d6)
```

---

## Exploration

### Dungeon Tracker

Implements OPSE v1.6's dungeon crawl mechanics.

**Creation**: Name + visual appearance + purpose. The first room always has **3 exits**.

**For each new room** the plugin rolls:

| Table      | d6 ranges                                             |
|-----------|--------------------------------------------------------|
| Location  | 1 = Typical area … 6 = Special purpose                 |
| Encounter | 1–2 = Nothing, 3–4 = Enemies, 5 = Obstacle, 6 = Unique foe |
| Object    | 1–2 = Nothing, 3 = Clue, 4 = Tool, 5 = Valuable, 6 = Special |
| Exits     | 1–2 = Dead end, 3–4 = 1 exit, 5–6 = 2 exits           |

**Navigation**: Exploration buttons (advance) and backtracking to connected rooms. Per-room notes. Cumulative route map.

### Hexcrawl Exploration

Implements OPSE v1.6's hexcrawl system using axial coordinates.

**Creation**: Region name + 3 terrain types (common / uncommon / rare).

**Terrain generation** (d6 per adjacent hex):

| d6 | Result                  |
|----|-------------------------|
| 1–2| Same as current hex     |
| 3–4| Common terrain          |
| 5  | Uncommon terrain        |
| 6  | Rare terrain            |

**Contents** (1d6): results 1–5 = nothing noteworthy, 6 = generate a Feature.  

**Features** (1d6): Notable structure / Dangerous hazard / Settlement / Strange natural feature / New region / Dungeon entrance.  

**Events**: An event triggers when the event roll meets the configured threshold (default d6 ≥ 5).  

**Navigation**: 6-direction compass (N / NE / SE / S / SW / NW). Already visited hexes are retrieved without re-rolling.

---

## History

The history logs all rolls in the session and persists between sessions.

### Features

- **Type filters**: All / Yes/No / How Much? / Focus / Event / Scene / Move / NPC / Hook  
- **Pin**: Mark important entries so they are not removed when cleaning  
- **Editable interpretation**: Text field per entry for additional context  
- **Copy**: Copy the formatted entry to clipboard  
- **Insert**: Insert the entry into the active or adventure note  
- **Withdraw**: Re-roll the same action to generate a new result  
- **Compact mode**: Smaller cards to see more entries at once  
- **Configurable order**: Newest first or oldest first  
- **Configurable timestamp**: Time, full date or relative ("5 min ago")  

### Session export

Exports the full history as:

- **Markdown** — human-readable format with sections per entry  
- **JSON** — full data structure including adventure metadata and history  

---

## Settings

The settings screen is organized into sections:

### General

| Setting              | Values                          | Description                                      |
|----------------------|---------------------------------|--------------------------------------------------|
| Language             | Spanish / English               | UI and tables language                           |
| Randomization mode   | Dice / Cards / Persistent Deck  | Random source for focuses                        |
| Auto-insert          | Yes / No                        | Automatically insert results into active note    |

### Interface

| Setting              | Values                                   | Description                                      |
|----------------------|------------------------------------------|--------------------------------------------------|
| Default tab          | Scene / Oracle / Generate / Explore / Session | Tab opened when the panel starts                |
| Accent color         | Color picker                             | Main UI color (default violet `#8b5cf6`)        |
| Compact mode         | Yes / No                                 | Smaller cards in history                        |
| History order        | Newest first / Oldest first              | Entry ordering                                  |
| Timestamp format     | Time / Full date / Relative              | How time is shown in each entry                 |

### 📋 Result insertion

| Setting              | Values                                               | Description                                      |
|----------------------|------------------------------------------------------|--------------------------------------------------|
| Insertion format     | Plain markdown / Obsidian callout / Answer only      | How inserted text is formatted                   |
| Show raw rolls       | Yes / No                                            | Include dice result `(1d6=4)` in the text        |
| Show domain/suit     | Yes / No                                            | Include suit domain in focus results             |

**Format examples:**

```text
── Plain markdown ────────────────────────────────────
? Is the guard asleep?
Yes, but... (2d6=5: d1=4, d2=1, Prob: even)
*Social (personal, connection)*

── Obsidian callout ───────────────────────────
> [!oracle] Is the guard asleep?
> **Yes, but...** (2d6=5)
> *Social (personal, connection)*

── Answer only ──────────────────────────────────
**Yes, but...**
```

### 🔮 Oracles

| Setting                  | Values                        | Description                                      |
|--------------------------|-------------------------------|--------------------------------------------------|
| Default probability      | Likely / Even / Unlikely      | Preselected level in Yes/No modal                |
| Hex event threshold      | 2–6 (slider)                  | Minimum d6 value to trigger an event             |

### 💾 Session and data

| Setting                         | Values                 | Description                                      |
|---------------------------------|------------------------|--------------------------------------------------|
| Export format                   | Markdown / JSON        | Exported file format                             |
| Auto-open exploration           | Yes / No               | Open exploration view when creating dungeon/hex  |
| Reset deck on adventure change  | Yes / No               | Reset deck when switching active adventure       |
| History limit                   | 10–500 (slider)        | Max number of entries to keep                    |
| Clear history                   | Button                 | Remove all non-pinned entries                    |
| Restore defaults                | Button                 | Restore UI/behavior defaults (not adventures/history) |

---

## Command reference

All commands use the `OPSE:` prefix and are available from the command palette (`Ctrl+P`).

### Views

| ID                    | Description                |
|-----------------------|----------------------------|
| `opse-open-control`   | Open control panel         |
| `opse-open-history`   | Open history (opens panel) |
| `opse-open-exploration` | Open exploration view    |

### Adventure and scene

| ID                    | Description                |
|-----------------------|----------------------------|
| `opse-start-adventure`| New adventure (modal)      |
| `opse-set-scene`      | Set up new scene (modal)   |

### Oracles

| ID                       | Description                     |
|--------------------------|---------------------------------|
| `opse-ask-oracle`        | Yes/No Oracle (question modal)  |
| `opse-ask-how-much`      | How Much? Oracle (1d6)         |
| `opse-focus-action`      | Action Focus                    |
| `opse-focus-detail`      | Detail Focus                    |
| `opse-focus-theme`       | Theme Focus                     |
| `opse-focus-double`      | Double Focus (Action + Detail)  |
| `opse-roll-beat-move`    | Beat Move (1d6)                 |
| `opse-roll-failure-move` | Failure Move (1d6)              |

### Generators

| ID                       | Description          |
|--------------------------|----------------------|
| `opse-random-event`      | Random Event         |
| `opse-generate-hook`     | Plot Hook            |
| `opse-generate-npc`      | Generate NPC         |
| `opse-generate-generic`  | Generic Content      |
| `opse-plot-twist`        | Plot Twist           |
| `opse-flavor`            | Flavor / Weather     |

### Exploration

| ID                       | Description                  |
|--------------------------|------------------------------|
| `opse-create-dungeon`    | Create dungeon tracker       |
| `opse-create-hex-region` | Create hex region            |
| `opse-explore-room`      | Explore next room            |
| `opse-hex-north`         | Move North                   |
| `opse-hex-northeast`     | Move Northeast               |
| `opse-hex-southeast`     | Move Southeast               |
| `opse-hex-south`         | Move South                   |
| `opse-hex-southwest`     | Move Southwest               |
| `opse-hex-northwest`     | Move Northwest               |

---

## OPSE v1.6 table reference

### Action Focus (cards 2–A)

| Rank | ES        | EN        |
|------|-----------|-----------||
| 2    | Buscar    | Seek      |
| 3    | Oponerse  | Oppose    |
| 4    | Comunicar | Communicate|
| 5    | Mover     | Move      |
| 6    | Dañar     | Harm      |
| 7    | Crear     | Create    |
| 8    | Revelar   | Reveal    |
| 9    | Mandar    | Command   |
| 10   | Tomar     | Take      |
| J    | Proteger  | Protect   |
| Q    | Ayudar    | Help      |
| K    | Transformar | Transform|
| A    | Engañar   | Deceive   |

### Detail Focus (cards 2–A)

| Rank | ES       | EN      |
|------|----------|---------||
| 2    | Pequeño  | Small   |
| 3    | Grande   | Large   |
| 4    | Viejo    | Old     |
| 5    | Nuevo    | New     |
| 6    | Mundano  | Mundane |
| 7    | Simple   | Simple  |
| 8    | Complejo | Complex |
| 9    | Insulso  | Bland   |
| 10   | Especial | Special |
| J    | Inesperado | Unexpected |
| Q    | Exótico  | Exotic  |
| K    | Digno    | Worthy  |
| A    | Único    | Unique  |

### Theme Focus (cards 2–A)

| Rank | ES               | EN             |
|------|------------------|----------------|
| 2    | Necesidad Ya     | Immediate Need |
| 3    | Aliados          | Allies         |
| 4    | Comunidad        | Community      |
| 5    | Historia         | History        |
| 6    | Planes Futuros   | Future Plans   |
| 7    | Enemigos         | Enemies        |
| 8    | Conocimiento     | Knowledge      |
| 9    | Rumores          | Rumors         |
| 10   | Arco Argumental  | Plot Arc       |
| J    | Eventos Recientes| Recent Events  |
| Q    | Equipo           | Equipment      |
| K    | Facción          | Faction        |
| A    | Los PJs          | The PCs        |

---

## Attribution and license

> This is the English version of the documentation. For the original Spanish readme, see [`README.md`](./README.md).

### One Page Solo Engine

This plugin implements the mechanics of **One Page Solo Engine v1.6**, created by **Karl Hendricks** (Inflatable Studios), with Spanish translation by **Micky Pardo**.

- Official page: [inflatablestudios.itch.io](https://inflatablestudios.itch.io/)  
- Original license: [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  

This plugin is an independent implementation. It is not affiliated with or endorsed by the original author.

### Plugin

**Author**: Snifer · [Bastion del Dinosaurio](https://github.com/snifer)  
**License**: MIT — free to use, modify and distribute.

---

*Made with ❤️ for the solo roleplaying community.*
