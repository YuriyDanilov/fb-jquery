class RegisterForm {
    constructor(selector) {
        this.selector = selector;
        $(() => {
            this.init();
            this.bind();
        })
    }

    init() {
        this.wrapper = $('.container');
        this.container = $(this.selector);
        this.contacts = $('.contacts');
        this.loginInput = $('#login-reg');
        this.bornInput = $('#date_born-reg');
        this.passwordInput = $('#password-reg');
        this.form = $('#reg-form');
        this.button = $('.btn-reg');
        this.exit = $('.btn-exit');
    }

    bind() {
        this.button.on('click', (e) => {
            e.preventDefault();
            this.register()
        })
    }

    register() {
        let user = new User(
            this.loginInput.val(),
            this.bornInput.val(),
            this.passwordInput.val()
        );

        $.ajax({
            url: BASE_URL + 'register',
            method: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json",
        })
            .done(r => {
                if (r.status == 'error')
                    alert(r.error)
                else {
                    this.succsessRegister();
                    this.clearForm();
                }
            })
            .fail(r => console.log('Ошибка ' + r.status))
    }

    succsessRegister() {
        this.clearForm();
        this.wrapper.css('display', 'none');
        this.exit.css('display', 'block');
        this.contacts.css('display', 'flex');
    }

    clearForm() {
        this.form[0].reset()
    }
}