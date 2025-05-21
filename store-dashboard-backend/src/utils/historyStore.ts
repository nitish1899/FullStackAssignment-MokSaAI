type HourData = { in: number; out: number };
type StoreHistory = Record<number, HourData>;
type History = Record<string, StoreHistory>;

const history: History = {};

export const updateHistory = (
  store_id: string,
  customers_in: number,
  customers_out: number,
  timestamp: string
) => {
  const hour = new Date().getHours();

  if (!history[store_id]) history[store_id] = {};
  if (!history[store_id][hour]) history[store_id][hour] = { in: 0, out: 0 };

  history[store_id][hour].in += customers_in;
  history[store_id][hour].out += customers_out;
};

export const getHistory = (store_id: string) => {
  const storeHistory = history[store_id] || {};
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push({
      hour: i,
      customers_in: storeHistory[i]?.in || 0,
      customers_out: storeHistory[i]?.out || 0,
    });
  }
  return result;
};
