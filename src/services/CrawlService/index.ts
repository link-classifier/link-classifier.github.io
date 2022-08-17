import {CrawlingData} from "../../models";
import {clientCrawling} from "./client";

export type ICrawlingService = (url: string) => Promise<CrawlingData | null>;

export enum crawlType {
    clientCrawling,
}

export function newCrawlService(type: crawlType): ICrawlingService {
    switch (type) {
        case crawlType.clientCrawling:
            return clientCrawling;
        default:
            return emptyCrawling;
    }
}

async function emptyCrawling(url: string): Promise<CrawlingData | null> {
    console.log(url)
    return {
        title: "empty",
        content: ["empty"],
        favicon: "empty",
        metas: [],
        url: url,
    }
}
