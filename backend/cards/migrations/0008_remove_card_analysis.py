# Generated by Django 5.0.7 on 2024-08-26 16:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0007_remove_card_image_card_public_id_card_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='card',
            name='analysis',
        ),
    ]
