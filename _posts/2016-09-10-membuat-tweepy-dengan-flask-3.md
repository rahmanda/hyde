---
layout: post
title: "Membuat Tweepy dengan Flask - Episode 3"
feature_image: membuat-tweepy-flask-3.jpg
category: code
tags: python flask 
comment: true
source_code: https://github.com/rahmanda/ambercat-tweepy/tree/part-3.1
sitemap:
  lastmod: 2016-09-10
  priority: 0.9
  changefreq: 'monthly'
---  

Pada tutorial Flask episode terakhir ini kita akan menambahkan fungsi pencarian sederhana dengan memanfaatkan _query_ `LIKE` terhadap `username`. Apabila kamu baru mengikuti tutorial ini, kamu bisa ikuti dulu tutorial [episode 1](http://ambercat.rahmanda.net/code/2015/05/12/membuat-tweepy-dengan-flask-1.html) dan [episode 2](http://ambercat.rahmanda.net/code/2015/11/22/membuat-tweepy-dengan-flask-2.html) terlebih dahulu.  

## Menambahkan Route untuk Pencarian  
Tambahkan _route_ baru untuk fitur pencarian seperti di bawah ini:  

{% highlight python %}
@app.route('/search', methods=['GET'])
def search():
  if 'user_id' not in session:
    return redirect(url_for('public_timeline'))
  else:
    return render_template('search.html',
                           results=query_db("select * from users where username like ?",
                                            ['%' + request.args.get('q') + '%']))
{% endhighlight %}  

Karena _request_-nya bertipe `GET`, untuk mendapatkan parameternya kita harus menggunakan fungsi `request.args.get()`. String 'q' yang dimasukkan pada fungsi tersebut adalah nama dari input yang kita gunakan untuk melakukan pencarian (ada di bagian `nav.html`). Oleh karena itu kita harus mengganti nama inputnya menjadi 'q' seperti ini:  

{% highlight html %}
...
<input type="text" name="q" placeholder="Cari teman"/>
...
{% endhighlight %}  

## Membuat Halaman Pencarian

Setelah itu buat _file_ `search.html` pada direktori `templates`, lalu isi dengan kode dibawah ini:  

{% highlight html %}
{% raw %}{% extends "layout.html" %}{% endraw %}
{% raw %}{% block title %}{% endraw %}
Pencarian
{% raw %}{% endblock %}{% endraw %}
{% raw %}{% block body %}{% endraw %}
{% raw %}{% include "nav.html" %}{% endraw %}
<div class="content">
  <div class="tweet-box">
    <form method="POST" action="{% raw %}{{ url_for('add_tweet') }}{% endraw %}">
      <textarea name="tweet" placeholder="Apa yang anda pikirkan saat ini?"></textarea>
      <input type="submit" value="Tweet" class="btn btn-tweet" />
    </form>
  </div>
  <div class="timeline">
    <h2 class="title">Hasil Pencarian</h2>
    {% raw %}{% for result in results %}{% endraw %}
    <div class="tweet-item">
      <div class="user">
        <a class="fullname" href="{% raw %}{{ url_for('profile', username=result.username) }}{% endraw %}">{% raw %}{{ result.fullname }}{% endraw %}</a><span class="username">@{% raw %}{{ result.username }}{% endraw %}</span>
      </div>
    </div>
    {% raw %}{% endfor %}{% endraw %}
  </div>
</div>
{% raw %}{% endblock %}{% endraw %}

{% endhighlight %}  

## Tamat!  
Buka terminal, pergi ke direktori projek tweepy kamu lalu jalankan `python tweepy.py`. Sekarang coba fitur pencariannya dengan memasukkan sebuah `username` (tentu saja kamu harus buat dulu beberapa akun).  

Dengan fitur ini maka selesailah serial tutorial membuat tweepy dengan Flask. Semoga tutorial ini bisa membantu kamu mengenal Flask. Apabila kamu mengalami kesulitan selama mengikuti tutorial ini, jangan sungkan bertanya melalui kolom komentar.   
