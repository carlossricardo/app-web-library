

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: boolean;
    message: string;
    token: string;
}



export interface UserDto {


    email: string;
    password: string;    
    identification: string;
    names: string;
    surnames: string;
    phone: string;
    image: string;
    profiles: string[];

}



export interface ResponseUser {
    status:  boolean;
    message: string;
    data:    User;
}

export interface User {
    id:                string;
    email:             string;
    email_verified_at: null;
    isAdmin: boolean;
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