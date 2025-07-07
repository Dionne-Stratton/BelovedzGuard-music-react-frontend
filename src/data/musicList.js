//music thumbnails
import outOfTheAshesImage from "../images/coverArt/outOfTheAshes.jpg";
import wontYouLetMeInImage from "../images/coverArt/wontYouLetMeIn.jpg";
import foreverIsntLongEnough from "../images/coverArt/foreverIsntLongEnough.jpg";
import whereYouAreImage from "../images/coverArt/whereYouAre.jpg";
import yourStoryOfLoveImage from "../images/coverArt/yourStoryOfLove.png";
import evenWhenImage from "../images/coverArt/evenWhen.jpg";
import youRescueMeImage from "../images/coverArt/youRescueMe.png";
import iBelongToYouImage from "../images/coverArt/iBelongtoYou.png";
import comeToMeImage from "../images/coverArt/comeToMe.png";
import chasingYouImage from "../images/coverArt/chasingYou.png";

//video thumbnails
import evenWhenVideoThumbnail from "../images/videoThumbnails/evenWhen.jpg";
import outOfTheAshesVideoThumbnail from "../images/videoThumbnails/outOfTheAshes.jpg";
import wontYouLetMeInVideoThumbnail from "../images/videoThumbnails/wontYouLetMeIn.jpg";
import foreverIsntLongEnoughVideoThumbnail from "../images/videoThumbnails/foeverIsntLongEnough.jpg";
import whereYouAreVideoThumbnail from "../images/videoThumbnails/whereYouAre.jpg";
import yourStoryOfLoveVideoThumbnail from "../images/videoThumbnails/yourStoryOfLove.jpg";
import youRescueMeVideoThumbnail from "../images/videoThumbnails/youRescueMe.jpg";
import iBelongToYouVideoThumbnail from "../images/videoThumbnails/iBelongToYou.jpg";

const musicList = [
  {
    title: "Chasing You",
    url: "https://cdn1.suno.ai/e0c64260-ff17-4074-a0a1-70b8875d5e7a.webm",
    thumbnail: chasingYouImage,
    videoThumbnail: null,
    videoUrl: null,
    theme: ["pursuit", "devotion", "longing"],
    tone: ["passionate", "intense", "yearning"],
  },
  {
    title: "I Belong to You",
    url: "https://cdn1.suno.ai/830b7b45-bc35-4e37-80c7-d5ddaa46253b.mp3",
    thumbnail: iBelongToYouImage,
    videoThumbnail: iBelongToYouVideoThumbnail,
    videoUrl: "https://www.youtube.com/embed/MAXa1gRkQvY?si=EeJ0w8SP-Wh3lEeR",
    theme: ["belonging", "identity", "faith"],
    tone: ["uplifting", "hopeful", "joyful"],
  },
  {
    title: "You Rescue Me",
    url: "https://cdn1.suno.ai/6e4daecf-21eb-4c5f-960c-fe23f1ae9716.webm",
    thumbnail: youRescueMeImage,
    videoThumbnail: youRescueMeVideoThumbnail,
    videoUrl: "https://www.youtube.com/embed/Y-a9eE0qGP4?si=G8HivV5FDUpIZE2s",
    theme: ["rescue", "redemption", "salvation"],
    tone: ["uplifting", "hopeful", "joyful"],
  },
  {
    title: "Even When",
    url: "https://cdn1.suno.ai/cd98ab10-06c9-4a4c-8efe-d7a82f5dd1d3.webm",
    thumbnail: evenWhenImage,
    videoThumbnail: evenWhenVideoThumbnail,
    videoUrl: "https://www.youtube.com/embed/kEEOsiRXzSM?si=Rmbvfz4tGyOXu5am",
    theme: ["faith", "trust", "perseverance"],
    tone: ["hopeful", "encouraging", "uplifting"],
  },
  {
    title: "Where You Are",
    url: "https://cdn1.suno.ai/0db8aa63-4441-4ac5-869f-8408826bb619.webm",
    thumbnail: whereYouAreImage,
    videoThumbnail: whereYouAreVideoThumbnail,
    videoUrl: "https://www.youtube.com/embed/rCpcz70h1Kk?si=l-iPJEXUrzDVaJQ4",
    theme: ["presence", "guidance", "comfort"],
    tone: ["reassuring", "calming", "supportive"],
  },
  {
    title: "Forever Isn't Long Enough",
    url: "https://cdn1.suno.ai/eb59e18a-6cef-41db-8109-ffcd9c69fd19.webm",
    thumbnail: foreverIsntLongEnough,
    videoThumbnail: foreverIsntLongEnoughVideoThumbnail,
    theme: ["eternity", "love", "commitment"],
    tone: ["romantic", "nostalgic", "hopeful"],
  },
  {
    title: "Won't You Let Me In",
    url: "https://cdn1.suno.ai/be1974ec-ae7a-45ea-8f55-edef4a0d1c33.webm",
    thumbnail: wontYouLetMeInImage,
    videoThumbnail: wontYouLetMeInVideoThumbnail,
    videoUrl: "https://www.youtube.com/embed/CPwrL0QSVOY?si=5osufl-Yhz_St7kn",
    theme: ["repentant", "calling", "returning"],
    tone: ["prophetic", "longing", "invitation"],
  },
  {
    title: "Out of the Ashes",
    url: "https://cdn1.suno.ai/a087a4b4-a66c-4476-8990-2eaba483be44.webm",
    thumbnail: outOfTheAshesImage,
    videoThumbnail: outOfTheAshesVideoThumbnail,
    theme: ["restoration", "hope", "rebirth"],
    tone: ["uplifting", "encouraging", "renewal"],
  },
  {
    title: "Your Story of Love",
    url: "https://cdn1.suno.ai/774c53cb-35ee-4249-84e8-462bb3e0143d.webm",
    thumbnail: yourStoryOfLoveImage,
    videoThumbnail: yourStoryOfLoveVideoThumbnail,
    theme: ["restoration", "hope", "rebirth"],
    tone: ["uplifting", "encouraging", "renewal"],
  },
  {
    title: "Come to Me",
    url: "https://cdn1.suno.ai/e438c7b6-da84-4f1e-87c5-b19cdc1230cb.webm",
    thumbnail: comeToMeImage,
    videoThumbnail: null,
    videoUrl: null,
    theme: ["invitation", "comfort", "rest"],
    tone: ["reassuring", "calming", "supportive"],
  },
];

export default musicList;
