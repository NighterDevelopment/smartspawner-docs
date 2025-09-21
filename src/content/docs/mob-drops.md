---
title: Mob Drops Configuration
description: Configure custom mob drops and experience values for optimal spawner mechanics.
---

SmartSpawner allows you to customize mob drops and experience through the `mob_drops.yml` file. Control what items spawners generate, drop rates, quantities, and special properties.

## Configuration Format

```yaml
MOB_NAME:
  experience: <number>
  loot:
    ITEM_ID:
      amount: <min>-<max>
      chance: <percentage>
      # Optional properties
      durability: <min>-<max>
      potion_type: <POTION_TYPE>  # For tipped arrows
```

## Core Properties

| Property | Format | Description |
|----------|--------|-------------|
| **experience** | `5` | XP generated per spawner trigger |
| **amount** | `1-3` | Quantity range of items generated |
| **chance** | `50.0` | Drop probability (0.0-100.0) |
| **durability** | `1-384` | Durability range for tools/weapons |
| **potion_type** | `POISON` | Potion type for tipped arrows |

### Validation Rules
- Experience must be non-negative number
- Amount format: `min-max` where min ≤ max
- Chance between 0.0-100.0

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

### Basic Mob
```yaml
# Reference: https://minecraft.wiki/w/Cow#Drops
COW:
  experience: 3
  loot:
    LEATHER:
      amount: 0-2
      chance: 100.0
    BEEF:
      amount: 1-3
      chance: 100.0
```

### Mob with Weapons
```yaml
# Reference: https://minecraft.wiki/w/Wither_Skeleton#Drops
WITHER_SKELETON:
  experience: 5
  loot:
    COAL:
      amount: 1-1
      chance: 33.33
    BONE:
      amount: 0-2
      chance: 100.0
    WITHER_SKELETON_SKULL:
      amount: 1-1
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
  loot:
    BONE:
      amount: 0-2
      chance: 100.0
    ARROW:
      amount: 0-2
      chance: 100.0
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
```yamlBAT:
BAT:
  experience: 0
  # No loot section = no drops
``` 

## Default Configuration

SmartSpawner includes comprehensive defaults based on Minecraft Wiki data.

- **View Online:** [GitHub Repository](https://github.com/NighterDevelopment/smartspawner/blob/main/core/src/main/resources/mob_drops.yml)
- **Auto-Regenerate:** Delete `mob_drops.yml` and restart server

<br>
<br>

---

*Last update: September 21, 2025 12:12:16*