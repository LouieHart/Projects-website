// Mean-Variance Portfolio Optimisation
// Markowitz efficient frontier for n ≤ 6 securities

type SecurityReturn = { expected: number; variance: number };
type CovarianceMatrix = number[][];

// σ²_p = wᵀΣw
function portfolioVariance(weights: number[], cov: CovarianceMatrix): number {
  return weights.reduce((acc, wᵢ, i) =>
    acc + weights.reduce((sum, wⱼ, j) => sum + wᵢ * wⱼ * cov[i][j], 0), 0);
}

// E[R_p] = Σ wᵢ μᵢ
function expectedReturn(weights: number[], mu: number[]): number {
  return weights.reduce((acc, w, i) => acc + w * mu[i], 0);
}

// Tangent portfolio: maximises Sharpe ratio
// max (E[R_p] - r_f) / σ_p, subject to Σ wᵢ = 1
function tangentPortfolio(
  mu: number[],
  cov: CovarianceMatrix,
  riskFreeRate: number
): { weights: number[]; sharpe: number } {
  const excess = mu.map(m => m - riskFreeRate);
  const covInv = invertMatrix(cov);          // Σ⁻¹
  const z = matVecMul(covInv, excess);       // z = Σ⁻¹(μ - r_f·1)
  const sumZ = z.reduce((a, b) => a + b, 0);
  const weights = z.map(zᵢ => zᵢ / sumZ);   // normalise

  const ret = expectedReturn(weights, mu);
  const vol = Math.sqrt(portfolioVariance(weights, cov));
  return { weights, sharpe: (ret - riskFreeRate) / vol };
}

// Efficient frontier: parametric trace via two-fund theorem
// Any frontier portfolio = λ·MVP + (1-λ)·Tangent
function efficientFrontier(
  mu: number[],
  cov: CovarianceMatrix,
  riskFreeRate: number,
  points = 100
): Array<{ risk: number; return: number }> {
  const mvp = minimumVariancePortfolio(mu, cov);
  const tangent = tangentPortfolio(mu, cov, riskFreeRate).weights;

  return Array.from({ length: points }, (_, k) => {
    const λ = -0.5 + (2 * k) / points;
    const w = mvp.map((v, i) => λ * v + (1 - λ) * tangent[i]);
    return {
      risk: Math.sqrt(portfolioVariance(w, cov)),
      return: expectedReturn(w, mu),
    };
  });
}
