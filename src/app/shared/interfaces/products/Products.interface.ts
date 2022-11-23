import { ICategoryResponse } from "../categories/Category.interface";

export interface IProductsRequest {
	category: ICategoryResponse;
	title: string;
	path: string;
	description: string;
	productSize: string;
	price: number;
	imagePath: string;
	// productLabel: string;
}

export interface IProductsResponse extends IProductsRequest {
	id: number;
}