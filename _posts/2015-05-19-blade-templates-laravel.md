---
layout: post
title: "Blade - Mengenal Template Engine Laravel 4"
feature_image: laravel-blade.png
category: code
tags: php laravel 
comment: true
sitemap:
  lastmod: 2015-05-19
  priority: 0.9
  changefreq: 'monthly'
---

Laravel telah menyediakan *template engine* Blade pada paket *framework*-nya untuk memudahkan kita mengorganisir kode-kode html pada *view*. Dengan Blade, redundansi pada kode-kode html dapat dihilangkan dengan cara memisahkan kode-kode tersebut ke dalam *file-file* terpisah. Kode-kode tersebut dapat kita kombinasikan menjadi satu halaman html lengkap. Selain itu, kode-kode html tadi masih bisa kita pakai untuk membuat halaman-halaman html yang lain.  

Misalkan kita ingin membuat *website e-commerce* produk sepatu olahraga. *E-commerce* ini memiliki elemen-elemen seperti berikut:  
1. Menu utama yang terletak pada bagian atas di setiap halaman *website*.  
2. Daftar produk yang dijual terletak setelah navigasi.  
3. *Footer* yang berisikan info toko pada bagian paling bawah di setiap halaman *website*.  

Beberapa dari elemen tersebut ada yang selalu dibuat pada setiap halaman *website*. Elemen-elemen yang seperti itu dapat kita buat *template*-nya sehingga kita tidak perlu menuliskannya berulang kali pada setiap halaman *website*.  

Pada artikel kali ini saya akan memberikan contoh penggunaan Blade untuk membuat sebuah *homepage* berdasarkan kasus tersebut. Agar struktur projek kita lebih rapi, semua *template* yang kita buat perlu kita simpan pada folder `templates` di dalam folder `app/view`.  

{% note Semua *template* Blade memiliki ekstensi `.blade.php`.  %}

## Membuat *Routing*

Mula-mula kita buat *routing* sederhana. Buka *file* `app/route.php`, lalu tulis kode berikut ini:  
{% highlight php5 startinline %}
Route::get('/', array('as' => 'home', function() {
  // buat mockup data
  $produks = array();
  for($i = 0; $i < 20; $i++) {
    $produk = array(
      'name' => 'Nama produk',
      'category' => 'Kategori produk'
    );
    array_push($produks, $produk);
  }

  View::make('home', array(
    'products' => $produks
  ));
}));
{% endhighlight %}  

Pada kode di atas, kita mengarahkan alamat url `/` untuk mengambil *template* `home.blade.php` pada folder *view*. Untuk mempermudah kita mengambil alamat `route` pada *template*, kita juga menggunakan parameter tambahan `as` .

## Membuat *Master Template*

Kita perlu membuat *master template* untuk struktur halaman html. Buat *file* `master.blade.php` pada folder `templates`, lalu tulis kode di bawah ini.  
{% highlight html %}
<html>
<head>
  <meta charset="utf-8">
  <title>E-commerce</title>
  <link rel="stylesheet" type="text/css" href="{% raw %}{{ URL::asset('style.css') }}{% endraw %}">
</head>
<body>
  {% raw %}
  @include('templates/menu')
  @yield('content')
  {% endraw %}
</body>
</html>
{% endhighlight %}

Ada beberapa sintaks Blade pada `master.blade.php` ini. Pada tag `<body>`, kita menggunakan `@include()` untuk menyelipkan kode yang berasal dari *template* lain. Parameter yang dimasukkan adalah lokasi penyimpanan *template* yang kita buat. Apabila kita memasukkan string 'templates/header' sebagai parameter, Blade akan mengambil kode `menu.blade.php` di dalam folder `templates`.  

Selain `@include()`, kita juga menggunakan `@yield()`. Fungsi `@yield()` digunakan untuk menandai sebuah bagian pada *template*. Parameternya adalah string sebagai nama untuk bagian tersebut. Nantinya, bagian yang sudah ditandai dengan `@yield()` dapat kita isi dengan kode-kode lain diluar kode-kode yang terdapat pada `master.blade.php`.  

Pada tag `<link>`, kita menuliskan sintaks *double braces* `{% raw %}{{}}{% endraw %}`. Sintaks ini digunakan untuk mencetak variabel yang kita kirim melalui [Controller](http://laravel.com/docs/4.2/controllers) atau [Route](http://laravel.com/docs/4.2/routing). Bisa juga digunakan untuk mencetak *output* dari fungsi-fungsi [Helpers](http://laravel.com/docs/4.2/helpers). Pada contoh ini saya menggunakan salah satu fungsi Helpers, yaitu `URL::asset()` untuk mendapatkan alamat url dari *file* css yang diletakkan pada folder `public`.

{% note Sintaks `{{}}` diterjemahkan oleh Blade menjadi `<?php ?>`. %}

## Membuat *Template* Menu

Karena sebelumnya kita menulis `@include('templates/menu')`, maka selanjutnya kita buat *file* `menu.blade.php` pada folder `templates`. Tulis kode html seperti di bawah ini:  
{% highlight html %}  
<nav class="top-menu">
  <ul>
    <li><a href="{% raw %}{{ route('home') }}{% endraw %}">Home</a></li>
    <li><a href="#">Sepatu Lari</a></li>
    <li><a href="#">Sepatu Sepakbola</a></li>
    <li><a href="#">Sepatu Futsal</a></li>
    <li><a href="#">Sepatu Tenis</a></li>
    <li><a href="#">Sepatu Golf</a></li>
  </ul>
</nav>
{% endhighlight %}  

Di sini kita menggunakan fungsi `route()` untuk mencetak url dari `route`. Parameter pertama adalah nama `route` yang kita deklarasikan menggunakan opsi `as`. Kita juga bisa menambahkan parameter kedua yang sifatnya opsional. Parameter kedua digunakan untuk memasukkan parameter `routing`.  

## Membuat *Template Footer*

*Website* kita membutuhkan *footer* pada setiap halamannya. Oleh karena itu, kita perlu membuat *template* untuk *footer*. Buat *file* `footer.blade.php` pada folder `templates` dan tulis kode berikut:  
{% highlight html %}
<footer>
  <ul>
     <li><a href="{% raw %}{{ route('home') }}{% endraw %}">Home</a></li>
     <li><a href="#">Tentang kami</a></li>
     <li><a href="#">FAQ</a></li>
     <li><a href="#">Cara membeli</a></li>
     <li><a href="#">Kontak</a></li>
   </ul> 
</footer>
{% endhighlight %}  

Selanjutnya, tambahkan `@include()` pada `master.blade.php` untuk menyelipkan kode yang terdapat pada `footer.blade.php` ke dalam `master.blade.php`.  
{% highlight html %}
...
<body>
  {% raw %}
  @include('templates/menu')
  @yield('content')
  @include('templates/footer')
  {% endraw %}
</body>
...
{% endhighlight %}  

## Membuat Halaman *Home*

Kita sudah selesai membuat *master template*, sekarang saatnya kita membuat halaman *home*. Buat *file* baru dengan nama `home.blade.php` pada folder `view`. Kemudian tuliskan kode seperti yang terlihat di bawah ini:  
{% highlight html %}  
@extends('templates.master')

@section('content')
<div class='content'>
  @foreach($products as $product)
    <div class="product">
      <img src="#" class="produk-thumb" />
      <p class="product-name">$product->name</p>
      <p class="product-category">$product->category</p>
    </div>
  @endfor
</div>
@stop
{% endhighlight %}  

Kita memanfaatkan *master template* dengan menggunakan fungsi `@extends()`. Dengan demikian, kode yang terdapat pada `master.blade.php` dimiliki juga oleh `home.blade.php`.  

Sebelumnya kita sempat menuliskan `@yield('content')` pada `master.blade.php`. Dengan menuliskan kode html di dalam `@section('content')`, Blade akan menyesuaikan letaknya dengan letak `@yield('content')` dideklarasikan. 

Apabila dijalankan menggunakan `php artisan serve`, halaman html yang dihasilkan kurang lebih akan seperti di bawah ini:  

{% highlight html %}
<html>
<head>
  <meta charset="utf-8">
  <title>E-commerce</title>
  <link rel="stylesheet" type="text/css" href="http://localhost:8000/style.css">
</head>
<body>
<nav class="top-menu">
  <ul>
    <li><a href="http://localhost:8000/">Home</a></li>
    <li><a href="#">Sepatu Lari</a></li>
    <li><a href="#">Sepatu Sepakbola</a></li>
    <li><a href="#">Sepatu Futsal</a></li>
    <li><a href="#">Sepatu Tenis</a></li>
    <li><a href="#">Sepatu Golf</a></li>
  </ul>
</nav>
<div class='content'>
    <div class="product">
      <img src="#" class="produk-thumb" />
      <p class="product-name">Nama produk</p>
      <p class="product-category">Kategori produk</p>
    </div>
    ....
    ....
    ....
</div>
<footer>
  <ul>
     <li><a href="http://localhost:8000/">Home</a></li>
     <li><a href="#">Tentang kami</a></li>
     <li><a href="#">FAQ</a></li>
     <li><a href="#">Cara membeli</a></li>
     <li><a href="#">Kontak</a></li>
   </ul> 
</footer>
</body>
</html>
{% endhighlight %}  

## Penutup  
*Template-template* yang telah kita buat sebelumnya dapat kita gunakan lagi untuk membuat halaman-halaman html yang lain, misalkan untuk membuat halaman kategori produk, FAQ, kontak dan lain sebagainya. Kita juga bisa membuat beberapa bagian dari *template* sehingga hanya tampil pada kondisi atau alamat url tertentu juga dengan menggunakan `@if` dan fungsi `route()`.   

Kamu bisa membuat halaman html sekreatif mungkin menggunakan Blade. Untuk mempelajari lebih dalam mengenai Blade, baca dokumentasinya di [sini](http://laravel.com/docs/4.2/templates). Semoga bermanfaat!





