import {simpleClassification} from "./simple";
import {ClassifiedData, CrawlingData} from "../../models";

export type IClassificationService = (rawData: CrawlingData) => ClassifiedData;

export enum classificationType {
    simple,
}

export function newClassificationService(type: classificationType): IClassificationService {
    switch (type) {
        case classificationType.simple:
            return simpleClassification;
        default:
            return emptyClassification;
    }
}

function emptyClassification(rawData: CrawlingData): ClassifiedData {
    console.log(rawData)
    return {
        title: rawData.title,
        favicon: rawData.favicon,
        category: "empty",
        keywords: ["empty"],
        url: rawData.url
    }
}
