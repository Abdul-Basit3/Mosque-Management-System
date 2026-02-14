interface Executive {
    id: number;
    name: string;
    position: string;
    bio: string;
    photo: string;
    email?: string;
    phone?: string;
    department: string;
    joinedDate: string;
}
declare class ExecutivesManager {
    private executives;
    private gridElement;
    constructor();
    private init;
    private fetchExecutives;
    private getFallbackExecutives;
    private displayExecutives;
    private groupByDepartment;
    private createDepartmentSection;
    private createExecutiveCard;
    private escapeHtml;
    searchExecutives(query: string): void;
    filterByDepartment(department: string): void;
}
export { ExecutivesManager, Executive };
//# sourceMappingURL=executives.d.ts.map