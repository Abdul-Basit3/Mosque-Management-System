// ===== Executives Manager =====
class ExecutivesManager {
    constructor() {
        this.executives = [];
        this.gridElement = document.getElementById('executivesGrid');
        this.init();
    }
    async init() {
        await this.fetchExecutives();
        this.displayExecutives();
    }
    async fetchExecutives() {
        try {
            const response = await fetch('/api/executives');
            if (response.ok) {
                const data = await response.json();
                this.executives = data.data;
            }
            else {
                throw new Error('API not available');
            }
        }
        catch (error) {
            console.warn('Using fallback executive data:', error);
            this.executives = this.getFallbackExecutives();
        }
    }
    getFallbackExecutives() {
        return [
            {
                id: 1,
                name: 'Imam Muhammad Al-Hassan',
                position: 'Chief Imam',
                bio: 'Leading our community in worship and spiritual guidance with over 15 years of experience in Islamic education and community service.',
                photo: 'images/imam1.jpg',
                email: 'imam@noorulhaq.org',
                department: 'Religious Affairs',
                joinedDate: '2015-01-01'
            },
            {
                id: 2,
                name: 'Abdullah Ibrahim',
                position: 'President',
                bio: 'Overseeing all mosque operations and community programs, dedicated to fostering unity and growth within our community.',
                photo: 'images/president.jpg',
                email: 'president@noorulhaq.org',
                phone: '+233 XX XXX XXXX',
                department: 'Administration',
                joinedDate: '2022-01-15'
            },
            {
                id: 3,
                name: 'Fatima Yusuf',
                position: 'Secretary',
                bio: 'Managing administrative tasks, communications, and documentation to ensure smooth operations of all mosque activities.',
                photo: 'images/secretary.jpg',
                email: 'secretary@noorulhaq.org',
                department: 'Administration',
                joinedDate: '2022-03-01'
            },
            {
                id: 4,
                name: 'Ahmed Suleiman',
                position: 'Treasurer',
                bio: 'Responsible for financial management, budgeting, and ensuring transparent handling of mosque funds and donations.',
                photo: 'images/treaturer.jpg',
                email: 'treasurer@noorulhaq.org',
                department: 'Finance',
                joinedDate: '2022-01-15'
            },
            {
                id: 5,
                name: 'Sheikh Yusuf Mahmoud',
                position: 'Assistant Imam',
                bio: 'Supporting religious education programs and leading prayers, with expertise in Quranic studies and Islamic jurisprudence.',
                photo: 'images/imam2.jpg',
                email: 'assistant.imam@noorulhaq.org',
                department: 'Religious Affairs',
                joinedDate: '2020-06-01'
            },
            {
                id: 6,
                name: 'Ibrahim Khalid',
                position: 'Muazin',
                bio: 'Calling the faithful to prayer five times daily and assisting with mosque maintenance and community outreach.',
                photo: 'images/muazin.jpg',
                department: 'Religious Affairs',
                joinedDate: '2019-09-01'
            },
            {
                id: 7,
                name: 'Aisha Mohammed',
                position: 'Women\'s Committee Chair',
                bio: 'Leading programs and activities for sisters in the community, promoting Islamic education and social welfare.',
                photo: 'images/wocom.jpg',
                email: 'womens.committee@noorulhaq.org',
                department: 'Community Affairs',
                joinedDate: '2021-02-01'
            },
            {
                id: 8,
                name: 'Omar Hassan',
                position: 'Event Organizer',
                bio: 'Planning and coordinating all mosque events, activities, and community programs throughout the year.',
                photo: 'images/organizer.jpg',
                email: 'events@noorulhaq.org',
                department: 'Community Affairs',
                joinedDate: '2022-08-01'
            }
        ];
    }
    displayExecutives() {
        if (!this.gridElement)
            return;
        if (this.executives.length === 0) {
            this.gridElement.innerHTML = '<p class="no-content">No executive information available at the moment.</p>';
            return;
        }
        // Group by department
        const grouped = this.groupByDepartment(this.executives);
        this.gridElement.innerHTML = Object.entries(grouped)
            .map(([department, execs]) => this.createDepartmentSection(department, execs))
            .join('');
    }
    groupByDepartment(executives) {
        return executives.reduce((acc, exec) => {
            if (!acc[exec.department]) {
                acc[exec.department] = [];
            }
            acc[exec.department].push(exec);
            return acc;
        }, {});
    }
    createDepartmentSection(department, executives) {
        return `
            <div class="department-section">
                <h2 class="department-title">${this.escapeHtml(department)}</h2>
                <div class="executives-grid">
                    ${executives.map(exec => this.createExecutiveCard(exec)).join('')}
                </div>
            </div>
        `;
    }
    createExecutiveCard(executive) {
        return `
            <div class="executive-card card">
                <div class="executive-photo">
                    <img 
                        src="${this.escapeHtml(executive.photo)}" 
                        alt="${this.escapeHtml(executive.name)}" 
                        onerror="this.src='images/pro.jpg'"
                    >
                </div>
                <div class="executive-info">
                    <h3>${this.escapeHtml(executive.name)}</h3>
                    <p class="executive-position">${this.escapeHtml(executive.position)}</p>
                    <p class="executive-bio">${this.escapeHtml(executive.bio)}</p>
                    
                    ${executive.email || executive.phone ? `
                        <div class="executive-contact">
                            ${executive.email ? `
                                <a href="mailto:${this.escapeHtml(executive.email)}" class="contact-link">
                                    <i class="fas fa-envelope"></i>
                                    <span>Email</span>
                                </a>
                            ` : ''}
                            ${executive.phone ? `
                                <a href="tel:${this.escapeHtml(executive.phone)}" class="contact-link">
                                    <i class="fas fa-phone"></i>
                                    <span>Call</span>
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    searchExecutives(query) {
        const filtered = this.executives.filter(exec => exec.name.toLowerCase().includes(query.toLowerCase()) ||
            exec.position.toLowerCase().includes(query.toLowerCase()) ||
            exec.bio.toLowerCase().includes(query.toLowerCase()) ||
            exec.department.toLowerCase().includes(query.toLowerCase()));
        this.executives = filtered;
        this.displayExecutives();
    }
    filterByDepartment(department) {
        if (department === 'all') {
            this.displayExecutives();
        }
        else {
            const filtered = this.executives.filter(exec => exec.department === department);
            this.executives = filtered;
            this.displayExecutives();
        }
    }
}
// ===== Initialize =====
let executivesManager;
document.addEventListener('DOMContentLoaded', () => {
    executivesManager = new ExecutivesManager();
    // Make it globally accessible if needed
    window.executivesManager = executivesManager;
});
// ===== Export =====
export { ExecutivesManager };
//# sourceMappingURL=executives.js.map