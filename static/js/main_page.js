class MainPage extends Main{
    constructor() {
        super();
        this.divs = {
            advert_count: $('#advert_count'),
            list_panel: $('#list_panel'),
        };
        this.inputs = {
            position_level: $('#position_level'),
            working_type: $('#working_type'),
            city: $('#city'),
            search: $('#advert_search_input'),
        };
        this.modals = {
            detail: {
                main: $('#advert_detail_modal'),
                company_img: $('#company-img'),
                company_name: $('.company-name'),
                company_description: $('.company-description'),
                advert_title: $('.detail-advert-title'),
                advert_description: $('.detail-advert-description')
            }
        };
        this.buttons = {
            reset_filter: $('#reset-filter'),
            filter: $('#filter_btn'),
            search: $('#search_btn')
        };
        this.buttons.search.click(() => this.search());
        this.buttons.filter.click(() => this.filter());
        this.buttons.reset_filter.click(() => this.resetFilter());
        this.data_arr = null;
        this.user_advert_arr = [];
        this.filter_query = "";
        this.search_query = "";
        this.getAdverts();
    }

    resetFilter() {
        this.inputs.city.val('');
        document.getElementById('working_type').selectedIndex = 0;
        document.getElementById('position_level').selectedIndex = 0;
    }

    search() {
        this.search_query = "";
        const search = this.inputs.search.val();
        let all_query = "";
        search ? this.search_query = `${this.search_query}&search=${search}` : null;
        all_query = this.filter_query ? `${this.filter_query}${this.search_query}` : this.search_query;
        this.ajaxRequest('/query/', {'endpoint': "advert", 'filter': all_query, all:false })
        .then(res => this.buildList(res));
    }

    filter() {
        this.filter_query = "";
        let all_query = "";
        const city = this.inputs.city.val();
        const working_type = this.inputs.working_type.val();
        const position_level = this.inputs.position_level.val();
        city ? this.filter_query = `${this.filter_query}&city=${city}` : null;
        working_type ? this.filter_query = `${this.filter_query}&working_type=${working_type}` : null;
        position_level ? this.filter_query = `${this.filter_query}&position_level=${position_level}` : null;
        all_query = this.search_query ? `${this.filter_query}${this.search_query}` : this.filter_query;
        this.ajaxRequest('/query/', {'endpoint': "advert", 'filter': all_query, all:false })
            .then(res => this.buildList(res));
    }

    buildList(res) {
        this.data_arr = res.data;
        const current_date = new Date();
        this.divs.advert_count.html(res.data.length);
        this.divs.list_panel.empty();
        res.data.map(e => {
            const date = new Date(e.date);
            const Difference_In_Time = current_date.getTime() - date.getTime();
            const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) < 1
                ? "Dün"
                : `${parseInt(Difference_In_Time / (1000 * 3600 * 24))} gün`;
            const list_el = $(`
                <div class="list-item">
                    <img src="${e.company.img}" height="100" width="100" alt="company">
                    <div class="item-body">
                        <span class="item-title">${e.title}</span>
                        <span class="item-city">${e.city} (${e.working_type})</span>
                        <span class="item-position">${e.position_level}</span>
                        <span class="item-date">${Difference_In_Days}</span>
                    </div>
                </div>
            `);
            const action_el =
                user_status === "member"
                ?
                    this.user_advert_arr.includes(e.id)
                    ?
                        $(`
                        <div class="item-actions">
                            <a id="detail_advert" data-id="${e.id}" onclick="main_page.openDetailModal(this.dataset.id)"><i class="fa fa-circle-info"></i> Detay</a>
                            <a class="applied-text"><i class="fa fa-circle-check"></i> Başvuruldu</a>
                        </div>
                        `)
                    :
                        $(`
                        <div class="item-actions">
                            <a id="detail_advert" data-id="${e.id}" onclick="main_page.openDetailModal(this.dataset.id)"><i class="fa fa-circle-info"></i> Detay</a>
                            <a id="apply_advert" data-id="${e.id}" onclick="main_page.applyAdvertEvent(this.dataset.id)"><i class="fa fa-circle-check"></i> Başvur</a>
                        </div>
                        `)
                :
                    $(`
                    <div class="item-actions">
                        <a id="detail_advert" data-id="${e.id}" onclick="main_page.openDetailModal(this.dataset.id)"><i class="fa fa-circle-info"></i> Detay</a>
                    </div>
            `       );
            action_el.appendTo(list_el);
            list_el.appendTo(this.divs.list_panel);
        });
    }

    getAdverts() {
        if(user_id){
            this.ajaxRequest('/query/', {'endpoint': "rel_user_advert", 'all': false, 'filter': `user=${user_id}` })
                .then(res => res.data.map(e => this.user_advert_arr.push(e.advert)))
                .then(() => {
                    this.ajaxRequest('/query/', {'endpoint': "advert", 'all': true })
                        .then(res => this.buildList(res));
                });
        } else {
            this.ajaxRequest('/query/', {'endpoint': "advert", 'all': true })
                        .then(res => this.buildList(res));
        }
    }

    applyAdvertEvent(advert_id) {
        const rel_advert_user_data = JSON.stringify({user:user_id, advert: advert_id});
        this.ajaxRequest('/apply/',{endpoint: 'rel_user_advert', data: rel_advert_user_data, type: "create"})
            .then(res => {
                if (res.status === "success") {
                    const x = document.getElementById("snackbar_success");
                    x.className = "show";
                    x.innerText = "Başvuru başarıyla eklendi."
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    this.getAdverts();
                }
            })
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

let main_page = new MainPage();
