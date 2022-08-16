import React from "react";
import UrlInput from "../../components/UrlInput";
import {crawlService, crawlType} from "../../services/CrawlService";

function UrlStore() {
    // TODO: Service는 feature 외부에서 주입하도록 수정
    const onPutData = (url: string) => {
        const service = crawlService(crawlType.clientCrawling);
        service(url).then((data) => {
                if (data === null) {
                    return;
                }
                console.log("URL Store: ", data);
            }).catch((err) => {
                console.log(err)
            });
    }
    return (
        <>
            <UrlInput onPutData={onPutData}/>
        </>
    );
}

export default UrlStore;
