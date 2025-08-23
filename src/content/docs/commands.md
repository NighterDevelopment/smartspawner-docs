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

| Command | Description | Permission |
|---------|-------------|------------|
| `/ss reload` | Reload plugin configuration | `smartspawner.reload` |
| `/ss give <player> <type> <amount>` | Give spawners to player | `smartspawner.give` |
| `/ss giveVanillaSpawner <player> <type> <amount>` | Give vanilla spawners to player | `smartspawner.give` |
| `/ss list` | Open admin spawner management | `smartspawner.list` |
| `/ss hologram` | Toggle hologram display | `smartspawner.hologram` |

## Command Details

### `/ss give`

```bash
/ss give <player> <type> <amount>
```

Give smart spawners to players.

**About SmartSpawners:**
- **GUI Interface**: Right-click to open an intuitive graphical interface
- **No Mob Spawning**: Generates drops and experience without spawning actual entities
- **Stackable**: Multiple spawners can be stacked in a single block for increased efficiency
- **Performance Optimized**: Reduces server lag by eliminating entity spawning

**Parameters:**
- `<player>` - Target player (use `@p` for nearest)
- `<type>` - Entity type (zombie, skeleton, blaze, etc.)
- `<amount>` - Quantity (1-6400)

**Examples:**
```bash
/ss give Steve zombie 5
/ss give @p blaze 1
/ss give PlayerName skeleton 10
```

**Supported Types:**
- All vanilla Minecraft entities

### `/ss giveVanillaSpawner`

```bash
/ss giveVanillaSpawner <player> <type> <amount>
```

Give vanilla spawners to players.

**About Vanilla Spawners:**
- **Traditional Behavior**: Functions exactly like standard Minecraft spawners
- **Entity Spawning**: Spawns actual mobs that can move, attack, and interact
- **No Stacking**: Each spawner operates independently and cannot be combined
- **No GUI**: Standard Minecraft spawner mechanics without additional interface

**Parameters:**
- `<player>` - Target player (use `@p` for nearest)
- `<type>` - Entity type (zombie, skeleton, blaze, etc.)
- `<amount>` - Quantity (1-6400)

**Examples:**
```bash
/ss giveVanillaSpawner Steve zombie 5
/ss giveVanillaSpawner @p blaze 1
/ss giveVanillaSpawner PlayerName skeleton 10
```

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