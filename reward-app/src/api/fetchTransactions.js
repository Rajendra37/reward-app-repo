export const fetchTransactions = async () => {
  try {
    const response = await fetch('/data/transactions.json');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};