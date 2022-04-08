from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    status_list = [("member", "Üye"), ('employer', 'İşveren')]
    status = models.CharField(max_length=20, choices=status_list)
    photo = models.FileField(upload_to="user_image", verbose_name="Resim", blank=True, null=True)

    class Meta:
        verbose_name_plural = "Kullanıcılar"


class Company(models.Model):
    title = models.CharField(max_length=100, verbose_name="Başlık")
    img = models.FileField(upload_to="company", verbose_name="Resim", blank=True, null=True)
    description = models.CharField(max_length=3000, verbose_name="Açıklama")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Şirketler"


class RelCompanyUser(models.Model):
    company = models.ForeignKey(Company, on_delete=models.PROTECT, verbose_name="Şirket")
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="Kullnıcı")

    class Meta:
        verbose_name_plural = "Şirket Kullanıcı İlişkileri"


class School(models.Model):
    name = models.CharField(max_length=100, verbose_name="İsim")
    img = models.FileField(upload_to="school", verbose_name="Resim")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Okullar"


class Ability(models.Model):
    name = models.CharField(max_length=100, verbose_name="İsim")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Beceriler"


class CandidateInfo(models.Model):
    title = models.CharField(max_length=100, verbose_name="Başlık")
    summary = models.CharField(max_length=1000, verbose_name="Özet")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Aday Bilgileri"


class RelUserSchool(models.Model):
    user = models.ForeignKey(User, verbose_name="Kullanıcı", on_delete=models.PROTECT)
    school = models.ForeignKey(School, verbose_name="Okul", on_delete=models.PROTECT)
    department = models.CharField(max_length=100, verbose_name="Bölüm")
    start = models.DateField(verbose_name="Başlangıç")
    end = models.DateField(verbose_name="Bitiş")

    class Meta:
        verbose_name_plural = "Kullanıcı Okul İlişkileri"


class RelCandidateAbility(models.Model):
    candidate = models.ForeignKey(CandidateInfo, verbose_name="Aday", on_delete=models.PROTECT)
    ability = models.ForeignKey(Ability, verbose_name="Beceri", on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = "Aday Beceri İlişkileri"


class Advert(models.Model):
    company = models.ForeignKey(Company, on_delete=models.PROTECT, verbose_name="Şirket")
    publisher = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="Kullanıcı")
    date = models.DateField(verbose_name="İlan Tarihi")
    position_level = models.CharField(max_length=50, verbose_name="Pozisyon Seviyesi")
    working_type = models.CharField(max_length=50, verbose_name="Çalışma Tipi")
    city = models.CharField(max_length=50, verbose_name="Şehir")
    department = models.CharField(max_length=100, verbose_name="Departman")
    title = models.CharField(max_length=100, verbose_name="Başlık")
    description = models.TextField(verbose_name="Açıklama")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "İlanlar"


class AdvertTag(models.Model):
    advert = models.ForeignKey(Advert, on_delete=models.PROTECT, verbose_name="İlan")
    name = models.CharField(max_length=100, verbose_name="İsim")

    class Meta:
        verbose_name_plural = "İlan Etiketleri"


class RelUserAdvert(models.Model):
    user = models.ForeignKey(User, verbose_name="Kullanıcı", on_delete=models.PROTECT)
    advert = models.ForeignKey(Advert, verbose_name="İlan", on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = "Kullanıcı İlan İlişkileri"


class RelCandidateUser(models.Model):
    candidate = models.ForeignKey(CandidateInfo, verbose_name="Aday", on_delete=models.PROTECT)
    user = models.ForeignKey(User, verbose_name="Kullanıcı", on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = "Aday Kullanıcı İlişkileri"


class UserExperience(models.Model):
    user = models.ForeignKey(User, verbose_name="Kullanıcı", on_delete=models.PROTECT)
    company = models.ForeignKey(Company, verbose_name="Şirket", on_delete=models.PROTECT)
    mission = models.CharField(max_length=100, verbose_name="Görev")
    start = models.DateField(verbose_name="Başlangıç")
    end = models.DateField(verbose_name="Bitiş", null=True, blank=True)

    class Meta:
        verbose_name_plural = "Kullanıcı Deneyimleri"
