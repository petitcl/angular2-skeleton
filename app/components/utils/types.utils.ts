
//todo: find a better name for this (Dictionary ?)
export declare type DynamicObject = DynamicKeyValue<any>;

export interface DynamicKeyValue<T> {
	[key: string ]: T;
}
