# Generated by Django 4.0.3 on 2024-02-06 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sales',
            name='price',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=12),
        ),
    ]
