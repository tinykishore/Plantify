// hooks.client.ts

import {onMount} from 'svelte';
import {authenticatedUser} from "./stores";

// Function to check if the cookie has a variable named 'token'
function hasTokenCookie(): boolean {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    return cookies.some(cookie => cookie.startsWith('token='));
}

export function useTokenCookie(): void {

    const session: UserSession = {
        name: '',
        email: '',
        token: ''
    }

    authenticatedUser.subscribe(value => {
        session.name = value.name;
        session.email = value.email;
        session.token = value.token;
    });

    onMount(() => {
        if (hasTokenCookie()) {
            authenticatedUser.update(() => session);
        } else {
            console.log('Token cookie does not exist.');
            // Do something else when the token cookie does not exist
        }
    });
}
