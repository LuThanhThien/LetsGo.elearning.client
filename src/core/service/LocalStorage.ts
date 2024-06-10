

export class LocalStorage {
    static get(key: string) {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem(key) || "");
        }
    }
    static set(key: string, value: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    static remove(key: string) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }

    static clear() {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }
}