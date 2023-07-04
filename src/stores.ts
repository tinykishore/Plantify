import {writable, type Writable} from "svelte/store";

export const toast = writable({
    title: '',
    body: '',
    isOpen: false,
});

export const loginSession = <Writable<Cookie>> writable(undefined);

export const googleInitialized = writable(false);