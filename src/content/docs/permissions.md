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

> **Note:** To execute commands, you must first grant the base permission `smartspawner.admin`, then grant the specific command permission (e.g., both `smartspawner.admin` and `smartspawner.reload` are required to use the reload command).

### Permission Nodes
| **Permission**                    | **Description**                                       | **Default** |
|-----------------------------------|-------------------------------------------------------|-------------|
| `smartspawner.admin`             | Full access to all SmartSpawner features             | `op`        |
| `smartspawner.reload`            | Permission to reload SmartSpawner plugin             | `op`        |
| `smartspawner.give`              | Allow giving spawners to yourself                    | `op`        |
| `smartspawner.list`              | Allow viewing list of spawners and teleporting to them | `op`      |
| `smartspawner.hologram`          | Allow toggling hologram for spawners                 | `op`        |
| `smartspawner.changetype`        | Allow changing spawner type with spawn egg           | `op`        |
| `smartspawner.stack`             | Allow stacking spawners                              | `true`      |
| `smartspawner.break`             | Allow breaking spawners                              | `true`      |
| `smartspawner.sellall`           | Allow selling items in spawner storage GUI          | `true`      |
| `smartspawner.limits.bypass`     | Bypass spawner limits per chunk                     | `false`     |

<br>
<br>

<br>
<br>

---

*Last update: September 21, 2025 11:47:09*