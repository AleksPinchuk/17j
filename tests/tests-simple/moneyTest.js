import { formatCurrency } from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency')

console.log('converts cents into dollars')
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else  {
  console.log('failed');
}

console.log('works with 0')
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else  {
  console.log('failed');
}

console.log('works with negative numbers')
if (formatCurrency(-900) === '-9.00') {
  console.log('passed');
} else  {
  console.log(`${formatCurrency(-900.5)}`)
  console.log('failed');
}

console.log('rounds up  to the nearest cent')
if (formatCurrency(900.5) === '9.01') {
  console.log('passed');
} else  {
  console.log('failed');
}

console.log('rounds down  to the nearest cent')
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else  {
  console.log('failed');
}