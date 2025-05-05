// F2I Service Worker for offline capabilities

const CACHE_NAME = 'f2i-cache-v4';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/css/base/reset.css',
  '/assets/css/base/typography.css',
  '/assets/css/base/colors.css',
  '/assets/css/base/layout.css',
  '/assets/css/components/buttons.css',
  '/assets/css/components/cards.css',
  '/assets/css/components/navigation.css',
  '/assets/css/components/breadcrumbs.css',
  '/assets/css/components/footer.css',
  '/assets/css/components/tabs.css',
  '/assets/css/components/accordions.css',
  '/assets/css/components/forms.css',
  '/assets/css/components/hero.css',
  '/assets/css/components/next-step.css',
  '/assets/css/utils/responsive.css',
  '/assets/css/pages/home.css',
  '/assets/css/pages/about.css',
  '/assets/css/pages/transition.css',
  '/assets/css/pages/industry-research.css',
  '/assets/css/pages/skill-translation.css',
  '/assets/css/pages/resume-personal-branding.css',
  '/assets/css/pages/networking-strategies.css',
  '/assets/css/pages/job-search-resources.css',
  '/assets/css/pages/interview-preparation.css',
  '/assets/css/pages/compensation-benefits.css',
  '/assets/css/pages/transition-checklist.css',
  '/assets/css/pages/success-stories.css',
  '/assets/css/pages/simple-pages.css',
  '/assets/css/pages/community.css',
  '/assets/js/script.js',
  '/assets/js/webp-detection.js',
  '/assets/js/join-team.js',
  '/assets/img/hero-bg.jpg',
  '/assets/img/hero-bg.webp',
  '/assets/img/about-hero.jpg',
  '/assets/img/about-hero.webp',
  '/assets/img/about-why.jpg',
  '/assets/img/about-why.webp',
  '/assets/img/transition-roadmap.jpg',
  '/assets/img/transition-roadmap.webp',
  '/offline.html'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If offline and requesting a page, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});
