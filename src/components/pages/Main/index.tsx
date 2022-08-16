import Box from '@mui/material/Box';
import React from 'react';
import Classification from "../../../feature/Classification";
import UrlStore from "../../../feature/UrlStore";

function Main() {
    return (
        <Box sx={{ bgcolor: 'text.disabled', minHeight: '100vh', paddingTop: "5em", alignItems: "center", justifyItems: "center", textAlign: "center", display: "flex", flexDirection: "column" }}>
            <UrlStore/>
            <Classification classifiedDataList={[{
                category: "portal",
                dataList: [{
                    url: "https://naver.com",
                    host: "https://naver.com",
                    favicon: "https://www.naver.com/favicon.ico",
                    keywords: ["search engine", "portal"],
                }]
            }]}/>
        </Box>
    );
}

export default Main;