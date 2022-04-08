class ChangePassword extends Main{
    constructor() {
        super();
        this.warning = $('#warning');
        this.password_input = $('#password');
        this.password_again_input = $('#again_password');
        this.change_password_btn = $('#change_password_btn');
        this.change_password_btn.click(() => this.changePassWord());
        this.error_list = $('#error_list');
    }

    checkInput() {
        if (this.password_input.val() === this.password_again_input.val()) {
            this.warning.hide();
            return true;
        } else {
            this.warning.show();
            return false;
        }
    }

    changePassWord() {
        if (this.checkInput()) {
            const user_data = JSON.stringify({'password': this.password_input.val(), id: user_id});
            this.ajaxRequest('/apply/',{endpoint: 'user', id: user_id, data: user_data, type: "partial"})
            .then(res => {
                if (res.status === "error"){
                    this.error_list.empty();
                    res.detail.password.map(error => this.error_list.append(`<li style="color:red">${error}</li>`));
                } else {
                    res.status ? window.location.href = "/logout/" : null;
                }
            });
        }
    }
}

const change_password = new ChangePassword();