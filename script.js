// Toggle menü işlevselliği
const menuToggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navigation.classList.toggle('active');
});

// Slayt gösterisi işlevselliği (sadece slider olan sayfalarda çalışır)
const slides = document.querySelectorAll('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlideIndex = 0; // Mevcut slaytın indeksi
let slideInterval; // Otomatik geçiş için interval değişkeni

// Belirli bir slaytı aktif hale getiren fonksiyon
const showSlide = (n) => {
  // Tüm slaytlardaki 'active' sınıfını kaldır
  slides.forEach(slide => slide.classList.remove('active'));
  // Yeni slayta 'active' sınıfını ekle
  slides[n].classList.add('active');
};

// Slaytları otomatik olarak değiştiren fonksiyon
const startAutoSlide = () => {
  // Mevcut interval varsa temizle
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  // Her 5 saniyede bir slayt değiştir
  slideInterval = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }, 5000); // 5000 milisaniye = 5 saniye
};

// "İleri" düğmesi tıklama olayı
if (nextBtn) { // nextBtn var mı kontrol et (çünkü menu.html'de slider gizli)
  nextBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
    startAutoSlide(); // Kullanıcı manuel geçince otomatik oynatmayı sıfırla
  });
}

// "Geri" düğmesi tıklama olayı
if (prevBtn) { // prevBtn var mı kontrol et
  prevBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
    startAutoSlide(); // Kullanıcı manuel geçince otomatik oynatmayı sıfırla
  });
}

// Sayfa yüklendiğinde gerekli işlevsellikleri başlat
document.addEventListener('DOMContentLoaded', () => {
  // Slider slaytları varsa (yani index.html gibi bir sayfadaysak)
  if (slides.length > 0) { 
    showSlide(currentSlideIndex);
    startAutoSlide();
  }

  // YENİ EKLENDİ: İletişim Formu İşlevselliği
  const contactForm = document.getElementById('contactForm');
  const confirmationMessageDiv = document.getElementById('confirmationMessage');

  if (contactForm && confirmationMessageDiv) { // Eğer iletişim formu ve mesaj div'i bu sayfadaysa
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Formun varsayılan gönderimini engelle (sayfa yenilenmez)

      // Mesajı göster
      confirmationMessageDiv.textContent = 'Mesajınız bize ulaşmıştır. Teşekkür ederiz!';
      confirmationMessageDiv.style.display = 'block';
      confirmationMessageDiv.style.color = '#4CAF50'; /* Başarılı mesaj için yeşil */
      // confirmation-message sınıfının diğer stilleri style.css'ten gelecektir

      // Form alanlarını temizle
      contactForm.reset(); 

      // 5 saniye sonra mesajı gizle
      setTimeout(() => {
        confirmationMessageDiv.textContent = '';
        confirmationMessageDiv.style.display = 'none';
      }, 5000); // 5000 milisaniye = 5 saniye
    });
  }
});