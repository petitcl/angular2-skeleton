export interface StoreService {

	get(key: string): any;

	set(key: string, data?: any): void;

	del(key: string): void;

	clear(): void;
}