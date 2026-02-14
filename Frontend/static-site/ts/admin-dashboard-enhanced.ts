// ===== Type Definitions =====
interface DashboardStats {
    totalLectures: number;
    totalCourses: number;
    totalProjects: number;
    totalActivities: number;
    totalExecutives: number;
    totalFAQs: number;
}

interface PrayerTime {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    location: string;
}

// ===== Enhanced Admin Dashboard Manager =====
class EnhancedAdminDashboard {
    private currentSection: string = 'overview';
    private stats: DashboardStats;
    private contentElement: HTMLElement | null;

    constructor() {
        this.contentElement = document.getElementById('adminContent');
        this.stats = this.initializeStats();
        this.init();
    }

    private init(): void {
        this.setupNavigation();
        this.setupLogout();
        this.setupMobileMenu();
        this.loadSection('overview');
    }

    private initializeStats(): DashboardStats {
        return {
            totalLectures: 4,
            totalCourses: 6,
            totalProjects: 6,
            totalActivities: 8,
            totalExecutives: 8,
            totalFAQs: 15
        };
    }

    private setupNavigation(): void {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    this.loadSection(section);
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }

    private setupLogout(): void {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('adminToken');
                    window.location.href = 'admin-login.html';
                }
            });
        }
    }

    private setupMobileMenu(): void {
        const toggleBtn = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('adminSidebar');
        
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    }

    public loadSection(section: string): void {
        this.currentSection = section;
        const pageTitle = document.getElementById('pageTitle');
        
        if (!this.contentElement) return;

        switch (section) {
            case 'overview':
                if (pageTitle) pageTitle.textContent = 'Overview';
                this.renderOverview();
                break;
            case 'all-management':
                if (pageTitle) pageTitle.textContent = 'All Activities';
                this.renderAllManagement();
                break;
            case 'prayer-times':
                if (pageTitle) pageTitle.textContent = 'Prayer Times Management';
                this.renderPrayerTimesManagement();
                break;
            case 'lectures':
                if (pageTitle) pageTitle.textContent = 'Lectures Management';
                this.renderLecturesManagement();
                break;
            case 'courses':
                if (pageTitle) pageTitle.textContent = 'Courses Management';
                this.renderCoursesManagement();
                break;
            case 'projects':
                if (pageTitle) pageTitle.textContent = 'Projects Management';
                this.renderProjectsManagement();
                break;
            case 'activities':
                if (pageTitle) pageTitle.textContent = 'Activities Management';
                this.renderActivitiesManagement();
                break;
            case 'executives':
                if (pageTitle) pageTitle.textContent = 'Executives Management';
                this.renderExecutivesManagement();
                break;
            case 'faqs':
                if (pageTitle) pageTitle.textContent = 'FAQs Management';
                this.renderFAQsManagement();
                break;
            case 'settings':
                if (pageTitle) pageTitle.textContent = 'Settings';
                this.renderSettings();
                break;
        }
    }

    private renderOverview(): void {
        if (!this.contentElement) return;

        this.contentElement.innerHTML = `
            <div class="dashboard-overview">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon lectures">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${this.stats.totalLectures}</h3>
                            <p>Total Lectures</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon courses">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${this.stats.totalCourses}</h3>
                            <p>Total Courses</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon projects">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${this.stats.totalProjects}</h3>
                            <p>Total Projects</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon activities">
                            <i class="fas fa-calendar"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${this.stats.totalActivities}</h3>
                            <p>Total Activities</p>
                        </div>
                    </div>
                </div>

                <div class="charts-grid">
                    <div class="chart-card">
                        <h3>Content Distribution</h3>
                        <canvas id="contentChart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h3>Recent Activity</h3>
                        <div class="activity-list">
                            <div class="activity-item">
                                <i class="fas fa-plus-circle"></i>
                                <span>New lecture added</span>
                                <small>2 hours ago</small>
                            </div>
                            <div class="activity-item">
                                <i class="fas fa-edit"></i>
                                <span>Course updated</span>
                                <small>5 hours ago</small>
                            </div>
                            <div class="activity-item">
                                <i class="fas fa-trash"></i>
                                <span>Activity removed</span>
                                <small>1 day ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private renderPrayerTimesManagement(): void {
        if (!this.contentElement) return;

        const currentPrayerTimes = {
            fajr: '04:45',
            sunrise: '05:55',
            dhuhr: '12:05',
            asr: '15:25',
            maghrib: '18:15',
            isha: '19:25',
            location: 'Accra, Ghana'
        };

        this.contentElement.innerHTML = `
            <div class="management-section">
                <div class="section-header">
                    <h2>Prayer Times Management</h2>
                    <button class="btn-primary" onclick="adminDashboard.savePrayerTimes()">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                </div>

                <div class="prayer-times-form">
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" id="location" value="${currentPrayerTimes.location}" class="form-control">
                    </div>

                    <div class="prayer-times-grid">
                        <div class="form-group">
                            <label for="fajr">Fajr</label>
                            <input type="time" id="fajr" value="${currentPrayerTimes.fajr}" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="sunrise">Sunrise</label>
                            <input type="time" id="sunrise" value="${currentPrayerTimes.sunrise}" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="dhuhr">Dhuhr</label>
                            <input type="time" id="dhuhr" value="${currentPrayerTimes.dhuhr}" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="asr">Asr</label>
                            <input type="time" id="asr" value="${currentPrayerTimes.asr}" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="maghrib">Maghrib</label>
                            <input type="time" id="maghrib" value="${currentPrayerTimes.maghrib}" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="isha">Isha</label>
                            <input type="time" id="isha" value="${currentPrayerTimes.isha}" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    public savePrayerTimes(): void {
        const prayerTimes = {
            location: (document.getElementById('location') as HTMLInputElement)?.value,
            fajr: (document.getElementById('fajr') as HTMLInputElement)?.value,
            sunrise: (document.getElementById('sunrise') as HTMLInputElement)?.value,
            dhuhr: (document.getElementById('dhuhr') as HTMLInputElement)?.value,
            asr: (document.getElementById('asr') as HTMLInputElement)?.value,
            maghrib: (document.getElementById('maghrib') as HTMLInputElement)?.value,
            isha: (document.getElementById('isha') as HTMLInputElement)?.value
        };

        // Save to localStorage for now
        localStorage.setItem('prayerTimes', JSON.stringify(prayerTimes));
        alert('Prayer times updated successfully!');
    }

    private renderLecturesManagement(): void {
        if (!this.contentElement) return;

        const lectures = JSON.parse(localStorage.getItem('lectures') || '[]');

        this.contentElement.innerHTML = `
            <div class="management-section">
                <div class="section-header">
                    <h2>Lectures Management</h2>
                    <button class="btn-primary" onclick="adminDashboard.showAddLectureForm()">
                        <i class="fas fa-plus"></i> Add New Lecture
                    </button>
                </div>

                <div id="lectureFormContainer"></div>

                <div class="content-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Speaker</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="lecturesTableBody">
                            ${lectures.length === 0 ? '<tr><td colspan="5">No lectures found</td></tr>' : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.loadLecturesTable();
    }

    private loadLecturesTable(): void {
        const tbody = document.getElementById('lecturesTableBody');
        if (!tbody) return;

        const lectures = JSON.parse(localStorage.getItem('lectures') || '[]');
        
        if (lectures.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No lectures found</td></tr>';
            return;
        }

        tbody.innerHTML = lectures.map((lecture: any, index: number) => `
            <tr>
                <td>${lecture.title}</td>
                <td>${lecture.speaker}</td>
                <td>${lecture.duration}</td>
                <td>${lecture.date}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="adminDashboard.editLecture(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="adminDashboard.deleteLecture(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    public showAddLectureForm(): void {
        const container = document.getElementById('lectureFormContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="form-modal">
                <div class="form-card">
                    <h3>Add New Lecture</h3>
                    <form id="lectureForm">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" name="title" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Speaker</label>
                            <input type="text" name="speaker" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" required class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Duration</label>
                                <input type="text" name="duration" placeholder="45 min" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Date</label>
                                <input type="date" name="date" required class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Thumbnail URL</label>
                            <input type="text" name="thumbnail" placeholder="images/lecture.jpg" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Video URL (optional)</label>
                            <input type="url" name="videoUrl" class="form-control">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="adminDashboard.closeForm()">Cancel</button>
                            <button type="submit" class="btn-primary">Save Lecture</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const form = document.getElementById('lectureForm');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLecture(new FormData(form as HTMLFormElement));
        });
    }

    private saveLecture(formData: FormData): void {
        const lectures = JSON.parse(localStorage.getItem('lectures') || '[]');
        
        const newLecture = {
            id: Date.now(),
            title: formData.get('title'),
            speaker: formData.get('speaker'),
            description: formData.get('description'),
            duration: formData.get('duration'),
            date: formData.get('date'),
            thumbnail: formData.get('thumbnail') || 'images/lectures.jpg',
            videoUrl: formData.get('videoUrl')
        };

        lectures.push(newLecture);
        localStorage.setItem('lectures', JSON.stringify(lectures));
        
        this.closeForm();
        this.loadLecturesTable();
        alert('Lecture added successfully!');
    }

    public deleteLecture(index: number): void {
        if (!confirm('Are you sure you want to delete this lecture?')) return;

        const lectures = JSON.parse(localStorage.getItem('lectures') || '[]');
        lectures.splice(index, 1);
        localStorage.setItem('lectures', JSON.stringify(lectures));
        
        this.loadLecturesTable();
        alert('Lecture deleted successfully!');
    }

    public closeForm(): void {
        const container = document.getElementById('lectureFormContainer');
        if (container) container.innerHTML = '';
    }

    // Similar CRUD methods for other content types
    private renderCoursesManagement(): void {
        this.renderGenericManagement('courses', 'Courses', [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'instructor', label: 'Instructor', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'duration', label: 'Duration', type: 'text' },
            { name: 'level', label: 'Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'lessons', label: 'Number of Lessons', type: 'number' },
            { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' }
        ]);
    }

    private renderProjectsManagement(): void {
        this.renderGenericManagement('projects', 'Projects', [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Upcoming', 'Completed'] },
            { name: 'goal', label: 'Funding Goal', type: 'number' },
            { name: 'raised', label: 'Amount Raised', type: 'number' },
            { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' }
        ]);
    }

    private renderActivitiesManagement(): void {
        this.renderGenericManagement('activities', 'Activities', [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'date', label: 'Date', type: 'date' },
            { name: 'time', label: 'Time', type: 'time' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'organizer', label: 'Organizer', type: 'text' },
            { name: 'capacity', label: 'Capacity', type: 'number' },
            { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' }
        ]);
    }

    private renderExecutivesManagement(): void {
        this.renderGenericManagement('executives', 'Executives', [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'position', label: 'Position', type: 'text' },
            { name: 'bio', label: 'Biography', type: 'textarea' },
            { name: 'department', label: 'Department', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'photo', label: 'Photo URL', type: 'text' }
        ]);
    }

    private renderFAQsManagement(): void {
        this.renderGenericManagement('faqs', 'FAQs', [
            { name: 'question', label: 'Question', type: 'text' },
            { name: 'answer', label: 'Answer', type: 'textarea' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'order', label: 'Display Order', type: 'number' }
        ]);
    }

    private renderAllManagement(): void {
        if (!this.contentElement) return;

        this.contentElement.innerHTML = `
            <div class="all-management">
                <div class="quick-actions-grid">
                    <div class="quick-action-card" onclick="adminDashboard.loadSection('lectures')">
                        <i class="fas fa-video"></i>
                        <h3>Manage Lectures</h3>
                        <p>${this.stats.totalLectures} items</p>
                    </div>
                    <div class="quick-action-card" onclick="adminDashboard.loadSection('courses')">
                        <i class="fas fa-book"></i>
                        <h3>Manage Courses</h3>
                        <p>${this.stats.totalCourses} items</p>
                    </div>
                    <div class="quick-action-card" onclick="adminDashboard.loadSection('projects')">
                        <i class="fas fa-project-diagram"></i>
                        <h3>Manage Projects</h3>
                        <p>${this.stats.totalProjects} items</p>
                    </div>
                    <div class="quick-action-card" onclick="adminDashboard.loadSection('activities')">
                        <i class="fas fa-calendar"></i>
                        <h3>Manage Activities</h3>
                        <p>${this.stats.totalActivities} items</p>
                    </div>
                    <div class="quick-action-card" onclick="adminDashboard.loadSection('executives')">
                        <i class="fas fa-users"></i>
                        <h3>Manage Executives</h3>
                        <p>${this.stats.totalExecutives} items</p>
                    </div>
                    <div class="quick-action-card" onclick="adminDashboard.loadSection('faqs')">
                        <i class="fas fa-question-circle"></i>
                        <h3>Manage FAQs</h3>
                        <p>${this.stats.totalFAQs} items</p>
                    </div>
                </div>
            </div>
        `;
    }

    private renderSettings(): void {
        if (!this.contentElement) return;

        this.contentElement.innerHTML = `
            <div class="settings-section">
                <h2>Settings</h2>
                <div class="settings-card">
                    <h3>Site Configuration</h3>
                    <p>Configure site-wide settings and preferences.</p>
                    <button class="btn-primary">Configure</button>
                </div>
            </div>
        `;
    }

    private renderGenericManagement(type: string, title: string, fields: any[]): void {
        if (!this.contentElement) return;

        const items = JSON.parse(localStorage.getItem(type) || '[]');

        this.contentElement.innerHTML = `
            <div class="management-section">
                <div class="section-header">
                    <h2>${title} Management</h2>
                    <button class="btn-primary" onclick="adminDashboard.showAddForm('${type}', ${JSON.stringify(fields).replace(/"/g, '&quot;')})">
                        <i class="fas fa-plus"></i> Add New
                    </button>
                </div>

                <div id="formContainer"></div>

                <div class="content-table">
                    <table>
                        <thead>
                            <tr>
                                ${fields.slice(0, 4).map(f => `<th>${f.label}</th>`).join('')}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            ${items.length === 0 ? `<tr><td colspan="${fields.length + 1}">No ${type} found</td></tr>` : 
                                items.map((item: any, index: number) => `
                                    <tr>
                                        ${fields.slice(0, 4).map(f => `<td>${item[f.name] || '-'}</td>`).join('')}
                                        <td class="action-buttons">
                                            <button class="btn-edit" onclick="adminDashboard.editItem('${type}', ${index})">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn-delete" onclick="adminDashboard.deleteItem('${type}', ${index})">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    public showAddForm(type: string, fields: any[]): void {
        const container = document.getElementById('formContainer');
        if (!container) return;

        const fieldsHTML = fields.map(field => {
            if (field.type === 'textarea') {
                return `
                    <div class="form-group">
                        <label>${field.label}</label>
                        <textarea name="${field.name}" class="form-control" rows="3"></textarea>
                    </div>
                `;
            } else if (field.type === 'select') {
                return `
                    <div class="form-group">
                        <label>${field.label}</label>
                        <select name="${field.name}" class="form-control">
                            ${field.options.map((opt: string) => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else {
                return `
                    <div class="form-group">
                        <label>${field.label}</label>
                        <input type="${field.type}" name="${field.name}" class="form-control">
                    </div>
                `;
            }
        }).join('');

        container.innerHTML = `
            <div class="form-modal">
                <div class="form-card">
                    <h3>Add New Item</h3>
                    <form id="genericForm">
                        ${fieldsHTML}
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="adminDashboard.closeGenericForm()">Cancel</button>
                            <button type="submit" class="btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const form = document.getElementById('genericForm');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveItem(type, new FormData(form as HTMLFormElement));
        });
    }

    private saveItem(type: string, formData: FormData): void {
        const items = JSON.parse(localStorage.getItem(type) || '[]');
        
        const newItem: any = { id: Date.now() };
        formData.forEach((value, key) => {
            newItem[key] = value;
        });

        items.push(newItem);
        localStorage.setItem(type, JSON.stringify(items));
        
        this.closeGenericForm();
        this.loadSection(type);
        alert('Item added successfully!');
    }

    public deleteItem(type: string, index: number): void {
        if (!confirm('Are you sure you want to delete this item?')) return;

        const items = JSON.parse(localStorage.getItem(type) || '[]');
        items.splice(index, 1);
        localStorage.setItem(type, JSON.stringify(items));
        
        this.loadSection(type);
        alert('Item deleted successfully!');
    }

    public editItem(type: string, index: number): void {
        alert('Edit functionality coming soon!');
    }

    public closeGenericForm(): void {
        const container = document.getElementById('formContainer');
        if (container) container.innerHTML = '';
    }
}

// ===== Initialize =====
let adminDashboard: EnhancedAdminDashboard;

document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new EnhancedAdminDashboard();
    (window as any).adminDashboard = adminDashboard;
});

export { EnhancedAdminDashboard };
