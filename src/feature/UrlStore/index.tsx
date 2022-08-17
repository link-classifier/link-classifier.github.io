import React from "react";
import UrlInput from "../../components/UrlInput";

// TODO: context로 넘겨주면 좋았을 듯
export interface UrlStoreProps {
    onPutData: (s: string) => void,
}

function UrlStore({onPutData}: UrlStoreProps) {
    // TODO: Service는 feature 외부에서 주입하도록 수정
    return (
        <>
            <UrlInput onPutData={onPutData}/>
        </>
    );
}

export default UrlStore;
