declare class EnhancedAdminDashboard {
    private currentSection;
    private stats;
    private contentElement;
    constructor();
    private init;
    private initializeStats;
    private setupNavigation;
    private setupLogout;
    private setupMobileMenu;
    loadSection(section: string): void;
    private renderOverview;
    private renderPrayerTimesManagement;
    savePrayerTimes(): void;
    private renderLecturesManagement;
    private loadLecturesTable;
    showAddLectureForm(): void;
    private saveLecture;
    deleteLecture(index: number): void;
    closeForm(): void;
    private renderCoursesManagement;
    private renderProjectsManagement;
    private renderActivitiesManagement;
    private renderExecutivesManagement;
    private renderFAQsManagement;
    private renderAllManagement;
    private renderSettings;
    private renderGenericManagement;
    showAddForm(type: string, fields: any[]): void;
    private saveItem;
    deleteItem(type: string, index: number): void;
    editItem(type: string, index: number): void;
    closeGenericForm(): void;
}
export { EnhancedAdminDashboard };
//# sourceMappingURL=admin-dashboard-enhanced.d.ts.map