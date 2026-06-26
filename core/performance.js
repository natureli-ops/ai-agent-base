/**
 * Performance Metrics Tracker
 * Monitors and analyzes agent performance over time
 */

class PerformanceTracker {
  constructor() {
    this.metrics = {
      agents: {},
      tasks: [],
      timeSeries: []
    };
  }

  recordTask(taskData) {
    const task = {
      id: taskData.id,
      agentId: taskData.agentId,
      agentName: taskData.agentName,
      timestamp: new Date().toISOString(),
      successful: taskData.successful,
      tokensUsed: taskData.tokensUsed,
      cost: taskData.cost,
      completionTime: taskData.completionTime
    };
    
    this.metrics.tasks.push(task);
    this.updateAgentMetrics(taskData.agentId, task);
    return task;
  }

  updateAgentMetrics(agentId, task) {
    if (!this.metrics.agents[agentId]) {
      this.metrics.agents[agentId] = {
        tasksCompleted: 0,
        tasksSuccessful: 0,
        totalTokensUsed: 0,
        totalCost: 0,
        successRate: 0,
        taskHistory: []
      };
    }
    
    const agent = this.metrics.agents[agentId];
    agent.tasksCompleted += 1;
    agent.totalTokensUsed += task.tokensUsed;
    agent.totalCost += task.cost;
    
    if (task.successful) {
      agent.tasksSuccessful += 1;
    }
    
    agent.successRate = agent.tasksSuccessful / agent.tasksCompleted;
    agent.taskHistory.push(task);
  }

  getOverallPerformance() {
    const total = this.metrics.tasks.length;
    const successful = this.metrics.tasks.filter(t => t.successful).length;
    const totalCost = this.metrics.tasks.reduce((sum, t) => sum + t.cost, 0);
    const totalTokens = this.metrics.tasks.reduce((sum, t) => sum + t.tokensUsed, 0);
    
    return {
      totalTasks: total,
      successfulTasks: successful,
      successRate: total > 0 ? (successful / total * 100).toFixed(2) : 0,
      totalCost: totalCost.toFixed(4),
      totalTokens,
      avgCostPerTask: total > 0 ? (totalCost / total).toFixed(4) : 0
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceTracker;
}
