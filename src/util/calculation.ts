import { CartItem } from "../api/generated-fetch";

// Define an interface for the return type of the helper
interface CartTotals {
  totalMrp: number;
  totalSelling: number;
}

/**
 * Calculates the total MRP and selling prices from a collection of cart items.
 * Works with Sets or Arrays (or any Iterable).
 * Handles potentially undefined price/quantity by treating them as 0.
 *
 * @param cartItems - An iterable collection (like a Set or Array) of CartItem objects.
 *                    Can accept WritableDraft<CartItem> when called from Immer.
 * @returns An object containing totalMrp and totalSelling prices.
 */
export function calculateCartTotals(cartItems: CartItem[]): CartTotals {
  let calculatedMrpTotal = 0;
  let calculatedSellingTotal = 0;

  // If cartItems is null, undefined, or empty, return zero totals
  if (!cartItems) {
    return { totalMrp: 0, totalSelling: 0 };
  }

  for (const item of cartItems) {
    const priceMrp = item.product?.mrpPrice ?? 0;
    const priceSelling = item.product?.sellingPrice ?? 0;
    const qty = item.quantity ?? 0;

    calculatedMrpTotal += priceMrp * qty;
    calculatedSellingTotal += priceSelling * qty;
  }

  return { totalMrp: calculatedMrpTotal, totalSelling: calculatedSellingTotal };
}
