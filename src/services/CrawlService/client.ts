import {CrawlingData} from "../../models";

// cors extension이 있어야만 동작
export async function clientCrawling(url: string): Promise<CrawlingData | null> {
    const response = await fetch(url, {
        cache: "no-cache",
        headers: {},
    });
    if (!response.ok) {
        console.log("crawling failed: ");
        return null;
    }
    const text = await response.text();
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(response.text(), "text/html");
    return {
        content: [text],
        favicon: "",
        metas: [],
        url: url,
    }
}
