import { useState, useEffect } from 'react';

// Define the types for your hook's return value
interface AzureFunctionResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Use a generic type T for the data you expect from the Azure Function
function useAzureFunction<T>(url: string): AzureFunctionResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch data from Azure Function
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json() as T;
        setData(result);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useAzureFunction;