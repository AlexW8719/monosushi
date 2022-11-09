export interface ICategoryRequest {
	date: Date,
	name: string,
	path: string,
	imagePath: string
}

export interface ICategoryResponse extends ICategoryRequest {
	id: number;
}