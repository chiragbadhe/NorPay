import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseUSDTPriceResponse {
  usdtPrice: string | null;
  loading: boolean;
  error: string | null;
}

// Custom hook to fetch USDT price
function useUSDTPrice(): UseUSDTPriceResponse {
  const [usdtPrice, setUSDTPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUSDTPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'tether',
            vs_currencies: 'usd',
          },
        });

        if (response.status === 200) {
          const price = response.data.tether.usd;
          setUSDTPrice(price.toString());
        } else {
          setError('Failed to fetch USDT price.');
        }
      } catch (error) {
        setError('Error fetching USDT price: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchUSDTPrice();
  }, []);

  return { usdtPrice, loading, error };
}

export default useUSDTPrice;
