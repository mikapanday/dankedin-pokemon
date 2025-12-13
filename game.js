// Game Data and Logic

// Type effectiveness chart (simplified)
const TYPE_EFFECTIVENESS = {
    'fire': { 'grass': 2, 'water': 0.5, 'fire': 0.5 },
    'water': { 'fire': 2, 'grass': 0.5, 'water': 0.5 },
    'grass': { 'water': 2, 'fire': 0.5, 'grass': 0.5 },
    'normal': {},
    'dark': { 'psychic': 2, 'fighting': 0.5 },
    'flying': { 'grass': 2, 'electric': 0.5 },
    'electric': { 'water': 2, 'ground': 0.5 },
    'psychic': { 'fighting': 2, 'dark': 0.5 },
    'fighting': { 'normal': 2, 'psychic': 0.5 },
    'ground': { 'electric': 2, 'flying': 0.5 }
};

// Sample Pokémon data (companies as Pokémon)
const POKEMON_DATABASE = {
    'Purrloin': {
        name: 'Purrloin',
        type: 'dark',
        baseHP: 18,
        baseMP: 12,
        moves: ['Scratch', 'Growl', 'Assist', 'Sand Attack'],
        company: 'Startup Inc'
    },
    'Fennekin': {
        name: 'Fennekin',
        type: 'fire',
        baseHP: 20,
        baseMP: 15,
        moves: ['Ember', 'Tail Whip', 'Howl', 'Flame Charge'],
        company: 'Tech Corp'
    },
    'Fletchling': {
        name: 'Fletchling',
        type: 'flying',
        baseHP: 20,
        baseMP: 12,
        moves: ['Peck', 'Growl', 'Quick Attack', 'Wing Attack'],
        company: 'Aero Systems'
    },
    'Pikachu': {
        name: 'Pikachu',
        type: 'electric',
        baseHP: 22,
        baseMP: 14,
        moves: ['Thunder Shock', 'Quick Attack', 'Thunder Wave', 'Spark'],
        company: 'Power Electric'
    },
    'Bulbasaur': {
        name: 'Bulbasaur',
        type: 'grass',
        baseHP: 20,
        baseMP: 12,
        moves: ['Tackle', 'Vine Whip', 'Growth', 'Razor Leaf'],
        company: 'Green Tech'
    },
    'Squirtle': {
        name: 'Squirtle',
        type: 'water',
        baseHP: 19,
        baseMP: 13,
        moves: ['Tackle', 'Water Gun', 'Bubble', 'Withdraw'],
        company: 'Aqua Solutions'
    },
    'Samurott': {
        name: 'Samurott',
        type: 'water',
        baseHP: 322,
        baseMP: 150,
        moves: ['Hydro Pump', 'Aqua Jet', 'Swords Dance', 'Megahorn'],
        company: 'Ocean Enterprises'
    },
    'Corviknight': {
        name: 'Corviknight',
        type: 'flying',
        baseHP: 327,
        baseMP: 140,
        moves: ['Brave Bird', 'Iron Head', 'Roost', 'Steel Wing'],
        company: 'Sky Industries'
    },
    'Linoone': {
        name: 'Linoone',
        type: 'normal',
        baseHP: 293,
        baseMP: 120,
        moves: ['Headbutt', 'Swift', 'Rest', 'Belly Drum'],
        company: 'Speed Logistics'
    },
    'Skeledirge': {
        name: 'Skeledirge',
        type: 'fire',
        baseHP: 347,
        baseMP: 160,
        moves: ['Flamethrower', 'Shadow Ball', 'Torch Song', 'Will-O-Wisp'],
        company: 'Flame Systems'
    },
    'Excadrill': {
        name: 'Excadrill',
        type: 'ground',
        baseHP: 360,
        baseMP: 130,
        moves: ['Earthquake', 'Drill Run', 'Iron Head', 'Swords Dance'],
        company: 'Mining Co'
    },
    'Decidueye': {
        name: 'Decidueye',
        type: 'grass',
        baseHP: 347,
        baseMP: 150,
        moves: ['Leaf Blade', 'Spirit Shackle', 'Brave Bird', 'Swords Dance'],
        company: 'Forest Tech'
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
    'Spirit Shackle': { name: 'Spirit Shackle', type: 'ghost', power: 80, accuracy: 100, pp: 10 }
};

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
    'bug': '🐛'
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
        // Initialize player with starter Pokémon
        const starter = this.createPokemon('Purrloin', 4, '♀');
        this.playerParty = [starter];
        this.startNewBattle();
    }

    createPokemon(species, level, gender) {
        const base = POKEMON_DATABASE[species];
        if (!base) {
            console.error(`Pokémon ${species} not found`);
            return null;
        }

        const hp = Math.floor(base.baseHP * (level / 5));
        const mp = Math.floor(base.baseMP * (level / 5));

        return {
            species: species,
            name: species,
            level: level,
            gender: gender,
            type: base.type,
            maxHP: hp,
            currentHP: hp,
            maxMP: mp,
            currentMP: mp,
            moves: base.moves.map(moveName => ({
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

    startNewBattle() {
        // Always create wild Pokémon battles
        const speciesList = Object.keys(POKEMON_DATABASE);
        const opponentSpecies = speciesList[Math.floor(Math.random() * speciesList.length)];
        const opponentLevel = Math.floor(Math.random() * 10) + 3; // Level 3-12
        const opponentGender = Math.random() < 0.5 ? '♂' : '♀';

        const opponent = this.createPokemon(opponentSpecies, opponentLevel, opponentGender);
        
        // Get first non-fainted Pokémon
        const playerPokemon = this.playerParty.find(p => p.currentHP > 0) || this.playerParty[0];
        
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
        const levelMultiplier = attacker.level / 5;
        const attackMod = 1 + (attacker.statModifiers.attack * 0.25);
        const defenseMod = 1 - (defender.statModifiers.defense * 0.25);
        
        // Type effectiveness
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        
        // Random variation (0.85 to 1.0)
        const random = 0.85 + Math.random() * 0.15;
        
        const damage = Math.floor(baseDamage * levelMultiplier * attackMod * defenseMod * effectiveness * random);
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

        // Check accuracy
        const accuracy = move.accuracy + (attacker.statModifiers.accuracy * 5);
        if (Math.random() * 100 > accuracy) {
            return { success: false, message: `${attacker.name}'s ${move.name} missed!` };
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
                message += `\n${defender.name}'s Accuracy fell!`;
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
            // Give exp
            const expGain = opponent.level * 10;
            player.exp += expGain;
            
            // Check level up
            if (player.exp >= player.expToNext) {
                player.level++;
                player.exp -= player.expToNext;
                player.expToNext = player.expToNext * 1.5;
                // Heal on level up
                player.currentHP = player.maxHP;
                player.currentMP = player.maxMP;
                return 'opponentDefeatedLevelUp';
            }
            
            return 'opponentDefeated';
        }
        
        return null;
    }
}

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameState, POKEMON_DATABASE, MOVE_DATABASE, TYPE_SYMBOLS };
}
