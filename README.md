# Decorator-injector
**Decorator-injector** is a very lightweight Dependency Injection ts library\
**Features**:
- super small ~10 kB
- built on TypeScript 5.*
- latest decorator proposal (stage-3) https://github.com/tc39/proposal-decorators 
- class fields can be decorated
- no need to use reflect-metadata or other extra packages

### Examples of usage:
**Register class as DI with decorator:**
```typescript
@Injectable("AnotherService")
export class AnotherService {
    helloWorld() {
        console.log("Hello world! Injected AnotherService");
    }
}
```
**Inject as class field**
```typescript
export class AnotherServiceTwo {
    @Inject("AnotherService") anotherService: AnotherService;

    async run() {
        this.anotherService.helloWorld();
    }
}
```
**Register dependency directly (free to customize)**
```typescript
register("Knex", {
    create(args: any[]) {
        // some logic you might need
        return new MyClass(args)
    }
})
```

#### Register Knex dependency
```typescript
register("Knex", {
    create(options: { connection?: any }) {
        if (!options.connection) {
            throw new Error("Database connection config is not defined");
        }
        return knex({
            client: "pg",
            connection: options.connection,
        });
    },
});

export class AnotherServiceTwo {
    @Inject("Knex", {
        connection: {
            user: "user",
            database: "admin",
            password: "1234****",
            host: "hattie.db.com",
            ssl: true,
        },
    })
    knex: Knex;

    async run() {
        const result = await this.knex.raw("SELECT 1");
    }
}

const anotherService = new AnotherServiceTwo();

await anotherService.run();

```

