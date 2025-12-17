// UI Controller and Event Handlers

let gameState = new GameState();
let currentActionCursor = -1; // -1 means no button selected initially
let currentMoveCursor = -1; // -1 means no move selected initially
let currentPartyCursor = 0;
let isProcessing = false;
let typingTimeout = null; // Track typing effect timeout
let currentRandomMoves = []; // Store the current randomized moves for the skills menu

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    // Don't initialize game until start button is clicked
    // Start screen will be shown by default
});

// Typing effect function
function typeText(element, text, speed = 30, callback = null) {
    // Clear any existing typing effect
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    
    element.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, speed);
        } else {
            typingTimeout = null;
            if (callback) callback();
        }
    }
    
    type();
}

// Trigger spawn animations for new battle
function triggerSpawnAnimations() {
    const opponentSprite = document.getElementById('opponentSprite');
    const playerSprite = document.getElementById('playerSprite');
    const opponentInfo = document.getElementById('opponentInfo');
    const playerInfo = document.getElementById('playerInfo');
    
    // Remove any existing spawn classes
    opponentSprite.classList.remove('spawning');
    playerSprite.classList.remove('spawning');
    opponentInfo.classList.remove('spawning');
    playerInfo.classList.remove('spawning');
    
    // Force reflow to restart animation
    void opponentSprite.offsetWidth;
    void playerSprite.offsetWidth;
    void opponentInfo.offsetWidth;
    void playerInfo.offsetWidth;
    
    // Add spawn classes
    opponentSprite.classList.add('spawning');
    playerSprite.classList.add('spawning');
    opponentInfo.classList.add('spawning');
    playerInfo.classList.add('spawning');
    
    // Remove classes after animation completes
    setTimeout(() => {
        opponentSprite.classList.remove('spawning');
        playerSprite.classList.remove('spawning');
        opponentInfo.classList.remove('spawning');
        playerInfo.classList.remove('spawning');
    }, 500);
}

// Show battle start message with typing effect
function showBattleStartMessage() {
    const commentatingText = document.getElementById('commentatingText');
    const battle = gameState.currentBattle;
    
    if (!battle) return;
    
    const player = gameState.getCurrentPlayerPokemon();
    const opponent = battle.opponent;
    // Get the company name from the species (opponent.name is "Recruiter from [Company]")
    const opponentCompany = opponent.species;
    const playerStatus = player.name; // Player is now an applicant status, not a company
    
    // Always use "A recruiter from [company]"
    const message = `A recruiter from ${opponentCompany} appears! Can you, as ${playerStatus}, land this job?`;
    
    typeText(commentatingText, message, 30);
}

// Update commentating section with typing effect
function updateCommentatingText(text, speed = 30) {
    const commentatingText = document.getElementById('commentatingText');
    typeText(commentatingText, text, speed);
}

// Show battle message in commentating window with typing effect
function showBattleMessage(text, callback = null, speed = 30) {
    const commentatingText = document.getElementById('commentatingText');
    // Replace newlines with spaces for single-line display
    const singleLineText = text.replace(/\n/g, ' ');
    typeText(commentatingText, singleLineText, speed, callback);
}

// Animate XP gain with meter animation
function animateExpGain(expData, callback) {
    const player = gameState.getCurrentPlayerPokemon();
    const expBar = document.getElementById('playerExpFill');
    const expText = document.getElementById('playerExpText');
    
    // Show XP gain message in commentary
    const xpMessage = `${player.name} gained ${expData.expGain} EXP!`;
    showBattleMessage(xpMessage, () => {
        // Animate XP bar filling up
        const oldExpPercent = (expData.oldExp / player.expToNext) * 100;
        const newExpPercent = Math.min(100, (expData.newExp / player.expToNext) * 100);
        
        // Actually add the XP to the player
        player.exp = expData.newExp;
        
        // Animate the bar from old to new
        let currentPercent = oldExpPercent;
        const targetPercent = newExpPercent;
        const duration = 1500; // 1.5 seconds
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentPercent = oldExpPercent + (targetPercent - oldExpPercent) * easeOut;
            
            const currentExp = Math.floor(expData.oldExp + (expData.newExp - expData.oldExp) * easeOut);
            
            expBar.style.width = `${currentPercent}%`;
            expText.textContent = `EXP ${currentExp}/${player.expToNext}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                expBar.style.width = `${newExpPercent}%`;
                expText.textContent = `EXP ${expData.newExp}/${player.expToNext}`;
                updateUI();
                if (callback) callback();
            }
        }
        
        animate();
    });
}

// Trigger attack animation on sprite
function triggerAttackAnimation(isPlayer) {
    const spriteId = isPlayer ? 'playerSprite' : 'opponentSprite';
    const sprite = document.getElementById(spriteId);
    
    if (sprite) {
        // Remove any existing attack class to restart animation
        sprite.classList.remove('attacking');
        
        // Force reflow to restart animation
        void sprite.offsetWidth;
        
        // Add attacking class to trigger animation
        sprite.classList.add('attacking');
        
        // Remove class after animation completes
        setTimeout(() => {
            sprite.classList.remove('attacking');
        }, 400); // Match animation duration
    }
}

// Trigger damage flash animation on sprite
function triggerDamageAnimation(isPlayer) {
    const spriteId = isPlayer ? 'playerSprite' : 'opponentSprite';
    const sprite = document.getElementById(spriteId);
    const placeholder = sprite.querySelector('.pokemon-placeholder');
    
    if (sprite && placeholder) {
        // Add damaged class to both sprite and placeholder
        sprite.classList.add('damaged');
        placeholder.classList.add('damaged');
        
        // Remove classes after animation completes
        setTimeout(() => {
            sprite.classList.remove('damaged');
            placeholder.classList.remove('damaged');
        }, 600); // Match animation duration
    }
}

// Trigger death animation for player
function triggerDeathAnimation(callback) {
    const playerSprite = document.getElementById('playerSprite');
    
    if (playerSprite) {
        // Remove any existing fainted class to restart animation
        playerSprite.classList.remove('fainted');
        
        // Force reflow to restart animation
        void playerSprite.offsetWidth;
        
        // Add fainted class to trigger animation
        playerSprite.classList.add('fainted');
        
        // Call callback after animation completes (1.2 seconds)
        setTimeout(() => {
            if (callback) callback();
        }, 1200);
    } else {
        // If sprite not found, just call callback immediately
        if (callback) callback();
    }
}

function setupEventListeners() {
    // Start game button
    document.getElementById('startGameBtn').addEventListener('click', () => startGame());

    // Action menu buttons
    document.getElementById('fightBtn').addEventListener('click', () => handleAction('fight'));
    document.getElementById('ballBtn').addEventListener('click', () => handleAction('ball'));
    document.getElementById('pokemonBtn').addEventListener('click', () => handleAction('pokemon'));
    document.getElementById('runBtn').addEventListener('click', () => handleAction('run'));

    // Move menu
    document.getElementById('moveMenuBackBtn').addEventListener('click', () => closeMoveMenu());

    // Party menu
    document.getElementById('partyMenuBackBtn').addEventListener('click', () => closePartyMenu());
    document.getElementById('sendOutBtn').addEventListener('click', () => handleSendOut());
    document.getElementById('cancelPartyBtn').addEventListener('click', () => closePartyMenu());

    // Message continue
    document.getElementById('messageContinue').addEventListener('click', () => handleMessageContinue());

    // Restart button
    document.getElementById('restartBtn').addEventListener('click', () => restartGame());

    // Results buttons
    document.getElementById('restartResultsBtn').addEventListener('click', () => restartGame());

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
    if (isProcessing) return;

    const moveMenu = document.getElementById('moveMenu');
    const partyMenu = document.getElementById('partyMenu');
    const messageBox = document.getElementById('messageBox');

    if (messageBox.style.display !== 'none') {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMessageContinue();
        }
        return;
    }

    if (moveMenu.style.display !== 'none') {
        handleMoveMenuKeyboard(e);
        return;
    }

    if (partyMenu.style.display !== 'none') {
        handlePartyMenuKeyboard(e);
        return;
    }

    // Action menu navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const rows = 2;
        const cols = 2;
        const currentRow = Math.floor(currentActionCursor / cols);
        const currentCol = currentActionCursor % cols;

        if (e.key === 'ArrowUp' && currentRow > 0) {
            currentActionCursor -= cols;
        } else if (e.key === 'ArrowDown' && currentRow < rows - 1) {
            currentActionCursor += cols;
        } else if (e.key === 'ArrowLeft' && currentCol > 0) {
            currentActionCursor--;
        } else if (e.key === 'ArrowRight' && currentCol < cols - 1) {
            currentActionCursor++;
        }

        currentActionCursor = Math.max(0, Math.min(3, currentActionCursor));
        updateActionMenuCursor();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const actions = ['fight', 'ball', 'pokemon', 'run'];
        handleAction(actions[currentActionCursor]);
    }
}

function handleMoveMenuKeyboard(e) {
    const moves = gameState.getCurrentPlayerPokemon().moves;
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentMoveCursor === -1) {
            currentMoveCursor = moves.length - 1;
        } else {
            currentMoveCursor = Math.max(0, currentMoveCursor - 1);
        }
        updateMoveMenuCursor();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentMoveCursor === -1) {
            currentMoveCursor = 0;
        } else {
            currentMoveCursor = Math.min(moves.length - 1, currentMoveCursor + 1);
        }
        updateMoveMenuCursor();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (currentMoveCursor >= 0 && currentMoveCursor < moves.length) {
            selectMove(currentMoveCursor);
        }
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        closeMoveMenu();
    }
}

function handlePartyMenuKeyboard(e) {
    const party = gameState.playerParty;
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentPartyCursor = Math.max(0, currentPartyCursor - 1);
        updatePartyMenuCursor();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentPartyCursor = Math.min(party.length - 1, currentPartyCursor + 1);
        updatePartyMenuCursor();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (currentPartyCursor >= 0 && currentPartyCursor < party.length) {
            selectPartyMember(currentPartyCursor);
        }
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        closePartyMenu();
    }
}

function updateActionMenuCursor() {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach((btn, index) => {
        if (index === currentActionCursor) {
            btn.classList.add('selected');
            // Cursor visibility is handled by CSS (.action-btn.selected .action-cursor)
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // If no button is selected, ensure all are unselected
    if (currentActionCursor === -1) {
        buttons.forEach((btn) => {
            btn.classList.remove('selected');
        });
    }
}

function updateMoveMenuCursor() {
    const moveItems = document.querySelectorAll('.move-item');
    moveItems.forEach((item, index) => {
        if (index === currentMoveCursor) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    
    // If no move is selected, ensure all are unselected
    if (currentMoveCursor === -1) {
        moveItems.forEach((item) => {
            item.classList.remove('selected');
        });
    }
}

function updatePartyMenuCursor() {
    const partyItems = document.querySelectorAll('.party-item');
    partyItems.forEach((item, index) => {
        if (index === currentPartyCursor) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

function handleAction(action) {
    if (isProcessing) return;

    switch (action) {
        case 'fight':
            showMoveMenu();
            break;
        case 'ball':
            handleBallAction();
            break;
        case 'pokemon':
            showPartyMenu();
            break;
        case 'run':
            handleRunAction();
            break;
    }
}

function showMoveMenu() {
    const moveMenu = document.getElementById('moveMenu');
    const actionMenu = document.getElementById('actionMenu');
    moveMenu.style.display = 'flex';
    actionMenu.style.display = 'none';
    
    // Generate a new random set of 4 moves from USER_MOVE_DATABASE
    const allUserMoves = Object.keys(USER_MOVE_DATABASE);
    const shuffled = allUserMoves.sort(() => Math.random() - 0.5);
    currentRandomMoves = shuffled.slice(0, 4); // Get 4 random moves
    
    const movesList = document.getElementById('movesList');
    movesList.innerHTML = '';
    
    // Display the randomized moves
    currentRandomMoves.forEach((moveKey, index) => {
        const move = USER_MOVE_DATABASE[moveKey];
        const moveItem = document.createElement('div');
        moveItem.className = 'move-item';
        // Don't preselect any move - start with no selection
        
        const moveCursor = document.createElement('span');
        moveCursor.className = 'move-cursor';
        moveCursor.textContent = '▶';
        
        const moveInfo = document.createElement('div');
        moveInfo.className = 'move-info';
        
        const moveName = document.createElement('div');
        moveName.className = 'move-name';
        moveName.textContent = move.name;
        
        moveInfo.appendChild(moveName);
        moveItem.appendChild(moveCursor);
        moveItem.appendChild(moveInfo);
        
        moveItem.addEventListener('click', () => {
            currentMoveCursor = index;
            updateMoveMenuCursor();
            selectMove(index);
        });
        
        movesList.appendChild(moveItem);
    });
}

function closeMoveMenu() {
    document.getElementById('moveMenu').style.display = 'none';
    document.getElementById('actionMenu').style.display = 'flex';
    currentMoveCursor = -1; // Reset to no selection
}

function selectMove(moveIndex) {
    if (isProcessing) return;
    
    closeMoveMenu();
    isProcessing = true;
    
    const player = gameState.getCurrentPlayerPokemon();
    const opponent = gameState.getOpponentPokemon();
    
    // Get the selected move from the randomized moves
    if (moveIndex < 0 || moveIndex >= currentRandomMoves.length) {
        isProcessing = false;
        return;
    }
    
    const selectedMoveKey = currentRandomMoves[moveIndex];
    const selectedMove = USER_MOVE_DATABASE[selectedMoveKey];
    
    // Ensure we have a valid move with a name
    if (!selectedMove || !selectedMove.name) {
        isProcessing = false;
        return;
    }
    
    // Player's turn - use the move directly (pass a copy to ensure name is preserved)
    const moveToUse = {
        name: selectedMove.name,
        type: selectedMove.type,
        power: selectedMove.power,
        accuracy: selectedMove.accuracy,
        pp: selectedMove.pp,
        effect: selectedMove.effect,
        customMessage: selectedMove.customMessage
    };
    
    // Trigger attack animation for player
    triggerAttackAnimation(true);
    
    const result = gameState.useMoveWithObject(player, opponent, moveToUse);
    
    // Trigger damage animation if damage was dealt (after attack animation)
    if (result.success && result.damage !== undefined && result.damage > 0) {
        setTimeout(() => triggerDamageAnimation(false), 450); // Opponent takes damage after attack animation
    }
    
    showBattleMessage(result.message, () => {
        updateUI();
        
        // Check if battle ended
        const battleResult = gameState.checkBattleEnd();
        
        // Handle battle result object (for XP gain) or string (for other results)
        if (battleResult && typeof battleResult === 'object' && (battleResult.result === 'opponentDefeated' || battleResult.result === 'opponentDefeatedLevelUp')) {
            let message = `You defeated ${opponent.name}!`;
            showBattleMessage(message, () => {
                // Show XP gain animation
                animateExpGain(battleResult, () => {
                    if (battleResult.leveledUp) {
                        const oldLevel = player.level;
                        player.level++;
                        player.exp -= player.expToNext;
                        player.expToNext = player.expToNext * 1.5;
                        player.currentHP = player.maxHP;
                        showBattleMessage(`${player.name} grew from Level ${oldLevel} to Level ${player.level}!`, () => {
                            gameState.startNewBattle();
                            updateUI();
                            triggerSpawnAnimations();
                            showBattleStartMessage();
                            isProcessing = false;
                        });
                    } else {
                        gameState.startNewBattle();
                        updateUI();
                        triggerSpawnAnimations();
                        showBattleStartMessage();
                        isProcessing = false;
                    }
                });
            });
            return;
        }
        
        if (battleResult === 'playerLost') {
            showBattleMessage("All your candidates fainted! Game Over!", () => {
                triggerDeathAnimation(() => {
                    showResults('defeat');
                    isProcessing = false;
                });
            });
            return;
        }
        
        if (battleResult === 'playerPokemonFainted') {
            showBattleMessage(`${player.name} fainted!`, () => {
                showPartyMenu(true);
                isProcessing = false;
            });
            return;
        }
        
        // Enemy's turn
        setTimeout(() => {
            const enemyMoveIndex = gameState.enemyChooseBestMove();
            
            // Trigger attack animation for enemy
            triggerAttackAnimation(false);
            
            const enemyResult = gameState.useMove(opponent, player, enemyMoveIndex);
            
            // Trigger damage animation if damage was dealt (after attack animation)
            if (enemyResult.success && enemyResult.damage !== undefined && enemyResult.damage > 0) {
                setTimeout(() => triggerDamageAnimation(true), 450); // Player takes damage after attack animation
            }
            
            showBattleMessage(enemyResult.message, () => {
                updateUI();
                
                // Check battle end again
                const battleResult2 = gameState.checkBattleEnd();
                
                // Handle battle result object or string
                if (battleResult2 && typeof battleResult2 === 'object' && (battleResult2.result === 'opponentDefeated' || battleResult2.result === 'opponentDefeatedLevelUp')) {
                    let message = `You defeated ${opponent.name}!`;
                    showBattleMessage(message, () => {
                        // Show XP gain animation
                        animateExpGain(battleResult2, () => {
                            if (battleResult2.leveledUp) {
                                const oldLevel = player.level;
                                player.level++;
                                player.exp -= player.expToNext;
                                player.expToNext = player.expToNext * 1.5;
                                player.currentHP = player.maxHP;
                                showBattleMessage(`${player.name} grew from Level ${oldLevel} to Level ${player.level}!`, () => {
                                    gameState.startNewBattle();
                                    updateUI();
                                    showBattleStartMessage();
                                    isProcessing = false;
                                });
                            } else {
                                gameState.startNewBattle();
                                updateUI();
                                showBattleStartMessage();
                                isProcessing = false;
                            }
                        });
                    });
                    return;
                }
                
                if (battleResult2 === 'playerLost') {
                    showBattleMessage("All your candidates fainted! Game Over!", () => {
                        triggerDeathAnimation(() => {
                            showResults('defeat');
                            isProcessing = false;
                        });
                    });
                    return;
                }
                
                if (battleResult2 === 'playerPokemonFainted') {
                    showBattleMessage(`${player.name} fainted!`, () => {
                        showPartyMenu(true);
                        isProcessing = false;
                    });
                    return;
                }
                
                isProcessing = false;
            });
        }, 500);
    });
}

function handleBallAction() {
    if (isProcessing) return;
    
    isProcessing = true;
    
    const player = gameState.getCurrentPlayerPokemon();
    const opponent = gameState.getOpponentPokemon();
    
    // Show ball throwing animation
    const pokeball = document.getElementById('pokeball');
    pokeball.style.display = 'block';
    pokeball.classList.add('throwing');
    
    // After throw animation completes, add blinking effect
    setTimeout(() => {
        pokeball.classList.remove('throwing');
        pokeball.classList.add('blinking');
        
        // After blinking for dramatic effect, attempt catch
        setTimeout(() => {
            pokeball.style.display = 'none';
            pokeball.classList.remove('blinking');
            
            const result = gameState.attemptCatch();
            showBattleMessage(result.message, () => {
                if (result.success) {
                    gameState.startNewBattle();
                    updateUI();
                    triggerSpawnAnimations();
                    showBattleStartMessage();
                    isProcessing = false;
                } else {
                    // Ball missed - enemy gets a turn
                    updateUI();
                    
                    // Check if battle ended
                    const battleResult = gameState.checkBattleEnd();
                    if (battleResult === 'playerLost') {
                        showBattleMessage("All your candidates fainted! Game Over!", () => {
                            triggerDeathAnimation(() => {
                                showResults('defeat');
                                isProcessing = false;
                            });
                        });
                        return;
                    }
                    
                    if (battleResult === 'playerPokemonFainted') {
                        showBattleMessage(`${player.name} fainted!`, () => {
                            showPartyMenu(true);
                            isProcessing = false;
                        });
                        return;
                    }
                    
                    // Enemy's turn
                    setTimeout(() => {
                        const enemyMoveIndex = gameState.enemyChooseBestMove();
                        
                        // Trigger attack animation for enemy
                        triggerAttackAnimation(false);
                        
                        const enemyResult = gameState.useMove(opponent, player, enemyMoveIndex);
                        
                        // Trigger damage animation if damage was dealt (after attack animation)
                        if (enemyResult.success && enemyResult.damage !== undefined && enemyResult.damage > 0) {
                            setTimeout(() => triggerDamageAnimation(true), 450);
                        }
                        
                        showBattleMessage(enemyResult.message, () => {
                            updateUI();
                            
                            // Check battle end again
                            const battleResult2 = gameState.checkBattleEnd();
                            
                            // Handle battle result object or string
                            if (battleResult2 && typeof battleResult2 === 'object' && (battleResult2.result === 'opponentDefeated' || battleResult2.result === 'opponentDefeatedLevelUp')) {
                                let message = `You defeated ${opponent.name}!`;
                                showBattleMessage(message, () => {
                                    animateExpGain(battleResult2, () => {
                                        if (battleResult2.leveledUp) {
                                            const oldLevel = player.level;
                                            player.level++;
                                            player.exp -= player.expToNext;
                                            player.expToNext = player.expToNext * 1.5;
                                            player.currentHP = player.maxHP;
                                            showBattleMessage(`${player.name} grew from Level ${oldLevel} to Level ${player.level}!`, () => {
                                                gameState.startNewBattle();
                                                updateUI();
                                                showBattleStartMessage();
                                                isProcessing = false;
                                            });
                                        } else {
                                            gameState.startNewBattle();
                                            updateUI();
                                            triggerSpawnAnimations();
                                            showBattleStartMessage();
                                            isProcessing = false;
                                        }
                                    });
                                });
                                return;
                            }
                            
                            if (battleResult2 === 'playerLost') {
                                showBattleMessage("All your candidates fainted! Game Over!", () => {
                                    triggerDeathAnimation(() => {
                                        showResults('defeat');
                                        isProcessing = false;
                                    });
                                });
                                return;
                            }
                            
                            if (battleResult2 === 'playerPokemonFainted') {
                                showBattleMessage(`${player.name} fainted!`, () => {
                                    showPartyMenu(true);
                                    isProcessing = false;
                                });
                                return;
                            }
                            
                            isProcessing = false;
                        });
                    }, 500);
                }
            });
        }, 1500); // Blink for 1.5 seconds
    }, 1000); // Throw animation duration (1s)
}

function handleRunAction() {
    if (isProcessing) return;
    
    isProcessing = true;
    const result = gameState.attemptRun();
    showBattleMessage(result.message, () => {
        if (result.success) {
            gameState.startNewBattle();
            updateUI();
            triggerSpawnAnimations();
            showBattleStartMessage();
        }
        updateUI();
        isProcessing = false;
    });
}

function showPartyMenu(required = false) {
    const partyMenu = document.getElementById('partyMenu');
    const actionMenu = document.getElementById('actionMenu');
    const partyActions = document.getElementById('partyActions');
    
    partyMenu.style.display = 'flex';
    actionMenu.style.display = 'none';
    
    if (required) {
        partyActions.style.display = 'flex';
    } else {
        partyActions.style.display = 'none';
    }
    
    const partyList = document.getElementById('partyList');
    partyList.innerHTML = '';
    
    gameState.playerParty.forEach((partyMember, index) => {
        const partyItem = document.createElement('div');
        partyItem.className = 'party-item';
        if (partyMember.currentHP <= 0) {
            partyItem.classList.add('fainted');
        }
        if (index === currentPartyCursor) {
            partyItem.classList.add('selected');
        }
        
        const sprite = document.createElement('div');
        sprite.className = 'party-sprite';
        
        // Set logo image for party sprite - prioritize company data (captured companies)
        const companyData = typeof POKEMON_DATABASE !== 'undefined' ? POKEMON_DATABASE[partyMember.species] : null;
        const applicantData = typeof APPLICANT_DATABASE !== 'undefined' ? APPLICANT_DATABASE[partyMember.name] : null;
        const memberData = companyData || applicantData;
        
        if (memberData && memberData.logo) {
            const logoPath = memberData.logo;
            sprite.style.backgroundImage = `url(${logoPath})`;
            sprite.style.backgroundSize = 'cover';
            sprite.style.backgroundRepeat = 'no-repeat';
            sprite.style.backgroundPosition = 'center';
            sprite.style.backgroundColor = '#ffffff';
        }
        
        const info = document.createElement('div');
        info.className = 'party-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'party-name-row';
        
        const partyName = document.createElement('span');
        partyName.className = 'party-name';
        // Use species name for companies, name for applicants
        partyName.textContent = companyData ? partyMember.species : partyMember.name;
        
        const genderSymbol = document.createElement('span');
        genderSymbol.className = 'gender-symbol';
        if (partyMember.gender === '♀') {
            genderSymbol.classList.add('female');
        }
        genderSymbol.textContent = partyMember.gender;
        
        const partyLevel = document.createElement('span');
        partyLevel.className = 'party-level';
        partyLevel.textContent = `Lv. ${partyMember.level}`;
        
        nameRow.appendChild(partyName);
        nameRow.appendChild(genderSymbol);
        nameRow.appendChild(partyLevel);
        
        const hpBar = document.createElement('div');
        hpBar.className = 'party-hp-bar';
        const hpFill = document.createElement('div');
        hpFill.className = 'party-hp-fill';
        const hpPercent = (partyMember.currentHP / partyMember.maxHP) * 100;
        hpFill.style.width = `${hpPercent}%`;
        // Update HP bar color based on percentage
        if (hpPercent <= 10) {
            hpFill.classList.add('red');
        } else if (hpPercent <= 33.33) {
            hpFill.classList.add('yellow');
        }
        hpBar.appendChild(hpFill);
        
        const hpText = document.createElement('div');
        hpText.className = 'party-hp-text';
        hpText.textContent = `HP ${partyMember.currentHP}/${partyMember.maxHP}`;
        
        info.appendChild(nameRow);
        info.appendChild(hpBar);
        info.appendChild(hpText);
        
        if (partyMember.currentHP <= 0) {
            const status = document.createElement('div');
            status.className = 'party-status';
            status.textContent = 'FNT';
            info.appendChild(status);
        }
        
        partyItem.appendChild(sprite);
        partyItem.appendChild(info);
        
        partyItem.addEventListener('click', () => {
            currentPartyCursor = index;
            updatePartyMenuCursor();
            if (!required) {
                selectPartyMember(index);
            } else {
                partyActions.style.display = 'flex';
            }
        });
        
        partyList.appendChild(partyItem);
    });
}

function closePartyMenu() {
    document.getElementById('partyMenu').style.display = 'none';
    document.getElementById('actionMenu').style.display = 'flex';
    document.getElementById('partyActions').style.display = 'none';
    currentPartyCursor = 0;
}

function selectPartyMember(index) {
    const partyMember = gameState.playerParty[index];
    if (partyMember.currentHP <= 0) {
        const displayName = partyMember.species || partyMember.name;
        showBattleMessage(`${displayName} is fainted and can't battle!`);
        return;
    }
    
    if (gameState.currentBattle) {
        gameState.currentBattle.playerPokemon = partyMember;
    }
    closePartyMenu();
    updateUI();
}

function handleSendOut() {
    if (currentPartyCursor >= 0 && currentPartyCursor < gameState.playerParty.length) {
        selectPartyMember(currentPartyCursor);
    }
}

function showMessage(text, callback = null) {
    const messageBox = document.getElementById('messageBox');
    const messageContent = document.getElementById('messageContent');
    const messageContinue = document.getElementById('messageContinue');
    
    messageBox.style.display = 'block';
    messageContent.textContent = '';
    
    // Use typing effect for messages
    typeText(messageContent, text, 30, () => {
        if (callback) {
            messageContinue.style.display = 'block';
            messageContinue.onclick = () => {
                messageBox.style.display = 'none';
                messageContinue.style.display = 'none';
                if (callback) callback();
            };
        } else {
            messageContinue.style.display = 'none';
        }
    });
}

function handleMessageContinue() {
    const messageContinue = document.getElementById('messageContinue');
    if (messageContinue.onclick) {
        messageContinue.onclick();
    }
}

function updateUI() {
    const player = gameState.getCurrentPlayerPokemon();
    const opponent = gameState.getOpponentPokemon();
    const battle = gameState.currentBattle;
    
    if (!player || !opponent || !battle) return;
    
    // Update player sprite with applicant photo or company logo
    const playerSprite = document.getElementById('playerSprite');
    const playerPlaceholder = playerSprite.querySelector('.pokemon-placeholder');
    if (playerPlaceholder) {
        // Check company database first (for captured companies), then applicant database (for applicants)
        const companyData = typeof POKEMON_DATABASE !== 'undefined' ? POKEMON_DATABASE[player.species] : null;
        const applicantData = typeof APPLICANT_DATABASE !== 'undefined' ? APPLICANT_DATABASE[player.name] : null;
        const playerData = companyData || applicantData;
        
        if (playerData && playerData.logo) {
            const logoPath = playerData.logo;
            playerPlaceholder.style.backgroundImage = `url(${logoPath})`;
            playerPlaceholder.style.backgroundSize = '120%';
            playerPlaceholder.style.backgroundRepeat = 'no-repeat';
            playerPlaceholder.style.backgroundPosition = 'center';
        } else {
            // Fallback: clear background image if logo not found
            playerPlaceholder.style.backgroundImage = 'none';
        }
    }
    
    // Update opponent sprite with company logo
    const opponentSprite = document.getElementById('opponentSprite');
    const opponentPlaceholder = opponentSprite.querySelector('.pokemon-placeholder');
    if (opponentPlaceholder) {
        // Use opponent.species for database lookup since opponent.name is now "Recruiter from [Company]"
        if (typeof POKEMON_DATABASE !== 'undefined' && POKEMON_DATABASE[opponent.species] && POKEMON_DATABASE[opponent.species].logo) {
            const logoPath = POKEMON_DATABASE[opponent.species].logo;
            opponentPlaceholder.style.backgroundImage = `url(${logoPath})`;
            opponentPlaceholder.style.backgroundSize = '120%';
            opponentPlaceholder.style.backgroundRepeat = 'no-repeat';
            opponentPlaceholder.style.backgroundPosition = 'center';
        } else {
            // Fallback: clear background image if logo not found
            opponentPlaceholder.style.backgroundImage = 'none';
        }
    }
    
    // Update player info
    document.getElementById('playerName').textContent = player.name;
    const playerGenderEl = document.getElementById('playerGender');
    playerGenderEl.textContent = player.gender;
    playerGenderEl.classList.toggle('female', player.gender === '♀');
    document.getElementById('playerLevel').textContent = player.level;
    
    const playerHpPercent = (player.currentHP / player.maxHP) * 100;
    const playerHpFill = document.getElementById('playerHpFill');
    playerHpFill.style.width = `${playerHpPercent}%`;
    // Update HP bar color based on percentage
    playerHpFill.classList.remove('yellow', 'red');
    if (playerHpPercent <= 10) {
        playerHpFill.classList.add('red');
    } else if (playerHpPercent <= 33.33) {
        playerHpFill.classList.add('yellow');
    }
    document.getElementById('playerHpText').textContent = `HP ${player.currentHP}/${player.maxHP}`;
    
    const playerExpPercent = (player.exp / player.expToNext) * 100;
    document.getElementById('playerExpFill').style.width = `${playerExpPercent}%`;
    document.getElementById('playerExpText').textContent = `EXP ${player.exp}/${player.expToNext}`;
    
    // Update opponent info
    document.getElementById('opponentName').textContent = opponent.name;
    const opponentGenderEl = document.getElementById('opponentGender');
    opponentGenderEl.textContent = opponent.gender;
    opponentGenderEl.classList.toggle('female', opponent.gender === '♀');
    document.getElementById('opponentLevel').textContent = opponent.level;
    
    const opponentHpPercent = (opponent.currentHP / opponent.maxHP) * 100;
    const opponentHpFill = document.getElementById('opponentHpFill');
    opponentHpFill.style.width = `${opponentHpPercent}%`;
    // Update HP bar color based on percentage
    opponentHpFill.classList.remove('yellow', 'red');
    if (opponentHpPercent <= 10) {
        opponentHpFill.classList.add('red');
    } else if (opponentHpPercent <= 33.33) {
        opponentHpFill.classList.add('yellow');
    }
    document.getElementById('opponentHpText').textContent = `HP ${opponent.currentHP}/${opponent.maxHP}`;
    
    // Update action prompt
    document.getElementById('promptPokemonName').textContent = player.name;
    
    // Don't auto-highlight action menu cursor on UI update
    // Only update if cursor is already set (user has navigated)
    if (currentActionCursor >= 0) {
        updateActionMenuCursor();
    }
}

function showResults(result) {
    const overlay = document.getElementById('resultsOverlay');
    const title = document.getElementById('resultsTitle');
    const stats = document.getElementById('resultsStats');
    
    if (result === 'defeat') {
        title.textContent = 'Game Over';
        stats.textContent = 'All your candidates fainted!\nBetter luck next time.';
    } else {
        title.textContent = 'Battle Won!';
        stats.textContent = 'Congratulations on your victory!';
    }
    
    overlay.style.display = 'flex';
}

function startGame() {
    // Hide start overlay
    document.getElementById('startOverlay').style.display = 'none';
    
    // Remove death animation class from player sprite if it exists
    const playerSprite = document.getElementById('playerSprite');
    if (playerSprite) {
        playerSprite.classList.remove('fainted');
    }
    
    // Initialize game
    gameState.initGame();
    updateUI();
    triggerSpawnAnimations();
    showBattleStartMessage();
}

function restartGame() {
    // Reset game state
    gameState = new GameState();
    currentActionCursor = -1; // No button selected initially
    currentMoveCursor = 0;
    currentPartyCursor = 0;
    isProcessing = false;
    
    // Remove death animation class from player sprite
    const playerSprite = document.getElementById('playerSprite');
    if (playerSprite) {
        playerSprite.classList.remove('fainted');
    }
    
    // Hide all overlays and menus
    document.getElementById('resultsOverlay').style.display = 'none';
    document.getElementById('moveMenu').style.display = 'none';
    document.getElementById('partyMenu').style.display = 'none';
    document.getElementById('messageBox').style.display = 'none';
    document.getElementById('actionMenu').style.display = 'flex';
    
    // Show start screen
    document.getElementById('startOverlay').style.display = 'flex';
}
