import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Card from './components/Card';
import { Loading } from './components/styled';

import { Item } from './types.d';
import axios from 'axios';


interface SearchProps {
  keyword: string;
  page: number;
}

function App() {
  const [searchInput, setSearchInput] = useState<SearchProps>({
    keyword: 'macbook',
    page: 1
  });
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [shoppingCart, setShoppingCart] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: KeyboardEvent) => {
    // Handling search upon Enter key press in text field
    if (e.key === 'Enter') {
      setIsLoading(true);
      const response = await axios.get(`https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=${searchInput.keyword}&page=${searchInput.page}&sortBy=best_match`, {
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY
        }
      });
      // Mapping data to required fields
      setSearchResult(response.data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items.map((i: Item) => {
        return {
          id: i.id,
          name: i.name,
          image: i.image,
          priceInfo: i.priceInfo,
          description: i.description
        };
      }).filter((i: Item) => i.id && i.image && i.name && i.description && i.priceInfo.itemPrice)); // Verifying that item has an ID
      setIsLoading(false);
    }
  };

  const handleSearchPage = async () => {
    // Handling search upon new page while scrolling
    const newPage = searchInput.page + 1;
    setSearchInput({
      ...searchInput,
      page: newPage
    })
    setIsLoading(true);
    const response = await axios.get(`https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=${searchInput.keyword}&page=${newPage}&sortBy=best_match`, {
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY
      }
    });
    // Mapping data to required fields
    const newData = response.data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items.map((i: Item) => {
      return {
        id: i.id,
        name: i.name,
        image: i.image,
        priceInfo: i.priceInfo,
        description: i.description
      };
    }).filter((i: Item) => i.id && i.image && i.name && i.description && i.priceInfo.itemPrice);// Verifying that item has an ID
    setSearchResult((prevState) => {
      return [
        ...prevState,
        ...newData
      ]
    });
    setIsLoading(false);
  };

  console.log('sr', searchResult)

  const handleSelectItem = (item: Item) => {
    setShoppingCart((prevState) => [...prevState, item]);
    setSearchResult((prevState) => prevState.filter((i) => i.id !== item.id));
  };

  const handleRestartApp = () => {
    setSearchInput({
      keyword: '',
      page: 1
    });
    setSearchResult([]);
    setShoppingCart([]);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput({
      ...searchInput,
      keyword: e.target.value,
    });
  };

  return (
    <div className="d-flex flex-column">
      {isLoading && (
        <Loading>
          <i className="fa-solid fa-clock"></i>
          Loading new items...
        </Loading>
      )}
      <Card
        result={searchResult}
        searchInput={searchInput}
        handleSelectRemoveItem={handleSelectItem}
        shoppingCart={shoppingCart}
        handleRestart={handleRestartApp}
        handleSearchInput={handleSearchInput}
        handleSearch={handleSearch}
        handleSearchPage={handleSearchPage}
      />
    </div>
  )
}

export default App
