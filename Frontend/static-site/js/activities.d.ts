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
declare class ActivitiesManager {
    private activities;
    private gridElement;
    private filterCategory;
    constructor();
    private init;
    private fetchActivities;
    private getFallbackActivities;
    private displayActivities;
    private createActivityCard;
    private getStatusColor;
    private formatDate;
    private escapeHtml;
    filterByCategory(category: string): void;
    registerActivity(id: number): void;
    searchActivities(query: string): void;
}
export { ActivitiesManager, Activity };
//# sourceMappingURL=activities.d.ts.map