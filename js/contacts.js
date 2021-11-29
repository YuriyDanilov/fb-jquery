class Contact {
    constructor(value, name, type, id) {
        this.value = value;
        this.name = name;
        this.type = type;
        this.id = id;
    }

    createContact(contact) {
        let contactElem = $('<div>')
            .attr({
                'class': 'contact-item',
                'data-index': contact.id,
            })
            .prepend(`${contact.name}`)
            .append('<img class="contact-img" src="./assets/img/phonebook.png" alt="X">');

        if (contact.id == activeContact) {
            contactElem.addClass('active');
        }

        return contactElem;
    }

    showContact() {
        $('.contacts-list').html('');
        let elem = this.contact.map(c => this.createContact(c));
        $('.contacts-list').append(...elem);
    }

    createContactInfo(contact) {
        let contactElem = $('<div>')
            .attr('class', 'none');

        if (contact.id == activeContact) {
            contactElem
                .removeClass('none')
                .addClass('activeContact');
        }

        let name = $('<div>').html('Имя: ' + contact.name);
        let type = $('<div>').html('Тип: ' + contact.type);
        let value = $('<div>').html('Контакт: ' + contact.value);

        contactElem
            .append(name, type, value)
            .addClass('contact-item');

        return contactElem;
    }

    showContactInfo() {
        $('.contacts-show').html('');
        let elem = this.contact.map(c => this.createContactInfo(c));
        $('.contacts-show').append(...elem);
    }

    update() {
        $.ajax({
            url: BASE_URL + 'contacts',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .done(r => {
                this.contact = r.contacts;
                this.showContact(this.contact);
                this.showContactInfo(this.contact);
            })
    }
}

let activeContact = null;

$(document).on('click', function (e) {
    if ($(e.target).is('.contact-item')) {
        let index = e.target.dataset.index;
        activeContact = index;
        contact.showContact();
        contact.showContactInfo();
        activeContact = null;
    }
})
