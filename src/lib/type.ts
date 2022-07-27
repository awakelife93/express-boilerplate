export type NodeEnvironment = "production" | "development" | "localhost";

export type UnknownObject<T = unknown> = Record<string, T>;

export type CommonAPIResponse<T> = T | undefined;

export type CommonPromiseAPIResponse<T> = Promise<T | undefined>;
