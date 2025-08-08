export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@\d]+$/.test(email);
//expression régulière simple pour valider l'email