class AddContact {
    constructor(selector) {
        this.selector = selector;
        this.onAdd = () => { };
        $(() => {
            this.init();
            this.binds();
        }
        );
    }

    init() {
        this.container = $(this.selector);
        this.form = $('#form-cont')
        this.name = $('#name');
        this.type = $('#type');
        this.value = $('#value');
        this.addBtn = $('#add-cont')
    }

    binds() {
        this.addBtn.on('click', () => {
            this.add()
        });
    }

    add() {
        if (this.value.val() == '' || this.name.val() == '' || this.type.val() == '') {
            alert('Заполните поля')
        } else {
            let contact = new Contact(
                this.value.val(),
                this.name.val(),
                this.type.val(),
            );

            $.ajax({
                url: BASE_URL + 'contacts/add',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(contact),
            })
                .done(r => {
                    if (r.status === "error")
                        alert(r.error);
                    else {
                        this.successAdd();
                        this.clearForm();
                    }
                })
        }
    }

    successAdd() {
        this.onAdd();
    }

    clearForm() {
        this.form[0].reset()
    }
}