// ===== Type Definitions =====
interface AdminUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'staff';
}

interface DashboardSection {
    id: string;
    title: string;
    render: () => string;
}

// ===== Admin Dashboard Manager =====
class AdminDashboardManager {
    private currentUser: AdminUser | null = null;
    private currentSection: string = 'overview';
    private sidebar: HTMLElement | null;
    private content: HTMLElement | null;
    private pageTitle: HTMLElement | null;

    constructor() {
        this.sidebar = document.getElementById('adminSidebar');
        this.content = document.getElementById('adminContent');
        this.pageTitle = document.getElementById('pageTitle');

        this.init();
    }

    private init(): void {
        this.checkAuthentication();
        this.loadUserInfo();
        this.setupEventListeners();
        this.loadSection('overview');
    }

    private checkAuthentication(): void {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            window.location.href = 'admin-login.html';
            return;
        }

        const userStr = sessionStorage.getItem('adminUser');
        if (userStr) {
            this.currentUser = JSON.parse(userStr);
        }
    }

    private loadUserInfo(): void {
        if (!this.currentUser) return;

        const adminName = document.getElementById('adminName');
        const adminRole = document.getElementById('adminRole');

        if (adminName) {
            adminName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        }

        if (adminRole) {
            adminRole.textContent = this.currentUser.role.toUpperCase();
        }
    }

    private setupEventListeners(): void {
        // Navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = (item as HTMLElement).dataset.section;
                if (section) {
                    this.loadSection(section);
                }
            });
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle && this.sidebar) {
            mobileMenuToggle.addEventListener('click', () => {
                this.sidebar?.classList.toggle('active');
            });
        }
    }

    private loadSection(sectionId: string): void {
        this.currentSection = sectionId;

        // Update active nav item
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if ((item as HTMLElement).dataset.section === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update page title
        const section = this.getSectionData(sectionId);
        if (this.pageTitle) {
            this.pageTitle.textContent = section.title;
        }

        // Render content
        if (this.content) {
            this.content.innerHTML = section.render();
            this.attachSectionEventListeners(sectionId);
        }

        // Close mobile menu
        if (this.sidebar) {
            this.sidebar.classList.remove('active');
        }
    }

    private getSectionData(sectionId: string): DashboardSection {
        const sections: Record<string, DashboardSection> = {
            'overview': {
                id: 'overview',
                title: 'Overview',
                render: () => this.renderOverview()
            },
            'all-management': {
                id: 'all-management',
                title: 'All Activities Management',
                render: () => this.renderAllManagement()
            },
            'prayer-times': {
                id: 'prayer-times',
                title: 'Prayer Times',
                render: () => this.renderPrayerTimes()
            },
            'lectures': {
                id: 'lectures',
                title: 'Lectures',
                render: () => this.renderLectures()
            },
            'courses': {
                id: 'courses',
                title: 'Courses',
                render: () => this.renderCourses()
            },
            'projects': {
                id: 'projects',
                title: 'Projects',
                render: () => this.renderProjects()
            },
            'activities': {
                id: 'activities',
                title: 'Activities',
                render: () => this.renderActivities()
            },
            'executives': {
                id: 'executives',
                title: 'Executives',
                render: () => this.renderExecutives()
            },
            'faqs': {
                id: 'faqs',
                title: 'FAQs',
                render: () => this.renderFAQs()
            },
            'settings': {
                id: 'settings',
                title: 'Settings',
                render: () => this.renderSettings()
            }
        };

        return sections[sectionId] || sections['overview'];
    }

    private renderOverview(): string {
        return `
            <div>
                <div class="mb-8">
                    <h1 class="text-3xl font-bold mb-2">Welcome back, ${this.currentUser?.firstName}! 👋</h1>
                    <p class="text-gray-600 dark:text-gray-300">Here's what's happening with your mosque management system today.</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card gradient" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
                        <h3>Total Users</h3>
                        <div class="value">1,234</div>
                        <span class="change">+12%</span>
                    </div>
                    <div class="stat-card gradient" style="background: linear-gradient(135deg, #10b981, #059669);">
                        <h3>Active Courses</h3>
                        <div class="value">24</div>
                        <span class="change">+5%</span>
                    </div>
                    <div class="stat-card gradient" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
                        <h3>Upcoming Events</h3>
                        <div class="value">8</div>
                        <span class="change">+2</span>
                    </div>
                    <div class="stat-card gradient" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                        <h3>Total Lectures</h3>
                        <div class="value">156</div>
                        <span class="change">+18%</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card">
                        <h2 class="text-2xl font-bold mb-4">Recent Activities</h2>
                        <div class="space-y-3">
                            ${this.renderRecentActivities()}
                        </div>
                    </div>

                    <div class="card">
                        <h2 class="text-2xl font-bold mb-4">Quick Actions</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <button class="btn-primary py-6 flex flex-col items-center" onclick="adminDashboard.loadSection('lectures')">
                                <span class="text-3xl mb-2">📝</span>
                                <span>Add Lecture</span>
                            </button>
                            <button class="btn-primary py-6 flex flex-col items-center" onclick="adminDashboard.loadSection('prayer-times')">
                                <span class="text-3xl mb-2">🕌</span>
                                <span>Prayer Times</span>
                            </button>
                            <button class="btn-primary py-6 flex flex-col items-center" onclick="adminDashboard.loadSection('courses')">
                                <span class="text-3xl mb-2">📚</span>
                                <span>Create Course</span>
                            </button>
                            <button class="btn-primary py-6 flex flex-col items-center" onclick="adminDashboard.loadSection('activities')">
                                <span class="text-3xl mb-2">📅</span>
                                <span>Schedule Event</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private renderAllManagement(): string {
        return `
            <div>
                <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-2">All Activities Management</h2>
                    <p class="text-gray-600 dark:text-gray-300">Centralized control panel for all mosque activities</p>
                </div>

                <div class="management-grid">
                    ${this.renderManagementCard('Prayer Times', 'clock', 'Manage daily prayer schedules', 'prayer-times', '#10b981')}
                    ${this.renderManagementCard('Lectures', 'video', 'Upload and manage Islamic lectures', 'lectures', '#3b82f6')}
                    ${this.renderManagementCard('Courses', 'book', 'Create and manage online courses', 'courses', '#8b5cf6')}
                    ${this.renderManagementCard('Projects', 'project-diagram', 'Manage community projects', 'projects', '#f59e0b')}
                    ${this.renderManagementCard('Activities', 'calendar', 'Schedule and manage events', 'activities', '#ec4899')}
                    ${this.renderManagementCard('Executives', 'users', 'Manage leadership team', 'executives', '#06b6d4')}
                    ${this.renderManagementCard('FAQs', 'question-circle', 'Manage frequently asked questions', 'faqs', '#84cc16')}
                    ${this.renderManagementCard('Settings', 'cog', 'System configuration', 'settings', '#6b7280')}
                </div>

                <div class="mt-8">
                    <div class="data-table-container">
                        <div class="table-header">
                            <h3>Recent Updates</h3>
                            <button class="btn-primary">View All</button>
                        </div>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Type</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.renderRecentUpdatesTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    private renderManagementCard(title: string, icon: string, description: string, section: string, color: string): string {
        return `
            <div class="management-card">
                <div class="management-card-header">
                    <div class="management-card-icon" style="background: linear-gradient(135deg, ${color}, ${color}dd);">
                        <i class="fas fa-${icon}"></i>
                    </div>
                </div>
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="management-actions">
                    <button class="action-btn primary" onclick="adminDashboard.loadSection('${section}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn">
                        <i class="fas fa-plus"></i> Add New
                    </button>
                </div>
            </div>
        `;
    }

    private renderRecentActivities(): string {
        const activities = [
            { action: 'New user registered', user: 'Ahmad Hassan', time: '5 minutes ago', icon: '👤', color: 'bg-blue-100' },
            { action: 'Course enrollment', user: 'Fatima Ali', time: '15 minutes ago', icon: '📖', color: 'bg-green-100' },
            { action: 'Event registration', user: 'Omar Khan', time: '1 hour ago', icon: '🎫', color: 'bg-purple-100' },
            { action: 'Donation received', user: 'Anonymous', time: '2 hours ago', icon: '💰', color: 'bg-yellow-100' },
            { action: 'New lecture uploaded', user: 'Sheikh Muhammad', time: '3 hours ago', icon: '🎬', color: 'bg-pink-100' }
        ];

        return activities.map(activity => `
            <div class="flex items-start p-4 ${activity.color} rounded-lg">
                <span class="text-3xl mr-4">${activity.icon}</span>
                <div class="flex-1">
                    <p class="font-bold">${activity.action}</p>
                    <p class="text-sm text-gray-600">${activity.user}</p>
                    <p class="text-xs text-gray-500 mt-1">${activity.time}</p>
                </div>
            </div>
        `).join('');
    }

    private renderRecentUpdatesTable(): string {
        const updates = [
            { activity: 'Lecture uploaded', type: 'Lectures', user: 'Admin', date: '2024-02-14', status: 'active' },
            { activity: 'Course created', type: 'Courses', user: 'Staff', date: '2024-02-13', status: 'active' },
            { activity: 'Event scheduled', type: 'Activities', user: 'Admin', date: '2024-02-12', status: 'pending' },
            { activity: 'FAQ updated', type: 'FAQs', user: 'Staff', date: '2024-02-11', status: 'active' },
            { activity: 'Project added', type: 'Projects', user: 'Admin', date: '2024-02-10', status: 'active' }
        ];

        return updates.map(update => `
            <tr>
                <td>${update.activity}</td>
                <td>${update.type}</td>
                <td>${update.user}</td>
                <td>${update.date}</td>
                <td><span class="status-badge ${update.status}">${update.status}</span></td>
                <td>
                    <button class="action-btn"><i class="fas fa-edit"></i></button>
                    <button class="action-btn"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    private renderPrayerTimes(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Prayer Times Management</h2><p>Manage daily prayer schedules here.</p></div>`;
    }

    private renderLectures(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Lectures Management</h2><p>Upload and manage Islamic lectures here.</p></div>`;
    }

    private renderCourses(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Courses Management</h2><p>Create and manage online courses here.</p></div>`;
    }

    private renderProjects(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Projects Management</h2><p>Manage community projects here.</p></div>`;
    }

    private renderActivities(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Activities Management</h2><p>Schedule and manage events here.</p></div>`;
    }

    private renderExecutives(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Executives Management</h2><p>Manage leadership team here.</p></div>`;
    }

    private renderFAQs(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">FAQs Management</h2><p>Manage frequently asked questions here.</p></div>`;
    }

    private renderSettings(): string {
        return `<div class="card"><h2 class="text-2xl font-bold">Settings</h2><p>System configuration options here.</p></div>`;
    }

    private attachSectionEventListeners(sectionId: string): void {
        // Add event listeners for section-specific actions
        console.log('Attached event listeners for section:', sectionId);
    }

    private logout(): void {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        window.location.href = 'admin-login.html';
    }
}

// ===== Initialize =====
let adminDashboard: AdminDashboardManager;

document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboardManager();
});

// ===== Export =====
export { AdminDashboardManager, AdminUser };
