/*
A number system with moduli is deﬁned by a vector of k moduli, [m1,m2, ···,mk].
The moduli must be pairwise co-prime, which means that, for any pair of moduli, 
the only common factor is 1.

In such a system each number n is represented by a string "-x1--x2-- ... --xk-" of its residues, 
one for each modulus. The product m1 * ... * mk must be greater than the given 
number n which is to be converted in the moduli number system.

For example, if we use the system [2, 3, 5] the number n = 11 is represented by "-1--2--1-",
the number n = 23 by "-1--2--3-".
If we use the system [8, 7, 5, 3] the number n = 187 becomes "-3--5--2--1-".

You will be given a number n (n >= 0) and a system S = [m1,m2, ···,mk] and 
you will return a string "-x1--x2-- ...--xk-" representing the number n in the system S.

If the moduli are not pairwise co-prime or if the product m1 * ... * mk is not greater than n, 
return "Not applicable".

Examples:
  fromNb2Str(11, [2,3,5]) -> "-1--2--1-"
  fromNb2Str(6, [2, 3, 4]) -> "Not applicable", since 2 and 4 are not coprime
  fromNb2Str(7, [2, 3]) -> "Not applicable" since 2 * 3 < 7
*/


// Solution

const fromNb2Str = (function() {
  const factorsOf = n => {
    const limit = Math.floor(Math.sqrt(n));
    let factors = [n];
    
    for (let i=2; i<=limit; ++i) {
      if (n % i === 0) {
        if (i === limit) { factors.push(i); }
        else { factors.push(i, n/i); }
      }
    }
    return factors;
  }
  
  const validateRestraints = (n, sys) => {
    if (sys.reduce((prod, e) => prod*e, 1) <= n) { return false; }
  
    let encountered = new Set();
    
    return sys.every(e => {    
      const factors = factorsOf(e);
      
      if (factors.some(f => encountered.has(f))) {
        return false;
      }
      
      factors.forEach(f => encountered.add(f));
      return true;
    });    
  }
  
  return (n, sys) => {
    if (validateRestraints(n, sys)) {
      return `-${sys.map(k=>n%k).join('--')}-`;
    }
    
    return "Not applicable";
  }
})();

// or

function fromNb2Str(n, sys) {
  let gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  let prd = xs => xs.reduce((a, b) => a * b, 1);
  let lcm = xs => xs.reduce((a, b) => a * b / gcd(a, b), 1);
  if (prd(sys) <= n || lcm(sys) != prd(sys)) return "Not applicable";
  return sys.map(e => `-${n % e}-`).join``;
}