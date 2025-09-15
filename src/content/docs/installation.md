---
title: Installation
description: Complete installation guide for SmartSpawner - from requirements to configuration.
---

## System Requirements

Before installing SmartSpawner, ensure your server meets these requirements:

| Requirement | Specification |
|-------------|---------------|
| **Minecraft Version** | 1.21 - 1.21.8 |
| **Server Software** | [Paper](https://papermc.io/downloads/paper), [Folia](https://papermc.io/downloads/folia), [Purpur](https://purpurmc.org/) or compatible forks |
| **Java Version** | Java 21+ (latest LTS recommended) |

## Download SmartSpawner

Choose your preferred download source:

<div style="text-align: center; margin: 1.5rem 0;">
  <a href="https://modrinth.com/plugin/smart-spawner-plugin" style="display: inline-block; margin: 0 0.5rem;">
    <img src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/compact/available/modrinth_vector.svg" alt="Modrinth" style="height: 40px;">
  </a>
  <a href="https://www.spigotmc.org/resources/120743/" style="display: inline-block; margin: 0 0.5rem;">
    <img src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/compact/available/spigot_vector.svg" alt="Spigot" style="height: 40px;">
  </a>
  <a href="https://hangar.papermc.io/Nighter/SmartSpawner" style="display: inline-block; margin: 0 0.5rem;">
    <img src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/compact/available/hangar_vector.svg" alt="Hangar" style="height: 40px;">
  </a>
</div>

## Installation Steps

### 1. Install the Plugin

1. **Stop your server** completely
2. Download the latest `.jar` file
3. Place it in your server's `plugins` folder
4. **Start your server** (avoid using `/reload`)

### 2. Verify Installation

Check that SmartSpawner loaded successfully by running the following command in your server console or in-game chat:

```bash
/plugins
```
You should see SmartSpawner in the list with a green status.

### 3. Basic Configuration

The plugin creates configuration files automatically in `plugins/SmartSpawner/`:

- `config.yml` - Main configuration
- `mob_drops.yml` - Mob drop settings
- `item_prices.yml` - Item price settings
- `spawners_data.yml` - Spawner data
- `language` - Language folder
- `auraskills.yml` - Aura skills settings (if AuraSkills is installed)

## Updating SmartSpawner

1. **Download** the new version
2. **Stop** your server
3. **Replace** the old jar file
4. **Start** your server

> **Important:** The plugin will automatically migrate your configuration files to the latest format. And it will create backups of your old files.

## Getting Help

If you encounter issues:

1. **Check console logs** for error messages
2. **Join our Discord** for community support: [Discord](https://discord.gg/zrnyG4CuuT)
3. **Report bugs** on GitHub: [Issues](https://github.com/ptthanh02/SmartSpawner/issues)

---

*Last update: September 15, 2025 16:32:48*