// ===== Type Definitions =====
interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    order?: number;
}

interface APIResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// ===== FAQ Manager =====
class FAQManager {
    private faqs: FAQ[] = [];
    private containerElement: HTMLElement | null;
    private filterCategory: string = 'all';

    constructor() {
        this.containerElement = document.getElementById('faqContainer');
        this.init();
    }

    private async init(): Promise<void> {
        await this.fetchFAQs();
        this.displayFAQs();
        this.setupSearch();
    }

    private async fetchFAQs(): Promise<void> {
        try {
            const response = await fetch('/api/faqs');
            if (response.ok) {
                const data: APIResponse<FAQ[]> = await response.json();
                this.faqs = data.data;
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.warn('Using fallback FAQ data:', error);
            this.faqs = this.getFallbackFAQs();
        }
    }

    private getFallbackFAQs(): FAQ[] {
        return [
            {
                id: 1,
                question: 'What are the prayer times?',
                answer: 'Prayer times are displayed on the home page and are updated daily based on the Islamic calendar and local time zone. You can also subscribe to receive daily prayer time notifications.',
                category: 'Prayer',
                order: 1
            },
            {
                id: 2,
                question: 'How can I enroll in courses?',
                answer: 'Visit the Courses page to see available courses. You can enroll by clicking the "Enroll Now" button on any course card, or contact us directly through the provided contact information. Registration is open throughout the year.',
                category: 'Education',
                order: 2
            },
            {
                id: 3,
                question: 'Are the lectures free to watch?',
                answer: 'Yes, all our Islamic lectures are freely available to watch and share for educational purposes. We believe in making Islamic knowledge accessible to everyone.',
                category: 'Lectures',
                order: 3
            },
            {
                id: 4,
                question: 'How can I contribute to community projects?',
                answer: 'You can support our projects through donations or volunteering. Visit the Projects page for more information about ongoing initiatives. We also accept Zakat and Sadaqah contributions.',
                category: 'Community',
                order: 4
            },
            {
                id: 5,
                question: 'Is the mosque open to visitors?',
                answer: 'Yes, our mosque welcomes all visitors. The mosque is open for the five daily prayers and special programs. Please check our contact information for visiting hours and guidelines.',
                category: 'General',
                order: 5
            },
            {
                id: 6,
                question: 'Do you offer Arabic language classes?',
                answer: 'Yes, we offer Arabic language classes for beginners and intermediate learners. Classes are held twice a week and cover reading, writing, and basic conversation. Check the Courses page for enrollment details.',
                category: 'Education',
                order: 6
            },
            {
                id: 7,
                question: 'How can I register for activities?',
                answer: 'You can register for activities by visiting the Activities page and clicking the "Register Now" button on any event. Some activities have limited capacity, so early registration is recommended.',
                category: 'Activities',
                order: 7
            },
            {
                id: 8,
                question: 'Is there a women\'s section?',
                answer: 'Yes, we have a dedicated women\'s section with separate prayer area and facilities. We also organize regular programs and activities specifically for sisters in the community.',
                category: 'Facilities',
                order: 8
            },
            {
                id: 9,
                question: 'Do you provide Islamic counseling services?',
                answer: 'Yes, our Imam and qualified counselors are available for Islamic guidance and counseling. Please contact us to schedule an appointment.',
                category: 'Services',
                order: 9
            },
            {
                id: 10,
                question: 'How can I make a donation?',
                answer: 'Donations can be made in person at the mosque, through bank transfer, or via our online donation portal. All donations are tax-deductible and receipts are provided. Contact our treasurer for more details.',
                category: 'Donations',
                order: 10
            },
            {
                id: 11,
                question: 'Are there programs for youth?',
                answer: 'Yes, we have various youth programs including Islamic education classes, sports activities, quiz competitions, and social events. Visit the Activities page to see upcoming youth programs.',
                category: 'Youth',
                order: 11
            },
            {
                id: 12,
                question: 'Do you organize Hajj and Umrah trips?',
                answer: 'Yes, we organize group Hajj and Umrah trips annually. These trips include guidance from experienced scholars and all necessary arrangements. Contact us for upcoming trip schedules and registration.',
                category: 'Services',
                order: 12
            },
            {
                id: 13,
                question: 'Is parking available?',
                answer: 'Yes, we have parking facilities available for worshippers and visitors. Additional parking is available during Friday prayers and special events.',
                category: 'Facilities',
                order: 13
            },
            {
                id: 14,
                question: 'How can I volunteer?',
                answer: 'We welcome volunteers for various activities including teaching, event organization, maintenance, and community outreach. Contact our volunteer coordinator or visit the Projects page to see current volunteer opportunities.',
                category: 'Community',
                order: 14
            },
            {
                id: 15,
                question: 'Do you offer marriage services?',
                answer: 'Yes, our Imam can officiate Islamic marriage ceremonies (Nikah). We also provide pre-marital counseling and guidance. Please contact us at least two weeks in advance to schedule.',
                category: 'Services',
                order: 15
            }
        ];
    }

    private displayFAQs(): void {
        if (!this.containerElement) return;

        const filteredFAQs = this.filterCategory === 'all'
            ? this.faqs
            : this.faqs.filter(faq => faq.category === this.filterCategory);

        // Sort by order if available
        const sortedFAQs = filteredFAQs.sort((a, b) => (a.order || 0) - (b.order || 0));

        if (sortedFAQs.length === 0) {
            this.containerElement.innerHTML = '<p class="no-content">No FAQs available in this category.</p>';
            return;
        }

        // Group by category
        const grouped = this.groupByCategory(sortedFAQs);
        
        this.containerElement.innerHTML = Object.entries(grouped)
            .map(([category, faqs]) => this.createCategorySection(category, faqs))
            .join('');
    }

    private groupByCategory(faqs: FAQ[]): Record<string, FAQ[]> {
        return faqs.reduce((acc, faq) => {
            if (!acc[faq.category]) {
                acc[faq.category] = [];
            }
            acc[faq.category].push(faq);
            return acc;
        }, {} as Record<string, FAQ[]>);
    }

    private createCategorySection(category: string, faqs: FAQ[]): string {
        return `
            <div class="faq-category-section">
                <h2 class="faq-category-title">
                    <i class="fas fa-folder"></i>
                    ${this.escapeHtml(category)}
                </h2>
                ${faqs.map((faq, index) => this.createFAQItem(faq, index)).join('')}
            </div>
        `;
    }

    private createFAQItem(faq: FAQ, index: number): string {
        return `
            <div class="faq-item card">
                <button 
                    class="faq-question" 
                    onclick="faqManager.toggleFAQ(${faq.id})" 
                    aria-expanded="false"
                    aria-controls="faq-answer-${faq.id}"
                    id="faq-question-${faq.id}"
                >
                    <span>${this.escapeHtml(faq.question)}</span>
                    <i class="fas fa-chevron-down faq-icon" id="faq-icon-${faq.id}"></i>
                </button>
                <div 
                    class="faq-answer" 
                    id="faq-answer-${faq.id}"
                    role="region"
                    aria-labelledby="faq-question-${faq.id}"
                >
                    <p>${this.escapeHtml(faq.answer)}</p>
                    <span class="faq-category-badge">${this.escapeHtml(faq.category)}</span>
                </div>
            </div>
        `;
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    private setupSearch(): void {
        const searchInput = document.getElementById('faqSearch') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = (e.target as HTMLInputElement).value;
                this.searchFAQs(query);
            });
        }
    }

    public toggleFAQ(id: number): void {
        const answer = document.getElementById(`faq-answer-${id}`);
        const button = document.getElementById(`faq-question-${id}`);
        const icon = document.getElementById(`faq-icon-${id}`);
        
        if (!answer || !button || !icon) return;
        
        const isOpen = answer.classList.contains('open');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('open');
        });
        document.querySelectorAll('.faq-icon').forEach(item => {
            (item as HTMLElement).style.transform = 'rotate(0deg)';
        });
        document.querySelectorAll('.faq-question').forEach(item => {
            item.setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current FAQ
        if (!isOpen) {
            answer.classList.add('open');
            icon.style.transform = 'rotate(180deg)';
            button.setAttribute('aria-expanded', 'true');
            
            // Smooth scroll to FAQ
            answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    public filterByCategory(category: string): void {
        this.filterCategory = category;
        this.displayFAQs();
    }

    public searchFAQs(query: string): void {
        if (!query.trim()) {
            this.displayFAQs();
            return;
        }

        const filtered = this.faqs.filter(faq =>
            faq.question.toLowerCase().includes(query.toLowerCase()) ||
            faq.answer.toLowerCase().includes(query.toLowerCase()) ||
            faq.category.toLowerCase().includes(query.toLowerCase())
        );
        
        const originalFAQs = this.faqs;
        this.faqs = filtered;
        this.displayFAQs();
        this.faqs = originalFAQs;
    }

    public expandAll(): void {
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.add('open');
        });
        document.querySelectorAll('.faq-icon').forEach(item => {
            (item as HTMLElement).style.transform = 'rotate(180deg)';
        });
        document.querySelectorAll('.faq-question').forEach(item => {
            item.setAttribute('aria-expanded', 'true');
        });
    }

    public collapseAll(): void {
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('open');
        });
        document.querySelectorAll('.faq-icon').forEach(item => {
            (item as HTMLElement).style.transform = 'rotate(0deg)';
        });
        document.querySelectorAll('.faq-question').forEach(item => {
            item.setAttribute('aria-expanded', 'false');
        });
    }
}

// ===== Initialize =====
let faqManager: FAQManager;

document.addEventListener('DOMContentLoaded', () => {
    faqManager = new FAQManager();
    // Make it globally accessible for onclick handlers
    (window as any).faqManager = faqManager;
});

// ===== Export =====
export { FAQManager, FAQ };
