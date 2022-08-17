import Box from '@mui/material/Box';
import React, {useState} from 'react';
import Classification from "../../../feature/Classification";
import UrlStore from "../../../feature/UrlStore";
import {crawlType, newCrawlService} from "../../../services/CrawlService";
import {newStorageService, storageType} from "../../../services/StorageService";
import {newClassificationService, classificationType} from "../../../services/ClassificationService";
import {ClassifiedDataList} from "../../../models";

function Main() {
    const [dataList, setDataList] = useState<ClassifiedDataList[]>([]);
    const crawlService = newCrawlService(crawlType.clientCrawling);
    const storageService = newStorageService(storageType.localStorage);
    const classificationService = newClassificationService(classificationType.simple);
    const onPutData = (url: string) => {
        crawlService(url).then((data) => {
            if (data === null) {
                return;
            }
            const classifiedData = classificationService(data);
            const newDatalist = [...dataList];
            let updated = false;
            for (let i = 0; i < newDatalist.length; i++) {
                if (newDatalist[i].category === classifiedData.category) {
                    // TODO 기존에 있는 데이터라면 업데이트되도록 수정
                    /// TODO 아예 서비스로 빼도 될듯
                    newDatalist[i].dataList.push(classifiedData)
                    updated = true;
                    break;
                }
            }
            if (!updated) {
                newDatalist.push({
                    category: classifiedData.category,
                    dataList: [classifiedData],
                })
            }
            setDataList(newDatalist);
            storageService.set("dataList", newDatalist);
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <Box sx={{
            bgcolor: 'text.disabled',
            minHeight: '100vh',
            paddingTop: "5em",
            alignItems: "center",
            justifyItems: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column"
        }}>
            <UrlStore onPutData={onPutData}/>
            <Classification classifiedDataList={dataList}/>
        </Box>
    );
}

export default Main;