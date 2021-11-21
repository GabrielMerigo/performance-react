import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from "./components/SearchResult";

interface Product {
  id: number;
  price: number;
  title: string
}

interface ResultsProps {
  data: Product[];
  totalPrice: number;
}

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ResultsProps>({
    data: [{
      id: 0,
      price: 0,
      title: ''
    }],
    totalPrice: 0
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const product = data.map((product: Product) => {
      const priceFormatted = product.price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

      return {
        id: product.id,
        title: product.title,
        price: priceFormatted
      }
    })

    const totalPrice = data.reduce((total: number, acc: any) => {
      return total += acc.price
    }, 0);

    setResults({ data: product, totalPrice })
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>SEARCH</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        totalPrice={results.totalPrice}
        results={results.data}
        onAddToWishList={addToWishList}
      />
    </div>
  );
}

export default App;
