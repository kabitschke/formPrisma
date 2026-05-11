import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type InputProps = {
    label: string;
    id: string;
    register: any;
    error?: string;
    type?: string;
    span?: string;
    icon?: IconDefinition;
};