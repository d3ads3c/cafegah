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

export type UpdateItem = {
    ID: number
    Text: string
    DisplayOrder: number
}

export type Update = {
    ID: number
    Version: string
    Title: string
    Description?: string
    CreatedAt: string
    UpdatedAt: string
    IsActive: boolean
    Items?: UpdateItem[]
    ItemsCount?: number
}

export type UpdatesResponse = {
    Status: string
    Updates?: Update[]
    Total?: number
    Page?: number
    PerPage?: number
    TotalPages?: number
    msg?: string
}

// Blog / Blog API types
export type BlogApiPost = {
    ID: number
    Title: string
    Slug: string
    Excerpt?: string
    Content?: string
    Cover?: string
    AuthorID?: string
    DatePublished?: string
    DateUpdated?: string
    Featured?: boolean
    ReadingTime?: string
    Status?: string
    Views?: number
    Category?: string
}

export type BlogListParams = {
    status?: "draft" | "published"
    category?: string
    featured?: boolean
    author_id?: string
    search?: string
    page?: number
    per_page?: number
    order_by?: string
    order_dir?: "ASC" | "DESC"
}

export type BlogListResponse = {
    Status: string
    Blogs?: BlogApiPost[]
    Total?: number
    Page?: number
    PerPage?: number
    TotalPages?: number
    Error?: string
}

export type BlogDetailResponse = {
    Status: string
    Blog?: BlogApiPost
    Error?: string
}

export type BlogCategory = {
    ID: number
    Name: string
    Slug: string
    Description?: string
}

// Next.js route params helper types
// In Next.js App Router (React 19 / Next 15), `params` is a Promise in Server Components.
export type BlogPostParams = {
    params: Promise<{
        slug: string
    }>
}