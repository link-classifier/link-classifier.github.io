import React from "react";
import URLList, {UrlItemProps} from "../../components/UrlList";
import {ClassifiedData, ClassifiedDataList} from "../../models";
import {urlService, urlType} from "../../services/UrlService";
import DrawerBar from "../../components/DrawerBar";
import {Box} from "@mui/material";
import UrlInput from "../../components/UrlInput";

interface ClassificationProps {
    classifiedDataList: ClassifiedDataList[]
    onPutData: (s: string) => void,
}

export default function Classification({classifiedDataList, onPutData}: ClassificationProps) {
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
    const features = [{
        title: "New Workspace", onClick: async () => {
            console.log("New Workspaces");
        }
    }];
    const workspaces = [{
        title: "Development", onClick: async () => {
            console.log("Development");
        }
    }];
    return (
        <Box>
            <DrawerBar features={features} workspaces={workspaces}>
                <UrlInput onPutData={onPutData}/>
                {classifiedDataList.map(classifiedData =>
                    <URLList key={classifiedData.category} header={classifiedData.category}
                             items={classifiedData.dataList.map(translateData)} itemOnClick={urlItemOnClick}/>)}
            </DrawerBar>
        </Box>
    );
}
