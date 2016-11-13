---
layout: post
title: "Unchaining Django - Part 1"
feature_image: teaser_unchained_django.png
category: django
tags: django python
comments: true
sitemap:
  lastmod: 2014-05-12
  priority: 0.5
  changefreq: 'monthly'
---

Pada tulisan kali ini, saya akan berbagi ilmu mengenai Django, yaitu *framework* web berbasis Python. Saya berasumsi bahwa kamu semua telah menginstall Django via virtualenv sebelumnya. Bagi kamu yang belum menginstall Django, silakan ikuti tutorial instalasi Django [disini](http://ambercat.rahmanda.net/django/instalasi-django/) terlebih dahulu sebelum mengikuti tutorial ini.  

Melalui serial tutorial ini, kita akan membuat sebuah aplikasi *polling* sederhana yang memiliki fitur :  
1. Melihat *polling* dan memberikan *vote* pada *polling* tersebut.  
2. Admin yang dapat membuat, mengedit dan menghapus *polling*.  

## Outline
Yang dibahas pada tutorial ini adalah:  
1. Membuat projek Django.  
2. Membuat `apps` pada projek Django.  

## Membuat projek baru
Buka terminal/command line kamu, `cd` ke direktori virtualenv yang pernah kamu buat saat mengikuti [tutorial instalasi](http://ambercat.rahmanda.net/django/instalasi-django/). Setelah itu jalankan perintah berikut:  

{% highlight console %}
$ python .\Scripts\django-admin.py startproject mysite
{% endhighlight %}  

Perintah ini akan membuat folder `mysite` pada direktori kamu saat ini. Struktur dari projek `mysite` akan terlihat seperti dibawah ini:  
{% highlight console %}
mysite/
	manage.py
	mysite/
		__init__.py
		setting.py
		urls.py
		wsgi.py
{% endhighlight %}  
Berikut penjelasan rincinya:  

*	Folder `mysite` yang paling luar hanya merupakan kontainer untuk projek kamu. Anda dapat me-*rename* folder tsb. sesuai keinginan kamu.  
*	manage.py: Sebuah *script* command-line yang memungkinkan kamu untuk berinteraksi dengan projek Django dengan berbagai cara.  
*	Folder `mysite` yang di dalam adalah projek Django kamu sebenarnya yang terdiri dari beberapa *script* Python.  
*	`mysite/__init__.py`: File kosong yang berfungsi untuk menkamui direktori ini agar dikenali sebagai sebuah *package* oleh Python.  
*	`mysite/settings.py`: Konfigurasi untuk projek Django.  
*	`mysite/urls.py`: Deklarasi url untuk projek Django. Bisa juga dianggap sebagai 'Daftar Isi'nya projek Django.  
*	`mysite/wsgi.py`: Sebuah *entry-point* untuk mengecek kompabilitas WSGI pada server kamu.

## Konfigurasi *Database*
Buka `mysite/setting.py` pada teks editor kamu. Secara *default*, Django menggunakan SQLite sebagai *database*. Untuk serial tutorial ini *database* yang digunakan adalah SQLite.  
Apabila kamu ingin menggunakan *database* lain, kamu perlu menginstall *plugin* tambahan dan mengubah konfigurasi `DATABASE` sesuai dengan konfigurasi koneksi *database* yang digunakan. Detil konfigurasinya dapat kamu lihat pada dokumentasi [`DATABASE`](https://docs.djangoproject.com/en/1.7/ref/settings/#std:setting-DATABASES). Untuk saat ini kamu hanya perlu mengedit `TIMEZONE` sesuai dengan zona waktu wilayah kamu, misal
`Asia/Jakarta` (daftar zona waktu dapat dilihat [disini](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)).  
Perhatikan konfigurasi `INSTALLED_APPS`. Konfigurasi tersebut berisikan nama semua *apps* Django yang telah aktif pada projek kamu. *Apps* dapat digunakan pada banyak projek, dan kamu dapat mendistribusikannya untuk projek orang lain.  
Secara *default*, `INSTALLED_APPS` terdiri dari:  

* `django.contrib.admin` - Aplikasi admin, akan digunakan pada tutorial selanjutnya.  
* `django.contrib.auth` - Sistem otentikasi.  
* `django.contrib.contenttypes` - *Framework* untuk tipe konten.  
* `django.contrib.sessions` - Sistem *session*.  
* `django.contrib.messages` - Sistem perpesanan.  
* `django.contrib.staticfiles` - *Framework* untuk mengelola fail statis.  

Beberapa dari aplikasi tsb. memerlukan sedikitnya satu tabel, sehingga kita perlu membuat tabel pada *database* sebelum dapat menggunakannya. Untuk membuatnya, jalankan perintah dibawah ini:  
{% highlight console %}
$ python manage.py migrate
{% endhighlight %}  

Perintah `migrate` akan mencari konfigurasi `INSTALLED_APPS` dan membuat tabel yang dibutuhkan menurut konfigurasi *database* pada `mysite/settings.py`.  

## Menjalankan server  
`cd` ke *root* dari direktori `mysite`, lalu jalankan perintah berikut:

{% highlight console %}
$ python manage.py runserver
{% endhighlight %}  

*Output*-nya akan terlihat seperti dibawah ini:  

{% highlight console %}
Performing system checks...

0 errors found
September 22, 2014 - 15:50:53
Django version 1.7, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
{% endhighlight %} 

Setelah server berhasil dijalankan, buka `http://127.0.0.1:8000/` pada *browser* kamu. Anda akan melihat halaman 'Welcome to Django'. Untuk mengganti *port* dan IP, jalankan perintah berikut:  
{% highlight console %}
$ python manage.py runserver 0.0.0.0:8000
{% endhighlight %} 

## Membuat model  
Untuk membuat *apps*, terlebih dahulu kita buat modelnya. Pastikan kamu berada pada direktori yang sama dengan `manage.py` dan jalankan perintah berikut:  
{% highlight console %}
$ python manage.py startapp polls
{% endhighlight %}  
Perintah tersebut akan membuat direktori `polls` yang memiliki struktur seperti di bawah ini:  
{% highlight console %}
polls/
	__init__.py
	admin.py
	migrations/
		__init__.py
	models.py
	tests.py
	views.py
{% endhighlight %}  
Kita akan membuat dua model: `Question` dan `Choice`. `Question` terdiri atas dua *field*, yaitu *question* dan *publication date*. Sedangkan `Choice` terdiri atas *text of choice* dan *vote*. Setiap `Choice` memiliki relasi dengan sebuah `Question`. Konsep tersebut direpresentasikan dengan *class*. Edit `polls/models.py` sehingga terlihat seperti di bawah ini:  
{% highlight console %}
from django.db import models

class Question(models.Model): 
	question_text = models.CharField(max_length=200) 
	pub_date = models.DateTimeField('date published')

class Choice(models.Model): 
	question = models.ForeignKey(Question) 
	choice_text = models.CharField(max_length=200) 
	votes = models.IntegerField(default=0) 
{% endhighlight %}  
Setiap *field* direpresentasikan oleh sebuah *class* `Field`, misal `CharField` untuk *field* dengan tipe data `char` dan `DateTimeField` untuk *field* dengan tipe data `datetime`.  Beberapa *field* membutuhkan argumen tertentu. Sebagai contoh, `CharField` membutuhkan argumen berupa nilai `max_length`. Hal ini bukan sekedar digunakan pada skema *database* saja, melainkan juga sebagai validasi.  

Perhatikan bahwa relasi antara `Question` dan `Choice` dideklarasikan dengan menggunakan `ForeignKey`. Hal ini menjelaskan bahwa setiap `Choice` memiliki relasi dengan satu `Question`. Django mendukung semua relasi *database* yang umum seperti *many-to-many* dan *one-to-one*.  

## Mengaktifkan Model  
Edit `mysite/settings.py`, dan ubah konfigurasi `INSTALLED_APPS` untuk memasukan `polls` seperti di bawah ini:  
{% highlight console %}
INSTALLED_APPS = ( 
'django.contrib.admin', 
'django.contrib.auth', 
'django.contrib.contenttypes',
'django.contrib.sessions', 
'django.contrib.messages', 
'django.contrib.staticﬁles', 
'polls', 
)
{% endhighlight %}  
Setelah itu jalankan perintah di bawah ini:  
{% highlight console %}
$ python manage.py makemigrations polls
{% endhighlight %}  
*Output*-nya akan terlihat seperti di bawah ini:  
{% highlight console %}
Migrations for ’polls’:
	0001_initial.py:
		- Create model Question
		- Create model Choice
		- Add field question to choice
{% endhighlight %}  
Dengan menjalankan perintah di atas, kamu telah memberitahu Django bahwa kamu telah membuat beberapa perubahan pada model kamu dan kamu ingin perubahan tsb. disimpan sebagai *migration*. Untuk melihat seperti apa perintah SQL yang dijalankan oleh Django, jalankan perintah berikut:  
{% highlight console %}  
$ python manage.py sqlmigrate polls 0001
{% endhighlight %}  
Sekarang jalankan kembali `migrate` untuk membuat tabel yang sesungguhnya pada *database*:  
{% highlight console %}
$ python manage.py migrate
{% endhighlight %}  

## Menggunakan API
Untuk mengaktifkan `shell` Python, gunakan perintah berikut:  
{% highlight console %}
$ python manage.py shell
{% endhighlight %}  
Setelah itu eksplor *database API* :
{% highlight console %}
{% endhighlight %}
### Credit ###
Sebenarnya tutorial ini bukan buatan saya, melainkan saya hanya membantu menerjemahkan dari tutorial aslinya di [djangoproject.com](http://djangoproject.com) yang berbahasa Inggris (tentunya sambil saya ikuti juga tutorialnya). Bagi yang tidak punya waktu untuk menunggu versi Bahasa Indonesianya muncul di situs ini silakan kunjungi situs sumbernya.
