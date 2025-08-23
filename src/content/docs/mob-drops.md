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
      potion_effect:
        type: <POTION_TYPE>
        extended: <true/false>
        upgraded: <true/false>
```

## Core Properties

| Property | Format | Description |
|----------|--------|-------------|
| **experience** | `5` | XP generated per spawner trigger |
| **amount** | `1-3` | Quantity range of items generated |
| **chance** | `50.0` | Drop probability (0.0-100.0) |
| **durability** | `1-384` | Durability range for tools/weapons |
| **potion_effect** | Object | For potions and tipped arrows |

### Potion Effects

```yaml
potion_effect:
  type: POISON           # Effect type
  extended: false        # Longer duration
  upgraded: true         # Higher potency
```

> **Note:** Only one of `extended` or `upgraded` can be `true`.

## Examples

### Basic Mob
```yaml
ZOMBIE:
  experience: 5
  loot:
    ROTTEN_FLESH:
      amount: 0-2
      chance: 100.0
    IRON_INGOT:
      amount: 1-1
      chance: 0.83
    CARROT:
      amount: 1-1
      chance: 0.83
    POTATO:
      amount: 1-1
      chance: 0.83
```

### Mob with Weapons
```yaml
SKELETON:
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
```

### Mob with Tipped Arrows
```yaml
STRAY:
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
      potion_type: SLOWNESS
```

## Supported Types

### Common Entities
**Hostile:** `ZOMBIE`, `SKELETON`, `CREEPER`, `SPIDER`, `ENDERMAN`, `BLAZE`, `WITCH`
**Passive:** `COW`, `PIG`, `CHICKEN`, `SHEEP`, `VILLAGER`
**Boss:** `ENDER_DRAGON`, `WITHER`, `WARDEN`

**Full List:** [Paper Entity Documentation](https://jd.papermc.io/paper/org/bukkit/entity/Entity.html)

### Common Materials
**Items:** `IRON_INGOT`, `GOLD_INGOT`, `DIAMOND`, `EMERALD`, `STRING`, `BONE`
**Food:** `BEEF`, `PORK`, `CHICKEN`, `BREAD`, `CARROT`, `POTATO`
**Weapons:** `DIAMOND_SWORD`, `BOW`, `CROSSBOW`, `TRIDENT`

**Full List:** [Paper Material Documentation](https://jd.papermc.io/paper/org/bukkit/Material.html)

### Potion Effects
`HEALING`, `HARMING`, `POISON`, `REGENERATION`, `STRENGTH`, `WEAKNESS`, `SWIFTNESS`, `SLOWNESS`, `FIRE_RESISTANCE`, `INVISIBILITY`

**Full List:** [Paper PotionType Documentation](https://jd.papermc.io/paper/org/bukkit/potion/PotionType.html)

## Configuration Guide  

### Validation Rules
1. Experience must be non-negative number
2. Amount format: `min-max` where min ≤ max
3. Chance between 0.0-100.0
4. Valid entity and material names only
5. Potion effects: only one enhancement per effect

### No Drops Configuration
```yaml
BAT:
  experience: 0
  # No loot section = no drops
```

## Default Configuration

SmartSpawner includes comprehensive defaults based on Minecraft Wiki data.

- **View Online:** [GitHub Repository](https://github.com/ptthanh02/SmartSpawner/blob/main/core/src/main/resources/mob_drops.yml)
- **Auto-Regenerate:** Delete `mob_drops.yml` and restart server