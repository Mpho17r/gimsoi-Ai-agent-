interface RiskFactors {
  overdueTasks: number;
  delayedTasks: number;
  inactiveContributors: number;
  incompleteDependencies: number;
  deadlineShifts: number;
}

const WEIGHTS = {
  OVERDUE_TASK: 15,
  TASK_DELAYED_3_DAYS: 10,
  CONTRIBUTOR_INACTIVE_48H: 12,
  DEPENDENCY_INCOMPLETE: 8,
  DEADLINE_SHIFT: 10
};

export class RiskScoringEngine {
  calculateRiskScore(factors: RiskFactors) {
    let totalScore = 0;
    const flags: string[] = [];
    
    totalScore += factors.overdueTasks * WEIGHTS.OVERDUE_TASK;
    totalScore += factors.delayedTasks * WEIGHTS.TASK_DELAYED_3_DAYS;
    totalScore += factors.inactiveContributors * WEIGHTS.CONTRIBUTOR_INACTIVE_48H;
    totalScore += factors.incompleteDependencies * WEIGHTS.DEPENDENCY_INCOMPLETE;
    totalScore += factors.deadlineShifts * WEIGHTS.DEADLINE_SHIFT;
    
    let level: 'HEALTHY' | 'MODERATE_RISK' | 'HIGH_RISK';
    if (totalScore <= 20) level = 'HEALTHY';
    else if (totalScore <= 40) level = 'MODERATE_RISK';
    else level = 'HIGH_RISK';
    
    return { score: totalScore, level, flags };
  }
}

export const riskScoringEngine = new RiskScoringEngine();
