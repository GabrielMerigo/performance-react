import { ProductItem } from "./ProductItem";
import { useMemo } from 'react';

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string
  }>
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, acc) => {
      return total += acc.price
    }, 0)
  }, [results])

  return (
    <div>
      <h1>{totalPrice}</h1>

      {results.map(product => {
        return (
          <ProductItem key={product.id} product={product} />
        )
      })}
    </div>
  );
}