import Box from '@mui/material/Box';
import React, {useState} from 'react';
import Classification from "../../feature/URLClassification";
import {crawlType, newCrawlService} from "../../services/CrawlService";
import {newStorageService, storageType} from "../../services/StorageService";
import {newClassificationService, classificationType} from "../../services/ClassificationService";
import {ClassifiedDataList} from "../../models";

export default function Main() {
    const [dataList, setDataList] = useState<ClassifiedDataList[]>([]);
    const crawlService = newCrawlService(crawlType.clientCrawling);
    const storageService = newStorageService(storageType.localStorage);
    const classificationService = newClassificationService(classificationType.keywordExtractor);
    const onPutData = (url: string) => {
        crawlService(url).then((data) => {
            if (data === null) {
                return;
            }
            const classifiedData = classificationService(data);
            const newDatalist = [...dataList];
            let updated = false;
            let dataExists = false;
            for (let i = 0; i < newDatalist.length; i++) {
                if (newDatalist[i].category === classifiedData.category) {
                    /// TODO 아예 서비스로 빼도 될듯
                    for (let j = 0; j < newDatalist[i].dataList.length; j++) {
                        if (newDatalist[i].dataList[j].url === classifiedData.url) {
                            newDatalist[i].dataList[j] = classifiedData;
                            dataExists = true;
                        }
                    }
                    // 값이
                    if (!dataExists) {
                        newDatalist[i].dataList.push(classifiedData)
                        updated = true;
                    }
                    break;
                }
            }
            if (!updated && !dataExists) {
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
            minHeight: '100vh',
            paddingTop: "5em",
            alignItems: "center",
            justifyItems: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column"
        }}>
            <Classification classifiedDataList={dataList} onPutData={onPutData}/>
        </Box>
    );
}
