---
title: Developer API
description: Professional API for integrating SmartSpawner with your plugins.
--- 
## Getting Started

### Installation

Add SmartSpawner API via [JitPack](https://jitpack.io/#ptthanh02/SmartSpawner)

> **Latest Version:** [![Latest Release](https://img.shields.io/github/v/release/ptthanh02/SmartSpawner?label=version)](https://github.com/ptthanh02/SmartSpawner/releases/latest)

**Maven:**
```xml
<repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
</repository>

<dependency>
    <groupId>com.github.ptthanh02</groupId>
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
    compileOnly 'com.github.ptthanh02:SmartSpawner:LATEST'
}
```

> **Note:** Replace `LATEST` with the specific version number (e.g., `v1.4.1`) for production builds.

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

### Core Methods

| Method | Description | Return |
|--------|-------------|--------|
| `createSpawnerItem(EntityType type)` | Create spawner item | `ItemStack` |
| `createSpawnerItem(EntityType type, int amount)` | Create multiple spawners | `ItemStack` |
| `getSpawnerEntityType(ItemStack item)` | Get spawner entity type | `EntityType` |
| `isValidSpawner(ItemStack item)` | Check if item is valid spawner | `boolean` |

### Practical Examples

#### Spawner Management
```java
public class SpawnerManager {
    
    private final SmartSpawnerAPI api;
    
    public SpawnerManager(SmartSpawnerAPI api) {
        this.api = api;
    }
    
    public void giveSpawner(Player player, EntityType type, int amount) {
        ItemStack spawner = api.createSpawnerItem(type, amount);
        player.getInventory().addItem(spawner);
        player.sendMessage("Received " + amount + " " + type + " spawner(s)!");
    }
    
    public boolean isSpawnerInHand(Player player) {
        ItemStack item = player.getInventory().getItemInMainHand();
        return api.isValidSpawner(item);
    }
    
    public void identifySpawner(Player player) {
        ItemStack item = player.getInventory().getItemInMainHand();
        if (api.isValidSpawner(item)) {
            EntityType type = api.getSpawnerEntityType(item);
            player.sendMessage("Holding: " + type + " spawner");
        } else {
            player.sendMessage("Not holding a spawner");
        }
    }
}
```

#### Economy Integration
```java
public class SpawnerShop {
    
    private final SmartSpawnerAPI api;
    private final Map<EntityType, Double> prices;
    
    public SpawnerShop(SmartSpawnerAPI api) {
        this.api = api;
        this.prices = new HashMap<>();
        loadPrices();
    }
    
    public boolean buySpawner(Player player, EntityType type) {
        double price = prices.getOrDefault(type, 100.0);
        
        if (hasEnoughMoney(player, price)) {
            takeMoney(player, price);
            ItemStack spawner = api.createSpawnerItem(type, 1);
            player.getInventory().addItem(spawner);
            player.sendMessage("Purchased " + type + " spawner for $" + price);
            return true;
        }
        
        player.sendMessage("Insufficient funds! Need $" + price);
        return false;
    }
    
    private void loadPrices() {
        prices.put(EntityType.ZOMBIE, 50.0);
        prices.put(EntityType.SKELETON, 75.0);
        prices.put(EntityType.BLAZE, 200.0);
        prices.put(EntityType.ENDERMAN, 300.0);
    }
}
```

## Event System

### Available Events

| Event | Description | Cancellable |
|-------|-------------|:-----------:|
| `SpawnerPlaceEvent` | Spawner placement | ✅ |
| `SpawnerPlayerBreakEvent` | Player breaks spawner | ✅ |
| `SpawnerStackEvent` | Spawner stacking | ✅ |
| `SpawnerEggChangeEvent` | Type change with egg | ✅ |
| `SpawnerExpClaimEvent` | Experience claiming | ✅ |
| `SpawnerRemoveEvent` | GUI spawner removal | ✅ |
| `SpawnerExplodeEvent` | Explosion damage | ❌ |

### Event Handling Examples

```java
import github.nighter.smartspawner.api.events.*;

public class SpawnerEventListener implements Listener {
    
    @EventHandler(priority = EventPriority.HIGH)
    public void onSpawnerPlace(SpawnerPlaceEvent event) {
        Player player = event.getPlayer();
        Location location = event.getLocation();
        
        // Custom placement logic
        if (isRestrictedArea(location)) {
            event.setCancelled(true);
            player.sendMessage("Cannot place spawners here!");
            return;
        }
        
        // Log placement
        logAction(player, "PLACE", location);
        player.sendMessage("Spawner placed successfully!");
    }
    
    @EventHandler
    public void onSpawnerStack(SpawnerStackEvent event) {
        Player player = event.getPlayer();
        int added = event.getNewQuantity() - event.getOldQuantity();
        
        // Custom stacking rewards
        if (added >= 10) {
            giveBonus(player, "mass_stack");
        }
        
        // Update statistics
        updatePlayerStats(player, "spawners_stacked", added);
    }
    
    @EventHandler
    public void onSpawnerBreak(SpawnerPlayerBreakEvent event) {
        Player player = event.getPlayer();
        int quantity = event.getQuantity();
        
        // Custom break rewards
        double bonus = quantity * 0.1; // 10% bonus per spawner
        giveExperience(player, bonus);
        
        // Protection check
        if (!hasBreakPermission(player, event.getLocation())) {
            event.setCancelled(true);
            player.sendMessage("You cannot break spawners here!");
        }
    }
    
    @EventHandler
    public void onExpClaim(SpawnerExpClaimEvent event) {
        Player player = event.getPlayer();
        int originalExp = event.getExpQuantity();
        
        // VIP multiplier
        if (player.hasPermission("spawner.vip")) {
            event.setExpQuantity((int) (originalExp * 1.5));
            player.sendMessage("VIP bonus applied! (+50% EXP)");
        }
        
        // Daily limit check
        if (exceededDailyLimit(player)) {
            event.setCancelled(true);
            player.sendMessage("Daily EXP limit reached!");
        }
    }
    
    @EventHandler
    public void onTypeChange(SpawnerEggChangeEvent event) {
        Player player = event.getPlayer();
        EntityType oldType = event.getOldEntityType();
        EntityType newType = event.getNewEntityType();
        
        // Change cost
        double cost = getChangeCost(oldType, newType);
        if (!chargePlayer(player, cost)) {
            event.setCancelled(true);
            player.sendMessage("Insufficient funds for type change!");
            return;
        }
        
        player.sendMessage("Spawner changed from " + oldType + " to " + newType);
    }
}
```

### Advanced Integration

#### Custom Spawner Types
```java
public class CustomSpawnerManager {
    
    private final SmartSpawnerAPI api;
    private final Map<String, EntityType> customTypes;
    
    public boolean createCustomSpawner(Player player, String customType) {
        EntityType entityType = customTypes.get(customType);
        if (entityType == null) {
            player.sendMessage("Unknown spawner type: " + customType);
            return false;
        }
        
        ItemStack spawner = api.createSpawnerItem(entityType, 1);
        
        // Add custom NBT or metadata
        addCustomData(spawner, customType);
        
        player.getInventory().addItem(spawner);
        return true;
    }
    
    private void addCustomData(ItemStack item, String customType) {
        // Implementation depends on your NBT library
        // Add custom lore, enchantments, or metadata
    }
}
```

#### Statistics Tracking
```java
public class SpawnerStats {
    
    private final Map<UUID, PlayerStats> playerStats = new HashMap<>();
    
    @EventHandler
    public void onSpawnerPlace(SpawnerPlaceEvent event) {
        updateStat(event.getPlayer(), "placed", 1);
    }
    
    @EventHandler
    public void onSpawnerBreak(SpawnerPlayerBreakEvent event) {
        updateStat(event.getPlayer(), "broken", event.getQuantity());
    }
    
    private void updateStat(Player player, String stat, int amount) {
        PlayerStats stats = playerStats.computeIfAbsent(
            player.getUniqueId(), 
            k -> new PlayerStats()
        );
        stats.increment(stat, amount);
    }
}
```

## Best Practices

### Performance Considerations
- Cache API instance after initialization
- Use async operations for database queries
- Avoid heavy processing in event handlers
- Implement proper null checks

### Error Handling
```java
public boolean safeSpawnerOperation(Player player) {
    try {
        SmartSpawnerAPI api = SmartSpawnerProvider.getAPI();
        if (api == null) {
            player.sendMessage("SmartSpawner not available");
            return false;
        }
        
        // Your operation here
        return true;
        
    } catch (Exception e) {
        getLogger().severe("Error in spawner operation: " + e.getMessage());
        player.sendMessage("An error occurred. Please try again.");
        return false;
    }
}
```

### Version Compatibility
```java
public void checkAPIVersion() {
    SmartSpawnerAPI api = SmartSpawnerProvider.getAPI();
    if (api != null) {
        String version = api.getVersion(); // If available
        getLogger().info("SmartSpawner API version: " + version);
    }
}
```