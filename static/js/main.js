class Main {
    constructor() {
        window.onclick = function(event) {
          if (!event.target.matches('#profile-name')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
              let openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        };
        this.buttons = {
            close_modal_btn: $('.close-modal-btn'),
        }
        this.buttons.close_modal_btn.click(() => $('.modal').hide());
    }

    userDropdown(){
        document.getElementById("user_dropdown").classList.toggle("show");
    }

    ajaxRequest(url, data, cache = true, contentType = 'application/x-www-form-urlencoded; charset=UTF-8', processData = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: "POST",
                cache: cache,
                contentType: contentType,
                processData: processData,
                data: data,
                headers: token,
                success: function (data) {
                    resolve(data);
                },
                error: reject
            });
        });
    }
}

let main = new Main();