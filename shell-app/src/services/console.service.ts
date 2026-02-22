import {httpClient, httpClientWithAuth} from "@/utils/httpClient";

class ConsoleService {
    private api = httpClient;
    private apiWithAuth = httpClientWithAuth;

    async login(username: String, password: String){
       const data = await this.api({
            url: "/console/api/auth/login",
            method: "POST",
            data: JSON.stringify({login: username, password})
        })
        return data;
    }

    async register(username: String, password: String, email: String){
        const data = await this.api({
            url: "/console/api/auth/register",
            method: "POST",
            data: JSON.stringify(
                {
                    username,
                    password,
                    lastName: "User",
                    firstName: "New",
                    email
                }
            )
        })
        return data;
    }

    async getUserInfo(){
        const data = await this.apiWithAuth({
            url: "/console/api/users/me",
            method: "GET",
        })
        return data;
    }

    async logout(){
        const data = await this.apiWithAuth({
            url: "/console/api/auth/auth/logout",
            method: "POST",
        })
        return data;
    }
}

export const consoleService = new ConsoleService();