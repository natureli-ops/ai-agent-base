# AI Agent Base System

A dynamic, cost-optimized AI agent management platform that automatically selects and manages specialized AI agents based on real-time performance metrics and token costs.

## Features

### 1. Agent Rules Engine
- **Dynamic Agent Roster**: Real expert personas (scientists, engineers, operators)
- **Cost-Based Selection**: Automatic agent selection optimized by token usage and task complexity
- **Performance Tracking**: Monitor success rates, token efficiency, and task completion times
- **Auto-Optimization**: Periodic updates remove underperformers, promote successful agents

### 2. Interactive Dashboard
- Real-time agent performance metrics
- Task tracking and visualization
- Cost analytics and ROI calculations
- Chrome-compatible web interface

## Architecture

```
ai-agent-base/
├── agents/                 # Agent definitions and rules
│   ├── agent-registry.json # Dynamic agent roster
│   ├── agent-rules.js      # Agent selection logic
│   └── agents/             # Individual agent configs
├── dashboard/              # Interactive web interface
│   ├── index.html          # Main dashboard
│   ├── css/                # Styling
│   └── js/                 # Interactive components
├── core/                   # Core system logic
│   ├── cost-calculator.js  # Token cost computation
│   ├── performance.js      # Performance metrics
│   └── task-manager.js     # Task orchestration
└── data/                   # Historical data and logs
```

## Getting Started

1. Configure agent roster in `agents/agent-registry.json`
2. Set up task definitions in `core/task-manager.js`
3. Open `dashboard/index.html` in Chrome to view live metrics
4. System automatically selects optimal agents based on cost/performance

## Cost Model

Agents are ranked by:
- **Token Efficiency**: Tokens used per successful task completion
- **Success Rate**: Percentage of tasks completed successfully
- **Speed**: Time to task completion
- **Cost Score**: Combined metric for automatic selection
