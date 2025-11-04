---
title: Spawner Settings Configuration
description: Configure spawner appearance, mob drops, and experience values for optimal spawner mechanics.
---

SmartSpawner allows you to customize spawner appearance, mob drops, and experience through the `spawners_settings.yml` file. Control spawner head textures, what items spawners generate, drop rates, quantities, and special properties.

## Configuration Format

```yaml
# Global default for unknown mobs
default_material: "SPAWNER"

MOB_NAME:
  experience: <number>
  head_texture:
    material: <MATERIAL>
    custom_texture: <texture_hash>  # null for vanilla heads
  loot:  # Optional section
    ITEM_ID:
      amount: <min>-<max>
      chance: <percentage>
      # Optional properties
      durability: <min>-<max>
      potion_type: <POTION_TYPE>  # For tipped arrows
```

## Core Properties

### Spawner Properties

| Property | Format | Description |
|----------|--------|-------------|
| **default_material** | `"SPAWNER"` | Fallback material for unknown mobs (global) |
| **experience** | `5` | XP generated per spawner trigger |
| **material** | `"PLAYER_HEAD"` | Head texture material (PLAYER_HEAD, SPAWNER, etc.) |
| **custom_texture** | `"abc123..."` | Base64 texture hash (use `null` for vanilla heads) |

### Loot Properties

| Property | Format | Description |
|----------|--------|-------------|
| **amount** | `1-3` | Quantity range of items generated |
| **chance** | `50.0` | Drop probability (0.0-100.0) |
| **durability** | `1-384` | Durability range for tools/weapons |
| **potion_type** | `POISON` | Potion type for tipped arrows |

### Validation Rules
- Experience must be non-negative number
- Amount format: `min-max` where min ≤ max
- Chance between 0.0-100.0
- Custom texture can be `null` for vanilla mob heads

## Supported Types

### Common Entities
**Full List:** [Paper Entity Documentation](https://jd.papermc.io/paper/org/bukkit/entity/Entity.html)

### Common Materials
**Full List:** [Paper Material Documentation](https://jd.papermc.io/paper/org/bukkit/Material.html)

### Potion Types (for Tipped Arrows)
**Full List:** [Paper PotionType Documentation](https://jd.papermc.io/paper/org/bukkit/potion/PotionType.html)

<br>

Potion types use predefined names from the Paper API. Common formats include:

- **Basic**: Standard effect duration and potency
- **Extended**: Same potency but longer duration
- **Strong**: Higher potency but standard duration

Examples:
- `POISON`: Causes damage over time (0:45 duration, 1 damage/second)
- `LONG_POISON`: Extended poison effect (2:15 duration, 1 damage/second)
- `STRONG_POISON`: Stronger poison (0:22 duration, 2 damage/second)

## Examples

### Basic Mob with Custom Head
```yaml
# Reference: https://minecraft.wiki/w/Cow#Drops
COW:
  experience: 3
  head_texture:
    material: "PLAYER_HEAD"
    custom_texture: "b667c0e107be79d7679bfe89bbc57c6bf198ecb529a3295fcfdfd2f24408dca3"
  loot:
    LEATHER:
      amount: 0-2
      chance: 66.67
    BEEF:
      amount: 1-3
      chance: 100.0
```

### Mob with Vanilla Head
```yaml
# Reference: https://minecraft.wiki/w/Skeleton#Drops
SKELETON:
  experience: 5
  head_texture:
    material: "SKELETON_SKULL"
    custom_texture: null  # Use vanilla skull
  loot:
    BONE:
      amount: 0-2
      chance: 66.67
    ARROW:
      amount: 0-2
      chance: 66.67
    BOW:
      amount: 1-1
      chance: 8.5
      durability: 1-384
```

### Mob with Weapons
```yaml
# Reference: https://minecraft.wiki/w/Wither_Skeleton#Drops
WITHER_SKELETON:
  experience: 5
  head_texture:
    material: "WITHER_SKELETON_SKULL"
    custom_texture: null
  loot:
    COAL:
      amount: 0-1
      chance: 33.33
    BONE:
      amount: 0-2
      chance: 66.67
    WITHER_SKELETON_SKULL:
      amount: 0-1
      chance: 2.5
    STONE_SWORD:
      amount: 1-1
      chance: 8.5
      durability: 1-131
```

### Mob with Tipped Arrows
```yaml
# Reference: https://minecraft.wiki/w/Bogged#Drops
BOGGED:
  experience: 5
  head_texture:
    material: "PLAYER_HEAD"
    custom_texture: "a3b9003ba2d05562c75119b8a62185c67130e9282f7acbac4bc2824c21eb95d9"
  loot:
    BONE:
      amount: 0-2
      chance: 66.67
    ARROW:
      amount: 0-2
      chance: 66.67
    BOW:
      amount: 1-1
      chance: 8.5
      durability: 1-384
    TIPPED_ARROW:
      amount: 0-2
      chance: 50.0
      potion_type: POISON
```

### Mob with no Drops

```yaml
# Reference: https://minecraft.wiki/w/Bat#Drops
BAT:
  experience: 0
  head_texture:
    material: "PLAYER_HEAD"
    custom_texture: "81c5cc1f40005a33124c60384a0f17a36a7b19ae90f1c32dcda17b5b56280a43"
  # No loot section = no drops
``` 

## Default Configuration

SmartSpawner includes comprehensive defaults based on Minecraft Wiki data, including custom head textures for all mobs.

- **View Online:** [GitHub Repository](https://github.com/NighterDevelopment/smartspawner/blob/main/core/src/main/resources/spawners_settings.yml)
- **Auto-Regenerate:** Delete `spawners_settings.yml` and restart server

## Head Texture Notes

### Obtaining Custom Textures
Custom player head textures can be obtained from:
- [Minecraft-Heads.com](https://minecraft-heads.com/)
- [MCHeads.net](https://mc-heads.net/)
- [MCHeads.ru](https://mcheads.ru/en)
- Extract from existing player heads using `/give` commands

### Vanilla Head Materials
Some mobs use vanilla Minecraft head materials:
- `SKELETON_SKULL` - Regular skeleton
- `WITHER_SKELETON_SKULL` - Wither skeleton
- `ZOMBIE_HEAD` - Zombie
- `CREEPER_HEAD` - Creeper
- `PIGLIN_HEAD` - Piglin/Piglin Brute
- `DRAGON_HEAD` - Ender dragon

When using vanilla heads, set `custom_texture: null`.

---

*Last update: November 4, 2025 16:43:02*