interface Lecture {
    id: number;
    title: string;
    speaker: string;
    description: string;
    thumbnail: string;
    duration: string;
    date: string;
    videoUrl?: string;
}
declare class LecturesManager {
    private lectures;
    private gridElement;
    constructor();
    private init;
    private fetchLectures;
    private getFallbackLectures;
    private displayLectures;
    private createLectureCard;
    private formatDate;
    private escapeHtml;
    playLecture(id: number): void;
    filterByCategory(category: string): void;
    searchLectures(query: string): void;
}
export { LecturesManager, Lecture };
//# sourceMappingURL=lectures.d.ts.map