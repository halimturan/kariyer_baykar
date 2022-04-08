class Recourse extends Main{
    constructor() {
        super();
        this.recourse_list = $('#recourse_list');
        this.recourse_count = $('#recourse_count');
        this.getMyRecourses();
    }

    getMyRecourses() {
        this.ajaxRequest('/query/', {endpoint: 'rel_user_advert', filter: `user=${user_id}`, all:false})
            .then(res => {
                this.recourse_count.html(res.data.length);
                res.data.map(e => {
                     this.recourse_list.append(`
                     <div class="recourse-item">
                        <img src="${e.advert.company.img}" width="100" height="100" alt="company">
                        <div class="recourse-info">
                            <span class="advert-title">${e.advert.title}</span>
                            <span class="advert-city">${e.advert.city} (${e.advert.working_type})</span>
                            <span class="advert-department">${e.advert.department} bölümü</span>
                        </div>
                    </div>
                     `)
                });
            });
    }
}

let recourse = new Recourse();