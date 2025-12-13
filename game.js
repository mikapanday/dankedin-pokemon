// Game Data and Logic

// Type effectiveness chart (expanded)
const TYPE_EFFECTIVENESS = {
    'fire': { 'grass': 2, 'bug': 2, 'steel': 2, 'ice': 2, 'water': 0.5, 'fire': 0.5, 'rock': 0.5, 'dragon': 0.5 },
    'water': { 'fire': 2, 'ground': 2, 'rock': 2, 'grass': 0.5, 'water': 0.5, 'dragon': 0.5 },
    'grass': { 'water': 2, 'ground': 2, 'rock': 2, 'fire': 0.5, 'grass': 0.5, 'poison': 0.5, 'flying': 0.5, 'bug': 0.5, 'dragon': 0.5, 'steel': 0.5 },
    'normal': { 'rock': 0.5, 'ghost': 0, 'steel': 0.5 },
    'dark': { 'psychic': 2, 'ghost': 2, 'fighting': 0.5, 'dark': 0.5, 'fairy': 0.5 },
    'flying': { 'grass': 2, 'fighting': 2, 'bug': 2, 'electric': 0.5, 'rock': 0.5, 'steel': 0.5 },
    'electric': { 'water': 2, 'flying': 2, 'electric': 0.5, 'grass': 0.5, 'dragon': 0.5, 'ground': 0 },
    'psychic': { 'fighting': 2, 'poison': 2, 'dark': 0, 'steel': 0.5, 'psychic': 0.5 },
    'fighting': { 'normal': 2, 'rock': 2, 'steel': 2, 'ice': 2, 'dark': 2, 'flying': 0.5, 'poison': 0.5, 'psychic': 0.5, 'bug': 0.5, 'ghost': 0, 'fairy': 0.5 },
    'ground': { 'fire': 2, 'electric': 2, 'poison': 2, 'rock': 2, 'steel': 2, 'grass': 0.5, 'bug': 0.5, 'flying': 0 },
    'ghost': { 'psychic': 2, 'ghost': 2, 'dark': 0.5, 'normal': 0 },
    'steel': { 'rock': 2, 'ice': 2, 'fairy': 2, 'fire': 0.5, 'water': 0.5, 'electric': 0.5, 'steel': 0.5 },
    'bug': { 'grass': 2, 'psychic': 2, 'dark': 2, 'fire': 0.5, 'fighting': 0.5, 'poison': 0.5, 'flying': 0.5, 'ghost': 0.5, 'steel': 0.5, 'fairy': 0.5 },
    'ice': { 'grass': 2, 'ground': 2, 'flying': 2, 'dragon': 2, 'fire': 0.5, 'water': 0.5, 'ice': 0.5, 'steel': 0.5 },
    'dragon': { 'dragon': 2, 'steel': 0.5, 'fairy': 0 },
    'poison': { 'grass': 2, 'fairy': 2, 'poison': 0.5, 'ground': 0.5, 'rock': 0.5, 'ghost': 0.5, 'steel': 0 },
    'rock': { 'fire': 2, 'ice': 2, 'flying': 2, 'bug': 2, 'fighting': 0.5, 'ground': 0.5, 'steel': 0.5 },
    'fairy': { 'fighting': 2, 'dragon': 2, 'dark': 2, 'fire': 0.5, 'poison': 0.5, 'steel': 0.5 }
};

// Company Pokémon database
const COMPANY_NAMES = [
    'Y Combinator',
    'Google',
    'Meta',
    'BCG',
    'Citadel',
    'Deloitte',
    'Goldman Sachs',
    'Jane Street',
    'Johnson & Johnson',
    'McKinsey',
    'Netflix',
    'SpaceX'
];

// Sample Pokémon data (companies as Pokémon)
const POKEMON_DATABASE = {
    'Y Combinator': {
        name: 'Y Combinator',
        type: 'normal',
        baseHP: 20,
        logo: 'logos/ycombinator-logo.png',
        role: 'Founder'
    },
    'Google': {
        name: 'Google',
        type: 'electric',
        baseHP: 22,
        logo: 'logos/google-lgo.webp',
        role: 'SWE'
    },
    'Meta': {
        name: 'Meta',
        type: 'psychic',
        baseHP: 20,
        logo: 'logos/meta-logo.png',
        role: 'Product Manager'
    },
    'BCG': {
        name: 'BCG',
        type: 'normal',
        baseHP: 20,
        logo: 'logos/BCG-logo.png',
        role: 'Consultant'
    },
    'Citadel': {
        name: 'Citadel',
        type: 'dark',
        baseHP: 22,
        logo: 'logos/citadel-logo.png',
        role: 'Trader'
    },
    'Deloitte': {
        name: 'Deloitte',
        type: 'normal',
        baseHP: 20,
        logo: 'logos/deliotte-logo.avif',
        role: 'Consultant'
    },
    'Goldman Sachs': {
        name: 'Goldman Sachs',
        type: 'steel',
        baseHP: 25,
        logo: 'logos/goldmansachs-logo.png',
        role: 'Analyst'
    },
    'Jane Street': {
        name: 'Jane Street',
        type: 'electric',
        baseHP: 22,
        logo: 'logos/janestreet-logo.jpeg',
        role: 'Trader'
    },
    'Johnson & Johnson': {
        name: 'Johnson & Johnson',
        type: 'normal',
        baseHP: 24,
        logo: 'logos/johnsonandjohnson-logo.png',
        role: 'Product Manager'
    },
    'McKinsey': {
        name: 'McKinsey',
        type: 'psychic',
        baseHP: 23,
        logo: 'logos/Mckinsey-logo.png',
        role: 'Analyst'
    },
    'Netflix': {
        name: 'Netflix',
        type: 'dark',
        baseHP: 21,
        logo: 'logos/netflisx-logo.webp',
        role: 'Product Manager'
    },
    'SpaceX': {
        name: 'SpaceX',
        type: 'flying',
        baseHP: 22,
        logo: 'logos/spacex-logo.png',
        role: 'Engineer'
    }
};

// Move database
const MOVE_DATABASE = {
    'Scratch': { name: 'Scratch', type: 'normal', power: 40, accuracy: 100, pp: 35 },
    'Growl': { name: 'Growl', type: 'normal', power: 0, accuracy: 100, pp: 40, effect: 'lowerAttack' },
    'Assist': { name: 'Assist', type: 'normal', power: 0, accuracy: 100, pp: 20 },
    'Sand Attack': { name: 'Sand Attack', type: 'ground', power: 0, accuracy: 100, pp: 15, effect: 'lowerAccuracy' },
    'Ember': { name: 'Ember', type: 'fire', power: 40, accuracy: 100, pp: 25 },
    'Tail Whip': { name: 'Tail Whip', type: 'normal', power: 0, accuracy: 100, pp: 30, effect: 'lowerDefense' },
    'Howl': { name: 'Howl', type: 'normal', power: 0, accuracy: 100, pp: 40, effect: 'raiseAttack' },
    'Flame Charge': { name: 'Flame Charge', type: 'fire', power: 50, accuracy: 100, pp: 20 },
    'Peck': { name: 'Peck', type: 'flying', power: 35, accuracy: 100, pp: 35 },
    'Quick Attack': { name: 'Quick Attack', type: 'normal', power: 40, accuracy: 100, pp: 30 },
    'Wing Attack': { name: 'Wing Attack', type: 'flying', power: 60, accuracy: 100, pp: 35 },
    'Thunder Shock': { name: 'Thunder Shock', type: 'electric', power: 40, accuracy: 100, pp: 30 },
    'Thunder Wave': { name: 'Thunder Wave', type: 'electric', power: 0, accuracy: 100, pp: 20, effect: 'paralyze' },
    'Spark': { name: 'Spark', type: 'electric', power: 65, accuracy: 100, pp: 20 },
    'Tackle': { name: 'Tackle', type: 'normal', power: 40, accuracy: 100, pp: 35 },
    'Vine Whip': { name: 'Vine Whip', type: 'grass', power: 45, accuracy: 100, pp: 25 },
    'Growth': { name: 'Growth', type: 'normal', power: 0, accuracy: 100, pp: 20, effect: 'raiseAttack' },
    'Razor Leaf': { name: 'Razor Leaf', type: 'grass', power: 55, accuracy: 95, pp: 25 },
    'Water Gun': { name: 'Water Gun', type: 'water', power: 40, accuracy: 100, pp: 25 },
    'Bubble': { name: 'Bubble', type: 'water', power: 40, accuracy: 100, pp: 30 },
    'Withdraw': { name: 'Withdraw', type: 'water', power: 0, accuracy: 100, pp: 40, effect: 'raiseDefense' },
    'Hydro Pump': { name: 'Hydro Pump', type: 'water', power: 110, accuracy: 80, pp: 5 },
    'Aqua Jet': { name: 'Aqua Jet', type: 'water', power: 40, accuracy: 100, pp: 20 },
    'Swords Dance': { name: 'Swords Dance', type: 'normal', power: 0, accuracy: 100, pp: 20, effect: 'raiseAttack' },
    'Megahorn': { name: 'Megahorn', type: 'bug', power: 120, accuracy: 85, pp: 10 },
    'Brave Bird': { name: 'Brave Bird', type: 'flying', power: 120, accuracy: 100, pp: 15 },
    'Iron Head': { name: 'Iron Head', type: 'steel', power: 80, accuracy: 100, pp: 15 },
    'Roost': { name: 'Roost', type: 'flying', power: 0, accuracy: 100, pp: 10, effect: 'heal' },
    'Steel Wing': { name: 'Steel Wing', type: 'steel', power: 70, accuracy: 90, pp: 25 },
    'Headbutt': { name: 'Headbutt', type: 'normal', power: 70, accuracy: 100, pp: 15 },
    'Swift': { name: 'Swift', type: 'normal', power: 60, accuracy: 100, pp: 20 },
    'Rest': { name: 'Rest', type: 'psychic', power: 0, accuracy: 100, pp: 10, effect: 'heal' },
    'Belly Drum': { name: 'Belly Drum', type: 'normal', power: 0, accuracy: 100, pp: 10, effect: 'raiseAttack' },
    'Flamethrower': { name: 'Flamethrower', type: 'fire', power: 90, accuracy: 100, pp: 15 },
    'Shadow Ball': { name: 'Shadow Ball', type: 'ghost', power: 80, accuracy: 100, pp: 15 },
    'Torch Song': { name: 'Torch Song', type: 'fire', power: 80, accuracy: 100, pp: 10 },
    'Will-O-Wisp': { name: 'Will-O-Wisp', type: 'fire', power: 0, accuracy: 85, pp: 15, effect: 'burn' },
    'Earthquake': { name: 'Earthquake', type: 'ground', power: 100, accuracy: 100, pp: 10 },
    'Drill Run': { name: 'Drill Run', type: 'ground', power: 80, accuracy: 95, pp: 10 },
    'Leaf Blade': { name: 'Leaf Blade', type: 'grass', power: 90, accuracy: 100, pp: 15 },
    'Spirit Shackle': { name: 'Spirit Shackle', type: 'ghost', power: 80, accuracy: 100, pp: 10 },
    // High damage moves
    'Fire Blast': { name: 'Fire Blast', type: 'fire', power: 110, accuracy: 85, pp: 5 },
    'Thunder': { name: 'Thunder', type: 'electric', power: 110, accuracy: 70, pp: 10 },
    'Blizzard': { name: 'Blizzard', type: 'ice', power: 110, accuracy: 70, pp: 5 },
    'Solar Beam': { name: 'Solar Beam', type: 'grass', power: 120, accuracy: 100, pp: 10 },
    'Surf': { name: 'Surf', type: 'water', power: 90, accuracy: 100, pp: 15 },
    'Ice Beam': { name: 'Ice Beam', type: 'ice', power: 90, accuracy: 100, pp: 10 },
    'Thunderbolt': { name: 'Thunderbolt', type: 'electric', power: 90, accuracy: 100, pp: 15 },
    'Psychic': { name: 'Psychic', type: 'psychic', power: 90, accuracy: 100, pp: 10 },
    'Dark Pulse': { name: 'Dark Pulse', type: 'dark', power: 80, accuracy: 100, pp: 15 },
    'Night Slash': { name: 'Night Slash', type: 'dark', power: 70, accuracy: 100, pp: 15 },
    'Aerial Ace': { name: 'Aerial Ace', type: 'flying', power: 60, accuracy: 100, pp: 20 },
    'Air Slash': { name: 'Air Slash', type: 'flying', power: 75, accuracy: 95, pp: 15 },
    'Sky Attack': { name: 'Sky Attack', type: 'flying', power: 140, accuracy: 90, pp: 5 },
    'Focus Blast': { name: 'Focus Blast', type: 'fighting', power: 120, accuracy: 70, pp: 5 },
    'Close Combat': { name: 'Close Combat', type: 'fighting', power: 120, accuracy: 100, pp: 5 },
    'Stone Edge': { name: 'Stone Edge', type: 'rock', power: 100, accuracy: 80, pp: 5 },
    'Rock Slide': { name: 'Rock Slide', type: 'rock', power: 75, accuracy: 90, pp: 10 },
    'Sludge Bomb': { name: 'Sludge Bomb', type: 'poison', power: 90, accuracy: 100, pp: 10 },
    'Poison Jab': { name: 'Poison Jab', type: 'poison', power: 80, accuracy: 100, pp: 20 },
    'Dragon Claw': { name: 'Dragon Claw', type: 'dragon', power: 80, accuracy: 100, pp: 15 },
    'Dragon Pulse': { name: 'Dragon Pulse', type: 'dragon', power: 85, accuracy: 100, pp: 10 },
    'Flash Cannon': { name: 'Flash Cannon', type: 'steel', power: 80, accuracy: 100, pp: 10 },
    'Meteor Mash': { name: 'Meteor Mash', type: 'steel', power: 90, accuracy: 90, pp: 10 },
    'Bug Buzz': { name: 'Bug Buzz', type: 'bug', power: 90, accuracy: 100, pp: 10 },
    'X-Scissor': { name: 'X-Scissor', type: 'bug', power: 80, accuracy: 100, pp: 15 },
    'Moonblast': { name: 'Moonblast', type: 'fairy', power: 95, accuracy: 100, pp: 15 },
    'Dazzling Gleam': { name: 'Dazzling Gleam', type: 'fairy', power: 80, accuracy: 100, pp: 10 },
    'Hyper Beam': { name: 'Hyper Beam', type: 'normal', power: 150, accuracy: 90, pp: 5 },
    'Giga Impact': { name: 'Giga Impact', type: 'normal', power: 150, accuracy: 90, pp: 5 },
    'Double-Edge': { name: 'Double-Edge', type: 'normal', power: 120, accuracy: 100, pp: 15 }
};

// Get random moves for a Pokémon based on its type
function getRandomMovesForType(pokemonType, count = 4) {
    // Get type-matching moves with power >= 60
    const typeMoves = Object.keys(MOVE_DATABASE).filter(moveName => {
        const move = MOVE_DATABASE[moveName];
        return (move.type === pokemonType || move.type === 'normal') && move.power >= 60;
    });
    
    // Get all high-damage moves (power >= 70) of any type
    const highDamageMoves = Object.keys(MOVE_DATABASE).filter(moveName => {
        const move = MOVE_DATABASE[moveName];
        return move.power >= 70;
    });
    
    // Combine and prioritize: type moves first, then high-damage moves
    const availableMoves = [...typeMoves, ...highDamageMoves];
    
    // Remove duplicates
    const uniqueMoves = [...new Set(availableMoves)];
    
    // If we don't have enough moves, add any move with power >= 50
    if (uniqueMoves.length < count) {
        const mediumMoves = Object.keys(MOVE_DATABASE).filter(moveName => {
            const move = MOVE_DATABASE[moveName];
            return move.power >= 50 && !uniqueMoves.includes(moveName);
        });
        uniqueMoves.push(...mediumMoves);
    }
    
    // Shuffle and pick random moves
    const shuffled = uniqueMoves.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Type symbols mapping
const TYPE_SYMBOLS = {
    'fire': '🔥',
    'water': '💧',
    'grass': '🌿',
    'electric': '⚡',
    'normal': '⭐',
    'dark': '🌙',
    'flying': '🪶',
    'psychic': '🔮',
    'fighting': '👊',
    'ground': '🌍',
    'ghost': '👻',
    'steel': '⚙️',
    'bug': '🐛',
    'ice': '❄️',
    'dragon': '🐉',
    'poison': '☠️',
    'rock': '🪨',
    'fairy': '✨'
};

// Game State
class GameState {
    constructor() {
        this.playerParty = [];
        this.currentBattle = null;
        this.battleState = 'idle'; // idle, playerTurn, enemyTurn, moveSelection, partySelection, message
        this.selectedMoveIndex = 0;
        this.selectedPartyIndex = -1;
        this.messageQueue = [];
        this.currentMessage = null;
    }

    initGame() {
        // Initialize player with random starter company
        const randomStarter = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
        // Randomly assign gender (50% male, 50% female)
        const starterGender = Math.random() < 0.5 ? '♂' : '♀';
        const starter = this.createPokemon(randomStarter, 4, starterGender);
        this.playerParty = [starter];
        this.startNewBattle();
    }

    createPokemon(species, level, gender) {
        const base = POKEMON_DATABASE[species];
        if (!base) {
            console.error(`Pokémon ${species} not found`);
            return null;
        }

        // HP scales proportionally with level
        // Formula: baseHP * (1 + (level - 1) * 0.2) ensures level 1 gets baseHP and scales up
        const hp = Math.floor(base.baseHP * (1 + (level - 1) * 0.2));

        // Get randomized move set (4 moves with high damage)
        const randomMoves = getRandomMovesForType(base.type, 4);
        
        return {
            species: species,
            name: species,
            level: level,
            gender: gender,
            type: base.type,
            role: base.role,
            maxHP: hp,
            currentHP: hp,
            moves: randomMoves.map(moveName => ({
                ...MOVE_DATABASE[moveName],
                currentPP: MOVE_DATABASE[moveName].pp
            })),
            exp: 0,
            expToNext: 18,
            company: base.company,
            status: null, // null, 'burn', 'paralyze', etc.
            statModifiers: {
                attack: 0,
                defense: 0,
                accuracy: 0
            }
        };
    }

    adjustPokemonLevel(pokemon, newLevel) {
        const base = POKEMON_DATABASE[pokemon.species];
        if (!base) return;

        // Calculate new stats based on new level (proportional scaling)
        const newMaxHP = Math.floor(base.baseHP * (1 + (newLevel - 1) * 0.2));

        // Preserve HP percentage when leveling
        const hpPercent = pokemon.currentHP / pokemon.maxHP;

        // Update level and stats
        pokemon.level = newLevel;
        pokemon.maxHP = newMaxHP;
        pokemon.currentHP = Math.floor(newMaxHP * hpPercent);

        // Ensure HP doesn't exceed max
        if (pokemon.currentHP > pokemon.maxHP) pokemon.currentHP = pokemon.maxHP;
    }

    startNewBattle() {
        // Always create wild Pokémon battles with random company
        const opponentSpecies = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
        // Generate wild Pokémon level between 1 and 100
        const opponentLevel = Math.floor(Math.random() * 100) + 1;
        // Randomly assign gender (50% male, 50% female) - includes female variants
        const opponentGender = Math.random() < 0.5 ? '♂' : '♀';

        const opponent = this.createPokemon(opponentSpecies, opponentLevel, opponentGender);
        
        // Get first non-fainted Pokémon
        const playerPokemon = this.playerParty.find(p => p.currentHP > 0) || this.playerParty[0];
        
        // Balance player Pokémon level to be within 3 levels of opponent
        const currentPlayerLevel = playerPokemon.level;
        const levelDifference = opponentLevel - currentPlayerLevel;
        
        if (Math.abs(levelDifference) > 3) {
            // Adjust player level to be within 3 levels of opponent
            let newPlayerLevel;
            if (levelDifference > 3) {
                // Opponent is much higher, set player to opponent - 3
                newPlayerLevel = opponentLevel - 3;
            } else {
                // Opponent is much lower, set player to opponent + 3
                newPlayerLevel = opponentLevel + 3;
            }
            
            // Ensure level is at least 1
            newPlayerLevel = Math.max(1, newPlayerLevel);
            
            // Adjust player Pokémon level and recalculate stats
            this.adjustPokemonLevel(playerPokemon, newPlayerLevel);
        }
        
        // Balance opponent HP to be close to player's HP (within 20% range)
        const playerHP = playerPokemon.maxHP;
        const opponentHP = opponent.maxHP;
        const hpDifference = Math.abs(opponentHP - playerHP) / playerHP;
        
        if (hpDifference > 0.2) {
            // Adjust opponent HP to be within 20% of player's HP
            // Randomize between 80% and 120% of player's HP for variety
            const targetHP = Math.floor(playerHP * (0.8 + Math.random() * 0.4));
            const hpPercent = opponent.currentHP / opponent.maxHP;
            opponent.maxHP = targetHP;
            opponent.currentHP = Math.floor(targetHP * hpPercent);
            
            // Ensure HP doesn't exceed max
            if (opponent.currentHP > opponent.maxHP) {
                opponent.currentHP = opponent.maxHP;
            }
        }
        
        this.currentBattle = {
            isWild: true,
            opponent: opponent,
            playerPokemon: playerPokemon,
            turn: 'player'
        };

        this.battleState = 'idle';
        this.selectedMoveIndex = 0;
        this.selectedPartyIndex = -1;
    }

    getCurrentPlayerPokemon() {
        return this.currentBattle ? this.currentBattle.playerPokemon : this.playerParty[0];
    }

    getOpponentPokemon() {
        return this.currentBattle ? this.currentBattle.opponent : null;
    }

    calculateDamage(attacker, defender, move) {
        if (move.power === 0) return 0;

        const baseDamage = move.power;
        // Reduced level multiplier to prevent excessive scaling
        const levelMultiplier = Math.sqrt(attacker.level / 5);
        const attackMod = 1 + (attacker.statModifiers.attack * 0.15);
        const defenseMod = 1 - (defender.statModifiers.defense * 0.15);
        
        // Type effectiveness (more impactful)
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        
        // Random variation (0.85 to 1.0)
        const random = 0.85 + Math.random() * 0.15;
        
        // Base damage calculation
        let damage = Math.floor(baseDamage * levelMultiplier * attackMod * defenseMod * effectiveness * random);
        
        // Prevent one-shot kills: damage can't exceed 50% of defender's max HP
        const maxDamage = Math.floor(defender.maxHP * 0.5);
        damage = Math.min(damage, maxDamage);
        
        // Ensure minimum damage of 1
        return Math.max(1, damage);
    }

    getTypeEffectiveness(attackType, defenseType) {
        const chart = TYPE_EFFECTIVENESS[attackType];
        if (!chart) return 1;
        return chart[defenseType] || 1;
    }

    useMove(attacker, defender, moveIndex) {
        const move = attacker.moves[moveIndex];
        if (!move || move.currentPP <= 0) {
            return { success: false, message: `${attacker.name} can't use ${move.name}!` };
        }

        move.currentPP--;

        // Check accuracy - apply accuracy modifiers from stat changes
        // Each accuracy modifier stage changes accuracy by 10% (max -60% to +60%)
        const accuracyModifier = attacker.statModifiers.accuracy * 10;
        const finalAccuracy = Math.max(0, Math.min(100, move.accuracy + accuracyModifier));
        
        // If accuracy was modified, note it in the message (for debugging/transparency)
        let accuracyMessage = '';
        if (attacker.statModifiers.accuracy !== 0) {
            const modifierText = attacker.statModifiers.accuracy > 0 ? 'raised' : 'lowered';
            accuracyMessage = ` (Accuracy ${modifierText} by ${Math.abs(accuracyModifier)}%)`;
        }
        
        if (Math.random() * 100 > finalAccuracy) {
            return { success: false, message: `${attacker.name}'s ${move.name} missed!${accuracyMessage}` };
        }

        // Handle status moves
        if (move.effect) {
            return this.applyMoveEffect(attacker, defender, move);
        }

        // Damage move
        const damage = this.calculateDamage(attacker, defender, move);
        defender.currentHP = Math.max(0, defender.currentHP - damage);
        
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        let message = `${attacker.name} used ${move.name}!`;
        if (effectiveness > 1) {
            message += " It's super effective!";
        } else if (effectiveness < 1) {
            message += " It's not very effective...";
        }
        message += `\n${defender.name} took ${damage} damage!`;

        return { success: true, message: message, damage: damage };
    }

    applyMoveEffect(attacker, defender, move) {
        let message = `${attacker.name} used ${move.name}!`;
        
        switch (move.effect) {
            case 'lowerAttack':
                defender.statModifiers.attack = Math.max(-6, defender.statModifiers.attack - 1);
                message += `\n${defender.name}'s Attack fell!`;
                break;
            case 'lowerDefense':
                defender.statModifiers.defense = Math.max(-6, defender.statModifiers.defense - 1);
                message += `\n${defender.name}'s Defense fell!`;
                break;
            case 'lowerAccuracy':
                defender.statModifiers.accuracy = Math.max(-6, defender.statModifiers.accuracy - 1);
                const accuracyStage = defender.statModifiers.accuracy;
                const accuracyPercent = accuracyStage * 10;
                message += `\n${defender.name}'s Accuracy fell! (${accuracyPercent > 0 ? '+' : ''}${accuracyPercent}%)`;
                break;
            case 'raiseAttack':
                attacker.statModifiers.attack = Math.min(6, attacker.statModifiers.attack + 1);
                message += `\n${attacker.name}'s Attack rose!`;
                break;
            case 'raiseDefense':
                attacker.statModifiers.defense = Math.min(6, attacker.statModifiers.defense + 1);
                message += `\n${attacker.name}'s Defense rose!`;
                break;
            case 'heal':
                const healAmount = Math.floor(attacker.maxHP * 0.5);
                attacker.currentHP = Math.min(attacker.maxHP, attacker.currentHP + healAmount);
                message += `\n${attacker.name} restored HP!`;
                break;
            case 'paralyze':
                defender.status = 'paralyze';
                message += `\n${defender.name} is paralyzed!`;
                break;
            case 'burn':
                defender.status = 'burn';
                message += `\n${defender.name} is burned!`;
                break;
        }
        
        return { success: true, message: message };
    }

    enemyChooseBestMove() {
        const enemy = this.getOpponentPokemon();
        const player = this.getCurrentPlayerPokemon();
        
        // AI: Always prioritize fight actions (damage moves)
        // Choose move with highest damage potential
        let bestMove = null;
        let bestDamage = 0;
        
        // First, find the best damage move
        for (let i = 0; i < enemy.moves.length; i++) {
            const move = enemy.moves[i];
            if (move.currentPP <= 0) continue;
            
            // Prioritize damage moves (fight actions)
            if (move.power > 0) {
                const damage = this.calculateDamage(enemy, player, move);
                if (damage > bestDamage) {
                    bestDamage = damage;
                    bestMove = i;
                }
            }
        }
        
        // If no damage moves available, use first available move
        if (bestMove === null) {
            for (let i = 0; i < enemy.moves.length; i++) {
                if (enemy.moves[i].currentPP > 0) {
                    bestMove = i;
                    break;
                }
            }
        }
        
        // Fallback: if somehow no moves available, return 0
        return bestMove !== null ? bestMove : 0;
    }

    attemptCatch() {
        if (!this.currentBattle) {
            return { success: false, message: "You can't lie on your resume" };
        }

        const opponent = this.getOpponentPokemon();
        const catchRate = (opponent.maxHP - opponent.currentHP) / opponent.maxHP;
        const success = Math.random() < (0.3 + catchRate * 0.5);

        if (success) {
            // Add to party if space available
            if (this.playerParty.length < 6) {
                this.playerParty.push({
                    ...opponent,
                    currentHP: Math.floor(opponent.maxHP * 0.5) // Heal to 50% when caught
                });
                return { success: true, message: `You caught ${opponent.name}!` };
            } else {
                return { success: false, message: "Your party is full! Release a Pokémon first." };
            }
        } else {
            return { success: false, message: `${opponent.name} broke free!` };
        }
    }

    attemptRun() {
        const success = Math.random() < 0.9; // 90% chance to run
        return { success: success, message: success ? "You got away safely!" : "You couldn't get away!" };
    }

    checkBattleEnd() {
        const player = this.getCurrentPlayerPokemon();
        const opponent = this.getOpponentPokemon();
        
        if (player.currentHP <= 0) {
            // Check if player has other Pokémon
            const alivePokemon = this.playerParty.filter(p => p.currentHP > 0);
            if (alivePokemon.length === 0) {
                return 'playerLost';
            }
            // Auto-switch to next Pokémon
            this.currentBattle.playerPokemon = alivePokemon[0];
            return 'playerPokemonFainted';
        }
        
        if (opponent.currentHP <= 0) {
            // Calculate exp gain (don't add it yet - will be animated)
            const expGain = opponent.level * 10;
            const oldExp = player.exp;
            const newExp = oldExp + expGain;
            
            // Check level up
            let leveledUp = false;
            if (newExp >= player.expToNext) {
                leveledUp = true;
            }
            
            // Return exp info for animation
            return {
                result: leveledUp ? 'opponentDefeatedLevelUp' : 'opponentDefeated',
                expGain: expGain,
                oldExp: oldExp,
                newExp: newExp,
                leveledUp: leveledUp
            };
        }
        
        return null;
    }
}

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameState, POKEMON_DATABASE, MOVE_DATABASE, TYPE_SYMBOLS };
}
