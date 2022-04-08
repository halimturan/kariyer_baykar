from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from web.views import *
from django.conf import settings
from django.conf.urls.static import static
from api.views import *

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'ability', AbilityViewSet)
router.register(r'candidate', CandidateInfoViewSet)
router.register(r'company', CompanyViewSet)
router.register(r'school', SchoolViewSet)
router.register(r'advert', AdvertViewSet)
router.register(r'advert_tag', AdvertTagViewSet)
router.register(r'user_experience', UserExperienceViewSet)
router.register(r'rel_user_advert', RelUserAdvertViewSet)
router.register(r'rel_candidate_ability', RelCandidateAbilityViewSet)
router.register(r'rel_user_school', RelCandidateSchoolViewSet)
router.register(r'rel_candidate_user', RelCandidateUserViewSet)
router.register(r'rel_company_user', RelCompanyUserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main, name="main"),
    path('api/', include(router.urls)),
    path('iveren_girisi', employer_login, name="employer_login"),
    path('uye_girisi', user_login, name="user_login"),
    path('query/', query, name="query"),
    path('apply/', apply, name="apply"),
    path('login/', login, name="login"),
    path('logout/', logout, name="logout"),
    path('ilanlarim/', my_advert, name="my_advert"),
    path('parola_degistir/', reset_password, name="reset_password"),
    path('uye_profil/', user_profile, name="user_profile"),
    path('isveren_profil/', employer_profile, name="employer_profile"),
    path('api/api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
