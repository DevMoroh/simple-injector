import { getInjectable } from "./injectable";

export function Inject(injectionKey: string, ...args: any[]) {
    return function applyInjection(
        _property: any,
        context: ClassFieldDecoratorContext,
    ) {
        if (context.kind === "field") {
            return () => getInjectable(injectionKey, args);
        }
        return;
    };
}
