

import type { BootState } from '@/types/System';
import type { User } from '@/types/User';
import React, { createContext, useState, useContext } from 'react';



export interface SystemContextType {
    bootState: BootState;
    setBootState: React.Dispatch<React.SetStateAction<BootState>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    handleLogout: () => void;
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
        setBootState("login")
        setUser(null)
    }
    return (
        <SystemContext.Provider value={{ user, setUser, bootState, setBootState, handleLogout }}>
            {children}
        </SystemContext.Provider>
    );
};
