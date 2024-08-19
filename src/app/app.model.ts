export interface Problem{
    contestId: number,
    name: string,
    tags: string[],
    rating: number,
    statement: string,
    time_lim: number,
    mem_lim: number,
    input: string,
    output: string,
    link: string,
}