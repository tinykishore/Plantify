import {writable, type Writable} from "svelte/store";
export const cartArray = writable([]);
export const authenticatedUser = <Writable<UserSession>> writable({});
