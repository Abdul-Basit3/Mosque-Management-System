// ===== Lectures Manager =====
class LecturesManager {
    constructor() {
        this.lectures = [];
        this.gridElement = document.getElementById('lecturesGrid');
        this.init();
    }
    async init() {
        await this.fetchLectures();
        this.displayLectures();
    }
    async fetchLectures() {
        try {
            const response = await fetch('/api/lectures');
            if (response.ok) {
                const data = await response.json();
                this.lectures = data.data;
            }
            else {
                throw new Error('API not available');
            }
        }
        catch (error) {
            console.warn('Using fallback lecture data:', error);
            this.lectures = this.getFallbackLectures();
        }
    }
    getFallbackLectures() {
        return [
            {
                id: 1,
                title: 'Understanding Tawheed',
                speaker: 'Sheikh Abdullah',
                description: 'A comprehensive lecture on the concept of Islamic monotheism and its importance in the life of a Muslim.',
                thumbnail: 'images/lecture1.jpg',
                duration: '45 min',
                date: '2024-01-15'
            },
            {
                id: 2,
                title: 'The Importance of Salah',
                speaker: 'Imam Muhammad',
                description: 'Learn about the significance of the five daily prayers and how to perfect your prayer.',
                thumbnail: 'images/lecture2.jpg',
                duration: '38 min',
                date: '2024-01-20'
            },
            {
                id: 3,
                title: 'Ramadan: Month of Blessings',
                speaker: 'Sheikh Abdullah',
                description: 'Discover the spiritual significance of Ramadan and how to maximize its blessings.',
                thumbnail: 'images/ramadan.jpg',
                duration: '52 min',
                date: '2024-02-01'
            },
            {
                id: 4,
                title: 'The Life of Prophet Muhammad (PBUH)',
                speaker: 'Dr. Yusuf',
                description: 'An inspiring journey through the life and teachings of the final messenger.',
                thumbnail: 'images/seera.jpg',
                duration: '1 hr 15 min',
                date: '2024-02-10'
            }
        ];
    }
    displayLectures() {
        if (!this.gridElement)
            return;
        if (this.lectures.length === 0) {
            this.gridElement.innerHTML = '<p class="no-content">No lectures available at the moment.</p>';
            return;
        }
        this.gridElement.innerHTML = this.lectures
            .map(lecture => this.createLectureCard(lecture))
            .join('');
    }
    createLectureCard(lecture) {
        const formattedDate = this.formatDate(lecture.date);
        return `
            <div class="content-card card">
                <div class="content-image">
                    <img 
                        src="${this.escapeHtml(lecture.thumbnail)}" 
                        alt="${this.escapeHtml(lecture.title)}" 
                        onerror="this.src='images/lectures.jpg'"
                    >
                    <div class="content-duration">${this.escapeHtml(lecture.duration)}</div>
                </div>
                <div class="content-body">
                    <h3>${this.escapeHtml(lecture.title)}</h3>
                    <p class="content-meta">
                        <i class="fas fa-user"></i> ${this.escapeHtml(lecture.speaker)}
                        <span class="separator">•</span>
                        <i class="fas fa-calendar"></i> ${formattedDate}
                    </p>
                    <p class="content-description">${this.escapeHtml(lecture.description)}</p>
                    <button 
                        class="btn-primary" 
                        onclick="lecturesManager.playLecture(${lecture.id})"
                        aria-label="Watch ${this.escapeHtml(lecture.title)}"
                    >
                        <i class="fas fa-play"></i> Watch Now
                    </button>
                </div>
            </div>
        `;
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
    playLecture(id) {
        const lecture = this.lectures.find(l => l.id === id);
        if (lecture) {
            if (lecture.videoUrl) {
                window.open(lecture.videoUrl, '_blank');
            }
            else {
                alert(`Video player would open here for: ${lecture.title}`);
            }
        }
    }
    filterByCategory(category) {
        // Future implementation for filtering
        console.log('Filter by category:', category);
    }
    searchLectures(query) {
        const filtered = this.lectures.filter(lecture => lecture.title.toLowerCase().includes(query.toLowerCase()) ||
            lecture.speaker.toLowerCase().includes(query.toLowerCase()) ||
            lecture.description.toLowerCase().includes(query.toLowerCase()));
        this.lectures = filtered;
        this.displayLectures();
    }
}
// ===== Initialize =====
let lecturesManager;
document.addEventListener('DOMContentLoaded', () => {
    lecturesManager = new LecturesManager();
    // Make it globally accessible for onclick handlers
    window.lecturesManager = lecturesManager;
});
// ===== Export =====
export { LecturesManager };
//# sourceMappingURL=lectures.js.map