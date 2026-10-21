const ADMIN_SESSION_KEY = 'jonron_admin_session';
const ADMIN_USERS_KEY = 'jonron_admin_users';
export const ADMIN_SESSION_CHANGED_EVENT = 'jonron-admin-session-changed';

const configuredEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@jonron.com';
const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

const getStoredAdminUsers = () => JSON.parse(localStorage.getItem(ADMIN_USERS_KEY) || '[]');

const createSession = (admin) => {
    const session = {
        email: admin.email,
        username: admin.username,
        role: 'admin',
        avatar: null,
        favoriteTeam: 'Liga Americana',
        points: 1250,
        scannedCards: [],
        inventory: [],
        createdAt: new Date().toISOString(),
        loggedAt: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event(ADMIN_SESSION_CHANGED_EVENT));
    return session;
};

export const loginAdmin = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const storedAdmin = getStoredAdminUsers().find(
        (admin) => admin.email === normalizedEmail && admin.password === password
    );

    if (storedAdmin) return createSession(storedAdmin);

    if (normalizedEmail !== configuredEmail.toLowerCase() || password !== configuredPassword) {
        throw new Error('Credenciales de administrador inválidas.');
    }

    return createSession({
        email: configuredEmail,
        username: 'Administrador',
    });
};

export const registerAdmin = ({ username, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const alreadyExists = normalizedEmail === configuredEmail.toLowerCase()
        || getStoredAdminUsers().some((admin) => admin.email === normalizedEmail);

    if (alreadyExists) {
        throw new Error('Ya existe una cuenta administrativa con ese correo.');
    }

    const newAdmin = {
        id: Date.now().toString(),
        username: username.trim(),
        email: normalizedEmail,
        password,
    };
    const admins = [...getStoredAdminUsers(), newAdmin];
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(admins));
    return createSession(newAdmin);
};

export const getAdminSession = () => {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!session) return null;

    return {
        avatar: null,
        favoriteTeam: 'Liga Americana',
        points: 1250,
        scannedCards: [],
        inventory: [],
        ...JSON.parse(session),
    };
};

export const updateAdminSession = (updatedFields) => {
    const currentSession = getAdminSession();
    if (!currentSession) return null;

    const updatedSession = { ...currentSession, ...updatedFields };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(updatedSession));
    window.dispatchEvent(new Event(ADMIN_SESSION_CHANGED_EVENT));
    return updatedSession;
};

export const logoutAdmin = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.dispatchEvent(new Event(ADMIN_SESSION_CHANGED_EVENT));
};