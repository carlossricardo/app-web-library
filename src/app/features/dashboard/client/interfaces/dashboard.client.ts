export interface ResponseDashboardClient {
    status:  boolean;
    message: string;
    data:    Data[];
}

export interface Data {
    name:  string;
    icon:  string;
    value: number;
    color:  string;
}
