export interface ResponseCartItemsClient {
  status:  boolean;
  message: string;
  data:    CartItems[];
}

export interface CartItems {
  id:       string;
  quantity: number;
  book:     Book;
}

export interface Book {
  id:          string;
  title:       string;
  description: string;
  autor: string;
  image:       string;
  units:       number;
  categories:       string[];
  emission:    Date;
}


export interface ResponseCartItemClient {
  status:  boolean;
  message: string;
  data: CartItemBook;

}

export interface CartItemBook {
  id:       string;    
  book_id:  string;
  quantity: number;
}

export interface LoanCartItemsDto {
  date_returned: Date;
  total_units: number;
  note: string;
}



