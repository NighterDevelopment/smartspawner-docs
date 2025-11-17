---
title: Developer API
description: Professional API for integrating SmartSpawner with your plugins.
--- 
## Getting Started

### Installation

Add SmartSpawner API via [JitPack](https://jitpack.io/#NighterDevelopment/SmartSpawner/)

> **Latest Version:** [![Latest Release](https://img.shields.io/github/v/release/NighterDevelopment/SmartSpawner?label=version)](https://github.com/NighterDevelopment/SmartSpawner/releases/latest)

**Maven:**
```xml
<repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
</repository>

<dependency>
    <groupId>com.github.NighterDevelopment</groupId>
    <artifactId>SmartSpawner</artifactId>
    <version>LATEST</version>
    <scope>provided</scope>
</dependency>
```

**Gradle:**
```gradle
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    compileOnly 'com.github.NighterDevelopment:SmartSpawner:LATEST'
}
```

> **Note:** Replace `LATEST` with the specific version number for production builds.

### Plugin Configuration

Add SmartSpawner as dependency in `plugin.yml`:

```yaml
name: YourPlugin
version: 1.0.0
main: com.yourpackage.YourPlugin
depend: [SmartSpawner]
# or
softdepend: [SmartSpawner]  # Optional dependency
```

## API Usage

### Basic Setup

```java
import github.nighter.smartspawner.api.SmartSpawnerAPI;
import github.nighter.smartspawner.api.SmartSpawnerProvider;

public class YourPlugin extends JavaPlugin {
    
    private SmartSpawnerAPI api;
    
    @Override
    public void onEnable() {
        // Initialize API
        api = SmartSpawnerProvider.getAPI();
        if (api == null) {
            getLogger().warning("SmartSpawner not found!");
            return;
        }
        
        getLogger().info("SmartSpawner API connected successfully!");
    }
    
    public SmartSpawnerAPI getAPI() {
        return api;
    }
}
```

## API Methods

### Creation Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `createSpawnerItem(EntityType)` | Creates a SmartSpawner item | `ItemStack` |
| `createSpawnerItem(EntityType, int)` | Creates multiple SmartSpawner items | `ItemStack` |
| `createVanillaSpawnerItem(EntityType)` | Creates a vanilla spawner item | `ItemStack` |
| `createVanillaSpawnerItem(EntityType, int)` | Creates multiple vanilla spawner items | `ItemStack` |
| `createItemSpawnerItem(Material)` | Creates an item spawner | `ItemStack` |
| `createItemSpawnerItem(Material, int)` | Creates multiple item spawners | `ItemStack` |

### Validation Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `isSmartSpawner(ItemStack)` | Checks if item is a SmartSpawner | `boolean` |
| `isVanillaSpawner(ItemStack)` | Checks if item is a vanilla spawner | `boolean` |
| `isItemSpawner(ItemStack)` | Checks if item is an item spawner | `boolean` |
| `getSpawnerEntityType(ItemStack)` | Gets entity type from spawner | `EntityType` |
| `getItemSpawnerMaterial(ItemStack)` | Gets material from item spawner | `Material` |

### Spawner Data Access Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `getSpawnerByLocation(Location)` | Gets spawner data by block location | `SpawnerDataDTO` |
| `getSpawnerById(String)` | Gets spawner data by unique ID | `SpawnerDataDTO` |
| `getAllSpawners()` | Gets all registered spawners | `List<SpawnerDataDTO>` |
| `getSpawnerModifier(String)` | Gets modifier to change spawner properties | `SpawnerDataModifier` |

### SpawnerDataDTO

The `SpawnerDataDTO` class provides read-only access to spawner information:

| Method | Description | Return Type |
|--------|-------------|-------------|
| `getSpawnerId()` | Gets the unique spawner ID | `String` |
| `getLocation()` | Gets the spawner location | `Location` |
| `getEntityType()` | Gets the entity type | `EntityType` |
| `getSpawnedItemMaterial()` | Gets spawned item material (for item spawners) | `Material` |
| `getStackSize()` | Gets current stack size | `int` |
| `getMaxStackSize()` | Gets maximum stack size | `int` |
| `getBaseMaxStoragePages()` | Gets base storage pages | `int` |
| `getBaseMinMobs()` | Gets base minimum mobs | `int` |
| `getBaseMaxMobs()` | Gets base maximum mobs | `int` |
| `getBaseMaxStoredExp()` | Gets base maximum stored experience | `int` |
| `getBaseSpawnerDelay()` | Gets base spawner delay in ticks | `long` |
| `isItemSpawner()` | Checks if this is an item spawner | `boolean` |

### SpawnerDataModifier

The `SpawnerDataModifier` interface allows controlled modification of spawner properties:

| Method | Description | Return Type |
|--------|-------------|-------------|
| `getStackSize()` | Gets current stack size | `int` |
| `setStackSize(int)` | Sets stack size (chainable) | `SpawnerDataModifier` |
| `applyChanges()` | Applies and recalculates all changes | `void` |

## Creation Methods

### Creating SmartSpawners

SmartSpawners are custom spawners with full SmartSpawner features including stacking, storage, and custom drops.

```java
import org.bukkit.entity.EntityType;
import org.bukkit.inventory.ItemStack;

// Create a single zombie spawner
ItemStack zombieSpawner = api.createSpawnerItem(EntityType.ZOMBIE);

// Create multiple skeleton spawners
ItemStack skeletonSpawners = api.createSpawnerItem(EntityType.SKELETON, 5);

// Give to player
player.getInventory().addItem(zombieSpawner);
```

### Creating Vanilla Spawners

Vanilla spawners function like standard Minecraft spawners without SmartSpawner features.

```java
// Create a vanilla creeper spawner
ItemStack vanillaSpawner = api.createVanillaSpawnerItem(EntityType.CREEPER);

// Create multiple vanilla spawners
ItemStack vanillaSpawners = api.createVanillaSpawnerItem(EntityType.COW, 3);
```

### Creating Item Spawners

Item spawners spawn items instead of entities.

```java
import org.bukkit.Material;

// Create a diamond spawner
ItemStack diamondSpawner = api.createItemSpawnerItem(Material.DIAMOND);

// Create multiple gold ingot spawners
ItemStack goldSpawners = api.createItemSpawnerItem(Material.GOLD_INGOT, 10);
```

## Validation Methods

### `isSmartSpawner()`

Checks if an ItemStack is a SmartSpawner (with custom features).

```java
@EventHandler
public void onPlayerInteract(PlayerInteractEvent event) {
    ItemStack item = event.getItem();
    
    if (api.isSmartSpawner(item)) {
        player.sendMessage("This is a SmartSpawner!");
    }
}
```

### `isVanillaSpawner()`

Checks if an ItemStack is a vanilla spawner (without SmartSpawner features).

```java
ItemStack item = player.getInventory().getItemInMainHand();

if (api.isVanillaSpawner(item)) {
    player.sendMessage("This is a vanilla spawner!");
}
```

### `isItemSpawner()`

Checks if an ItemStack is an item spawner.

```java
@EventHandler
public void onSpawnerPlace(BlockPlaceEvent event) {
    ItemStack item = event.getItemInHand();
    
    if (api.isItemSpawner(item)) {
        player.sendMessage("You placed an item spawner!");
    }
}
```

### `getSpawnerEntityType()`

Gets the entity type from any spawner item.

```java
ItemStack item = player.getItemInHand();
EntityType entityType = api.getSpawnerEntityType(item);

if (entityType != null) {
    player.sendMessage("This spawner spawns: " + entityType.name());
} else {
    player.sendMessage("This is not a valid spawner!");
}
```

### `getItemSpawnerMaterial()`

Gets the material type from an item spawner.

```java
ItemStack item = player.getItemInHand();

if (api.isItemSpawner(item)) {
    Material material = api.getItemSpawnerMaterial(item);
    if (material != null) {
        player.sendMessage("This spawner spawns: " + material.name());
    }
}
```

## Spawner Data Access

### `getSpawnerByLocation()`

Gets spawner data by its block location.

```java
import github.nighter.smartspawner.api.data.SpawnerDataDTO;
import org.bukkit.Location;

Location location = block.getLocation();
SpawnerDataDTO spawnerData = api.getSpawnerByLocation(location);

if (spawnerData != null) {
    player.sendMessage("Spawner ID: " + spawnerData.getSpawnerId());
    player.sendMessage("Entity Type: " + spawnerData.getEntityType());
    player.sendMessage("Stack Size: " + spawnerData.getStackSize() + " (read-only)");
    player.sendMessage("Base Delay: " + spawnerData.getBaseSpawnerDelay() + " ticks");
    
    // Modify values directly (all properties have setters except stackSize)
    spawnerData.setBaseMaxMobs(10);
    spawnerData.setBaseMinMobs(2);
    spawnerData.setBaseSpawnerDelay(600L); // 30 seconds
    player.sendMessage("Values updated!");
}
```

### `getSpawnerById()`

Gets spawner data by its unique identifier.

```java
String spawnerId = "spawner-uuid-here";
SpawnerDataDTO spawnerData = api.getSpawnerById(spawnerId);

if (spawnerData != null) {
    Location location = spawnerData.getLocation();
    player.sendMessage("Spawner location: " + location);
    player.sendMessage("Max Stack: " + spawnerData.getMaxStackSize());
    
    // Modify maximum stack size
    spawnerData.setMaxStackSize(2000);
}
```

### `getAllSpawners()`

Gets all registered spawners in the server.

```java
import java.util.List;

List<SpawnerDataDTO> allSpawners = api.getAllSpawners();
player.sendMessage("Total spawners: " + allSpawners.size());

for (SpawnerDataDTO spawner : allSpawners) {
    player.sendMessage("- " + spawner.getEntityType() + 
                      " at " + spawner.getLocation() + 
                      " (Stack: " + spawner.getStackSize() + ")");
}
```

### `getSpawnerModifier()`

Modifies spawner properties through the API with method chaining.

```java
import github.nighter.smartspawner.api.data.SpawnerDataModifier;

// Get the spawner modifier
String spawnerId = "spawner-uuid-here";
SpawnerDataModifier modifier = api.getSpawnerModifier(spawnerId);

if (modifier != null) {
    // Read current values
    int currentStack = modifier.getStackSize(); // Read-only
    long currentDelay = modifier.getBaseSpawnerDelay();
    
    // Modify multiple values with method chaining
    modifier.setBaseMaxMobs(15)
            .setBaseMinMobs(5)
            .setBaseSpawnerDelay(400L)
            .setBaseMaxStoredExp(5000)
            .setBaseMaxStoragePages(3)
            .applyChanges(); // Must call to apply changes and recalculate
    
    player.sendMessage("Spawner configuration updated!");
    player.sendMessage("Note: Stack size cannot be modified (read-only)");
}
```

### Reading and Modifying Base Values

All base values can be both read and modified:

```java
SpawnerDataModifier modifier = api.getSpawnerModifier(spawnerId);

if (modifier != null) {
    // Read current values
    int maxStoragePages = modifier.getBaseMaxStoragePages();
    int minMobs = modifier.getBaseMinMobs();
    int maxMobs = modifier.getBaseMaxMobs();
    int maxStoredExp = modifier.getBaseMaxStoredExp();
    long spawnerDelay = modifier.getBaseSpawnerDelay();
    
    player.sendMessage("Current Config Values:");
    player.sendMessage("Storage Pages: " + maxStoragePages);
    player.sendMessage("Min Mobs: " + minMobs);
    player.sendMessage("Max Mobs: " + maxMobs);
    player.sendMessage("Max Exp: " + maxStoredExp);
    player.sendMessage("Delay: " + spawnerDelay + " ticks");
    
    // Modify values
    modifier.setBaseMaxStoragePages(5)
            .setBaseMinMobs(3)
            .setBaseMaxMobs(20)
            .setBaseMaxStoredExp(10000)
            .setBaseSpawnerDelay(300L)
            .applyChanges();
    
    player.sendMessage("All values updated successfully!");
}
```

## Complete Examples

### Example 1: Spawner Item Validation

This example demonstrates all validation methods:

```java
import github.nighter.smartspawner.api.SmartSpawnerAPI;
import org.bukkit.Material;
import org.bukkit.entity.EntityType;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.inventory.ItemStack;

public class SpawnerChecker implements Listener {
    
    private final SmartSpawnerAPI api;
    
    public SpawnerChecker(SmartSpawnerAPI api) {
        this.api = api;
    }
    
    @EventHandler
    public void onPlayerInteract(PlayerInteractEvent event) {
        Player player = event.getPlayer();
        ItemStack item = event.getItem();
        
        if (item == null || item.getType() != Material.SPAWNER) {
            return;
        }
        
        // Check spawner type
        if (api.isSmartSpawner(item)) {
            EntityType type = api.getSpawnerEntityType(item);
            player.sendMessage("§aSmartSpawner: §e" + type);
        } 
        else if (api.isVanillaSpawner(item)) {
            EntityType type = api.getSpawnerEntityType(item);
            player.sendMessage("§7Vanilla Spawner: §e" + type);
        } 
        else if (api.isItemSpawner(item)) {
            Material material = api.getItemSpawnerMaterial(item);
            player.sendMessage("§6Item Spawner: §e" + material);
        }
    }
}
```

### Example 2: Spawner Data Management

This example shows how to access and modify spawner data:

```java
import github.nighter.smartspawner.api.SmartSpawnerAPI;
import github.nighter.smartspawner.api.data.SpawnerDataDTO;
import github.nighter.smartspawner.api.data.SpawnerDataModifier;
import org.bukkit.Location;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class SpawnerCommand implements CommandExecutor {
    
    private final SmartSpawnerAPI api;
    
    public SpawnerCommand(SmartSpawnerAPI api) {
        this.api = api;
    }
    
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage("Player only command!");
            return true;
        }
        
        Player player = (Player) sender;
        Location location = player.getTargetBlock(null, 5).getLocation();
        
        // Get spawner data
        SpawnerDataDTO spawnerData = api.getSpawnerByLocation(location);
        
        if (spawnerData == null) {
            player.sendMessage("§cNo spawner found at that location!");
            return true;
        }
        
        // Display spawner information
        player.sendMessage("§6=== Spawner Info ===");
        player.sendMessage("§eID: §f" + spawnerData.getSpawnerId());
        player.sendMessage("§eEntity: §f" + spawnerData.getEntityType());
        player.sendMessage("§eStack Size: §f" + spawnerData.getStackSize() + 
                          " §7(read-only)");
        player.sendMessage("§eMax Stack: §f" + spawnerData.getMaxStackSize());
        player.sendMessage("§eBase Delay: §f" + spawnerData.getBaseSpawnerDelay() + " ticks");
        player.sendMessage("§eBase Min Mobs: §f" + spawnerData.getBaseMinMobs());
        player.sendMessage("§eBase Max Mobs: §f" + spawnerData.getBaseMaxMobs());
        player.sendMessage("§eBase Max Exp: §f" + spawnerData.getBaseMaxStoredExp());
        player.sendMessage("§eBase Storage Pages: §f" + spawnerData.getBaseMaxStoragePages());
        
        // Modify spawner using SpawnerDataModifier
        if (args.length > 0 && args[0].equalsIgnoreCase("upgrade")) {
            SpawnerDataModifier modifier = api.getSpawnerModifier(spawnerData.getSpawnerId());
            
            if (modifier != null) {
                // Upgrade spawner with method chaining
                modifier.setBaseMaxMobs(modifier.getBaseMaxMobs() + 2)
                        .setBaseMinMobs(modifier.getBaseMinMobs() + 1)
                        .setBaseMaxStoredExp(modifier.getBaseMaxStoredExp() + 500)
                        .setBaseMaxStoragePages(modifier.getBaseMaxStoragePages() + 1)
                        .applyChanges();
                
                player.sendMessage("§aSpawner upgraded successfully!");
            }
        }
        
        // Direct modification through DTO (alternative method)
        if (args.length > 0 && args[0].equalsIgnoreCase("setdelay")) {
            if (args.length > 1) {
                try {
                    long newDelay = Long.parseLong(args[1]);
                    spawnerData.setBaseSpawnerDelay(newDelay);
                    player.sendMessage("§aSpawner delay set to " + newDelay + " ticks!");
                } catch (NumberFormatException e) {
                    player.sendMessage("§cInvalid delay value!");
                }
            }
        }
        
        return true;
    }
}
```

### Example 3: Spawner Statistics Command

This example creates a command to display server-wide spawner statistics:

```java
import github.nighter.smartspawner.api.SmartSpawnerAPI;
import github.nighter.smartspawner.api.data.SpawnerDataDTO;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.EntityType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SpawnerStatsCommand implements CommandExecutor {
    
    private final SmartSpawnerAPI api;
    
    public SpawnerStatsCommand(SmartSpawnerAPI api) {
        this.api = api;
    }
    
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        // Get all spawners
        List<SpawnerDataDTO> allSpawners = api.getAllSpawners();
        
        // Count by entity type
        Map<EntityType, Integer> spawnerCounts = new HashMap<>();
        int totalStackSize = 0;
        
        for (SpawnerDataDTO spawner : allSpawners) {
            EntityType type = spawner.getEntityType();
            spawnerCounts.put(type, spawnerCounts.getOrDefault(type, 0) + 1);
            totalStackSize += spawner.getStackSize();
        }
        
        // Display statistics
        sender.sendMessage("§6=== Spawner Statistics ===");
        sender.sendMessage("§eTotal Spawners: §f" + allSpawners.size());
        sender.sendMessage("§eTotal Stack Size: §f" + totalStackSize);
        sender.sendMessage("");
        sender.sendMessage("§eSpawners by Type:");
        
        spawnerCounts.entrySet().stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .forEach(entry -> {
                    sender.sendMessage("  §7- §f" + entry.getKey() + 
                                     "§7: §e" + entry.getValue());
                });
        
        return true;
    }
}
```

## API Events

SmartSpawner provides various events to hook into spawner-related actions:

| Event | Description | Cancellable |
|-------|-------------|:-----------:|
| `SpawnerBreakEvent` | Spawner broken by a player or an explosion | ❌ |
| `SpawnerPlaceEvent` | Spawner placed by player | ✅ |
| `SpawnerPlayerBreakEvent` | Spawner broken by player | ✅ |
| `SpawnerStackEvent` | Spawners stacking by hand | ✅ |
| `SpawnerSellEvent` | Selling item from spawner storage | ✅ |
| `SpawnerExpClaimEvent` | Experience claimed from spawner | ✅ |
| `SpawnerEggChangeEvent` | Spawner type changed with egg | ✅ |
| `SpawnerExplodeEvent` | Spawners destroyed by explosion | ❌ |
| `SpawnerRemoveEvent` | Unstack spawners from the stacker GUI | ✅ |
| `SpawnerOpenGUIEvent` | GUI opened by player | ✅ |

### SpawnerBreakEvent
Triggered when a spawner is broken by a player or explosion.

```java
import github.nighter.smartspawner.api.events.SpawnerBreakEvent;

@EventHandler
public void onSpawnerBreak(SpawnerBreakEvent event) {
    Entity breaker = event.getEntity();
    Location location = event.getLocation();
    int quantity = event.getQuantity();
    
    // Handle spawner break
    if (breaker instanceof Player) {
        Player player = (Player) breaker;
        player.sendMessage("You broke " + quantity + " spawner(s)!");
    }
}
```

### SpawnerPlaceEvent
Triggered when a spawner is placed.

```java
import github.nighter.smartspawner.api.events.SpawnerPlaceEvent;

@EventHandler
public void onSpawnerPlace(SpawnerPlaceEvent event) {
    Player player = event.getPlayer();
    Location location = event.getLocation();
    
    // Handle spawner placement
    player.sendMessage("Spawner placed at " + location.toString());
}
```

### SpawnerPlayerBreakEvent
Triggered specifically when a player breaks a spawner.

```java
import github.nighter.smartspawner.api.events.SpawnerPlayerBreakEvent;

@EventHandler
public void onPlayerBreakSpawner(SpawnerPlayerBreakEvent event) {
    Player player = event.getPlayer();
    int quantity = event.getQuantity();
    
    // Cancel if player doesn't have permission
    if (!player.hasPermission("spawner.break")) {
        event.setCancelled(true);
        player.sendMessage("No permission to break spawners!");
    }
}
```

### SpawnerStackEvent
Triggered when spawners are stacked by hand.

```java
import github.nighter.smartspawner.api.events.SpawnerStackEvent;

@EventHandler
public void onSpawnerStack(SpawnerStackEvent event) {
    Player player = event.getPlayer();
    int newStackSize = event.getNewStackSize();
    
    player.sendMessage("Spawner stacked! New size: " + newStackSize);
}
```

### SpawnerSellEvent
Triggered when items are sold from spawner storage.

```java
import github.nighter.smartspawner.api.events.SpawnerSellEvent;

@EventHandler
public void onSpawnerSell(SpawnerSellEvent event) {
    Player player = event.getPlayer();
    double price = event.getPrice();
    
    // Add bonus money
    double bonus = price * 0.1; // 10% bonus
    // Give bonus to player via your economy plugin
}
```

### SpawnerExpClaimEvent
Triggered when experience is claimed from spawners.

```java
import github.nighter.smartspawner.api.events.SpawnerExpClaimEvent;

@EventHandler
public void onExpClaim(SpawnerExpClaimEvent event) {
    Player player = event.getPlayer();
    int expAmount = event.getExpAmount();
    
    // Modify experience amount
    event.setExpAmount(expAmount * 2); // Double EXP
}
```

### SpawnerEggChangeEvent
Triggered when a spawner's entity type is changed using spawn eggs.

```java
import github.nighter.smartspawner.api.events.SpawnerEggChangeEvent;

@EventHandler
public void onSpawnerEggChange(SpawnerEggChangeEvent event) {
    Player player = event.getPlayer();
    EntityType oldType = event.getOldEntityType();
    EntityType newType = event.getNewEntityType();
    
    player.sendMessage("Changed spawner from " + oldType + " to " + newType);
}
```

### SpawnerExplodeEvent
Triggered when spawners are destroyed by explosions.

```java
import github.nighter.smartspawner.api.events.SpawnerExplodeEvent;

@EventHandler
public void onSpawnerExplode(SpawnerExplodeEvent event) {
    Location location = event.getLocation();
    int quantity = event.getQuantity();
    
    // Log explosion
    getLogger().info("Spawners destroyed by explosion at " + location);
}
```

### SpawnerRemoveEvent
Triggered when spawners are unstacked from the stacker GUI.

```java
import github.nighter.smartspawner.api.events.SpawnerRemoveEvent;

@EventHandler
public void onSpawnerRemove(SpawnerRemoveEvent event) {
    Location location = event.getLocation();
    
    // Handle spawner removal
    getLogger().info("Spawner removed at " + location);
}
```

### SpawnerOpenGUIEvent
Triggered when a player opens the spawner GUI.

```java
import github.nighter.smartspawner.api.events.SpawnerOpenGUIEvent;

@EventHandler
public void onSpawnerOpenGUI(SpawnerOpenGUIEvent event) {
    Player player = event.getPlayer();
    EntityType entityType = event.getEntityType();
    boolean isRefresh = event.isRefresh();
    
    // Handle GUI open
    if (!player.hasPermission("spawner.gui.open")) {
        event.setCancelled(true);
        player.sendMessage("No permission to open spawner GUI!");
    }
}
```

<br>
<br>

---

*Last update: November 17, 2025 10:52:08*