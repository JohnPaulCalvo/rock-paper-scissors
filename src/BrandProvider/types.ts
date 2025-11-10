export type BrandId = 'INPLAY' | 'OPEXA_DARK' | 'OPEXA_LIGHT';

export interface BrandLogo {
	src: string;
	width: number;
	height: number;
}

export interface Brand {
	id: BrandId;
	logo: BrandLogo;
	name: string;
}
