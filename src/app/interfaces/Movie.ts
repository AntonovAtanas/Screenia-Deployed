export interface Movie {
    title: string;
    imageUrl: string;
    description: string;
    director: string;
    year: number;
    ownerId?: string;
    rating?: any;
    likes?: any;
    _id?: string;
    reviewsList?: any;
}