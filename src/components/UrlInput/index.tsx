import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import {useState} from "react";

export interface UrlInputProps {
    onPutData: (s: string) => void,
}

export default function UrlInput({onPutData}: UrlInputProps) {
    const [url, setUrl] = useState<string>("");
    const handleItemChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUrl(event.target.value);
    }
    const handleItemInput = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        console.log(url);
        onPutData(url);
    };
    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log(url);
            onPutData(url);
            setUrl("");
        }
    };

    return (
        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700 }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Put url to classify"
                onChange={handleItemChange}
                onKeyPress={handleEnter}
                value={url}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                color="primary"
                sx={{ p: '10px' }} aria-label="directions"
                onClick={handleItemInput}
            >
                <AssignmentReturnedIcon />
            </IconButton>
        </Paper>
    );
}
