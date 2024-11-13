import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export const Loading = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background: lightgray;
    width: 50%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 32px;
    font-weight: 700;
    padding: 0 32px;
    text-align: center;
    border-radius: 32px;
    z-index: 1000;
`;

export const CardInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    overflow-y: scroll;
    height: calc(100vh - 200px);
`;

export const ShoppingCartBox = styled.div`
    display: flex;
    justify-content: center;
    align=items: center;
`;

export const ShoppingCartContainer = styled(Paper)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
`;

export const ShoppingCartIconChip = styled(Chip)`
    position: absolute;
    top: 3px;
    right: 3px;
`;

export const ShoppingCartIcon = styled.i`
    font-size: 50px;
`;

export const ItemBox = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
`;

export const ItemBorder = styled(Divider)`
    width: 100%;
    border-color: black;
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ItemName = styled.span`
    font-size: 18;
    font-weight: 500;
    max-width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const ItemDescription = styled.span`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`;

export const ItemPrice = styled.span`
   font-size: 32px;
   font-weight: 600;
   color: rgb(0,206,209);
`;