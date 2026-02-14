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
declare class CoursesManager {
    private courses;
    private gridElement;
    private filterCategory;
    constructor();
    private init;
    private fetchCourses;
    private getFallbackCourses;
    private displayCourses;
    private createCourseCard;
    private getLevelColor;
    private escapeHtml;
    private setupFilters;
    setFilter(category: string): void;
    enrollCourse(id: number): void;
    searchCourses(query: string): void;
    sortCourses(sortBy: 'title' | 'duration' | 'enrolled'): void;
}
export { CoursesManager, Course };
//# sourceMappingURL=courses.d.ts.map