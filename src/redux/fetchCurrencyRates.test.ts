import { api } from '../api';
import * as actions from './actions';

jest.mock('../api');
const apiMock = api as jest.Mocked<typeof api>;

const result = {
  success: true,
  timestamp: 1594198026,
  base: 'EUR',
  date: '2020-07-08',
  rates: {
    USD: 1.12884,
    AUD: 1.625096,
    CAD: 1.534935,
    PLN: 4.472182,
    MXN: 25.645657,
  },
};

const reultOnError = {
  success: false,
};

const dispatchMock = jest.fn();

describe('fetchCurrencyRates', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  test('with success', async () => {
    apiMock.get.mockReturnValue(Promise.resolve(result));

    await actions.fetchCurrencyRates('total EUR')(dispatchMock);

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.showLoader());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.showError(''));
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      actions.updateCurrencyRates(result)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.hideLoader());
  });

  test('with error', async () => {
    apiMock.get.mockReturnValue(Promise.resolve(reultOnError));

    await actions.fetchCurrencyRates('total EUR')(dispatchMock);

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.showLoader());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.showError(''));
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      actions.showError("Cannot read property 'type' of undefined")
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.hideLoader());
  });
});
