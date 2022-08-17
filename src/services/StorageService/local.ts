import {IStorageService} from "./index";

export class LocalStorageService implements IStorageService {
    get(key: string): any {
        const value = window.localStorage.getItem(key);;
        if (value === null) {
             return null;
        }
        return JSON.parse(value);
    }

    set(key: string, value: any): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}
