# Generated by Django 5.0.4 on 2024-04-11 05:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0003_alter_vote_current_song'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vote',
            name='current_song',
        ),
    ]
