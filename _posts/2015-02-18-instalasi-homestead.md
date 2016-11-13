---
layout: post
title: "Instalasi Homestead Laravel"
feature_image: instalasi-homestead.png
category: collections
tags: laravel homestead 
comment: true
sitemap:
  lastmod: 2014-05-12
  priority: 0.5
  changefreq: 'monthly'
---

Pada [artikel sebelumnya](http://ambercat.rahmanda.net/collections/2015/02/16/homestead-pengembangan-laravel.html) saya sudah pernah menjelaskan beberapa keuntungan menggunakan Homestead untuk pengembangan *website* Laravel. Pada artikel ini saya akan menjelaskan langkah-langkah instalasi Homestead. Sebelum menginstal Homestead, ada beberapa hal yang perlu disiapkan terlebih dahulu. Unduh :  

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)  
- [Vagrant](https://www.vagrantup.com/downloads.html)
- [Git](http://git-scm.com/downloads)  

sesuai dengan sistem operasi yang kamu gunakan. Setelah semuanya selesai diunduh, lakukan instalasi secara berurutan untuk Virtualbox, Vagrant dan Git. Apabila kamu baru pertama kali menginstal Git untuk sistem operasi Windows, pastikan kamu mencentang pilihan 'Add Path to..' saat instalasi. 

{% note Saya menggunakan Ubuntu pada tutorial ini. Untuk pengguna Windows, beberapa perintah instalasi yang terkait dengan `bash` dan `ssh` dapat dijalankan pada Git Bash. Untuk pengaturan yang terkait dengan direktori dapat menyesuaikan dengan jenis OS yang digunakan. %} 

Pastikan kamu dapat menjalankan perintah ini di terminal kamu.  

{% highlight console %}
vagrant -v
{% endhighlight %}  

Instalasi Vagrant biasanya akan secara otomatis menambahkan PATH pada sistem kamu. Apabila perintah tersebut tidak dikenali atau *error*, kamu mungkin perlu me-*restart* komputer kamu lalu coba jalankan kembali perintah tersebut (biasanya hal demikian terjadi pada Windows). 

##Menambahkan box Homestead pada Vagrant  
Sebenarnya, Homestead adalah paket box untuk Vagrant. Sehingga yang akan kita lakukan sekarang adalah menambah box Homestead pada Vagrant dengan menjalankan perintah:  

{% highlight console %}
vagrant box add laravel/homestead
{% endhighlight %}  

Perintah di atas akan mengunduh *file* box Homestead secara otomatis dari *cloud service* Vagrant. Ukuran *file* box adalah sekitar 1 GB sehingga proses instalasi dan pengundunhan mungkin akan memakan waktu yang cukup lama. Apabila koneksi internet kamu kurang baik, abaikan perintah sebelumnya atau hentikan proses pengunduhan dengan mengetik `ctrl + c`. Untuk mengatasinya, kamu dapat mengunduh box Homestead secara manual dari [https://vagrantcloud.com/laravel/boxes/homestead/versions/0.2.2/providers/virtualbox.box](https://vagrantcloud.com/laravel/boxes/homestead/versions/0.2.2/providers/virtualbox.box). 

{% note Pada saat saya menulis artikel ini, versi Homestead yang terbaru adalah 0.2.2. Anda dapat mengecek versi terbaru Homestead di [sini](https://vagrantcloud.com/laravel/boxes/homestead/versions/0.2.2/) %}  

Setelah box terunduh, ganti direktori terminal ke direktori tempat menyimpan unduhan, lalu jalankan perintah berikut:  

{% highlight console %}
vagrant box add laravel/homestead homestead-0-2-2.box
{% endhighlight %}  

{% note Beberapa perintah atau pengaturan yang kamu lihat setelah ini ada yang dituliskan dengan kurung kurawal `{ }`. Tujuannya adalah ingin menkamui bahwa pengaturan tersebut dapat kamu ganti sesuai keinginan, dengan terlebih dahulu membaca keterangan yang ada di dalamnya. %} 

##Menginstal Homestead CLI  
Lakukan `cd` ke direktori tempat kamu ingin menaruh semua projek Laravel, lalu jalankan perintah berikut: 

{% highlight console %}
git clone https://github.com/laravel/homestead.git Homestead
{% endhighlight %}  

Setelah unduhan selesai, masuk ke direktori Homestead lalu jalankan perintah `bash init.sh` untuk menginsialisasi *file* konfigurasi `Homestead.yaml`. *File* `Homestead.yaml` akan tersimpan pada direktori `~/.homestead`.  

{% note Letak direktori `.homestead` akan berbeda tergantung dengan sistem operasi yang kamu gunakan. Untuk windows kamu dapat menemukan direktori tersebut di *drive* `C:\`. %}

##Konfigurasi spesifikasi komputer virtual
Homestead.yaml yang telah dihasilkan sebelumnya merupakan *file* konfigurasi untuk Homestead kamu. Sekarang buka *file* Homestead.yaml pada aplikasi *text editor* kamu. Pada baris awal Homestead.yaml akan terlihat pengaturan seperti dibawah ini:  
{% highlight console %}
---
ip: "192.168.10.10"
memory: 2048
cpus: 1
{% endhighlight %}  
Konfigurasi pada bagian ini sudah sangat jelas. Untuk `ip` kamu bisa menggantikannya dengan alamat ip komputer kamu, untuk `memory` kamu bisa menggantikannya dengan kapasitas ram komputer, sedangkan untuk `cpus` kamu bisa menggantikannya dengan jumlah *core* pada processor komputer kamu. Namun pada tutorial ini, kamu dapat mengabaikan konfigurasi tersebut dengan nilai *default*.  

##Membuat SSH key
Untuk dapat terhubung ke Homestead, kita perlu membuat SSH key. Anda bisa membuatnya dengan menjalankan perintah ini di terminal:  

{% highlight console %}
ssh-keygen -t rsa -C "{nama user}@homestead"
{% endhighlight %}

Apabila terminal meminta kamu untuk memasukkan alamat direktori atau *password*, kamu dapat langsung menekan tombol 'enter' pada *keyboard*.  

{% highlight console %}
user@PC:~$ ssh-keygen -t rsa -C user@homestead
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_rsa.
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
The key fingerprint is:
a7:49:79:1c:cb:fa:d0:de:f6:c3:3e:4f:ef:7e:ae:60 user@homestead
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|                 |
|          .      |
|         + o     |
|        S *      |
|       . B       |
|        = . E.  .|
|         + o..+.o|
|          o..o+OB|
+-----------------+
{% endhighlight %}      

Apabila kamu menggunakan Windows, kamu dapat menjalankan perintah tersebut pada Git Bash. Setelah SSH key selesai dibuat, masukkan alamat direktori tempat menyimpan *file* SSH key pada pengaturan di bawah ini:  

{% highlight console %}
authorize: ~/.ssh/id_rsa.pub 

keys:
    - ~/.ssh/id_rsa 
{% endhighlight %} 

##*Mapping* folder projek Homestead  
Agar projek Laravel pada direktori lokal kamu bisa dijalankan pada Homestead, kamu harus memetakan direktori projek kamu. Asumsinya adalah semua projek Laravel kamu terletak pada satu direktori yang sama. Pada pengaturan berikut:   

{% highlight console %}
folders:
    - map: ~/{lokasi kamu menyimpan kumpulan projek laravel}
      to: /home/vagrant/projects
{% endhighlight %}   

Pengaturan `to` menunjukkan direktori projek pada Homestead. Untuk tutorial ini kamu tidak perlu mengganti pengaturan `to`. Yang perlu dipahami adalah direktori yang alamatnya kamu set ke `to` nanti akan tersinkron secara otomatis dengan direktori yang alamatnya dideklarasikan di `map`.  

Setelah itu kamu harus mengganti konfigurasi pada bagian `sites`:  

{% highlight console %}
sites:
    - map: {nama aplikasi atau situs}.app
      to: /home/vagrant/projects/{nama folder projek}/public
{% endhighlight %}   

##Menjalankan Homestead
Beri nama domain sesuai dengan nama situs yang kamu masukkan pada konfigurasi `site` Homestead.yaml pada *file* `hosts` komputer kamu. Untuk sistem operasi Linux dan Mac, *file* `hosts` dapat ditemukan pada direktori `/etc/hosts`. Sedangkan untuk Windows, *file* `hosts` terdapat pada direktori `C:\Windows\System32\drivers\etc\hosts`. Buka *file* `hosts` pada aplikasi edit teks, lalu tambahkan baris berikut ini:  
{% highlight console %}
192.168.10.10  {nama aplikasi atau situs -- sama dengan pengaturan sites map di Homestead.yaml}.app
{% endhighlight %}  
Pastikan alamat IP-nya sama dengan konfigurasi Homestead.yaml kamu. Ganti direktori kamu sekarang ke direktori Homestead, lalu jalankan perintah dibawah ini:  
{% highlight console %}
vagrant up
{% endhighlight %}  
Perintah di atas akan menjalankan box Homestead. Setelah perintah tersebut selesai dijalankan, kamu dapat membuka situs kamu di browser dengan url. 
{% highlight console %}
http://{nama aplikasi atau situs}.app
{% endhighlight %}

{% note Pada beberapa kasus, kamu mungkin tidak dapat melakukan koneksi ke homestead setelah menjalankan `vagrant up` karena terlalu banyak terjadi *ssh connection timeout*. Hal ini dapat diatasi dengan beberapa cara: 1. Periksa apakah komputer kamu telah menyalakan *virtualization technology* pada bios. Anda dapat mengikuti [artikel ini](http://www.sysprobs.com/disable-enable-virtualization-technology-bios) untuk mengeset pengaturannya; 2. Apabila komputer kamu tidak mendukung *virtualization technology*, ikuti langkah-langkah pada jawaban di [stackoverflow ini](http://stackoverflow.com/questions/24823456/vagrant-laravel-homestead-doesnt-boot-up-windows-7).  %}

##Mematikan Homestead  
Apabila kamu telah menyelesaikan projek kamu, kamu dapat mematikan Homestead dengan menjalankan perintah berikut :  
{% highlight console %}
vagrant suspend
{% endhighlight %}  
Pada praktiknya, kamu harus menjalankan perintah tersebut sebelum kamu mematikan komputer. Anda dapat menjalankan Homestead kembali dengan perintah `vagrant up`.  

##Penutup  
Dengan mengikuti langkah-langkah tersebut, kamu dapat menggunakan Homestead sebagai server virtual untuk *website* Laravel. Tentunya masih banyak lagi fitur-fitur Homestead yang dapat dieksplorasi secara mandiri. Apabila kamu memiliki pertanyaan atau kesulitan dalam menginstal Homestead, silakan tinggalkan komentar pada kolom yang tersedia.
 










