interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    order?: number;
}
declare class FAQManager {
    private faqs;
    private containerElement;
    private filterCategory;
    constructor();
    private init;
    private fetchFAQs;
    private getFallbackFAQs;
    private displayFAQs;
    private groupByCategory;
    private createCategorySection;
    private createFAQItem;
    private escapeHtml;
    private setupSearch;
    toggleFAQ(id: number): void;
    filterByCategory(category: string): void;
    searchFAQs(query: string): void;
    expandAll(): void;
    collapseAll(): void;
}
export { FAQManager, FAQ };
//# sourceMappingURL=faq.d.ts.map