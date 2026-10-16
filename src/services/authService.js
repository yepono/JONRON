// src/services/authService.js
import americanLeagueTeams from '../data/americanLeagueTeams.json';

const USERS_STORAGE_KEY = 'jonron_users';
const CURRENT_USER_KEY = 'jonron_current_user';
const AMERICAN_LEAGUE_TEAM_IDS = new Set(americanLeagueTeams.map(({ id }) => id));

export const registerUser = ({ username, email, password, avatar, favoriteTeam }) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');

    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    const newUser = {
        id: Date.now().toString(),
        username,
        email: email.toLowerCase(),
        password,
        avatar: avatar || null,
        favoriteTeam: favoriteTeam || 'New York Yankees',
        points: 1250, // Puntos simulados iniciales para la tienda
        scannedCards: [],
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
};

export const loginUser = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
        throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
};

export const getCurrentUser = () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const updateUserProfile = (updatedFields) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const updatedUser = { ...currentUser, ...updatedFields };

    const userIndex = users.findIndex((u) => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
};

export const markCardScanned = (card) => {
    const currentUser = getCurrentUser();
    if (!currentUser || !AMERICAN_LEAGUE_TEAM_IDS.has(card.id)) return null;

    const scannedCards = currentUser.scannedCards || [];
    if (scannedCards.some((scannedCard) => scannedCard.id === card.id)) {
        return currentUser;
    }

    return updateUserProfile({
        scannedCards: [...scannedCards, { ...card, scannedAt: new Date().toISOString() }],
    });
};


export const buyShopItem = (item) => {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error('Debes iniciar sesión para comprar.');

    const currentPoints = currentUser.points || 0;
    if (currentPoints < item.price) {
        throw new Error('No tienes suficientes Puntos Jonrón.');
    }

    const inventory = currentUser.inventory || [];
    if (inventory.some((i) => i.id === item.id)) {
        throw new Error('Ya posees este artículo en tu colección.');
    }

    const updatedUser = updateUserProfile({
        points: currentPoints - item.price,
        inventory: [...inventory, { ...item, acquiredAt: new Date().toISOString() }],
    });

    return updatedUser;
};