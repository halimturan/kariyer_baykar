from django.contrib import admin
from api.models import User, Company, School, CandidateInfo, Ability, Advert, RelCompanyUser, RelCandidateUser, \
    RelUserSchool, UserExperience, AdvertTag, RelUserAdvert
from django.utils.html import mark_safe


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'get_img', 'first_name', 'last_name', 'email', 'status')

    def get_img(self, obj):
        return mark_safe(f'<img src="/media/{obj.photo}" width="50" height="50" />')

    get_img.short_description = 'RESİM'


@admin.register(CandidateInfo)
class CandidateInfoAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(Ability)
class AbilityAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Advert)
class AdvertAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'date')


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_img', 'description')

    def get_img(self, obj):
        return mark_safe(f'<img src="/media/{obj.img}" width="50" height="50" />')

    get_img.short_description = 'RESİM'


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_img')

    def get_img(self, obj):
        return mark_safe(f'<img src="/{obj.img}" width="50" height="50" />')

    get_img.short_description = 'RESİM'


@admin.register(RelCompanyUser)
class RelCompanyUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'company')


@admin.register(RelCandidateUser)
class RelCandidateUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'candidate')


@admin.register(RelUserAdvert)
class RelUserAdvertAdmin(admin.ModelAdmin):
    list_display = ('user', 'advert')


@admin.register(RelUserSchool)
class RelUserSchoolAdmin(admin.ModelAdmin):
    list_display = ('school', 'user')


@admin.register(AdvertTag)
class AdvertTagAdmin(admin.ModelAdmin):
    list_display = ('advert', 'name')


@admin.register(UserExperience)
class UserExperienceAdmin(admin.ModelAdmin):
    list_display = ('user', 'company', 'mission', 'start', 'end')
