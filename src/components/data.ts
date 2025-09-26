import { Item } from './types';



// Video data from the provided JSON
const videoData = [
  {
    title: "Big Buck Bunny",
    description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself.",
    sources: "https://www.w3schools.com/html/mov_bbb.mp4",
    subtitle: "By Blender Foundation"
  },
  {
    title: "Elephant Dream",
    description: "The first Blender Open Movie from 2006",
    sources: "https://www.w3schools.com/html/mov_bbb.mp4",
    subtitle: "By Blender Foundation"
  },
  {
    title: "For Bigger Blazes",
    description: "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV.",
    sources: "https://www.w3schools.com/html/mov_bbb.mp4",
    subtitle: "By Google"
  },
  {
    title: "For Bigger Escape",
    description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV.",
    sources: "https://www.w3schools.com/html/mov_bbb.mp4",
    subtitle: "By Google"
  },
  {
    title: "For Bigger Fun",
    description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV.",
    sources: "https://www.w3schools.com/html/mov_bbb.mp4",
    subtitle: "By Google"
  },
  {
    title: "Sintel",
    description: "Sintel is an independently produced short film, initiated by the Blender Foundation.",
    sources: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    subtitle: "By Blender Foundation"
  }
];

// Generate mixed Pinterest-like data with images and videos
export const data: Item[] = Array.from({ length: 1000 }).map((_, i) => {
  const w = 600;
  const heightVariations = [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
  const h = heightVariations[i % heightVariations.length] + ((i * 47) % 300);
  
  // Mix videos every 8-12 items
  const isVideo = i > 0 && i % (8 + (i % 5)) === 0 && videoData.length > 0;
  
  if (isVideo) {
    const videoIndex = Math.floor(i / 10) % videoData.length;
    const video = videoData[videoIndex];
    return {
      id: `video-${i}`,
      title: video.title,
      description: video.description,
      subtitle: video.subtitle,
      w,
      h,
      url: video.sources,
      type: 'video' as const
    };
  }
  
  return {
    id: String(i),
    title: `Pin ${i + 1}`,
    w,
    h,
    url: `https://picsum.photos/seed/${i}/${w}/${h}`,
    type: 'image' as const
  };
});
