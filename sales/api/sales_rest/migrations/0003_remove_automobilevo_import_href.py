# Generated by Django 4.0.3 on 2024-02-06 17:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_sales_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='import_href',
        ),
    ]
