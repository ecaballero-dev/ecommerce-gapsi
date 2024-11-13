import { Item } from '../types.d'
export const mapData = (data: []) => {
    return data.map((i: Item) => {
        return {
          id: i.id,
          name: i.name,
          image: i.image,
          priceInfo: i.priceInfo,
          description: i.description
        };
    }).filter((i: Item) => i.id && i.image && i.name && i.description && i.priceInfo.itemPrice); 
};