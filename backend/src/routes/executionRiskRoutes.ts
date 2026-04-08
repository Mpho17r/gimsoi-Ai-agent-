import { Router, Request, Response } from 'express';
import { riskScoringEngine } from '../ai-engine/riskScoringEngine';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { sprint_id } = req.query;
    
    if (!sprint_id) {
      return res.status(400).json({ error: 'sprint_id is required' });
    }
    
    const mockRiskFactors = {
      overdueTasks: 2,
      delayedTasks: 1,
      inactiveContributors: 2,
      incompleteDependencies: 1,
      deadlineShifts: 1
    };
    
    const riskResult = riskScoringEngine.calculateRiskScore(mockRiskFactors);
    
    res.json({
      sprint_id,
      sprint_health: riskResult.level,
      risk_score: riskResult.score,
      risk_flags: riskResult.flags,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
