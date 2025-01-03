export interface ResponseLoansClient {
    status:  boolean;
    message: string;
    data: LoanClient[];
}

export interface ResponseLoanClient {
    status:  boolean;
    message: string;
    data:    LoanClient;
}




export interface LoanClient {
    id:      string;
    status:  string;
    user: User;
    reviewer: Reviewer;
    details: LoanDetail[];
    total_units:   number;
    note:   string;
    date_returned: Date;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id: string;
    email: string;
    person: Person;
    
}
export interface Reviewer {
    id: string;
    email: string;
    person: Person;
    
}

export interface LoanDetail {
    id:         string;
    loan_id:    string;
    book:    Book;
    quantity:   number;
    created_at: Date;
    updated_at: Date;
}


export interface Book {
    id:          string;
    title:       string;
    autor:       string;
    description: string;
    image:       string;
    units:       number;
    status:      number;
    emission:    Date;
    created_at:  Date;
    updated_at:  Date;
}


export interface Person {
    id: string;
    identification: string;
    names: string;
    surnames: string;
    phone: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}





