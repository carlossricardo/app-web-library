export interface ResponseBook {
    status:  boolean;
    message: string;
    data:    Book[];
    total_records: number;
}

export interface Book {
    id:          string;
    title:       string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
    image: string;
    autor: string;
    status: number;
    // status: boolean;
    emission: Date;
    units: number;
    categories:  string[];
}


export interface ResponseCreateUpdateBook {

    status:  boolean;
    message: string;
    data: Book;

}



export interface BookDto {
    
    id?:          string;
    title:       string;
    description: string;
    image: string;
    autor: string;
    status: number;
    // status: boolean;
    emission: Date;
    units: number;
    categories:  string[];

}

