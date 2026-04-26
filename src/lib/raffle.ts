/**
 * Logic for random number generation in a raffle
 */

export function generateRandomNumbers(availableNumbers: number[], count: number): number[] {
  if (count > availableNumbers.length) {
    throw new Error("Not enough numbers available");
  }

  const selected: number[] = [];
  const pool = [...availableNumbers];

  const cryptoArray = new Uint32Array(count);
  crypto.getRandomValues(cryptoArray);

  for (let i = 0; i < count; i++) {
    const randomIndex = cryptoArray[i] % pool.length;
    selected.push(pool[randomIndex]);
    // Remove selected number from pool to avoid duplicates in the same purchase
    pool.splice(randomIndex, 1);
  }

  return selected.sort((a, b) => a - b);
}

/**
 * Example of how to use this in a transaction:
 * 1. Fetch all 'sold_numbers' for a product from the DB.
 * 2. Calculate 'availableNumbers' by excluding 'sold_numbers' from [0...max_numbers].
 * 3. Use generateRandomNumbers to pick 'count' numbers.
 * 4. Insert into 'purchases' table.
 */
