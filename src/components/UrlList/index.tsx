import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {ListItemIcon} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import LinkIcon from '@mui/icons-material/Link';
import LanguageIcon from '@mui/icons-material/Language';

export interface UrlItemProps {
    title: string,
    favicon: string | null,
    alt: string,
    url: string,
    keywords: string[],
}

export interface ListProps {
    header: string,
    items: UrlItemProps[],
    itemOnClick: (url: string) => void,
}

export default function URLList({header, items, itemOnClick}: ListProps) {
    const [open, setOpen] = React.useState(false);

    const handleListHeaderClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        setOpen(!open);
    };

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        src: string,
    ) => {
        console.log(src);
        itemOnClick(src);
    };

    return (
        <List dense sx={{
            width: 700,
            boxShadow: 3,
            borderRadius: 2,
            maxWidth: 700,
            margin: "1em",
            bgcolor: 'background.paper'
        }}>
            <ListItemButton onClick={handleListHeaderClick}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={header}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            {items.map((item, i) => {
                const labelId = `url-list-label-${item.url}-${i}`;
                return (
                    <div key={item.url}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem
                                    key={labelId}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={(event) => handleListItemClick(event, item.url)}
                                    >
                                        <ListItemAvatar>
                                            {item.favicon !== null ?
                                                <Avatar
                                                    alt={item.alt}
                                                    src={item.favicon}
                                                /> :
                                                <LanguageIcon/>
                                            }
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={item.title}/>
                                        {item.keywords.map((keyword) =>
                                            <Chip sx={{
                                                boxShadow: 1,
                                                borderRadius: 2,
                                                margin: ".3em",
                                            }} key={keyword} label={keyword} color="primary" variant="outlined"/>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                );
            })}
        </List>
    );
}