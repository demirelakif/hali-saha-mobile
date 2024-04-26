// utility.js

// Dereceleri radyana dönüştürme fonksiyonu
export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// İki coğrafi koordinat arasındaki mesafeyi hesaplayan Haversine formülü
export function calculateDistance(location1, location2) {
    const { lat: lat1, lng: lng1 } = location1;
    const { lat: lat2, lng: lng2 } = location2;

    const earthRadiusKm = 6371; // Dünya'nın yarıçapı kilometre cinsinden

    const dLat = toRadians(lat2 - lat1); // Farkı radyan cinsinden hesapla
    const dLng = toRadians(lng2 - lng1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c; // Mesafeyi kilometre cinsinden hesapla

    return Math.round(distance); // Tam sayı olarak döndür
}
