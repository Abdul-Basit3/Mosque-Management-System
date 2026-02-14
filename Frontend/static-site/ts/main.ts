// ===== Type Definitions =====
interface Quotation {
    text: string;
    arabic: string;
    reference: string;
}

interface PrayerTimes {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    location: string;
}

interface Prayer {
    name: string;
    time: string;
    icon: string;
}

// ===== Theme Management =====
class ThemeManager {
    private theme: 'light' | 'dark';

    constructor() {
        this.theme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        this.init();
    }

    private init(): void {
        this.applyTheme();
        this.setupToggle();
    }

    private applyTheme(): void {
        if (this.theme === 'dark') {
            document.body.classList.add('dark-theme');
            this.updateIcon('sun');
        } else {
            document.body.classList.remove('dark-theme');
            this.updateIcon('moon');
        }
    }

    private updateIcon(icon: 'sun' | 'moon'): void {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const iconElement = themeToggle.querySelector('i');
            if (iconElement) {
                iconElement.className = icon === 'sun' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    public toggle(): void {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    private setupToggle(): void {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// ===== Mobile Menu =====
class MobileMenu {
    private menuBtn: HTMLElement | null;
    private navMenu: HTMLElement | null;

    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    private init(): void {
        if (this.menuBtn && this.navMenu) {
            this.menuBtn.addEventListener('click', () => this.toggle());
            
            document.addEventListener('click', (e: MouseEvent) => {
                const target = e.target as Node;
                if (this.menuBtn && this.navMenu && 
                    !this.menuBtn.contains(target) && 
                    !this.navMenu.contains(target)) {
                    this.close();
                }
            });
            
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
        }
    }

    private toggle(): void {
        if (!this.navMenu || !this.menuBtn) return;
        
        this.navMenu.classList.toggle('active');
        const icon = this.menuBtn.querySelector('i');
        if (icon) {
            icon.className = this.navMenu.classList.contains('active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        }
    }

    private close(): void {
        if (!this.navMenu || !this.menuBtn) return;
        
        this.navMenu.classList.remove('active');
        const icon = this.menuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
}

// ===== Islamic Quotations =====
class QuotationManager {
    private quotations: Quotation[];
    private currentIndex: number;

    constructor() {
        this.quotations = [
            {
                text: "Indeed, with hardship comes ease.",
                arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
                reference: "Quran 94:6"
            },
            {
                text: "And He is with you wherever you are.",
                arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
                reference: "Quran 57:4"
            },
            {
                text: "Verily, in the remembrance of Allah do hearts find rest.",
                arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
                reference: "Quran 13:28"
            },
            {
                text: "Allah does not burden a soul beyond that it can bear.",
                arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
                reference: "Quran 2:286"
            },
            {
                text: "So remember Me; I will remember you.",
                arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
                reference: "Quran 2:152"
            }
        ];
        
        this.currentIndex = 0;
        this.init();
    }

    private init(): void {
        this.display();
        this.createProgressIndicators();
        this.startRotation();
    }

    private display(): void {
        const arabicText = document.getElementById('arabicText');
        const translationText = document.getElementById('translationText');
        const referenceText = document.getElementById('referenceText');
        
        if (arabicText && translationText && referenceText) {
            const quote = this.quotations[this.currentIndex];
            arabicText.textContent = quote.arabic;
            translationText.textContent = quote.text;
            referenceText.textContent = `— ${quote.reference}`;
            
            this.updateProgressIndicators();
        }
    }

    private createProgressIndicators(): void {
        const container = document.getElementById('progressIndicators');
        if (container) {
            container.innerHTML = '';
            this.quotations.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'progress-dot';
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                }
                container.appendChild(dot);
            });
        }
    }

    private updateProgressIndicators(): void {
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    private next(): void {
        this.currentIndex = (this.currentIndex + 1) % this.quotations.length;
        this.display();
    }

    private startRotation(): void {
        setInterval(() => this.next(), 20000);
    }
}

// ===== Prayer Times =====
class PrayerTimesManager {
    private fallbackTimes: PrayerTimes;

    constructor() {
        this.fallbackTimes = {
            fajr: '04:45',
            sunrise: '05:55',
            dhuhr: '12:05',
            asr: '15:25',
            maghrib: '18:15',
            isha: '19:25',
            location: 'Accra, Ghana'
        };
        this.init();
    }

    private async init(): Promise<void> {
        await this.fetchPrayerTimes();
    }

    private async fetchPrayerTimes(): Promise<void> {
        try {
            const response = await fetch('/api/prayer-times/today');
            if (response.ok) {
                const data = await response.json();
                this.displayPrayerTimes(data.data);
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            this.displayPrayerTimes(this.fallbackTimes);
        }
    }

    private displayPrayerTimes(times: PrayerTimes): void {
        const locationElement = document.getElementById('prayerLocation');
        const gridElement = document.getElementById('prayerGrid');
        
        if (locationElement) {
            locationElement.textContent = times.location;
        }
        
        if (gridElement) {
            const prayers: Prayer[] = [
                { name: 'Fajr', time: times.fajr, icon: '🌅' },
                { name: 'Sunrise', time: times.sunrise, icon: '☀️' },
                { name: 'Dhuhr', time: times.dhuhr, icon: '🌞' },
                { name: 'Asr', time: times.asr, icon: '🌤️' },
                { name: 'Maghrib', time: times.maghrib, icon: '🌆' },
                { name: 'Isha', time: times.isha, icon: '🌙' }
            ];
            
            gridElement.innerHTML = prayers.map(prayer => `
                <div class="prayer-card">
                    <div class="prayer-icon">${prayer.icon}</div>
                    <p class="prayer-name">${prayer.name}</p>
                    <p class="prayer-time">${prayer.time}</p>
                </div>
            `).join('');
        }
    }
}

// ===== Active Navigation Link =====
class NavigationManager {
    constructor() {
        this.init();
    }

    private init(): void {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// ===== Footer Year =====
function updateFooterYear(): void {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new NavigationManager();
    updateFooterYear();
    
    if (document.getElementById('wisdomContent')) {
        new QuotationManager();
    }
    
    if (document.getElementById('prayerGrid')) {
        new PrayerTimesManager();
    }
});

// ===== Export for use in other modules =====
export { ThemeManager, MobileMenu, QuotationManager, PrayerTimesManager, NavigationManager };
