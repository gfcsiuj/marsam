const CACHE_NAME = 'marsam-v1';
// أضف هنا كل الملفات التي تريد أن تعمل بدون انترنت
const urlsToCache = [
  '/',
  '/index.html',
  // أضف أي ملفات CSS أو صور أو خطوط مهمة هنا
  'https://fonts.googleapis.com/css2?family=El+Wakil:wght@200;300;400;500;600;700;800;900&family=Cairo:wght@200;300;400;500;600;700;800;900;1000&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://www2.0zz0.com/2025/08/31/19/332406064.png' 
];

// 1. تثبيت العامل الخدمي وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. جلب المحتوى من الكاش أولاً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، قم بإرجاعه
        if (response) {
          return response;
        }
        // وإلا، اطلبه من الشبكة
        return fetch(event.request);
      }
    )
  );
});
