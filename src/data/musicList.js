const musicList = [
  {
    id: "in-jesus-name",
    title: "In Jesus Name",
    url: "https://media.belovedzguard.com/music-files/in-jesus-name.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/in-jesus-name.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/in-jesus-name.jpg",
    videoUrl: "https://www.youtube.com/embed/3sLJ-loyKz4?si=4cGrBvxrRFx3ZnLU",
    theme: ["worship", "praise", "devotion"],
    tone: ["uplifting", "joyful", "reverent"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/in-jesus-name.md",
  },
  {
    id: "come-worship-the-king",
    title: "Come Worship the King",
    url: "https://media.belovedzguard.com/music-files/come-worship-the-king.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/come-worship-the-king.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/come-worship-the-king.jpg",
    videoUrl: "https://www.youtube.com/embed/eZakqc_xNA8?si=jEwxd5Y6bZey9PWz",
    theme: ["worship", "praise", "devotion"],
    tone: ["uplifting", "joyful", "reverent"],
    perspective: "about Jesus",
    lyricsUrl:
      "https://media.belovedzguard.com/lyrics/come-worship-the-king.md",
  },
  {
    id: "i-miss-you",
    title: "I Miss You",
    url: "https://media.belovedzguard.com/music-files/i-miss-you.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/i-miss-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/i-miss-you.jpg",
    videoUrl: "https://www.youtube.com/embed/5CU66Ilfzao?si=v8lpaEadXJmDdt2T",
    theme: ["longing", "devotion", "worship"],
    tone: ["intimate", "yearning", "worshipful"],
    perspective: "from Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/i-miss-you.md",
  },
  {
    id: "all-to-know-you",
    title: "All to Know You",
    url: "https://media.belovedzguard.com/music-files/all-to-know-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/all-to-know-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/all-to-know-you.jpg",
    videoUrl: "https://www.youtube.com/embed/WOTjdYs65Pw?si=M7HX_RiBBcHi1Wxh",
    theme: ["devotion", "intimacy", "worship"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/all-to-know-you.md",
  },
  {
    id: "how-you-love-me",
    title: "How You Love Me",
    url: "https://media.belovedzguard.com/music-files/how-you-love-me.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/how-you-love-me.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/how-you-love-me.jpg",
    videoUrl: "https://www.youtube.com/embed/aTD9tfyxN-E?si=KJmx9aMQXqLf5BnN",
    theme: ["love", "devotion", "worship"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/how-you-love-me.md",
  },
  {
    id: "dive-into-your-love",
    title: "Dive into Your Love",
    url: "https://media.belovedzguard.com/music-files/dive-into-your-love.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/dive-into-your-love.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/dive-into-your-love.jpg",
    videoUrl: "https://www.youtube.com/embed/kWJryt_OBt0?si=oLtY_wWHXkuD88uB",
    theme: ["love", "devotion", "worship"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/dive-into-your-love.md",
  },
  {
    id: "in-a-moment",
    title: "In a Moment",
    url: "https://media.belovedzguard.com/music-files/in-a-moment.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/in-a-moment.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/in-a-moment.jpg",
    videoUrl: "https://www.youtube.com/embed/GWgKoO6vZpU?si=eV3kK3w661BJwHqK",
    theme: ["reflection", "worship", "devotion"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "from Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/in-a-moment.md",
  },
  {
    id: "heaven-is-you",
    title: "Heaven is You",
    url: "https://media.belovedzguard.com/music-files/heaven-is-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/heaven-is-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/heaven-is-you.jpg",
    videoUrl: "https://www.youtube.com/embed/fLBnZssze34?si=vN9OwOg1wEJAhWNu",
    theme: ["worship", "devotion", "intimacy"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/heaven-is-you.md",
  },
  {
    id: "in-the-silence",
    title: "In the Silence",
    url: "https://media.belovedzguard.com/music-files/in-the-silence.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/in-the-silence.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/in-the-silence.jpg",
    videoUrl: "https://www.youtube.com/embed/9G57CKTAhzI?si=w2qHqfreNAXMYu_Y",
    theme: ["reflection", "worship", "devotion"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/in-the-silence.md",
  },
  {
    id: "give-me-more-of-you",
    title: "Give Me More of You",
    url: "https://media.belovedzguard.com/music-files/give-me-more-of-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/give-me-more-of-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/give-me-more-of-you.jpg",
    videoUrl: "https://www.youtube.com/embed/LZ-t7nkugm0?si=CmRaO3Lld13s0jnj",
    theme: ["devotion", "worship", "intimacy"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/give-me-more-of-you.md",
  },
  {
    id: "i-rejoice-in-you",
    title: "I Rejoice in You",
    url: "https://media.belovedzguard.com/music-files/i-rejoice-in-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/i-rejoice-in-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/i-rejoice-in-you.jpg",
    videoUrl: "https://www.youtube.com/embed/KWga-NvYLG4?si=pOZGf13CMpalhstJ",
    theme: ["joy", "worship", "devotion"],
    tone: ["uplifting", "joyful", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/i-rejoice-in-you.md",
  },
  {
    id: "love-has-found-you",
    title: "Love Has Found You",
    url: "https://media.belovedzguard.com/music-files/love-has-found-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/love-has-found-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/love-has-found-you.jpg",
    videoUrl: "https://www.youtube.com/embed/PsZHo3igfQo?si=-p7i1AiU4YxibOSw",
    theme: ["love", "uplifting", "hopeful"],
    tone: ["powerful", "intimate", "worshipful"],
    perspective: "about Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/love-has-found-you.md",
  },
  {
    id: "radiance",
    title: "Radiance",
    url: "https://media.belovedzguard.com/music-files/radiance.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/radiance.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/radiance.jpg",
    videoUrl: "https://www.youtube.com/embed/T-b9jLoKC78?si=P8EUB0egu0Tni0ye",
    theme: ["light", "hope", "worship"],
    tone: ["uplifting", "joyful", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/radiance.md",
  },
  {
    id: "the-declaration",
    title: "The Declaration",
    url: "https://media.belovedzguard.com/music-files/the-declaration.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/the-declaration.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/the-declaration.jpg",
    videoUrl: "https://www.youtube.com/embed/HsvS_NmiWFI?si=bHtL-an7Q26QvUIY",
    theme: ["declaration", "worship", "faith"],
    tone: ["powerful", "intimate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/the-declaration.md",
  },
  {
    id: "untamed-love",
    title: "Untamed Love",
    url: "https://media.belovedzguard.com/music-files/untamed-love.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/untamed-love.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/untamed-love.jpg",
    videoUrl: "https://www.youtube.com/embed/7uya8H9M-FI?si=9XO9_84pZcTouWFi",
    theme: ["love", "devotion", "worship"],
    tone: ["passionate", "intimate", "worshipful"],
    perspective: "from Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/untamed-love.md",
  },
  {
    id: "as-i-wait-for-home",
    title: "As I Wait for Home",
    url: "https://media.belovedzguard.com/music-files/as-i-wait-for-home.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/as-i-wait-for-home.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/as-i-wait-for-home.jpg",
    videoUrl: "https://www.youtube.com/embed/1rmSVmP6yl0?si=02mRe4mq8cQIa7kr",
    theme: ["hope", "heaven", "longing"],
    tone: ["reflective", "yearning", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/as-i-wait-for-home.md",
  },
  // {
  //   id: "complete-in-you",
  //   title: "Complete in You",
  //   url: "https://media.belovedzguard.com/music-files/complete-in-you.mp3",
  //   thumbnail:
  //     "https://media.belovedzguard.com/song-thumbnails/complete-in-you.jpg",
  //   videoThumbnail:
  //     "https://media.belovedzguard.com/video-thumbnails/complete-in-you.jpg",
  //   videoUrl: "https://www.youtube.com/embed/F0WhXjdRXBg?si=XKqlEHPjPstLxEg_",
  //   theme: ["identity", "grace", "union"],
  //   tone: ["thankful", "peaceful", "worshipful"],
  //   perspective: "to Jesus",
  //   lyricsUrl: "https://media.belovedzguard.com/lyrics/complete-in-you.md",
  // },
  {
    id: "forever",
    title: "Forever",
    url: "https://media.belovedzguard.com/music-files/forever.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/forever.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/forever.jpg",
    videoUrl: "https://www.youtube.com/embed/lQbbyV_EXis?si=792IeTb7TO3EmHHy",
    theme: ["eternity", "worship", "praise"],
    tone: ["joyful", "exalting", "devoted"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/forever.md",
  },
  // {
  //   id: "holy-god",
  //   title: "Holy God",
  //   url: "https://media.belovedzguard.com/music-files/holy-god.mp3",
  //   thumbnail: "https://media.belovedzguard.com/song-thumbnails/holy-god.jpg",
  //   videoThumbnail:
  //     "https://media.belovedzguard.com/video-thumbnails/holy-god.jpg",
  //   videoUrl: null,
  //   theme: ["holiness", "awe", "praise"],
  //   tone: ["reverent", "powerful", "worshipful"],
  //   perspective: "to Jesus",
  //   lyricsUrl: "https://media.belovedzguard.com/lyrics/holy-god.md",
  // },
  {
    id: "in-your-arms",
    title: "In Your Arms",
    url: "https://media.belovedzguard.com/music-files/in-your-arms.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/in-your-arms.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/in-your-arms.jpg",
    videoUrl: null,
    theme: ["comfort", "love", "security"],
    tone: ["intimate", "gentle", "devoted"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/in-your-arms.md",
  },
  {
    id: "i-press-on",
    title: "I Press On",
    url: "https://media.belovedzguard.com/music-files/i-press-on.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/i-press-on.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/i-press-on.jpg",
    videoUrl: "https://www.youtube.com/embed/l5UapzJtjYc?si=z02I6hn0UWsmFwlu",
    theme: ["perseverance", "faith", "strength"],
    tone: ["determined", "hopeful", "encouraging"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/i-press-on.md",
  },
  {
    id: "keep-me-here",
    title: "Keep Me Here",
    url: "https://media.belovedzguard.com/music-files/keep-me-here.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/keep-me-here.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/keep-me-here.jpg",
    videoUrl: "https://www.youtube.com/embed/vSBmXlOS9nk?si=ZzqIiG2wj-XLx0dn",
    theme: ["surrender", "devotion", "presence"],
    tone: ["yearning", "intimate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/keep-me-here.md",
  },
  {
    id: "let-your-praises-rise",
    title: "Let Your Praises Rise",
    url: "https://media.belovedzguard.com/music-files/let-your-praises-rise.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/let-your-praises-rise.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/let-your-praises-rise.jpg",
    videoUrl: "https://www.youtube.com/embed/a7oGr3cLrEI?si=ZaCT3kxAPFgsL7rx",
    theme: ["worship", "praise", "joy"],
    tone: ["celebratory", "uplifting", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl:
      "https://media.belovedzguard.com/lyrics/let-your-praises-rise.md",
  },
  {
    id: "my-next-breath",
    title: "My Next Breath",
    url: "https://media.belovedzguard.com/music-files/my-next-breath.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/my-next-breath.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/my-next-breath.jpg",
    videoUrl: "https://www.youtube.com/embed/jrv20zTySZQ?si=Q_8SycGiUehzglOK",
    theme: ["dependence", "life", "faith"],
    tone: ["intimate", "devoted", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/my-next-breath.md",
  },
  {
    id: "nothing-like-your-love",
    title: "Nothing Like Your Love",
    url: "https://media.belovedzguard.com/music-files/nothing-like-your-love.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/nothing-like-your-love.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/nothing-like-your-love.jpg",
    videoUrl: "https://www.youtube.com/embed/uj_zA1Zp0qw?si=2BFLS-dJwTVLmbOS",
    theme: ["love", "devotion", "worship"],
    tone: ["intimate", "joyful", "thankful"],
    perspective: "to Jesus",
    lyricsUrl:
      "https://media.belovedzguard.com/lyrics/nothing-like-your-love.md",
  },
  {
    id: "sacred-surrender",
    title: "Sacred Surrender",
    url: "https://media.belovedzguard.com/music-files/sacred-surrender.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/sacred-surrender.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/sacred-surrender.jpg",
    videoUrl: "https://www.youtube.com/embed/HG9zGk9zU4A?si=h16F242TJA9lvDLs",
    theme: ["surrender", "devotion", "holiness"],
    tone: ["reverent", "humble", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/sacred-surrender.md",
  },
  {
    id: "take-all-of-me",
    title: "Take All of Me",
    url: "https://media.belovedzguard.com/music-files/take-all-of-me.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/take-all-of-me.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/take-all-of-me.jpg",
    videoUrl: "https://www.youtube.com/embed/1P5-HHKh-l8?si=hZOJs8JBQ9KTrhU7",
    theme: ["surrender", "devotion", "offering"],
    tone: ["intimate", "worshipful", "humble"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/take-all-of-me.md",
  },
  {
    id: "unexplainable-love",
    title: "Unexplainable Love",
    url: "https://media.belovedzguard.com/music-files/unexplainable-love.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/unexplainable-love.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/unexplainable-love.jpg",
    videoUrl: "https://www.youtube.com/embed/oHMY__9RqzM?si=FsK2txxI5RrHtQe1",
    theme: ["love", "wonder", "grace"],
    tone: ["awe-filled", "intimate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/unexplainable-love.md",
  },
  {
    id: "when-love-was-crucified",
    title: "When Love Was Crucified",
    url: "https://media.belovedzguard.com/music-files/when-love-was-crucified.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/when-love-was-crucified.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/when-love-was-crucified.jpg",
    videoUrl: "https://www.youtube.com/embed/-tI0O1DB9n0?si=vNtkUE3t8suFSGz0",
    theme: ["cross", "sacrifice", "love"],
    tone: ["somber", "grateful", "worshipful"],
    perspective: "about Jesus",
    lyricsUrl:
      "https://media.belovedzguard.com/lyrics/when-love-was-crucified.md",
  },
  {
    id: "worthy-god",
    title: "Worthy God",
    url: "https://media.belovedzguard.com/music-files/worthy-god.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/worthy-god.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/worthy-god.jpg",
    videoUrl: "https://www.youtube.com/embed/JeIneBoQX9M?si=z_ae0CZ6DlYYRrxK",
    theme: ["worship", "praise", "glory"],
    tone: ["reverent", "powerful", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/worthy-god.md",
  },
  {
    id: "worship-with-my-life",
    title: "Worship With My Life",
    url: "https://media.belovedzguard.com/music-files/worship-with-my-life.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/worship-with-my-life.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/worship-with-my-life.jpg",
    videoUrl: "https://www.youtube.com/embed/vxQ2f_8ZXfQ?si=xTgbf2VgWwiT8C0v",
    theme: ["worship", "devotion", "surrender"],
    tone: ["uplifting", "joyful", "intimate"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/worship-with-my-life.md",
  },
  {
    id: "lost-in-your-love",
    title: "Lost in Your Love",
    url: "https://media.belovedzguard.com/music-files/lost-in-your-love.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/lost-in-your-love.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/lost-in-your-love.jpg",
    videoUrl: "https://www.youtube.com/embed/yr7lO05yxfE?si=QrSyBoUp_d1IfKga",
    theme: ["love", "devotion", "intimacy"],
    tone: ["romantic", "intimate", "yearning"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/lost-in-your-love.md",
  },
  {
    id: "all-consuming-desire",
    title: "All Consuming Desire",
    url: "https://media.belovedzguard.com/music-files/all-consuming-desire.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/all-consuming-desire.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/all-consuming-desire.jpg",
    videoUrl: "https://www.youtube.com/embed/G6CP4_cqJPk?si=ury-4SHpb9tvR6br",
    theme: ["desire", "longing", "worship"],
    tone: ["passionate", "intense", "devotional"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/all-consuming-desire.md",
  },
  {
    id: "song-of-the-bride",
    title: "Song of the Bride",
    url: "https://media.belovedzguard.com/music-files/song-of-the-bride.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/song-of-the-bride.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/song-of-the-bride.jpg",
    videoUrl: "https://www.youtube.com/embed/bTcwy55E47o?si=icWx6Gr7Oj7juQeO",
    theme: ["love", "commitment", "worship"],
    tone: ["romantic", "devotional", "intimate"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/song-of-the-bride.md",
  },
  {
    id: "i-am-yours",
    title: "I Am Yours",
    url: "https://media.belovedzguard.com/music-files/i-am-yours.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/i-am-yours.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/i-am-yours.jpg",
    videoUrl: "https://www.youtube.com/embed/mvlc3_OhkQw?si=8Jmz_-5O28vLr8Ru",
    theme: ["identity", "belonging", "faith"],
    tone: ["uplifting", "hopeful", "joyful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/i-am-yours.md",
  },
  {
    id: "bow-down",
    title: "Bow Down",
    url: "https://media.belovedzguard.com/music-files/bow-down.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/bow-down.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/bow-down.jpg",
    videoUrl: "https://www.youtube.com/embed/htu-CXpDCk8?si=LqHhwfdxWSfjexD5",
    theme: ["worship", "reverence", "adoration"],
    tone: ["reverent", "humble", "devotional"],
    perspective: "about Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/bow-down.md",
  },
  {
    id: "holy-symphony",
    title: "Holy Symphony",
    url: "https://media.belovedzguard.com/music-files/holy-symphony.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/holy-symphony.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/holy-symphony.jpg",
    videoUrl: "https://www.youtube.com/embed/XD3r501H-KQ?si=vPIadpZv3AvnsdRP",
    theme: ["worship", "praise", "devotion"],
    tone: ["uplifting", "joyful", "reverent"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/holy-symphony.md",
  },
  {
    id: "chasing-you",
    title: "Chasing You",
    url: "https://media.belovedzguard.com/music-files/chasing-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/chasing-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/chasing-you.jpg",
    videoUrl: "https://www.youtube.com/embed/JQP2j5_x19c?si=X21geQlUYagyHPeg",
    theme: ["pursuit", "devotion", "longing"],
    tone: ["passionate", "intense", "yearning"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/chasing-you.md",
  },
  {
    id: "i-belong-to-you",
    title: "I Belong to You",
    url: "https://media.belovedzguard.com/music-files/i-belong-to-you.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/i-belong-to-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/i-belong-to-you.jpg",
    videoUrl: "https://www.youtube.com/embed/MAXa1gRkQvY?si=EeJ0w8SP-Wh3lEeR",
    theme: ["belonging", "identity", "faith"],
    tone: ["uplifting", "hopeful", "joyful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/i-belong-to-you.md",
  },
  {
    id: "you-rescue-me",
    title: "You Rescue Me",
    url: "https://media.belovedzguard.com/music-files/you-rescue-me.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/you-rescue-me.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/you-rescue-me.jpg",
    videoUrl: "https://www.youtube.com/embed/Y-a9eE0qGP4?si=G8HivV5FDUpIZE2s",
    theme: ["rescue", "redemption", "salvation"],
    tone: ["uplifting", "hopeful", "joyful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/you-rescue-me.md",
  },
  {
    id: "even-when",
    title: "Even When",
    url: "https://media.belovedzguard.com/music-files/even-when.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/even-when.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/even-when.jpg",
    videoUrl: "https://www.youtube.com/embed/kEEOsiRXzSM?si=Rmbvfz4tGyOXu5am",
    theme: ["faith", "trust", "perseverance"],
    tone: ["hopeful", "encouraging", "uplifting"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/even-when.md",
  },
  {
    id: "where-you-are",
    title: "Where You Are",
    url: "https://media.belovedzguard.com/music-files/where-you-are.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/where-you-are.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/where-you-are.jpg",
    videoUrl: "https://www.youtube.com/embed/rCpcz70h1Kk?si=l-iPJEXUrzDVaJQ4",
    theme: ["presence", "guidance", "comfort"],
    tone: ["reassuring", "calming", "supportive"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/where-you-are.md",
  },
  {
    id: "unseen",
    title: "Unseen",
    url: "https://media.belovedzguard.com/music-files/unseen.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/unseen.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/unseen.jpg",
    videoUrl: "https://www.youtube.com/embed/h5KL7zzVgxU?si=WsotZHuS_t1zKADE",
    theme: ["faithfulness", "identity", "purpose"],
    tone: ["reassuring", "encouraging", "uplifting"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/unseen.md",
  },
  {
    id: "forever-isnt-long-enough",
    title: "Forever Isn't Long Enough",
    url: "https://media.belovedzguard.com/music-files/forever-isnt-long-enough.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/forever-isnt-long-enough.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/forever-isnt-long-enough.jpg",
    videoUrl: "https://www.youtube.com/embed/gfoPwgWL9dI?si=cy7vg2fnSXQonDse",
    theme: ["eternity", "love", "commitment"],
    tone: ["romantic", "nostalgic", "hopeful"],
    perspective: "to Jesus",
    lyricsUrl:
      "https://media.belovedzguard.com/lyrics/forever-isnt-long-enough.md",
  },
  {
    id: "wont-you-let-me-in",
    title: "Won't You Let Me In",
    url: "https://media.belovedzguard.com/music-files/wont-you-let-me-in.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/wont-you-let-me-in.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/wont-you-let-me-in.jpg",
    videoUrl: "https://www.youtube.com/embed/CPwrL0QSVOY?si=5osufl-Yhz_St7kn",
    theme: ["repentant", "calling", "returning"],
    tone: ["prophetic", "longing", "invitation"],
    perspective: "from Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/wont-you-let-me-in.md",
  },
  {
    id: "out-of-the-ashes",
    title: "Out of the Ashes",
    url: "https://media.belovedzguard.com/music-files/out-of-the-ashes.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/out-of-the-ashes.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/out-of-the-ashes.jpg",
    videoUrl: "https://www.youtube.com/embed/QCO4GW10j9k?si=JDpXJe7LES5HBP4_",
    theme: ["restoration", "hope", "rebirth"],
    tone: ["uplifting", "encouraging", "renewal"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/out-of-the-ashes.md",
  },
  {
    id: "your-story-of-love",
    title: "Your Story of Love",
    url: "https://media.belovedzguard.com/music-files/your-story-of-love.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/your-story-of-love.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/your-story-of-love.jpg",
    videoUrl: "https://www.youtube.com/embed/Z1MnCVr3Pn0?si=KmsXyj0BtlauXRa8",
    theme: ["restoration", "hope", "rebirth"],
    tone: ["uplifting", "encouraging", "renewal"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/your-story-of-love.md",
  },
  {
    id: "come-to-me",
    title: "Come to Me",
    url: "https://media.belovedzguard.com/music-files/come-to-me.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/come-to-me.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/come-to-me.jpg",
    videoUrl: "https://www.youtube.com/embed/2KwmsIDxClM?si=UVHIatdKeuXz-lFd",
    theme: ["invitation", "comfort", "rest"],
    tone: ["reassuring", "calming", "supportive"],
    perspective: "from Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/come-to-me.md",
  },
  {
    id: "glory-to-god",
    title: "Glory to God",
    url: "https://media.belovedzguard.com/music-files/glory-to-god.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/glory-to-god.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/glory-to-god.jpg",
    videoUrl: "https://www.youtube.com/embed/Wwt0v4Fsq48?si=qA8YiC54IwX058UC",
    theme: ["worship", "praise", "adoration"],
    tone: ["uplifting", "joyful", "reverent"],
    perspective: "about Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/glory-to-god.md",
  },
  {
    id: "arise",
    title: "Arise",
    url: "https://media.belovedzguard.com/music-files/arise.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/arise.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/arise.jpg",
    videoUrl: "https://www.youtube.com/embed/4r0g_xjdFp4?si=2n_Wr3lMVnHlB_9g",
    theme: ["love", "devotion", "calling"],
    tone: ["passionate", "intimate", "worshipful"],
    perspective: "from Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/arise.md",
  },
  {
    id: "when-you-call-me-home",
    title: "When You Call Me Home",
    url: "https://media.belovedzguard.com/music-files/when-you-call-me-home.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/when-you-call-me-home.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/when-you-call-me-home.jpg",
    videoUrl: "https://www.youtube.com/embed/BrHTdKR0oNQ?si=b1ZtF4Ry4LLd9Ndz",
    theme: ["hope", "eternity", "longing"],
    tone: ["reflective", "anticipatory", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl:
      "https://media.belovedzguard.com/lyrics/when-you-call-me-home.md",
  },
  {
    id: "hide-and-seek",
    title: "Hide & Seek",
    url: "https://media.belovedzguard.com/music-files/hide-and-seek.mp3",
    thumbnail:
      "https://media.belovedzguard.com/song-thumbnails/hide-and-seek.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/hide-and-seek.jpg",
    videoUrl: "https://www.youtube.com/embed/NdtnkN0Tw8U?si=uFAJ-5Km3mCiYQul",
    theme: ["seeking", "devotion", "joy"],
    tone: ["epic", "devoted", "joyful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/hide-and-seek.md",
  },
  {
    id: "for-you",
    title: "For You",
    url: "https://media.belovedzguard.com/music-files/for-you.mp3",
    thumbnail: "https://media.belovedzguard.com/song-thumbnails/for-you.jpg",
    videoThumbnail:
      "https://media.belovedzguard.com/video-thumbnails/for-you.jpg",
    videoUrl: "https://www.youtube.com/embed/_1in2fFDtQ8?si=quunxim4_-dmmFn0",
    theme: ["devotion", "love", "worship"],
    tone: ["intimate", "passionate", "worshipful"],
    perspective: "to Jesus",
    lyricsUrl: "https://media.belovedzguard.com/lyrics/for-you.md",
  },
];

export default musicList;
