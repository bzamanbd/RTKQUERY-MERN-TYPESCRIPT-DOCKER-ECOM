export type SearchRequestQuery = { 
    name?:string,
    price?:string,
    category?:string,
    sort?:string,
    page?:string
};

export interface BaseQuery{ 
    name?:{$regex:string, $options?:string}, 
    price?:{$lte:number},
    category?:string
}; 

 