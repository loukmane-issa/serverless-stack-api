import { BillingLib } from './BillingLib';

describe('BillingLib', function () {
  describe('calculateCost', function () {
    it ('Should return the correct cost when less than 10', function () {
      const storage = 5;

      const cost = BillingLib.calculateCost(storage);

      expect(cost).toEqual(2000);
    });

    it ('Should return the correct cost when less than 100 but greater than 10', function () {
      const storage = 50;

      const cost = BillingLib.calculateCost(storage);

      expect(cost).toEqual(10000);
    });

    it ('Should return the correct cost when more than 100', function () {
      const storage = 101;

      const cost = BillingLib.calculateCost(storage);

      expect(cost).toEqual(10100);
    });
  });
});
