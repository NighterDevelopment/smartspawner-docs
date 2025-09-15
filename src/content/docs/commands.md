---
title: Commands Reference
description: Complete command reference for SmartSpawner.
---

## Command Syntax

All commands can be used with these aliases:
- `/ss`
- `/spawner` 
- `/smartspawner`

## Core Commands

### Administrative Commands

| Command | Permission |
|---------|-------------|
| `/ss reload` | `smartspawner.reload` |
| `/ss give spawner <player> <type> [amount]` | `smartspawner.give` |
| `/ss give vanilla_spawner <player> <type> [amount]` | `smartspawner.give` |
| `/ss list` | `smartspawner.list` |
| `/ss hologram` | `smartspawner.hologram` |
| `/ss prices` | `smartspawner.prices` |

## Command Details

### `/ss give spawner`

```bash
/ss give spawner <player> <type> [amount]
```

Give smart spawners to a player.

**About SmartSpawners:**
- **GUI Interface**: Right-click to open an intuitive graphical interface
- **No Mob Spawning**: Generates drops and experience without spawning actual entities
- **Stackable**: Multiple spawners can be stacked in a single block for increased efficiency
- **Performance Optimized**: Reduces server lag by eliminating entity spawning

**Parameters:**
- `<player>` - Target player (supports player selectors like `@p`, `@a`, etc.)
- `<type>` - Entity type (zombie, skeleton, blaze, etc.)
- `[amount]` - Optional quantity (1-6400, defaults to 1 if not specified)

**Examples:**
```bash
/ss give spawner Steve zombie 5
/ss give spawner @p blaze
/ss give spawner PlayerName skeleton 10
```

### `/ss give vanilla_spawner`

```bash
/ss give vanilla_spawner <player> <type> [amount]
```

Give vanilla spawners to a player.

**About Vanilla Spawners:**
- **Traditional Behavior**: Functions exactly like standard Minecraft spawners
- **Entity Spawning**: Spawns actual mobs that can move, attack, and interact
- **No Stacking**: Each spawner operates independently and cannot be combined
- **No GUI**: Standard Minecraft spawner mechanics without additional interface

**Parameters:**
- `<player>` - Target player (supports player selectors like `@p`, `@a`, etc.)
- `<type>` - Entity type (zombie, skeleton, blaze, etc.)
- `[amount]` - Optional quantity (1-6400, defaults to 1 if not specified)

**Examples:**
```bash
/ss give vanilla_spawner Steve zombie 5
/ss give vanilla_spawner @p blaze
/ss give vanilla_spawner PlayerName skeleton 10
```

**Supported Entity Types:**
All vanilla Minecraft entities are supported. The command provides auto-completion suggestions as you type.

### `/ss prices`

```bash
/ss prices
```

Opens a GUI displaying sell prices for all spawner-generated items.

**Features:**
- **Interactive GUI**: Browse through paginated price listings
- **Real-time Prices**: Shows current shop prices for all items
- **Integration Required**: Only available when sell integration is active

**Requirements:**
- Must be executed by a player (not console)
- Sell integration must be enabled and configured
- Player must have `smartspawner.prices` permission

**Usage:**
Simply run the command to open the prices interface. If sell integration is not available, you'll receive a notification message.

### `/ss list`

Administrative interface for spawner management.

**Features:**
- View all server spawners
- Teleport to locations
- Filter by world/status
- Real-time statistics

### `/ss reload`

Reload all configuration files without server restart.

**Reloads:**
- Main configuration (`config.yml`)
- Mob drops (`mob_drops.yml`)
- Item prices (`item_prices.yml`)
- Language files
- Hook integrations

---

*Last update: September 15, 2025 16:32:43*