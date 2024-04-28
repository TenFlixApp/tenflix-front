import DashboardData from "@/Models/DashboardData";
import { sendSecuredRequest } from "./Request";
import { Rights } from "@/constants/Rights";

export default class {
    public async getDashboardData(): Promise<DashboardData> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "metrics/dashboard", {
            method: "GET"
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            } else {
                const data = await response.json() as DashboardData;
                data.login.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                data.register.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                if (data.login.length > 5) {
                    data.login.length = 5;
                }
                if (data.register.length > 5) {
                    data.register.length = 5;
                }
                data.login.reverse();
                data.register.reverse();
                return data;
            }
        })
    }
}