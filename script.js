// UI Controller and Event Handlers

let gameState = new GameState();
let currentActionCursor = 0;
let currentMoveCursor = 0;
let currentPartyCursor = 0;
let isProcessing = false;

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    // Don't initialize game until start button is clicked
    // Start screen will be shown by default
});

// Typing effect function
function typeText(element, text, speed = 30, callback = null) {
    element.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// Show battle start message with typing effect
function showBattleStartMessage() {
    const commentatingText = document.getElementById('commentatingText');
    const battle = gameState.currentBattle;
    
    if (!battle) return;
    
    const player = gameState.getCurrentPlayerPokemon();
    const message = `A wild ${battle.opponent.name} appears! What will ${player.name} do?`;
    
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
    document.getElementById('continueBtn').addEventListener('click', () => {
        document.getElementById('resultsOverlay').style.display = 'none';
        gameState.startNewBattle();
        updateUI();
        showBattleStartMessage();
    });
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
        currentMoveCursor = Math.max(0, currentMoveCursor - 1);
        updateMoveMenuCursor();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentMoveCursor = Math.min(moves.length - 1, currentMoveCursor + 1);
        updateMoveMenuCursor();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectMove(currentMoveCursor);
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
            btn.querySelector('.action-cursor').textContent = '▶';
        } else {
            btn.classList.remove('selected');
            btn.querySelector('.action-cursor').textContent = ' ';
        }
    });
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
    
    const playerPokemon = gameState.getCurrentPlayerPokemon();
    const movesList = document.getElementById('movesList');
    movesList.innerHTML = '';
    
    playerPokemon.moves.forEach((move, index) => {
        const moveItem = document.createElement('div');
        moveItem.className = 'move-item';
        if (index === currentMoveCursor) {
            moveItem.classList.add('selected');
        }
        
        const moveInfo = document.createElement('div');
        moveInfo.className = 'move-info';
        
        const moveName = document.createElement('div');
        moveName.className = 'move-name';
        moveName.textContent = move.name;
        
        const moveDetails = document.createElement('div');
        moveDetails.className = 'move-details';
        
        const typeSymbol = TYPE_SYMBOLS[move.type] || '⭐';
        moveDetails.innerHTML = `
            <span class="move-type">${typeSymbol} ${move.type.toUpperCase()}</span>
            <span>PP ${move.currentPP}/${move.pp}</span>
            ${move.power > 0 ? `<span>Power ${move.power}</span>` : ''}
            <span>Acc ${move.accuracy}%</span>
        `;
        
        moveInfo.appendChild(moveName);
        moveInfo.appendChild(moveDetails);
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
    currentMoveCursor = 0;
}

function selectMove(moveIndex) {
    if (isProcessing) return;
    
    closeMoveMenu();
    isProcessing = true;
    
    const player = gameState.getCurrentPlayerPokemon();
    const opponent = gameState.getOpponentPokemon();
    
    // Player's turn
    const result = gameState.useMove(player, opponent, moveIndex);
    showBattleMessage(result.message, () => {
        updateUI();
        
        // Check if battle ended
        const battleResult = gameState.checkBattleEnd();
        if (battleResult === 'opponentDefeated' || battleResult === 'opponentDefeatedLevelUp') {
            let message = `You defeated ${opponent.name}!`;
            if (battleResult === 'opponentDefeatedLevelUp') {
                message += ` ${player.name} grew to Level ${player.level}!`;
            }
            showBattleMessage(message, () => {
                gameState.startNewBattle();
                updateUI();
                showBattleStartMessage();
                isProcessing = false;
            });
            return;
        }
        
        if (battleResult === 'playerLost') {
            showBattleMessage("All your Pokémon fainted! Game Over!", () => {
                showResults('defeat');
                isProcessing = false;
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
            const enemyResult = gameState.useMove(opponent, player, enemyMoveIndex);
            showBattleMessage(enemyResult.message, () => {
                updateUI();
                
                // Check battle end again
                const battleResult2 = gameState.checkBattleEnd();
                if (battleResult2 === 'playerLost') {
                    showBattleMessage("All your Pokémon fainted! Game Over!", () => {
                        showResults('defeat');
                        isProcessing = false;
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
    const result = gameState.attemptCatch();
    showMessage(result.message, () => {
        if (result.success) {
            gameState.startNewBattle();
            updateUI();
            showBattleStartMessage();
        }
        updateUI();
        isProcessing = false;
    });
}

function handleRunAction() {
    if (isProcessing) return;
    
    isProcessing = true;
    const result = gameState.attemptRun();
    showMessage(result.message, () => {
        if (result.success) {
            gameState.startNewBattle();
            updateUI();
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
    
    gameState.playerParty.forEach((pokemon, index) => {
        const partyItem = document.createElement('div');
        partyItem.className = 'party-item';
        if (pokemon.currentHP <= 0) {
            partyItem.classList.add('fainted');
        }
        if (index === currentPartyCursor) {
            partyItem.classList.add('selected');
        }
        
        const sprite = document.createElement('div');
        sprite.className = 'party-sprite';
        
        const info = document.createElement('div');
        info.className = 'party-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'party-name-row';
        nameRow.innerHTML = `
            <span class="party-name">${pokemon.name}</span>
            <span class="gender-symbol">${pokemon.gender}</span>
            <span class="party-level">Lv. ${pokemon.level}</span>
        `;
        
        const hpBar = document.createElement('div');
        hpBar.className = 'party-hp-bar';
        const hpFill = document.createElement('div');
        hpFill.className = 'party-hp-fill';
        const hpPercent = (pokemon.currentHP / pokemon.maxHP) * 100;
        hpFill.style.width = `${hpPercent}%`;
        hpBar.appendChild(hpFill);
        
        const hpText = document.createElement('div');
        hpText.className = 'party-hp-text';
        hpText.textContent = `HP ${pokemon.currentHP}/${pokemon.maxHP}`;
        
        info.appendChild(nameRow);
        info.appendChild(hpBar);
        info.appendChild(hpText);
        
        if (pokemon.currentHP <= 0) {
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
    const pokemon = gameState.playerParty[index];
    if (pokemon.currentHP <= 0) {
        showMessage(`${pokemon.name} is fainted and can't battle!`);
        return;
    }
    
    if (gameState.currentBattle) {
        gameState.currentBattle.playerPokemon = pokemon;
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
    
    // Update player info
    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerGender').textContent = player.gender;
    document.getElementById('playerLevel').textContent = player.level;
    
    const playerHpPercent = (player.currentHP / player.maxHP) * 100;
    document.getElementById('playerHpFill').style.width = `${playerHpPercent}%`;
    document.getElementById('playerHpText').textContent = `HP ${player.currentHP}/${player.maxHP}`;
    document.getElementById('playerMpText').textContent = `MP ${player.currentMP}/${player.maxMP}`;
    
    const playerExpPercent = (player.exp / player.expToNext) * 100;
    document.getElementById('playerExpFill').style.width = `${playerExpPercent}%`;
    document.getElementById('playerExpText').textContent = `EXP ${player.exp}/${player.expToNext}`;
    
    // Update opponent info
    document.getElementById('opponentName').textContent = opponent.name;
    document.getElementById('opponentGender').textContent = opponent.gender;
    document.getElementById('opponentLevel').textContent = opponent.level;
    
    const opponentHpPercent = (opponent.currentHP / opponent.maxHP) * 100;
    document.getElementById('opponentHpFill').style.width = `${opponentHpPercent}%`;
    document.getElementById('opponentHpText').textContent = `HP ${opponent.currentHP}/${opponent.maxHP}`;
    document.getElementById('opponentMpText').textContent = `MP ${opponent.currentMP}/${opponent.maxMP}`;
    
    // Update action prompt
    document.getElementById('promptPokemonName').textContent = player.name;
    
    // Update action menu cursor
    updateActionMenuCursor();
}

function showResults(result) {
    const overlay = document.getElementById('resultsOverlay');
    const title = document.getElementById('resultsTitle');
    const stats = document.getElementById('resultsStats');
    
    if (result === 'defeat') {
        title.textContent = 'Game Over';
        stats.textContent = 'All your Pokémon fainted!\nBetter luck next time.';
    } else {
        title.textContent = 'Battle Won!';
        stats.textContent = 'Congratulations on your victory!';
    }
    
    overlay.style.display = 'flex';
}

function startGame() {
    // Hide start overlay
    document.getElementById('startOverlay').style.display = 'none';
    
    // Initialize game
    gameState.initGame();
    updateUI();
    showBattleStartMessage();
}

function restartGame() {
    // Reset game state
    gameState = new GameState();
    currentActionCursor = 0;
    currentMoveCursor = 0;
    currentPartyCursor = 0;
    isProcessing = false;
    
    // Hide all overlays and menus
    document.getElementById('resultsOverlay').style.display = 'none';
    document.getElementById('moveMenu').style.display = 'none';
    document.getElementById('partyMenu').style.display = 'none';
    document.getElementById('messageBox').style.display = 'none';
    document.getElementById('actionMenu').style.display = 'flex';
    
    // Show start screen
    document.getElementById('startOverlay').style.display = 'flex';
}
