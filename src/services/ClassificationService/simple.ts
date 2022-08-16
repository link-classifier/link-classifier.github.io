import {ClassifiedData, CrawlingData} from "../../models";

export function simpleClassification(rawData: CrawlingData): ClassifiedData {
    console.log("not implemented", rawData);
    return {
        favicon: rawData.favicon,
        host: "not implemented",
        keywords: ["not implemented"],
        url: rawData.url
    }
}