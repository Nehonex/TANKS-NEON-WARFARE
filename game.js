// TANKS // NEON WARFARE - ИДЕАЛЬНОЕ МОБИЛЬНОЕ УПРАВЛЕНИЕ
// -----------------------------------------------------

// --- 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const hud = document.getElementById('hud');
const screens = document.querySelectorAll('.screen');

// Элементы HUD
const hudLives = document.getElementById('hud-lives');
const hudKills = document.getElementById('hud-kills');
const hudWave = document.getElementById('hud-wave');
const hudMoney = document.getElementById('hud-money');
const hudTimer = document.getElementById('hud-timer');
const hudHealthFill = document.getElementById('hud-health-fill');

// Элементы магазина
const shopMoneySpan = document.getElementById('shop-money');

// Создаем элементы для джойстиков
const joystickLeft = document.createElement('div');
joystickLeft.id = 'joystick-left';
joystickLeft.style.cssText = 'position:absolute;left:0;top:0;width:50%;height:100%;z-index:100;pointer-events:auto;display:none;';
const joystickRight = document.createElement('div');
joystickRight.id = 'joystick-right';
joystickRight.style.cssText = 'position:absolute;right:0;top:0;width:50%;height:100%;z-index:100;pointer-events:auto;display:none;';
document.getElementById('game-container').appendChild(joystickLeft);
document.getElementById('game-container').appendChild(joystickRight);

// Данные кампании
const campaignLevels = [
    { id: 1, name: "Тренировка", hasBase: true, tasks: [
        { type: "kill", target: 5, reward: 50, description: "Убить 5 врагов" },
        { type: "destroyBase", target: 1, reward: 100, description: "Уничтожить базу врага" }
    ]},
    { id: 2, name: "Быстрые твари", hasBase: false, tasks: [
        { type: "killFast", target: 3, reward: 75, description: "Убить 3 быстрых врага (желтых)" },
        { type: "survive", target: 60, reward: 100, description: "Выжить 60 секунд" }
    ]},
    { id: 3, name: "Тяжелая броня", hasBase: true, tasks: [
        { type: "killTank", target: 2, reward: 100, description: "Убить 2 танка (фиолетовых)" },
        { type: "noBaseDamage", target: 0, reward: 150, description: "База не должна получить урон" }
    ]},
    { id: 4, name: "Точная стрельба", hasBase: false, tasks: [
        { type: "accuracy", target: 70, reward: 120, description: "Точность стрельбы 70%" },
        { type: "kill", target: 10, reward: 100, description: "Убить 10 врагов" }
    ]},
    { id: 5, name: "Массовая атака", hasBase: false, tasks: [
        { type: "kill", target: 15, reward: 150, description: "Убить 15 врагов" },
        { type: "noDeaths", target: 0, reward: 200, description: "Не потерять ни одной жизни" }
    ]},
    { id: 6, name: "Ночной кошмар", hasBase: false, tasks: [
        { type: "survive", target: 90, reward: 150, description: "Выжить 90 секунд" },
        { type: "kill", target: 12, reward: 120, description: "Убить 12 врагов" }
    ]},
    { id: 7, name: "Элитный отряд", hasBase: false, tasks: [
        { type: "killTank", target: 3, reward: 150, description: "Убить 3 танка" },
        { type: "killFast", target: 4, reward: 120, description: "Убить 4 быстрых врага" }
    ]},
    { id: 8, name: "Защитник", hasBase: true, tasks: [
        { type: "baseHealth", target: 80, reward: 200, description: "Сохранить базу с HP > 80%" },
        { type: "kill", target: 10, reward: 100, description: "Убить 10 врагов" }
    ]},
    { id: 9, name: "Скорострел", hasBase: false, tasks: [
        { type: "kill", target: 20, reward: 200, description: "Убить 20 врагов" },
        { type: "timeLimit", target: 120, reward: 150, description: "Уложиться в 2 минуты" }
    ]},
    { id: 10, name: "Хардкор", hasBase: true, tasks: [
        { type: "killTank", target: 4, reward: 200, description: "Убить 4 танка" },
        { type: "survive", target: 120, reward: 200, description: "Выжить 2 минуты" },
        { type: "noBaseDamage", target: 0, reward: 250, description: "База не должна получить урон" }
    ]},
    { id: 11, name: "Лавина", hasBase: false, tasks: [
        { type: "kill", target: 25, reward: 250, description: "Убить 25 врагов" },
        { type: "killFast", target: 5, reward: 150, description: "Убить 5 быстрых врагов" }
    ]},
    { id: 12, name: "Осада", hasBase: true, tasks: [
        { type: "survive", target: 150, reward: 250, description: "Выжить 2.5 минуты" },
        { type: "destroyBase", target: 1, reward: 300, description: "Уничтожить базу врага" }
    ]},
    { id: 13, name: "Снайпер", hasBase: false, tasks: [
        { type: "accuracy", target: 80, reward: 250, description: "Точность стрельбы 80%" },
        { type: "killTank", target: 3, reward: 180, description: "Убить 3 танка" }
    ]},
    { id: 14, name: "Адреналин", hasBase: false, tasks: [
        { type: "kill", target: 30, reward: 300, description: "Убить 30 врагов" },
        { type: "noDeaths", target: 0, reward: 350, description: "Не потерять ни одной жизни" },
        { type: "timeLimit", target: 180, reward: 200, description: "Уложиться в 3 минуты" }
    ]},
    { id: 15, name: "ФИНАЛ", hasBase: true, tasks: [
        { type: "kill", target: 40, reward: 400, description: "Убить 40 врагов" },
        { type: "killTank", target: 5, reward: 300, description: "Убить 5 танков" },
        { type: "killFast", target: 6, reward: 250, description: "Убить 6 быстрых врагов" },
        { type: "destroyBase", target: 1, reward: 500, description: "Уничтожить базу врага" }
    ]}
];

// Игровые данные
let gameData = {
    money: 500,
    purchasedWeapons: [],
    campaignProgress: 1,
    completedLevels: [],
    achievements: {
        firstBlood: { claimed: false, progress: 0, target: 1, reward: 50 },
        killer: { claimed: false, progress: 0, target: 10, reward: 100 },
        waveMaster: { claimed: false, progress: 0, target: 5, reward: 200 }
    }
};

// Текущее состояние игры
let gameState = {
    active: false,
    mode: null,
    difficulty: 'medium',
    player: null,
    enemies: [],
    enemyBullets: [],
    bullets: [],
    powerups: [],
    playerBase: null,
    enemyBase: null,
    kills: 0,
    killsByType: { normal: 0, fast: 0, tank: 0 },
    shotsFired: 0,
    shotsHit: 0,
    wave: 1,
    killsThisWave: 0,
    timer: 0,
    gameOver: false,
    victory: false,
    paused: false,
    survivalScore: 0,
    campaignLevel: 1,
    campaignTasks: [],
    defenseTime: 300,
    defenseDeaths: 0,
    keys: { w: false, a: false, s: false, d: false },
    mouse: { x: 400, y: 300, down: false },
    touch: { 
        left: { active: false, vectorX: 0, vectorY: 0 },
        right: { active: false, angle: 0 }
    },
    lastShot: 0,
    startTime: 0,
    baseInitialHp: 400,
    deaths: 0
};

// Таймеры
let gameLoopInterval = null;
let gameTimerInterval = null;
let spawnInterval = null;

canvas.width = 800;
canvas.height = 600;

// --- 2. ЗАГРУЗКА И СОХРАНЕНИЕ ---
function loadGameData() {
    const saved = localStorage.getItem('tanksNeonData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.money !== undefined) gameData.money = parsed.money;
            if (parsed.purchasedWeapons) gameData.purchasedWeapons = parsed.purchasedWeapons;
            if (parsed.campaignProgress) gameData.campaignProgress = parsed.campaignProgress;
            if (parsed.completedLevels) gameData.completedLevels = parsed.completedLevels;
            if (parsed.achievements) {
                Object.keys(gameData.achievements).forEach(key => {
                    if (parsed.achievements[key]) {
                        gameData.achievements[key].claimed = parsed.achievements[key].claimed || false;
                    }
                });
            }
        } catch (e) { console.error("Ошибка загрузки"); }
    }
    updateShopUI();
    updateAchievementsUI();
}

function saveGameData() {
    localStorage.setItem('tanksNeonData', JSON.stringify(gameData));
}

// --- 3. UI ФУНКЦИИ ---
function showScreen(screenId) {
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (screenId === 'game-canvas') {
        hud.style.display = 'block';
        canvas.width = 800;
        canvas.height = 600;
        if (window.innerWidth <= 768) {
            joystickLeft.style.display = 'block';
            joystickRight.style.display = 'block';
        }
    } else {
        hud.style.display = 'none';
        joystickLeft.style.display = 'none';
        joystickRight.style.display = 'none';
    }
}

function updateShopUI() {
    if (!shopMoneySpan) return;
    shopMoneySpan.innerText = gameData.money;
    document.querySelectorAll('.buy-btn').forEach(btn => {
        const weapon = btn.dataset.weapon;
        if (gameData.purchasedWeapons.includes(weapon)) {
            btn.disabled = true;
            btn.innerText = 'Куплено';
            btn.style.borderColor = '#ff0066';
            btn.style.color = '#ff0066';
            btn.style.boxShadow = '0 0 5px #ff0066';
        } else {
            btn.disabled = false;
            btn.innerText = 'Купить';
            btn.style.borderColor = '#00f5ff';
            btn.style.color = '#00f5ff';
            btn.style.boxShadow = '0 0 5px #00f5ff';
        }
    });
}

function updateAchievementsUI() {
    document.querySelectorAll('.claim-btn').forEach(btn => {
        const achId = btn.dataset.ach;
        if (!achId) return;
        const ach = gameData.achievements[achId];
        if (ach && ach.claimed) {
            btn.disabled = true;
            btn.innerText = 'Забрано';
            btn.style.borderColor = '#ff0066';
            btn.style.color = '#ff0066';
            btn.style.boxShadow = '0 0 5px #ff0066';
        } else {
            btn.disabled = false;
            btn.innerText = 'Забрать';
            btn.style.borderColor = '#00f5ff';
            btn.style.color = '#00f5ff';
            btn.style.boxShadow = '0 0 5px #00f5ff';
        }
    });
}

function checkAchievements(type, value) {
    if (type === 'kill') {
        gameData.achievements.firstBlood.progress = Math.min(gameData.achievements.firstBlood.progress + value, gameData.achievements.firstBlood.target);
        gameData.achievements.killer.progress = Math.min(gameData.achievements.killer.progress + value, gameData.achievements.killer.target);
    } else if (type === 'wave') {
        gameData.achievements.waveMaster.progress = Math.min(gameData.achievements.waveMaster.progress + value, gameData.achievements.waveMaster.target);
    }
    saveGameData();
}

function claimAchievement(achId) {
    const ach = gameData.achievements[achId];
    if (!ach || ach.claimed || ach.progress < ach.target) return;
    ach.claimed = true;
    gameData.money += ach.reward;
    saveGameData();
    updateShopUI();
    updateAchievementsUI();
}

// --- 4. РЕЖИМЫ ИГРЫ ---
function startClassic(difficulty) {
    stopAllIntervals();
    
    gameState = {
        active: true,
        mode: 'classic',
        difficulty: difficulty,
        player: { x: 400, y: 500, hp: 100, maxHp: 100, lives: 3, angle: 0, speed: 3 },
        enemies: [],
        enemyBullets: [],
        bullets: [],
        powerups: [],
        playerBase: { x: 400, y: 550, hp: 300, maxHp: 300 },
        enemyBase: { x: 400, y: 50, hp: 300, maxHp: 300 },
        kills: 0,
        killsByType: { normal: 0, fast: 0, tank: 0 },
        shotsFired: 0,
        shotsHit: 0,
        wave: 1,
        killsThisWave: 0,
        timer: 0,
        gameOver: false,
        victory: false,
        paused: false,
        keys: { w: false, a: false, s: false, d: false },
        mouse: { x: 400, y: 300, down: false },
        touch: { 
            left: { active: false, vectorX: 0, vectorY: 0 },
            right: { active: false, angle: 0 }
        },
        lastShot: 0,
        startTime: Date.now()
    };

    let spawnSpeed = difficulty === 'easy' ? 2500 : (difficulty === 'hard' ? 1500 : 2000);
    startIntervals(spawnSpeed);
    showScreen('game-canvas');
}

function startSurvival() {
    stopAllIntervals();
    
    gameState = {
        active: true,
        mode: 'survival',
        player: { x: 400, y: 300, hp: 100, maxHp: 100, lives: 5, angle: 0, speed: 3.5 },
        enemies: [],
        enemyBullets: [],
        bullets: [],
        powerups: [],
        playerBase: null,
        enemyBase: null,
        kills: 0,
        killsByType: { normal: 0, fast: 0, tank: 0 },
        shotsFired: 0,
        shotsHit: 0,
        wave: 1,
        killsThisWave: 0,
        timer: 0,
        gameOver: false,
        victory: false,
        paused: false,
        survivalScore: 0,
        keys: { w: false, a: false, s: false, d: false },
        mouse: { x: 400, y: 300, down: false },
        touch: { 
            left: { active: false, vectorX: 0, vectorY: 0 },
            right: { active: false, angle: 0 }
        },
        lastShot: 0,
        startTime: Date.now()
    };

    startIntervals(1800);
    showScreen('game-canvas');
}

function startCampaign(levelNum) {
    stopAllIntervals();
    
    const level = campaignLevels.find(l => l.id === levelNum);
    if (!level) return;
    
    const tasks = level.tasks.map(t => ({ ...t, completed: false }));
    
    const playerBase = level.hasBase ? { x: 400, y: 550, hp: 400, maxHp: 400 } : null;
    const enemyBase = level.hasBase ? { x: 400, y: 50, hp: 400, maxHp: 400 } : null;
    
    gameState = {
        active: true,
        mode: 'campaign',
        campaignLevel: levelNum,
        campaignTasks: tasks,
        player: { x: 400, y: 500, hp: 120, maxHp: 120, lives: 3, angle: 0, speed: 2.8 },
        enemies: [],
        enemyBullets: [],
        bullets: [],
        powerups: [],
        playerBase: playerBase,
        enemyBase: enemyBase,
        kills: 0,
        killsByType: { normal: 0, fast: 0, tank: 0 },
        shotsFired: 0,
        shotsHit: 0,
        wave: 1,
        killsThisWave: 0,
        timer: 0,
        gameOver: false,
        victory: false,
        paused: false,
        keys: { w: false, a: false, s: false, d: false },
        mouse: { x: 400, y: 300, down: false },
        touch: { 
            left: { active: false, vectorX: 0, vectorY: 0 },
            right: { active: false, angle: 0 }
        },
        lastShot: 0,
        startTime: Date.now(),
        baseInitialHp: 400,
        deaths: 0
    };

    startIntervals(2000);
    showScreen('game-canvas');
}

function startDefense() {
    stopAllIntervals();
    
    gameState = {
        active: true,
        mode: 'defense',
        player: { x: 400, y: 500, hp: 100, maxHp: 100, lives: 3, angle: 0, speed: 3 },
        enemies: [],
        enemyBullets: [],
        bullets: [],
        powerups: [],
        playerBase: { x: 400, y: 550, hp: 500, maxHp: 500 },
        enemyBase: null,
        kills: 0,
        killsByType: { normal: 0, fast: 0, tank: 0 },
        shotsFired: 0,
        shotsHit: 0,
        wave: 1,
        killsThisWave: 0,
        timer: 0,
        gameOver: false,
        victory: false,
        paused: false,
        defenseTime: 300,
        defenseDeaths: 0,
        keys: { w: false, a: false, s: false, d: false },
        mouse: { x: 400, y: 300, down: false },
        touch: { 
            left: { active: false, vectorX: 0, vectorY: 0 },
            right: { active: false, angle: 0 }
        },
        lastShot: 0,
        startTime: Date.now()
    };

    startIntervals(1800);
    showScreen('game-canvas');
}

function startIntervals(spawnSpeed) {
    gameLoopInterval = setInterval(gameLoop, 1000 / 60);
    gameTimerInterval = setInterval(() => { 
        if (gameState.active && !gameState.paused && !gameState.gameOver && !gameState.victory) {
            gameState.timer++;
            
            if (gameState.mode === 'survival') {
                gameState.survivalScore = gameState.timer * 10 + gameState.kills * 50;
            }
            
            if (gameState.mode === 'defense') {
                if (gameState.timer >= gameState.defenseTime) {
                    gameState.victory = true;
                }
            }
        }
    }, 1000);
    spawnInterval = setInterval(() => spawnEnemyForMode(), spawnSpeed);
}

function stopAllIntervals() {
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    if (gameTimerInterval) clearInterval(gameTimerInterval);
    if (spawnInterval) clearInterval(spawnInterval);
    gameLoopInterval = gameTimerInterval = spawnInterval = null;
}

// --- 5. СПАВН ВРАГОВ ---
function spawnEnemyForMode() {
    if (!gameState.active || gameState.paused || gameState.gameOver || gameState.victory) return;

    switch(gameState.mode) {
        case 'classic': spawnClassicEnemy(); break;
        case 'survival': spawnSurvivalEnemy(); break;
        case 'campaign': spawnCampaignEnemy(); break;
        case 'defense': spawnDefenseEnemy(); break;
        default: spawnClassicEnemy();
    }
}

function spawnClassicEnemy() {
    const type = Math.random() < 0.6 ? 0 : (Math.random() < 0.5 ? 1 : 2);
    let hp, speed, damage, fireRate, bodyColor, trackColor, typeName;
    
    if (type === 0) { 
        hp = 45; speed = 1; damage = 8; fireRate = 2000;
        bodyColor = '#ff0066'; trackColor = '#cc0052';
        typeName = 'normal';
    }
    else if (type === 1) { 
        hp = 25; speed = 2; damage = 5; fireRate = 1500;
        bodyColor = '#ffff00'; trackColor = '#cccc00';
        typeName = 'fast';
    }
    else { 
        hp = 90; speed = 0.6; damage = 15; fireRate = 2500;
        bodyColor = '#aa00ff'; trackColor = '#8800cc';
        typeName = 'tank';
    }

    gameState.enemies.push({
        x: Math.random() * 700 + 50, y: 50,
        hp: hp, maxHp: hp, speed: speed, 
        bodyColor: bodyColor, trackColor: trackColor,
        type: type, typeName: typeName, damage: damage,
        angle: 0,
        lastShot: Date.now(),
        fireRate: fireRate
    });
}

function spawnSurvivalEnemy() {
    const waveBonus = Math.floor(gameState.timer / 30);
    const type = Math.random() < 0.5 ? 0 : (Math.random() < 0.6 ? 1 : 2);
    let hp, speed, damage, fireRate, bodyColor, trackColor, typeName;
    
    if (type === 0) { 
        hp = 35 + waveBonus * 3; speed = 1.2 + waveBonus * 0.1; damage = 8 + waveBonus; fireRate = 1800;
        bodyColor = '#ff0066'; trackColor = '#cc0052';
        typeName = 'normal';
    }
    else if (type === 1) { 
        hp = 20 + waveBonus * 2; speed = 2.5 + waveBonus * 0.2; damage = 5 + waveBonus; fireRate = 1200;
        bodyColor = '#ffff00'; trackColor = '#cccc00';
        typeName = 'fast';
    }
    else { 
        hp = 70 + waveBonus * 5; speed = 0.8 + waveBonus * 0.05; damage = 15 + waveBonus * 2; fireRate = 2200;
        bodyColor = '#aa00ff'; trackColor = '#8800cc';
        typeName = 'tank';
    }

    gameState.enemies.push({
        x: Math.random() * 700 + 50, y: Math.random() * 200 + 50,
        hp: hp, maxHp: hp, speed: Math.min(speed, 4), 
        bodyColor: bodyColor, trackColor: trackColor,
        type: type, typeName: typeName, damage: damage,
        angle: 0,
        lastShot: Date.now(),
        fireRate: fireRate
    });
}

function spawnCampaignEnemy() {
    const level = gameState.campaignLevel;
    let type;
    if (level === 1) type = 0;
    else if (level === 2) type = Math.random() < 0.7 ? 0 : 1;
    else type = Math.random() < 0.5 ? 0 : (Math.random() < 0.5 ? 1 : 2);
    
    let hp, speed, damage, fireRate, bodyColor, trackColor, typeName;
    if (type === 0) { 
        hp = 40 + level * 3; speed = 1; damage = 8 + level; fireRate = 2000;
        bodyColor = '#ff0066'; trackColor = '#cc0052';
        typeName = 'normal';
    }
    else if (type === 1) { 
        hp = 20 + level * 2; speed = 2; damage = 5 + level; fireRate = 1500;
        bodyColor = '#ffff00'; trackColor = '#cccc00';
        typeName = 'fast';
    }
    else { 
        hp = 80 + level * 5; speed = 0.6; damage = 15 + level * 2; fireRate = 2500;
        bodyColor = '#aa00ff'; trackColor = '#8800cc';
        typeName = 'tank';
    }

    gameState.enemies.push({
        x: Math.random() * 700 + 50, y: 50,
        hp: hp, maxHp: hp, speed: speed, 
        bodyColor: bodyColor, trackColor: trackColor,
        type: type, typeName: typeName, damage: damage,
        angle: 0,
        lastShot: Date.now(),
        fireRate: fireRate
    });
}

function spawnDefenseEnemy() {
    const wave = Math.floor(gameState.timer / 30) + 1;
    const count = Math.min(2 + Math.floor(wave / 2), 5);
    
    for (let i = 0; i < count; i++) {
        const type = Math.random() < 0.5 ? 0 : (Math.random() < 0.5 ? 1 : 2);
        let hp, speed, damage, fireRate, bodyColor, trackColor, typeName;
        
        if (type === 0) { 
            hp = 40; speed = 1; damage = 8; fireRate = 2000;
            bodyColor = '#ff0066'; trackColor = '#cc0052';
            typeName = 'normal';
        }
        else if (type === 1) { 
            hp = 20; speed = 2; damage = 5; fireRate = 1500;
            bodyColor = '#ffff00'; trackColor = '#cccc00';
            typeName = 'fast';
        }
        else { 
            hp = 80; speed = 0.6; damage = 15; fireRate = 2500;
            bodyColor = '#aa00ff'; trackColor = '#8800cc';
            typeName = 'tank';
        }

        gameState.enemies.push({
            x: Math.random() * 700 + 50, y: 50,
            hp: hp, maxHp: hp, speed: speed, 
            bodyColor: bodyColor, trackColor: trackColor,
            type: type, typeName: typeName, damage: damage,
            angle: 0,
            lastShot: Date.now(),
            fireRate: fireRate
        });
    }
}

// --- 6. ИГРОВАЯ ЛОГИКА ---
function gameLoop() {
    if (!gameState.active || gameState.paused) return;
    
    if (gameState.gameOver) { 
        showScreen('game-over'); 
        stopAllIntervals(); 
        return; 
    }
    
    if (gameState.victory) {
        if (gameState.mode === 'campaign') {
            if (!gameData.completedLevels.includes(gameState.campaignLevel)) {
                gameData.completedLevels.push(gameState.campaignLevel);
                if (gameState.campaignLevel + 1 <= 15) {
                    gameData.campaignProgress = Math.max(gameData.campaignProgress, gameState.campaignLevel + 1);
                }
            }
            
            let totalReward = 0;
            gameState.campaignTasks.forEach(task => {
                if (task.completed) totalReward += task.reward;
            });
            gameData.money += totalReward;
            saveGameData();
        }
        
        showScreen('victory'); 
        stopAllIntervals(); 
        return; 
    }

    updatePlayer();
    updateEnemies();
    updateEnemyShooting();
    updateBullets();
    updateEnemyBullets();
    checkCollisions();
    checkCampaignTasks();
    updateWaveAndBase();
    updateHUD();
    draw();
}

// --- НОВОЕ: ИДЕАЛЬНОЕ УПРАВЛЕНИЕ ---
function updatePlayer() {
    const p = gameState.player;
    if (!p) return;
    
    // Управление с клавиатуры
    if (gameState.keys.w) p.y -= p.speed;
    if (gameState.keys.s) p.y += p.speed;
    if (gameState.keys.a) p.x -= p.speed;
    if (gameState.keys.d) p.x += p.speed;
    
    // Управление с левого джойстика (ТОЛЬКО движение)
    if (gameState.touch.left.active) {
        p.x += gameState.touch.left.vectorX * p.speed * 2;
        p.y += gameState.touch.left.vectorY * p.speed * 2;
    }
    
    // Границы
    p.x = Math.max(25, Math.min(775, p.x));
    p.y = Math.max(25, Math.min(575, p.y));

    // Прицел (мышь или правый джойстик)
    if (gameState.touch.right.active) {
        // Правый джойстик управляет направлением стрельбы
        p.angle = gameState.touch.right.angle;
    } else if (gameState.mouse.down) {
        // Мышь
        p.angle = Math.atan2(gameState.mouse.y - p.y, gameState.mouse.x - p.x);
    }

    // Стрельба (автоматическая когда правый джойстик активен)
    const now = Date.now();
    if ((gameState.mouse.down || gameState.touch.right.active) && now - gameState.lastShot > 200) {
        gameState.lastShot = now;
        gameState.shotsFired++;
        
        gameState.bullets.push({
            x: p.x + Math.cos(p.angle) * 20, 
            y: p.y + Math.sin(p.angle) * 20,
            vx: Math.cos(p.angle) * 8, 
            vy: Math.sin(p.angle) * 8,
            damage: 15, color: '#00f5ff', owner: 'player'
        });
    }
}

function updateEnemies() {
    for (let i = gameState.enemies.length - 1; i >= 0; i--) {
        const e = gameState.enemies[i];
        
        let targetX, targetY;
        if (gameState.mode === 'survival') {
            targetX = gameState.player.x;
            targetY = gameState.player.y;
        } else if (gameState.mode === 'defense' && !gameState.enemyBase) {
            targetX = gameState.playerBase.x;
            targetY = gameState.playerBase.y;
        } else {
            targetX = gameState.playerBase ? gameState.playerBase.x : gameState.player.x;
            targetY = gameState.playerBase ? gameState.playerBase.y : gameState.player.y;
        }
        
        e.angle = Math.atan2(gameState.player.y - e.y, gameState.player.x - e.x);
        
        const dx = targetX - e.x;
        const dy = targetY - e.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        
        if (len > 50) {
            e.x += (dx / len) * e.speed;
            e.y += (dy / len) * e.speed;
        }
    }
}

function updateEnemyShooting() {
    const now = Date.now();
    for (let e of gameState.enemies) {
        if (now - e.lastShot > e.fireRate) {
            e.lastShot = now;
            
            let targetX = gameState.player.x;
            let targetY = gameState.player.y;
            
            const dx = targetX - e.x;
            const dy = targetY - e.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 400) {
                const vx = dx / dist;
                const vy = dy / dist;
                
                gameState.enemyBullets.push({
                    x: e.x + vx * 20,
                    y: e.y + vy * 20,
                    vx: vx * 5,
                    vy: vy * 5,
                    damage: e.damage,
                    color: e.bodyColor,
                    owner: 'enemy'
                });
            }
        }
    }
}

function updateBullets() {
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        const b = gameState.bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        
        if (b.x < 0 || b.x > 800 || b.y < 0 || b.y > 600) {
            gameState.bullets.splice(i, 1);
            continue;
        }
        
        let hit = false;
        for (let j = gameState.enemies.length - 1; j >= 0; j--) {
            const e = gameState.enemies[j];
            if (Math.hypot(b.x - e.x, b.y - e.y) < 20) {
                e.hp -= b.damage;
                gameState.bullets.splice(i, 1);
                gameState.shotsHit++;
                
                if (e.hp <= 0) {
                    gameState.enemies.splice(j, 1);
                    gameState.kills++;
                    gameState.killsByType[e.typeName]++;
                    gameState.killsThisWave++;
                    
                    let moneyReward = 10;
                    if (gameState.mode === 'survival') moneyReward = 20;
                    if (gameState.mode === 'defense') moneyReward = 15;
                    if (gameState.mode === 'campaign') moneyReward = 25;
                    
                    gameData.money += moneyReward;
                    checkAchievements('kill', 1);
                }
                hit = true;
                break;
            }
        }
        if (hit) continue;

        if (gameState.enemyBase && Math.hypot(b.x - gameState.enemyBase.x, b.y - gameState.enemyBase.y) < 35) {
            gameState.enemyBase.hp -= b.damage;
            gameState.bullets.splice(i, 1);
            if (gameState.mode === 'classic' && gameState.enemyBase.hp <= 0) {
                gameState.victory = true;
            }
        }
    }
}

function updateEnemyBullets() {
    for (let i = gameState.enemyBullets.length - 1; i >= 0; i--) {
        const b = gameState.enemyBullets[i];
        b.x += b.vx;
        b.y += b.vy;
        
        if (b.x < 0 || b.x > 800 || b.y < 0 || b.y > 600) {
            gameState.enemyBullets.splice(i, 1);
            continue;
        }
        
        if (Math.hypot(b.x - gameState.player.x, b.y - gameState.player.y) < 20) {
            gameState.player.hp -= b.damage;
            gameState.enemyBullets.splice(i, 1);
            
            if (gameState.player.hp <= 0) {
                gameState.player.lives--;
                gameState.deaths++;
                gameState.defenseDeaths++;
                
                if (gameState.player.lives <= 0) {
                    gameState.gameOver = true;
                } else {
                    gameState.player.hp = gameState.player.maxHp;
                }
            }
            continue;
        }
        
        if (gameState.playerBase && Math.hypot(b.x - gameState.playerBase.x, b.y - gameState.playerBase.y) < 35) {
            gameState.playerBase.hp -= b.damage;
            gameState.enemyBullets.splice(i, 1);
            if (gameState.playerBase.hp <= 0) gameState.gameOver = true;
        }
    }
}

function checkCollisions() {
    for (let i = gameState.enemies.length - 1; i >= 0; i--) {
        const e = gameState.enemies[i];
        if (Math.hypot(e.x - gameState.player.x, e.y - gameState.player.y) < 30) {
            gameState.player.hp -= e.damage * 0.5;
            gameState.enemies.splice(i, 1);
            
            if (gameState.player.hp <= 0) {
                gameState.player.lives--;
                gameState.deaths++;
                gameState.defenseDeaths++;
                
                if (gameState.player.lives <= 0) { 
                    gameState.gameOver = true; 
                } else { 
                    gameState.player.hp = gameState.player.maxHp;
                }
            }
        }
    }
}

function checkCampaignTasks() {
    if (gameState.mode !== 'campaign') return;
    
    gameState.campaignTasks.forEach(task => {
        if (task.completed) return;
        
        switch(task.type) {
            case 'kill':
                if (gameState.kills >= task.target) task.completed = true;
                break;
            case 'killFast':
                if (gameState.killsByType.fast >= task.target) task.completed = true;
                break;
            case 'killTank':
                if (gameState.killsByType.tank >= task.target) task.completed = true;
                break;
            case 'survive':
                if (gameState.timer >= task.target) task.completed = true;
                break;
            case 'destroyBase':
                if (gameState.enemyBase && gameState.enemyBase.hp <= 0) task.completed = true;
                break;
            case 'noBaseDamage':
                if (gameState.playerBase && gameState.playerBase.hp === gameState.baseInitialHp) task.completed = true;
                break;
            case 'accuracy':
                const accuracy = gameState.shotsFired > 0 ? (gameState.shotsHit / gameState.shotsFired) * 100 : 0;
                if (accuracy >= task.target) task.completed = true;
                break;
            case 'noDeaths':
                if (gameState.deaths === 0) task.completed = true;
                break;
            case 'baseHealth':
                if (gameState.playerBase) {
                    const healthPercent = (gameState.playerBase.hp / gameState.playerBase.maxHp) * 100;
                    if (healthPercent >= task.target) task.completed = true;
                }
                break;
            case 'timeLimit':
                if (gameState.timer <= task.target) task.completed = true;
                break;
        }
    });
    
    const allCompleted = gameState.campaignTasks.every(task => task.completed);
    const level = campaignLevels.find(l => l.id === gameState.campaignLevel);
    if ((level && level.hasBase) ? allCompleted : allCompleted) {
        gameState.victory = true;
    }
}

function updateWaveAndBase() {
    if (gameState.mode !== 'survival' && gameState.mode !== 'defense') {
        if (gameState.killsThisWave >= 5) {
            gameState.wave++;
            gameState.killsThisWave = 0;
            checkAchievements('wave', 1);
            gameData.money += 50;
        }
    }
    hudWave.innerText = gameState.wave;
}

function updateHUD() {
    if (!gameState.player) return;
    
    let modeText = '';
    
    switch(gameState.mode) {
        case 'survival':
            modeText = ` 🏆 ${gameState.survivalScore}`;
            break;
        case 'campaign':
            modeText = ` 📖 Ур.${gameState.campaignLevel}`;
            break;
        case 'defense':
            const timeLeft = Math.max(0, gameState.defenseTime - gameState.timer);
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            modeText = ` 🛡️ ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            break;
    }
    
    hudLives.innerText = '❤️'.repeat(gameState.player.lives);
    hudKills.innerText = gameState.kills;
    hudMoney.innerText = gameData.money;
    
    const mins = Math.floor(gameState.timer / 60);
    const secs = gameState.timer % 60;
    hudTimer.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}${modeText}`;
    
    const hpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    hudHealthFill.style.width = `${Math.max(0, hpPercent)}%`;
}

// --- 7. ОТРИСОВКА ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Сетка
    ctx.strokeStyle = '#00f5ff20';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.strokeStyle = '#00f5ff10';
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.strokeStyle = '#ff006610';
        ctx.stroke();
    }
    
    // Базы
    if (gameState.playerBase) {
        drawBase(gameState.playerBase.x, gameState.playerBase.y, '#00f5ff', 'БАЗА', gameState.playerBase.hp, gameState.playerBase.maxHp);
    }
    if (gameState.enemyBase) {
        drawBase(gameState.enemyBase.x, gameState.enemyBase.y, '#ff0066', 'ВРАГ', gameState.enemyBase.hp, gameState.enemyBase.maxHp);
    }
    
    // Игрок
    drawTank(gameState.player.x, gameState.player.y, gameState.player.angle, '#00f5ff', '#0088ff', true);
    
    // Полоска здоровья игрока
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#333';
    ctx.fillRect(gameState.player.x - 20, gameState.player.y - 30, 40, 4);
    ctx.fillStyle = '#00f5ff';
    ctx.fillRect(gameState.player.x - 20, gameState.player.y - 30, 40 * (gameState.player.hp / gameState.player.maxHp), 4);
    
    // Враги
    gameState.enemies.forEach(e => {
        drawTank(e.x, e.y, e.angle, e.bodyColor, e.trackColor, false);
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#333';
        ctx.fillRect(e.x - 20, e.y - 30, 40, 4);
        
        let healthColor = '#00ff00';
        if (e.hp / e.maxHp < 0.6) healthColor = '#ffff00';
        if (e.hp / e.maxHp < 0.3) healthColor = '#ff0000';
        
        ctx.fillStyle = healthColor;
        ctx.fillRect(e.x - 20, e.y - 30, 40 * (e.hp / e.maxHp), 4);
    });
    
    // Пули игрока
    gameState.bullets.forEach(b => {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Пули врагов
    gameState.enemyBullets.forEach(b => {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 5;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.shadowBlur = 0;
    
    // Режим игры
    ctx.font = 'bold 24px "Courier New"';
    ctx.fillStyle = '#ff0066';
    ctx.shadowColor = '#ff0066';
    ctx.shadowBlur = 15;
    
    let modeDisplay = '';
    switch(gameState.mode) {
        case 'classic': modeDisplay = 'CLASSIC'; break;
        case 'survival': modeDisplay = 'SURVIVAL'; break;
        case 'campaign': modeDisplay = `LVL ${gameState.campaignLevel}`; break;
        case 'defense': modeDisplay = 'DEFENSE'; break;
    }
    ctx.fillText(modeDisplay, 10, 50);
    
    // Задания кампании
    if (gameState.mode === 'campaign' && gameState.campaignTasks) {
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10;
        ctx.font = 'bold 14px "Courier New"';
        ctx.fillStyle = '#00ff00';
        ctx.textAlign = 'right';
        
        let yOffset = 80;
        ctx.fillText('ЗАДАНИЯ:', 790, yOffset);
        yOffset += 25;
        
        const incompleteTasks = gameState.campaignTasks.filter(t => !t.completed);
        const completeTasks = gameState.campaignTasks.filter(t => t.completed);
        
        [...incompleteTasks, ...completeTasks].forEach(task => {
            const status = task.completed ? '✅' : '⭕';
            ctx.fillText(`${status} ${task.description} (${task.reward}💰)`, 790, yOffset);
            yOffset += 20;
        });
        
        ctx.textAlign = 'left';
    }
    
    ctx.shadowBlur = 0;
}

function drawBase(x, y, color, label, hp, maxHp) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    
    ctx.fillStyle = color;
    ctx.fillRect(x - 35, y - 20, 70, 40);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(x - 25, y - 10, 10, 20);
    ctx.fillRect(x + 15, y - 10, 10, 20);
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x, y - 40);
    ctx.stroke();
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y - 45, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    const healthPercent = hp / maxHp;
    ctx.fillStyle = '#333';
    ctx.fillRect(x - 30, y - 30, 60, 5);
    
    let healthColor = '#00ff00';
    if (healthPercent < 0.6) healthColor = '#ffff00';
    if (healthPercent < 0.3) healthColor = '#ff0000';
    
    ctx.fillStyle = healthColor;
    ctx.fillRect(x - 30, y - 30, 60 * healthPercent, 5);
    
    ctx.font = 'bold 14px "Courier New"';
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fillText(label, x - 20, y - 35);
    ctx.shadowBlur = 0;
}

function drawTank(x, y, angle, bodyColor, trackColor, isPlayer = false) {
    ctx.shadowColor = bodyColor;
    ctx.shadowBlur = 15;
    
    ctx.fillStyle = trackColor;
    ctx.beginPath();
    ctx.ellipse(x - 12, y, 8, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 12, y, 8, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(x, y, 18, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = isPlayer ? 'white' : trackColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.stroke();
    
    ctx.fillStyle = isPlayer ? '#00f5ff' : trackColor;
    ctx.beginPath();
    ctx.arc(22, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    ctx.shadowBlur = 0;
}

// --- 8. УПРАВЛЕНИЕ ---
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        gameState.keys[key] = true;
        e.preventDefault();
    }
    if (key === 'escape' && gameState.active) {
        gameState.paused = !gameState.paused;
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        gameState.keys[key] = false;
        e.preventDefault();
    }
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    gameState.mouse.x = (e.clientX - rect.left) * scaleX;
    gameState.mouse.y = (e.clientY - rect.top) * scaleY;
});

canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) gameState.mouse.down = true;
});

canvas.addEventListener('mouseup', (e) => {
    if (e.button === 0) gameState.mouse.down = false;
});

// --- НОВОЕ: ИДЕАЛЬНОЕ МОБИЛЬНОЕ УПРАВЛЕНИЕ ---
joystickLeft.addEventListener('touchstart', (e) => {
    e.preventDefault();
    gameState.touch.left.active = true;
});

joystickLeft.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    
    // Получаем координаты касания
    const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    // Вычисляем вектор от центра левой половины экрана
    const centerX = canvas.width / 4; // Центр левой половины
    const centerY = canvas.height / 2;
    
    let dx = touchX - centerX;
    let dy = touchY - centerY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
    if (distance > 20) {
        // Нормализуем вектор
        gameState.touch.left.vectorX = dx / distance;
        gameState.touch.left.vectorY = dy / distance;
    } else {
        gameState.touch.left.vectorX = 0;
        gameState.touch.left.vectorY = 0;
    }
});

joystickLeft.addEventListener('touchend', (e) => {
    e.preventDefault();
    gameState.touch.left.active = false;
    gameState.touch.left.vectorX = 0;
    gameState.touch.left.vectorY = 0;
});

joystickRight.addEventListener('touchstart', (e) => {
    e.preventDefault();
    gameState.touch.right.active = true;
    
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    // Сразу вычисляем угол при касании
    const dx = touchX - gameState.player.x;
    const dy = touchY - gameState.player.y;
    gameState.touch.right.angle = Math.atan2(dy, dx);
});

joystickRight.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    // Вычисляем угол от игрока к точке касания
    const dx = touchX - gameState.player.x;
    const dy = touchY - gameState.player.y;
    gameState.touch.right.angle = Math.atan2(dy, dx);
});

joystickRight.addEventListener('touchend', (e) => {
    e.preventDefault();
    gameState.touch.right.active = false;
});

// Отключаем стандартное поведение touch на canvas
canvas.addEventListener('touchstart', (e) => e.preventDefault());
canvas.addEventListener('touchmove', (e) => e.preventDefault());
canvas.addEventListener('touchend', (e) => e.preventDefault());

// --- 9. ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();

    // Лобби
    document.getElementById('btn-classic').onclick = () => showScreen('difficulty-menu');
    document.getElementById('btn-survival').onclick = () => startSurvival();
    document.getElementById('btn-campaign').onclick = () => {
        showCampaignMenu();
    };
    document.getElementById('btn-defense').onclick = () => startDefense();
    document.getElementById('btn-shop').onclick = () => { updateShopUI(); showScreen('shop'); };
    document.getElementById('btn-achievements').onclick = () => { updateAchievementsUI(); showScreen('achievements'); };

    // Добавляем кнопку Channel
    const channelBtn = document.createElement('button');
    channelBtn.id = 'btn-channel';
    channelBtn.className = 'neon-btn';
    channelBtn.style.marginTop = '20px';
    channelBtn.style.borderColor = '#00f5ff';
    channelBtn.style.color = '#00f5ff';
    channelBtn.innerHTML = 'CHANNEL';
    channelBtn.onclick = () => window.open('https://t.me/tanks_neon_warfare', '_blank');
    document.querySelector('#lobby .menu-buttons').appendChild(channelBtn);

    // Выбор сложности
    document.getElementById('diff-easy').onclick = () => startClassic('easy');
    document.getElementById('diff-medium').onclick = () => startClassic('medium');
    document.getElementById('diff-hard').onclick = () => startClassic('hard');
    document.getElementById('back-from-diff').onclick = () => showScreen('lobby');

    // Назад
    document.getElementById('back-from-shop').onclick = () => showScreen('lobby');
    document.getElementById('back-from-ach').onclick = () => showScreen('lobby');

    // Кнопки покупки
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const weapon = btn.dataset.weapon;
            const price = parseInt(btn.dataset.price);
            if (gameData.money >= price && !gameData.purchasedWeapons.includes(weapon)) {
                gameData.money -= price;
                gameData.purchasedWeapons.push(weapon);
                saveGameData();
                updateShopUI();
            }
        };
    });

    // Кнопки достижений
    document.querySelectorAll('.claim-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            claimAchievement(btn.dataset.ach);
        };
    });

    // Рестарт
    document.getElementById('restart-from-over').onclick = () => {
        if (gameState.mode === 'survival') startSurvival();
        else if (gameState.mode === 'campaign') startCampaign(gameState.campaignLevel);
        else if (gameState.mode === 'defense') startDefense();
        else startClassic('medium');
    };
    
    document.getElementById('restart-from-victory').onclick = () => {
        if (gameState.mode === 'survival') startSurvival();
        else if (gameState.mode === 'campaign') startCampaign(gameState.campaignLevel);
        else if (gameState.mode === 'defense') startDefense();
        else startClassic('medium');
    };

    document.getElementById('menu-from-over').onclick = () => showScreen('lobby');
    document.getElementById('menu-from-victory').onclick = () => showScreen('lobby');
});

// Функция для показа меню кампании
function showCampaignMenu() {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'screen active';
    menuDiv.id = 'campaign-menu';
    menuDiv.innerHTML = `
        <h2>ВЫБЕРИ УРОВЕНЬ</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px;">
            ${Array.from({ length: 15 }, (_, i) => i + 1).map(level => {
                const isAvailable = level <= gameData.campaignProgress;
                const buttonColor = isAvailable ? '#00f5ff' : '#ff0066';
                const levelData = campaignLevels.find(l => l.id === level);
                const hasBaseIcon = levelData.hasBase ? ' 🏰' : ' ⚔️';
                return `
                    <button class="neon-btn" style="margin: 5px; border-color: ${buttonColor}; color: ${buttonColor}; box-shadow: 0 0 5px ${buttonColor};" 
                        ${!isAvailable ? 'disabled' : ''} 
                        onclick="selectCampaignLevel(${level})">
                        УРОВЕНЬ ${level}${hasBaseIcon}
                    </button>
                `;
            }).join('')}
        </div>
        <button id="back-from-campaign" class="neon-btn back-btn" style="border-color: #ff0066; color: #ff0066; box-shadow: 0 0 5px #ff0066;">НАЗАД</button>
    `;
    
    document.getElementById('game-container').appendChild(menuDiv);
    
    document.getElementById('back-from-campaign').onclick = () => {
        menuDiv.remove();
        showScreen('lobby');
    };
}

// Глобальная функция для выбора уровня кампании
window.selectCampaignLevel = function(level) {
    document.getElementById('campaign-menu')?.remove();
    startCampaign(level);
};
