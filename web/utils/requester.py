from kariyer_baykar.settings import API_BASE_URL, API_KEY, API_URL_SUFFIX
from .response import Response
import requests


class Requester:
    def __init__(self):
        self.headers = {
            "Authorization": f"Api-Key {API_KEY}"
        }
        self.response = Response()

    def get(self, url_suffix, order=None):
        resp = requests.get(f"{API_BASE_URL}/{API_URL_SUFFIX.get(url_suffix)}?format=json&{order}",
                            headers=self.headers)
        return self.check(resp)

    def detail(self, url_suffix, data_id):
        resp = requests.get(f"{API_BASE_URL}/{API_URL_SUFFIX.get(url_suffix)}{data_id}/?format=json",
                            headers=self.headers)
        return self.check(resp)

    def post(self, url_suffix, data):
        resp = requests.post(f"{API_BASE_URL}/{API_URL_SUFFIX.get(url_suffix)}?format=json", data=data,
                             headers=self.headers)
        return self.check(resp)

    def filter(self, url_suffix, filter_data, order=None):
        resp = requests.get(f"{API_BASE_URL}/{API_URL_SUFFIX.get(url_suffix)}?format=json&{filter_data}&{order}",
                            headers=self.headers)
        return self.check(resp)

    def partial_update(self, url_suffix, data_id, data):
        resp = requests.patch(f"{API_BASE_URL}/{API_URL_SUFFIX.get(url_suffix)}{data_id}/", data=data,
                              headers=self.headers)
        return self.check(resp)

    def delete(self, url_suffix, data_id):
        resp = requests.delete(f"{API_BASE_URL}/{API_URL_SUFFIX.get(url_suffix)}{data_id}/", headers=self.headers)
        return self.check(resp)

    def check(self, response):
        if response.status_code == 200 or response.status_code == 201:
            return self.response.success(response.json())
        elif response.status_code == 204:
            return self.response.success(response.status_code)
        else:
            return self.response.api_server_error(response.json())
