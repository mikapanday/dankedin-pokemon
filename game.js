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

// Company names for recruiters/opponents
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

// Applicant statuses for player Pokémon
const APPLICANT_STATUSES = [
    'Undergrad',
    'Unemployed',
    '2+ years of experience',
    '5+ years of experience',
    '10+ years of experience',
    '20+ years of experience',
    'Recent Grad',
    'Bootcamp Graduate',
    'Intern',
    'Freelancer',
    'Self-Taught',
    'Master\'s Degree',
    'MBA',
    'PhD'
];

// Applicant database for player Pokémon
// Levels and HP scale with experience: younger/inexperienced = lower, experienced = higher
const APPLICANT_DATABASE = {
    'Unemployed': {
        name: 'Unemployed',
        type: 'normal',
        baseHP: 15,
        baseLevel: 3,
        logo: 'applicants/unemployed.png',
        role: 'Job Seeker'
    },
    'Intern': {
        name: 'Intern',
        type: 'normal',
        baseHP: 16,
        baseLevel: 4,
        logo: 'applicants/intern.png',
        role: 'Intern'
    },
    'Undergrad': {
        name: 'Undergrad',
        type: 'normal',
        baseHP: 18,
        baseLevel: 5,
        logo: 'applicants/undergrad.png',
        role: 'Student'
    },
    'Recent Grad': {
        name: 'Recent Grad',
        type: 'normal',
        baseHP: 20,
        baseLevel: 7,
        logo: 'applicants/recentgrad.png',
        role: 'New Grad'
    },
    'Bootcamp Graduate': {
        name: 'Bootcamp Graduate',
        type: 'normal',
        baseHP: 22,
        baseLevel: 10,
        logo: 'applicants/bootcamp.png',
        role: 'Bootcamp Grad'
    },
    'Self-Taught': {
        name: 'Self-Taught',
        type: 'normal',
        baseHP: 23,
        baseLevel: 12,
        logo: 'applicants/selftaught.png',
        role: 'Self-Learner'
    },
    'Freelancer': {
        name: 'Freelancer',
        type: 'normal',
        baseHP: 28,
        baseLevel: 25,
        logo: 'applicants/linkedin-profile-4.png',
        role: 'Freelancer'
    },
    '2+ years of experience': {
        name: '2+ years of experience',
        type: 'normal',
        baseHP: 30,
        baseLevel: 28,
        logo: 'applicants/2years.png',
        role: 'Experienced'
    },
    'Master\'s Degree': {
        name: 'Master\'s Degree',
        type: 'psychic',
        baseHP: 35,
        baseLevel: 45,
        logo: 'applicants/masters.png',
        role: 'Graduate'
    },
    '5+ years of experience': {
        name: '5+ years of experience',
        type: 'normal',
        baseHP: 38,
        baseLevel: 42,
        logo: 'applicants/5years.png',
        role: 'Mid-Level'
    },
    'MBA': {
        name: 'MBA',
        type: 'psychic',
        baseHP: 40,
        baseLevel: 50,
        logo: 'applicants/mba.png',
        role: 'Business Graduate'
    },
    'PhD': {
        name: 'PhD',
        type: 'psychic',
        baseHP: 42,
        baseLevel: 55,
        logo: 'applicants/phd.png',
        role: 'Doctorate'
    },
    '10+ years of experience': {
        name: '10+ years of experience',
        type: 'normal',
        baseHP: 45,
        baseLevel: 65,
        logo: 'applicants/10years.png',
        role: 'Senior'
    },
    '20+ years of experience': {
        name: '20+ years of experience',
        type: 'normal',
        baseHP: 50,
        baseLevel: 90,
        logo: 'applicants/20years.png',
        role: 'Veteran'
    }
};

// Company Pokémon database (for recruiters/opponents)
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

// User/Interviewee moves - moves the player can use
const USER_MOVE_DATABASE = {
    'SlideInDM': { name: 'Slide in DM', type: 'normal', power: 40, accuracy: 100, pp: 35 },
    'PlayFootsies': { name: 'Play Footsies', type: 'normal', power: 40, accuracy: 100, pp: 35, customMessage: 'goes in for hug and play footsies' },
    'Nepotism': { name: 'Nepotism', type: 'fire', power: 110, accuracy: 85, pp: 5 },
    'SendPortfolio': { name: 'Send Portfolio', type: 'water', power: 20, accuracy: 100, pp: 30 },
    'FollowUpEmail': { name: 'Follow up Email', type: 'electric', power: 20, accuracy: 100, pp: 30 },
    'BeggedOnKnees': { name: 'Begged on your knees', type: 'normal', power: 25, accuracy: 100, pp: 20 },
    'Referral': { name: 'Referral', type: 'normal', power: 40, accuracy: 100, pp: 15 },
    'ColdEmail': { name: 'Cold Email', type: 'fire', power: 20, accuracy: 100, pp: 25 },
    'LinkedInStalk': { name: 'LinkedIn Stalk', type: 'fire', power: 25, accuracy: 100, pp: 20 },
    'CoffeeChat': { name: 'Coffee Chat', type: 'flying', power: 18, accuracy: 100, pp: 35 },
    'ApplicationSubmitted': { name: 'Application Submitted', type: 'normal', power: 20, accuracy: 100, pp: 30 },
    'NetworkingEvent': { name: 'Networking Event', type: 'flying', power: 30, accuracy: 100, pp: 35 },
    'InterviewPrep': { name: 'Interview Prep', type: 'normal', power: 0, accuracy: 100, pp: 20, effect: 'raiseAttack' },
    'CoverLetter': { name: 'Cover Letter', type: 'grass', power: 28, accuracy: 95, pp: 25 },
    'ThankYouEmail': { name: 'Thank You Email', type: 'water', power: 20, accuracy: 100, pp: 25 },
    'AskForFeedback': { name: 'Ask for Feedback', type: 'water', power: 0, accuracy: 100, pp: 40, effect: 'raiseDefense' },
    'Bribed': { name: 'Bribed', type: 'water', power: 55, accuracy: 80, pp: 5 },
    'CounterOffer': { name: 'Counter Offer', type: 'water', power: 20, accuracy: 100, pp: 20 },
    'ConfidenceBoost': { name: 'Confidence Boost', type: 'normal', power: 0, accuracy: 100, pp: 20, effect: 'raiseAttack' },
    'FakeItTillYouMakeIt': { name: 'Fake It Till You Make It', type: 'normal', power: 0, accuracy: 100, pp: 40, effect: 'raiseAttack' },
    'NameDrop': { name: 'Name Drop', type: 'normal', power: 0, accuracy: 100, pp: 20 },
    'SalaryNegotiation': { name: 'Salary Negotiation', type: 'electric', power: 33, accuracy: 100, pp: 20 },
    'NegotiateBenefits': { name: 'Negotiate Benefits', type: 'fire', power: 40, accuracy: 100, pp: 10 },
    'AcceptOffer': { name: 'Accept Offer', type: 'fire', power: 0, accuracy: 85, pp: 15, effect: 'burn' },
    'DeclineOffer': { name: 'Decline Offer', type: 'ground', power: 50, accuracy: 100, pp: 10 },
    'MultipleApplications': { name: 'Multiple Applications', type: 'bug', power: 40, accuracy: 100, pp: 15 },
    'PerfectResume': { name: 'Perfect Resume', type: 'fighting', power: 60, accuracy: 100, pp: 5 },
    'StrongPortfolio': { name: 'Strong Portfolio', type: 'rock', power: 50, accuracy: 80, pp: 5 },
    'GreatReferences': { name: 'Great References', type: 'rock', power: 38, accuracy: 90, pp: 10 },
    'StandoutCandidate': { name: 'Standout Candidate', type: 'dragon', power: 40, accuracy: 100, pp: 15 },
    'ImpressiveExperience': { name: 'Impressive Experience', type: 'dragon', power: 43, accuracy: 100, pp: 10 },
    'StrongNetwork': { name: 'Strong Network', type: 'steel', power: 40, accuracy: 100, pp: 10 },
    'KillerCoverLetter': { name: 'Killer Cover Letter', type: 'steel', power: 45, accuracy: 90, pp: 10 },
    'PerfectTiming': { name: 'Perfect Timing', type: 'fairy', power: 48, accuracy: 100, pp: 15 },
    'GreatFirstImpression': { name: 'Great First Impression', type: 'fairy', power: 40, accuracy: 100, pp: 10 },
    'MultipleOffers': { name: 'Multiple Offers', type: 'normal', power: 75, accuracy: 90, pp: 5 },
    'DesperateApplication': { name: 'Desperate Application', type: 'normal', power: 60, accuracy: 100, pp: 15 }
};

// Recruiter moves - moves the opponent/recruiter can use
// Power values reduced to make battles last longer (at least 5 turns)
const RECRUITER_MOVE_DATABASE = {
    'TechnicalInterview': { name: 'Technical Interview', type: 'bug', power: 60, accuracy: 85, pp: 10 },
    'Rejected': { name: 'Rejected', type: 'normal', power: 0, accuracy: 100, pp: 40, effect: 'lowerAttack' },
    'MovedOnToAnotherCandidate': { name: 'Moved on to another Candidate', type: 'ground', power: 0, accuracy: 100, pp: 15, effect: 'lowerAccuracy' },
    'Ghosted': { name: 'Ghosted', type: 'ground', power: 0, accuracy: 100, pp: 15, effect: 'lowerAccuracy' },
    'PhoneScreen': { name: 'Phone Screen', type: 'electric', power: 0, accuracy: 100, pp: 20, effect: 'paralyze' },
    'BehavioralInterview': { name: 'Behavioral Interview', type: 'normal', power: 35, accuracy: 100, pp: 15 },
    'SystemDesign': { name: 'System Design', type: 'normal', power: 30, accuracy: 100, pp: 20 },
    'WhiteboardChallenge': { name: 'Whiteboard Challenge', type: 'psychic', power: 0, accuracy: 100, pp: 10, effect: 'heal' },
    'TakeHomeAssignment': { name: 'Take Home Assignment', type: 'flying', power: 0, accuracy: 100, pp: 10, effect: 'heal' },
    'FinalRound': { name: 'Final Round', type: 'flying', power: 60, accuracy: 100, pp: 15 },
    'BackgroundCheck': { name: 'Background Check', type: 'steel', power: 40, accuracy: 100, pp: 15 },
    'ReferenceCheck': { name: 'Reference Check', type: 'steel', power: 35, accuracy: 90, pp: 25 },
    'CultureFit': { name: 'Culture Fit', type: 'normal', power: 0, accuracy: 100, pp: 10, effect: 'raiseAttack' },
    'OfferLetter': { name: 'Offer Letter', type: 'fire', power: 45, accuracy: 100, pp: 15 },
    'SignBonus': { name: 'Sign Bonus', type: 'ghost', power: 40, accuracy: 100, pp: 15 },
    'LowballOffer': { name: 'Lowball Offer', type: 'normal', power: 0, accuracy: 100, pp: 30, effect: 'lowerDefense' },
    'RejectionEmail': { name: 'Rejection Email', type: 'poison', power: 40, accuracy: 100, pp: 20 },
    'PortfolioReview': { name: 'Portfolio Review', type: 'water', power: 20, accuracy: 100, pp: 30 },
    'StartDate': { name: 'Start Date', type: 'ground', power: 40, accuracy: 95, pp: 10 },
    'Onboarding': { name: 'Onboarding', type: 'grass', power: 45, accuracy: 100, pp: 15 },
    'DreamJobOffer': { name: 'Dream Job Offer', type: 'flying', power: 70, accuracy: 90, pp: 5 },
    'AceTheInterview': { name: 'Ace the Interview', type: 'fighting', power: 60, accuracy: 70, pp: 5 }
};

// Combined database for backwards compatibility (used in move lookup)
const MOVE_DATABASE = { ...USER_MOVE_DATABASE, ...RECRUITER_MOVE_DATABASE };

// Get random moves for a Pokémon based on role (user/interviewee or recruiter)
function getRandomMovesForType(pokemonType, count = 4, isRecruiter = false) {
    // Select the appropriate move database based on role
    const moveDatabase = isRecruiter ? RECRUITER_MOVE_DATABASE : USER_MOVE_DATABASE;
    
    // Get all available moves from the appropriate database
    const allMoves = Object.keys(moveDatabase);
    
    // Shuffle all moves randomly
    const shuffled = allMoves.sort(() => Math.random() - 0.5);
    
    // Pick random moves (ensuring we get exactly count moves)
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
        this.previousCompany = null; // Track previous company to avoid repeats
    }

    initGame() {
        // Initialize player with random starter applicant status
        const randomStarter = APPLICANT_STATUSES[Math.floor(Math.random() * APPLICANT_STATUSES.length)];
        // Get the base level for this applicant status
        const applicantData = APPLICANT_DATABASE[randomStarter];
        const starterLevel = applicantData ? applicantData.baseLevel : 5; // Default to 5 if not found
        // Randomly assign gender (50% male, 50% female)
        const starterGender = Math.random() < 0.5 ? '♂' : '♀';
        const starter = this.createPokemon(randomStarter, starterLevel, starterGender, false); // false = user/interviewee
        this.playerParty = [starter];
        this.startNewBattle();
    }

    createPokemon(species, level, gender, isRecruiter = false) {
        // Use applicant database for players, company database for recruiters
        const base = isRecruiter ? POKEMON_DATABASE[species] : APPLICANT_DATABASE[species];
        if (!base) {
            console.error(`Pokémon ${species} not found`);
            return null;
        }

        // HP calculation: For applicants, HP scales with their base level (experience)
        // For recruiters, use standard level-based scaling
        let hp;
        if (!isRecruiter && base.baseLevel) {
            // For applicants, HP scales based on their base level (experience)
            // Use a gentler scaling: baseHP * (1 + (baseLevel - 1) * 0.12)
            hp = Math.floor(base.baseHP * (1 + (base.baseLevel - 1) * 0.12));
        } else {
            // For recruiters or applicants without baseLevel, use standard scaling
            hp = Math.floor(base.baseHP * (1 + (level - 1) * 0.2));
        }

        // Get randomized move set (4 moves) - use recruiter moves for opponents, user moves for players
        const randomMoves = getRandomMovesForType(base.type, 4, isRecruiter);
        
        // Get the appropriate move database
        const moveDatabase = isRecruiter ? RECRUITER_MOVE_DATABASE : USER_MOVE_DATABASE;
        
        return {
            species: species,
            name: species,
            level: level, // Use the passed level (which is baseLevel for applicants from initGame)
            gender: gender,
            type: base.type,
            role: base.role,
            maxHP: hp,
            currentHP: hp,
            moves: randomMoves.map(moveName => ({
                ...moveDatabase[moveName],
                currentPP: moveDatabase[moveName].pp
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
        // Check both databases to find the Pokémon
        const base = APPLICANT_DATABASE[pokemon.species] || POKEMON_DATABASE[pokemon.species];
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
        // Filter out previous company to avoid repeats
        const availableCompanies = COMPANY_NAMES.filter(company => company !== this.previousCompany);
        // If somehow all companies are filtered out (shouldn't happen), use all companies
        const companiesToChooseFrom = availableCompanies.length > 0 ? availableCompanies : COMPANY_NAMES;
        const opponentSpecies = companiesToChooseFrom[Math.floor(Math.random() * companiesToChooseFrom.length)];
        // Track this company as the previous one
        this.previousCompany = opponentSpecies;
        // Generate wild Pokémon level between 1 and 100
        const opponentLevel = Math.floor(Math.random() * 100) + 1;
        // Randomly assign gender (50% male, 50% female) - includes female variants
        const opponentGender = Math.random() < 0.5 ? '♂' : '♀';

        const opponent = this.createPokemon(opponentSpecies, opponentLevel, opponentGender, true); // true = isRecruiter
        // Change opponent name to "Recruiter from [Company]"
        opponent.name = `Recruiter from ${opponentSpecies}`;
        
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
        if (move.power === 0) return { damage: 0, isCritical: false };

        // Base damage range: 20-80 points
        const baseDamage = 20 + Math.floor(Math.random() * 61); // Random between 20-80
        
        // Check for critical hit (10% chance)
        const isCritical = Math.random() < 0.1;
        const criticalMultiplier = isCritical ? 2.0 : 1.0;
        
        // Reduced level multiplier to make battles last longer
        const levelMultiplier = Math.sqrt(attacker.level / 10);
        const attackMod = 1 + (attacker.statModifiers.attack * 0.1);
        const defenseMod = 1 - (defender.statModifiers.defense * 0.1);
        
        // Type effectiveness
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        
        // Random variation (0.85 to 1.0)
        const random = 0.85 + Math.random() * 0.15;
        
        // Base damage calculation
        let damage = Math.floor(baseDamage * levelMultiplier * attackMod * defenseMod * effectiveness * random * criticalMultiplier);
        
        // Limit damage to 15% of max HP per hit to ensure battles last at least 5-7 turns
        const maxDamage = Math.floor(defender.maxHP * 0.15);
        damage = Math.min(damage, maxDamage);
        
        // Ensure minimum damage of 1
        damage = Math.max(1, damage);
        
        return { damage: damage, isCritical: isCritical };
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
        const damageResult = this.calculateDamage(attacker, defender, move);
        const damage = damageResult.damage;
        const isCritical = damageResult.isCritical;
        defender.currentHP = Math.max(0, defender.currentHP - damage);
        
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        // Use custom message if available, otherwise use default
        let message = move.customMessage 
            ? `${attacker.name} ${move.customMessage}!`
            : `${attacker.name} used ${move.name}!`;
        
        // Add critical hit message
        if (isCritical) {
            message += " A critical hit!";
        }
        
        if (effectiveness > 1) {
            message += " It's super effective!";
        } else if (effectiveness < 1) {
            message += " It's not very effective...";
        }
        message += `\n${defender.name} took ${damage} damage!`;

        return { success: true, message: message, damage: damage, isCritical: isCritical };
    }

    applyMoveEffect(attacker, defender, move) {
        // Use custom message if available, otherwise use default
        let message = move.customMessage 
            ? `${attacker.name} ${move.customMessage}!`
            : `${attacker.name} used ${move.name}!`;
        
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
                const damageResult = this.calculateDamage(enemy, player, move);
                const damage = damageResult.damage;
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
        const hpPercent = (opponent.currentHP / opponent.maxHP) * 100;
        const catchRate = (opponent.maxHP - opponent.currentHP) / opponent.maxHP;
        
        let baseChance, multiplier;
        
        // Red HP (10% or below) - much easier to catch
        if (hpPercent <= 10) {
            baseChance = 0.4;
            multiplier = 0.6;
        }
        // Yellow HP (33.33% or below) - easier to catch
        else if (hpPercent <= 33.33) {
            baseChance = 0.25;
            multiplier = 0.5;
        }
        // Green HP (above 33.33%) - normal catch rate
        else {
            baseChance = 0.1;
            multiplier = 0.3;
        }
        
        const success = Math.random() < (baseChance + catchRate * multiplier);

        if (success) {
            // Add to party if space available
            if (this.playerParty.length < 6) {
                // Convert recruiter to random applicant status with user moves
                const randomApplicantStatus = APPLICANT_STATUSES[Math.floor(Math.random() * APPLICANT_STATUSES.length)];
                const userPokemon = this.createPokemon(randomApplicantStatus, opponent.level, opponent.gender, false); // false = user/interviewee
                userPokemon.currentHP = Math.floor(userPokemon.maxHP * 0.5); // Heal to 50% when caught
                this.playerParty.push(userPokemon);
                return { success: true, message: `You caught ${randomApplicantStatus}!` };
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
    module.exports = { GameState, POKEMON_DATABASE, APPLICANT_DATABASE, MOVE_DATABASE, TYPE_SYMBOLS };
}
