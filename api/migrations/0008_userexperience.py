# Generated by Django 4.0.3 on 2022-04-06 01:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_reluserschool_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mission', models.CharField(max_length=100, verbose_name='Görev')),
                ('start', models.DateField(verbose_name='Başlangıç')),
                ('end', models.DateField(blank=True, null=True, verbose_name='Bitiş')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.company', verbose_name='Şirket')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Kullanıcı')),
            ],
            options={
                'verbose_name_plural': 'Kullanıcı Deneyimleri',
            },
        ),
    ]
