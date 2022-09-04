




export interface card{
    card_number:number
    cvv:number
    date:string
    aproved:boolean
}

// payment
export interface Payment  {
    destinationName:string
    value?:number
    card?:number
}

