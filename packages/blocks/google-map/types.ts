export type MapStyle< T extends string > = {
	readonly value: T;
	readonly label: string;
	readonly image: string;
	readonly json: any;
};
