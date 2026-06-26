// Dashboard Application

class Dashboard {
    constructor() {
        this.currentTab = 'overview';
        this.initializeEventListeners();
        this.loadDashboard();
    }

    initializeEventListeners() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        const tabElement = document.getElementById(`${tabName}-tab`);
        if (tabElement) {
            tabElement.classList.add('active');
        }

        event.target.classList.add('active');
        this.currentTab = tabName;

        switch (tabName) {
            case 'agents':
                this.loadAgentsTab();
                break;
            case 'tasks':
                this.loadTasksTab();
                break;
            case 'performance':
                this.loadPerformanceTab();
                break;
        }
    }

    loadDashboard() {
        this.updateMetrics();
    }

    updateMetrics() {
        document.getElementById('totalTasks').textContent = '127';
        document.getElementById('successRate').textContent = '96.5%';
        document.getElementById('totalCost').textContent = '$8.50';
        document.getElementById('avgTokens').textContent = '1,228';
    }

    loadAgentsTab() {
        const agents = [
            { name: 'Dr. Yann LeCun', specialty: 'Deep Learning', successRate: '95%', costScore: '96', tasks: '234' },
            { name: 'Sarah Zhang', specialty: 'System Architecture', successRate: '98%', costScore: '99', tasks: '512' },
            { name: 'James Chen', specialty: 'Production Ops', successRate: '97%', costScore: '100', tasks: '687' }
        ];

        const container = document.getElementById('agentsList');
        container.innerHTML = agents.map(agent => `
            <div class="agent-card">
                <div class="agent-name">${agent.name}</div>
                <div class="agent-specialty">${agent.specialty}</div>
                <div class="agent-metrics">
                    <div class="metric-item">
                        <div class="metric-item-label">Success Rate</div>
                        <div class="metric-item-value">${agent.successRate}</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-item-label">Cost Score</div>
                        <div class="metric-item-value">${agent.costScore}</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-item-label">Tasks</div>
                        <div class="metric-item-value">${agent.tasks}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadTasksTab() {
        const tasks = [
            { id: 'TASK-001', agent: 'Sarah Zhang', status: 'Completed', tokens: '1,250', cost: '$0.0625' },
            { id: 'TASK-002', agent: 'James Chen', status: 'Completed', tokens: '580', cost: '$0.0232' },
            { id: 'TASK-003', agent: 'Dr. Yann LeCun', status: 'Processing', tokens: '1,450', cost: '$0.1160' }
        ];

        const tbody = document.getElementById('tasksList');
        tbody.innerHTML = tasks.map(task => `
            <tr>
                <td>${task.id}</td>
                <td>${task.agent}</td>
                <td>${task.status}</td>
                <td>${task.tokens}</td>
                <td>${task.cost}</td>
            </tr>
        `).join('');
    }

    loadPerformanceTab() {
        const performance = [
            { name: 'James Chen', successRate: '97%', tasks: '687', costScore: '100' },
            { name: 'Sarah Zhang', successRate: '98%', tasks: '512', costScore: '99' },
            { name: 'Dr. Yann LeCun', successRate: '95%', tasks: '234', costScore: '96' }
        ];

        const tbody = document.getElementById('performanceRanking');
        tbody.innerHTML = performance.map(agent => `
            <tr>
                <td>${agent.name}</td>
                <td>${agent.successRate}</td>
                <td>${agent.tasks}</td>
                <td>${agent.costScore}</td>
            </tr>
        `).join('');
    }
}

function refreshDashboard() {
    window.dashboard.loadDashboard();
    alert('Dashboard refreshed!');
}

function saveSettings() {
    alert('Settings saved successfully!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dashboard = new Dashboard();
    });
} else {
    window.dashboard = new Dashboard();
}
