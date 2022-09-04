




export interface card{
    card_number:number
    cvv:number
    date:string
}

// payment
export interface Payment  {
    destinationName:string
    value?:number
    card?:number
}

