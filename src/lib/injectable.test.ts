import {
    injectStore,
    injectCache,
    register,
    getInjectable,
    close,
    isConstructor,
    Injectable,
    Inject,
} from "./";

describe("Dependency Injection Module", () => {
    afterEach(() => {
        injectStore.clear();
        injectCache.clear();
    });

    test("isConstructor identifies constructors correctly", () => {
        class MyClass {}
        function myFunction() {}

        expect(isConstructor(MyClass)).toBeTruthy();
        expect(isConstructor(myFunction)).toBeFalsy();
    });

    test("register stores injectable items", () => {
        const mockCallback = jest.fn().mockImplementation(() => "TestService");
        register("Test", { create: mockCallback });

        expect(injectStore.has("Test")).toBeTruthy();
    });

    test("getInjectable retrieves a registered service", () => {
        const mockService = jest.fn();
        register("TestService", { create: () => mockService });

        const service = getInjectable("TestService", []);

        expect(service).toBe(mockService);
    });

    describe("Injectable", () => {
        it("should inject to a class", () => {
            @Injectable("MyDependency")
            class MyDependency {}

            class MyClass {
                @Inject("MyDependency") deps: MyDependency;
                myMethod() {
                    return this.deps;
                }
            }
            let myClass: MyClass;
            myClass = new MyClass();

            const deps = myClass.myMethod();
            expect(deps).toBeInstanceOf(MyDependency);
        });
    });

    test("getInjectable throws an error for unregistered service", () => {
        expect(() => getInjectable("NonExistentService", [])).toThrow(
            "Injectable NonExistentService not found!",
        );
    });

    test("close removes a registered service", () => {
        const mockCallback = jest.fn();
        register("Test", { create: mockCallback });

        close("Test");

        expect(injectStore.has("Test")).toBeFalsy();
    });

    test("close throws an error for non-existent service", () => {
        expect(() => close("NonExistent")).toThrow(
            "Injectable NonExistent not found!",
        );
    });
});
