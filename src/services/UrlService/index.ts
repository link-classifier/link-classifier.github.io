
export type IUrlService = (url: string) => void;

export enum urlType {
    urlHref,
}

export function urlService(type: urlType): IUrlService {
    switch (type) {
        default:
            return emptyUrlService;
    }
}

function emptyUrlService(url: string): void {
    console.log(url)
}
