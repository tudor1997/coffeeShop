# Generated by Django 3.2.7 on 2021-10-22 08:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coffeeShop', '0003_cart_carttotal'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CartTotal',
        ),
    ]