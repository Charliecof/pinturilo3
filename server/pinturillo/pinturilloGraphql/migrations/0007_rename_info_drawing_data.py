# Generated by Django 4.0.5 on 2022-06-19 06:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pinturilloGraphql', '0006_drawing'),
    ]

    operations = [
        migrations.RenameField(
            model_name='drawing',
            old_name='info',
            new_name='data',
        ),
    ]
