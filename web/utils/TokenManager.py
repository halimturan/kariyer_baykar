import requests
from kariyer_baykar.settings import API_BASE_URL, API_KEY, API_URL_SUFFIX


class TokenManager:
    def __init__(self, request):
        self.username = request.POST.get("username")
        self.password = request.POST.get("password")
        self.session = request.session
        self.headers = {
            "Authorization": f"Api-Key {API_KEY}"
        }

    def authenticate(self):
        api_url_suffix = API_URL_SUFFIX["token"]
        token_resp = requests.post(API_BASE_URL + api_url_suffix, headers=self.headers,
                                   data={"username": self.username, "password": self.password})
        token_resp_json = token_resp.json()
        if "token" in token_resp_json:
            self.session["user"] = token_resp_json
            return True
        else:
            return False

    def log_off(self):
        del self.session["user"]
