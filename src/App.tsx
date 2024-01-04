import './App.css'
import useAzureFunction from './useAzureFunction';

interface UserData {
  name: string;
  email: string;
  // ... other user fields
}

function App() {
  const { data, loading, error } = useAzureFunction<UserData>('https://<your-azure-function-url>');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{JSON.stringify(data)}</div>;
}

export default App
