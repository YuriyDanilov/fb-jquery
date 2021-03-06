class LoginForm {
    constructor(selector) {
        this.selector = selector;
        this.onLogin = () => { };
        $(() => {
            this.init();
            this.bind();
        })
    }

    init() {
        this.wrapper = $('.container');
        this.exit = $('.btn-exit');
        this.contacts = $('.contacts');
        this.container = $(this.selector);
        this.loginInput = $('#login-log');
        this.passwordInput = $('#password-log');
        this.button = $('.btn-login');
    }

    bind() {
        this.button.on('click', e => {
            e.preventDefault();
            this.login()
        })
    }

    login() {
        if (this.loginInput.val() == '' || this.passwordInput.val() == '') {
            alert('Введите логин/пароль');
            return;
        }

        let user = new User(
            this.loginInput.val(),
            null,
            this.passwordInput.val(),
        );

        $.ajax({
            url: BASE_URL + 'login',
            method: 'post',
            data: JSON.stringify(user),
            contentType: "application/json",
        })
            .done(r => {
                if (r.status == 'error') {
                    alert(r.error);
                    this.clearForm();
                }
                localStorage.setItem('token', r.token);
                this.succsessLogin();
                this.clearForm();
            })
            .fail(r => console.log('Ошибка ' + r.status))
    }

    clearForm() {
        this.loginInput.val() == null;
        this.passwordInput.val() == null;
    }

    succsessLogin() {
        this.wrapper.css('display', 'none');
        this.exit.css('display', 'block');
        this.contacts.css('display', 'flex');
        this.onLogin();
    }
}