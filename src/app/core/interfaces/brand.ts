export interface Metadata {
	currentPage: number;
	numberOfPages: number;
	limit: number;
	nextPage: number;
}

export interface Data {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface brandList {
	results: number;
	metadata: Metadata;
	data: Data[];
}