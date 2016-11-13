---
layout: post
title: "Instalasi Django, Framework Web Python"
feature_image: teaser_django.jpg
category: django
tags: django python
comment: true
sitemap:
  lastmod: 2014-05-12
  priority: 0.5
  changefreq: 'monthly'
---

## Apa Itu Django?
Ini bukan judul film koboi yang pernah kamu tonton. Django adalah *framework* web berbasis [Python](http://www.python.org). *Framework* ini sudah populer sebelum filmnya muncul di bioskop, dan sekarang menyaingi kehebatan *framework* [Rails](http://www.rubyonrails.org) yang berbasis [Ruby](http://www.ruby-lang.org). Karena [Django](http://djangoproject.com) itu hebat, maka sangat patut untuk dikuasai. Untuk mulai menguasai [Django](http://djangoproject.com), kita harus menguasai terlebih dahulu cara menginstal [Django](http://djangoproject.com).

## *Requirement*
Pastikan kamu telah menginstall [Python](http://www.python.org) sebelum mengikuti tutorial ini. Versi [Python](http://www.python.org) yang direkomendasikan adalah versi 2.7 ke atas.

## Instalasi  
**pip**  
Karena pengembangan web menggunakan [Django](http://djangoproject.com) banyak berinteraksi dengan terminal, tentunya akan lebih mudah apabila kamu dapat mengunduh [Django](http://djangoproject.com) tanpa meninggalkan jendela terminal kamu. Selain itu kamu juga dapat menginstall *plugin* Python dengan mudah melalui pip. Untuk menginstal pip, berikut langkah-langkahnya :  

1. Unduh *script* [get-pip.py](https://bootstrap.pypa.io/get-pip.py). Simpan *script* tersebut di direktori mana saja. Sebagai contoh, saya menyimpan fail *script*-nya di `D:\tutorial_python\`.  
2. Buka terminal kamu, masuk ke direktori tempat menyimpan *script* yang tadi.  
3. Pada jendela terminal kamu, ketik `sudo python get-pip.py` untuk pengguna Mac atau Linux. Sedangkan untuk pengguna Windows, buka command prompt dengan mode administrator lalu ketik `python get-pip.py`.  
4. Apabila proses install sudah selesai, ketik `pip -V`. Perintah tersebut akan mengeluarkan output berupa versi pip yang diinstal apabila proses instalasi pip tidak *error*.
5. (Untuk pengguna windows) Apabila perintah `pip -V` tidak dikenali pada terminal/command prompt kamu, tambahkan `C:\PythonXX\Scripts\` pada PATH (ganti XX dengan versi Python yang kamu install).  

**virtualenv**  
[Django](http://djangoproject.com) sangat cepat *update*-nya. Hampir tiap bulan akan ada rilis versi terbaru. Hal ini bisa saja menimbulkan kodingan kamu menjadi error karena ada beberapa fungsi [Django](http://djangoproject.com) yang diubah atau dihapus pada versi terbarunya. Dengan virtualenv, kamu dapat menginstal lebih dari satu versi [Django](http://djangoproject.com) pada satu komputer sehingga kamu tidak perlu khawatir aplikasi web kamu error karena *update*. Berikut langkah-langkah menginstall virtualenv :  

1. Buka lagi terminal kamu, ketik `pip install virtualenv`.  
2. Setelah proses instalasi selesai, ketik `pip freeze`. Perintah tersebut akan mengeluarkan output berupa daftar *plugin* yang telah terinstall. Apabila terdapat virtualenv pada output tersebut, maka instalasi virtualenv berhasil.   
3. Selanjutnya masuk ke direktori manapun yang kamu kehendaki.  
4. Ketik `virtualenv django17`. Perintah tersebut akan membuat folder *virtual environment* pada direktori kamu dengan nama django17. Nama dapat diganti sesuai keinginan kamu.   
5. Setelah proses selesai, masuk ke direktori django17 lalu ketik `.\Scripts\activate` untuk mengaktifkan virtualenv. Untuk menonaktikannya, ketik `.\Scripts\deactivate`.

**Django**  
Setelah instalasi virtualenv berhasil dan kamu telah membuat folder virtual yang baru, maka kamu sudah dapat menginstal [Django](http://djangoproject.com). Berikut langkah-langkah menginstal [Django](http://djangoproject.com) :  

1. Pastikan kamu telah berada pada direktori virtual yang sudah diaktifkan.  
2. Ketik `pip install django==1.7` untuk menginstall [Django](http://djangoproject.com) dengan versi 1.7. Apabila kamu ingin menginstall versi terbaru dari [Django](http://djangoproject.com), ketik `pip install django`.  
3. Setelah proses instalasi selesai, ketik `pip freeze` untuk mengetahui apakah [Django](http://djangoproject.com) sudah berhasil terinstall pada folder virtual.
4. Ketik `python .\Scripts\django-admin.py startproject myproject` untuk membuat projek [Django](http://djangoproject.com) baru dengan nama 'myproject'.
5. Ketik `cd myproject` untuk masuk ke dalam direktori projek. Setelah itu ketik `python manage.py runserver` untuk menjalankan server [Django](http://djangoproject.com).
6. Buka `http://localhost:8000` pada browser kamu. Apabila terlihat halaman [Django](http://djangoproject.com), maka kamu telah berhasil membuat projek baru [Django](http://djangoproject.com).  

##Kata Penutup
Bagi kamu yang telah berhasil menginstall [Django](http://djangoproject.com), selamat! Kamu dapat langsung menjelajahi dunia [Django](http://djangoproject.com) lebih lanjut. Bagi yang belum berhasil, jangan bersedih. Banyak jalan menuju roma, silakan bertanya melalui kolom komentar yang tersedia.








