export default interface DashboardData {
    adminUserCount: number;
    creatorsCount: number;
    disabledUserCount: number;
    login: { date: string, value: number }[];
    mediaCount: number;
    register: { date: string, value: number }[];
    userCount: number;
}