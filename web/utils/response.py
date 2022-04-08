class Status:
    def __init__(self):
        self.success = "success"
        self.error = "error"


class Response:
    def __init__(self):
        self.status = Status()

    def success(self, data):
        return {
            "status": self.status.success,
            "data": data
        }

    def api_server_error(self, detail=None):
        return {
            "status": self.status.error,
            "message": "API hatası.",
            "detail": detail
        }

    def wrong_parameter(self, detail=None):
        return {
            "status": self.status.error,
            "message": "Parametreler yanlış.",
            "detail": detail
        }

    def missing_parameter(self, detail=None):
        return {
            "status": self.status.error,
            "message": "Parametreler eksik.",
            "detail": detail
        }

    def invalid_token(self, detail=None):
        return {
            "status": self.status.error,
            "message": "Token geçersiz",
            "detail": detail
        }
