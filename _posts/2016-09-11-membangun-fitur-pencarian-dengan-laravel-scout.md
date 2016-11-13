---
layout: post
title: "Membangun Fitur Pencarian dengan Laravel Scout"
feature_image: membangun-fitur-pencarian-dengan-laravel-scout.png
category: code
tags: php laravel 
comment: true
source_code: https://github.com/rahmanda/ambercat-scout
sitemap:
  lastmod: 2016-09-11
  priority: 0.9
  changefreq: 'monthly'
---  

Laravel versi 5.3 telah memiliki fitur pencarian _full-text_ via _package_ [Scout](https://github.com/laravel/scout). Implementasinya sangat mudah karena Scout sudah terintegrasi dengan Eloquent ORM. Hingga artikel ini ditulis, Scout sudah mendukung _search engine_ [Algolia](https://www.algolia.com) dan [Elasticsearch](https://www.elastic.co/products/elasticsearch). Tapi tidak menutup kemungkinan ke depannya akan ditambahkan lagi _search engine_ yang lain untuk memenuhi kebutuhan penggunanya.  

## Cara Pemasangan Scout  
Sebelumnya pastikan kamu telah membuat sebuah projek Laravel versi 5.3, lalu buka _file_ `composer.json` pada editor kamu. Tambahkan _dependency_ untuk Scout seperti ini:  

{% highlight json %}
"require": {
        "php"              : ">=5.6.4",
        "laravel/framework": "5.3.*",
        "laravel/scout": "1.1.*",
		...
}
{% endhighlight %}  

Jalankan `composer update` pada terminal untuk menginstal Scout pada projek Laravel kamu (note: butuh koneksi internet). Setelah proses instalasi selesai, jalankan `php artisan vendor:publish` untuk menghasilkan _file_ konfigurasi untuk Scout. Selanjutnya, buka _file_ `config/app.php` lalu tambahkan `Laravel\Scout\ScoutServiceProvider::class` pada bagian `providers`.  

## Menggunakan Scout pada Model  
Pada dasarnya, penggunaan Scout terdiri dari dua langkah, yaitu mengimpor kelas trait `Laravel\Scout\Searchable` dan menggunakan trait tersebut pada `model` yang telah kamu buat. Contoh penggunaannya dapat dilihat pada kode di bawah ini:  

{% highlight php %}
<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Modelku extends Model
{
	use Searchable;
}
{% endhighlight %}  

## Melakukan Pencarian  
Untuk melakukan pencarian, kamu bisa menambahkan kode di bawah ini di suatu _method_ di `controller`:  

{% highlight php %}
$result = <Nama Namespace>\<Nama Model>::search('<kueri pencarian>')->get();
{% endhighlight %}  

Variabel `$result` akan menyimpan kumpulan `model` Eloquent dalam bentuk `array` dan dapat dimanfaatkan dengan mengirimkan variabel tersebut lewat fungsi `view()`.  

## Integrasi dengan Elasticsearch  
Sampai pada tahap ini Scout kamu belum bisa digunakan karena kamu belum mengatur _search engine_-nya. Di antara dua pilihan _search engine_ yang di dukung oleh Scout, yang dapat diinstal di lokal dan gratis adalah Elasticsearch. Untuk instalasinya kamu perlu menginstal Java-JRE terlebih dahulu. Setelah itu unduh Elasticsearch-nya [disini](https://www.elastic.co/downloads/elasticsearch). Bagi yang menggunakan OS Debian/Ubuntu, pilih versi `deb`. Setelah _file_ selesai terunduh, instal dengan menjalankan perintah `sudo dpkg -i <nama-file-elasticsearch.deb>`. Untuk mengecek apakah Elasticsearch telah terinstal dan berjalan dengan baik, jalankan perintah `curl -X GET http://localhost:9200`.  

{% note Cara instalasi Elasticsearch pada OS Windows kedepannya akan ditambahkan di artikel ini. %}  

Untuk berkomunikasi dengan Elasticsearch dengan php kita perlu menginstal librari `elasticsearch-php` dengan menjalankan perintah `composer install elasticsearch\elasticsearch-php`.  

Setelah semuanya terinstal, buka _file_ `config/scout.php`, ganti `driver` dengan nilai 'elasticsearch' dan isi `host` pada konfigurasi bagian Elasticsearch dengan 'http://localhost:9200'. Hasil konfigurasinya kurang lebih akan seperti di bawah ini:  

{% highlight php %}
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Search Engine
    |--------------------------------------------------------------------------
    |
    | This option controls the default search connection that gets used while
    | using Laravel Scout. This connection is used when syncing all models
    | to the search service. You should adjust this based on your needs.
    |
    | Supported: "algolia", "null"
    |
    */

    'driver' => env('SCOUT_DRIVER', 'elasticsearch'),
	
	...
	...
	
    'elasticsearch' => [
        'index' => env('ELASTICSEARCH_INDEX', 'laravel'),

        'config' => [
            'hosts' => [
                env('ELASTICSEARCH_HOST', 'http://localhost:9200')
            ],
        ],
    ],

];
{% endhighlight %}

Kamu mungkin akan perlu melakukan _indexing_ apabila `model` kamu telah memiliki _record_ di _database_. Caranya adalah dengan menjalankan perintah `php artisan scout:import "<Nama Namespace>\<Nama Model>"`.  

## Testing  
Jalankan `php artisan tinker` di terminal. Pada `shell` yang muncul, ketik `<Nama Namespace>\<Nama Model>::search('<kata kunci pencarian>')->get()` lalu tekan `<enter>`.  

{% note Contoh kasus: Kamu punya `model` `App\Models\Makanan`. Pada _database_ telah tersimpan _record_ `Makanan` dengan nama 'Kentang Goreng', 'Kentang Rebus' dan 'Kentang Bakar'. Dengan menjalankan perintah `App\Models\Makanan::search('kentang')->get()` pada `shell`, kamu akan mendapatkan tiga _record_ tersebut yang relevan dengan kata kunci 'kentang'. %}  

## Penutup  
Dengan Scout, kita dapat dengan mudah membangun fitur pencarian pada projek Laravel. Untuk lebih jelasnya kamu dapat mempelajari penerapan Scout pada [_source code_ ini](https://github.com/rahmanda/ambercat-scout). Selamat belajar~
