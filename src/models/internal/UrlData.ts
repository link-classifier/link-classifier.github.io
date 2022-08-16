export type Category = string;

export interface CrawlingData {
    // necessary data
    url: string,
    favicon: string,
    // for classification data
    metas: string[],
    content: string[],
}

export interface ClassifiedData {
    url: string,
    host: string,
    favicon: string,
    keywords: string[],
}

export interface ClassifiedDataList {
    category: Category,
    dataList: ClassifiedData[],
}
