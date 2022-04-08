import json
from web.utils.requester import Requester
from web.utils.response import Response


class RequestParser(Requester):
    def __init__(self, request):
        super().__init__()
        self.response = Response()
        self.request = request
        self.url = self.request.path_info

    def query(self):
        endpoint = self.request.POST.get("endpoint")
        all_data = self.request.POST.get("all")
        data_id = self.request.POST.get("id")
        filter_data = self.request.POST.get("filter")
        order_data = self.request.POST.get("order")
        if endpoint is None or all_data is None:
            return self.response.missing_parameter()
        if all_data != "true" and all_data != "false":
            return self.response.wrong_parameter()
        else:
            all_data = all_data == "true"
        if all_data is True:
            return self.get(endpoint, order=order_data)
        else:
            if data_id is not None:
                return self.detail(endpoint, data_id)
            elif filter_data is not None:
                return self.filter(endpoint, filter_data, order=order_data)
            else:
                return self.response.missing_parameter()

    def apply(self):
        endpoint = self.request.POST.get("endpoint")
        process_type = self.request.POST.get("type")
        data_id = self.request.POST.get("id")
        data = self.request.POST.get("data")
        if endpoint is None or process_type is None:
            return self.response.missing_parameter()
        if process_type != "delete" and data is None:
            return self.response.missing_parameter()
        if process_type == "create":
            return self.post(endpoint, json.loads(data))
        elif process_type == "update":
            pass
        elif process_type == "partial":
            if data_id is None:
                return self.response.missing_parameter()
            return self.partial_update(endpoint, data_id, json.loads(data))
        elif process_type == "delete":
            return self.delete(endpoint, data_id)
        else:
            return self.response.wrong_parameter()
