/**
 * Cost Calculator
 * Computes token costs, ROI, and financial metrics for agent selection
 */

class CostCalculator {
  constructor(config = {}) {
    this.baseTokenCost = config.baseTokenCost || 0.0001;
    this.currencySymbol = config.currency || '$';
    this.tasks = [];
  }

  calculateTaskCost(agent, tokensUsed, taskComplexity = 1) {
    const baseCost = agent.costPerToken * tokensUsed;
    const complexityMultiplier = taskComplexity;
    return baseCost * complexityMultiplier;
  }

  calculateEfficiency(cost, successRate, completionTime) {
    const timeWeight = 1 / (completionTime / 60);
    const successWeight = successRate * 2;
    return (successWeight * timeWeight) / (cost + 0.0001);
  }

  compareCosts(agents, estimatedTokens) {
    const comparison = agents.map(agent => {
      const cost = this.calculateTaskCost(agent, estimatedTokens);
      const efficiency = this.calculateEfficiency(
        cost,
        agent.successRate,
        agent.avgCompletionTime
      );
      
      return {
        agentName: agent.name,
        agentId: agent.id,
        cost,
        efficiency,
        costPerToken: agent.costPerToken,
        tokensEstimated: estimatedTokens
      };
    });
    
    return comparison.sort((a, b) => a.cost - b.cost);
  }

  calculateCumulativeSavings(taskHistory) {
    let totalCost = 0;
    let potentialCost = 0;
    
    taskHistory.forEach(task => {
      totalCost += task.actualCost || 0;
      potentialCost += task.potentialCost || task.actualCost;
    });
    
    return {
      actualCost: totalCost,
      potentialCost,
      savings: potentialCost - totalCost,
      savingsPercentage: ((potentialCost - totalCost) / potentialCost * 100).toFixed(2),
      tasksProcessed: taskHistory.length
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CostCalculator;
}
