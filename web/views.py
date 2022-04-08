from django.shortcuts import render, redirect
from web.utils.RequestParser import RequestParser
from web.utils.TokenManager import TokenManager
from django.http import JsonResponse, HttpResponseRedirect


def main(request):
    return render(request, 'main.html')


def employer_login(request):
    return render(request, 'login_employer.html')


def user_login(request):
    return render(request, 'login_user.html')


def user_profile(request):
    return render(request, 'user_profile.html')


def employer_profile(request):
    return render(request, 'employer_profile.html')


def my_advert(request):
    return render(request, 'advert.html')


def reset_password(request):
    return render(request, 'reset_password.html')


def my_recourse(request):
    return render(request, 'my_recourse.html')


def query(request):
    return JsonResponse(RequestParser(request).query(), safe=False)


def apply(request):
    return JsonResponse(RequestParser(request).apply(), safe=False)


def login(request):
    if request.method == "POST":
        if TokenManager(request).authenticate():
            next_page = request.GET.get("next")
            if next_page:
                return HttpResponseRedirect(next_page)
            else:
                return JsonResponse({"status": True})
        else:
            return render(request, "login_user.html", {"error": "Kullanıcı bilgisi veya parola hatalıdır!"})
    if request.session.get("user") is not None:
        return redirect("index")
    return render(request, "main.html")


def logout(request):
    TokenManager(request).log_off()
    return redirect("login")
