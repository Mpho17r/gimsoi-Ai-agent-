import { Router, Request, Response } from 'express';
import { consistencyScoringEngine } from '../ai-engine/consistencyScoringEngine';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }
    
    const mockMetrics = {
      completionRate: 78,
      updateFrequency: 65,
      onTimeCompletion: 72,
      activityStability: 80
    };
    
    const consistencyResult = consistencyScoringEngine.calculateConsistencyScore(mockMetrics);
    
    res.json({
      user_id,
      consistency_score: consistencyResult.score,
      activity_status: consistencyResult.status,
      risk_indicator: consistencyResult.level,
      intervention_suggested: consistencyResult.interventionSuggested,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
