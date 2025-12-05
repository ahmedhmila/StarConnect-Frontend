
// A simple local-storage based mock database to simulate a real backend
// This allows us to build the full feature set (Profiles, Posts, Merch) without waiting for Strapi configuration.

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  banner?: string;
  role: 'fan' | 'artist';
  bio: string;
  followers: string[];
  following: string[];
}

export interface Post {
  id: string;
  authorId: string;
  title?: string; // Added for article-like posts
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: number;
  likes: number;
}

export interface Product {
  id: string;
  artistId: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const DEFAULT_USERS: User[] = [
  {
    id: 'u1',
    username: 'cameron',
    name: 'Cameron',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=400&fit=crop',
    role: 'artist',
    bio: 'The Star. Creating the future of connection. Music, Tech, and Vision.',
    followers: ['u2', 'u4', 'u8', 'u9'],
    following: [],
  },
  {
    id: 'u3',
    username: 'luna_beats',
    name: 'Luna Beats',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?w=1200&h=400&fit=crop',
    role: 'artist',
    bio: 'Electronic Soul. Neon Dreams. New album "Midnight" out now.',
    followers: ['u2'],
    following: [],
  },
  {
    id: 'u5',
    username: 'jazz_cat',
    name: 'Miles Vibe',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&h=400&fit=crop',
    role: 'artist',
    bio: 'Smooth jazz for the modern soul. Saxophone player & producer.',
    followers: [],
    following: [],
  },
  {
    id: 'u6',
    username: 'rock_legend',
    name: 'Axel Stone',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=1200&h=400&fit=crop',
    role: 'artist',
    bio: 'Rock n Roll will never die. Live loud.',
    followers: [],
    following: [],
  },
  {
    id: 'u7',
    username: 'pop_princess',
    name: 'Bella Star',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200&h=400&fit=crop',
    role: 'artist',
    bio: 'Glitter, glam, and pop anthems. Join the sparkle squad! ✨',
    followers: ['u8', 'u9'],
    following: [],
  },
  {
    id: 'u2',
    username: 'superfan1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    role: 'fan',
    bio: 'Huge fan of Cameron! Love the new merch.',
    followers: [],
    following: ['u1', 'u3'],
  },
  {
    id: 'u4',
    username: 'tech_guru',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    role: 'fan',
    bio: 'Following the tech revolution. StarConnect is the future.',
    followers: [],
    following: ['u1'],
  },
  {
    id: 'u8',
    username: 'fan_boy_99',
    name: 'Jake P.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    role: 'fan',
    bio: 'Music is life.',
    followers: [],
    following: ['u1', 'u7'],
  },
  {
    id: 'u9',
    username: 'music_lover_x',
    name: 'Elena R.',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    role: 'fan',
    bio: 'Concert addict.',
    followers: [],
    following: ['u1', 'u7'],
  }
];

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    authorId: 'u1',
    title: 'The Future of Digital Connection',
    content: 'We are building something that goes beyond just a social network. StarConnect is about authentic relationships between creators and their community. No algorithms, just pure connection. \n\nI wanted to share my vision for the next 5 years...',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    mediaType: 'image',
    timestamp: Date.now() - 10000000,
    likes: 1240,
  },
  {
    id: 'p2',
    authorId: 'u1',
    content: 'Just dropped the new collection! Check it out in the shop. The gold thread is real 24k gold.',
    mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    mediaType: 'image',
    timestamp: Date.now() - 86400000, // 1 day ago
    likes: 850,
  },
  {
    id: 'p3',
    authorId: 'u3',
    title: 'Midnight Album Launch Party',
    content: 'Thank you to everyone who came out last night! The energy was insane. Here are some highlights from the show.',
    mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    mediaType: 'image',
    timestamp: Date.now() - 3600000, // 1 hour ago
    likes: 2300,
  },
  {
    id: 'p4',
    authorId: 'u3',
    content: 'Studio vibes today. Cooking up something special for the VIPs.',
    timestamp: Date.now() - 172800000, // 2 days ago
    likes: 560,
  },
  {
    id: 'p5',
    authorId: 'u5',
    title: 'Jazz in the Park',
    content: 'Join me this Sunday for a free session at Central Park. Bring your vibes.',
    mediaUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80',
    mediaType: 'image',
    timestamp: Date.now() - 4000000,
    likes: 120,
  },
  {
    id: 'p6',
    authorId: 'u6',
    content: 'New guitar solo practice. What do you think?',
    mediaUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    mediaType: 'image',
    timestamp: Date.now() - 5000000,
    likes: 890,
  },
  {
    id: 'p7',
    authorId: 'u7',
    title: 'Sparkle Tour Dates Announced!',
    content: 'I am so excited to announce the Sparkle Tour! Tickets go on sale Friday. Can\'t wait to see you all!',
    mediaUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
    mediaType: 'image',
    timestamp: Date.now() - 200000,
    likes: 5000,
  }
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    artistId: 'u1',
    name: 'Signature Gold Tee',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    description: 'Limited edition gold thread t-shirt.',
  },
  {
    id: 'prod2',
    artistId: 'u1',
    name: 'Star Hoodie',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80',
    description: 'Heavyweight cotton hoodie with embroidered logo.',
  },
  {
    id: 'prod3',
    artistId: 'u3',
    name: 'Neon Vinyl LP',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=500&q=80',
    description: 'Limited edition transparent blue vinyl of "Midnight".',
  },
  {
    id: 'prod4',
    artistId: 'u3',
    name: 'Luna Tour Cap',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    description: 'Embroidered snapback cap.',
  },
  // New Products
  {
    id: 'prod5',
    artistId: 'u5',
    name: 'Smooth Jazz Sax Strap',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&q=80',
    description: 'Premium leather saxophone strap.',
  },
  {
    id: 'prod6',
    artistId: 'u5',
    name: 'Miles Vibe Signed Poster',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&q=80',
    description: 'Signed concert poster from the 2024 tour.',
  },
  {
    id: 'prod7',
    artistId: 'u6',
    name: 'Rock Legend Guitar Picks',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&q=80',
    description: 'Set of 10 custom guitar picks.',
  },
  {
    id: 'prod8',
    artistId: 'u6',
    name: 'Skull Bandana',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1565699894576-1710004524ba?w=500&q=80',
    description: 'Classic rock style bandana.',
  },
  {
    id: 'prod9',
    artistId: 'u6',
    name: 'Distressed Denim Vest',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=500&q=80',
    description: 'Vintage style denim vest with patches.',
  },
  {
    id: 'prod10',
    artistId: 'u7',
    name: 'Sparkle Lip Gloss Kit',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80',
    description: 'Set of 3 glitter lip glosses.',
  },
  {
    id: 'prod11',
    artistId: 'u7',
    name: 'Bella Star Phone Case',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&q=80',
    description: 'Glitter phone case for all models.',
  },
  {
    id: 'prod12',
    artistId: 'u7',
    name: 'Pop Princess Tote Bag',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80',
    description: 'Canvas tote with Bella Star logo.',
  },
  {
    id: 'prod13',
    artistId: 'u1',
    name: 'Cameron Digital Album',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80',
    description: 'High-quality digital download of the latest album.',
  },
  {
    id: 'prod14',
    artistId: 'u3',
    name: 'Luna Beats Sticker Pack',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=500&q=80',
    description: 'Holographic stickers.',
  }
];

// Helper to initialize DB
const initDB = () => {
  if (typeof window === 'undefined') return;
  
  let users = JSON.parse(localStorage.getItem('sc_users') || '[]');
  if (users.length === 0) {
    users = DEFAULT_USERS;
    localStorage.setItem('sc_users', JSON.stringify(users));
  }

  // Sync current logged in user from Strapi auth
  const currentUserStr = localStorage.getItem('user');
  if (currentUserStr) {
    const currentUser = JSON.parse(currentUserStr);
    // Check if user exists in our mock DB
    const exists = users.find((u: User) => u.username === currentUser.username);
    
    if (!exists) {
      // Determine role based on stored user object (from register page) or default
      const role = currentUser.role || (currentUser.username.toLowerCase().includes('cameron') ? 'artist' : 'fan');

      const newUser: User = {
        id: currentUser.id?.toString() || 'u_' + Date.now(),
        username: currentUser.username,
        name: currentUser.username,
        avatar: `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`,
        role: role,
        bio: role === 'artist' ? 'New Artist on StarConnect.' : 'New member of the community.',
        followers: [],
        following: [],
      };
      users.push(newUser);
      localStorage.setItem('sc_users', JSON.stringify(users));
    }
  }

  if (!localStorage.getItem('sc_posts')) localStorage.setItem('sc_posts', JSON.stringify(DEFAULT_POSTS));
  if (!localStorage.getItem('sc_products')) localStorage.setItem('sc_products', JSON.stringify(DEFAULT_PRODUCTS));
};

export const db = {
  init: initDB,
  users: {
    getAll: (): User[] => {
      initDB();
      return JSON.parse(localStorage.getItem('sc_users') || '[]');
    },
    getByUsername: (username: string): User | undefined => {
      const users = db.users.getAll();
      return users.find(u => u.username === username);
    },
    getCurrent: (): User | null => {
      if (typeof window === 'undefined') return null;
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      // Refresh from DB to get latest followers/following
      return db.users.getByUsername(user.username) || null;
    },
    follow: (followerId: string, targetId: string) => {
      const users = db.users.getAll();
      const follower = users.find(u => u.id === followerId);
      const target = users.find(u => u.id === targetId);

      if (follower && target && !follower.following.includes(targetId)) {
        follower.following.push(targetId);
        target.followers.push(followerId);
        localStorage.setItem('sc_users', JSON.stringify(users));
        return true;
      }
      return false;
    },
    unfollow: (followerId: string, targetId: string) => {
      const users = db.users.getAll();
      const follower = users.find(u => u.id === followerId);
      const target = users.find(u => u.id === targetId);

      if (follower && target) {
        follower.following = follower.following.filter(id => id !== targetId);
        target.followers = target.followers.filter(id => id !== followerId);
        localStorage.setItem('sc_users', JSON.stringify(users));
        return true;
      }
      return false;
    }
  },
  posts: {
    getAll: (): Post[] => {
      initDB();
      return JSON.parse(localStorage.getItem('sc_posts') || '[]');
    },
    getByAuthor: (authorId: string): Post[] => {
      return db.posts.getAll().filter(p => p.authorId === authorId);
    },
    create: (post: Omit<Post, 'id' | 'timestamp' | 'likes'>) => {
      const posts = db.posts.getAll();
      const newPost: Post = {
        ...post,
        id: 'p' + Date.now(),
        timestamp: Date.now(),
        likes: 0,
      };
      localStorage.setItem('sc_posts', JSON.stringify([newPost, ...posts]));
      // Dispatch event for real-time feel
      window.dispatchEvent(new Event('feedUpdated'));
      return newPost;
    }
  },
  products: {
    getAll: (): Product[] => {
      initDB();
      return JSON.parse(localStorage.getItem('sc_products') || '[]');
    },
    getByArtist: (artistId: string): Product[] => {
      return db.products.getAll().filter(p => p.artistId === artistId);
    }
  }
};