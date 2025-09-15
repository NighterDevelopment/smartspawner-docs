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
| `/ss give spawner <player> <type> [amount]` | `smartspawner.give` |
| `/ss give vanilla_spawner <player> <type> [amount]` | `smartspawner.give` |
| `/ss hologram` | `smartspawner.hologram` |
| `/ss list` | `smartspawner.list` |
| `/ss prices` | `smartspawner.prices` |
| `/ss reload` | `smartspawner.reload` |

## Command Details

### `/ss give spawner`

```bash
/ss give spawner <player> <type> [amount]
```

Give smart spawners to a player.

**About SmartSpawners:**
- **GUI Interface**: Right-click to access spawner GUI
- **No Mob Spawning**: Generates drops and experience without spawning actual mobs
- **Stackable**: Multiple spawners can be stacked in a single block for increased efficiency
- **Performance Optimized**: Reduces server lag by eliminating entity spawning

**Parameters:**
- `<player>` - Target player (supports player selectors like `@p`, `@a`, etc.)
- `<type>` - Entity type (zombie, skeleton, blaze, etc.)
- `[amount]` - Optional quantity (1-6400, defaults to 1 if not specified)

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

**Supported Entity Types:**
All vanilla Minecraft entities are supported. The command provides auto-completion suggestions as you type.

### `/ss hologram`

Toggle the spawner hologram display for all spawners.

### `/ss list`

Administrative interface for spawner management.

**Features:**
- View all server spawners
- Teleport to locations
- Filter by world/status
- Real-time statistics

### `/ss prices`

Opens a GUI displaying sell prices for all spawner-generated items.

**Features:**
- **Interactive GUI**: Browse through paginated price listings
- **Real-time Prices**: Shows current shop/custom prices for all items
- **Integration Required**: Only available when sell integration is active

### `/ss reload`

Reload all configuration files without server restart.

**Reloads:**
- Main configuration (`config.yml`)
- Mob drops (`mob_drops.yml`)
- Item prices (`item_prices.yml`)
- Language files
- Hook integrations

---

*Last update: September 15, 2025 23:26:58*