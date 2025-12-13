export type UserInfo = {
    Fname: string
    Lname: string
    Email?: string
    Phone: string
    Status: string
    Meli?: string
}

export type MySubscriptions = {
    ID: string
    Plan: string
    Status: string
    BuyDate: string
    CafeName: string
    Phone: string
    Email: string
    Users: string
    Serial: string
    Days?: string
    Owner: string
    City: string
    State: string
    PostalCode: string
    Address: string
    Invoice: string
    Type: string
}

export type MyInvoicesType = {
    ID: string
    Price: string
    Status: string
    Method: string
    Date: string
    BuyDate: string
    Meli: string
}

export type InvoiceDetail = {
    Invoice: MyInvoicesType
    Sub: MySubscriptions
}