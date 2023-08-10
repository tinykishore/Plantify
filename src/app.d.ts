declare namespace App {

}

interface Credentials {
    email: string
    password: string
}

interface UserProperties {
    firstName: string
    lastName: string
    email: string
    password: string
}

interface UserSession {
    name: string,
    email: string,
    token: string
}
