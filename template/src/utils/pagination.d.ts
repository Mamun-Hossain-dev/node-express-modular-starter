type PaginationOptions = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
interface PaginationResults {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
declare const pagination: (options: PaginationOptions) => PaginationResults;
export default pagination;
