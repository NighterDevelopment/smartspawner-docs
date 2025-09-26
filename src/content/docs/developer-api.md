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

| Method | Description | Return Type |
|--------|-------------|-------------|
| `createSpawnerItem(EntityType)` | Creates a SmartSpawner item | `ItemStack` |
| `createSpawnerItem(EntityType, int)` | Creates many SmartSpawner items | `ItemStack` |
| `isValidSpawner(ItemStack)` | Checks if item is valid SmartSpawner | `boolean` |
| `getSpawnerEntityType(ItemStack)` | Gets entity type from SmartSpawner | `EntityType` |

### `createSpawnerItem()`
Creates a SmartSpawner item with the specified entity type.

```java
import org.bukkit.entity.EntityType;
import org.bukkit.inventory.ItemStack;

// Create a zombie spawner
ItemStack zombieSpawner = api.createSpawnerItem(EntityType.ZOMBIE);

// Give to player
player.getInventory().addItem(zombieSpawner);
```

Creates a SmartSpawner item with custom amount.

```java
// Create 5 skeleton spawners
ItemStack skeletonSpawners = api.createSpawnerItem(EntityType.SKELETON, 5);
```

### `isValidSpawner()`
Checks if an item is a valid SmartSpawner item.

```java
@EventHandler
public void onPlayerInteract(PlayerInteractEvent event) {
    ItemStack item = event.getItem();
    
    if (api.isValidSpawner(item)) {
        event.getPlayer().sendMessage("You're holding a spawner!");
    }
}
```

### `getSpawnerEntityType()`
Gets the entity type from a SmartSpawner item.

```java
ItemStack item = player.getItemInHand();
EntityType entityType = api.getSpawnerEntityType(item);

if (entityType != null) {
    player.sendMessage("This spawner spawns: " + entityType.name());
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

<br>
<br>

<br>
<br>

---

*Last update: September 26, 2025 23:55:12*