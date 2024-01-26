import { Constructor, IInjectCacheItem, IInjectStoreItem } from "./types";

export const injectStore = new Map<string, IInjectStoreItem>();
export const injectCache = new Map<string, IInjectCacheItem>();

export const getKey = (name: string, ...args: any[]): string =>
    `${name}:${JSON.stringify(args)}`;

export function isConstructor(func: any): func is Constructor {
    console.log(
        typeof func === "function",
        Function.prototype.toString.call(func),
    );
    return (
        typeof func === "function" &&
        /^class\s/.test(Function.prototype.toString.call(func))
    );
}

function getServiceInstance(
    injectableService: (...args: any[]) => Constructor | CallableFunction,
    args: any[],
): any {
    const service = injectableService(...args);
    if (isConstructor(service)) {
        return new service(...args);
    }
    return service;
}

export const getInjectable = (name: string, args: any[]): any => {
    const key = getKey(name, ...args);
    if (injectCache.has(key)) {
        const item = injectCache.get(key);
        return item!.service;
    }

    const injectable: IInjectStoreItem = <IInjectStoreItem>(
        injectStore.get(name)
    );
    if (!injectable) {
        throw new Error(`Injectable ${name} not found!`);
    }

    const service = getServiceInstance(injectable.create, args);

    injectCache.set(key, { service });
    return service;
};

export function register(
    injectionKey: string,
    callback: { create(...args: any[]): any },
): void {
    injectStore.set(injectionKey, callback);
}

export function close(name: string): void {
    const injectable: IInjectStoreItem = <IInjectStoreItem>(
        injectStore.get(name)
    );
    if (!injectable) {
        throw new Error(`Injectable ${name} not found!`);
    }
    injectStore.delete(name);
}

export function Injectable(injectionKey: string) {
    return function applyInjection(
        Class: new (...args: any[]) => any,
        _context: any,
    ) {
        register(injectionKey, {
            create() {
                return Class;
            },
        });
    };
}
