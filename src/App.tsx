import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import Card from './components/Card';
import { Loading } from './components/styled';
import { mapData } from './utils/mapData';

import { Item } from './types.d';
import axios from 'axios';

interface SearchProps {
  keyword: string;
  page: number;
}

function App() {
  const [searchInput, setSearchInput] = useState<SearchProps>({
    keyword: '',
    page: 1
  });
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [shoppingCart, setShoppingCart] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    // Handling search upon Enter key press in text field
    if (e.key === 'Enter') {
      setIsLoading(true);
      const response = await axios.get(`https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=${searchInput.keyword}&page=${searchInput.page}&sortBy=best_match`, {
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY
        }
      });
      // Mapping data to required fields
      setSearchResult(mapData(response.data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items)); // Verifying that item has needed data
      setIsLoading(false);
    }
  };

  const handleSearchPage = async () => {
    // Handling search upon new page while scrolling, adding a new page
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
    const newData = mapData(response.data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items); // Verifying that item has needed data
    setSearchResult((prevState) => {
      // Making sure new data stays on bottom so user can keep scrolling down
      return [
        ...prevState,
        ...newData
      ]
    });
    setIsLoading(false);
  };

  const handleSelectItem = (item: Item) => {
    // When an item is selected, we add it to the shopping cart and remove it from the search list
    setShoppingCart((prevState) => [...prevState, item]);
    setSearchResult((prevState) => prevState.filter((i) => i.id !== item.id));
  };

  const handleRestartApp = () => {
    // When user restarts app with button on top corner, it sets everything to initial state
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
      {/**
       * Control Props
      */}
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
