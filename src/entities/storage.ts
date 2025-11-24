import type { Task } from './tasks';

const STORAGE_KEY = 'tasks';

export function saveToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadFromLocalStorage(): Task[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    return parsed.map((t: any) => ({
        ...t,
        created: new Date(t.created)
    }));
}