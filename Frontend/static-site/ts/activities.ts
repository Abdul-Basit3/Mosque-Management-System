// ===== Type Definitions =====
interface Activity {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    date: string;
    time?: string;
    location: string;
    organizer: string;
    capacity?: number;
    registered?: number;
    status: 'Upcoming' | 'Ongoing' | 'Completed';
}

interface APIResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// ===== Activities Manager =====
class ActivitiesManager {
    private activities: Activity[] = [];
    private gridElement: HTMLElement | null;
    private filterCategory: string = 'all';

    constructor() {
        this.gridElement = document.getElementById('activitiesGrid');
        this.init();
    }

    private async init(): Promise<void> {
        await this.fetchActivities();
        this.displayActivities();
    }

    private async fetchActivities(): Promise<void> {
        try {
            const response = await fetch('/api/activities');
            if (response.ok) {
                const data: APIResponse<Activity[]> = await response.json();
                this.activities = data.data;
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.warn('Using fallback activity data:', error);
            this.activities = this.getFallbackActivities();
        }
    }

    private getFallbackActivities(): Activity[] {
        return [
            {
                id: 1,
                title: 'Friday Jummah Prayer',
                description: 'Weekly congregational Friday prayer with khutbah (sermon) on contemporary Islamic topics.',
                thumbnail: 'images/salah.jpg',
                category: 'Worship',
                date: '2024-02-16',
                time: '13:00',
                location: 'Main Prayer Hall',
                organizer: 'Imam Muhammad',
                status: 'Upcoming'
            },
            {
                id: 2,
                title: 'Islamic Quiz Competition',
                description: 'Test your knowledge of Islam in this exciting quiz competition with prizes for winners.',
                thumbnail: 'images/quiz.jpg',
                category: 'Education',
                date: '2024-02-20',
                time: '15:00',
                location: 'Community Hall',
                organizer: 'Youth Committee',
                capacity: 100,
                registered: 67,
                status: 'Upcoming'
            },
            {
                id: 3,
                title: 'Community Iftar',
                description: 'Join us for a communal breaking of fast during Ramadan. All are welcome!',
                thumbnail: 'images/ramadan.jpg',
                category: 'Social',
                date: '2024-03-15',
                time: '18:30',
                location: 'Mosque Courtyard',
                organizer: 'Community Service Team',
                capacity: 200,
                registered: 145,
                status: 'Upcoming'
            },
            {
                id: 4,
                title: 'Islamic Seminar: Youth & Technology',
                description: 'Exploring the challenges and opportunities of technology for Muslim youth in the modern world.',
                thumbnail: 'images/seminar.jpg',
                category: 'Seminar',
                date: '2024-02-25',
                time: '14:00',
                location: 'Conference Room',
                organizer: 'Dr. Abdullah',
                capacity: 80,
                registered: 52,
                status: 'Upcoming'
            },
            {
                id: 5,
                title: 'Quran Recitation Competition',
                description: 'Annual Quran recitation competition showcasing beautiful recitations by community members.',
                thumbnail: 'images/dua.jpg',
                category: 'Competition',
                date: '2024-03-01',
                time: '16:00',
                location: 'Main Hall',
                organizer: 'Quran Committee',
                capacity: 150,
                registered: 89,
                status: 'Upcoming'
            },
            {
                id: 6,
                title: 'Football Tournament',
                description: 'Inter-community football tournament promoting fitness, teamwork, and brotherhood.',
                thumbnail: 'images/football.jpg',
                category: 'Sports',
                date: '2024-02-18',
                time: '09:00',
                location: 'UDS Sports Ground',
                organizer: 'Sports Committee',
                capacity: 200,
                registered: 156,
                status: 'Upcoming'
            },
            {
                id: 7,
                title: 'Women\'s Islamic Circle',
                description: 'Monthly gathering for sisters to discuss Islamic topics, share experiences, and build community.',
                thumbnail: 'images/wocom.jpg',
                category: 'Social',
                date: '2024-02-22',
                time: '15:00',
                location: 'Women\'s Section',
                organizer: 'Sister Aisha',
                capacity: 50,
                registered: 38,
                status: 'Upcoming'
            },
            {
                id: 8,
                title: 'Charity Drive',
                description: 'Collecting donations and organizing distribution of essential items to those in need.',
                thumbnail: 'images/extend.jpg',
                category: 'Charity',
                date: '2024-02-28',
                time: '10:00',
                location: 'Community Center',
                organizer: 'Charity Committee',
                status: 'Upcoming'
            }
        ];
    }

    private displayActivities(): void {
        if (!this.gridElement) return;

        const filteredActivities = this.filterCategory === 'all'
            ? this.activities
            : this.activities.filter(activity => activity.category === this.filterCategory);

        // Sort by date (upcoming first)
        const sortedActivities = filteredActivities.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        if (sortedActivities.length === 0) {
            this.gridElement.innerHTML = '<p class="no-content">No activities available in this category.</p>';
            return;
        }

        this.gridElement.innerHTML = sortedActivities
            .map(activity => this.createActivityCard(activity))
            .join('');
    }

    private createActivityCard(activity: Activity): string {
        const statusColor = this.getStatusColor(activity.status);
        const spotsLeft = activity.capacity && activity.registered 
            ? activity.capacity - activity.registered 
            : null;
        
        return `
            <div class="content-card card">
                <div class="content-image">
                    <img 
                        src="${this.escapeHtml(activity.thumbnail)}" 
                        alt="${this.escapeHtml(activity.title)}" 
                        onerror="this.src='images/pro.jpg'"
                    >
                    <div class="content-badge" style="background-color: ${statusColor}">
                        ${this.escapeHtml(activity.status)}
                    </div>
                </div>
                <div class="content-body">
                    <div class="activity-category">${this.escapeHtml(activity.category)}</div>
                    <h3>${this.escapeHtml(activity.title)}</h3>
                    <p class="content-description">${this.escapeHtml(activity.description)}</p>
                    
                    <div class="activity-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(activity.date)}</span>
                        </div>
                        ${activity.time ? `
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>${this.escapeHtml(activity.time)}</span>
                            </div>
                        ` : ''}
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${this.escapeHtml(activity.location)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-user"></i>
                            <span>${this.escapeHtml(activity.organizer)}</span>
                        </div>
                    </div>
                    
                    ${activity.capacity && activity.registered ? `
                        <div class="activity-capacity">
                            <div class="capacity-info">
                                <span>${activity.registered} registered</span>
                                ${spotsLeft !== null && spotsLeft > 0 ? `
                                    <span class="spots-left">${spotsLeft} spots left</span>
                                ` : spotsLeft === 0 ? `
                                    <span class="spots-full">Full</span>
                                ` : ''}
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(activity.registered / activity.capacity) * 100}%"></div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <button 
                        class="btn-primary ${spotsLeft === 0 ? 'disabled' : ''}" 
                        onclick="activitiesManager.registerActivity(${activity.id})"
                        ${spotsLeft === 0 ? 'disabled' : ''}
                        aria-label="Register for ${this.escapeHtml(activity.title)}"
                    >
                        <i class="fas fa-calendar-check"></i> 
                        ${spotsLeft === 0 ? 'Full' : 'Register Now'}
                    </button>
                </div>
            </div>
        `;
    }

    private getStatusColor(status: string): string {
        const colors: Record<string, string> = {
            'Upcoming': '#10b981',
            'Ongoing': '#f59e0b',
            'Completed': '#6b7280'
        };
        return colors[status] || '#6b7280';
    }

    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    public filterByCategory(category: string): void {
        this.filterCategory = category;
        this.displayActivities();
    }

    public registerActivity(id: number): void {
        const activity = this.activities.find(a => a.id === id);
        if (activity) {
            const spotsLeft = activity.capacity && activity.registered 
                ? activity.capacity - activity.registered 
                : null;
            
            if (spotsLeft === 0) {
                alert('Sorry, this activity is full.');
                return;
            }
            
            alert(`Registration form would open here for: ${activity.title}\n\nDate: ${this.formatDate(activity.date)}\nLocation: ${activity.location}`);
            // In production, this would open a registration form
        }
    }

    public searchActivities(query: string): void {
        const filtered = this.activities.filter(activity =>
            activity.title.toLowerCase().includes(query.toLowerCase()) ||
            activity.description.toLowerCase().includes(query.toLowerCase()) ||
            activity.category.toLowerCase().includes(query.toLowerCase()) ||
            activity.location.toLowerCase().includes(query.toLowerCase())
        );
        
        this.activities = filtered;
        this.displayActivities();
    }
}

// ===== Initialize =====
let activitiesManager: ActivitiesManager;

document.addEventListener('DOMContentLoaded', () => {
    activitiesManager = new ActivitiesManager();
    // Make it globally accessible for onclick handlers
    (window as any).activitiesManager = activitiesManager;
});

// ===== Export =====
export { ActivitiesManager, Activity };

