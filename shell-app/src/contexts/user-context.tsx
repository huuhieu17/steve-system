

import { consoleService } from '@/services/console.service';
import type { BootState } from '@/types/System';
import type { User } from '@/types/User';
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface SystemContextType {
    bootState: BootState;
    setBootState: React.Dispatch<React.SetStateAction<BootState>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    handleLogout: () => void;
    fetchUserData: () => void;
}

// Default context
export const SystemContext = createContext<SystemContextType | undefined>(undefined);

// Custom hook
export const useSystem = (): SystemContextType => {
    const context = useContext(SystemContext);
    if (!context) {
        throw new Error("useSystem must be used within a SystemProvider");
    }
    return context;
};

// Props type
type Props = {
    children: React.ReactNode;
};

// Provider
export const SystemProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [bootState, setBootState] = useState<BootState>("splash");

    const handleLogout = () => {
        consoleService.logout();
        setBootState("login") 
        setUser(null)
    }

    const fetchUserData = async () => {
        try {
            const response = await consoleService.getUserInfo();
            const { data } = response || {};
            if (!data || !data.data) return;
            setUser(data?.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <SystemContext.Provider value={{ user, setUser, bootState, setBootState, handleLogout, fetchUserData }}>
            {children}
        </SystemContext.Provider>
    );
};
