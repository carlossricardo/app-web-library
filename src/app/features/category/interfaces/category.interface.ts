export interface CategoryResponse {
    status:  boolean;
    message: string;
    data:    Category[];
    total_records: number;
}

export interface Category {
    id:          string;
    code:          string;
    name:        string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
    status: number;
}


export interface ResponseCreateUpdateCategory {

    status:  boolean;
    message: string;
    data: Category;

}

export interface CategoryDto {
    
    id?:          string;
    code:          string;
    name:        string;
    description: string;
    status: number;

}
