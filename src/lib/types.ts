export type Constructor<T = any> = new (...args: any[]) => T;
export type CallableFunction = (...args: any[]) => any;

export interface IInjectStoreItem {
    create(...args: any[]): Constructor | CallableFunction;
}

export interface IInjectCacheItem {
    service?: any;
}
