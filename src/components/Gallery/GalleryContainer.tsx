import React, { useState } from 'react';
import GalleryItem from './GalleryItem';
import GalleryModal from './GalleryModal';
import { cn } from '@/lib/utils';

// Expanded gallery data with 50+ images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    alt: "Blue Innovation",
    width: 2432,
    height: 3648
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    alt: "Celestial Blue",
    width: 3880,
    height: 2586
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    alt: "Azure Architecture",
    width: 4480,
    height: 6720
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    alt: "Sapphire Waves",
    width: 3857,
    height: 2571
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    alt: "Blue Nature Panorama",
    width: 5616,
    height: 3744
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc",
    alt: "Blue Harmony",
    width: 6240, 
    height: 4160
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9",
    alt: "Tranquil Blue",
    width: 6000,
    height: 4000
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e",
    alt: "Mountain Blue",
    width: 3456,
    height: 5184
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Ocean Depths",
    width: 4330,
    height: 2886
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    alt: "Blue Night Mountains",
    width: 4501, 
    height: 3001
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
    alt: "Indigo Sunset",
    width: 5304, 
    height: 7952
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee",
    alt: "Cyan Lakeside",
    width: 3456, 
    height: 4320
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1502790671504-542ad42d5189",
    alt: "Blue Hour City",
    width: 5472, 
    height: 3648
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6",
    alt: "Midnight Blue",
    width: 4256, 
    height: 2832
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1488085061387-422e29b40080",
    alt: "Teal Oasis",
    width: 3648, 
    height: 5472
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1463780324318-d1a8ddc05a11",
    alt: "Cobalt Mountains",
    width: 5616, 
    height: 3744
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16",
    alt: "Royal Blue",
    width: 5184, 
    height: 3456
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106",
    alt: "Electric Blue",
    width: 6000, 
    height: 4000
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Turquoise Beach",
    width: 2448, 
    height: 3264
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57",
    alt: "Aquamarine Waves",
    width: 2048, 
    height: 1365
  },
  {
    id: 21,
    src: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e",
    alt: "Powder Blue Sky",
    width: 6016, 
    height: 4016
  },
  {
    id: 22,
    src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699",
    alt: "Cerulean Lake",
    width: 5297, 
    height: 4393
  },
  {
    id: 23,
    src: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5",
    alt: "Deep Blue",
    width: 3840, 
    height: 2160
  },
  {
    id: 24,
    src: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65",
    alt: "Blue Gradient",
    width: 4256, 
    height: 2832
  },
  {
    id: 25,
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
    alt: "Sky Blue",
    width: 2268, 
    height: 4032
  },
  {
    id: 26,
    src: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39",
    alt: "Cornflower Blue",
    width: 6000, 
    height: 4000
  },
  {
    id: 27,
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    alt: "Waterfall Blue",
    width: 3264, 
    height: 2176
  },
  {
    id: 28,
    src: "https://images.unsplash.com/photo-1459478309853-2c33a60058e7",
    alt: "Blue Abstract",
    width: 2048, 
    height: 1365
  },
  {
    id: 29,
    src: "https://images.unsplash.com/photo-1480365501497-199581be0e66",
    alt: "Blue Dusk",
    width: 2500, 
    height: 1667
  },
  {
    id: 30,
    src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e",
    alt: "Navy Blue",
    width: 4256, 
    height: 2832
  },
  {
    id: 31,
    src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    alt: "Blue Reef",
    width: 6016, 
    height: 4016
  },
  {
    id: 32,
    src: "https://images.unsplash.com/photo-1482784160316-6eb046863ece",
    alt: "Blue Sunset",
    width: 5456, 
    height: 3632
  },
  {
    id: 33,
    src: "https://images.unsplash.com/photo-1504198453260-33d1e0f357c9",
    alt: "Blue Calm",
    width: 5472, 
    height: 3648
  },
  {
    id: 34,
    src: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8",
    alt: "Blue Glow",
    width: 3648, 
    height: 5472
  },
  {
    id: 35,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    alt: "Forest Blue",
    width: 3560, 
    height: 2912
  },
  {
    id: 36,
    src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae",
    alt: "Misty Blue",
    width: 3872, 
    height: 2589
  },
  {
    id: 37,
    src: "https://images.unsplash.com/photo-1488711500009-f9111944b1ab",
    alt: "Blue Frost",
    width: 3819, 
    height: 2546
  },
  {
    id: 38,
    src: "https://images.unsplash.com/photo-1516166328576-82e16a127024",
    alt: "Ice Blue",
    width: 5184, 
    height: 3456
  },
  {
    id: 39,
    src: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b",
    alt: "Blue Mist",
    width: 3456, 
    height: 5184
  },
  {
    id: 40,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    alt: "Blue Sky Panorama",
    width: 5760, 
    height: 3840
  },
  {
    id: 41,
    src: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c",
    alt: "Blue Twilight",
    width: 3456, 
    height: 5184
  },
  {
    id: 42,
    src: "https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3",
    alt: "Blue Reflections",
    width: 4608, 
    height: 3072
  },
  {
    id: 43,
    src: "https://images.unsplash.com/photo-1480497490787-505ec076689f",
    alt: "Winter Blue",
    width: 2000, 
    height: 1333
  },
  {
    id: 44,
    src: "https://images.unsplash.com/photo-1481595357459-84468f6eeaac",
    alt: "Blue Serenity",
    width: 3840, 
    height: 5760
  },
  {
    id: 45,
    src: "https://images.unsplash.com/photo-1530908295418-a12e326966ba",
    alt: "Blue Horizon",
    width: 5472, 
    height: 3648
  },
  {
    id: 46,
    src: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7",
    alt: "Blue Dawn",
    width: 3264, 
    height: 4896
  },
  {
    id: 47,
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
    alt: "Periwinkle Skies",
    width: 2268, 
    height: 4032
  },
  {
    id: 48,
    src: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5",
    alt: "Blue Universe",
    width: 3840, 
    height: 2160
  },
  {
    id: 49,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    alt: "Blue Cosmos",
    width: 4501, 
    height: 3001
  },
  {
    id: 50,
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
    alt: "Blue Dreams",
    width: 5304, 
    height: 7952
  },
  {
    id: 51,
    src: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe",
    alt: "Blue Whisper",
    width: 3866, 
    height: 2174
  },
  {
    id: 52,
    src: "https://images.unsplash.com/photo-1518715982419-9015401820ce",
    alt: "Blue Crystals",
    width: 3456, 
    height: 4320
  },
  {
    id: 53,
    src: "https://images.unsplash.com/photo-1473800447596-01729482b8eb",
    alt: "Blue Landscape",
    width: 5125, 
    height: 2893
  },
  {
    id: 54,
    src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d",
    alt: "Blue Cascade",
    width: 3862, 
    height: 2170
  }
];

interface GalleryContainerProps {
  className?: string;
}

const GalleryContainer = ({ className }: GalleryContainerProps) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: any) => {
    console.log("Opening modal for:", image);
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cn("w-full p-4", className)}>
      
      {/* ✅ Pinterest-Style Masonry Layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((image) => (
          <div 
            key={image.id}
            className="relative overflow-hidden rounded-lg border border-gray-300 break-inside-avoid"
          >
            <GalleryItem image={image} onClick={openModal} />
          </div>
        ))}
      </div>
      
      <GalleryModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        currentImage={selectedImage} 
        images={galleryImages} 
      />
    </div>
  );
};

export default GalleryContainer;