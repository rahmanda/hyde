---
layout: post
title: "Membuat Tweepy dengan Flask - Episode 1"
feature_image: membuat-tweepy-flask-1.png
category: code
tags: python flask 
source_code: https://github.com/rahmanda/ambercat-tweepy/tree/part-1
comment: true
sitemap:
  lastmod: 2016-09-12
  priority: 0.9
  changefreq: 'monthly'
---  

Mungkin kamu telah mengenal beberapa *web framework* berbasis Python seperti [Django](https://djangoproject.com). Hal ini tidak mengherankan karena *framework* tersebut sangat populer dan sudah banyak situs-situs besar yang dibuat dengan menggunakan *framework* tersebut. Namun untuk membuat projek kecil-kecilan dengan Django mungkin agak kurang sesuai karena banyak fitur Django yang sebenarnya tidak kita butuhkan. Selain itu mungkin juga projek kecil kita tidak dapat selesai dengan waktu yang singkat. Bagaimana dengan Flask?  

**Flask** adalah *microframework* yang dipelopori oleh [Armin Ronacher](https://github.com/mitsuhiko). Bila dibandingkan dengan Django, Flask jauh lebih ringan dan cepat karena Flask dibuat dengan ide menyederhanakan inti *framework*-nya seminimal mungkin. Dengan *tagline* *"web development, one drop at a time"*, Flask dapat membantu kita membuat situs dengan sangat cepat meskipun dengan librari yang sederhana.  

Pada Flask, kita tidak akan menemukan konsep-konsep besar seperti MVC. Namun Flask masih menyediakan fungsi-fungsi dasar seperti *routing*, *rendering*, *templating*, *sessions*, *error handling* dan *logging*. Untuk mengenal lebih dalam mengenai Flask, pada artikel kali ini kita akan membuat aplikasi *website* sederhana yang akan melibatkan beberapa fitur-fitur dasar pada Flask.  

##Tweepy  
Aplikasi Tweepy adalah aplikasi yang mirip dengan Twitter. Fitur-fitur yang akan kita implementasikan pada Tweepy adalah:  

- *Register*  
- *Login* + *Logout*  
- Menambahkan tweet  
- Melihat *timeline*  
- Mem-*follow* pengguna lain  

{% note Apabila kamu belum familiar dengan pemograman Python, silakan baca artikel [Berkenalan dengan Python](http://ambercat.rahmanda.net/code/2015/02/21/berkenalan-dengan-python.html) sebelum kamu mengikuti tutorial ini. %}

##Persiapan
Lakukan instalasi Flask dengan menjalankan perintah berikut:  

{% highlight console %}
pip install flask
{% endhighlight %}

Untuk mengecek apakah Flask telah terinstal dengan baik, kamu dapat menjalankan perintah ini:  

{% highlight console %}
pip freeze | grep Flask 
{% endhighlight %}

Setelah itu buatlah folder dengan nama `tweepy` untuk menyimpan *file-file* projek Tweepy.

##Membuat struktur projek
Buat folder `static` dan `templates` di dalam folder `tweepy`. Folder `static` digunakan untuk menyimpan *file-file* gambar dan css, sedangkan folder `templates` digunakan untuk menyimpan *file-file* html. Setelah itu, buat *file* `schema.sql` dan `tweepy.py` satu level dengan folder `static` dan `templates`. Struktur projek kamu akan terlihat seperti di bawah ini:
{% highlight console %}
tweepy\
--- static\
--- templates\
--- schema.sql
--- tweepy.py
{% endhighlight %} 

##Membuat skema *database*
Karena aplikasi *website*-nya sederhana, kita cukup menggunakan `sqlite3` sebagai *database*. Untuk menulis skema *database*-nya, editlah *file* `schema.sql` pada aplikasi *text editor* favorit kamu. Kita akan membuat tiga tabel, yaitu tabel `users` untuk menyimpan data pengguna, tabel `followers` untuk menyimpan data *followers* dan tabel `tweet` untuk menyimpan tweet-tweet. Salin kode di bawah ini pada `schema.sql`:
{% highlight sql %}
drop table if exists users;
create table users (
  id integer primary key autoincrement,
  username text not null,
  fullname text not null,
  password text not null
);

drop table if exists followers;
create table followers (
  user_id integer,
  follower_id integer
);

drop table if exists tweets;
create table tweets (
  id integer primary key autoincrement,
  user_id integer not null,
  tweet text not null,
  pub_date integer
);
{% endhighlight %}

##Impor librari-librari yang dibutuhkan
Buka *file* `tweepy.py` pada aplikasi `text editor`, lalu tulis kode di bawah ini:  
{% highlight python %}
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
  abort, render_template, flash
from contextlib import closing
{% endhighlight %}  
Potongan kode di atas berfungsi untuk mengimpor librari-librari yang dibutuhkan pada aplikasi kita. Pada baris pertama, kita mengimpor `sqlite3` untuk manajemen *database*. Pada baris kedua, kita mengimpor fitur-fitur utama dari `Flask` yang nantinya akan kita gunakan untuk membuat aplikasi Tweepy.  

##Menulis konfigurasi
Pada baris kode selanjutnya, salin kode di bawah ini:  

{% highlight python %}  
# konfigurasi umum
DATABASE = '/tmp/tweepy.db'
DEBUG = True
SECRET_KEY = 'abcdefghijklmnopqrstuvwxyz0123456789'
PER_PAGE = 30
{% endhighlight %}  

Ada empat konfigurasi yang kita perlukan, yaitu `DATABASE`, `DEBUG`, `SECRET_KEY`, dan `PER_PAGE`. `DATABASE` diisikan dengan alamat direktori tempat menyimpan *file* `sqlite`. Variabel `DEBUG` diset dengan nilai `True` supaya kita dapat lebih mudah mempelajari *error* yang mungkin terjadi pada aplikasi kita. Variabel `PER_PAGE` diisi dengan nilai yang menunjukkan jumlah tweet maksimum yang kita ambil dari database.  

{% note Untuk pengguna Windows, set `DATABASE` dengan alamat direktori absolut, misalkan `C:/`.  %}

##Membuat objek Flask
Untuk menggunakan *framework* Flask, kita harus membuat objek Flask dengan menuliskan kode di bawah ini:  

{% highlight python %}
# Deklarasi aplikasi Flask
app = Flask(__name__)
app.config.from_object(__name__)
{% endhighlight %}  

Pada baris pertama, kita memasukkan objek Flask ke dalam variabel `app`, sedangkan pada baris kedua kita menginisialisasi konfigurasi yang sudah kita tulis sebelumnya.  

{% note Semua variabel yang dituliskan dalam bentuk kapital akan dianggap sebagai variabel konfigurasi oleh Flask. %}  

##Membuat fungsi untuk terhubung ke *database*
Setiap kali kita ingin melakukan kueri ke *database*, sebelumnya kita harus membuka koneksi terlebih dahulu dengan *database*. Oleh karena itu kita perlu membuat fungsi yang dapat kita gunakan untuk melakukan koneksi *database*. Kita dapat membuatnya seperti pada kode berikut ini:  

{% highlight python %}
# fungsi koneksi database
def connect_db():
  db = sqlite3.connect(app.config['DATABASE'])
  db.row_factory = sqlite3.Row
  return db
{% endhighlight %}  

Pada baris pertama dari fungsi ini, kita melakukan koneksi *database* dengan memanggil fungsi `sqlite3.connect()` dan memasukkan parameter berupa konfigurasi sesuai dengan yang kita tulis sebelumnya. Keluaran dari fungsi `sqlite3.connect()` kita masukkan ke dalam variabel lokal `db`. Pada baris kedua, kita mengeset koneksi database agar hasil kueri lebih mudah untuk ditransformasi menjadi array *hashmap*.  

##Membuat fungsi inisialisasi *database*  
Kita belum memiliki tabel apapun pada *database* kita. Untuk menginisialisasinya, buat fungsi seperti yang terlihat pada kode di bawah ini:  

{% highlight python %}  
# fungsi inisialisasi tabel pada database
def init_db():
  with closing(connect_db()) as db:
    with app.open_resource('schema.sql', mode='r') as f:
      db.cursor().executescript(f.read())
    db.commit()
{% endhighlight %}  

Setelah itu simpan *file* tweepy.py dan lakukan inisialisasi *database* dengan menjalankan perintah seperti di bawah ini pada terminal.  

{% highlight console %}
$ python
Python 2.7.6 (default, Mar 22 2014, 22:59:56) 
[GCC 4.8.2] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> from tweepy import init_db
>>> init_db()
{% endhighlight %}  

Perintah di atas menghasilkan *file* `tweepy.db` pada alamaat direktori yang kamu tulis di variabel `DATABASE`.

##Membuat fungsi kueri *database*
Untuk melakukan kueri pada *database*, buat fungsi seperti kode berikut ini:  

{% highlight python %}  
# fungsi untuk melakukan query
def query_db(query, args=(), one=False):
  db = connect_db()
  cur = db.execute(query, args)
  rv = cur.fetchall()
  db.close()
  return (rv[0] if rv else None) if one else rv
{% endhighlight %}  

Pada fungsi `query_db()`, kita membuat 3 parameter, yaitu `query` sebagai string kuerinya, `args` untuk menyimpan array argumen yang digunakan pada fungsi `db.execute()`, dan `one` dengan nilai default `False` untuk mengeset apakah array kueri yang dikembalikan hanya satu atau seluruhnya.  

##Membuat *routing*
Sekarang saatnya membuat *routing* pada aplikasi kita. Tulis (atau salin) kode di bawah ini:  

{% highlight python %}  
# routing
@app.route('/')
def home():
  if 'user_id' in session:
    return redirect(url_for('timeline'))
  return render_template('home.html')

@app.route('/timeline')
def timeline():
  if 'user_id' not in session:
    return redirect(url_for('public_timeline'))
  return render_template('timeline.html', tweets=query_db('''
    select tweets.*, users.* from tweets, users
    where tweets.user_id = users.id and users.id = ?
    order by tweets.pub_date desc limit ?''', 
    [session['user_id'], app.config['PER_PAGE']]), test=query_db('''
    select * from users where username = 'ambercat'
    '''))

@app.route('/public_timeline')
def public_timeline():
  return render_template('timeline.html', tweets=query_db('''
    select tweets.*, users.* from tweets, users
    where tweets.user_id = users.id order by tweets.pub_date desc limit ?''',
    [app.config['PER_PAGE']]))

@app.route('/add_tweet', methods=['POST'])
def add_tweet():
  if 'user_id' not in session:
    abort(401)
  if request.form['tweet']:
    db = connect_db()
    db.execute('''insert into tweets (user_id, tweet, pub_date)
      values (?, ?, ?)''', (session['user_id'], request.form['tweet'],
                            int(time.time())))
    db.commit()
    db.close()
    flash('Your tweet has been added')
  return redirect(url_for('timeline'))

@app.route('/login', methods=['GET', 'POST'])
def login():
  if 'user_id' in session:
    return redirect(url_for('timeline'))
  error = None
  if request.method == 'POST':
    user = query_db('''select * from users where username = ?''',
      [request.form['username']], one=True)
    if user is None:
      error = 'Invalid username'
    elif not check_password_hash(user[3], request.form['password']):
      error = 'Invalid password'
    else :
      flash('You were successfully logged in')
      session['user_id'] = user[0]
      session['username'] = user[1]
      return redirect(url_for('timeline'))
  return render_template('login.html', error=error)

@app.route('/register', methods=['POST'])
def register():
  if 'user_id' in session:
    return redirect(url_for('timeline'))
  error = None
  if request.method == 'POST':
    if not request.form['username']:
      error = 'Please enter your username'
    elif not request.form['fullname']:
      error = 'Please enter your fullname'
    elif not request.form['password']:
      error = 'Please enter your password'
    elif request.form['password'] != request.form['password2']:
      error = 'The two password that you entered didn\'t match'
    elif get_user_id(request.form['username']) is not None:
      error = 'The username is already taken'
    else:
      db = connect_db()
      db.execute('''insert into users (
        username, fullname, password) values (?, ?, ?)''',
        (request.form['username'], request.form['fullname'],
         generate_password_hash(request.form['password'])))
      db.commit()
      db.close()
      flash('You were successfully registered')
      return redirect(url_for('login'))

@app.route('/logout')
def logout():
  session.pop('user_id', None)
  flash('You were successfully logged out')
  return redirect(url_for('public_timeline'))
{% endhighlight %}  

Pada dasarnya semua fungsi *routing* diawali dengan fungsi `@app.route()` satu baris sebelum deklarasi fungsinya. Selain itu semua fungsi *routing* dapat diakses secara publik melalui alamat url yang kita tulis sebagai *input* pada `@app.route()`.  

Untuk melakukan pengalihan alamat url, kita menggunakan fungsi `redirect()` dengan parameter berupa string alamat url yang dituju. Supaya kita tidak perlu mengingat satu-satu alamat url-nya, kita gunakan fungsi `url_for()`. Fungsi tersebut dapat mengembalikan string alamat url sesuai dengan nama fungsi yang kita masukkan sebagai parameter.  

Untuk *routing* yang mengembalikan html, kita menggunakan fungsi `render_template()`. Ada beberapa paramater untuk fungsi tersebut. Parameter pertama berupa nama template html yang kita simpan pada folder `templates`. Sedangkan parameter kedua berupa data yang ingin kita kirim ke tampilan html / *view*.  

Pada *routing* `/register`, kita melakukan cukup banyak validasi form, salah satu di antaranya adalah mengecek apakah *username* yang diinputkan belum ada pada *database*. Pengecekan *username* dilakukan dengan menggunakan fungsi `get_user_id()`. Kita dapat membuat fungsi tersebut seperti potongan kode berikut ini:  
{% highlight python %}  
def get_user_id(username):
  rv = query_db('select id from users where username = ?',
                [username], one=True)
  return rv[0] if rv else None
{% endhighlight %}  
dan tulis fungsi tersebut di bawah fungsi `query_db()`.  

Dan yang paling penting, untuk menyimpan nilai pada `session` kita gunakan array `session[]` yang telah disediakan oleh librari Flask. Untuk menghapus `session`, kita gunakan fungsi `session.pop()` dengan *input* berupa nama `session` yang ingin kita hapus.  

## Membuat *templates*  
Meskipun pada beberapa fungsi *routing* kita sudah menggunakan fungsi `render_template()`, kita belum membuat *template* sama sekali. Kita juga sempat menuliskan nama-nama *file* template seperti `home.html`, `login.html` dan `timeline.html` pada kode. Pada bagian ini, kita akan membuat *template-template* tersebut.  

Sebelumnya, buat *file* `layout.html` pada folder `templates` sebagai basis dari *template* kita. Tulis kode di bawah ini pada `layout.html`:  

{% highlight html %}  
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{% raw %}{% block title %} Welcome {% endblock %}{% endraw %} - Tweepy</title>
    <link rel="stylesheet" type="text/css" href="{% raw %}{{ url_for('static', filename='style.css') }}{% endraw %}">
  </head>
  <body>
    <!-- blok body dapat kita manfaatkan untuk meng-inject kode html yang kita simpan pada file lain -->
    {% raw %}{% block body %}{% endblock %}{% endraw %}
  </body>
</html>
{% endhighlight %}  

Pada beberapa bagian dari kode html di atas ini, terlihat sintaks `{% raw %}{% %}{% endraw %}` yang merupakan sintaks *templating* dari Jinja2. Jinja2 ini adalah librari yang sudah terdapat pada Flask.  

Selanjutnya buat *file* `login.html` pada folder `templates`. Tulis kode di bawah ini pada `login.html`:  

{% highlight html %}  
{% raw %}{% extends "layout.html" %}{% endraw %}
{% raw %}{% block title %}Sign In{% endblock %}{% endraw %}
{% raw %}{% block body %}{% endraw %}
  <h2>Sign In</h2>
  {% raw %}{% if error %}{% endraw %}<div class="error"><strong>Error:</strong> {% raw %}{{ error }}{% endraw %}</div>{% raw %}{% endif %}{% endraw %}
  <form action="" method="post">
    <dl>
      <dt>Username:
      <dd><input type="text" name="username" size="30" value="{% raw %}{{ request.form.username }}{% endraw %}">
      <dt>Password:
      <dd><input type="password" name="password">
    </dl>
    <div class="actions"><input type="submit" value="Sign In"></div>
  </form>
{% raw %}{% endblock %}{% endraw %}
{% endhighlight %}  

Pada baris pertama, kita melakukan `extend` untuk memanfaatkan *file* `layout.html` yang telah kita buat sebelumnya. Dengan begitu, `login.html` juga memiliki kode yang terdapat pada `layout.html`. Saat server web Tweepy men-*generate* file html untuk *request* url `/login`, kode yang dituliskan di dalam `{% raw %}{% block body %}{% endraw %}` pada `login.html` secara otomatis disesuaikan letaknya sesuai dengan deklarasi `{% raw %}{% block body %}{% endraw %}` pada `layout.html`. Selain itu apa yang kita tulis pada `{% raw %}{% block title %}{% endraw %}` di `login.html` juga secara otomatis disesuaikan letaknya sesuai dengan deklarasi `{% raw %}{% block title %}{% endraw %}` pada `layout.html`.  

Ada beberapa fungsi *template* lain yang kita gunakan pada `login.html`. Kita menggunakan fungsi `if` untuk mengecek apakah terdapat data `error` yang kita kirim lewat fungsi `render_template` pada *routing* `login.html`. Apabila ada, maka tag yang terdapat pada blok `{% raw %}{% if %}{% endraw %}` akan di-*generate* oleh server. String `error` dapat kita cetak dengan mengapitnya di dalam *double braces* (`{% raw %}{{}}{% endraw %}`).  

Selanjutnya kita buat *template* yang lain untuk `home.html` dan `timeline.html`.  

###home.html  

{% highlight html %}  
<!-- home.html -->
{% raw %}{% extends "layout.html" %}{% endraw %}
{% raw %}{% block title %}{% endraw %}
Tweepy
{% raw %}{% endblock %}{% endraw %}
{% raw %}{% block body %}{% endraw %}
<nav class="main-nav">
    <div class="lists">
      <div class="brand">
        <h1><a href="/">Tweepy</a></h1>
      </div>
    </div>
  </nav>
  <div class="content home">
    <section class="signup-form">
      <div class="signup-box">
        <h2 class="box-title">Belum punya akun? Ayo daftar, gratis!</h2>
        <form class="signup" method="POST" action="{% raw %}{{ url_for('register') }}{% endraw %}">
          <div class="section-username">
            <label for="username">Username</label>
            <input type="text" name="username" placeholder="Username anda, digunakan pada saat sign in" />
          </div>
          <div class="section-fullname">
            <label for="fullname">Fullname</label>
            <input type="text" name="fullname" placeholder="Nama lengkap anda" />
          </div>
          <div class="section-password">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Password anda" />
          </div>
          <div class="section-password2">
            <label for="password2">Password</label>
            <input type="password" name="password2" placeholder="Masukkan ulang password anda" />
          </div>
          <input type="submit" name="btn-signup" class="btn btn-signup" value="sign up" />
        </form>
      </div>
    </section>
    <section class="about-site">
      <div class="about-site-box">
        <h2 class="box-title">Website ini hanya untuk demo tutorial saja.</h2>
        <p>Database akan dibersihkan setiap harinya untuk mengurangi beban memori.</p>
        <p>Anda dapat mengikuti tutorial pembuatan website ini di <a href="http://ambercat.rahmanda.net">ambercat.rahmanda.net</a></p>
      </div>
    </section>
  </div>
{% raw %}{% endblock %}{% endraw %}
{% endhighlight %}  

###timeline.html  

{% highlight html %}
<!-- timeline.html-->
{% raw %}{% extends "layout.html" %}{% endraw %}
{% raw %}{% block title %}{% endraw %}
  {% raw %}{% if request.endpoint == 'public_timeline' %}{% endraw %}
    Public Timeline
  {% raw %}{% else %}{% endraw %}
    My Timeline
  {% raw %}{% endif %}{% endraw %}
{% raw %}{% endblock %}{% endraw %}
{% raw %}{% block body %}{% endraw %}
<nav class="main-nav">
  <div class="lists">
    <div class="brand">
      <h1><a href="/">Tweepy</a></h1>
    </div>
    <ul class="actions">
      {% raw %}{% if session.user_id %}{% endraw %}
      <li><a class="btn btn-signout" href="{% raw %}{{ url_for('logout') }}{% endraw %}">sign out</a></li>
      <li><a class="username">{% raw %}{{ session.username }}{% endraw %}</a><li>
        {% raw %}{% else %}{% endraw %}
        <li><a class="btn btn-signin" href="{% raw %}{{ url_for('login') }}{% endraw %}">sign in</a></li>
        {% raw %}{% endif %}{% endraw %}
      </ul>
      <form class="search" method="get" action="">
        <input type="text" name="input-search" placeholder="Cari teman"/>
      </form>
    </div>
  </nav>
<div class="content">
  <div class="tweet-box">
    <form method="POST" action="{% raw %}{{ url_for('add_tweet') }}{% endraw %}">
      <textarea name="tweet" placeholder="Apa yang anda pikirkan saat ini?"></textarea>
      <input type="submit" value="Tweet" class="btn btn-tweet" />
    </form>
  </div>
  <div class="timeline">
    <h2 class="title">Timeline</h2>
    {% raw %}{% for tweet in tweets %}{% endraw %}
    <div class="tweet-item">
      <div class="user">
        <a class="fullname" href="#">{% raw %}{{ tweet.username }}{% endraw %}</a><span class="username">@{% raw %}{{ tweet.username }}{% endraw %}</span>
      </div>
      <div class="tweet">{% raw %}{{ tweet.tweet }}{% endraw %}</div>
      <div class="pub_date">{% raw %}{{ tweet.pub_date }}{% endraw %}</div>
    </div>
    {% raw %}{% endfor %}{% endraw %}
  </div>
</div>
{% raw %}{% endblock %}{% endraw %}
{% endhighlight %}  

Kita bisa menggunakan fungsi Flask dan data yang dimasukkan lewat fungsi `render_template` di dalam tanda double braces `{% raw %}{{}}{% endraw %}`. Misalnya fungsi `url_for()` untuk mendapatkan alamat url dengan memasukkan string nama fungsi `routing`. Bisa juga memanggil variabel session. Yang perlu diperhatikan adalah semua data (array) yang dilewatkan melalui fungsi `render_template` bisa ambil pada *template* yang bersangkutan. Misalkan pada fungsi `public_timeline()` di `tweepy.py`, kita melewatkan hasil kueri ke variabel `tweets`. Pada `timeline.html`, kita dapat mengakses variabel `tweets` dan melakukan `looping` terhadap variabel tersebut.  

## *Static file*  
Sebelumnya saya pernah menjelaskan bahwa *file-file* css dimasukkan pada folder `static`. Unduh *file* css di [sini](http://1drv.ms/1IyG79P), lalu masukkan ke folder `static`. 

## Menjalankan web Tweepy  
Untuk menjalankan web Tweepy, kita cukup menjalankan perintah `python tweepy.py` di terminal. Apabila tidak ada error, kamu bisa buka browser dan coba masukkan url `http://localhost:5000`. Kita mengeset `@app.route('/')` pada fungsi `home()`. Di dalam fungsi `home()`, kita me-*render* `home.html` sehingga yang tampil adalah kode yang kita masukkan di `home.html`. Halaman *loginnya* ada di `http://localhost:5000/login`. Setelah login, kita bisa membuat tweet dan akan muncul pada *timeline* kita. 

## Selanjutnya?  
Pada artikel selanjutnya kita akan mengimplementasikan fitur-fitur yang belum dibuat seperti *follow-follow*-an dan melihat *timeline* dari akun lain. Apabila kamu punya pertanyaan seputar tutorial ini, jangan sungkan bertanya melalui kolom komentar yang tersedia. Semoga artikel ini bermanfaat!

