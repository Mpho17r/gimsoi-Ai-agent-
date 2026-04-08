import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'GIMSOI AI Agent is running!'
  });
});

// Execution Risk endpoint
app.get('/api/ai/execution-risk', (req: Request, res: Response) => {
  const { sprint_id } = req.query;
  
  if (!sprint_id) {
    return res.status(400).json({ error: 'sprint_id is required' });
  }
  
  // Mock data - replace with real calculations later
  const riskScore = 58;
  let healthLevel = 'MODERATE_RISK';
  
  if (riskScore <= 20) healthLevel = 'HEALTHY';
  else if (riskScore <= 40) healthLevel = 'MODERATE_RISK';
  else healthLevel = 'HIGH_RISK';
  
  res.json({
    sprint_id,
    sprint_health: healthLevel,
    risk_score: riskScore,
    risk_flags: [
      "2 overdue task(s) detected",
      "1 task(s) delayed >3 days",
      "2 contributor(s) inactive >48 hours"
    ],
    timestamp: new Date().toISOString()
  });
});

// Contributor Summary endpoint
app.get('/api/ai/contributor-summary', (req: Request, res: Response) => {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }
  
  // Mock data - replace with real calculations later
  const consistencyScore = 74;
  
  res.json({
    user_id,
    consistency_score: consistencyScore,
    activity_status: consistencyScore >= 70 ? 'Stable' : 'Inconsistent',
    risk_indicator: consistencyScore >= 70 ? 'Low' : consistencyScore >= 40 ? 'Medium' : 'High',
    intervention_suggested: consistencyScore < 40,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GIMSOI AI Agent running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖 AI Engine: Rule-based (Phase 1 MVP)`);
  console.log(`\n📝 Test endpoints:`);
  console.log(`   http://localhost:${PORT}/health`);
  console.log(`   http://localhost:${PORT}/api/ai/execution-risk?sprint_id=test`);
  console.log(`   http://localhost:${PORT}/api/ai/contributor-summary?user_id=test`);
});

export default app;
