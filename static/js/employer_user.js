class LoginEmployer extends Main{
    constructor() {
        super();
        this.forms = {
            login: $('#employer_login_form'),
            signup: $('#employer_signup_form')
        };
        this.inputs = {
            signup: {
                first_name: $('#signup_user_nmme'),
                last_name: $('#signup_user_surname'),
                username: $('#signup_username'),
                email: $('#signup_user_email'),
                password: $('#signup_user_password'),
                company: $('#signup_company_select')
            },
            login: {
                username: $('#login_username'),
                password: $('#login_password'),
            }
        };
        this.getCompany();
        this.forms.signup.submit(e => {
            e.preventDefault();
            this.createData();
        });
        this.forms.login.submit(e => {
            e.preventDefault();
            this.loginProcess();
        })
    }

    getCompany() {
        this.ajaxRequest('/query/', {'endpoint': "company", 'all': true })
            .then(res =>{
                res.data.map(company => this.inputs.signup.company.append(`<option value="${company.id}">${company.title}</option>`));
            });
    }

    loginProcess(){
        this.ajaxRequest('/login/', {username: this.inputs.login.username.val(), password: this.inputs.login.password.val()})
            .then(res => {
                res.status ? window.location.href = "/" : null;
            });
    }

    createData() {
        const data = JSON.stringify({
                status: "employer",
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
                    const rel_company_user_data = JSON.stringify( {user: res.data.id, company: this.inputs.signup.company.val()});
                    this.ajaxRequest('/apply/', {endpoint: 'rel_company_user', type: "create", data: rel_company_user_data})
                        .then(company_res => {
                            if (company_res.status === "success"){
                                this.cleanSignupFrom();
                                const x = document.getElementById("snackbar_success");
                                x.className = "show";
                                x.innerText = "Kayıt başarıyla eklendi. Giriş yapabilirsiniz."
                                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                            }
                        });
                }
            });
    }

    cleanSignupFrom() {
        this.inputs.signup.username.val('');
        this.inputs.signup.password.val('');
        this.inputs.signup.email.val('');
        this.inputs.signup.last_name.val('');
        this.inputs.signup.first_name.val('');
        document.getElementById('signup_company_select').selectedIndex = 0;
    }
}

let login_employer = new LoginEmployer();