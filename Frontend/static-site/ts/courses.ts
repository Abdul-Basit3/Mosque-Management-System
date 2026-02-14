// ===== Type Definitions =====
interface Course {
    id: number;
    title: string;
    instructor: string;
    description: string;
    thumbnail: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
    lessons: number;
    enrolled?: number;
    startDate?: string;
}

interface APIResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// ===== Courses Manager =====
class CoursesManager {
    private courses: Course[] = [];
    private gridElement: HTMLElement | null;
    private filterCategory: string = 'all';

    constructor() {
        this.gridElement = document.getElementById('coursesGrid');
        this.init();
    }

    private async init(): Promise<void> {
        await this.fetchCourses();
        this.displayCourses();
        this.setupFilters();
    }

    private async fetchCourses(): Promise<void> {
        try {
            const response = await fetch('/api/courses');
            if (response.ok) {
                const data: APIResponse<Course[]> = await response.json();
                this.courses = data.data;
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.warn('Using fallback course data:', error);
            this.courses = this.getFallbackCourses();
        }
    }

    private getFallbackCourses(): Course[] {
        return [
            {
                id: 1,
                title: 'Arabic Language Basics',
                instructor: 'Ustadh Ahmed',
                description: 'Learn to read and write Arabic, the language of the Quran. Perfect for beginners.',
                thumbnail: 'images/arabic.jpg',
                duration: '8 weeks',
                level: 'Beginner',
                category: 'Language',
                lessons: 24,
                enrolled: 156
            },
            {
                id: 2,
                title: 'Tajweed Fundamentals',
                instructor: 'Sheikh Mahmoud',
                description: 'Master the rules of Quranic recitation with proper pronunciation and articulation.',
                thumbnail: 'images/tajweed.jpg',
                duration: '12 weeks',
                level: 'Intermediate',
                category: 'Quran',
                lessons: 36,
                enrolled: 203
            },
            {
                id: 3,
                title: 'Islamic Jurisprudence (Fiqh)',
                instructor: 'Dr. Abdullah',
                description: 'Comprehensive study of Islamic law covering worship, transactions, and daily life.',
                thumbnail: 'images/fiqh.jpg',
                duration: '16 weeks',
                level: 'Advanced',
                category: 'Fiqh',
                lessons: 48,
                enrolled: 89
            },
            {
                id: 4,
                title: 'Hadith Studies',
                instructor: 'Sheikh Yusuf',
                description: 'Study authentic Hadith collections and learn the science of Hadith authentication.',
                thumbnail: 'images/hadith.jpg',
                duration: '10 weeks',
                level: 'Intermediate',
                category: 'Hadith',
                lessons: 30,
                enrolled: 142
            },
            {
                id: 5,
                title: 'Prophetic Biography (Seerah)',
                instructor: 'Ustadh Ibrahim',
                description: 'Journey through the life of Prophet Muhammad (PBUH) and extract timeless lessons.',
                thumbnail: 'images/seera.jpg',
                duration: '14 weeks',
                level: 'Beginner',
                category: 'Seerah',
                lessons: 42,
                enrolled: 278
            },
            {
                id: 6,
                title: 'Islamic Finance & Economics',
                instructor: 'Dr. Fatima',
                description: 'Understanding Islamic principles of finance, banking, and economic transactions.',
                thumbnail: 'images/pro.jpg',
                duration: '6 weeks',
                level: 'Intermediate',
                category: 'Finance',
                lessons: 18,
                enrolled: 95
            }
        ];
    }

    private displayCourses(): void {
        if (!this.gridElement) return;

        const filteredCourses = this.filterCategory === 'all'
            ? this.courses
            : this.courses.filter(course => course.category === this.filterCategory);

        if (filteredCourses.length === 0) {
            this.gridElement.innerHTML = '<p class="no-content">No courses available in this category.</p>';
            return;
        }

        this.gridElement.innerHTML = filteredCourses
            .map(course => this.createCourseCard(course))
            .join('');
    }

    private createCourseCard(course: Course): string {
        const levelColor = this.getLevelColor(course.level);
        
        return `
            <div class="content-card card">
                <div class="content-image">
                    <img 
                        src="${this.escapeHtml(course.thumbnail)}" 
                        alt="${this.escapeHtml(course.title)}" 
                        onerror="this.src='images/pro.jpg'"
                    >
                    <div class="content-badge" style="background-color: ${levelColor}">
                        ${this.escapeHtml(course.level)}
                    </div>
                </div>
                <div class="content-body">
                    <div class="course-category">${this.escapeHtml(course.category)}</div>
                    <h3>${this.escapeHtml(course.title)}</h3>
                    <p class="content-meta">
                        <i class="fas fa-chalkboard-teacher"></i> ${this.escapeHtml(course.instructor)}
                    </p>
                    <p class="content-description">${this.escapeHtml(course.description)}</p>
                    <div class="course-stats">
                        <span><i class="fas fa-clock"></i> ${this.escapeHtml(course.duration)}</span>
                        <span><i class="fas fa-book"></i> ${course.lessons} lessons</span>
                        ${course.enrolled ? `<span><i class="fas fa-users"></i> ${course.enrolled} enrolled</span>` : ''}
                    </div>
                    <button 
                        class="btn-primary" 
                        onclick="coursesManager.enrollCourse(${course.id})"
                        aria-label="Enroll in ${this.escapeHtml(course.title)}"
                    >
                        <i class="fas fa-graduation-cap"></i> Enroll Now
                    </button>
                </div>
            </div>
        `;
    }

    private getLevelColor(level: string): string {
        const colors: Record<string, string> = {
            'Beginner': '#10b981',
            'Intermediate': '#f59e0b',
            'Advanced': '#ef4444'
        };
        return colors[level] || '#6b7280';
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    private setupFilters(): void {
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const filter = target.getAttribute('data-filter');
                if (filter) {
                    this.setFilter(filter);
                }
            });
        });
    }

    public setFilter(category: string): void {
        this.filterCategory = category;
        this.displayCourses();
        
        // Update active filter button
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${category}"]`)?.classList.add('active');
    }

    public enrollCourse(id: number): void {
        const course = this.courses.find(c => c.id === id);
        if (course) {
            alert(`Enrollment form would open here for: ${course.title}\n\nPlease contact us to enroll in this course.`);
            // In production, this would open a modal or redirect to enrollment page
        }
    }

    public searchCourses(query: string): void {
        const filtered = this.courses.filter(course =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.instructor.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.category.toLowerCase().includes(query.toLowerCase())
        );
        
        this.courses = filtered;
        this.displayCourses();
    }

    public sortCourses(sortBy: 'title' | 'duration' | 'enrolled'): void {
        switch (sortBy) {
            case 'title':
                this.courses.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'enrolled':
                this.courses.sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0));
                break;
            case 'duration':
                this.courses.sort((a, b) => a.duration.localeCompare(b.duration));
                break;
        }
        this.displayCourses();
    }
}

// ===== Initialize =====
let coursesManager: CoursesManager;

document.addEventListener('DOMContentLoaded', () => {
    coursesManager = new CoursesManager();
    // Make it globally accessible for onclick handlers
    (window as any).coursesManager = coursesManager;
});

// ===== Export =====
export { CoursesManager, Course };

