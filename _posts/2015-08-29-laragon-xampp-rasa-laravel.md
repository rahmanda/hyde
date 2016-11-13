---
layout: post
title: "Laragon - XAMPP Rasa Laravel"
feature_image: laragon-xampp-rasa-laravel.png
category: collections
tags: laragon laravel
comment: true
sitemap:
  lastmod: 2015-08-29
  priority: 0.9
  changefreq: 'monthly'
---

Pengembangan web Laravel menggunakan [Homestead](http://ambercat.rahmanda.net/collections/2015/02/16/homestead-pengembangan-laravel.html) sering dianggap sangat ribet, terutama bagi para pengguna Windows. Banyak aplikasi pendukung yang harus diinstal terlebih dahulu untuk memenuhi *requirement* Homestead di luar Virtualbox dan Vagrant, misalnya Git untuk membuat ssh public key dan Putty untuk koneksi ssh ke virtual server. Meskipun sepertinya kamu telah mengikuti petunjuk dengan baik, kadang-kadang ada saja masalah yang timbul saat menjalankan Homestead dan kita tidak tahu bagaimana cara memperbaikinya (alias mentok). Hal ini tentu saja membuat kamu jengkel dan menjadi malas belajar Laravel. Bagi kamu yang ingin belajar Laravel namun Homesteadnya masih bermasalah, kamu dapat menggunakan Laragon.

[Laragon](http://laragon.org) adalah aplikasi *web stack* yang sangat *user friendly* dan mendukung lingkungan sistem operasi Windows dengan sangat baik. Seperti halnya [XAMPP](http://www.apachefriends.org/index.html), Laragon menyediakan program-program pendukung pengembangan web seperti Apache Server, PHP, dan MySQL. Yang membuat Laragon berbeda dari XAMPP adalah Laragon juga menyediakan program-program lain yang biasanya tersedia juga di Homestead, yaitu Memcached dan Redis. Sehingga kamu tidak perlu repot-repot untuk menginstal program tersebut secara terpisah.  

##Instalasi Laragon
Untuk menginstal aplikasi Laragon, terlebih dahulu unduh aplikasinya di [laragon.org](http://laragon.org). File instalasinya berbentuk `.exe` sehingga langsung dapat diinstal dengan mengklik programnya saja. Pada jendela instalasi, kamu tidak perlu mengutak-atik pengaturannya, cukup mengklik tombol *next* sampai pada akhir tahapan instalasi.  

##Menjalankan Server  
Untuk menjalankan server, kamu hanya perlu mengklik tombol *start*.  
![Tampilan Laragon saat server sedang berjalan]({{ site.url }}/assets/img/2015-08-29-laragon-xampp-rasa-laravel/jendela-laragon.png)  

##Instalasi Laravel
Untuk menginstal laravel sangat mudah. Klik kanan pada jendela aplikasi Laragon, lalu pilih Laravel. Pilih versi Laravel yang kamu inginkan (5 atau 4), lalu masukkan nama projek Laravel kamu. Setelah itu secara otomatis Laragon akan mengunduh file Laravel yang dibutuhkan. Projek Laravel kamu akan tersimpan pada direktori `c:/laragon/www/{nama projek}`.
![Buat projek laravel baru]({{ site.url }}/assets/img/2015-08-29-laragon-xampp-rasa-laravel/buat-projek-baru-laragon.png)

##Menjalankan Projek Laravel
Tutup program Laragon terlebih dahulu (klik kanan - exit), lalu jalankan lagi aplikasi Laragon dengan mode administrator (klik kanan shortcut Laragon - run as administrator). Nyalakan lagi server, dan buka browser kamu. Ketik pada browser kamu `http://{nama projek kamu}.dev`, dan Laravel tampil pada browser. Sekarang kamu sudah siap mengembangkan web Laravel! Buka *command prompt* dengan mengklik tombol shell pada jendela Laragon dan kamu sudah bisa mengakses perintah-perintah artisan loh~  

Laragon memudahkan kita untuk memulai mengembangkan web Laravel dengan cepat di Windows tanpa perlu repot dengan banyak pengaturan yang aneh-aneh. Meskipun begitu, Laragon juga masih memiliki kekurangan, yaitu apabila kamu bekerja secara tim, kode yang kamu buat belum tentu bisa berjalan dengan mulus di komputer teman Anda karena lingkungan sistem operasinya yang mungkin berbeda. Selain itu karena berbasis Windows, kita tidak bisa memanfaatkan Cron untuk membuat program yang berjalan otomatis secara periodik. Apabila kamu butuh Cron, mau tidak mau Anda harus menggunakan Homestead.
