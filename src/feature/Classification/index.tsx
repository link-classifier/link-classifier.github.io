import React from "react";
import URLList, {UrlItemProps} from "../../components/UrlList";
import {ClassifiedData, ClassifiedDataList} from "../../models";
import {urlService, urlType} from "../../services/UrlService";

interface ClassificationProps {
    classifiedDataList: ClassifiedDataList[]
}

function Classification({classifiedDataList}: ClassificationProps) {
    // TODO: Service는 feature 외부에서 주입하도록 수정
    const urlItemOnClick = urlService(urlType.urlHref);
    const translateData = (data: ClassifiedData): UrlItemProps => {
        return {
            title: data.title,
            alt: data.title,
            favicon: data.favicon,
            keywords: data.keywords,
            url: data.url
        }
    }
    return (
        <>
            {classifiedDataList.map(classifiedData =>
            <URLList key={classifiedData.category} header={classifiedData.category} items={classifiedData.dataList.map(translateData)} itemOnClick={urlItemOnClick}/>)}
        </>
    );
}

export default Classification;
