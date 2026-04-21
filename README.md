# OPSE Oracle for Obsidian

> Un motor de juego de rol en solitario integrado directamente en tu vault de Obsidian.
>
> > EThis is the Spanish version of the documentation. For the English version, see -> [`README-en.md`](./README-en.md).

**OPSE Oracle** es un plugin para [Obsidian](https://obsidian.md) que implementa el sistema completo de **One Page Solo Engine v1.6** — el motor minimalista todo-en-uno para jugar cualquier TTRPG sin Director de Juego. Automatiza tiradas, consultas al oráculo, generación de contenido y rastreo de exploración, dejando al jugador libre para interpretar e improvisar.

[![Version](https://img.shields.io/badge/version-1.0.0-8b5cf6?style=flat-square)](https://github.com/snifer/OPSE-oracle-ttrpg)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15.0+-8b5cf6?style=flat-square)](https://obsidian.md)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
![GitHub Downloads](https://img.shields.io/github/downloads/Snifer/opse-oracle-ttrpg/total?logo)
[![OPSE](https://img.shields.io/badge/OPSE-v1.6-orange?style=flat-square)](https://inflatablestudios.itch.io/)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-ff5f5f?logo=ko-fi&logoColor=white)](https://ko-fi.com/bastiondeldino)
---

## Características

### Motor OPSE v1.6 completo
- **Oráculo Sí/No** con tres niveles de probabilidad (3+/4+/5+) y modificadores `pero…` / `y…`
- **Oráculo ¿Cuánto?** con escala de magnitud de 6 niveles
- **Focos de Oráculo**: Acción, Detalle, Tema y Foco Doble — con soporte para naipes y dados
- **Movimientos del DJ**: Movimientos de Ritmo y de Fallo (basados en PbtA)
- **Evento Aleatorio** combinado (Acción + Tema)

### Generadores de contenido
- **Gancho Argumental** — Objetivo, Adversarios, Recompensa (3×d6)
- **Generador de PNJ** — Identidad, Objetivo, Rasgo, Actitud, Tema de conversación
- **Contenido Genérico** — Acción, Apariencia, Magnitud
- **Giro de Trama** y **Ambiente / Clima**

### Motor de escena
- Tirada de **Complicación de Escena** (d6)
- Chequeo de **Escena Alterada** (1d6 ≥ 5)
- Tirada de tabla de **Alteración** si la escena es modificada

### Exploración persistente
- **Rastreador de Mazmorra** con grafo de salas, salidas y notas por sala
- **Exploración Hexagonal** con esquema de terreno y brújula de navegación
- Estado de exploración guardado entre sesiones de Obsidian

### Interfaz completa
- **Panel de control** en sidebar derecho con 5 tabs (Escena / Oráculo / Generar / Explorar / Sesión)
- **Vista de Exploración** con tabs Mazmorra / Hexágonos
- **Historial persistente** con filtros, pins, interpretación editable, reinsertar y retirar
- Panel redimensionable mediante drag handle entre tabs e historial
- Exportación de sesión a Markdown o JSON

### Configuración avanzada
- Color de acento personalizable (color picker en tiempo real)
- Modo compacto para el historial
- Formato de timestamp (hora / fecha completa / relativo)
- Formato de inserción (markdown plano / callout Obsidian / solo respuesta)
- Orden del historial (reciente / antiguo)
- Probabilidad por defecto para el oráculo Sí/No
- Umbral de evento en hexágono (configurable, default 5+)
- Exportación en Markdown o JSON
- Idioma: Inglés y Español

---

## Instalación

### Instalación manual

1. Descarga `main.js`, `manifest.json` y `styles.css` desde la última release.
2. Crea la carpeta `.obsidian/plugins/opse-oracle/` en tu vault.
3. Copia los tres archivos en esa carpeta.
4. Abre Obsidian → **Configuración → Plugins de la comunidad** → activa **OPSE Oracle**.

### BRAT (recomendado para beta)

1. Instala el plugin [BRAT](https://github.com/TfTHacker/obsidian42-brat).
2. En los ajustes de BRAT → **Add Beta Plugin** → introduce la URL de este repositorio.
3. Activa OPSE Oracle en la lista de plugins de la comunidad.

---

## Inicio rápido

### 1. Crear una aventura

Ejecuta `OPSE: Start New Adventure` desde la paleta de comandos (`Ctrl+P`). Rellena:
- **Título** — nombre de la campaña o sesión
- **Sistema RPG** — el juego que estás usando (D&D, Ironsworn, etc.)
- **Género / Tono** — fantasía épica, ciencia ficción, horror, etc.
- **Protagonistas** (opcional)
- **Premisa inicial** (opcional)

El plugin crea un fichero Markdown con frontmatter YAML, inicializa el estado de la aventura y abre la nota.

### 2. Abrir el panel de control

Haz clic en el icono 🎲 en la cinta izquierda, o ejecuta `OPSE: Open control panel`. El panel se abre en el sidebar derecho y permanece accesible durante toda la sesión.

### 3. Preparar la escena

En el tab **Escena**, pulsa **Generar Escena**. Introduce la ubicación y el objetivo de tus personajes. El plugin tira:
- 1d6 → Complicación de Escena
- 1d6 → Chequeo de Escena Alterada (si ≥ 5, tira tabla de Alteración)

### 4. Jugar la sesión

Usa los botones de los tabs del panel de control para:
- Preguntar al oráculo
- Tirar focos cuando necesites inspiración
- Generar PNJs, eventos o ganchos al vuelo
- Usar Movimientos del DJ para avanzar la narrativa

Los resultados se insertan automáticamente en la nota activa (si **Auto-insert** está activado) y se registran en el historial.

### 5. Explorar

Si necesitas rastrear una mazmorra o un mapa hexagonal, crea los rastreadores desde el tab **Explorar**. El estado persiste entre sesiones.

---

## Panel de control

El panel es la interfaz principal de juego. Está organizado en **5 tabs** más la tarjeta de aventura y el historial.

### Tarjeta de aventura (siempre visible)

Muestra la aventura activa con:
- **Rango de Escena** con controles +/− (1–6, usado para el chequeo de alteración)
- **Gestor de hilos** — añade y elimina objetivos o subtramas activas

### Tabs

| Tab | Contenido |
|---|---|
| **Escena** | Generar escena, Chequear alteración, Tirar alterada, Complicación, Movimiento de Ritmo, Movimiento de Fallo, Ayuda OPSE |
| **Oráculo** | Preguntar Sí/No, ¿Cuánto?, Foco Acción, Foco Detalle, Foco Tema, Foco Doble |
| **Generar** | PNJ, Gancho, Genérico, Giro de Trama, Ambiente/Clima, Evento Aleatorio |
| **Explorar** | Crear Mazmorra, Crear Región Hex, Explorar siguiente sala |
| **Sesión** | Nueva Aventura, Exportar log, Barajar baraja, Contador de cartas |

### Resize handle

Hay una barra de separación entre los tabs y el historial que puedes **arrastrar** para ajustar el espacio que ocupa cada sección. La posición se guarda automáticamente.

---

## Sistema de oráculos

### Oráculo Sí/No

Implementa la mecánica de 2d6 de OPSE v1.6:

| Probabilidad | Umbral | Atajo |
|---|---|---|
| Probable | d1 ≥ 3 | 3+ |
| A Nivel | d1 ≥ 4 | 4+ |
| Improbable | d1 ≥ 5 | 5+ |

El **segundo dado** (d2) añade un modificador narrativo:
- `1` → `pero…` (complicación)
- `2–5` → sin modificador
- `6` → `y…` (beneficio adicional)

La probabilidad por defecto es configurable en ajustes.

### Oráculo ¿Cuánto? (OracleComoDe)

Tirada 1d6 con la escala de OPSE v1.6:

| d6 | Resultado |
|---|---|
| 1 | Sorprendentemente escaso |
| 2 | Menos de lo esperado |
| 3–4 | Aproximadamente la media |
| 5 | Más de lo esperado |
| 6 | Extraordinario |

### Focos de Oráculo

Los focos usan naipes (rango 2–A + palo) o dados (d12 + d4 en modo Dados). El palo define el **dominio** que contextualiza el resultado:

| Palo | Dominio |
|---|---|
| ♣ Tréboles | Físico (apariencia, existencia) |
| ♦ Diamantes | Técnico (mental, funcionamiento) |
| ♠ Picas | Místico (significado, capacidad) |
| ♥ Corazones | Social (personal, conexión) |

**Foco de Acción** — ¿Qué hace?  
**Foco de Detalle** — ¿Qué clase de cosa es?  
**Foco de Tema** — ¿De qué va esto?  
**Foco Doble** — Combina Acción + Detalle en una sola tirada.

### Modos de aleatorización

| Modo | Descripción |
|---|---|
| **Dados** | d12 para el rango, d4 para el palo. Sin baraja, siempre disponible. |
| **Cartas** | Baraja virtual de 54 cartas (52 + 2 Comodines) barajada. Los Comodines disparan un Evento Aleatorio automático y rebarajan la baraja (regla OPSE v1.6). |
| **Baraja Persistente** | Igual que Cartas, pero el estado de la baraja se guarda al cerrar Obsidian. Las cartas no vuelven al mazo hasta que se agote. |

---

## Generadores

### Gancho Argumental

Tira 3d6 independientes para generar:

```
Objetivo    → d6 (Elimina amenaza / Aprende la verdad / Recupera valor / …)
Adversarios → d6 (Organización / Forajidos / Guardianes / Población local / …)
Recompensa  → d6 (Dinero / Conocimiento / Ayuda aliado / Arco argumental / …)
```

### Generador de PNJ

Combina 4 focos de naipe + 2 tiradas de dado:

```
Identidad  → Foco naipe (tabla NPC_IDENTITY)
Objetivo   → Foco naipe (tabla NPC_OBJECTIVE)
Rasgo      → 1d6 tipo de rasgo + Foco Detalle (descripción)
Actitud    → 1d6 escala ¿Cuánto?
Tema       → Foco naipe (tabla THEMES)
```

### Evento Aleatorio

Compone dos focos:
```
Lo que sucede     → Foco de Acción + Dominio
Que lo involucra  → Foco de Tema
```

Si se saca un Comodín en cualquier foco, se dispara un Evento Aleatorio adicional encadenado.

### Generador Genérico

Útil para ciudades, naves, objetos mágicos, tabernas, monstruos:
```
Lo que hace        → Foco de Acción + Dominio
Cómo se ve         → Foco de Detalle + Dominio
Cómo de llamativo  → ¿Cuánto? (1d6)
```

---

## Exploración

### Rastreador de Mazmorra

Implementa la mecánica de dungeon crawl de OPSE v1.6.

**Creación**: Nombre + apariencia visual + propósito. La primera sala tiene siempre **3 salidas**.

**Por cada sala nueva** el plugin tira:

| Tabla | Rangos d6 |
|---|---|
| Localización | 1 = Área típica … 6 = Propósito especial |
| Encuentro | 1-2 = Nada, 3-4 = Enemigos, 5 = Obstáculo, 6 = Adversario único |
| Objeto | 1-2 = Nada, 3 = Pista, 4 = Herramienta, 5 = Valioso, 6 = Especial |
| Salidas | 1-2 = Callejón sin salida, 3-4 = 1 salida, 5-6 = 2 salidas |

**Navegación**: Botones de exploración (avanzar) y retroceso a salas conectadas. Notas por sala. Mapa de ruta acumulativo.

### Exploración Hexagonal

Implementa el sistema de hexcrawl de OPSE v1.6 con coordenadas axiales.

**Creación**: Nombre de la región + 3 tipos de terreno (común / poco común / raro).

**Generación de terreno** (d6 por hex adyacente):

| d6 | Resultado |
|---|---|
| 1–2 | Igual que el hex actual |
| 3–4 | Terreno común |
| 5 | Terreno poco común |
| 6 | Terreno raro |

**Contenidos** (1d6): resultados 1–5 = nada notable, 6 = genera un Rasgo.

**Rasgos** (1d6): Estructura notable / Riesgo peligroso / Asentamiento / Rasgo natural extraño / Nueva región / Entrada a Mazmorra.

**Eventos**: Un evento se dispara cuando la tirada de evento alcanza el umbral configurado (por defecto d6 ≥ 5).

**Navegación**: Brújula de 6 direcciones (N / NE / SE / S / SW / NW). Los hexágonos ya visitados se recuperan sin tirar de nuevo.

---

## Historial

El historial registra todas las tiradas de la sesión y persiste entre sesiones.

### Funcionalidades

- **Filtros por tipo**: Todos / S/N / ¿Cuánto? / Foco / Evento / Escena / Movimiento / PNJ / Gancho
- **Pin**: Marca entradas importantes para que no se eliminen al limpiar
- **Interpretación editable**: Campo de texto por entrada para añadir contexto
- **Copiar**: Copia la entrada formateada al portapapeles
- **Insertar**: Inserta la entrada en la nota activa o la de aventura
- **Retirar**: Repite la misma tirada generando un nuevo resultado
- **Modo compacto**: Cards pequeñas para ver más entradas a la vez
- **Orden configurable**: Más reciente primero o más antiguo primero
- **Timestamp configurable**: Hora, fecha completa o relativo ("hace 5 min")

### Exportación de sesión

Exporta el historial completo en:
- **Markdown** — formato legible con secciones por entrada
- **JSON** — estructura de datos completa con metadatos de aventura e historial

---

## Configuración

La pantalla de ajustes está organizada en secciones:

###  General

| Ajuste | Valores | Descripción |
|---|---|---|
| Idioma | Español / English | Idioma de la interfaz y las tablas |
| Modo de aleatorización | Dados / Cartas / Baraja Persistente | Fuente de aleatoriedad para focos |
| Inserción automática | Sí/No | Insertar resultados en la nota activa automáticamente |

###  Interfaz

| Ajuste | Valores | Descripción |
|---|---|---|
| Tab por defecto | Escena / Oráculo / Generar / Explorar / Sesión | Tab que abre el panel al arrancar |
| Color de acento | Color picker | Color principal de la UI (por defecto violeta `#8b5cf6`) |
| Modo compacto | Sí/No | Cards pequeñas en el historial |
| Orden del historial | Reciente primero / Antiguo primero | Orden de las entradas |
| Formato de timestamp | Hora / Fecha completa / Relativo | Cómo se muestra la hora en cada entrada |

### 📋 Inserción de resultados

| Ajuste | Valores | Descripción |
|---|---|---|
| Formato de inserción | Markdown plano / Callout Obsidian / Solo respuesta | Cómo se formatea el texto insertado |
| Mostrar raw rolls | Sí/No | Incluir el resultado de dados `(1d6=4)` en el texto |
| Mostrar dominio/palo | Sí/No | Incluir el dominio del palo en resultados de foco |

**Ejemplo de cada formato:**

```
── Markdown plano ──────────────────────────────
? ¿El guardia está dormido?
Sí, pero... <small>(2d6=5: d1=4, d2=1, Prob: even)</small>
*Social (personal, conexión)*
> 

── Callout Obsidian ────────────────────────────
> [!oracle] ¿El guardia está dormido?
> **Sí, pero...** <small>(2d6=5)</small>
> *Social (personal, conexión)*

── Solo respuesta ──────────────────────────────
**Sí, pero...**
```

### 🔮 Oráculos

| Ajuste | Valores | Descripción |
|---|---|---|
| Probabilidad por defecto | Probable / A Nivel / Improbable | Nivel preseleccionado en el modal Sí/No |
| Umbral de evento en hex | 2–6 (slider) | Valor mínimo en d6 para disparar un evento |

### 💾 Sesión y datos

| Ajuste | Valores | Descripción |
|---|---|---|
| Formato de exportación | Markdown / JSON | Formato del archivo exportado |
| Auto-abrir exploración | Sí/No | Abrir la vista de exploración al crear mazmorra/hex |
| Resetear baraja al cambiar aventura | Sí/No | Reiniciar la baraja al activar una aventura diferente |
| Límite de historial | 10–500 (slider) | Número máximo de entradas a conservar |
| Limpiar historial | Botón | Elimina todas las entradas no fijadas |
| Restaurar valores por defecto | Botón | Restaura ajustes de UI/comportamiento (no afecta aventuras ni historial) |

---

## Referencia de comandos

Todos los comandos tienen el prefijo `OPSE:` y son accesibles desde la paleta de comandos (`Ctrl+P`).

### Vistas

| ID | Descripción |
|---|---|
| `opse-open-control` | Abrir panel de control |
| `opse-open-history` | Abrir historial (abre el panel de control) |
| `opse-open-exploration` | Abrir vista de exploración |

### Aventura y escena

| ID | Descripción |
|---|---|
| `opse-start-adventure` | Nueva aventura (modal) |
| `opse-set-scene` | Preparar nueva escena (modal) |

### Oráculos

| ID | Descripción |
|---|---|
| `opse-ask-oracle` | Oráculo Sí/No (modal con pregunta) |
| `opse-ask-how-much` | Oráculo ¿Cuánto? (1d6) |
| `opse-focus-action` | Foco de Acción |
| `opse-focus-detail` | Foco de Detalle |
| `opse-focus-theme` | Foco de Tema |
| `opse-focus-double` | Foco Doble (Acción + Detalle) |
| `opse-roll-beat-move` | Movimiento de Ritmo (1d6) |
| `opse-roll-failure-move` | Movimiento de Fallo (1d6) |

### Generadores

| ID | Descripción |
|---|---|
| `opse-random-event` | Evento Aleatorio |
| `opse-generate-hook` | Gancho Argumental |
| `opse-generate-npc` | Generar PNJ |
| `opse-generate-generic` | Contenido Genérico |
| `opse-plot-twist` | Giro de Trama |
| `opse-flavor` | Ambiente / Clima |

### Exploración

| ID | Descripción |
|---|---|
| `opse-create-dungeon` | Crear rastreador de mazmorra |
| `opse-create-hex-region` | Crear región hexagonal |
| `opse-explore-room` | Explorar siguiente sala |
| `opse-hex-north` | Mover al Norte |
| `opse-hex-northeast` | Mover al Noreste |
| `opse-hex-southeast` | Mover al Sureste |
| `opse-hex-south` | Mover al Sur |
| `opse-hex-southwest` | Mover al Suroeste |
| `opse-hex-northwest` | Mover al Noroeste |





## Referencia de tablas OPSE v1.6

### Enfoque de Acción (naipes 2–A)

| Rango | ES | EN |
|---|---|---|
| 2 | Buscar | Seek |
| 3 | Oponerse | Oppose |
| 4 | Comunicar | Communicate |
| 5 | Mover | Move |
| 6 | Dañar | Harm |
| 7 | Crear | Create |
| 8 | Revelar | Reveal |
| 9 | Mandar | Command |
| 10 | Tomar | Take |
| J | Proteger | Protect |
| Q | Ayudar | Help |
| K | Transformar | Transform |
| A | Engañar | Deceive |

### Enfoque de Detalle (naipes 2–A)

| Rango | ES | EN |
|---|---|---|
| 2 | Pequeño | Small |
| 3 | Grande | Large |
| 4 | Viejo | Old |
| 5 | Nuevo | New |
| 6 | Mundano | Mundane |
| 7 | Simple | Simple |
| 8 | Complejo | Complex |
| 9 | Insulso | Bland |
| 10 | Especial | Special |
| J | Inesperado | Unexpected |
| Q | Exótico | Exotic |
| K | Digno | Worthy |
| A | Único | Unique |

### Enfoque de Tema (naipes 2–A)

| Rango | ES | EN |
|---|---|---|
| 2 | Necesidad Ya | Immediate Need |
| 3 | Aliados | Allies |
| 4 | Comunidad | Community |
| 5 | Historia | History |
| 6 | Planes Futuros | Future Plans |
| 7 | Enemigos | Enemies |
| 8 | Conocimiento | Knowledge |
| 9 | Rumores | Rumors |
| 10 | Arco Argumental | Plot Arc |
| J | Eventos Recientes | Recent Events |
| Q | Equipo | Equipment |
| K | Facción | Faction |
| A | Los PJs | The PCs |

---

## Atribución y licencia

> Esta es la versión en español de la documentación. Para la documentación en inglés, consulta [`README-en.md`](./README-en.md).

### One Page Solo Engine

Este plugin implementa las mecánicas de **One Page Solo Engine v1.6**, creado por **Karl Hendricks** (Inflatable Studios), con traducción al castellano de **Micky Pardo**.

- Página oficial: [inflatablestudios.itch.io](https://inflatablestudios.itch.io/)
- Licencia original: [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Este plugin es una implementación independiente. No está afiliado ni respaldado por el autor original.

### Plugin

**Autor**: Snifer · [Bastion del Dinosaurio](https://github.com/snifer)  
**Licencia**: MIT — libre para usar, modificar y distribuir.

---

*Desarrollado con ❤️ para la comunidad de rol en solitario.*
