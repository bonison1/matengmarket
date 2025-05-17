/**
 * Calculates the price based on distance.
 * - Below 4 km: Fixed Rs 60
 * - 4 km to below 10 km: Rs 30 base + Rs 10 per km
 * - 10 km to below 13 km: Rs 120 fixed
 * - 13 km to below 20 km: Rs 140 fixed
 * - 20 km to below 26 km: Rs 180 fixed
 * - 26 km to below 30 km: Rs 230 fixed
 * - 30 km to below 33 km: Rs 250 fixed
 * - 33 km to below 36 km: Rs 280 fixed
 * - 36 km and above: Rs 330 fixed
 */
export const calculatePrice = (distance: number): number => {
  if (distance < 4) {
    return 60;
  } else if (distance < 7) {
    const baseCharge = 17;
    const perKmRate = 8.5;
    return baseCharge + perKmRate * distance;
  } else if (distance < 12) {
    return 130;
  } else if (distance < 20) {
    return 150;
  } else if (distance < 26) {
    return 180;
  } else if (distance < 30) {
    return 230;
  } else if (distance < 33) {
    return 250;
  } else if (distance < 36) {
    return 280;
  } else {
    return 330;
  }
};
