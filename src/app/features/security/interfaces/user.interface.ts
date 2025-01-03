export interface ResponseUser {
    status:  boolean;
    message: string;
    data:    User;
}

export interface User {
    id:                string;
    email:             string;
    email_verified_at: null;
    created_at:        Date;
    updated_at:        Date;
    person:            Person;
}

export interface Person {
    id:             string;
    identification: string;
    names:          string;
    surnames:       string;
    image:       string;
    phone:          string;
    status:         number;
    created_at:     Date;
    updated_at:     Date;
}
