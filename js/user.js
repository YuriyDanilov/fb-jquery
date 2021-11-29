class User {
    constructor(login, bornDate, password) {
        this.login = login;
        this.bornDate = bornDate;
        this.password = password;
    }
    static create(user) {
        return new User(user.login, user['date_born'], null)
    }
}