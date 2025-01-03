export interface ResponseLoan {
    status:  boolean;
    message: string;
    data:    Loan[];
    total_records: number;
}

export interface ResponsePatchLoan {
    status:  boolean;
    message: string;
    data:    Loan;
}

export interface Loan {
    id:      string;
    status:  string;
    note:  string;
    user: User;
    details: LoanDetail[];
    total_units:   number;
    date_returned: Date;
    created_at: Date;
    updated_at: Date;
}

export interface User {
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


export interface LoanDto {
    id?:      string;
    status:  string;
    // user: User;
    // details: LoanDetail[];
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
