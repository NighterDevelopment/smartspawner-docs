---
title: Permissions Reference
description: Complete permission reference for SmartSpawner.
---

## Permissions System

SmartSpawner uses a comprehensive permission system to control access to features.

### Default Permission Values

Understanding the **Default** column in the permissions table:

- **`op`** - Only server operators (admins) have this permission by default
- **`true`** - All players have this permission by default (everyone can use this feature)
- **`false`** - No players have this permission by default (must be explicitly granted)

> **Note:** Server operators automatically have all permissions set to `true` regardless of the default setting due to `smartspawner.*` permission.

### Permission Nodes.
| **Permission**                    | **Description**                                       | **Default** |
|-----------------------------------|-------------------------------------------------------|-------------|
| `smartspawner.*`                 | Grants access to all SmartSpawner permissions        | `op`        |
| `smartspawner.reload`            | Allows reloading the SmartSpawner plugin             | `op`        |
| `smartspawner.give`              | Allows giving spawners to yourself or other players  | `op`        |
| `smartspawner.list`              | Allows accessing the spawner list command            | `op`        |
| `smartspawner.hologram`          | Allows toggling hologram display for spawners        | `op`        |
| `smartspawner.changetype`        | Allows changing spawner type using spawn eggs        | `op`      |
| `smartspawner.stack`             | Allows stacking spawners                              | `true`      |
| `smartspawner.break`             | Allows breaking spawners                              | `true`      |
| `smartspawner.sellall`           | Allows selling items in the spawner storage GUI      | `true`      |
| `smartspawner.limits.bypass`     | Bypass spawner limits per chunk                      | `false`     |