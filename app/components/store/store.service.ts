export abstract class StoreService {

	abstract get(key: string): any;

	abstract set(key: string, data?: any): void;

	abstract del(key: string): void;

	abstract clear(): void;
}