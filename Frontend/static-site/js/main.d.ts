declare class ThemeManager {
    private theme;
    constructor();
    private init;
    private applyTheme;
    private updateIcon;
    toggle(): void;
    private setupToggle;
}
declare class MobileMenu {
    private menuBtn;
    private navMenu;
    constructor();
    private init;
    private toggle;
    private close;
}
declare class QuotationManager {
    private quotations;
    private currentIndex;
    constructor();
    private init;
    private display;
    private createProgressIndicators;
    private updateProgressIndicators;
    private next;
    private startRotation;
}
declare class PrayerTimesManager {
    private fallbackTimes;
    constructor();
    private init;
    private fetchPrayerTimes;
    private displayPrayerTimes;
}
declare class NavigationManager {
    constructor();
    private init;
}
export { ThemeManager, MobileMenu, QuotationManager, PrayerTimesManager, NavigationManager };
//# sourceMappingURL=main.d.ts.map