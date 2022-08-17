import {LocalStorageService} from "./local";

export interface IStorageService {
    set(key: string, value: any): void
    get(key: string): any
}

export enum storageType {
    localStorage,
}

export function newStorageService(type: storageType): IStorageService {
    switch (type) {
        case storageType.localStorage:
            return new LocalStorageService();
        default:
            return new MemoryStorageService();
    }
}

class MemoryStorageService implements IStorageService {
    map: {[key: string]: any};

    constructor() {
        this.map = {}
    }

    get(key: string): any {
        return this.map[key];
    }

    set(key: string, value: any): void {
        this.map[key] = value;
    }
}
