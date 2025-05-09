export type Todo = {
    id: any;
    user_id: any;
    title: string;
    completed_at?: any;
    created_at?: string;
    updated_at?: string;
    user?: User;
};
export type User = {
    id: any;
    name: string;
    email: string;
    email_verified_at?: string;
    badge_unlocked_at?: any;
    is_badge_enabled: any;
    created_at?: string;
    updated_at?: string;
    todos?: Todo[];
};
