import { getInjectable } from "./injectable";

export function Inject(injectionKey: string, ...args: any[]) {
    return function applyInjection(_property: any, _context: any) {
        return () => getInjectable(injectionKey, args);
    };
}
