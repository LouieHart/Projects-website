// Sector Allocation & Financial Planning Model
// Mean-variance optimisation applied across market sectors
// with time-horizon parameterisation

type Sector = {
  name: string;          // e.g. "Financials", "Technology", "Healthcare"
  expectedReturn: number; // μᵢ — annualised expected return
  volatility: number;     // σᵢ — annualised standard deviation
};

type PlanningParams = {
  horizonYears: number;  // Investment time horizon
  riskFreeRate: number;  // r_f — annualised
  targetReturn?: number; // μ̄ — optional return target for constrained optimisation
};

// Covariance from correlation matrix and sector volatilities
// Σᵢⱼ = ρᵢⱼ · σᵢ · σⱼ
function buildCovarianceMatrix(
  sectors: Sector[],
  correlations: number[][]   // ρ — n×n correlation matrix
): number[][] {
  return sectors.map((sᵢ, i) =>
    sectors.map((sⱼ, j) =>
      correlations[i][j] * sᵢ.volatility * sⱼ.volatility
    )
  );
}

// Horizon-adjusted return: compound over T years
// μ_T = (1 + μ)^T - 1
function horizonAdjustedReturn(annualReturn: number, years: number): number {
  return Math.pow(1 + annualReturn, years) - 1;
}

// Variance scales linearly with time: σ²_T = σ² · T
function horizonAdjustedVariance(annualVariance: number, years: number): number {
  return annualVariance * years;
}

// Three scenario profiles for sector allocation
type Profile = 'conservative' | 'balanced' | 'aggressive';

const riskTargets: Record<Profile, number> = {
  conservative: 0.08,   // 8% annual volatility target
  balanced:     0.14,   // 14% annual volatility target
  aggressive:   0.22,   // 22% annual volatility target
};

// Constrained optimisation: min wᵀΣw s.t. wᵀμ = μ̄, wᵀ1 = 1, wᵢ ≥ 0
// Returns optimal sector weights for a given risk profile
function optimalSectorWeights(
  sectors: Sector[],
  cov: number[][],
  params: PlanningParams,
  profile: Profile
): { weights: number[]; expectedReturn: number; portfolioVolatility: number } {
  const volTarget = riskTargets[profile];
  const mu = sectors.map(s => s.expectedReturn);

  // Lagrangian optimisation — solved via quadratic programming
  // Result: w* = Σ⁻¹(λ₁·μ + λ₂·1) where λ₁, λ₂ are Lagrange multipliers
  const covInv = invertMatrix(cov);
  const weights = solveQP(covInv, mu, volTarget, params.targetReturn);

  const portReturn = weights.reduce((sum, w, i) => sum + w * mu[i], 0);
  const portVariance = weights.reduce((acc, wᵢ, i) =>
    acc + weights.reduce((inner, wⱼ, j) =>
      inner + wᵢ * wⱼ * cov[i][j], 0), 0);

  return {
    weights,
    expectedReturn: horizonAdjustedReturn(portReturn, params.horizonYears),
    portfolioVolatility: Math.sqrt(horizonAdjustedVariance(portVariance, params.horizonYears)),
  };
}

// Variance analysis: decompose portfolio risk by sector contribution
// Contribution of sector i: CVᵢ = wᵢ · (Σw)ᵢ / σ²_p
function varianceDecomposition(
  weights: number[],
  cov: number[][],
  sectors: Sector[]
): Array<{ sector: string; contribution: number; percentOfRisk: number }> {
  const Σw = matVecMul(cov, weights);
  const totalVariance = weights.reduce((acc, w, i) => acc + w * Σw[i], 0);

  return sectors.map((s, i) => {
    const contribution = weights[i] * Σw[i];
    return {
      sector: s.name,
      contribution,
      percentOfRisk: (contribution / totalVariance) * 100,
    };
  });
}
