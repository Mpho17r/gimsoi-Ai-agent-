interface ContributorMetrics {
  completionRate: number;
  updateFrequency: number;
  onTimeCompletion: number;
  activityStability: number;
}

export class ConsistencyScoringEngine {
  calculateConsistencyScore(metrics: ContributorMetrics) {
    const score = 
      (metrics.completionRate * 0.4) +
      (metrics.updateFrequency * 0.2) +
      (metrics.onTimeCompletion * 0.3) +
      (metrics.activityStability * 0.1);
    
    let level: 'HIGH' | 'MODERATE' | 'LOW';
    let status: 'Stable' | 'Inconsistent' | 'Critical';
    let interventionSuggested = false;
    
    if (score >= 70) {
      level = 'HIGH';
      status = 'Stable';
    } else if (score >= 40) {
      level = 'MODERATE';
      status = 'Inconsistent';
    } else {
      level = 'LOW';
      status = 'Critical';
      interventionSuggested = true;
    }
    
    return { score: Math.round(score), level, status, interventionSuggested };
  }
}

export const consistencyScoringEngine = new ConsistencyScoringEngine();
