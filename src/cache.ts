export interface Data {
    value: any;
    expires: number;
    mtime: number;
}

export class Cache {
    public store = new Map<string, Data>();
    public maxAge: number;
    constructor(maxAge: number) {
        this.maxAge = maxAge;
    }
    public set(key: string, value: any, maxAge?: number) {
        const expires = Date.now() + (maxAge ?? this.maxAge) * 1000;
        this.store.set(key, {
            value,
            expires,
            mtime: Date.now(),
        });
    }
    public get(key: string) {
        const data = this.store.get(key);
        if (!data) return null;
        if (data.expires < Date.now()) {
            this.store.delete(key);
            return null;
        }
        return data.value;
    }
}
