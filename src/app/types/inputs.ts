import { LucideIcon } from "lucide-react";

export type InputProps = {
    label: string;
    id: string;
    register: any;
    error?: string;
    type?: string;
    span?: string;
    icon?: LucideIcon;
};