// ===== Projects Manager =====
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.filterStatus = 'all';
        this.gridElement = document.getElementById('projectsGrid');
        this.init();
    }
    async init() {
        await this.fetchProjects();
        this.displayProjects();
    }
    async fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                this.projects = data.data;
            }
            else {
                throw new Error('API not available');
            }
        }
        catch (error) {
            console.warn('Using fallback project data:', error);
            this.projects = this.getFallbackProjects();
        }
    }
    getFallbackProjects() {
        return [
            {
                id: 1,
                title: 'Mosque Expansion Project',
                description: 'Expanding our prayer hall to accommodate more worshippers during Friday prayers and special occasions.',
                thumbnail: 'images/mosque.jpg',
                category: 'Infrastructure',
                status: 'Active',
                goal: 50000,
                raised: 32500,
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                volunteers: 45
            },
            {
                id: 2,
                title: 'Ramadan Food Drive',
                description: 'Providing iftar meals and food packages to underprivileged families during the blessed month of Ramadan.',
                thumbnail: 'images/ramadan.jpg',
                category: 'Community Service',
                status: 'Upcoming',
                goal: 15000,
                raised: 8200,
                startDate: '2024-03-01',
                endDate: '2024-04-30',
                volunteers: 67
            },
            {
                id: 3,
                title: 'Islamic Library Development',
                description: 'Building a comprehensive Islamic library with books, digital resources, and study spaces for students.',
                thumbnail: 'images/pro.jpg',
                category: 'Education',
                status: 'Active',
                goal: 25000,
                raised: 18750,
                startDate: '2023-09-01',
                volunteers: 23
            },
            {
                id: 4,
                title: 'Youth Sports Program',
                description: 'Organizing sports activities and tournaments to promote health, teamwork, and Islamic values among youth.',
                thumbnail: 'images/football.jpg',
                category: 'Youth',
                status: 'Active',
                goal: 10000,
                raised: 7500,
                startDate: '2024-01-15',
                volunteers: 34
            },
            {
                id: 5,
                title: 'Water Well Project - Ghana',
                description: 'Providing clean water access to rural communities in Ghana through sustainable water well installations.',
                thumbnail: 'images/extend.jpg',
                category: 'Humanitarian',
                status: 'Completed',
                goal: 20000,
                raised: 20000,
                startDate: '2023-06-01',
                endDate: '2023-12-31',
                volunteers: 12
            },
            {
                id: 6,
                title: 'Islamic Quiz Competition',
                description: 'Annual Islamic knowledge competition for students to encourage learning and understanding of Islam.',
                thumbnail: 'images/quiz.jpg',
                category: 'Education',
                status: 'Upcoming',
                startDate: '2024-05-01',
                volunteers: 15
            }
        ];
    }
    displayProjects() {
        if (!this.gridElement)
            return;
        const filteredProjects = this.filterStatus === 'all'
            ? this.projects
            : this.projects.filter(project => project.status === this.filterStatus);
        if (filteredProjects.length === 0) {
            this.gridElement.innerHTML = '<p class="no-content">No projects available with this status.</p>';
            return;
        }
        this.gridElement.innerHTML = filteredProjects
            .map(project => this.createProjectCard(project))
            .join('');
    }
    createProjectCard(project) {
        const statusColor = this.getStatusColor(project.status);
        const progress = project.goal && project.raised
            ? Math.round((project.raised / project.goal) * 100)
            : 0;
        return `
            <div class="content-card card">
                <div class="content-image">
                    <img 
                        src="${this.escapeHtml(project.thumbnail)}" 
                        alt="${this.escapeHtml(project.title)}" 
                        onerror="this.src='images/pro.jpg'"
                    >
                    <div class="content-badge" style="background-color: ${statusColor}">
                        ${this.escapeHtml(project.status)}
                    </div>
                </div>
                <div class="content-body">
                    <div class="project-category">${this.escapeHtml(project.category)}</div>
                    <h3>${this.escapeHtml(project.title)}</h3>
                    <p class="content-description">${this.escapeHtml(project.description)}</p>
                    
                    ${project.goal && project.raised ? `
                        <div class="project-funding">
                            <div class="funding-info">
                                <span class="raised">$${this.formatNumber(project.raised)} raised</span>
                                <span class="goal">of $${this.formatNumber(project.goal)}</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <div class="progress-percentage">${progress}% funded</div>
                        </div>
                    ` : ''}
                    
                    <div class="project-stats">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(project.startDate)}</span>
                        ${project.volunteers ? `<span><i class="fas fa-users"></i> ${project.volunteers} volunteers</span>` : ''}
                    </div>
                    
                    <button 
                        class="btn-primary" 
                        onclick="projectsManager.supportProject(${project.id})"
                        aria-label="Support ${this.escapeHtml(project.title)}"
                    >
                        <i class="fas fa-hand-holding-heart"></i> Support Project
                    </button>
                </div>
            </div>
        `;
    }
    getStatusColor(status) {
        const colors = {
            'Active': '#10b981',
            'Completed': '#6b7280',
            'Upcoming': '#f59e0b'
        };
        return colors[status] || '#6b7280';
    }
    formatNumber(num) {
        return num.toLocaleString('en-US');
    }
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    filterByStatus(status) {
        this.filterStatus = status;
        this.displayProjects();
    }
    supportProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            if (project.status === 'Completed') {
                alert(`This project has been completed. Thank you for your interest!`);
            }
            else {
                alert(`Support form would open here for: ${project.title}\n\nYou can donate or volunteer for this project.`);
                // In production, this would open a donation/volunteer form
            }
        }
    }
    searchProjects(query) {
        const filtered = this.projects.filter(project => project.title.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase()) ||
            project.category.toLowerCase().includes(query.toLowerCase()));
        this.projects = filtered;
        this.displayProjects();
    }
}
// ===== Initialize =====
let projectsManager;
document.addEventListener('DOMContentLoaded', () => {
    projectsManager = new ProjectsManager();
    // Make it globally accessible for onclick handlers
    window.projectsManager = projectsManager;
});
// ===== Export =====
export { ProjectsManager };
//# sourceMappingURL=projects.js.map