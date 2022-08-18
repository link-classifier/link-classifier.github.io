import {CrawlingData, MetaData} from "../../models";

// cors extension이 있어야만 동작
export async function clientCrawling(url: string): Promise<CrawlingData | null> {
    const fetchUrl = url.endsWith("/") ? url.substring(0, url.length-1) : url;
    const response = await fetch(fetchUrl, {
        cache: "no-cache",
    });
    if (!response.ok) {
        console.log("crawling failed: ");
        return null;
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    return {
        title: parseTitle(doc, fetchUrl),
        favicon: parseFavicon(doc, fetchUrl),
        url: fetchUrl,
        metas: parseMeta(doc),
        content: parseContent(doc),
    }
}

function parseTitle(doc: Document, defaultTitle: string): string {
    const titleTag = doc.getElementsByTagName("title").item(0);
    if (titleTag !== null && titleTag.textContent !== null) {
        return titleTag.textContent;
    }
    return defaultTitle;
}

function parseMeta(doc: Document): MetaData[] {
    const metaTags = Array.from(doc.getElementsByTagName("meta"));
    return metaTags.map((tag) => ({
        name: tag.name,
        content: tag.content,
    }));
}

function parseFavicon(doc: Document, url: string): string | null {
    const linkTags = Array.from(doc.getElementsByTagName("link"));
    const favicons = linkTags.filter((tag) => tag.rel.includes("icon"))
        .map((tag) => ({
            rel: tag.rel,
            href: tag.href.startsWith(window.location.href) ? tag.href.replace(window.location.href, url+"/"): tag.href,
        }));
    if (favicons.length === 0) {
        return null;
    }

    for (let favicon of favicons) {
        if (favicon.rel === "shortcut icon") {
            return favicon.href;
        }
    }
    return favicons[0].href;
}

function parseContent(doc: Document): string[] {
    let docs = Array.from(doc.getElementsByTagName("article"));
    if (docs.length < 1) {
        return Array.from(document.body.childNodes).filter((node) => node.nodeName === "DIV")
            .map((node) => node.textContent !== null ? node.textContent.replace(/[\t\n ]/g, "") : "")
            .filter((text) => text !== "");
    }

    return docs.map((tag) => tag.textContent !== null ? tag.textContent.replace(/[\t\n ]/g, "") : "")
        .filter((text) => text !== "");
}
