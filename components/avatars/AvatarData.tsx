export interface Avatar {
  id: string;
  name: string;
  category: string;
  svg: React.ReactNode;
}

// Cute Animal Avatar SVGs
export const avatars: Avatar[] = [
  {
    id: 'cat-orange',
    name: 'Orange Cat',
    category: 'cats',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="30" fill="#FF8C42" />
        <circle cx="42" cy="48" r="3" fill="#000" />
        <circle cx="58" cy="48" r="3" fill="#000" />
        <path d="M45 55 Q50 60 55 55" stroke="#000" strokeWidth="2" fill="none" />
        <polygon points="35,35 30,25 40,30" fill="#FF8C42" />
        <polygon points="65,35 70,25 60,30" fill="#FF8C42" />
        <polygon points="35,35 32,28 38,32" fill="#FFB366" />
        <polygon points="65,35 68,28 62,32" fill="#FFB366" />
        <ellipse cx="50" cy="52" rx="1.5" ry="2" fill="#000" />
        <path d="M48 65 Q50 68 52 65" stroke="#FF6B1A" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    id: 'dog-golden',
    name: 'Golden Dog',
    category: 'dogs',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="30" fill="#D4A574" />
        <circle cx="42" cy="48" r="3" fill="#000" />
        <circle cx="58" cy="48" r="3" fill="#000" />
        <ellipse cx="50" cy="52" rx="1.5" ry="2" fill="#000" />
        <path d="M45 58 Q50 63 55 58" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="30" cy="45" rx="8" ry="15" fill="#D4A574" />
        <ellipse cx="70" cy="45" rx="8" ry="15" fill="#D4A574" />
        <path d="M40 70 Q50 75 60 70" stroke="#D4A574" strokeWidth="3" fill="none" />
      </svg>
    )
  },
  {
    id: 'rabbit-white',
    name: 'White Rabbit',
    category: 'rabbits',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="58" r="25" fill="#F5F5F5" />
        <ellipse cx="40" cy="25" rx="6" ry="20" fill="#F5F5F5" />
        <ellipse cx="60" cy="25" rx="6" ry="20" fill="#F5F5F5" />
        <ellipse cx="40" cy="28" rx="3" ry="15" fill="#FFB3BA" />
        <ellipse cx="60" cy="28" rx="3" ry="15" fill="#FFB3BA" />
        <circle cx="44" cy="52" r="2" fill="#000" />
        <circle cx="56" cy="52" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="1" ry="1.5" fill="#000" />
        <path d="M47 62 Q50 65 53 62" stroke="#000" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    id: 'bear-brown',
    name: 'Brown Bear',
    category: 'bears',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="28" fill="#8B4513" />
        <circle cx="35" cy="35" r="12" fill="#8B4513" />
        <circle cx="65" cy="35" r="12" fill="#8B4513" />
        <circle cx="35" cy="35" r="6" fill="#DEB887" />
        <circle cx="65" cy="35" r="6" fill="#DEB887" />
        <circle cx="45" cy="48" r="2.5" fill="#000" />
        <circle cx="55" cy="48" r="2.5" fill="#000" />
        <ellipse cx="50" cy="55" rx="2" ry="2.5" fill="#000" />
        <path d="M46 62 Q50 66 54 62" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'panda',
    name: 'Panda',
    category: 'bears',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="28" fill="#FFF" />
        <circle cx="35" cy="35" r="12" fill="#000" />
        <circle cx="65" cy="35" r="12" fill="#000" />
        <ellipse cx="40" cy="47" rx="8" ry="6" fill="#000" />
        <ellipse cx="60" cy="47" rx="8" ry="6" fill="#000" />
        <circle cx="42" cy="48" r="2" fill="#FFF" />
        <circle cx="58" cy="48" r="2" fill="#FFF" />
        <ellipse cx="50" cy="58" rx="2" ry="2.5" fill="#000" />
        <path d="M46 65 Q50 68 54 65" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'fox-orange',
    name: 'Orange Fox',
    category: 'foxes',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="58" r="25" fill="#FF6B35" />
        <polygon points="50,32 40,20 45,35" fill="#FF6B35" />
        <polygon points="50,32 60,20 55,35" fill="#FF6B35" />
        <polygon points="45,35 42,25 48,32" fill="#FFF" />
        <polygon points="55,35 58,25 52,32" fill="#FFF" />
        <circle cx="45" cy="52" r="2" fill="#000" />
        <circle cx="55" cy="52" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="1.5" ry="2" fill="#000" />
        <path d="M47 63 Q50 66 53 63" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="50" cy="68" rx="15" ry="8" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'owl-brown',
    name: 'Brown Owl',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="28" ry="35" fill="#8B7355" />
        <circle cx="38" cy="45" r="12" fill="#F5DEB3" />
        <circle cx="62" cy="45" r="12" fill="#F5DEB3" />
        <circle cx="38" cy="45" r="6" fill="#000" />
        <circle cx="62" cy="45" r="6" fill="#000" />
        <circle cx="38" cy="43" r="2" fill="#FFF" />
        <circle cx="62" cy="43" r="2" fill="#FFF" />
        <polygon points="50,52 46,60 54,60" fill="#FFA500" />
        <ellipse cx="50" cy="75" rx="20" ry="12" fill="#A0522D" />
      </svg>
    )
  },
  {
    id: 'penguin',
    name: 'Penguin',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="25" ry="35" fill="#000" />
        <ellipse cx="50" cy="62" rx="18" ry="28" fill="#FFF" />
        <circle cx="50" cy="35" r="20" fill="#000" />
        <circle cx="50" cy="37" r="15" fill="#FFF" />
        <circle cx="45" cy="32" r="2" fill="#000" />
        <circle cx="55" cy="32" r="2" fill="#000" />
        <ellipse cx="50" cy="40" rx="3" ry="2" fill="#FFA500" />
      </svg>
    )
  },
  {
    id: 'elephant-gray',
    name: 'Gray Elephant',
    category: 'elephants',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="30" fill="#A9A9A9" />
        <ellipse cx="50" cy="75" rx="8" ry="20" fill="#A9A9A9" />
        <ellipse cx="30" cy="40" rx="10" ry="15" fill="#A9A9A9" />
        <ellipse cx="70" cy="40" rx="10" ry="15" fill="#A9A9A9" />
        <circle cx="42" cy="48" r="3" fill="#000" />
        <circle cx="58" cy="48" r="3" fill="#000" />
        <path d="M45 65 Q50 68 55 65" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'lion-yellow',
    name: 'Lion',
    category: 'cats',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="35" fill="#DEB887" />
        <circle cx="50" cy="55" r="25" fill="#F4A460" />
        <circle cx="45" cy="48" r="2.5" fill="#000" />
        <circle cx="55" cy="48" r="2.5" fill="#000" />
        <ellipse cx="50" cy="55" rx="1.5" ry="2" fill="#000" />
        <path d="M46 62 Q50 66 54 62" stroke="#000" strokeWidth="2" fill="none" />
        <path d="M30 30 Q25 25 35 35" stroke="#DEB887" strokeWidth="4" fill="none" />
        <path d="M70 30 Q75 25 65 35" stroke="#DEB887" strokeWidth="4" fill="none" />
        <path d="M30 50 Q20 45 30 55" stroke="#DEB887" strokeWidth="4" fill="none" />
        <path d="M70 50 Q80 45 70 55" stroke="#DEB887" strokeWidth="4" fill="none" />
      </svg>
    )
  },
  {
    id: 'monkey-brown',
    name: 'Monkey',
    category: 'monkeys',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="28" fill="#D2691E" />
        <circle cx="35" cy="45" r="15" fill="#D2691E" />
        <circle cx="65" cy="45" r="15" fill="#D2691E" />
        <circle cx="35" cy="47" r="8" fill="#F5DEB3" />
        <circle cx="65" cy="47" r="8" fill="#F5DEB3" />
        <circle cx="50" cy="65" r="12" fill="#F5DEB3" />
        <circle cx="45" cy="50" r="2" fill="#000" />
        <circle cx="55" cy="50" r="2" fill="#000" />
        <ellipse cx="50" cy="60" rx="1.5" ry="2" fill="#000" />
        <path d="M47 70 Q50 73 53 70" stroke="#000" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    id: 'pig-pink',
    name: 'Pink Pig',
    category: 'farm',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="28" fill="#FFB6C1" />
        <circle cx="45" cy="48" r="2" fill="#000" />
        <circle cx="55" cy="48" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="6" ry="4" fill="#FF69B4" />
        <circle cx="47" cy="58" r="1.5" fill="#000" />
        <circle cx="53" cy="58" r="1.5" fill="#000" />
        <path d="M46 65 Q50 68 54 65" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="35" cy="42" rx="4" ry="6" fill="#FFB6C1" />
        <ellipse cx="65" cy="42" rx="4" ry="6" fill="#FFB6C1" />
      </svg>
    )
  },
  {
    id: 'sheep-white',
    name: 'White Sheep',
    category: 'farm',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="25" fill="#F5F5F5" />
        <circle cx="30" cy="45" r="12" fill="#F5F5F5" />
        <circle cx="70" cy="45" r="12" fill="#F5F5F5" />
        <circle cx="35" cy="35" r="10" fill="#F5F5F5" />
        <circle cx="65" cy="35" r="10" fill="#F5F5F5" />
        <circle cx="50" cy="35" r="8" fill="#F5F5F5" />
        <circle cx="45" cy="52" r="2" fill="#000" />
        <circle cx="55" cy="52" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="1.5" ry="2" fill="#000" />
        <path d="M47 63 Q50 66 53 63" stroke="#000" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    id: 'cow-black-white',
    name: 'Cow',
    category: 'farm',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="28" fill="#FFF" />
        <ellipse cx="40" cy="45" rx="8" ry="12" fill="#000" />
        <ellipse cx="65" cy="35" rx="10" ry="8" fill="#000" />
        <ellipse cx="35" cy="65" rx="6" ry="10" fill="#000" />
        <circle cx="45" cy="50" r="2" fill="#000" />
        <circle cx="55" cy="50" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="2" ry="2.5" fill="#000" />
        <path d="M46 65 Q50 68 54 65" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="35" cy="40" rx="3" ry="8" fill="#FFF" />
        <ellipse cx="65" cy="40" rx="3" ry="8" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'horse-brown',
    name: 'Brown Horse',
    category: 'farm',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="25" ry="30" fill="#8B4513" />
        <ellipse cx="35" cy="40" rx="6" ry="12" fill="#8B4513" />
        <ellipse cx="65" cy="40" rx="6" ry="12" fill="#8B4513" />
        <path d="M45 25 Q50 20 55 25 Q50 30 45 25" fill="#654321" />
        <circle cx="45" cy="50" r="2.5" fill="#000" />
        <circle cx="55" cy="50" r="2.5" fill="#000" />
        <ellipse cx="50" cy="65" rx="3" ry="8" fill="#000" />
        <path d="M47 75 Q50 78 53 75" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'duck-yellow',
    name: 'Yellow Duck',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="60" r="25" fill="#FFD700" />
        <circle cx="50" cy="40" r="18" fill="#FFD700" />
        <circle cx="45" cy="35" r="2" fill="#000" />
        <circle cx="55" cy="35" r="2" fill="#000" />
        <ellipse cx="35" cy="40" rx="6" ry="4" fill="#FFA500" />
        <path d="M48 50 Q50 52 52 50" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="50" cy="75" rx="20" ry="8" fill="#FFD700" />
      </svg>
    )
  },
  {
    id: 'frog-green',
    name: 'Green Frog',
    category: 'amphibians',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="30" ry="25" fill="#32CD32" />
        <circle cx="35" cy="35" r="12" fill="#32CD32" />
        <circle cx="65" cy="35" r="12" fill="#32CD32" />
        <circle cx="35" cy="32" r="6" fill="#000" />
        <circle cx="65" cy="32" r="6" fill="#000" />
        <circle cx="35" cy="30" r="2" fill="#FFF" />
        <circle cx="65" cy="30" r="2" fill="#FFF" />
        <path d="M45 65 Q50 70 55 65" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="30" cy="70" rx="8" ry="12" fill="#32CD32" />
        <ellipse cx="70" cy="70" rx="8" ry="12" fill="#32CD32" />
      </svg>
    )
  },
  {
    id: 'turtle-green',
    name: 'Green Turtle',
    category: 'reptiles',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="35" ry="30" fill="#228B22" />
        <circle cx="50" cy="35" r="15" fill="#32CD32" />
        <circle cx="45" cy="30" r="2" fill="#000" />
        <circle cx="55" cy="30" r="2" fill="#000" />
        <path d="M48 38 Q50 40 52 38" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="25" cy="50" rx="8" ry="6" fill="#32CD32" />
        <ellipse cx="75" cy="50" rx="8" ry="6" fill="#32CD32" />
        <ellipse cx="35" cy="75" rx="6" ry="8" fill="#32CD32" />
        <ellipse cx="65" cy="75" rx="6" ry="8" fill="#32CD32" />
        <polygon points="40,45 45,40 50,45 55,40 60,45 55,50 50,55 45,50" fill="#006400" />
      </svg>
    )
  },
  {
    id: 'fish-blue',
    name: 'Blue Fish',
    category: 'fish',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="45" cy="50" rx="25" ry="18" fill="#4169E1" />
        <polygon points="75,50 85,40 85,60" fill="#4169E1" />
        <circle cx="35" cy="45" r="3" fill="#000" />
        <circle cx="37" cy="43" r="1" fill="#FFF" />
        <path d="M32 55 Q35 58 38 55" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="45" cy="40" rx="8" ry="3" fill="#87CEEB" />
        <path d="M45 35 Q50 30 55 35" stroke="#4169E1" strokeWidth="2" fill="none" />
        <path d="M45 65 Q50 70 55 65" stroke="#4169E1" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'octopus-purple',
    name: 'Purple Octopus',
    category: 'sea',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="45" r="25" fill="#9370DB" />
        <circle cx="42" cy="40" r="3" fill="#000" />
        <circle cx="58" cy="40" r="3" fill="#000" />
        <path d="M46 50 Q50 54 54 50" stroke="#000" strokeWidth="2" fill="none" />
        <path d="M35 65 Q30 75 35 85 Q40 80 35 70" stroke="#9370DB" strokeWidth="4" fill="none" />
        <path d="M45 68 Q40 78 45 88 Q50 83 45 73" stroke="#9370DB" strokeWidth="4" fill="none" />
        <path d="M55 68 Q60 78 55 88 Q50 83 55 73" stroke="#9370DB" strokeWidth="4" fill="none" />
        <path d="M65 65 Q70 75 65 85 Q60 80 65 70" stroke="#9370DB" strokeWidth="4" fill="none" />
        <circle cx="44" cy="38" r="1" fill="#FFF" />
        <circle cx="56" cy="38" r="1" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'crab-red',
    name: 'Red Crab',
    category: 'sea',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="20" ry="15" fill="#DC143C" />
        <circle cx="40" cy="35" r="8" fill="#DC143C" />
        <circle cx="60" cy="35" r="8" fill="#DC143C" />
        <circle cx="40" cy="32" r="2" fill="#000" />
        <circle cx="60" cy="32" r="2" fill="#000" />
        <ellipse cx="25" cy="50" rx="8" ry="4" fill="#DC143C" />
        <ellipse cx="75" cy="50" rx="8" ry="4" fill="#DC143C" />
        <ellipse cx="30" cy="65" rx="4" ry="8" fill="#DC143C" />
        <ellipse cx="70" cy="65" rx="4" ry="8" fill="#DC143C" />
        <ellipse cx="40" cy="70" rx="4" ry="6" fill="#DC143C" />
        <ellipse cx="60" cy="70" rx="4" ry="6" fill="#DC143C" />
        <path d="M46 55 Q50 58 54 55" stroke="#000" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    id: 'whale-blue',
    name: 'Blue Whale',
    category: 'sea',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="45" cy="55" rx="30" ry="20" fill="#4682B4" />
        <polygon points="75,55 85,45 85,65" fill="#4682B4" />
        <circle cx="35" cy="48" r="3" fill="#000" />
        <circle cx="37" cy="46" r="1" fill="#FFF" />
        <path d="M32 58 Q35 62 38 58" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="45" cy="45" rx="12" ry="4" fill="#87CEEB" />
        <path d="M35 25 Q40 20 45 25" stroke="#4682B4" strokeWidth="3" fill="none" />
        <ellipse cx="50" cy="75" rx="6" ry="12" fill="#4682B4" />
      </svg>
    )
  },
  {
    id: 'koala-gray',
    name: 'Koala',
    category: 'marsupials',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="25" fill="#708090" />
        <circle cx="30" cy="30" r="15" fill="#708090" />
        <circle cx="70" cy="30" r="15" fill="#708090" />
        <circle cx="30" cy="32" r="8" fill="#FFB6C1" />
        <circle cx="70" cy="32" r="8" fill="#FFB6C1" />
        <circle cx="45" cy="50" r="2" fill="#000" />
        <circle cx="55" cy="50" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="2" ry="2.5" fill="#000" />
        <path d="M46 65 Q50 68 54 65" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="50" cy="68" rx="12" ry="6" fill="#F5F5F5" />
      </svg>
    )
  },
  {
    id: 'kangaroo-brown',
    name: 'Kangaroo',
    category: 'marsupials',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="22" ry="30" fill="#D2691E" />
        <circle cx="50" cy="35" r="18" fill="#D2691E" />
        <ellipse cx="35" cy="28" rx="6" ry="12" fill="#D2691E" />
        <ellipse cx="65" cy="28" rx="6" ry="12" fill="#D2691E" />
        <circle cx="45" cy="32" r="2" fill="#000" />
        <circle cx="55" cy="32" r="2" fill="#000" />
        <ellipse cx="50" cy="40" rx="1.5" ry="2" fill="#000" />
        <path d="M47 45 Q50 48 53 45" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="50" cy="72" rx="15" ry="8" fill="#F5DEB3" />
        <ellipse cx="65" cy="80" rx="8" ry="15" fill="#D2691E" />
      </svg>
    )
  },
  {
    id: 'squirrel-brown',
    name: 'Squirrel',
    category: 'rodents',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="22" fill="#8B4513" />
        <circle cx="45" cy="48" r="2" fill="#000" />
        <circle cx="55" cy="48" r="2" fill="#000" />
        <ellipse cx="50" cy="55" rx="1.5" ry="2" fill="#000" />
        <path d="M47 62 Q50 65 53 62" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="35" cy="40" rx="5" ry="8" fill="#8B4513" />
        <ellipse cx="65" cy="40" rx="5" ry="8" fill="#8B4513" />
        <path d="M70 30 Q80 20 85 35 Q75 45 70 35" fill="#654321" stroke="#654321" strokeWidth="2" />
        <ellipse cx="50" cy="70" rx="18" ry="8" fill="#DEB887" />
      </svg>
    )
  },
  {
    id: 'hedgehog-brown',
    name: 'Hedgehog',
    category: 'small',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="25" ry="20" fill="#8B4513" />
        <circle cx="45" cy="45" r="15" fill="#DEB887" />
        <ellipse cx="40" cy="40" rx="1.5" ry="2" fill="#000" />
        <ellipse cx="50" cy="50" rx="1" ry="1.5" fill="#000" />
        <path d="M42 52 Q45 54 48 52" stroke="#000" strokeWidth="1" fill="none" />
        <path d="M30 40 L25 35 M35 35 L30 30 M40 35 L35 30 M45 35 L40 30" stroke="#654321" strokeWidth="2" />
        <path d="M55 35 L60 30 M60 35 L65 30 M65 35 L70 30 M70 40 L75 35" stroke="#654321" strokeWidth="2" />
        <path d="M30 50 L25 45 M35 50 L30 45 M65 50 L70 45 M70 55 L75 50" stroke="#654321" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'hamster-golden',
    name: 'Golden Hamster',
    category: 'rodents',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="60" r="25" fill="#DAA520" />
        <circle cx="38" cy="45" r="8" fill="#DAA520" />
        <circle cx="62" cy="45" r="8" fill="#DAA520" />
        <circle cx="44" cy="52" r="2" fill="#000" />
        <circle cx="56" cy="52" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="1.5" ry="2" fill="#000" />
        <path d="M47 65 Q50 68 53 65" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="50" cy="72" rx="18" ry="8" fill="#F5DEB3" />
        <ellipse cx="32" cy="65" rx="6" ry="4" fill="#DAA520" />
        <ellipse cx="68" cy="65" rx="6" ry="4" fill="#DAA520" />
      </svg>
    )
  },
  {
    id: 'raccoon-gray',
    name: 'Raccoon',
    category: 'woodland',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="25" fill="#696969" />
        <ellipse cx="35" cy="40" rx="6" ry="10" fill="#696969" />
        <ellipse cx="65" cy="40" rx="6" ry="10" fill="#696969" />
        <ellipse cx="40" cy="45" rx="8" ry="6" fill="#000" />
        <ellipse cx="60" cy="45" rx="8" ry="6" fill="#000" />
        <circle cx="42" cy="46" r="2" fill="#FFF" />
        <circle cx="58" cy="46" r="2" fill="#FFF" />
        <ellipse cx="50" cy="58" rx="2" ry="2.5" fill="#000" />
        <path d="M46 65 Q50 68 54 65" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="50" cy="75" rx="15" ry="6" fill="#F5F5F5" />
      </svg>
    )
  },
  {
    id: 'deer-brown',
    name: 'Brown Deer',
    category: 'woodland',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="20" ry="25" fill="#8B4513" />
        <circle cx="50" cy="40" r="16" fill="#8B4513" />
        <circle cx="46" cy="36" r="2" fill="#000" />
        <circle cx="54" cy="36" r="2" fill="#000" />
        <ellipse cx="50" cy="44" rx="1.5" ry="2" fill="#000" />
        <path d="M47 48 Q50 51 53 48" stroke="#000" strokeWidth="1.5" fill="none" />
        <path d="M40 25 Q35 15 30 20 Q38 18 42 28" stroke="#654321" strokeWidth="3" fill="none" />
        <path d="M60 25 Q65 15 70 20 Q62 18 58 28" stroke="#654321" strokeWidth="3" fill="none" />
        <ellipse cx="50" cy="78" rx="12" ry="6" fill="#DEB887" />
      </svg>
    )
  },
  {
    id: 'wolf-gray',
    name: 'Gray Wolf',
    category: 'dogs',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="25" fill="#708090" />
        <ellipse cx="35" cy="40" rx="8" ry="12" fill="#708090" />
        <ellipse cx="65" cy="40" rx="8" ry="12" fill="#708090" />
        <circle cx="45" cy="48" r="2.5" fill="#000" />
        <circle cx="55" cy="48" r="2.5" fill="#000" />
        <ellipse cx="50" cy="55" rx="2" ry="2.5" fill="#000" />
        <path d="M46 62 Q50 66 54 62" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="50" cy="72" rx="15" ry="8" fill="#F5F5F5" />
      </svg>
    )
  },
  {
    id: 'zebra-stripes',
    name: 'Zebra',
    category: 'african',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="25" ry="30" fill="#FFF" />
        <ellipse cx="35" cy="40" rx="6" ry="12" fill="#FFF" />
        <ellipse cx="65" cy="40" rx="6" ry="12" fill="#FFF" />
        <circle cx="45" cy="50" r="2.5" fill="#000" />
        <circle cx="55" cy="50" r="2.5" fill="#000" />
        <ellipse cx="50" cy="65" rx="3" ry="8" fill="#000" />
        <path d="M47 75 Q50 78 53 75" stroke="#000" strokeWidth="2" fill="none" />
        <path d="M35 35 Q40 40 35 45" stroke="#000" strokeWidth="3" fill="none" />
        <path d="M45 35 Q50 40 45 50" stroke="#000" strokeWidth="3" fill="none" />
        <path d="M55 35 Q60 40 55 50" stroke="#000" strokeWidth="3" fill="none" />
        <path d="M65 35 Q60 40 65 45" stroke="#000" strokeWidth="3" fill="none" />
        <path d="M40 55 Q45 60 40 70" stroke="#000" strokeWidth="3" fill="none" />
        <path d="M60 55 Q55 60 60 70" stroke="#000" strokeWidth="3" fill="none" />
      </svg>
    )
  },
  {
    id: 'giraffe-yellow',
    name: 'Giraffe',
    category: 'african',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="70" rx="20" ry="20" fill="#DAA520" />
        <ellipse cx="50" cy="35" rx="12" ry="25" fill="#DAA520" />
        <circle cx="50" cy="25" r="12" fill="#DAA520" />
        <circle cx="46" cy="22" r="2" fill="#000" />
        <circle cx="54" cy="22" r="2" fill="#000" />
        <ellipse cx="50" cy="28" rx="1.5" ry="2" fill="#000" />
        <path d="M47 32 Q50 35 53 32" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="45" cy="15" rx="2" ry="4" fill="#654321" />
        <ellipse cx="55" cy="15" rx="2" ry="4" fill="#654321" />
        <circle cx="40" cy="40" r="3" fill="#8B4513" />
        <circle cx="60" cy="50" r="3" fill="#8B4513" />
        <circle cx="45" cy="65" r="3" fill="#8B4513" />
        <circle cx="55" cy="75" r="3" fill="#8B4513" />
      </svg>
    )
  },
  {
    id: 'hippo-gray',
    name: 'Hippo',
    category: 'african',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="30" ry="25" fill="#708090" />
        <ellipse cx="50" cy="40" rx="25" ry="20" fill="#708090" />
        <circle cx="35" cy="32" r="6" fill="#708090" />
        <circle cx="65" cy="32" r="6" fill="#708090" />
        <circle cx="42" cy="38" r="2.5" fill="#000" />
        <circle cx="58" cy="38" r="2.5" fill="#000" />
        <ellipse cx="50" cy="50" rx="8" ry="6" fill="#A9A9A9" />
        <ellipse cx="46" cy="48" rx="2" ry="3" fill="#000" />
        <ellipse cx="54" cy="48" rx="2" ry="3" fill="#000" />
        <path d="M40 58 Q50 63 60 58" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'rhino-gray',
    name: 'Rhino',
    category: 'african',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="28" ry="25" fill="#A9A9A9" />
        <circle cx="50" cy="40" r="20" fill="#A9A9A9" />
        <circle cx="45" cy="35" r="2" fill="#000" />
        <circle cx="55" cy="35" r="2" fill="#000" />
        <ellipse cx="50" cy="45" rx="2" ry="3" fill="#000" />
        <path d="M46 52 Q50 55 54 52" stroke="#000" strokeWidth="2" fill="none" />
        <polygon points="50,30 48,20 52,20" fill="#696969" />
        <ellipse cx="30" cy="45" rx="5" ry="8" fill="#A9A9A9" />
        <ellipse cx="70" cy="45" rx="5" ry="8" fill="#A9A9A9" />
      </svg>
    )
  },
  {
    id: 'cheetah-spotted',
    name: 'Cheetah',
    category: 'cats',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="25" fill="#DAA520" />
        <circle cx="45" cy="48" r="2.5" fill="#000" />
        <circle cx="55" cy="48" r="2.5" fill="#000" />
        <ellipse cx="50" cy="55" rx="1.5" ry="2" fill="#000" />
        <path d="M46 62 Q50 66 54 62" stroke="#000" strokeWidth="2" fill="none" />
        <ellipse cx="35" cy="40" rx="6" ry="10" fill="#DAA520" />
        <ellipse cx="65" cy="40" rx="6" ry="10" fill="#DAA520" />
        <circle cx="40" cy="45" r="2" fill="#8B4513" />
        <circle cx="60" cy="45" r="2" fill="#8B4513" />
        <circle cx="35" cy="60" r="2" fill="#8B4513" />
        <circle cx="65" cy="60" r="2" fill="#8B4513" />
        <circle cx="50" cy="70" r="2" fill="#8B4513" />
        <path d="M42 40 Q40 35 45 40" stroke="#000" strokeWidth="2" fill="none" />
        <path d="M58 40 Q60 35 55 40" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'lemur-gray',
    name: 'Lemur',
    category: 'primates',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="22" fill="#696969" />
        <circle cx="35" cy="40" r="12" fill="#696969" />
        <circle cx="65" cy="40" r="12" fill="#696969" />
        <circle cx="35" cy="42" r="6" fill="#F5F5F5" />
        <circle cx="65" cy="42" r="6" fill="#F5F5F5" />
        <circle cx="45" cy="50" r="2" fill="#000" />
        <circle cx="55" cy="50" r="2" fill="#000" />
        <ellipse cx="50" cy="58" rx="1.5" ry="2" fill="#000" />
        <path d="M47 63 Q50 66 53 63" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="50" cy="72" rx="15" ry="6" fill="#F5F5F5" />
        <path d="M70 60 Q80 50 85 65 Q75 70 70 65" stroke="#696969" strokeWidth="4" fill="none" />
      </svg>
    )
  },
  {
    id: 'sloth-brown',
    name: 'Sloth',
    category: 'tropical',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="55" r="25" fill="#8B7355" />
        <circle cx="45" cy="48" r="2" fill="#000" />
        <circle cx="55" cy="48" r="2" fill="#000" />
        <ellipse cx="50" cy="55" rx="1.5" ry="2" fill="#000" />
        <path d="M47 62 Q50 65 53 62" stroke="#000" strokeWidth="1.5" fill="none" />
        <ellipse cx="25" cy="50" rx="8" ry="15" fill="#8B7355" />
        <ellipse cx="75" cy="50" rx="8" ry="15" fill="#8B7355" />
        <ellipse cx="50" cy="75" rx="18" ry="8" fill="#DEB887" />
        <path d="M40 30 Q45 25 50 30 Q55 25 60 30" stroke="#654321" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'parrot-colorful',
    name: 'Colorful Parrot',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="25" ry="30" fill="#32CD32" />
        <circle cx="50" cy="35" r="18" fill="#FF6347" />
        <circle cx="45" cy="30" r="2.5" fill="#000" />
        <circle cx="55" cy="30" r="2.5" fill="#000" />
        <path d="M40 40 Q45 45 50 40" stroke="#FFA500" strokeWidth="3" fill="none" />
        <ellipse cx="50" cy="70" rx="20" ry="12" fill="#4169E1" />
        <ellipse cx="70" cy="50" rx="8" ry="20" fill="#FFD700" />
        <path d="M65 30 Q75 25 80 35" stroke="#FF6347" strokeWidth="3" fill="none" />
      </svg>
    )
  },
  {
    id: 'flamingo-pink',
    name: 'Pink Flamingo',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="20" ry="25" fill="#FF69B4" />
        <ellipse cx="50" cy="30" rx="8" ry="20" fill="#FF69B4" />
        <circle cx="50" cy="20" r="10" fill="#FF69B4" />
        <circle cx="48" cy="18" r="1.5" fill="#000" />
        <path d="M45 22 Q50 25 55 22" stroke="#FFA500" strokeWidth="2" fill="none" />
        <ellipse cx="65" cy="75" rx="4" ry="15" fill="#FF69B4" />
        <ellipse cx="50" cy="85" rx="12" ry="6" fill="#FF1493" />
      </svg>
    )
  },
  {
    id: 'peacock-blue',
    name: 'Blue Peacock',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="60" rx="22" ry="28" fill="#4169E1" />
        <circle cx="50" cy="35" r="15" fill="#191970" />
        <circle cx="47" cy="32" r="2" fill="#000" />
        <circle cx="53" cy="32" r="2" fill="#000" />
        <path d="M46 40 Q50 43 54 40" stroke="#FFA500" strokeWidth="2" fill="none" />
        <path d="M30 30 Q25 20 35 25" stroke="#00CED1" strokeWidth="3" fill="none" />
        <path d="M70 30 Q75 20 65 25" stroke="#00CED1" strokeWidth="3" fill="none" />
        <circle cx="32" cy="25" r="3" fill="#32CD32" />
        <circle cx="68" cy="25" r="3" fill="#32CD32" />
        <ellipse cx="50" cy="78" rx="18" ry="8" fill="#4682B4" />
      </svg>
    )
  },
  {
    id: 'toucan-colorful',
    name: 'Toucan',
    category: 'birds',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="22" ry="28" fill="#000" />
        <circle cx="50" cy="35" r="16" fill="#FFD700" />
        <circle cx="47" cy="32" r="2" fill="#000" />
        <circle cx="53" cy="32" r="2" fill="#000" />
        <ellipse cx="30" cy="35" rx="15" ry="8" fill="#FFA500" />
        <ellipse cx="50" cy="70" rx="18" ry="10" fill="#FF6347" />
        <ellipse cx="50" cy="78" rx="15" ry="6" fill="#32CD32" />
      </svg>
    )
  },
  {
    id: 'bee-yellow',
    name: 'Bee',
    category: 'insects',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="20" ry="15" fill="#FFD700" />
        <ellipse cx="45" cy="55" rx="3" ry="15" fill="#000" />
        <ellipse cx="55" cy="55" rx="3" ry="15" fill="#000" />
        <ellipse cx="65" cy="55" rx="3" ry="15" fill="#000" />
        <circle cx="50" cy="40" r="12" fill="#FFD700" />
        <circle cx="46" cy="36" r="2" fill="#000" />
        <circle cx="54" cy="36" r="2" fill="#000" />
        <ellipse cx="30" cy="45" rx="12" ry="4" fill="#FFF" opacity="0.7" />
        <ellipse cx="70" cy="45" rx="12" ry="4" fill="#FFF" opacity="0.7" />
        <path d="M48 45 Q50 48 52 45" stroke="#000" strokeWidth="1" fill="none" />
      </svg>
    )
  },
  {
    id: 'butterfly-colorful',
    name: 'Butterfly',
    category: 'insects',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="2" ry="25" fill="#000" />
        <ellipse cx="30" cy="35" rx="15" ry="12" fill="#FF69B4" />
        <ellipse cx="70" cy="35" rx="15" ry="12" fill="#FF69B4" />
        <ellipse cx="30" cy="65" rx="12" ry="10" fill="#4169E1" />
        <ellipse cx="70" cy="65" rx="12" ry="10" fill="#4169E1" />
        <circle cx="30" cy="35" r="3" fill="#FFD700" />
        <circle cx="70" cy="35" r="3" fill="#FFD700" />
        <circle cx="30" cy="65" r="2" fill="#32CD32" />
        <circle cx="70" cy="65" r="2" fill="#32CD32" />
        <path d="M48 30 Q45 25 50 28" stroke="#000" strokeWidth="2" fill="none" />
        <path d="M52 30 Q55 25 50 28" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'ladybug-red',
    name: 'Ladybug',
    category: 'insects',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="25" ry="20" fill="#DC143C" />
        <circle cx="50" cy="35" r="12" fill="#000" />
        <circle cx="47" cy="32" r="1.5" fill="#FFF" />
        <circle cx="53" cy="32" r="1.5" fill="#FFF" />
        <path d="M50 35 L50 75" stroke="#000" strokeWidth="2" />
        <circle cx="40" cy="50" r="3" fill="#000" />
        <circle cx="60" cy="50" r="3" fill="#000" />
        <circle cx="35" cy="60" r="2" fill="#000" />
        <circle cx="65" cy="60" r="2" fill="#000" />
        <circle cx="45" cy="65" r="2" fill="#000" />
        <circle cx="55" cy="65" r="2" fill="#000" />
      </svg>
    )
  },
  {
    id: 'snail-green',
    name: 'Green Snail',
    category: 'garden',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="45" cy="65" rx="20" ry="8" fill="#90EE90" />
        <circle cx="65" cy="45" r="20" fill="#228B22" />
        <circle cx="55" cy="40" r="12" fill="#32CD32" />
        <circle cx="48" cy="38" r="8" fill="#90EE90" />
        <circle cx="35" cy="58" r="10" fill="#90EE90" />
        <circle cx="32" cy="55" r="2" fill="#000" />
        <circle cx="38" cy="55" r="2" fill="#000" />
        <path d="M28 50 Q25 45 30 48" stroke="#90EE90" strokeWidth="2" fill="none" />
        <path d="M34 50 Q31 45 36 48" stroke="#90EE90" strokeWidth="2" fill="none" />
      </svg>
    )
  }
];

export const categories = [
  'all',
  'cats',
  'dogs',
  'rabbits',
  'bears',
  'foxes',
  'birds',
  'elephants',
  'monkeys',
  'farm',
  'amphibians',
  'reptiles',
  'fish',
  'sea',
  'marsupials',
  'rodents',
  'small',
  'woodland',
  'african',
  'primates',
  'tropical',
  'insects',
  'garden'
];

export const getAvatarById = (id: string): Avatar | undefined => {
  return avatars.find(avatar => avatar.id === id);
};

export const getAvatarsByCategory = (category: string): Avatar[] => {
  if (category === 'all') return avatars;
  return avatars.filter(avatar => avatar.category === category);
};
