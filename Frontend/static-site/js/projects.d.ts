interface Project {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    status: 'Active' | 'Completed' | 'Upcoming';
    goal?: number;
    raised?: number;
    startDate: string;
    endDate?: string;
    volunteers?: number;
}
declare class ProjectsManager {
    private projects;
    private gridElement;
    private filterStatus;
    constructor();
    private init;
    private fetchProjects;
    private getFallbackProjects;
    private displayProjects;
    private createProjectCard;
    private getStatusColor;
    private formatNumber;
    private formatDate;
    private escapeHtml;
    filterByStatus(status: string): void;
    supportProject(id: number): void;
    searchProjects(query: string): void;
}
export { ProjectsManager, Project };
//# sourceMappingURL=projects.d.ts.map