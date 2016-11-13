---
layout: post
title: "Kok Kamu Pakai Emacs Sih?"
feature_image: kok-kamu-pakai-emacs-sih.png
category: collections
tags: emacs text-editor
comment: true
sitemap:
  lastmod: 2016-09-12
  priority: 0.9
  changefreq: 'monthly'
---  

Keperluan terhadap _text editor_ bagi seorang programmer adalah mutlak. Tanpa _text editor_, programmer tidak dapat _ngoding_. Oleh karena itu, banyak sekali _text editor_ yang beredar di dunia ini, dan sepertinya para programmer tidak akan berhenti mencari dan menciptakan _text editor_ yang lebih baik dari yang sudah ada saat ini.  

Sementara kebanyakan programmer menggunakan Atom, Sublime Text, Notepad++ atau _text editor_ lain yang lebih modern, saya malah jatuh hati pada [Emacs](https://www.gnu.org/software/emacs/). Emacs pertama kali dibuat pada tahun 1976 oleh [Richard Stallman](https://en.wikipedia.org/wiki/Richard_Stallman) yang merupakan  _founder_ dari GNU Project. Pada tahun ini _mouse_ belum banyak digunakan sehingga ini membuat hampir semua kontrol dari Emacs menggunakan keyboard. Layaknya sebuah _fighting game_, untuk dapat menggunakan Emacs kamu harus menghapalkan banyak kombinasi 'jurus'.  

'Kok malah pakai editor jadul? Memangnya banyak yang pakai? Kenapa gak pakai _mouse_? _Ngetik_ terus emang gak capek? Kok gak pakai VIM aja?...'  

Pertanyaan-pertanyaan tersebut akan sering kamu dapatkan kalau kamu 'ketahuan' pakai Emacs. Sekarang mari kita lihat bagaimana cara saya menjawabnya satu per satu.  

## Kok Malah Pakai Editor Jadul?  
Seperti para programmer pada umumnya, saya juga mengalami masa-masa 'gonta-ganti _text editor_'. Tidak dapat dipungkiri bahwa semakin banyak belajar, maka semakin berkembang pula kebutuhan untuk _text editor_ yang lebih mumpuni. Setiap ada _text editor_ yang baru, saya tidak pernah ketinggalan untuk mencobanya. Hal ini membuktikan bahwa saya bukan seperti penggemar Vespa atau kolektor barang antik yang menyukai sesuatu karena nilai historisnya semata.  

Pada saat itu saya ingin lebih produktif lagi dalam _ngoding_, namun editor yang saya pakai saat itu (Atom) masih belum cukup cepat menurut saya. Saya menjadi ingin mengeksplorasi kembali _text editor_ yang lain, sampai saya mengenal Emacs. Saat mempelajarinya lebih dalam saya baru menyadari bahwa di dalam _text editor_ yang jadul itu ternyata telah tersemat banyak sekali fitur keren yang tidak dimiliki _text editor_ lain. _Syntax highlighting_ dan _syntax checker_ untuk banyak bahasa pemograman sudah ada di dalamnya. Navigasi _cursor_-nya sangat luas, mau ke posisi manapun bisa (asal ingat _shortcut_-nya). Menjalankan perintah di terminal bisa langsung lewat Emacs. Mau menambahkan _plugin_ tambahan sangat mudah karena sudah ada _package manager_. Koleksi _plugin_-nya juga sangat banyak dan beragam, bahkan ada _plugin_ yang bisa kita gunakan untuk _browsing_, membaca dan membalas email, mengatur keuangan pribadi bahkan bermain _game_ (jadul) dengan Emacs. Ini yang membuat saya tertarik menggunakannya dan saya tidak pernah bosan untuk mengeksplorasi dunia Emacs sampai sekarang.  

{% note Sampai artikel ini ditulis, versi Emacs yang paling terakhir adalah versi 24.5 dan saat ini versi 25 sedang dalam pengembangan dan direncanakan rilis pada tahun 2016. %}

## Memangnya Banyak yang Pakai?  
Tentu saja sesuatu yang amat sangat _anti mainstream_ seperti Emacs ini penggunanya sangat sedikit. Berdasarkan survey yang dilakukan oleh [Stackoverflow pada tahun 2016](http://stackoverflow.com/research/developer-survey-2016#technology-development-environments), pengguna Emacs di dunia hanya sekitar 5.2%. Lantas apakah fakta ini membuat sumber pembelajaran untuk Emacs sulit diperoleh? Ternyata tidak juga. Banyak sekali tips dan trik Emacs yang bisa dicari di Google dan Youtube (dalam bahasa Inggris) dan hampir semuanya sangat komprehensif. Jadi kalau kamu ingin belajar Emacs, jangan khawatir dengan keberadaan sumber pembelajarannya.  

## Kenapa Gak Pakai _Mouse_? _Ngetik_ Terus Emang Gak Capek?  
Coba kamu tonton aksi programmer Emacs di Youtube, dijamin pasti tercengang. Pertanyaan 'Bagaimana mereka bisa mengetik secepat itu hanya dengan menggunakan _keyboard_?' sering menghampiri benak saya sewaktu menonton video Emacs karena saat pertama kali mencobanya, saya merasa sangat terhambat. Hal ini disebabkan saya belum terbiasa dengan banyaknya _shortcut_ keyboard yang harus diingat. _Shortcut_ tersebut berbeda sekali dengan _shortcut_ yang digunakan aplikasi-aplikasi pada umumnya. Ditambah lagi saya juga harus meninggalkan _mouse_. Saat itu adalah saat yang sangat tidak produktif bagi saya di tengah tuntutan pekerjaan yang sangat banyak. Namun semua kesulitan tersebut telah terbayarkan karena saya merasa jauh lebih cepat dan lebih produktif saat ini dengan Emacs dibandingkan sebelumnya.  

Penggunaan _mouse_ untuk mengedit teks dalam intensitas yang tinggi (seperti _ngoding_) akan memperlambat waktu penyelesaian pekerjaan kita. Saat mengetik kita harus memindahkan konteks pikiran kita dari keyboard ke mouse dan sebaliknya dengan frekuensi yang sangat tinggi. Pergantian konteks ini membuat kita tidak fokus terhadap apa yang ingin kita ketik. Dengan hanya menggunakan keyboard saja, kita bisa lebih fokus dalam pekerjaan sehingga kita bisa lebih cepat menyelesaikannya.  

Memang melelahkan melihat orang yang pakai Emacs selalu mengetik, mengetik dan mengetik. Banyak juga orang yang bilang bahwa Emacs sangat tidak ramah tangan karena sering menggunakan `Ctrl` sebagai _shortcut_. Faktanya memang banyak pengguna Emacs yang mengalami [Repeated Strain Injury](http://www.nhs.uk/Conditions/Repetitive-strain-injury/Pages/Introduction.aspx) pada bagian jari kelingkingnya, dan dulu saya juga sempat hampir mengalaminya. Tapi setelah mengatur ulang _shortcut_ tersebut dengan [Ergoemacs](http://ergoemacs.github.io), saya tidak merasa pegal lagi.  

## Kok Gak Pakai VIM Saja?  
Orang yang menanyakan pertanyaan ini sebenarnya ingin mengajak perang \#just jokes. [VIM](http://www.vim.org) juga merupakan teks editor yang semua kontrolnya menggunakan keyboard. Meskipun pengguna VIM dan Emacs kelihatannya sering berseteru di forum-forum, saya tidak mau ikut-ikutan karena saya bukan orang yang fanatik terhadap satu teknologi. Pada kenyataannya saya juga menggunakan VIM dan mengikuti perkembangan VIM. Perihal saya lebih sering menggunakan Emacs dibandingkan VIM, itu disebabkan kegiatan saya diluar koding (seperti membuat _todo list_ dan mencatat keuangan pribadi) lebih mudah bila menggunakan Emacs.  

## Penutup  
Setiap _text editor_ pasti ada kelebihan dan kekurangannya. Eksplorasi terhadap _text editor_ dapat membuka wawasan kita, dan Emacs adalah salah satu _text editor_ yang patut untuk dipelajari. Tapi hati-hati jangan sampai pekerjaan kamu terbengkalai karena sibuk otak-atik Emacs.  
