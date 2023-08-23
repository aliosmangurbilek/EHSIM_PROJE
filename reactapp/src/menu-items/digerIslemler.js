// assets
import { IconUsers, IconShoppingBag } from '@tabler/icons';

// constant
const icons = { IconUsers, IconShoppingBag };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const digerIslemler = {
    id: 'digerIslemler',
    title: 'Diğer İşlemler',
    type: 'group',
    children: [
        {
            id: 'musteriler',
            title: 'Müşteriler',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'musteriler',
                    title: 'Müşteri Listesi',
                    type: 'item',
                    url: '/digerIslemler/musteriler'
                },
                {
                    id: 'musteri-ekle',
                    title: 'Müşteri Ekle',
                    type: 'item',
                    url: '/digerIslemler/musteri-ekle'
                }
            ]
        },
        {
            id: 'urunler', // Yeni eklenen kısım: "Ürünler" bağlantısı
            title: 'Ürünler',
            type: 'collapse',
            icon: icons.IconShoppingBag, // Uygun bir ürün ikonu seçin veya yükleyin
            children: [
                {
                    id: 'urun-listesi',
                    title: 'Ürün Listesi',
                    type: 'item',
                    url: '/digerIslemler/urun-listesi'
                },
                {
                    id: 'urun-ekle',
                    title: 'Ürün Ekle',
                    type: 'item',
                    url: '/digerIslemler/urun-ekle'
                }
            ]
        }
    ]
};

export default digerIslemler;
