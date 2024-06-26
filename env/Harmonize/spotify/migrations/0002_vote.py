# Generated by Django 5.0.4 on 2024-04-11 05:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20201218_1626'),
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('song_id', models.CharField(max_length=50)),
                ('current_song', models.CharField(max_length=50)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
    ]
