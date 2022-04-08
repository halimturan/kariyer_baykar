class Advert extends Main {
    constructor() {
        super();
        this.tag_Arr = [];
        this.divs = {
            advert_list: $('#advert_list'),
            advert_count: $('#advert_count'),
            tag_list: $('#tag_list'),
        };
        this.buttons = {
            add_advert: $('#add_advert_btn'),
            create_advert: $('#create_advert_btn'),
            add_tag: $('#add_tag_btn'),
            detail_advert: $('.advert_detail')
        };
        this.modals = {
            create: {
                main: $('#create_advert_modal'),
                position_level: $('#create_position_level_select'),
                working_type: $('#create_working_type'),
                city: $('#create_city'),
                department: $('#create_department'),
                title: $('#create_title'),
                description: $('#create_description'),
                tag: $('#advert_tag')
            },
            detail: {
                main: $('#advert_detail_modal'),
                company_img: $('#company-img'),
                company_name: $('.company-name'),
                company_description: $('.company-description'),
                advert_title: $('.detail-advert-title'),
                advert_description: $('.detail-advert-description')
            },
            user_list: {
                main: $('#advert_user_list'),
                list: $('#user_list'),
            },
            user_detail: {
                main: $('#advert_user_detail'),
                detail: $('#user_detail'),
            }
        };
        this.buttons.add_tag.click(() => this.addTagEvent());
        this.company_id = null;
        this.getCompanyInfo();
        this.getAdverts();
        this.buttons.create_advert.click(() => this.createAdvertEvent());
        this.buttons.add_advert.click(() => this.modals.create.main.show());
        this.data_arr = null;
    }

    getCompanyInfo() {
        this.ajaxRequest('/query/', {endpoint: 'rel_company_user', filter: `user=${user_id}`, all:false}).then(res => this.company_id = res.data[0].company);
    }

    addTagEvent() {
        this.tag_Arr.push(this.modals.create.tag.val());
        this.divs.tag_list.append(`<li>${this.modals.create.tag.val()}</li>`);
        this.modals.create.tag.val('');
    }

    getAdverts() {
        this.ajaxRequest('/query/', {endpoint: 'advert', filter: `publisher=${user_id}`, all:false})
            .then(res => {
                this.data_arr = res.data;
                const current_date = new Date();
                this.divs.advert_list.empty();
                this.divs.advert_count.html(res.data.length);
                res.data.map(e => {
                    const date = new Date(e.date);
                    const Difference_In_Time = current_date.getTime() - date.getTime();
                    const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) < 1
                        ? "Dün"
                        : `${parseInt(Difference_In_Time / (1000 * 3600 * 24))} gün`;
                    this.divs.advert_list.append(`
                    <div class="advert-item">
                        <img src="${e.company.img}" height="100" width="100" alt="company-img">
                        <div class="advert-item-body">
                            <span class="advert-title">${e.title}</span>
                            <span class="advert-city">${e.city} (${e.working_type})</span>
                            <span class="position_level">${e.position_level}</span>
                            <span class="advert-date">${Difference_In_Days}</span>
                        </div>
                        <div class="advert-item-actions">
                            <a class="advert_detail" data-id="${e.id}" onclick="advert.openDetailModal(this.dataset.id)"><i class="fa fa-circle-info"></i> Detay</a>
                            <a class="total_apply" data-id="${e.id}" onclick="advert.userListEvent(this.dataset.id)"><i class="fa fa-circle-check"></i> ${e.applied_count} başvuru</a>
                        </div>
                    </div>`);
                });
            });
    }

    createAdvertEvent() {
        const date = new Date();
        const advert_data = JSON.stringify({
            publisher: user_id,
            company: this.company_id,
            date: `${date.getFullYear()}-${date.getDay()}-${date.getDate()}`,
            position_level: this.modals.create.position_level.val(),
            working_type: this.modals.create.working_type.val(),
            city: this.modals.create.city.val(),
            department: this.modals.create.department.val(),
            title: this.modals.create.title.val(),
            description: this.modals.create.description.val(),
        });
        this.ajaxRequest('/apply/',{endpoint: 'advert', data: advert_data, type: "create"})
            .then(res => {
                if (res.status === "success") {
                    this.tag_Arr.map(e => {
                        const tag_data = JSON.stringify({advert: res.data.id, name: e});
                        this.ajaxRequest('/apply/',{endpoint: 'advert_tag', data: tag_data, type: "create"});
                    });
                    this.modals.create.main.hide();
                    this.getAdverts();
                    const x = document.getElementById("snackbar_success");
                    x.className = "show";
                    x.innerText = "İlan başarıyla eklendi."
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }
            });
    }

    userListEvent(advert_id) {
        this.ajaxRequest('/query/', {endpoint: 'rel_user_advert', filter: `advert=${advert_id}`, all:false})
            .then(res => {
                if (res.status === "success") {
                    this.modals.user_list.list.empty();
                    res.data.map(e => {
                        const photo_url = e.user.photo ? e.user.photo : '/static/img/account.png' ;
                        this.modals.user_list.list.append(`
                        <div class="user-item">
                            <img src="${photo_url}" width="50" height="50" alt="user">
                            <div class="user-body">
                                <span>${e.user.first_name} ${e.user.last_name}</span>
                            </div>
                            <div class="user-actions">
                                <a data-id="${e.user.id}" onclick="advert.openUserDetail(this.dataset.id)"><i class="fa fa-eye"></i> Profili Gör</a>
                            </div>
                        </div>
                        `);
                        this.modals.user_list.main.show();
                    });
                }
            });
    }

    openUserDetail(user_id) {
        this.ajaxRequest('/query/', {endpoint: 'rel_candidate_user', filter: `user=${user_id}`, all:false})
        .then(res => {
            if(res.status === "success") {
                const photo_url = res.data[0].user.photo ? res.data[0].user.photo : '/static/img/account.png' ;
                this.modals.user_detail.detail.empty().append(`
                <div class="user-info-wrapper">
                    <img src="${photo_url}" width="200" height="200" alt="photo">
                    <div class="user-info">
                        <span class="user-name">${res.data[0].user.first_name} ${res.data[0].user.last_name}</span>
                        <span class="user-title">${res.data[0].candidate.title}</span>
                        <span class="user-summary">${res.data[0].candidate.summary}</span>
                    </div>
                </div>
                `);
                this.modals.user_detail.main.show();
            }
        });
    }

    openDetailModal(data_id) {
        this.data_arr.find(data => {
             if(parseInt(data.id) === parseInt(data_id)) {
                this.modals.detail.company_img.attr('src', data.company.img);
                this.modals.detail.company_name.text(data.company.title);
                this.modals.detail.company_description.html(data.company.description);
                this.modals.detail.advert_title.html(data.title);
                this.modals.detail.advert_description.html(data.description);
                this.modals.detail.main.show();
             }
        });
    }
}

const advert = new Advert();