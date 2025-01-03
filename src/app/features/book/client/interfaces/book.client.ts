export interface ResponseBookClient {
    status:  boolean;
    message: string;
    data:    BookClient[];
    total_records: number;
}

export interface BookClient {
    id:          string;
    title:       string;
    description: string;
    image: string;
    categories:  string[];
    autor: string;
    status: number;    
    emission: Date;
    units: number;
}

