class LoginUser extends Main{
    constructor() {
        super();
        this.forms = {
            login: $('#user_login_form'),
            signup: $('#user_signup_form')
        };
        this.inputs = {
            signup: {
                first_name: $('#signup_user_nmme'),
                last_name: $('#signup_user_surname'),
                username: $('#signup_username'),
                email: $('#signup_user_email'),
                password: $('#signup_user_password')
            },
            login: {
                username: $('#login_username'),
                password: $('#login_password'),
            }
        };
        this.forms.signup.submit(e => {
            e.preventDefault();
            this.createData();
        });
        this.forms.login.submit(e => {
            e.preventDefault();
            this.loginProcess();
        })
    }

    loginProcess(){
        this.ajaxRequest('/login/', {username: this.inputs.login.username.val(), password: this.inputs.login.password.val()})
            .then(res => {
                res.status ? window.location.href = "/" : null;
            });
    }

    createData() {
        const data = JSON.stringify({
                status: "member",
                first_name: this.inputs.signup.first_name.val(),
                last_name: this.inputs.signup.last_name.val(),
                username: this.inputs.signup.username.val(),
                email: this.inputs.signup.email.val(),
                password: this.inputs.signup.password.val(),
                is_active: true,
                is_staff: true
        });
        this.ajaxRequest('/apply/',
            {endpoint: 'user', data:data, type: "create"})
            .then(res => {
                if (res.status === "success"){
                    this.cleanSignupFrom();
                    const x = document.getElementById("snackbar_success");
                    x.className = "show";
                    x.innerText = "Kayıt başarıyla eklendi. Giriş yapabilirsiniz."
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }
            });
    }

    cleanSignupFrom() {
        this.inputs.signup.username.val('');
        this.inputs.signup.password.val('');
        this.inputs.signup.email.val('');
        this.inputs.signup.last_name.val('');
        this.inputs.signup.first_name.val('');
    }
}

let login_user = new LoginUser();