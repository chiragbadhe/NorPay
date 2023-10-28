import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseUSDTPriceResponse {
  usdtPrice: string | null;
  loading: boolean;
  error: string | null;
}

// Custom hook to fetch USDT price in INR
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
            vs_currencies: 'inr', // Change the currency to 'inr' for Indian Rupees
          },
        });

        if (response.status === 200) {
          const price = response.data.tether.inr; // Use 'inr' to access the price in Indian Rupees
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
