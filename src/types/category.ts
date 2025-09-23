export interface Category {
    results:  number;
    metadata: Metadata;
    data:     Datum[];
}

export interface Datum {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}
