/**
 * Calculates the price based on distance.
 * - Below 4 km: Fixed Rs 60
 * - 4 km and above: Rs 30 base charge + Rs 10 per km
 */
export const calculatePrice = (distance: number): number => {
    if (distance < 4) {
      return 60; 
    }
    const baseCharge = 30;
    const perKmRate = 10;
    return baseCharge + perKmRate * distance;
  };