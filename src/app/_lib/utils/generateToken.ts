export function generateToken(): string {
    return crypto.randomUUID();
}
// cette fonction génère un token unique en utilisant l'API crypto de JavaScript