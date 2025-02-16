# Generated by Django 4.0.3 on 2024-02-10 00:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_alter_sales_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sales',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='sales',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='sales',
            name='price',
            field=models.PositiveBigIntegerField(),
        ),
        migrations.AlterField(
            model_name='sales',
            name='salesperson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]
