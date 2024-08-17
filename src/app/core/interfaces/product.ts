
export interface Product {
    sold: number;
    images: string[];
    subcategory: category[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: category;
    brand: brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}



export interface category{
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface brand{
    _id: string;
    name: string;
    slug: string;
    image: string;
}