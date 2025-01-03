

export interface Option {
    id:        string;
    name:      string;
    url:       string;
    icon:       string;
    parent_id: null | string;
    status:    number;
    children?: Option[];
}
