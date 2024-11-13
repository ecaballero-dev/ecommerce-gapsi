import type { ChangeEvent, UIEvent, KeyboardEvent } from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Item } from '../types.d';
import { CardInnerContainer, ShoppingCartBox, ItemBox, ItemBorder, ItemContainer, ItemHeader, ItemName, ItemPrice, ItemDescription } from './styled';


interface Props {
    result: Item[];
    handleSelectRemoveItem: (item: Item) => void;
    shoppingCart: Item[];
    searchInput: {
        keyword: string;
        page: number;
    };
    handleRestart: () => void;
    handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSearch: (key: KeyboardEvent<HTMLInputElement>) => void;
    handleSearchPage: () => void;
}

export default function ItemsCard(props: Props) {
    const handleSelectItem = (item: Item) => {
        props.handleSelectRemoveItem(item);
    };

    const handleScrollList = (event: UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = (event.target as HTMLInputElement);
        if (scrollHeight - scrollTop === clientHeight) props.handleSearchPage();
        return;
    };
    return (
        <Card>
        <CardHeader
            avatar={
            <img src="/public/logo.png" height={40}></img>
            }
            action={
            <IconButton aria-label="restart" onClick={props.handleRestart}>
                <i className="fa-solid fa-arrows-rotate"></i>
            </IconButton>
            }
            title="eCommerce GAPSI"
        />
        <CardContent>
            <CardInnerContainer onScroll={handleScrollList}>
                <ShoppingCartBox>
                    <Paper elevation={3} style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 120, height: 120 }}>
                        <Chip label={props.shoppingCart?.length} style={{ position: 'absolute', top: 3, right: 3 }}/>
                        <i className="fa-solid fa-cart-shopping" style={{ fontSize: 50 }}/> Productos aqui
                    </Paper>
                </ShoppingCartBox>
                <TextField
                    id="search-input"
                    label="Search"
                    variant="standard"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleSearchInput(e)}
                    onKeyDown={props.handleSearch}
                    value={props.searchInput.keyword}
                />
                <Grid2 container spacing={2}>
                {props.result?.map((i, index) => {
                    return (
                        <Grid2 size={{ sm: 6, md: 4, lg: 3 }} style={{ cursor: 'pointer' }} onClick={() => handleSelectItem(i)} key={`item-${index}`}>
                            <ItemBox elevation={3} >
                                {i.image && (
                                    <>
                                        <img width={200} height={200} src={i.image}/>
                                        <ItemBorder/>
                                    </>
                                )}
                                <ItemContainer>
                                    <ItemHeader>
                                        <ItemName>
                                            {i?.name}
                                        </ItemName>
                                        <ItemPrice>{i?.priceInfo?.itemPrice}</ItemPrice>
                                    </ItemHeader>
                                    <ItemDescription>{i?.description}</ItemDescription>
                                </ItemContainer>
                            </ItemBox>
                        </Grid2>
                    );
                })}
                </Grid2>
            </CardInnerContainer>
        </CardContent>
        <CardActions disableSpacing style={{ justifyContent: 'end' }}>
            <Chip label="Version 0.0.1" />
        </CardActions>
        </Card>
    );
}