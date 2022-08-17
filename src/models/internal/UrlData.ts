export type Category = string;

export interface CrawlingData {
    // necessary data
    title: string,
    url: string,
    favicon: string | null,
    // for classification data
    metas: MetaData[],
    content: string[],
}

export interface MetaData {
    name: string,
    content: string,
}

export interface ClassifiedData {
    title: string,
    url: string,
    category: string,
    favicon: string | null,
    keywords: string[],
}

export interface ClassifiedDataList {
    category: Category,
    dataList: ClassifiedData[],
}
