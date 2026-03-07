// Utility Theory Security Selection Model
// Compares securities under CRRA (Power) and CARA (Exponential) utility

type Scenario = { outcome: number; probability: number };
type Security = { name: string; scenarios: Scenario[] };

// CRRA — Power utility: U(W) = W^(1-γ) / (1-γ)
// Risk aversion constant relative to wealth
function powerUtility(W: number, gamma: number): number {
  if (gamma === 1) return Math.log(W); // Log utility (γ → 1 limit)
  return Math.pow(W, 1 - gamma) / (1 - gamma);
}

// CARA — Exponential utility: U(W) = -e^(-αW)
// Risk aversion constant in absolute terms, independent of wealth
function exponentialUtility(W: number, alpha: number): number {
  return -Math.exp(-alpha * W);
}

// E[U(W)] = Σ pᵢ · U(Wᵢ)
function expectedUtility(
  security: Security,
  utilFn: (w: number) => number
): number {
  return security.scenarios.reduce(
    (sum, s) => sum + s.probability * utilFn(s.outcome), 0
  );
}

// Long-term growth rate: g = E[ln(W)]  (Kelly criterion)
function growthRate(security: Security): number {
  return security.scenarios.reduce(
    (sum, s) => sum + s.probability * Math.log(s.outcome), 0
  );
}

// Three-criteria selection table
function selectionTable(
  securities: Security[],
  gamma: number,   // CRRA risk aversion parameter
  alpha: number    // CARA risk aversion parameter
) {
  return securities.map(sec => ({
    security: sec.name,
    powerEU:       expectedUtility(sec, w => powerUtility(w, gamma)),
    exponentialEU: expectedUtility(sec, w => exponentialUtility(w, alpha)),
    growthRate:    growthRate(sec),
  }));
}

// Optimal selection per criterion
function optimal(
  table: ReturnType<typeof selectionTable>,
  criterion: 'powerEU' | 'exponentialEU' | 'growthRate'
): string {
  return table.reduce((best, cur) =>
    cur[criterion] > best[criterion] ? cur : best
  ).security;
}
