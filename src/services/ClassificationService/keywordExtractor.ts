import {ClassifiedData, CrawlingData} from "../../models";
const keyword = require("keyword-extractor-korean");
const extractor = keyword();

export function keywordExtractorClassification(rawData: CrawlingData): ClassifiedData {
    const metas = rawData.metas.filter((meta) => meta.name.includes("desc"));
    const contents = rawData.content.filter((content) => content !== "");
    let keywords: {[key: string]: number} = {};
    for (let meta of metas) {
        const extracted: {[key: string]: number} = extractor(meta.content);
        for (let extractedKey in extracted) {
            if (keywords[extractedKey] === undefined) {
                keywords[extractedKey] = 0;
            }
            keywords[extractedKey] += extracted[extractedKey];
        }
    }
    for (let content of contents) {
        const extracted: {[key: string]: number} = extractor(content);
        for (let extractedKey in extracted) {
            if (keywords[extractedKey] === undefined) {
                keywords[extractedKey] = 0;
            }
            keywords[extractedKey] += extracted[extractedKey];
        }
    }
    let items = Object.keys(keywords).map(function(key) {
        return [key, keywords[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        // @ts-ignore
        return second[1] - first[1];
    });

    if (items.length < 4) {
        return {
            title: rawData.title,
            favicon: rawData.favicon,
            category: "no category",
            keywords: ["not implemented"],
            url: rawData.url
        }
    }
    return {
        title: rawData.title,
        favicon: rawData.favicon,
        // @ts-ignore
        category: items[0][0],
        // @ts-ignore
        keywords: [items[1][0], items[2][0], items[3][0]],
        url: rawData.url
    }
}
