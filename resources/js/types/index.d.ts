import { Config } from 'ziggy-js';

import { User } from './model';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    csrf_token: string;
    ziggy: Config & { location: string };
};
