# Generated by Django 3.2.7 on 2021-10-22 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coffeeShop', '0002_alter_products_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=5000)),
                ('price', models.FloatField()),
                ('image', models.CharField(max_length=100000)),
                ('amount', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CartTotal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.FloatField()),
            ],
        ),
    ]