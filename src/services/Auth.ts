import { useJwt } from "@vueuse/integrations/useJwt";

export default class {  
    public isConnected(): boolean {
        const token = localStorage.getItem("BEARER_TOKEN");
        if (!token) {
            return false;
        }
        const { payload } = useJwt(token || "");

        if (!payload) {
            return false;
        }
        console.log(payload);
        return true;
    }
}