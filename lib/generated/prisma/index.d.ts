
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model RefreshTokens
 * 
 */
export type RefreshTokens = $Result.DefaultSelection<Prisma.$RefreshTokensPayload>
/**
 * Model OrderbookHistory
 * 
 */
export type OrderbookHistory = $Result.DefaultSelection<Prisma.$OrderbookHistoryPayload>
/**
 * Model Items
 * 
 */
export type Items = $Result.DefaultSelection<Prisma.$ItemsPayload>
/**
 * Model Holdings
 * 
 */
export type Holdings = $Result.DefaultSelection<Prisma.$HoldingsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshTokens`: Exposes CRUD operations for the **RefreshTokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshTokens.findMany()
    * ```
    */
  get refreshTokens(): Prisma.RefreshTokensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderbookHistory`: Exposes CRUD operations for the **OrderbookHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderbookHistories
    * const orderbookHistories = await prisma.orderbookHistory.findMany()
    * ```
    */
  get orderbookHistory(): Prisma.OrderbookHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.items`: Exposes CRUD operations for the **Items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.items.findMany()
    * ```
    */
  get items(): Prisma.ItemsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.holdings`: Exposes CRUD operations for the **Holdings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holdings
    * const holdings = await prisma.holdings.findMany()
    * ```
    */
  get holdings(): Prisma.HoldingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Users: 'Users',
    RefreshTokens: 'RefreshTokens',
    OrderbookHistory: 'OrderbookHistory',
    Items: 'Items',
    Holdings: 'Holdings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "refreshTokens" | "orderbookHistory" | "items" | "holdings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      RefreshTokens: {
        payload: Prisma.$RefreshTokensPayload<ExtArgs>
        fields: Prisma.RefreshTokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>
          }
          findMany: {
            args: Prisma.RefreshTokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>[]
          }
          create: {
            args: Prisma.RefreshTokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>
          }
          createMany: {
            args: Prisma.RefreshTokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokensCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>
          }
          update: {
            args: Prisma.RefreshTokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokensUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokensPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshTokens>
          }
          groupBy: {
            args: Prisma.RefreshTokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokensCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokensCountAggregateOutputType> | number
          }
        }
      }
      OrderbookHistory: {
        payload: Prisma.$OrderbookHistoryPayload<ExtArgs>
        fields: Prisma.OrderbookHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderbookHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderbookHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>
          }
          findFirst: {
            args: Prisma.OrderbookHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderbookHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>
          }
          findMany: {
            args: Prisma.OrderbookHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>[]
          }
          create: {
            args: Prisma.OrderbookHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>
          }
          createMany: {
            args: Prisma.OrderbookHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderbookHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>[]
          }
          delete: {
            args: Prisma.OrderbookHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>
          }
          update: {
            args: Prisma.OrderbookHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>
          }
          deleteMany: {
            args: Prisma.OrderbookHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderbookHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderbookHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>[]
          }
          upsert: {
            args: Prisma.OrderbookHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderbookHistoryPayload>
          }
          aggregate: {
            args: Prisma.OrderbookHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderbookHistory>
          }
          groupBy: {
            args: Prisma.OrderbookHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderbookHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderbookHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<OrderbookHistoryCountAggregateOutputType> | number
          }
        }
      }
      Items: {
        payload: Prisma.$ItemsPayload<ExtArgs>
        fields: Prisma.ItemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>
          }
          findFirst: {
            args: Prisma.ItemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>
          }
          findMany: {
            args: Prisma.ItemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>[]
          }
          create: {
            args: Prisma.ItemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>
          }
          createMany: {
            args: Prisma.ItemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>[]
          }
          delete: {
            args: Prisma.ItemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>
          }
          update: {
            args: Prisma.ItemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>
          }
          deleteMany: {
            args: Prisma.ItemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>[]
          }
          upsert: {
            args: Prisma.ItemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemsPayload>
          }
          aggregate: {
            args: Prisma.ItemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItems>
          }
          groupBy: {
            args: Prisma.ItemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemsCountArgs<ExtArgs>
            result: $Utils.Optional<ItemsCountAggregateOutputType> | number
          }
        }
      }
      Holdings: {
        payload: Prisma.$HoldingsPayload<ExtArgs>
        fields: Prisma.HoldingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoldingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoldingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>
          }
          findFirst: {
            args: Prisma.HoldingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoldingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>
          }
          findMany: {
            args: Prisma.HoldingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>[]
          }
          create: {
            args: Prisma.HoldingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>
          }
          createMany: {
            args: Prisma.HoldingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoldingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>[]
          }
          delete: {
            args: Prisma.HoldingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>
          }
          update: {
            args: Prisma.HoldingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>
          }
          deleteMany: {
            args: Prisma.HoldingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoldingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HoldingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>[]
          }
          upsert: {
            args: Prisma.HoldingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingsPayload>
          }
          aggregate: {
            args: Prisma.HoldingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHoldings>
          }
          groupBy: {
            args: Prisma.HoldingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoldingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoldingsCountArgs<ExtArgs>
            result: $Utils.Optional<HoldingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: UsersOmit
    refreshTokens?: RefreshTokensOmit
    orderbookHistory?: OrderbookHistoryOmit
    items?: ItemsOmit
    holdings?: HoldingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    holdings: number
    orders: number
    refreshtokens: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | UsersCountOutputTypeCountHoldingsArgs
    orders?: boolean | UsersCountOutputTypeCountOrdersArgs
    refreshtokens?: boolean | UsersCountOutputTypeCountRefreshtokensArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderbookHistoryWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRefreshtokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokensWhereInput
  }


  /**
   * Count Type ItemsCountOutputType
   */

  export type ItemsCountOutputType = {
    holdings: number
    orders: number
  }

  export type ItemsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | ItemsCountOutputTypeCountHoldingsArgs
    orders?: boolean | ItemsCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ItemsCountOutputType without action
   */
  export type ItemsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemsCountOutputType
     */
    select?: ItemsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemsCountOutputType without action
   */
  export type ItemsCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingsWhereInput
  }

  /**
   * ItemsCountOutputType without action
   */
  export type ItemsCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderbookHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
    Balance: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
    Balance: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    name: string | null
    password: string | null
    createdAt: Date | null
    Balance: number | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    name: string | null
    password: string | null
    createdAt: Date | null
    Balance: number | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    password: number
    createdAt: number
    Balance: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
    Balance?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
    Balance?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    password?: true
    createdAt?: true
    Balance?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    password?: true
    createdAt?: true
    Balance?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    password?: true
    createdAt?: true
    Balance?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    name: string
    password: string
    createdAt: Date
    Balance: number
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    Balance?: boolean
    holdings?: boolean | Users$holdingsArgs<ExtArgs>
    orders?: boolean | Users$ordersArgs<ExtArgs>
    refreshtokens?: boolean | Users$refreshtokensArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    Balance?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    Balance?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    Balance?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "password" | "createdAt" | "Balance", ExtArgs["result"]["users"]>
  export type UsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | Users$holdingsArgs<ExtArgs>
    orders?: boolean | Users$ordersArgs<ExtArgs>
    refreshtokens?: boolean | Users$refreshtokensArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      holdings: Prisma.$HoldingsPayload<ExtArgs>[]
      orders: Prisma.$OrderbookHistoryPayload<ExtArgs>[]
      refreshtokens: Prisma.$RefreshTokensPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      password: string
      createdAt: Date
      Balance: number
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UsersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    holdings<T extends Users$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, Users$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Users$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Users$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshtokens<T extends Users$refreshtokensArgs<ExtArgs> = {}>(args?: Subset<T, Users$refreshtokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'Int'>
    readonly name: FieldRef<"Users", 'String'>
    readonly password: FieldRef<"Users", 'String'>
    readonly createdAt: FieldRef<"Users", 'DateTime'>
    readonly Balance: FieldRef<"Users", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users updateManyAndReturn
   */
  export type UsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users.holdings
   */
  export type Users$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    where?: HoldingsWhereInput
    orderBy?: HoldingsOrderByWithRelationInput | HoldingsOrderByWithRelationInput[]
    cursor?: HoldingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingsScalarFieldEnum | HoldingsScalarFieldEnum[]
  }

  /**
   * Users.orders
   */
  export type Users$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    where?: OrderbookHistoryWhereInput
    orderBy?: OrderbookHistoryOrderByWithRelationInput | OrderbookHistoryOrderByWithRelationInput[]
    cursor?: OrderbookHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderbookHistoryScalarFieldEnum | OrderbookHistoryScalarFieldEnum[]
  }

  /**
   * Users.refreshtokens
   */
  export type Users$refreshtokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    where?: RefreshTokensWhereInput
    orderBy?: RefreshTokensOrderByWithRelationInput | RefreshTokensOrderByWithRelationInput[]
    cursor?: RefreshTokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokensScalarFieldEnum | RefreshTokensScalarFieldEnum[]
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
  }


  /**
   * Model RefreshTokens
   */

  export type AggregateRefreshTokens = {
    _count: RefreshTokensCountAggregateOutputType | null
    _avg: RefreshTokensAvgAggregateOutputType | null
    _sum: RefreshTokensSumAggregateOutputType | null
    _min: RefreshTokensMinAggregateOutputType | null
    _max: RefreshTokensMaxAggregateOutputType | null
  }

  export type RefreshTokensAvgAggregateOutputType = {
    id: number | null
  }

  export type RefreshTokensSumAggregateOutputType = {
    id: number | null
  }

  export type RefreshTokensMinAggregateOutputType = {
    id: number | null
    userName: string | null
    token: string | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type RefreshTokensMaxAggregateOutputType = {
    id: number | null
    userName: string | null
    token: string | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type RefreshTokensCountAggregateOutputType = {
    id: number
    userName: number
    token: number
    userAgent: number
    ipAddress: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type RefreshTokensAvgAggregateInputType = {
    id?: true
  }

  export type RefreshTokensSumAggregateInputType = {
    id?: true
  }

  export type RefreshTokensMinAggregateInputType = {
    id?: true
    userName?: true
    token?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    expiresAt?: true
  }

  export type RefreshTokensMaxAggregateInputType = {
    id?: true
    userName?: true
    token?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    expiresAt?: true
  }

  export type RefreshTokensCountAggregateInputType = {
    id?: true
    userName?: true
    token?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type RefreshTokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to aggregate.
     */
    where?: RefreshTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokensOrderByWithRelationInput | RefreshTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefreshTokensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefreshTokensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokensMaxAggregateInputType
  }

  export type GetRefreshTokensAggregateType<T extends RefreshTokensAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshTokens[P]>
      : GetScalarType<T[P], AggregateRefreshTokens[P]>
  }




  export type RefreshTokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokensWhereInput
    orderBy?: RefreshTokensOrderByWithAggregationInput | RefreshTokensOrderByWithAggregationInput[]
    by: RefreshTokensScalarFieldEnum[] | RefreshTokensScalarFieldEnum
    having?: RefreshTokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokensCountAggregateInputType | true
    _avg?: RefreshTokensAvgAggregateInputType
    _sum?: RefreshTokensSumAggregateInputType
    _min?: RefreshTokensMinAggregateInputType
    _max?: RefreshTokensMaxAggregateInputType
  }

  export type RefreshTokensGroupByOutputType = {
    id: number
    userName: string
    token: string
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date
    expiresAt: Date
    _count: RefreshTokensCountAggregateOutputType | null
    _avg: RefreshTokensAvgAggregateOutputType | null
    _sum: RefreshTokensSumAggregateOutputType | null
    _min: RefreshTokensMinAggregateOutputType | null
    _max: RefreshTokensMaxAggregateOutputType | null
  }

  type GetRefreshTokensGroupByPayload<T extends RefreshTokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokensGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokensGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userName?: boolean
    token?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshTokens"]>

  export type RefreshTokensSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userName?: boolean
    token?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshTokens"]>

  export type RefreshTokensSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userName?: boolean
    token?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshTokens"]>

  export type RefreshTokensSelectScalar = {
    id?: boolean
    userName?: boolean
    token?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type RefreshTokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userName" | "token" | "userAgent" | "ipAddress" | "createdAt" | "expiresAt", ExtArgs["result"]["refreshTokens"]>
  export type RefreshTokensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type RefreshTokensIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type RefreshTokensIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $RefreshTokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshTokens"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userName: string
      token: string
      userAgent: string | null
      ipAddress: string | null
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["refreshTokens"]>
    composites: {}
  }

  type RefreshTokensGetPayload<S extends boolean | null | undefined | RefreshTokensDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokensPayload, S>

  type RefreshTokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokensCountAggregateInputType | true
    }

  export interface RefreshTokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshTokens'], meta: { name: 'RefreshTokens' } }
    /**
     * Find zero or one RefreshTokens that matches the filter.
     * @param {RefreshTokensFindUniqueArgs} args - Arguments to find a RefreshTokens
     * @example
     * // Get one RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokensFindUniqueArgs>(args: SelectSubset<T, RefreshTokensFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshTokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokensFindUniqueOrThrowArgs} args - Arguments to find a RefreshTokens
     * @example
     * // Get one RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokensFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensFindFirstArgs} args - Arguments to find a RefreshTokens
     * @example
     * // Get one RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokensFindFirstArgs>(args?: SelectSubset<T, RefreshTokensFindFirstArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshTokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensFindFirstOrThrowArgs} args - Arguments to find a RefreshTokens
     * @example
     * // Get one RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokensFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokensWithIdOnly = await prisma.refreshTokens.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokensFindManyArgs>(args?: SelectSubset<T, RefreshTokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshTokens.
     * @param {RefreshTokensCreateArgs} args - Arguments to create a RefreshTokens.
     * @example
     * // Create one RefreshTokens
     * const RefreshTokens = await prisma.refreshTokens.create({
     *   data: {
     *     // ... data to create a RefreshTokens
     *   }
     * })
     * 
     */
    create<T extends RefreshTokensCreateArgs>(args: SelectSubset<T, RefreshTokensCreateArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokensCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokensCreateManyArgs>(args?: SelectSubset<T, RefreshTokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokensCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokensWithIdOnly = await prisma.refreshTokens.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokensCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshTokens.
     * @param {RefreshTokensDeleteArgs} args - Arguments to delete one RefreshTokens.
     * @example
     * // Delete one RefreshTokens
     * const RefreshTokens = await prisma.refreshTokens.delete({
     *   where: {
     *     // ... filter to delete one RefreshTokens
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokensDeleteArgs>(args: SelectSubset<T, RefreshTokensDeleteArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshTokens.
     * @param {RefreshTokensUpdateArgs} args - Arguments to update one RefreshTokens.
     * @example
     * // Update one RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokensUpdateArgs>(args: SelectSubset<T, RefreshTokensUpdateArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokensDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshTokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokensDeleteManyArgs>(args?: SelectSubset<T, RefreshTokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokensUpdateManyArgs>(args: SelectSubset<T, RefreshTokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokensUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokensWithIdOnly = await prisma.refreshTokens.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokensUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshTokens.
     * @param {RefreshTokensUpsertArgs} args - Arguments to update or create a RefreshTokens.
     * @example
     * // Update or create a RefreshTokens
     * const refreshTokens = await prisma.refreshTokens.upsert({
     *   create: {
     *     // ... data to create a RefreshTokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshTokens we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokensUpsertArgs>(args: SelectSubset<T, RefreshTokensUpsertArgs<ExtArgs>>): Prisma__RefreshTokensClient<$Result.GetResult<Prisma.$RefreshTokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshTokens.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokensCountArgs>(
      args?: Subset<T, RefreshTokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokensAggregateArgs>(args: Subset<T, RefreshTokensAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokensAggregateType<T>>

    /**
     * Group by RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokensGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshTokens model
   */
  readonly fields: RefreshTokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshTokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshTokens model
   */
  interface RefreshTokensFieldRefs {
    readonly id: FieldRef<"RefreshTokens", 'Int'>
    readonly userName: FieldRef<"RefreshTokens", 'String'>
    readonly token: FieldRef<"RefreshTokens", 'String'>
    readonly userAgent: FieldRef<"RefreshTokens", 'String'>
    readonly ipAddress: FieldRef<"RefreshTokens", 'String'>
    readonly createdAt: FieldRef<"RefreshTokens", 'DateTime'>
    readonly expiresAt: FieldRef<"RefreshTokens", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshTokens findUnique
   */
  export type RefreshTokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where: RefreshTokensWhereUniqueInput
  }

  /**
   * RefreshTokens findUniqueOrThrow
   */
  export type RefreshTokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where: RefreshTokensWhereUniqueInput
  }

  /**
   * RefreshTokens findFirst
   */
  export type RefreshTokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokensOrderByWithRelationInput | RefreshTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokensScalarFieldEnum | RefreshTokensScalarFieldEnum[]
  }

  /**
   * RefreshTokens findFirstOrThrow
   */
  export type RefreshTokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokensOrderByWithRelationInput | RefreshTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokensScalarFieldEnum | RefreshTokensScalarFieldEnum[]
  }

  /**
   * RefreshTokens findMany
   */
  export type RefreshTokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokensOrderByWithRelationInput | RefreshTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokensScalarFieldEnum | RefreshTokensScalarFieldEnum[]
  }

  /**
   * RefreshTokens create
   */
  export type RefreshTokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshTokens.
     */
    data: XOR<RefreshTokensCreateInput, RefreshTokensUncheckedCreateInput>
  }

  /**
   * RefreshTokens createMany
   */
  export type RefreshTokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokensCreateManyInput | RefreshTokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshTokens createManyAndReturn
   */
  export type RefreshTokensCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokensCreateManyInput | RefreshTokensCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshTokens update
   */
  export type RefreshTokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshTokens.
     */
    data: XOR<RefreshTokensUpdateInput, RefreshTokensUncheckedUpdateInput>
    /**
     * Choose, which RefreshTokens to update.
     */
    where: RefreshTokensWhereUniqueInput
  }

  /**
   * RefreshTokens updateMany
   */
  export type RefreshTokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokensUpdateManyMutationInput, RefreshTokensUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokensWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshTokens updateManyAndReturn
   */
  export type RefreshTokensUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokensUpdateManyMutationInput, RefreshTokensUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokensWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshTokens upsert
   */
  export type RefreshTokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshTokens to update in case it exists.
     */
    where: RefreshTokensWhereUniqueInput
    /**
     * In case the RefreshTokens found by the `where` argument doesn't exist, create a new RefreshTokens with this data.
     */
    create: XOR<RefreshTokensCreateInput, RefreshTokensUncheckedCreateInput>
    /**
     * In case the RefreshTokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokensUpdateInput, RefreshTokensUncheckedUpdateInput>
  }

  /**
   * RefreshTokens delete
   */
  export type RefreshTokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
    /**
     * Filter which RefreshTokens to delete.
     */
    where: RefreshTokensWhereUniqueInput
  }

  /**
   * RefreshTokens deleteMany
   */
  export type RefreshTokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokensWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshTokens without action
   */
  export type RefreshTokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshTokens
     */
    select?: RefreshTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshTokens
     */
    omit?: RefreshTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokensInclude<ExtArgs> | null
  }


  /**
   * Model OrderbookHistory
   */

  export type AggregateOrderbookHistory = {
    _count: OrderbookHistoryCountAggregateOutputType | null
    _avg: OrderbookHistoryAvgAggregateOutputType | null
    _sum: OrderbookHistorySumAggregateOutputType | null
    _min: OrderbookHistoryMinAggregateOutputType | null
    _max: OrderbookHistoryMaxAggregateOutputType | null
  }

  export type OrderbookHistoryAvgAggregateOutputType = {
    id: number | null
    price: number | null
    quantity: number | null
    itemId: number | null
  }

  export type OrderbookHistorySumAggregateOutputType = {
    id: number | null
    price: number | null
    quantity: number | null
    itemId: number | null
  }

  export type OrderbookHistoryMinAggregateOutputType = {
    id: number | null
    userName: string | null
    price: number | null
    quantity: number | null
    itemId: number | null
  }

  export type OrderbookHistoryMaxAggregateOutputType = {
    id: number | null
    userName: string | null
    price: number | null
    quantity: number | null
    itemId: number | null
  }

  export type OrderbookHistoryCountAggregateOutputType = {
    id: number
    userName: number
    price: number
    quantity: number
    itemId: number
    _all: number
  }


  export type OrderbookHistoryAvgAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    itemId?: true
  }

  export type OrderbookHistorySumAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    itemId?: true
  }

  export type OrderbookHistoryMinAggregateInputType = {
    id?: true
    userName?: true
    price?: true
    quantity?: true
    itemId?: true
  }

  export type OrderbookHistoryMaxAggregateInputType = {
    id?: true
    userName?: true
    price?: true
    quantity?: true
    itemId?: true
  }

  export type OrderbookHistoryCountAggregateInputType = {
    id?: true
    userName?: true
    price?: true
    quantity?: true
    itemId?: true
    _all?: true
  }

  export type OrderbookHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderbookHistory to aggregate.
     */
    where?: OrderbookHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderbookHistories to fetch.
     */
    orderBy?: OrderbookHistoryOrderByWithRelationInput | OrderbookHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderbookHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderbookHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderbookHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderbookHistories
    **/
    _count?: true | OrderbookHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderbookHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderbookHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderbookHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderbookHistoryMaxAggregateInputType
  }

  export type GetOrderbookHistoryAggregateType<T extends OrderbookHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderbookHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderbookHistory[P]>
      : GetScalarType<T[P], AggregateOrderbookHistory[P]>
  }




  export type OrderbookHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderbookHistoryWhereInput
    orderBy?: OrderbookHistoryOrderByWithAggregationInput | OrderbookHistoryOrderByWithAggregationInput[]
    by: OrderbookHistoryScalarFieldEnum[] | OrderbookHistoryScalarFieldEnum
    having?: OrderbookHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderbookHistoryCountAggregateInputType | true
    _avg?: OrderbookHistoryAvgAggregateInputType
    _sum?: OrderbookHistorySumAggregateInputType
    _min?: OrderbookHistoryMinAggregateInputType
    _max?: OrderbookHistoryMaxAggregateInputType
  }

  export type OrderbookHistoryGroupByOutputType = {
    id: number
    userName: string
    price: number
    quantity: number
    itemId: number
    _count: OrderbookHistoryCountAggregateOutputType | null
    _avg: OrderbookHistoryAvgAggregateOutputType | null
    _sum: OrderbookHistorySumAggregateOutputType | null
    _min: OrderbookHistoryMinAggregateOutputType | null
    _max: OrderbookHistoryMaxAggregateOutputType | null
  }

  type GetOrderbookHistoryGroupByPayload<T extends OrderbookHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderbookHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderbookHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderbookHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], OrderbookHistoryGroupByOutputType[P]>
        }
      >
    >


  export type OrderbookHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userName?: boolean
    price?: boolean
    quantity?: boolean
    itemId?: boolean
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderbookHistory"]>

  export type OrderbookHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userName?: boolean
    price?: boolean
    quantity?: boolean
    itemId?: boolean
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderbookHistory"]>

  export type OrderbookHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userName?: boolean
    price?: boolean
    quantity?: boolean
    itemId?: boolean
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderbookHistory"]>

  export type OrderbookHistorySelectScalar = {
    id?: boolean
    userName?: boolean
    price?: boolean
    quantity?: boolean
    itemId?: boolean
  }

  export type OrderbookHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userName" | "price" | "quantity" | "itemId", ExtArgs["result"]["orderbookHistory"]>
  export type OrderbookHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type OrderbookHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type OrderbookHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $OrderbookHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderbookHistory"
    objects: {
      item: Prisma.$ItemsPayload<ExtArgs>
      user: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userName: string
      price: number
      quantity: number
      itemId: number
    }, ExtArgs["result"]["orderbookHistory"]>
    composites: {}
  }

  type OrderbookHistoryGetPayload<S extends boolean | null | undefined | OrderbookHistoryDefaultArgs> = $Result.GetResult<Prisma.$OrderbookHistoryPayload, S>

  type OrderbookHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderbookHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderbookHistoryCountAggregateInputType | true
    }

  export interface OrderbookHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderbookHistory'], meta: { name: 'OrderbookHistory' } }
    /**
     * Find zero or one OrderbookHistory that matches the filter.
     * @param {OrderbookHistoryFindUniqueArgs} args - Arguments to find a OrderbookHistory
     * @example
     * // Get one OrderbookHistory
     * const orderbookHistory = await prisma.orderbookHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderbookHistoryFindUniqueArgs>(args: SelectSubset<T, OrderbookHistoryFindUniqueArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderbookHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderbookHistoryFindUniqueOrThrowArgs} args - Arguments to find a OrderbookHistory
     * @example
     * // Get one OrderbookHistory
     * const orderbookHistory = await prisma.orderbookHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderbookHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderbookHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderbookHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryFindFirstArgs} args - Arguments to find a OrderbookHistory
     * @example
     * // Get one OrderbookHistory
     * const orderbookHistory = await prisma.orderbookHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderbookHistoryFindFirstArgs>(args?: SelectSubset<T, OrderbookHistoryFindFirstArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderbookHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryFindFirstOrThrowArgs} args - Arguments to find a OrderbookHistory
     * @example
     * // Get one OrderbookHistory
     * const orderbookHistory = await prisma.orderbookHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderbookHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderbookHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderbookHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderbookHistories
     * const orderbookHistories = await prisma.orderbookHistory.findMany()
     * 
     * // Get first 10 OrderbookHistories
     * const orderbookHistories = await prisma.orderbookHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderbookHistoryWithIdOnly = await prisma.orderbookHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderbookHistoryFindManyArgs>(args?: SelectSubset<T, OrderbookHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderbookHistory.
     * @param {OrderbookHistoryCreateArgs} args - Arguments to create a OrderbookHistory.
     * @example
     * // Create one OrderbookHistory
     * const OrderbookHistory = await prisma.orderbookHistory.create({
     *   data: {
     *     // ... data to create a OrderbookHistory
     *   }
     * })
     * 
     */
    create<T extends OrderbookHistoryCreateArgs>(args: SelectSubset<T, OrderbookHistoryCreateArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderbookHistories.
     * @param {OrderbookHistoryCreateManyArgs} args - Arguments to create many OrderbookHistories.
     * @example
     * // Create many OrderbookHistories
     * const orderbookHistory = await prisma.orderbookHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderbookHistoryCreateManyArgs>(args?: SelectSubset<T, OrderbookHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderbookHistories and returns the data saved in the database.
     * @param {OrderbookHistoryCreateManyAndReturnArgs} args - Arguments to create many OrderbookHistories.
     * @example
     * // Create many OrderbookHistories
     * const orderbookHistory = await prisma.orderbookHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderbookHistories and only return the `id`
     * const orderbookHistoryWithIdOnly = await prisma.orderbookHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderbookHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderbookHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderbookHistory.
     * @param {OrderbookHistoryDeleteArgs} args - Arguments to delete one OrderbookHistory.
     * @example
     * // Delete one OrderbookHistory
     * const OrderbookHistory = await prisma.orderbookHistory.delete({
     *   where: {
     *     // ... filter to delete one OrderbookHistory
     *   }
     * })
     * 
     */
    delete<T extends OrderbookHistoryDeleteArgs>(args: SelectSubset<T, OrderbookHistoryDeleteArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderbookHistory.
     * @param {OrderbookHistoryUpdateArgs} args - Arguments to update one OrderbookHistory.
     * @example
     * // Update one OrderbookHistory
     * const orderbookHistory = await prisma.orderbookHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderbookHistoryUpdateArgs>(args: SelectSubset<T, OrderbookHistoryUpdateArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderbookHistories.
     * @param {OrderbookHistoryDeleteManyArgs} args - Arguments to filter OrderbookHistories to delete.
     * @example
     * // Delete a few OrderbookHistories
     * const { count } = await prisma.orderbookHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderbookHistoryDeleteManyArgs>(args?: SelectSubset<T, OrderbookHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderbookHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderbookHistories
     * const orderbookHistory = await prisma.orderbookHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderbookHistoryUpdateManyArgs>(args: SelectSubset<T, OrderbookHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderbookHistories and returns the data updated in the database.
     * @param {OrderbookHistoryUpdateManyAndReturnArgs} args - Arguments to update many OrderbookHistories.
     * @example
     * // Update many OrderbookHistories
     * const orderbookHistory = await prisma.orderbookHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderbookHistories and only return the `id`
     * const orderbookHistoryWithIdOnly = await prisma.orderbookHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderbookHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderbookHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderbookHistory.
     * @param {OrderbookHistoryUpsertArgs} args - Arguments to update or create a OrderbookHistory.
     * @example
     * // Update or create a OrderbookHistory
     * const orderbookHistory = await prisma.orderbookHistory.upsert({
     *   create: {
     *     // ... data to create a OrderbookHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderbookHistory we want to update
     *   }
     * })
     */
    upsert<T extends OrderbookHistoryUpsertArgs>(args: SelectSubset<T, OrderbookHistoryUpsertArgs<ExtArgs>>): Prisma__OrderbookHistoryClient<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderbookHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryCountArgs} args - Arguments to filter OrderbookHistories to count.
     * @example
     * // Count the number of OrderbookHistories
     * const count = await prisma.orderbookHistory.count({
     *   where: {
     *     // ... the filter for the OrderbookHistories we want to count
     *   }
     * })
    **/
    count<T extends OrderbookHistoryCountArgs>(
      args?: Subset<T, OrderbookHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderbookHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderbookHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderbookHistoryAggregateArgs>(args: Subset<T, OrderbookHistoryAggregateArgs>): Prisma.PrismaPromise<GetOrderbookHistoryAggregateType<T>>

    /**
     * Group by OrderbookHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderbookHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderbookHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderbookHistoryGroupByArgs['orderBy'] }
        : { orderBy?: OrderbookHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderbookHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderbookHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderbookHistory model
   */
  readonly fields: OrderbookHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderbookHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderbookHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemsDefaultArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderbookHistory model
   */
  interface OrderbookHistoryFieldRefs {
    readonly id: FieldRef<"OrderbookHistory", 'Int'>
    readonly userName: FieldRef<"OrderbookHistory", 'String'>
    readonly price: FieldRef<"OrderbookHistory", 'Int'>
    readonly quantity: FieldRef<"OrderbookHistory", 'Int'>
    readonly itemId: FieldRef<"OrderbookHistory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OrderbookHistory findUnique
   */
  export type OrderbookHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderbookHistory to fetch.
     */
    where: OrderbookHistoryWhereUniqueInput
  }

  /**
   * OrderbookHistory findUniqueOrThrow
   */
  export type OrderbookHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderbookHistory to fetch.
     */
    where: OrderbookHistoryWhereUniqueInput
  }

  /**
   * OrderbookHistory findFirst
   */
  export type OrderbookHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderbookHistory to fetch.
     */
    where?: OrderbookHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderbookHistories to fetch.
     */
    orderBy?: OrderbookHistoryOrderByWithRelationInput | OrderbookHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderbookHistories.
     */
    cursor?: OrderbookHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderbookHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderbookHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderbookHistories.
     */
    distinct?: OrderbookHistoryScalarFieldEnum | OrderbookHistoryScalarFieldEnum[]
  }

  /**
   * OrderbookHistory findFirstOrThrow
   */
  export type OrderbookHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderbookHistory to fetch.
     */
    where?: OrderbookHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderbookHistories to fetch.
     */
    orderBy?: OrderbookHistoryOrderByWithRelationInput | OrderbookHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderbookHistories.
     */
    cursor?: OrderbookHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderbookHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderbookHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderbookHistories.
     */
    distinct?: OrderbookHistoryScalarFieldEnum | OrderbookHistoryScalarFieldEnum[]
  }

  /**
   * OrderbookHistory findMany
   */
  export type OrderbookHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderbookHistories to fetch.
     */
    where?: OrderbookHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderbookHistories to fetch.
     */
    orderBy?: OrderbookHistoryOrderByWithRelationInput | OrderbookHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderbookHistories.
     */
    cursor?: OrderbookHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderbookHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderbookHistories.
     */
    skip?: number
    distinct?: OrderbookHistoryScalarFieldEnum | OrderbookHistoryScalarFieldEnum[]
  }

  /**
   * OrderbookHistory create
   */
  export type OrderbookHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderbookHistory.
     */
    data: XOR<OrderbookHistoryCreateInput, OrderbookHistoryUncheckedCreateInput>
  }

  /**
   * OrderbookHistory createMany
   */
  export type OrderbookHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderbookHistories.
     */
    data: OrderbookHistoryCreateManyInput | OrderbookHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderbookHistory createManyAndReturn
   */
  export type OrderbookHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many OrderbookHistories.
     */
    data: OrderbookHistoryCreateManyInput | OrderbookHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderbookHistory update
   */
  export type OrderbookHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderbookHistory.
     */
    data: XOR<OrderbookHistoryUpdateInput, OrderbookHistoryUncheckedUpdateInput>
    /**
     * Choose, which OrderbookHistory to update.
     */
    where: OrderbookHistoryWhereUniqueInput
  }

  /**
   * OrderbookHistory updateMany
   */
  export type OrderbookHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderbookHistories.
     */
    data: XOR<OrderbookHistoryUpdateManyMutationInput, OrderbookHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderbookHistories to update
     */
    where?: OrderbookHistoryWhereInput
    /**
     * Limit how many OrderbookHistories to update.
     */
    limit?: number
  }

  /**
   * OrderbookHistory updateManyAndReturn
   */
  export type OrderbookHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * The data used to update OrderbookHistories.
     */
    data: XOR<OrderbookHistoryUpdateManyMutationInput, OrderbookHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderbookHistories to update
     */
    where?: OrderbookHistoryWhereInput
    /**
     * Limit how many OrderbookHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderbookHistory upsert
   */
  export type OrderbookHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderbookHistory to update in case it exists.
     */
    where: OrderbookHistoryWhereUniqueInput
    /**
     * In case the OrderbookHistory found by the `where` argument doesn't exist, create a new OrderbookHistory with this data.
     */
    create: XOR<OrderbookHistoryCreateInput, OrderbookHistoryUncheckedCreateInput>
    /**
     * In case the OrderbookHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderbookHistoryUpdateInput, OrderbookHistoryUncheckedUpdateInput>
  }

  /**
   * OrderbookHistory delete
   */
  export type OrderbookHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    /**
     * Filter which OrderbookHistory to delete.
     */
    where: OrderbookHistoryWhereUniqueInput
  }

  /**
   * OrderbookHistory deleteMany
   */
  export type OrderbookHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderbookHistories to delete
     */
    where?: OrderbookHistoryWhereInput
    /**
     * Limit how many OrderbookHistories to delete.
     */
    limit?: number
  }

  /**
   * OrderbookHistory without action
   */
  export type OrderbookHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Items
   */

  export type AggregateItems = {
    _count: ItemsCountAggregateOutputType | null
    _avg: ItemsAvgAggregateOutputType | null
    _sum: ItemsSumAggregateOutputType | null
    _min: ItemsMinAggregateOutputType | null
    _max: ItemsMaxAggregateOutputType | null
  }

  export type ItemsAvgAggregateOutputType = {
    id: number | null
  }

  export type ItemsSumAggregateOutputType = {
    id: number | null
  }

  export type ItemsMinAggregateOutputType = {
    id: number | null
    heading: string | null
    text: string | null
    imageUri: string | null
  }

  export type ItemsMaxAggregateOutputType = {
    id: number | null
    heading: string | null
    text: string | null
    imageUri: string | null
  }

  export type ItemsCountAggregateOutputType = {
    id: number
    heading: number
    text: number
    imageUri: number
    _all: number
  }


  export type ItemsAvgAggregateInputType = {
    id?: true
  }

  export type ItemsSumAggregateInputType = {
    id?: true
  }

  export type ItemsMinAggregateInputType = {
    id?: true
    heading?: true
    text?: true
    imageUri?: true
  }

  export type ItemsMaxAggregateInputType = {
    id?: true
    heading?: true
    text?: true
    imageUri?: true
  }

  export type ItemsCountAggregateInputType = {
    id?: true
    heading?: true
    text?: true
    imageUri?: true
    _all?: true
  }

  export type ItemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to aggregate.
     */
    where?: ItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemsOrderByWithRelationInput | ItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemsMaxAggregateInputType
  }

  export type GetItemsAggregateType<T extends ItemsAggregateArgs> = {
        [P in keyof T & keyof AggregateItems]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItems[P]>
      : GetScalarType<T[P], AggregateItems[P]>
  }




  export type ItemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemsWhereInput
    orderBy?: ItemsOrderByWithAggregationInput | ItemsOrderByWithAggregationInput[]
    by: ItemsScalarFieldEnum[] | ItemsScalarFieldEnum
    having?: ItemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemsCountAggregateInputType | true
    _avg?: ItemsAvgAggregateInputType
    _sum?: ItemsSumAggregateInputType
    _min?: ItemsMinAggregateInputType
    _max?: ItemsMaxAggregateInputType
  }

  export type ItemsGroupByOutputType = {
    id: number
    heading: string
    text: string | null
    imageUri: string
    _count: ItemsCountAggregateOutputType | null
    _avg: ItemsAvgAggregateOutputType | null
    _sum: ItemsSumAggregateOutputType | null
    _min: ItemsMinAggregateOutputType | null
    _max: ItemsMaxAggregateOutputType | null
  }

  type GetItemsGroupByPayload<T extends ItemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemsGroupByOutputType[P]>
            : GetScalarType<T[P], ItemsGroupByOutputType[P]>
        }
      >
    >


  export type ItemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    heading?: boolean
    text?: boolean
    imageUri?: boolean
    holdings?: boolean | Items$holdingsArgs<ExtArgs>
    orders?: boolean | Items$ordersArgs<ExtArgs>
    _count?: boolean | ItemsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["items"]>

  export type ItemsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    heading?: boolean
    text?: boolean
    imageUri?: boolean
  }, ExtArgs["result"]["items"]>

  export type ItemsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    heading?: boolean
    text?: boolean
    imageUri?: boolean
  }, ExtArgs["result"]["items"]>

  export type ItemsSelectScalar = {
    id?: boolean
    heading?: boolean
    text?: boolean
    imageUri?: boolean
  }

  export type ItemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "heading" | "text" | "imageUri", ExtArgs["result"]["items"]>
  export type ItemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | Items$holdingsArgs<ExtArgs>
    orders?: boolean | Items$ordersArgs<ExtArgs>
    _count?: boolean | ItemsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ItemsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ItemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Items"
    objects: {
      holdings: Prisma.$HoldingsPayload<ExtArgs>[]
      orders: Prisma.$OrderbookHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      heading: string
      text: string | null
      imageUri: string
    }, ExtArgs["result"]["items"]>
    composites: {}
  }

  type ItemsGetPayload<S extends boolean | null | undefined | ItemsDefaultArgs> = $Result.GetResult<Prisma.$ItemsPayload, S>

  type ItemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemsCountAggregateInputType | true
    }

  export interface ItemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Items'], meta: { name: 'Items' } }
    /**
     * Find zero or one Items that matches the filter.
     * @param {ItemsFindUniqueArgs} args - Arguments to find a Items
     * @example
     * // Get one Items
     * const items = await prisma.items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemsFindUniqueArgs>(args: SelectSubset<T, ItemsFindUniqueArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Items that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemsFindUniqueOrThrowArgs} args - Arguments to find a Items
     * @example
     * // Get one Items
     * const items = await prisma.items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemsFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsFindFirstArgs} args - Arguments to find a Items
     * @example
     * // Get one Items
     * const items = await prisma.items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemsFindFirstArgs>(args?: SelectSubset<T, ItemsFindFirstArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsFindFirstOrThrowArgs} args - Arguments to find a Items
     * @example
     * // Get one Items
     * const items = await prisma.items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemsFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.items.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.items.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemsWithIdOnly = await prisma.items.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemsFindManyArgs>(args?: SelectSubset<T, ItemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Items.
     * @param {ItemsCreateArgs} args - Arguments to create a Items.
     * @example
     * // Create one Items
     * const Items = await prisma.items.create({
     *   data: {
     *     // ... data to create a Items
     *   }
     * })
     * 
     */
    create<T extends ItemsCreateArgs>(args: SelectSubset<T, ItemsCreateArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemsCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const items = await prisma.items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemsCreateManyArgs>(args?: SelectSubset<T, ItemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemsCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const items = await prisma.items.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemsWithIdOnly = await prisma.items.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemsCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Items.
     * @param {ItemsDeleteArgs} args - Arguments to delete one Items.
     * @example
     * // Delete one Items
     * const Items = await prisma.items.delete({
     *   where: {
     *     // ... filter to delete one Items
     *   }
     * })
     * 
     */
    delete<T extends ItemsDeleteArgs>(args: SelectSubset<T, ItemsDeleteArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Items.
     * @param {ItemsUpdateArgs} args - Arguments to update one Items.
     * @example
     * // Update one Items
     * const items = await prisma.items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemsUpdateArgs>(args: SelectSubset<T, ItemsUpdateArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemsDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemsDeleteManyArgs>(args?: SelectSubset<T, ItemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const items = await prisma.items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemsUpdateManyArgs>(args: SelectSubset<T, ItemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items and returns the data updated in the database.
     * @param {ItemsUpdateManyAndReturnArgs} args - Arguments to update many Items.
     * @example
     * // Update many Items
     * const items = await prisma.items.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Items and only return the `id`
     * const itemsWithIdOnly = await prisma.items.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemsUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Items.
     * @param {ItemsUpsertArgs} args - Arguments to update or create a Items.
     * @example
     * // Update or create a Items
     * const items = await prisma.items.upsert({
     *   create: {
     *     // ... data to create a Items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Items we want to update
     *   }
     * })
     */
    upsert<T extends ItemsUpsertArgs>(args: SelectSubset<T, ItemsUpsertArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.items.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemsCountArgs>(
      args?: Subset<T, ItemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemsAggregateArgs>(args: Subset<T, ItemsAggregateArgs>): Prisma.PrismaPromise<GetItemsAggregateType<T>>

    /**
     * Group by Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemsGroupByArgs['orderBy'] }
        : { orderBy?: ItemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Items model
   */
  readonly fields: ItemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    holdings<T extends Items$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, Items$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Items$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Items$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderbookHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Items model
   */
  interface ItemsFieldRefs {
    readonly id: FieldRef<"Items", 'Int'>
    readonly heading: FieldRef<"Items", 'String'>
    readonly text: FieldRef<"Items", 'String'>
    readonly imageUri: FieldRef<"Items", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Items findUnique
   */
  export type ItemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where: ItemsWhereUniqueInput
  }

  /**
   * Items findUniqueOrThrow
   */
  export type ItemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where: ItemsWhereUniqueInput
  }

  /**
   * Items findFirst
   */
  export type ItemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemsOrderByWithRelationInput | ItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemsScalarFieldEnum | ItemsScalarFieldEnum[]
  }

  /**
   * Items findFirstOrThrow
   */
  export type ItemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemsOrderByWithRelationInput | ItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemsScalarFieldEnum | ItemsScalarFieldEnum[]
  }

  /**
   * Items findMany
   */
  export type ItemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemsOrderByWithRelationInput | ItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemsScalarFieldEnum | ItemsScalarFieldEnum[]
  }

  /**
   * Items create
   */
  export type ItemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * The data needed to create a Items.
     */
    data: XOR<ItemsCreateInput, ItemsUncheckedCreateInput>
  }

  /**
   * Items createMany
   */
  export type ItemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemsCreateManyInput | ItemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Items createManyAndReturn
   */
  export type ItemsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemsCreateManyInput | ItemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Items update
   */
  export type ItemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * The data needed to update a Items.
     */
    data: XOR<ItemsUpdateInput, ItemsUncheckedUpdateInput>
    /**
     * Choose, which Items to update.
     */
    where: ItemsWhereUniqueInput
  }

  /**
   * Items updateMany
   */
  export type ItemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemsUpdateManyMutationInput, ItemsUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemsWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Items updateManyAndReturn
   */
  export type ItemsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * The data used to update Items.
     */
    data: XOR<ItemsUpdateManyMutationInput, ItemsUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemsWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Items upsert
   */
  export type ItemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * The filter to search for the Items to update in case it exists.
     */
    where: ItemsWhereUniqueInput
    /**
     * In case the Items found by the `where` argument doesn't exist, create a new Items with this data.
     */
    create: XOR<ItemsCreateInput, ItemsUncheckedCreateInput>
    /**
     * In case the Items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemsUpdateInput, ItemsUncheckedUpdateInput>
  }

  /**
   * Items delete
   */
  export type ItemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
    /**
     * Filter which Items to delete.
     */
    where: ItemsWhereUniqueInput
  }

  /**
   * Items deleteMany
   */
  export type ItemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemsWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Items.holdings
   */
  export type Items$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    where?: HoldingsWhereInput
    orderBy?: HoldingsOrderByWithRelationInput | HoldingsOrderByWithRelationInput[]
    cursor?: HoldingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingsScalarFieldEnum | HoldingsScalarFieldEnum[]
  }

  /**
   * Items.orders
   */
  export type Items$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderbookHistory
     */
    select?: OrderbookHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderbookHistory
     */
    omit?: OrderbookHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderbookHistoryInclude<ExtArgs> | null
    where?: OrderbookHistoryWhereInput
    orderBy?: OrderbookHistoryOrderByWithRelationInput | OrderbookHistoryOrderByWithRelationInput[]
    cursor?: OrderbookHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderbookHistoryScalarFieldEnum | OrderbookHistoryScalarFieldEnum[]
  }

  /**
   * Items without action
   */
  export type ItemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Items
     */
    select?: ItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Items
     */
    omit?: ItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemsInclude<ExtArgs> | null
  }


  /**
   * Model Holdings
   */

  export type AggregateHoldings = {
    _count: HoldingsCountAggregateOutputType | null
    _avg: HoldingsAvgAggregateOutputType | null
    _sum: HoldingsSumAggregateOutputType | null
    _min: HoldingsMinAggregateOutputType | null
    _max: HoldingsMaxAggregateOutputType | null
  }

  export type HoldingsAvgAggregateOutputType = {
    itemId: number | null
    quantity: number | null
  }

  export type HoldingsSumAggregateOutputType = {
    itemId: number | null
    quantity: number | null
  }

  export type HoldingsMinAggregateOutputType = {
    userName: string | null
    itemId: number | null
    quantity: number | null
    itemSupporting: string | null
  }

  export type HoldingsMaxAggregateOutputType = {
    userName: string | null
    itemId: number | null
    quantity: number | null
    itemSupporting: string | null
  }

  export type HoldingsCountAggregateOutputType = {
    userName: number
    itemId: number
    quantity: number
    itemSupporting: number
    _all: number
  }


  export type HoldingsAvgAggregateInputType = {
    itemId?: true
    quantity?: true
  }

  export type HoldingsSumAggregateInputType = {
    itemId?: true
    quantity?: true
  }

  export type HoldingsMinAggregateInputType = {
    userName?: true
    itemId?: true
    quantity?: true
    itemSupporting?: true
  }

  export type HoldingsMaxAggregateInputType = {
    userName?: true
    itemId?: true
    quantity?: true
    itemSupporting?: true
  }

  export type HoldingsCountAggregateInputType = {
    userName?: true
    itemId?: true
    quantity?: true
    itemSupporting?: true
    _all?: true
  }

  export type HoldingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to aggregate.
     */
    where?: HoldingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingsOrderByWithRelationInput | HoldingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoldingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Holdings
    **/
    _count?: true | HoldingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoldingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoldingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoldingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoldingsMaxAggregateInputType
  }

  export type GetHoldingsAggregateType<T extends HoldingsAggregateArgs> = {
        [P in keyof T & keyof AggregateHoldings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHoldings[P]>
      : GetScalarType<T[P], AggregateHoldings[P]>
  }




  export type HoldingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingsWhereInput
    orderBy?: HoldingsOrderByWithAggregationInput | HoldingsOrderByWithAggregationInput[]
    by: HoldingsScalarFieldEnum[] | HoldingsScalarFieldEnum
    having?: HoldingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoldingsCountAggregateInputType | true
    _avg?: HoldingsAvgAggregateInputType
    _sum?: HoldingsSumAggregateInputType
    _min?: HoldingsMinAggregateInputType
    _max?: HoldingsMaxAggregateInputType
  }

  export type HoldingsGroupByOutputType = {
    userName: string
    itemId: number
    quantity: number
    itemSupporting: string
    _count: HoldingsCountAggregateOutputType | null
    _avg: HoldingsAvgAggregateOutputType | null
    _sum: HoldingsSumAggregateOutputType | null
    _min: HoldingsMinAggregateOutputType | null
    _max: HoldingsMaxAggregateOutputType | null
  }

  type GetHoldingsGroupByPayload<T extends HoldingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoldingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoldingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingsGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingsGroupByOutputType[P]>
        }
      >
    >


  export type HoldingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userName?: boolean
    itemId?: boolean
    quantity?: boolean
    itemSupporting?: boolean
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holdings"]>

  export type HoldingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userName?: boolean
    itemId?: boolean
    quantity?: boolean
    itemSupporting?: boolean
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holdings"]>

  export type HoldingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userName?: boolean
    itemId?: boolean
    quantity?: boolean
    itemSupporting?: boolean
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holdings"]>

  export type HoldingsSelectScalar = {
    userName?: boolean
    itemId?: boolean
    quantity?: boolean
    itemSupporting?: boolean
  }

  export type HoldingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userName" | "itemId" | "quantity" | "itemSupporting", ExtArgs["result"]["holdings"]>
  export type HoldingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type HoldingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type HoldingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemsDefaultArgs<ExtArgs>
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $HoldingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Holdings"
    objects: {
      item: Prisma.$ItemsPayload<ExtArgs>
      user: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userName: string
      itemId: number
      quantity: number
      itemSupporting: string
    }, ExtArgs["result"]["holdings"]>
    composites: {}
  }

  type HoldingsGetPayload<S extends boolean | null | undefined | HoldingsDefaultArgs> = $Result.GetResult<Prisma.$HoldingsPayload, S>

  type HoldingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HoldingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HoldingsCountAggregateInputType | true
    }

  export interface HoldingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Holdings'], meta: { name: 'Holdings' } }
    /**
     * Find zero or one Holdings that matches the filter.
     * @param {HoldingsFindUniqueArgs} args - Arguments to find a Holdings
     * @example
     * // Get one Holdings
     * const holdings = await prisma.holdings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingsFindUniqueArgs>(args: SelectSubset<T, HoldingsFindUniqueArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Holdings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HoldingsFindUniqueOrThrowArgs} args - Arguments to find a Holdings
     * @example
     * // Get one Holdings
     * const holdings = await prisma.holdings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingsFindUniqueOrThrowArgs>(args: SelectSubset<T, HoldingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsFindFirstArgs} args - Arguments to find a Holdings
     * @example
     * // Get one Holdings
     * const holdings = await prisma.holdings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingsFindFirstArgs>(args?: SelectSubset<T, HoldingsFindFirstArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holdings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsFindFirstOrThrowArgs} args - Arguments to find a Holdings
     * @example
     * // Get one Holdings
     * const holdings = await prisma.holdings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingsFindFirstOrThrowArgs>(args?: SelectSubset<T, HoldingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holdings.findMany()
     * 
     * // Get first 10 Holdings
     * const holdings = await prisma.holdings.findMany({ take: 10 })
     * 
     * // Only select the `userName`
     * const holdingsWithUserNameOnly = await prisma.holdings.findMany({ select: { userName: true } })
     * 
     */
    findMany<T extends HoldingsFindManyArgs>(args?: SelectSubset<T, HoldingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Holdings.
     * @param {HoldingsCreateArgs} args - Arguments to create a Holdings.
     * @example
     * // Create one Holdings
     * const Holdings = await prisma.holdings.create({
     *   data: {
     *     // ... data to create a Holdings
     *   }
     * })
     * 
     */
    create<T extends HoldingsCreateArgs>(args: SelectSubset<T, HoldingsCreateArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Holdings.
     * @param {HoldingsCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holdings = await prisma.holdings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoldingsCreateManyArgs>(args?: SelectSubset<T, HoldingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Holdings and returns the data saved in the database.
     * @param {HoldingsCreateManyAndReturnArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holdings = await prisma.holdings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Holdings and only return the `userName`
     * const holdingsWithUserNameOnly = await prisma.holdings.createManyAndReturn({
     *   select: { userName: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoldingsCreateManyAndReturnArgs>(args?: SelectSubset<T, HoldingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Holdings.
     * @param {HoldingsDeleteArgs} args - Arguments to delete one Holdings.
     * @example
     * // Delete one Holdings
     * const Holdings = await prisma.holdings.delete({
     *   where: {
     *     // ... filter to delete one Holdings
     *   }
     * })
     * 
     */
    delete<T extends HoldingsDeleteArgs>(args: SelectSubset<T, HoldingsDeleteArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Holdings.
     * @param {HoldingsUpdateArgs} args - Arguments to update one Holdings.
     * @example
     * // Update one Holdings
     * const holdings = await prisma.holdings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoldingsUpdateArgs>(args: SelectSubset<T, HoldingsUpdateArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Holdings.
     * @param {HoldingsDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holdings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoldingsDeleteManyArgs>(args?: SelectSubset<T, HoldingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holdings = await prisma.holdings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoldingsUpdateManyArgs>(args: SelectSubset<T, HoldingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings and returns the data updated in the database.
     * @param {HoldingsUpdateManyAndReturnArgs} args - Arguments to update many Holdings.
     * @example
     * // Update many Holdings
     * const holdings = await prisma.holdings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Holdings and only return the `userName`
     * const holdingsWithUserNameOnly = await prisma.holdings.updateManyAndReturn({
     *   select: { userName: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HoldingsUpdateManyAndReturnArgs>(args: SelectSubset<T, HoldingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Holdings.
     * @param {HoldingsUpsertArgs} args - Arguments to update or create a Holdings.
     * @example
     * // Update or create a Holdings
     * const holdings = await prisma.holdings.upsert({
     *   create: {
     *     // ... data to create a Holdings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holdings we want to update
     *   }
     * })
     */
    upsert<T extends HoldingsUpsertArgs>(args: SelectSubset<T, HoldingsUpsertArgs<ExtArgs>>): Prisma__HoldingsClient<$Result.GetResult<Prisma.$HoldingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holdings.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends HoldingsCountArgs>(
      args?: Subset<T, HoldingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoldingsAggregateArgs>(args: Subset<T, HoldingsAggregateArgs>): Prisma.PrismaPromise<GetHoldingsAggregateType<T>>

    /**
     * Group by Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoldingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingsGroupByArgs['orderBy'] }
        : { orderBy?: HoldingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoldingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Holdings model
   */
  readonly fields: HoldingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holdings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemsDefaultArgs<ExtArgs>>): Prisma__ItemsClient<$Result.GetResult<Prisma.$ItemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Holdings model
   */
  interface HoldingsFieldRefs {
    readonly userName: FieldRef<"Holdings", 'String'>
    readonly itemId: FieldRef<"Holdings", 'Int'>
    readonly quantity: FieldRef<"Holdings", 'Int'>
    readonly itemSupporting: FieldRef<"Holdings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Holdings findUnique
   */
  export type HoldingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where: HoldingsWhereUniqueInput
  }

  /**
   * Holdings findUniqueOrThrow
   */
  export type HoldingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where: HoldingsWhereUniqueInput
  }

  /**
   * Holdings findFirst
   */
  export type HoldingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingsOrderByWithRelationInput | HoldingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingsScalarFieldEnum | HoldingsScalarFieldEnum[]
  }

  /**
   * Holdings findFirstOrThrow
   */
  export type HoldingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingsOrderByWithRelationInput | HoldingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingsScalarFieldEnum | HoldingsScalarFieldEnum[]
  }

  /**
   * Holdings findMany
   */
  export type HoldingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingsOrderByWithRelationInput | HoldingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Holdings.
     */
    cursor?: HoldingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    distinct?: HoldingsScalarFieldEnum | HoldingsScalarFieldEnum[]
  }

  /**
   * Holdings create
   */
  export type HoldingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * The data needed to create a Holdings.
     */
    data: XOR<HoldingsCreateInput, HoldingsUncheckedCreateInput>
  }

  /**
   * Holdings createMany
   */
  export type HoldingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holdings.
     */
    data: HoldingsCreateManyInput | HoldingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holdings createManyAndReturn
   */
  export type HoldingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * The data used to create many Holdings.
     */
    data: HoldingsCreateManyInput | HoldingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holdings update
   */
  export type HoldingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * The data needed to update a Holdings.
     */
    data: XOR<HoldingsUpdateInput, HoldingsUncheckedUpdateInput>
    /**
     * Choose, which Holdings to update.
     */
    where: HoldingsWhereUniqueInput
  }

  /**
   * Holdings updateMany
   */
  export type HoldingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingsUpdateManyMutationInput, HoldingsUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingsWhereInput
    /**
     * Limit how many Holdings to update.
     */
    limit?: number
  }

  /**
   * Holdings updateManyAndReturn
   */
  export type HoldingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingsUpdateManyMutationInput, HoldingsUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingsWhereInput
    /**
     * Limit how many Holdings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holdings upsert
   */
  export type HoldingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * The filter to search for the Holdings to update in case it exists.
     */
    where: HoldingsWhereUniqueInput
    /**
     * In case the Holdings found by the `where` argument doesn't exist, create a new Holdings with this data.
     */
    create: XOR<HoldingsCreateInput, HoldingsUncheckedCreateInput>
    /**
     * In case the Holdings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingsUpdateInput, HoldingsUncheckedUpdateInput>
  }

  /**
   * Holdings delete
   */
  export type HoldingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
    /**
     * Filter which Holdings to delete.
     */
    where: HoldingsWhereUniqueInput
  }

  /**
   * Holdings deleteMany
   */
  export type HoldingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to delete
     */
    where?: HoldingsWhereInput
    /**
     * Limit how many Holdings to delete.
     */
    limit?: number
  }

  /**
   * Holdings without action
   */
  export type HoldingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holdings
     */
    select?: HoldingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holdings
     */
    omit?: HoldingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    Balance: 'Balance'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const RefreshTokensScalarFieldEnum: {
    id: 'id',
    userName: 'userName',
    token: 'token',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type RefreshTokensScalarFieldEnum = (typeof RefreshTokensScalarFieldEnum)[keyof typeof RefreshTokensScalarFieldEnum]


  export const OrderbookHistoryScalarFieldEnum: {
    id: 'id',
    userName: 'userName',
    price: 'price',
    quantity: 'quantity',
    itemId: 'itemId'
  };

  export type OrderbookHistoryScalarFieldEnum = (typeof OrderbookHistoryScalarFieldEnum)[keyof typeof OrderbookHistoryScalarFieldEnum]


  export const ItemsScalarFieldEnum: {
    id: 'id',
    heading: 'heading',
    text: 'text',
    imageUri: 'imageUri'
  };

  export type ItemsScalarFieldEnum = (typeof ItemsScalarFieldEnum)[keyof typeof ItemsScalarFieldEnum]


  export const HoldingsScalarFieldEnum: {
    userName: 'userName',
    itemId: 'itemId',
    quantity: 'quantity',
    itemSupporting: 'itemSupporting'
  };

  export type HoldingsScalarFieldEnum = (typeof HoldingsScalarFieldEnum)[keyof typeof HoldingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: IntFilter<"Users"> | number
    name?: StringFilter<"Users"> | string
    password?: StringFilter<"Users"> | string
    createdAt?: DateTimeFilter<"Users"> | Date | string
    Balance?: IntFilter<"Users"> | number
    holdings?: HoldingsListRelationFilter
    orders?: OrderbookHistoryListRelationFilter
    refreshtokens?: RefreshTokensListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    Balance?: SortOrder
    holdings?: HoldingsOrderByRelationAggregateInput
    orders?: OrderbookHistoryOrderByRelationAggregateInput
    refreshtokens?: RefreshTokensOrderByRelationAggregateInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    password?: StringFilter<"Users"> | string
    createdAt?: DateTimeFilter<"Users"> | Date | string
    Balance?: IntFilter<"Users"> | number
    holdings?: HoldingsListRelationFilter
    orders?: OrderbookHistoryListRelationFilter
    refreshtokens?: RefreshTokensListRelationFilter
  }, "id" | "name">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    Balance?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _avg?: UsersAvgOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
    _sum?: UsersSumOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Users"> | number
    name?: StringWithAggregatesFilter<"Users"> | string
    password?: StringWithAggregatesFilter<"Users"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    Balance?: IntWithAggregatesFilter<"Users"> | number
  }

  export type RefreshTokensWhereInput = {
    AND?: RefreshTokensWhereInput | RefreshTokensWhereInput[]
    OR?: RefreshTokensWhereInput[]
    NOT?: RefreshTokensWhereInput | RefreshTokensWhereInput[]
    id?: IntFilter<"RefreshTokens"> | number
    userName?: StringFilter<"RefreshTokens"> | string
    token?: StringFilter<"RefreshTokens"> | string
    userAgent?: StringNullableFilter<"RefreshTokens"> | string | null
    ipAddress?: StringNullableFilter<"RefreshTokens"> | string | null
    createdAt?: DateTimeFilter<"RefreshTokens"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshTokens"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }

  export type RefreshTokensOrderByWithRelationInput = {
    id?: SortOrder
    userName?: SortOrder
    token?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    user?: UsersOrderByWithRelationInput
  }

  export type RefreshTokensWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    token?: string
    AND?: RefreshTokensWhereInput | RefreshTokensWhereInput[]
    OR?: RefreshTokensWhereInput[]
    NOT?: RefreshTokensWhereInput | RefreshTokensWhereInput[]
    userName?: StringFilter<"RefreshTokens"> | string
    userAgent?: StringNullableFilter<"RefreshTokens"> | string | null
    ipAddress?: StringNullableFilter<"RefreshTokens"> | string | null
    createdAt?: DateTimeFilter<"RefreshTokens"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshTokens"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }, "id" | "token">

  export type RefreshTokensOrderByWithAggregationInput = {
    id?: SortOrder
    userName?: SortOrder
    token?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: RefreshTokensCountOrderByAggregateInput
    _avg?: RefreshTokensAvgOrderByAggregateInput
    _max?: RefreshTokensMaxOrderByAggregateInput
    _min?: RefreshTokensMinOrderByAggregateInput
    _sum?: RefreshTokensSumOrderByAggregateInput
  }

  export type RefreshTokensScalarWhereWithAggregatesInput = {
    AND?: RefreshTokensScalarWhereWithAggregatesInput | RefreshTokensScalarWhereWithAggregatesInput[]
    OR?: RefreshTokensScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokensScalarWhereWithAggregatesInput | RefreshTokensScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RefreshTokens"> | number
    userName?: StringWithAggregatesFilter<"RefreshTokens"> | string
    token?: StringWithAggregatesFilter<"RefreshTokens"> | string
    userAgent?: StringNullableWithAggregatesFilter<"RefreshTokens"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"RefreshTokens"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshTokens"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshTokens"> | Date | string
  }

  export type OrderbookHistoryWhereInput = {
    AND?: OrderbookHistoryWhereInput | OrderbookHistoryWhereInput[]
    OR?: OrderbookHistoryWhereInput[]
    NOT?: OrderbookHistoryWhereInput | OrderbookHistoryWhereInput[]
    id?: IntFilter<"OrderbookHistory"> | number
    userName?: StringFilter<"OrderbookHistory"> | string
    price?: IntFilter<"OrderbookHistory"> | number
    quantity?: IntFilter<"OrderbookHistory"> | number
    itemId?: IntFilter<"OrderbookHistory"> | number
    item?: XOR<ItemsScalarRelationFilter, ItemsWhereInput>
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }

  export type OrderbookHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
    item?: ItemsOrderByWithRelationInput
    user?: UsersOrderByWithRelationInput
  }

  export type OrderbookHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderbookHistoryWhereInput | OrderbookHistoryWhereInput[]
    OR?: OrderbookHistoryWhereInput[]
    NOT?: OrderbookHistoryWhereInput | OrderbookHistoryWhereInput[]
    userName?: StringFilter<"OrderbookHistory"> | string
    price?: IntFilter<"OrderbookHistory"> | number
    quantity?: IntFilter<"OrderbookHistory"> | number
    itemId?: IntFilter<"OrderbookHistory"> | number
    item?: XOR<ItemsScalarRelationFilter, ItemsWhereInput>
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }, "id">

  export type OrderbookHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
    _count?: OrderbookHistoryCountOrderByAggregateInput
    _avg?: OrderbookHistoryAvgOrderByAggregateInput
    _max?: OrderbookHistoryMaxOrderByAggregateInput
    _min?: OrderbookHistoryMinOrderByAggregateInput
    _sum?: OrderbookHistorySumOrderByAggregateInput
  }

  export type OrderbookHistoryScalarWhereWithAggregatesInput = {
    AND?: OrderbookHistoryScalarWhereWithAggregatesInput | OrderbookHistoryScalarWhereWithAggregatesInput[]
    OR?: OrderbookHistoryScalarWhereWithAggregatesInput[]
    NOT?: OrderbookHistoryScalarWhereWithAggregatesInput | OrderbookHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderbookHistory"> | number
    userName?: StringWithAggregatesFilter<"OrderbookHistory"> | string
    price?: IntWithAggregatesFilter<"OrderbookHistory"> | number
    quantity?: IntWithAggregatesFilter<"OrderbookHistory"> | number
    itemId?: IntWithAggregatesFilter<"OrderbookHistory"> | number
  }

  export type ItemsWhereInput = {
    AND?: ItemsWhereInput | ItemsWhereInput[]
    OR?: ItemsWhereInput[]
    NOT?: ItemsWhereInput | ItemsWhereInput[]
    id?: IntFilter<"Items"> | number
    heading?: StringFilter<"Items"> | string
    text?: StringNullableFilter<"Items"> | string | null
    imageUri?: StringFilter<"Items"> | string
    holdings?: HoldingsListRelationFilter
    orders?: OrderbookHistoryListRelationFilter
  }

  export type ItemsOrderByWithRelationInput = {
    id?: SortOrder
    heading?: SortOrder
    text?: SortOrderInput | SortOrder
    imageUri?: SortOrder
    holdings?: HoldingsOrderByRelationAggregateInput
    orders?: OrderbookHistoryOrderByRelationAggregateInput
  }

  export type ItemsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemsWhereInput | ItemsWhereInput[]
    OR?: ItemsWhereInput[]
    NOT?: ItemsWhereInput | ItemsWhereInput[]
    heading?: StringFilter<"Items"> | string
    text?: StringNullableFilter<"Items"> | string | null
    imageUri?: StringFilter<"Items"> | string
    holdings?: HoldingsListRelationFilter
    orders?: OrderbookHistoryListRelationFilter
  }, "id" | "id">

  export type ItemsOrderByWithAggregationInput = {
    id?: SortOrder
    heading?: SortOrder
    text?: SortOrderInput | SortOrder
    imageUri?: SortOrder
    _count?: ItemsCountOrderByAggregateInput
    _avg?: ItemsAvgOrderByAggregateInput
    _max?: ItemsMaxOrderByAggregateInput
    _min?: ItemsMinOrderByAggregateInput
    _sum?: ItemsSumOrderByAggregateInput
  }

  export type ItemsScalarWhereWithAggregatesInput = {
    AND?: ItemsScalarWhereWithAggregatesInput | ItemsScalarWhereWithAggregatesInput[]
    OR?: ItemsScalarWhereWithAggregatesInput[]
    NOT?: ItemsScalarWhereWithAggregatesInput | ItemsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Items"> | number
    heading?: StringWithAggregatesFilter<"Items"> | string
    text?: StringNullableWithAggregatesFilter<"Items"> | string | null
    imageUri?: StringWithAggregatesFilter<"Items"> | string
  }

  export type HoldingsWhereInput = {
    AND?: HoldingsWhereInput | HoldingsWhereInput[]
    OR?: HoldingsWhereInput[]
    NOT?: HoldingsWhereInput | HoldingsWhereInput[]
    userName?: StringFilter<"Holdings"> | string
    itemId?: IntFilter<"Holdings"> | number
    quantity?: IntFilter<"Holdings"> | number
    itemSupporting?: StringFilter<"Holdings"> | string
    item?: XOR<ItemsScalarRelationFilter, ItemsWhereInput>
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }

  export type HoldingsOrderByWithRelationInput = {
    userName?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    itemSupporting?: SortOrder
    item?: ItemsOrderByWithRelationInput
    user?: UsersOrderByWithRelationInput
  }

  export type HoldingsWhereUniqueInput = Prisma.AtLeast<{
    userName_itemId?: HoldingsUserNameItemIdCompoundUniqueInput
    AND?: HoldingsWhereInput | HoldingsWhereInput[]
    OR?: HoldingsWhereInput[]
    NOT?: HoldingsWhereInput | HoldingsWhereInput[]
    userName?: StringFilter<"Holdings"> | string
    itemId?: IntFilter<"Holdings"> | number
    quantity?: IntFilter<"Holdings"> | number
    itemSupporting?: StringFilter<"Holdings"> | string
    item?: XOR<ItemsScalarRelationFilter, ItemsWhereInput>
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }, "userName_itemId">

  export type HoldingsOrderByWithAggregationInput = {
    userName?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    itemSupporting?: SortOrder
    _count?: HoldingsCountOrderByAggregateInput
    _avg?: HoldingsAvgOrderByAggregateInput
    _max?: HoldingsMaxOrderByAggregateInput
    _min?: HoldingsMinOrderByAggregateInput
    _sum?: HoldingsSumOrderByAggregateInput
  }

  export type HoldingsScalarWhereWithAggregatesInput = {
    AND?: HoldingsScalarWhereWithAggregatesInput | HoldingsScalarWhereWithAggregatesInput[]
    OR?: HoldingsScalarWhereWithAggregatesInput[]
    NOT?: HoldingsScalarWhereWithAggregatesInput | HoldingsScalarWhereWithAggregatesInput[]
    userName?: StringWithAggregatesFilter<"Holdings"> | string
    itemId?: IntWithAggregatesFilter<"Holdings"> | number
    quantity?: IntWithAggregatesFilter<"Holdings"> | number
    itemSupporting?: StringWithAggregatesFilter<"Holdings"> | string
  }

  export type UsersCreateInput = {
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    holdings?: HoldingsCreateNestedManyWithoutUserInput
    orders?: OrderbookHistoryCreateNestedManyWithoutUserInput
    refreshtokens?: RefreshTokensCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateInput = {
    id?: number
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    holdings?: HoldingsUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderbookHistoryUncheckedCreateNestedManyWithoutUserInput
    refreshtokens?: RefreshTokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    holdings?: HoldingsUpdateManyWithoutUserNestedInput
    orders?: OrderbookHistoryUpdateManyWithoutUserNestedInput
    refreshtokens?: RefreshTokensUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    holdings?: HoldingsUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderbookHistoryUncheckedUpdateManyWithoutUserNestedInput
    refreshtokens?: RefreshTokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsersCreateManyInput = {
    id?: number
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
  }

  export type UsersUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
  }

  export type RefreshTokensCreateInput = {
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    user: UsersCreateNestedOneWithoutRefreshtokensInput
  }

  export type RefreshTokensUncheckedCreateInput = {
    id?: number
    userName: string
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RefreshTokensUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutRefreshtokensNestedInput
  }

  export type RefreshTokensUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokensCreateManyInput = {
    id?: number
    userName: string
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RefreshTokensUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokensUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderbookHistoryCreateInput = {
    price: number
    quantity: number
    item: ItemsCreateNestedOneWithoutOrdersInput
    user: UsersCreateNestedOneWithoutOrdersInput
  }

  export type OrderbookHistoryUncheckedCreateInput = {
    id?: number
    userName: string
    price: number
    quantity: number
    itemId: number
  }

  export type OrderbookHistoryUpdateInput = {
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    item?: ItemsUpdateOneRequiredWithoutOrdersNestedInput
    user?: UsersUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderbookHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OrderbookHistoryCreateManyInput = {
    id?: number
    userName: string
    price: number
    quantity: number
    itemId: number
  }

  export type OrderbookHistoryUpdateManyMutationInput = {
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderbookHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type ItemsCreateInput = {
    heading: string
    text?: string | null
    imageUri: string
    holdings?: HoldingsCreateNestedManyWithoutItemInput
    orders?: OrderbookHistoryCreateNestedManyWithoutItemInput
  }

  export type ItemsUncheckedCreateInput = {
    id?: number
    heading: string
    text?: string | null
    imageUri: string
    holdings?: HoldingsUncheckedCreateNestedManyWithoutItemInput
    orders?: OrderbookHistoryUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemsUpdateInput = {
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
    holdings?: HoldingsUpdateManyWithoutItemNestedInput
    orders?: OrderbookHistoryUpdateManyWithoutItemNestedInput
  }

  export type ItemsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
    holdings?: HoldingsUncheckedUpdateManyWithoutItemNestedInput
    orders?: OrderbookHistoryUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemsCreateManyInput = {
    id?: number
    heading: string
    text?: string | null
    imageUri: string
  }

  export type ItemsUpdateManyMutationInput = {
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
  }

  export type ItemsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
  }

  export type HoldingsCreateInput = {
    quantity: number
    itemSupporting: string
    item: ItemsCreateNestedOneWithoutHoldingsInput
    user: UsersCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingsUncheckedCreateInput = {
    userName: string
    itemId: number
    quantity: number
    itemSupporting: string
  }

  export type HoldingsUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
    item?: ItemsUpdateOneRequiredWithoutHoldingsNestedInput
    user?: UsersUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingsUncheckedUpdateInput = {
    userName?: StringFieldUpdateOperationsInput | string
    itemId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type HoldingsCreateManyInput = {
    userName: string
    itemId: number
    quantity: number
    itemSupporting: string
  }

  export type HoldingsUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type HoldingsUncheckedUpdateManyInput = {
    userName?: StringFieldUpdateOperationsInput | string
    itemId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type HoldingsListRelationFilter = {
    every?: HoldingsWhereInput
    some?: HoldingsWhereInput
    none?: HoldingsWhereInput
  }

  export type OrderbookHistoryListRelationFilter = {
    every?: OrderbookHistoryWhereInput
    some?: OrderbookHistoryWhereInput
    none?: OrderbookHistoryWhereInput
  }

  export type RefreshTokensListRelationFilter = {
    every?: RefreshTokensWhereInput
    some?: RefreshTokensWhereInput
    none?: RefreshTokensWhereInput
  }

  export type HoldingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderbookHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    Balance?: SortOrder
  }

  export type UsersAvgOrderByAggregateInput = {
    id?: SortOrder
    Balance?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    Balance?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    Balance?: SortOrder
  }

  export type UsersSumOrderByAggregateInput = {
    id?: SortOrder
    Balance?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UsersScalarRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokensCountOrderByAggregateInput = {
    id?: SortOrder
    userName?: SortOrder
    token?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RefreshTokensAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RefreshTokensMaxOrderByAggregateInput = {
    id?: SortOrder
    userName?: SortOrder
    token?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RefreshTokensMinOrderByAggregateInput = {
    id?: SortOrder
    userName?: SortOrder
    token?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RefreshTokensSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ItemsScalarRelationFilter = {
    is?: ItemsWhereInput
    isNot?: ItemsWhereInput
  }

  export type OrderbookHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
  }

  export type OrderbookHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
  }

  export type OrderbookHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
  }

  export type OrderbookHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
  }

  export type OrderbookHistorySumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    itemId?: SortOrder
  }

  export type ItemsCountOrderByAggregateInput = {
    id?: SortOrder
    heading?: SortOrder
    text?: SortOrder
    imageUri?: SortOrder
  }

  export type ItemsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ItemsMaxOrderByAggregateInput = {
    id?: SortOrder
    heading?: SortOrder
    text?: SortOrder
    imageUri?: SortOrder
  }

  export type ItemsMinOrderByAggregateInput = {
    id?: SortOrder
    heading?: SortOrder
    text?: SortOrder
    imageUri?: SortOrder
  }

  export type ItemsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HoldingsUserNameItemIdCompoundUniqueInput = {
    userName: string
    itemId: number
  }

  export type HoldingsCountOrderByAggregateInput = {
    userName?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    itemSupporting?: SortOrder
  }

  export type HoldingsAvgOrderByAggregateInput = {
    itemId?: SortOrder
    quantity?: SortOrder
  }

  export type HoldingsMaxOrderByAggregateInput = {
    userName?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    itemSupporting?: SortOrder
  }

  export type HoldingsMinOrderByAggregateInput = {
    userName?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    itemSupporting?: SortOrder
  }

  export type HoldingsSumOrderByAggregateInput = {
    itemId?: SortOrder
    quantity?: SortOrder
  }

  export type HoldingsCreateNestedManyWithoutUserInput = {
    create?: XOR<HoldingsCreateWithoutUserInput, HoldingsUncheckedCreateWithoutUserInput> | HoldingsCreateWithoutUserInput[] | HoldingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutUserInput | HoldingsCreateOrConnectWithoutUserInput[]
    createMany?: HoldingsCreateManyUserInputEnvelope
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
  }

  export type OrderbookHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderbookHistoryCreateWithoutUserInput, OrderbookHistoryUncheckedCreateWithoutUserInput> | OrderbookHistoryCreateWithoutUserInput[] | OrderbookHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutUserInput | OrderbookHistoryCreateOrConnectWithoutUserInput[]
    createMany?: OrderbookHistoryCreateManyUserInputEnvelope
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
  }

  export type RefreshTokensCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokensCreateWithoutUserInput, RefreshTokensUncheckedCreateWithoutUserInput> | RefreshTokensCreateWithoutUserInput[] | RefreshTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokensCreateOrConnectWithoutUserInput | RefreshTokensCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokensCreateManyUserInputEnvelope
    connect?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
  }

  export type HoldingsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HoldingsCreateWithoutUserInput, HoldingsUncheckedCreateWithoutUserInput> | HoldingsCreateWithoutUserInput[] | HoldingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutUserInput | HoldingsCreateOrConnectWithoutUserInput[]
    createMany?: HoldingsCreateManyUserInputEnvelope
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
  }

  export type OrderbookHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderbookHistoryCreateWithoutUserInput, OrderbookHistoryUncheckedCreateWithoutUserInput> | OrderbookHistoryCreateWithoutUserInput[] | OrderbookHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutUserInput | OrderbookHistoryCreateOrConnectWithoutUserInput[]
    createMany?: OrderbookHistoryCreateManyUserInputEnvelope
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
  }

  export type RefreshTokensUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokensCreateWithoutUserInput, RefreshTokensUncheckedCreateWithoutUserInput> | RefreshTokensCreateWithoutUserInput[] | RefreshTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokensCreateOrConnectWithoutUserInput | RefreshTokensCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokensCreateManyUserInputEnvelope
    connect?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type HoldingsUpdateManyWithoutUserNestedInput = {
    create?: XOR<HoldingsCreateWithoutUserInput, HoldingsUncheckedCreateWithoutUserInput> | HoldingsCreateWithoutUserInput[] | HoldingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutUserInput | HoldingsCreateOrConnectWithoutUserInput[]
    upsert?: HoldingsUpsertWithWhereUniqueWithoutUserInput | HoldingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HoldingsCreateManyUserInputEnvelope
    set?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    disconnect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    delete?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    update?: HoldingsUpdateWithWhereUniqueWithoutUserInput | HoldingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HoldingsUpdateManyWithWhereWithoutUserInput | HoldingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HoldingsScalarWhereInput | HoldingsScalarWhereInput[]
  }

  export type OrderbookHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderbookHistoryCreateWithoutUserInput, OrderbookHistoryUncheckedCreateWithoutUserInput> | OrderbookHistoryCreateWithoutUserInput[] | OrderbookHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutUserInput | OrderbookHistoryCreateOrConnectWithoutUserInput[]
    upsert?: OrderbookHistoryUpsertWithWhereUniqueWithoutUserInput | OrderbookHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderbookHistoryCreateManyUserInputEnvelope
    set?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    disconnect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    delete?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    update?: OrderbookHistoryUpdateWithWhereUniqueWithoutUserInput | OrderbookHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderbookHistoryUpdateManyWithWhereWithoutUserInput | OrderbookHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderbookHistoryScalarWhereInput | OrderbookHistoryScalarWhereInput[]
  }

  export type RefreshTokensUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokensCreateWithoutUserInput, RefreshTokensUncheckedCreateWithoutUserInput> | RefreshTokensCreateWithoutUserInput[] | RefreshTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokensCreateOrConnectWithoutUserInput | RefreshTokensCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokensUpsertWithWhereUniqueWithoutUserInput | RefreshTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokensCreateManyUserInputEnvelope
    set?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    disconnect?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    delete?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    connect?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    update?: RefreshTokensUpdateWithWhereUniqueWithoutUserInput | RefreshTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokensUpdateManyWithWhereWithoutUserInput | RefreshTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokensScalarWhereInput | RefreshTokensScalarWhereInput[]
  }

  export type HoldingsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HoldingsCreateWithoutUserInput, HoldingsUncheckedCreateWithoutUserInput> | HoldingsCreateWithoutUserInput[] | HoldingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutUserInput | HoldingsCreateOrConnectWithoutUserInput[]
    upsert?: HoldingsUpsertWithWhereUniqueWithoutUserInput | HoldingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HoldingsCreateManyUserInputEnvelope
    set?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    disconnect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    delete?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    update?: HoldingsUpdateWithWhereUniqueWithoutUserInput | HoldingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HoldingsUpdateManyWithWhereWithoutUserInput | HoldingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HoldingsScalarWhereInput | HoldingsScalarWhereInput[]
  }

  export type OrderbookHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderbookHistoryCreateWithoutUserInput, OrderbookHistoryUncheckedCreateWithoutUserInput> | OrderbookHistoryCreateWithoutUserInput[] | OrderbookHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutUserInput | OrderbookHistoryCreateOrConnectWithoutUserInput[]
    upsert?: OrderbookHistoryUpsertWithWhereUniqueWithoutUserInput | OrderbookHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderbookHistoryCreateManyUserInputEnvelope
    set?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    disconnect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    delete?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    update?: OrderbookHistoryUpdateWithWhereUniqueWithoutUserInput | OrderbookHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderbookHistoryUpdateManyWithWhereWithoutUserInput | OrderbookHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderbookHistoryScalarWhereInput | OrderbookHistoryScalarWhereInput[]
  }

  export type RefreshTokensUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokensCreateWithoutUserInput, RefreshTokensUncheckedCreateWithoutUserInput> | RefreshTokensCreateWithoutUserInput[] | RefreshTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokensCreateOrConnectWithoutUserInput | RefreshTokensCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokensUpsertWithWhereUniqueWithoutUserInput | RefreshTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokensCreateManyUserInputEnvelope
    set?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    disconnect?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    delete?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    connect?: RefreshTokensWhereUniqueInput | RefreshTokensWhereUniqueInput[]
    update?: RefreshTokensUpdateWithWhereUniqueWithoutUserInput | RefreshTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokensUpdateManyWithWhereWithoutUserInput | RefreshTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokensScalarWhereInput | RefreshTokensScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutRefreshtokensInput = {
    create?: XOR<UsersCreateWithoutRefreshtokensInput, UsersUncheckedCreateWithoutRefreshtokensInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRefreshtokensInput
    connect?: UsersWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UsersUpdateOneRequiredWithoutRefreshtokensNestedInput = {
    create?: XOR<UsersCreateWithoutRefreshtokensInput, UsersUncheckedCreateWithoutRefreshtokensInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRefreshtokensInput
    upsert?: UsersUpsertWithoutRefreshtokensInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutRefreshtokensInput, UsersUpdateWithoutRefreshtokensInput>, UsersUncheckedUpdateWithoutRefreshtokensInput>
  }

  export type ItemsCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ItemsCreateWithoutOrdersInput, ItemsUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ItemsCreateOrConnectWithoutOrdersInput
    connect?: ItemsWhereUniqueInput
  }

  export type UsersCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UsersCreateWithoutOrdersInput, UsersUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UsersCreateOrConnectWithoutOrdersInput
    connect?: UsersWhereUniqueInput
  }

  export type ItemsUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ItemsCreateWithoutOrdersInput, ItemsUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ItemsCreateOrConnectWithoutOrdersInput
    upsert?: ItemsUpsertWithoutOrdersInput
    connect?: ItemsWhereUniqueInput
    update?: XOR<XOR<ItemsUpdateToOneWithWhereWithoutOrdersInput, ItemsUpdateWithoutOrdersInput>, ItemsUncheckedUpdateWithoutOrdersInput>
  }

  export type UsersUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UsersCreateWithoutOrdersInput, UsersUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UsersCreateOrConnectWithoutOrdersInput
    upsert?: UsersUpsertWithoutOrdersInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutOrdersInput, UsersUpdateWithoutOrdersInput>, UsersUncheckedUpdateWithoutOrdersInput>
  }

  export type HoldingsCreateNestedManyWithoutItemInput = {
    create?: XOR<HoldingsCreateWithoutItemInput, HoldingsUncheckedCreateWithoutItemInput> | HoldingsCreateWithoutItemInput[] | HoldingsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutItemInput | HoldingsCreateOrConnectWithoutItemInput[]
    createMany?: HoldingsCreateManyItemInputEnvelope
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
  }

  export type OrderbookHistoryCreateNestedManyWithoutItemInput = {
    create?: XOR<OrderbookHistoryCreateWithoutItemInput, OrderbookHistoryUncheckedCreateWithoutItemInput> | OrderbookHistoryCreateWithoutItemInput[] | OrderbookHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutItemInput | OrderbookHistoryCreateOrConnectWithoutItemInput[]
    createMany?: OrderbookHistoryCreateManyItemInputEnvelope
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
  }

  export type HoldingsUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<HoldingsCreateWithoutItemInput, HoldingsUncheckedCreateWithoutItemInput> | HoldingsCreateWithoutItemInput[] | HoldingsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutItemInput | HoldingsCreateOrConnectWithoutItemInput[]
    createMany?: HoldingsCreateManyItemInputEnvelope
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
  }

  export type OrderbookHistoryUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<OrderbookHistoryCreateWithoutItemInput, OrderbookHistoryUncheckedCreateWithoutItemInput> | OrderbookHistoryCreateWithoutItemInput[] | OrderbookHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutItemInput | OrderbookHistoryCreateOrConnectWithoutItemInput[]
    createMany?: OrderbookHistoryCreateManyItemInputEnvelope
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
  }

  export type HoldingsUpdateManyWithoutItemNestedInput = {
    create?: XOR<HoldingsCreateWithoutItemInput, HoldingsUncheckedCreateWithoutItemInput> | HoldingsCreateWithoutItemInput[] | HoldingsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutItemInput | HoldingsCreateOrConnectWithoutItemInput[]
    upsert?: HoldingsUpsertWithWhereUniqueWithoutItemInput | HoldingsUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: HoldingsCreateManyItemInputEnvelope
    set?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    disconnect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    delete?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    update?: HoldingsUpdateWithWhereUniqueWithoutItemInput | HoldingsUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: HoldingsUpdateManyWithWhereWithoutItemInput | HoldingsUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: HoldingsScalarWhereInput | HoldingsScalarWhereInput[]
  }

  export type OrderbookHistoryUpdateManyWithoutItemNestedInput = {
    create?: XOR<OrderbookHistoryCreateWithoutItemInput, OrderbookHistoryUncheckedCreateWithoutItemInput> | OrderbookHistoryCreateWithoutItemInput[] | OrderbookHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutItemInput | OrderbookHistoryCreateOrConnectWithoutItemInput[]
    upsert?: OrderbookHistoryUpsertWithWhereUniqueWithoutItemInput | OrderbookHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OrderbookHistoryCreateManyItemInputEnvelope
    set?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    disconnect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    delete?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    update?: OrderbookHistoryUpdateWithWhereUniqueWithoutItemInput | OrderbookHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OrderbookHistoryUpdateManyWithWhereWithoutItemInput | OrderbookHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OrderbookHistoryScalarWhereInput | OrderbookHistoryScalarWhereInput[]
  }

  export type HoldingsUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<HoldingsCreateWithoutItemInput, HoldingsUncheckedCreateWithoutItemInput> | HoldingsCreateWithoutItemInput[] | HoldingsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: HoldingsCreateOrConnectWithoutItemInput | HoldingsCreateOrConnectWithoutItemInput[]
    upsert?: HoldingsUpsertWithWhereUniqueWithoutItemInput | HoldingsUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: HoldingsCreateManyItemInputEnvelope
    set?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    disconnect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    delete?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    connect?: HoldingsWhereUniqueInput | HoldingsWhereUniqueInput[]
    update?: HoldingsUpdateWithWhereUniqueWithoutItemInput | HoldingsUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: HoldingsUpdateManyWithWhereWithoutItemInput | HoldingsUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: HoldingsScalarWhereInput | HoldingsScalarWhereInput[]
  }

  export type OrderbookHistoryUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<OrderbookHistoryCreateWithoutItemInput, OrderbookHistoryUncheckedCreateWithoutItemInput> | OrderbookHistoryCreateWithoutItemInput[] | OrderbookHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderbookHistoryCreateOrConnectWithoutItemInput | OrderbookHistoryCreateOrConnectWithoutItemInput[]
    upsert?: OrderbookHistoryUpsertWithWhereUniqueWithoutItemInput | OrderbookHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OrderbookHistoryCreateManyItemInputEnvelope
    set?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    disconnect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    delete?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    connect?: OrderbookHistoryWhereUniqueInput | OrderbookHistoryWhereUniqueInput[]
    update?: OrderbookHistoryUpdateWithWhereUniqueWithoutItemInput | OrderbookHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OrderbookHistoryUpdateManyWithWhereWithoutItemInput | OrderbookHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OrderbookHistoryScalarWhereInput | OrderbookHistoryScalarWhereInput[]
  }

  export type ItemsCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<ItemsCreateWithoutHoldingsInput, ItemsUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: ItemsCreateOrConnectWithoutHoldingsInput
    connect?: ItemsWhereUniqueInput
  }

  export type UsersCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<UsersCreateWithoutHoldingsInput, UsersUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutHoldingsInput
    connect?: UsersWhereUniqueInput
  }

  export type ItemsUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<ItemsCreateWithoutHoldingsInput, ItemsUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: ItemsCreateOrConnectWithoutHoldingsInput
    upsert?: ItemsUpsertWithoutHoldingsInput
    connect?: ItemsWhereUniqueInput
    update?: XOR<XOR<ItemsUpdateToOneWithWhereWithoutHoldingsInput, ItemsUpdateWithoutHoldingsInput>, ItemsUncheckedUpdateWithoutHoldingsInput>
  }

  export type UsersUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<UsersCreateWithoutHoldingsInput, UsersUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutHoldingsInput
    upsert?: UsersUpsertWithoutHoldingsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutHoldingsInput, UsersUpdateWithoutHoldingsInput>, UsersUncheckedUpdateWithoutHoldingsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type HoldingsCreateWithoutUserInput = {
    quantity: number
    itemSupporting: string
    item: ItemsCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingsUncheckedCreateWithoutUserInput = {
    itemId: number
    quantity: number
    itemSupporting: string
  }

  export type HoldingsCreateOrConnectWithoutUserInput = {
    where: HoldingsWhereUniqueInput
    create: XOR<HoldingsCreateWithoutUserInput, HoldingsUncheckedCreateWithoutUserInput>
  }

  export type HoldingsCreateManyUserInputEnvelope = {
    data: HoldingsCreateManyUserInput | HoldingsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderbookHistoryCreateWithoutUserInput = {
    price: number
    quantity: number
    item: ItemsCreateNestedOneWithoutOrdersInput
  }

  export type OrderbookHistoryUncheckedCreateWithoutUserInput = {
    id?: number
    price: number
    quantity: number
    itemId: number
  }

  export type OrderbookHistoryCreateOrConnectWithoutUserInput = {
    where: OrderbookHistoryWhereUniqueInput
    create: XOR<OrderbookHistoryCreateWithoutUserInput, OrderbookHistoryUncheckedCreateWithoutUserInput>
  }

  export type OrderbookHistoryCreateManyUserInputEnvelope = {
    data: OrderbookHistoryCreateManyUserInput | OrderbookHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokensCreateWithoutUserInput = {
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RefreshTokensUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RefreshTokensCreateOrConnectWithoutUserInput = {
    where: RefreshTokensWhereUniqueInput
    create: XOR<RefreshTokensCreateWithoutUserInput, RefreshTokensUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokensCreateManyUserInputEnvelope = {
    data: RefreshTokensCreateManyUserInput | RefreshTokensCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HoldingsUpsertWithWhereUniqueWithoutUserInput = {
    where: HoldingsWhereUniqueInput
    update: XOR<HoldingsUpdateWithoutUserInput, HoldingsUncheckedUpdateWithoutUserInput>
    create: XOR<HoldingsCreateWithoutUserInput, HoldingsUncheckedCreateWithoutUserInput>
  }

  export type HoldingsUpdateWithWhereUniqueWithoutUserInput = {
    where: HoldingsWhereUniqueInput
    data: XOR<HoldingsUpdateWithoutUserInput, HoldingsUncheckedUpdateWithoutUserInput>
  }

  export type HoldingsUpdateManyWithWhereWithoutUserInput = {
    where: HoldingsScalarWhereInput
    data: XOR<HoldingsUpdateManyMutationInput, HoldingsUncheckedUpdateManyWithoutUserInput>
  }

  export type HoldingsScalarWhereInput = {
    AND?: HoldingsScalarWhereInput | HoldingsScalarWhereInput[]
    OR?: HoldingsScalarWhereInput[]
    NOT?: HoldingsScalarWhereInput | HoldingsScalarWhereInput[]
    userName?: StringFilter<"Holdings"> | string
    itemId?: IntFilter<"Holdings"> | number
    quantity?: IntFilter<"Holdings"> | number
    itemSupporting?: StringFilter<"Holdings"> | string
  }

  export type OrderbookHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderbookHistoryWhereUniqueInput
    update: XOR<OrderbookHistoryUpdateWithoutUserInput, OrderbookHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<OrderbookHistoryCreateWithoutUserInput, OrderbookHistoryUncheckedCreateWithoutUserInput>
  }

  export type OrderbookHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderbookHistoryWhereUniqueInput
    data: XOR<OrderbookHistoryUpdateWithoutUserInput, OrderbookHistoryUncheckedUpdateWithoutUserInput>
  }

  export type OrderbookHistoryUpdateManyWithWhereWithoutUserInput = {
    where: OrderbookHistoryScalarWhereInput
    data: XOR<OrderbookHistoryUpdateManyMutationInput, OrderbookHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderbookHistoryScalarWhereInput = {
    AND?: OrderbookHistoryScalarWhereInput | OrderbookHistoryScalarWhereInput[]
    OR?: OrderbookHistoryScalarWhereInput[]
    NOT?: OrderbookHistoryScalarWhereInput | OrderbookHistoryScalarWhereInput[]
    id?: IntFilter<"OrderbookHistory"> | number
    userName?: StringFilter<"OrderbookHistory"> | string
    price?: IntFilter<"OrderbookHistory"> | number
    quantity?: IntFilter<"OrderbookHistory"> | number
    itemId?: IntFilter<"OrderbookHistory"> | number
  }

  export type RefreshTokensUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokensWhereUniqueInput
    update: XOR<RefreshTokensUpdateWithoutUserInput, RefreshTokensUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokensCreateWithoutUserInput, RefreshTokensUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokensUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokensWhereUniqueInput
    data: XOR<RefreshTokensUpdateWithoutUserInput, RefreshTokensUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokensUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokensScalarWhereInput
    data: XOR<RefreshTokensUpdateManyMutationInput, RefreshTokensUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokensScalarWhereInput = {
    AND?: RefreshTokensScalarWhereInput | RefreshTokensScalarWhereInput[]
    OR?: RefreshTokensScalarWhereInput[]
    NOT?: RefreshTokensScalarWhereInput | RefreshTokensScalarWhereInput[]
    id?: IntFilter<"RefreshTokens"> | number
    userName?: StringFilter<"RefreshTokens"> | string
    token?: StringFilter<"RefreshTokens"> | string
    userAgent?: StringNullableFilter<"RefreshTokens"> | string | null
    ipAddress?: StringNullableFilter<"RefreshTokens"> | string | null
    createdAt?: DateTimeFilter<"RefreshTokens"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshTokens"> | Date | string
  }

  export type UsersCreateWithoutRefreshtokensInput = {
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    holdings?: HoldingsCreateNestedManyWithoutUserInput
    orders?: OrderbookHistoryCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutRefreshtokensInput = {
    id?: number
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    holdings?: HoldingsUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderbookHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutRefreshtokensInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutRefreshtokensInput, UsersUncheckedCreateWithoutRefreshtokensInput>
  }

  export type UsersUpsertWithoutRefreshtokensInput = {
    update: XOR<UsersUpdateWithoutRefreshtokensInput, UsersUncheckedUpdateWithoutRefreshtokensInput>
    create: XOR<UsersCreateWithoutRefreshtokensInput, UsersUncheckedCreateWithoutRefreshtokensInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutRefreshtokensInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutRefreshtokensInput, UsersUncheckedUpdateWithoutRefreshtokensInput>
  }

  export type UsersUpdateWithoutRefreshtokensInput = {
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    holdings?: HoldingsUpdateManyWithoutUserNestedInput
    orders?: OrderbookHistoryUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutRefreshtokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    holdings?: HoldingsUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderbookHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemsCreateWithoutOrdersInput = {
    heading: string
    text?: string | null
    imageUri: string
    holdings?: HoldingsCreateNestedManyWithoutItemInput
  }

  export type ItemsUncheckedCreateWithoutOrdersInput = {
    id?: number
    heading: string
    text?: string | null
    imageUri: string
    holdings?: HoldingsUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemsCreateOrConnectWithoutOrdersInput = {
    where: ItemsWhereUniqueInput
    create: XOR<ItemsCreateWithoutOrdersInput, ItemsUncheckedCreateWithoutOrdersInput>
  }

  export type UsersCreateWithoutOrdersInput = {
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    holdings?: HoldingsCreateNestedManyWithoutUserInput
    refreshtokens?: RefreshTokensCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutOrdersInput = {
    id?: number
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    holdings?: HoldingsUncheckedCreateNestedManyWithoutUserInput
    refreshtokens?: RefreshTokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutOrdersInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutOrdersInput, UsersUncheckedCreateWithoutOrdersInput>
  }

  export type ItemsUpsertWithoutOrdersInput = {
    update: XOR<ItemsUpdateWithoutOrdersInput, ItemsUncheckedUpdateWithoutOrdersInput>
    create: XOR<ItemsCreateWithoutOrdersInput, ItemsUncheckedCreateWithoutOrdersInput>
    where?: ItemsWhereInput
  }

  export type ItemsUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ItemsWhereInput
    data: XOR<ItemsUpdateWithoutOrdersInput, ItemsUncheckedUpdateWithoutOrdersInput>
  }

  export type ItemsUpdateWithoutOrdersInput = {
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
    holdings?: HoldingsUpdateManyWithoutItemNestedInput
  }

  export type ItemsUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
    holdings?: HoldingsUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UsersUpsertWithoutOrdersInput = {
    update: XOR<UsersUpdateWithoutOrdersInput, UsersUncheckedUpdateWithoutOrdersInput>
    create: XOR<UsersCreateWithoutOrdersInput, UsersUncheckedCreateWithoutOrdersInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutOrdersInput, UsersUncheckedUpdateWithoutOrdersInput>
  }

  export type UsersUpdateWithoutOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    holdings?: HoldingsUpdateManyWithoutUserNestedInput
    refreshtokens?: RefreshTokensUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    holdings?: HoldingsUncheckedUpdateManyWithoutUserNestedInput
    refreshtokens?: RefreshTokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type HoldingsCreateWithoutItemInput = {
    quantity: number
    itemSupporting: string
    user: UsersCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingsUncheckedCreateWithoutItemInput = {
    userName: string
    quantity: number
    itemSupporting: string
  }

  export type HoldingsCreateOrConnectWithoutItemInput = {
    where: HoldingsWhereUniqueInput
    create: XOR<HoldingsCreateWithoutItemInput, HoldingsUncheckedCreateWithoutItemInput>
  }

  export type HoldingsCreateManyItemInputEnvelope = {
    data: HoldingsCreateManyItemInput | HoldingsCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type OrderbookHistoryCreateWithoutItemInput = {
    price: number
    quantity: number
    user: UsersCreateNestedOneWithoutOrdersInput
  }

  export type OrderbookHistoryUncheckedCreateWithoutItemInput = {
    id?: number
    userName: string
    price: number
    quantity: number
  }

  export type OrderbookHistoryCreateOrConnectWithoutItemInput = {
    where: OrderbookHistoryWhereUniqueInput
    create: XOR<OrderbookHistoryCreateWithoutItemInput, OrderbookHistoryUncheckedCreateWithoutItemInput>
  }

  export type OrderbookHistoryCreateManyItemInputEnvelope = {
    data: OrderbookHistoryCreateManyItemInput | OrderbookHistoryCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type HoldingsUpsertWithWhereUniqueWithoutItemInput = {
    where: HoldingsWhereUniqueInput
    update: XOR<HoldingsUpdateWithoutItemInput, HoldingsUncheckedUpdateWithoutItemInput>
    create: XOR<HoldingsCreateWithoutItemInput, HoldingsUncheckedCreateWithoutItemInput>
  }

  export type HoldingsUpdateWithWhereUniqueWithoutItemInput = {
    where: HoldingsWhereUniqueInput
    data: XOR<HoldingsUpdateWithoutItemInput, HoldingsUncheckedUpdateWithoutItemInput>
  }

  export type HoldingsUpdateManyWithWhereWithoutItemInput = {
    where: HoldingsScalarWhereInput
    data: XOR<HoldingsUpdateManyMutationInput, HoldingsUncheckedUpdateManyWithoutItemInput>
  }

  export type OrderbookHistoryUpsertWithWhereUniqueWithoutItemInput = {
    where: OrderbookHistoryWhereUniqueInput
    update: XOR<OrderbookHistoryUpdateWithoutItemInput, OrderbookHistoryUncheckedUpdateWithoutItemInput>
    create: XOR<OrderbookHistoryCreateWithoutItemInput, OrderbookHistoryUncheckedCreateWithoutItemInput>
  }

  export type OrderbookHistoryUpdateWithWhereUniqueWithoutItemInput = {
    where: OrderbookHistoryWhereUniqueInput
    data: XOR<OrderbookHistoryUpdateWithoutItemInput, OrderbookHistoryUncheckedUpdateWithoutItemInput>
  }

  export type OrderbookHistoryUpdateManyWithWhereWithoutItemInput = {
    where: OrderbookHistoryScalarWhereInput
    data: XOR<OrderbookHistoryUpdateManyMutationInput, OrderbookHistoryUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemsCreateWithoutHoldingsInput = {
    heading: string
    text?: string | null
    imageUri: string
    orders?: OrderbookHistoryCreateNestedManyWithoutItemInput
  }

  export type ItemsUncheckedCreateWithoutHoldingsInput = {
    id?: number
    heading: string
    text?: string | null
    imageUri: string
    orders?: OrderbookHistoryUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemsCreateOrConnectWithoutHoldingsInput = {
    where: ItemsWhereUniqueInput
    create: XOR<ItemsCreateWithoutHoldingsInput, ItemsUncheckedCreateWithoutHoldingsInput>
  }

  export type UsersCreateWithoutHoldingsInput = {
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    orders?: OrderbookHistoryCreateNestedManyWithoutUserInput
    refreshtokens?: RefreshTokensCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutHoldingsInput = {
    id?: number
    name: string
    password: string
    createdAt?: Date | string
    Balance: number
    orders?: OrderbookHistoryUncheckedCreateNestedManyWithoutUserInput
    refreshtokens?: RefreshTokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutHoldingsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutHoldingsInput, UsersUncheckedCreateWithoutHoldingsInput>
  }

  export type ItemsUpsertWithoutHoldingsInput = {
    update: XOR<ItemsUpdateWithoutHoldingsInput, ItemsUncheckedUpdateWithoutHoldingsInput>
    create: XOR<ItemsCreateWithoutHoldingsInput, ItemsUncheckedCreateWithoutHoldingsInput>
    where?: ItemsWhereInput
  }

  export type ItemsUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: ItemsWhereInput
    data: XOR<ItemsUpdateWithoutHoldingsInput, ItemsUncheckedUpdateWithoutHoldingsInput>
  }

  export type ItemsUpdateWithoutHoldingsInput = {
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
    orders?: OrderbookHistoryUpdateManyWithoutItemNestedInput
  }

  export type ItemsUncheckedUpdateWithoutHoldingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    imageUri?: StringFieldUpdateOperationsInput | string
    orders?: OrderbookHistoryUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UsersUpsertWithoutHoldingsInput = {
    update: XOR<UsersUpdateWithoutHoldingsInput, UsersUncheckedUpdateWithoutHoldingsInput>
    create: XOR<UsersCreateWithoutHoldingsInput, UsersUncheckedCreateWithoutHoldingsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutHoldingsInput, UsersUncheckedUpdateWithoutHoldingsInput>
  }

  export type UsersUpdateWithoutHoldingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    orders?: OrderbookHistoryUpdateManyWithoutUserNestedInput
    refreshtokens?: RefreshTokensUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutHoldingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Balance?: IntFieldUpdateOperationsInput | number
    orders?: OrderbookHistoryUncheckedUpdateManyWithoutUserNestedInput
    refreshtokens?: RefreshTokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type HoldingsCreateManyUserInput = {
    itemId: number
    quantity: number
    itemSupporting: string
  }

  export type OrderbookHistoryCreateManyUserInput = {
    id?: number
    price: number
    quantity: number
    itemId: number
  }

  export type RefreshTokensCreateManyUserInput = {
    id?: number
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type HoldingsUpdateWithoutUserInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
    item?: ItemsUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingsUncheckedUpdateWithoutUserInput = {
    itemId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type HoldingsUncheckedUpdateManyWithoutUserInput = {
    itemId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type OrderbookHistoryUpdateWithoutUserInput = {
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    item?: ItemsUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderbookHistoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OrderbookHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type RefreshTokensUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokensUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokensUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingsCreateManyItemInput = {
    userName: string
    quantity: number
    itemSupporting: string
  }

  export type OrderbookHistoryCreateManyItemInput = {
    id?: number
    userName: string
    price: number
    quantity: number
  }

  export type HoldingsUpdateWithoutItemInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
    user?: UsersUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingsUncheckedUpdateWithoutItemInput = {
    userName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type HoldingsUncheckedUpdateManyWithoutItemInput = {
    userName?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    itemSupporting?: StringFieldUpdateOperationsInput | string
  }

  export type OrderbookHistoryUpdateWithoutItemInput = {
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    user?: UsersUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderbookHistoryUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderbookHistoryUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}