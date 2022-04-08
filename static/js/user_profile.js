class UserProfile extends Main{
    constructor() {
        super();
        this.divs = {
            user_title: $('#user_title'),
            user_summary: $('#user_summary'),
            user_name: $('#user_name'),
            education: $('#education_body'),
            experience: $('#experience_body')
        };
        this.modals = {
           education: {
               create: {
                   main: $('#create_education_modal'),
                   school_name: $('#create_school_name_select'),
                   department: $('#create_school_department'),
                   start: $('#create_start'),
                   end: $('#create_end'),
               },
               update:{
                   main: $('#edit_education_modal'),
                   school_name: $('#update_school_name_select'),
                   department: $('#update_school_department'),
                   start: $('#update_start'),
                   end: $('#update_end'),
               },
           },
            experience: {
               create: {
                   main: $('#create_experience_modal'),
                   company: $('#create_company_select'),
                   mission: $('#create_mission'),
                   start: $('#create_experience_start'),
                   end: $('#create_experience_end'),
               },
                update: {
                    main: $('#edit_experience_modal'),
                }
            },
            user_info: {
                main: $('#edit_user_info_modal'),
                name: $('#update_user_first_name'),
                last_name: $('#update_user_last_name'),
                title: $('#update_user_title'),
                photo: $('#update_user_photo'),
                summary: $('#update_user_summary')
            }
        };
        this.buttons = {
            add_education: $('#add_education_btn'),
            save_education: $('#create_education_btn'),
            update_Education: $('#update_education_btn'),
            add_experience: $('#add_experience_btn'),
            save_experience: $('#create_experience_btn'),
            edit_user_info: $('#edit_user_info'),
            update_user_info: $('#update_user_info_btn'),
        };
        this.buttons.add_education.click(() => {
            this.modals.education.create.school_name.empty();
            this.schools_arr.map(s => this.modals.education.create.school_name.append(`<option value="${s.id}">${s.name}</option>`));
            this.modals.education.create.main.show()
        });
        this.buttons.add_experience.click(() => {
            this.modals.experience.create.company.empty();
            this.company_arr.map(s => this.modals.experience.create.company.append(`<option value="${s.id}">${s.title}</option>`));
            this.modals.experience.create.main.show();
        });
        this.buttons.update_user_info.click(() => this.updateUserInfoEvent());
        this.buttons.edit_user_info.click(() => this.userInfoModal());
        this.buttons.save_education.click(() => this.saveEducation());
        this.buttons.save_experience.click(() => this.saveExperience());
        this.education_arr = [];
        this.schools_arr = [];
        this.company_arr = [];
        this.user_dict = null;
        this.candidate_dict = null;
        this.getUserInfo();
        this.getSchools();
        this.getCompany();
        this.getCandidateInfo();
        this.getUserEducationInfo();
        this.getUserExperienceInfo();
    }

    getUserInfo() {
        this.ajaxRequest('/query/', {'endpoint': "user", "id": user_id, "all": false }).then(res => this.user_dict = res.data);
    }

    getSchools(){
        this.ajaxRequest('/query/', {'endpoint': "school", "all": true }).then(res => this.schools_arr = res.data);
    }

    getCompany() {
        this.ajaxRequest('/query/', {'endpoint': "company", 'all': true }).then(res => this.company_arr = res.data);
    }

    saveEducation() {
        const data = JSON.stringify({user: user_id,
            school: this.modals.education.create.school_name.val(),
            department: this.modals.education.create.department.val(),
            start: this.modals.education.create.start.val(),
            end: this.modals.education.create.end.val()});
        this.ajaxRequest('/apply/',{endpoint: 'rel_user_school', data:data, type: "create"})
            .then(res => {
                if (res.status === "success"){
                    this.cleanSignupFrom();
                    const x = document.getElementById("snackbar_success");
                    this.modals.education.create.main.show();
                    x.className = "show";
                    x.innerText = "Eğitim verisi başarıyla eklendi."
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }
            });
    }

    saveExperience() {
        const data = JSON.stringify({user: user_id,
            company: this.modals.experience.create.company.val(),
            mission: this.modals.experience.create.mission.val(),
            start: this.modals.experience.create.start.val(),
            end: this.modals.experience.create.end.val()});
        this.ajaxRequest('/apply/',{endpoint: 'user_experience', data:data, type: "create"})
            .then(res => {
                if (res.status === "success"){
                    this.cleanSignupFrom();
                    this.getUserExperienceInfo();
                    this.modals.experience.create.main.hide();
                    const x = document.getElementById("snackbar_success");
                    x.className = "show";
                    x.innerText = "Deneyim verisi başarıyla eklendi."
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }
            });
    }

    userInfoModal(){
        this.modals.user_info.name.val(this.user_dict.first_name);
        this.modals.user_info.last_name.val(this.user_dict.last_name);
        if (this.candidate_dict) {
            this.modals.user_info.title.val(this.candidate_dict.title);
            this.modals.user_info.summary.val(this.candidate_dict.summary);
        }
        this.modals.user_info.main.show();
    }

    updateUserInfoEvent(){
        const candidate_data = JSON.stringify({title: this.modals.user_info.title.val(), summary: this.modals.user_info.summary.val()});
        const user_data = JSON.stringify({id: this.user_dict.id, first_name: this.modals.user_info.name.val(), last_name: this.modals.user_info.last_name.val()});
        if (this.candidate_dict) {
            this.ajaxRequest('/apply/',{endpoint: 'candidate', id: this.candidate_dict.id, data: candidate_data, type: "partial"})
                .then(res => {
                    if (res.status === "success") {
                        this.candidate_dict = res.data;
                        this.divs.user_title.html(res.data.title);
                        this.divs.user_summary.html(res.data.summary);
                    }
                });
        } else {
            this.ajaxRequest('/apply/',{endpoint: 'candidate', data: candidate_data, type: "create"})
                .then(res => {
                    if (res.status === "success") {
                        const rel_candidate_user_data = JSON.stringify({user: user_id, candidate: res.data.id});
                        this.ajaxRequest('/apply/',{endpoint: 'rel_candidate_user', data: rel_candidate_user_data, type: "create"})
                            .then(res_rel => {
                                if (res_rel.status === "success") {
                                    this.candidate_dict = res.data;
                                    this.divs.user_title.html(res.data.title);
                                    this.divs.user_summary.html(res.data.summary);
                                }
                            });
                    }
                });
        }
        this.ajaxRequest('/apply/',{endpoint: 'user', id: this.user_dict.id, data: user_data, type: "partial"})
            .then(res => {
                if (res.status === "success") {
                    this.user_dict = res.data;
                    this.modals.user_info.main.hide();
                    this.divs.user_name.html(`${res.data.first_name} ${res.data.last_name}`);
                }
            });
    }

    cleanSignupFrom() {
        this.modals.education.create.department.val('');
        this.modals.education.create.start.val('');
        this.modals.education.create.end.val('');
        document.getElementById('create_school_name_select').selectedIndex = 0;
    }

    getCandidateInfo() {
        this.ajaxRequest('/query/', {'endpoint': "rel_candidate_user", 'filter': `user=${user_id}`, "all": false })
            .then(res => {
                this.candidate_dict = res.data[0].candidate;
                if(res.data.length > 0) {
                    this.divs.user_title.html(res.data[0].candidate.title);
                    this.divs.user_summary.html(res.data[0].candidate.summary);
                }
            });
    }

    editSchoolModal(data_id){
        let selected_school = null;
        this.education_arr.map(education => education.id === parseInt(data_id) ? selected_school = education : null);
        this.modals.education.update.school_name.empty();
        this.schools_arr.map(school => {
            school.id === selected_school.id
                ? this.modals.education.update.school_name.append(`<option value="${school.id}" selected>${school.name}</option>`)
                : this.modals.education.update.school_name.append(`<option value="${school.id}">${school.name}</option>`);
        });
        this.modals.education.update.department.val(selected_school.department);
        this.modals.education.update.start.val(selected_school.start);
        this.modals.education.update.end.val(selected_school.end);
        this.modals.education.update.main.show();
        this.buttons.update_Education.attr('data-id', data_id);
    }

    updateSchoolEvent(data_id) {
        const school_data = JSON.stringify({
            user: user_id,
            school: this.modals.education.update.school_name.val(),
            department: this.modals.education.update.department.val(),
            start: this.modals.education.update.start.val(),
            end: this.modals.education.update.end.val(),
        });
        this.ajaxRequest('/apply/',{endpoint: 'rel_user_school', id: data_id, data: school_data, type: "partial"})
            .then(res => {
                if (res.status === "success") {
                    this.modals.education.update.main.hide();
                    this.getUserEducationInfo();
                }
            });
    }

    getUserEducationInfo() {
        this.ajaxRequest('/query/', {'endpoint': "rel_user_school", 'filter': `user=${user_id}`, "all": false })
            .then(res => {
                this.divs.education.empty();
                this.education_arr = res.data;
                res.data.map(school => {
                    this.divs.education.append(`
                        <div class="education-item">
                            <img src="${school.school.img}" alt="school_img" class="school-img">
                            <div class="education-info">
                                <span class="school_name">${school.school.name}</span>
                                <span class="school_department">${school.department}</span>
                                <span class="school_date">${new Date(school.start).getFullYear()} - ${new Date(school.end).getFullYear()}</span>
                            </div>
                            <div class="item-operations">
                                <a id="edit_education_item" data-id="${school.id}" onclick="user_profile.editSchoolModal(this.dataset.id)" class="edit-item-btn" title="Düzenle"><i class="fa fa-pencil"></i></a>
                                <a id="delete_education_item" onclick="user_profile.deleteItem(this.dataset.id, 'rel_user_school')" data-id="${school.id}" class="delete-item-btn ml-2" title="Sil"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    `);
                });
            });
    }

    getUserExperienceInfo() {
        this.ajaxRequest('/query/', {'endpoint': "user_experience", 'filter': `user=${user_id}`, "all": false })
            .then(res => {
                this.divs.experience.empty();
                res.data.map(company => {
                    this.divs.experience.append(`
                        <div class="education-item mt-2">
                            <img src="${company.company.img}" alt="school_img" class="company-img">
                            <div class="education-info">
                                <span class="school_name">${company.company.title}</span>
                                <span class="school_department">${company.mission}</span>
                                <span class="school_date">${new Date(company.start).getFullYear()} - ${company.end ? new Date(company.end).getFullYear() : "Halen"}</span>
                            </div>
                            <div class="item-operations">
                                <a id="edit_experience_item" class="edit-item-btn" title="Düzenle"><i class="fa fa-pencil"></i></a>
                                <a id="delete_experience_item" onclick="user_profile.deleteItem(this.dataset.id, 'user_experience')" data-id="${company.id}" class="delete-item-btn ml-2" title="Sil"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    `);
                });
            });
    }

    deleteItem (data_id, end_point) {
        document.getElementById('id01').style.display='block'
        $('#delete_btn').attr('data-id', data_id).attr('data-endpoint', end_point);
    }

    deleteRecord(data_id, end_point){
        this.ajaxRequest('/apply/',{endpoint: end_point, id:data_id, type: "delete"})
            .then(res => {
                if (res.status === "success") {
                    end_point === "user_experience"
                        ? this.getUserExperienceInfo()
                        : end_point === 'rel_user_school'
                            ? this.getUserEducationInfo()
                            : null;
                }
                document.getElementById('id01').style.display= 'none';
            });
    }
}

let user_profile = new UserProfile();