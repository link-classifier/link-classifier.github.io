import {ClassifiedData, CrawlingData} from "../../models";

export function simpleClassification(rawData: CrawlingData): ClassifiedData {
    const metas = rawData.metas.filter((meta) => meta.name.includes("desc"));
    const contents = rawData.content.filter((content) => content !== "");
    let bags: { [key: string]: number } = {}
    for (const meta of metas) {
        const metaStr = meta.content.split(/[ \n,.]/);
        for (let string of metaStr) {
            const word = string.trim();
            if (word.length === 0) {
                continue;
            }
            if (bags[word] === undefined) {
                bags[word] = 0;
            }
            bags[word] += 1;
        }
    }

    for (const content of contents) {
        const strings = content.split(/[ \n,.]/);
        for (let string of strings) {
            const word = string.trim();
            if (word.length === 0) {
                continue;
            }
            if (bags[word] === undefined) {
                bags[word] = 0;
            }
            bags[word] += 1;
        }
    }

    let items = Object.keys(bags).map(function(key) {
        return [key, bags[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        // @ts-ignore
        return second[1] - first[1];
    });

    console.log(items.slice(0, 5));
    if (items.length < 1) {
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
