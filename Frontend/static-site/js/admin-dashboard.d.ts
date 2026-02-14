interface AdminUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'staff';
}
declare class AdminDashboardManager {
    private currentUser;
    private currentSection;
    private sidebar;
    private content;
    private pageTitle;
    constructor();
    private init;
    private checkAuthentication;
    private loadUserInfo;
    private setupEventListeners;
    private loadSection;
    private getSectionData;
    private renderOverview;
    private renderAllManagement;
    private renderManagementCard;
    private renderRecentActivities;
    private renderRecentUpdatesTable;
    private renderPrayerTimes;
    private renderLectures;
    private renderCourses;
    private renderProjects;
    private renderActivities;
    private renderExecutives;
    private renderFAQs;
    private renderSettings;
    private attachSectionEventListeners;
    private logout;
}
export { AdminDashboardManager, AdminUser };
//# sourceMappingURL=admin-dashboard.d.ts.map