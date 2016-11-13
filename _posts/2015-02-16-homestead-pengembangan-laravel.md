---
layout: post
title: "Homestead - Lingkungan Pengembangan Laravel"
feature_image: homestead-lingkungan-laravel.png
category: collections
tags: laravel homestead 
comment: true
sitemap: true
sitemap:
  lastmod: 2014-05-12
  priority: 0.5
  changefreq: 'monthly'
---

Sekarang ini *web framework* [Laravel](http://laravel.com) sangat populer di kalangan pengembang web di Indonesia. Banyak yang berpendapat bahwa Laravel sangat mudah untuk digunakan, mudah untuk dipelajari dan skalabilitasnya sangat baik. Tidak berhenti sampai di situ, Laravel juga menyediakan paket lingkungan pengembangan *website* lokal ([Homestead](http://laravel.com/docs/4.2/homestead)). Homestead mirip dengan XAMPP/LAMP namun berbasis [Vagrant](https://www.vagrantup.com) dan [VirtualBox](https://www.virtualbox.org). 

##Mengapa Kita Perlu Homestead?  
Meskipun sangat bagus, masih banyak juga yang berpendapat bahwa instalasi Homestead lebih rumit dibandingkan dengan XAMPP/LAMP. Mengapa kita perlu menggunakan Homestead toh dengan XAMPP/LAMP juga sudah cukup untuk mengembangkan web Laravel secara lokal? Di bawah ini saya uraikan beberapa alasan mengapa kita perlu Homestead.  

###1. Homestead sangat mencerminkan pengembangan *website* pada server yang sesungguhnya.  
Bagi yang biasa membuat *website* dengan XAMPP biasanya akan sulit apabila ingin melakukan pengaturan pada server karena tidak terbiasa untuk mengembangkan *website* di server. Selain itu, performa *website* akan bias karena tergantung dengan performa komputer yang kita miliki. Apa yang sudah kita buat di lokal dengan XAMPP/LAMP belum tentu akan berjalan lancar di server. Dengan Homestead, kita seolah-olah mengembangkan *website* pada server. Kita akan lebih familiar dengan lingkungan server karena praktik pengembangan *website* menggunakan Homestead mirip dengan pengembangan *website* di server. Karena lingkungannya sangat mirip dengan server, kecil kemungkinan *website* yang kita buat tidak berjalan dengan baik di server, apalagi jika spesifikasi server kita lebih baik daripada spesifikasi virtualbox Homestead.  

###2. Homestead lebih lengkap.  
Paket XAMPP/LAMP biasanya hanya terdiri dari Apache, MySQL, PHP dan Perl. Coba kita bandingkan dengan *software-software* yang ditawarkan oleh Homestead:  

- Ubuntu 14.04
- PHP 5.6
- HHVM
- Nginx
- MySQL
- Posgres
- Node.JS (Bower, Grunt dan Gulp)
- Redis
- Memcached
- Beanstalkd
- Laravel Envoy
- Fabric + HipChat Extension  

Selain dari *software* dasar pengembangan *website* PHP, ada *software* tambahan penunjang performa *website* seperti *caching* (Redis, Memcached) dan *queue* (Beanstalkd). Mungkin beberapa dari *software* pada daftar di atas belum akan kita gunakan, tetapi apabila suatu saat kita membutuhkan *software-software* tersebut, kita tidak akan direpotkan lagi dengan instalasi yang rumit.  

###3. Bekerja dalam tim menjadi lebih mudah.  
Tidak ada lagi saling *ngomel* antar anggota tim karena *website* tidak berjalan pada komputer salah satu atau lebih anggota. Dengan menggunakan Homestead, spesifikasi *software* atau versi yang digunakan akan seragam (tentu saja berlaku pada versi Homestead yang sama). Selain itu, Homestead dapat dijalankan pada hampir semua OS sehingga kita tidak perlu melakukan penyeragaman sistem operasi. Seorang desainer web tidak perlu lagi pusing berurusan dengan pengaturan yang aneh-aneh karena programmer dapat dengan mudah menyamakan pengaturan Homestead.  

###4. Komputer kita akan lebih bersih.  
Sebenarnya poin ini mungkin lebih subjektif. Saya lebih suka menggunakan Homestead dibandingkan XAMPP/LAMP karena komputer kita akan bersih dari fail-fail instalasi Apache, PHP, MySQL dkk. Selain itu karena saya adalah *front-end* programmer juga, saya tidak perlu lagi menginstal Node.JS beserta tambahan-tambahannya yang akan mengotori (?) komputer saya karena sudah tersedia di Homestead. Yang tertinggal di komputer kita hanya instalasi VirtualBox saja. 

##Penutup  
Saya sangat menyarankan kamu untuk mulai menggunakan Homestead apabila kamu ingin serius mengembangkan *website* dengan Laravel, baik perorangan maupun dalam tim. Dengan Homestead, kita akan lebih fokus dan lebih produktif dalam mengembangkan *website* tanpa dipusingkan dengan pengaturan-pengaturan yang *njelimet*. Untuk kedepannya saya juga akan memberikan tutorial instalasi Homestead. Semoga artikel ini dapat membantu!. 

##*Update*  
Tutorial instalasi Homestead dapat dilihat di [sini](http://ambercat.rahmanda.net/collections/2015/02/18/instalasi-homestead.html).
