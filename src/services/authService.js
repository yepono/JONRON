// src/services/authService.js

const USERS_STORAGE_KEY = 'jonron_users';
const CURRENT_USER_KEY = 'jonron_current_user';

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
        scannedCards: [
            { id: 'c1', player: 'Aaron Judge', team: 'Yankees', rarity: 'Oro', number: '#99' },
            { id: 'c2', player: 'Rafael Devers', team: 'Red Sox', rarity: 'Plata', number: '#11' },
            { id: 'c3', player: 'Vladimir Guerrero Jr.', team: 'Blue Jays', rarity: 'Bronce', number: '#27' },
        ],
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