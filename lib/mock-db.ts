
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
  },
  {
    id: 'u3',
    username: 'luna_beats',
    name: 'Luna Beats',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?w=1200&h=400&fit=crop',
    role: 'artist',
    bio: 'Electronic Soul. Neon Dreams. New album "Midnight" out now.',
  },
  {
    id: 'u2',
    username: 'superfan1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    role: 'fan',
    bio: 'Huge fan of Cameron! Love the new merch.',
  },
  {
    id: 'u4',
    username: 'tech_guru',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    role: 'fan',
    bio: 'Following the tech revolution. StarConnect is the future.',
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
      // In a real app, this comes from Auth Context
      // For now, we simulate "Cameron" if logged in as Star, or "Fan" otherwise
      // This is a helper for the UI to know who is "viewing"
      const role = localStorage.getItem('userRole');
      if (role === 'star') return db.users.getByUsername('cameron') || null;
      if (role === 'fan') return db.users.getByUsername('superfan1') || null;
      return null;
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
