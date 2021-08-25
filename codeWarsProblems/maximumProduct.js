function maxProduct(n, start) {
  const half = n / 2;
  if (n < 5 || start >= half) return n;
  let maxProd = n;
  for (let i = start; i < half; i++) {
    const newProd = i * maxProduct(n - i, i + 1);
    maxProd = (newProd > maxProd) ? newProd : maxProd;
  }
  return maxProd;
}

function maximumProduct(n) {
  return maxProduct(n, 2);
}

for (let i = 5; i < 25; i++) {
  console.log(i, maximumProduct(i));
}
