import axios from 'axios';

export const api = {
  get: async (baseCurrency: string) => {
    try {
      const response = await axios(
        `http://data.fixer.io/api/latest?access_key=6fce35e9acf09603b78f95779bfdab46&base=${baseCurrency}&symbols=USD,EUR,AUD,CAD,PLN,MXN&format=1`
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
