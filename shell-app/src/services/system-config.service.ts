import type { SystemConfigRequest } from '@/types/System';
import { httpClientWithAuth } from '@/utils/httpClient';



class SystemConfigService {
    private apiWithAuth = httpClientWithAuth;

    async getSystemConfig(userId?: string) {
        if (!userId) {
            console.warn("User ID is not provided. Fetching system config without user ID.");
            throw new Error("User ID is required to fetch system config.");
        }
        try {
            const data = await this.apiWithAuth({
                url: `/console/api/config/${userId ? userId : ''}`,
                method: "GET",
                params: userId ? { userId } : undefined
            });
            return data;
        } catch (error) {
            console.error("Failed to fetch system config:", error);
            throw error;
        }
    }

    async updateSystemConfig(userId: string, config: SystemConfigRequest) {
        if (!userId) {
            console.warn("User ID is not provided. Cannot update system config.");
            throw new Error("User ID is required to update system config.");
        }
        try {
            const data = await this.apiWithAuth({
                url: `/console/api/config/${userId}`,
                method: "PUT",
                data: JSON.stringify(config)
            });
            return data;
        } catch (error) {
            console.error("Failed to update system config:", error);
            throw error;
        }
    }
}

export const systemConfigService = new SystemConfigService();