import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UrunEkle from 'views/digerIslemler/UrunEkle';
import UrunListesi from 'views/digerIslemler/UrunListesi';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// digerIslemler routing
const Musteriler = Loadable(lazy(() => import('views/digerIslemler/MusteriListesi')));
const MusteriEkle = Loadable(lazy(() => import('views/digerIslemler/MusteriEkle')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const SamplePage2 = Loadable(lazy(() => import('views/sample-page-2')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'sample-page-2',
            element: <SamplePage2 />
        },
        {
            path: 'digerIslemler',
            children: [
                {
                    path: 'musteriler',
                    element: <Musteriler />
                },
                {
                    path: 'musteri-ekle',
                    element: <MusteriEkle />
                },
                {
                    path: 'musteri-duzenle/:id',
                    element: <MusteriEkle />
                }
            ]
        },
        {
            path: 'digerIslemler',
            children: [
                {
                    path: 'urun-ekle',
                    element: <UrunEkle />
                }
            ]
        },
        {
            path: 'digerIslemler',
            children: [
                {
                    path: 'urun-listesi',
                    element: <UrunListesi />
                }
            ]
        }
    ]
};

export default MainRoutes;
