/**
 * Agent Selection Engine
 * Automatically selects the most cost-effective agent based on task requirements and current metrics
 */

class AgentSelectionEngine {
  constructor(agentRegistry) {
    this.registry = agentRegistry;
    this.selectionHistory = [];
  }

  selectAgent(task) {
    const candidates = this.filterCandidates(task);
    const scored = this.scoreAgents(candidates, task);
    const selected = scored[0];

    return {
      agent: selected,
      candidates: scored,
      reasoning: this.generateReasoning(selected, scored),
      timestamp: new Date().toISOString(),
      taskId: task.id
    };
  }

  filterCandidates(task) {
    return this.registry.agents.filter(agent => {
      if (agent.status !== 'active') return false;
      if (agent.successRate < this.registry.performanceThreshold) return false;
      
      const expertiseMatch = task.requiredExpertise.some(exp => 
        agent.expertise.includes(exp)
      );
      return expertiseMatch || task.requiredExpertise.length === 0;
    });
  }

  scoreAgents(candidates, task) {
    const scored = candidates.map(agent => {
      const estimatedTokens = task.estimatedTokens || agent.avgTokensPerTask;
      const totalCost = estimatedTokens * agent.costPerToken;
      
      const costEfficiency = 1 / (totalCost + 0.001);
      const performanceBoost = agent.successRate * agent.costScore;
      const speedBoost = 100 / (agent.avgCompletionTime + 1);
      
      const finalScore = (
        costEfficiency * 0.5 +
        performanceBoost * 0.3 +
        speedBoost * 0.2
      );

      return {
        ...agent,
        estimatedCost: totalCost,
        costEfficiency,
        finalScore,
        metrics: {
          totalCost,
          estimatedTokens,
          costPerToken: agent.costPerToken
        }
      };
    });

    return scored.sort((a, b) => b.finalScore - a.finalScore);
  }

  generateReasoning(selected, candidates) {
    const costSavings = candidates[1] ? 
      ((candidates[1].estimatedCost - selected.estimatedCost) / candidates[1].estimatedCost * 100).toFixed(2) 
      : 0;
    
    return `Selected ${selected.name}. Cost: $${selected.estimatedCost.toFixed(4)}. Success: ${(selected.successRate * 100).toFixed(1)}%. Savings: ${costSavings}%.`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AgentSelectionEngine;
}
