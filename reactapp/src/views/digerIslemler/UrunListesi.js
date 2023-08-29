import React from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const UrunlerListesi = () => {
    const navigate = useNavigate();

    const { data, isError, refetch } = useQuery({
        queryKey: ['urunler-data'],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:5273/api/Urun'); // API endpointi buraya göre düzenleyin
                return response.data; // API'den gelen veriyi döndürün
            } catch (error) {
                throw error; // Hata durumunda hatayı yakalayıp fırlatın
            }
        }
    });

    const columns = [
        {
            accessorKey: 'urunAdi',
            header: 'Ürün Adı'
        },
        {
            accessorKey: 'urunAciklamasi',
            header: 'Ürün Açıklaması'
        },
        {
            accessorKey: 'urunEbadi',
            header: 'Ürün Ebadı'
        },
        {
            accessorKey: 'urunFiyati',
            header: 'Ürün Fiyatı'
        },
        {
            accessorKey: 'urunTedarikciFirma',
            header: 'Tedarikçi Firma'
        },
        {
            accessorKey: 'urunKdvOrani',
            header: 'Ürün KDV Oranı'
        }
    ];

    const deleteById = (id) => {
        toast.promise(deletePromise(id), {
            pending: 'Ürün siliniyor.',
            success: 'Ürün başarıyla silindi 👌',
            error: 'Ürün silinirken hata oluştu 🤯'
        });
    };

    const deletePromise = (id) => {
        return new Promise(async (resolve, reject) => {
            // Ürünü silme işlemleri buraya
            try {
                // Silme isteğini gerçekleştirin
                const response = await axios.delete(`http://localhost:5273/api/Urun/${id}`);
                if (response.data.result) {
                    refetch(); // Tabloyu güncelle
                    resolve(response.data);
                } else {
                    reject(new Error('İşlem başarısız'));
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    return (
        <>
            <MaterialReactTable
                enableRowActions
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        header: 'İşlemler'
                    }
                }}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                        <IconButton
                            color="secondary"
                            onClick={() => {
                                navigate(`/urunler/duzenle/${row.original.id}`);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => {
                                deleteById(row.original.id);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
                positionActionsColumn="last"
                columns={columns}
                data={data !== undefined ? data : []}
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                              color: 'error',
                              children: 'Error loading data'
                          }
                        : undefined
                }
                // Diğer prop değerleri buraya eklenebilir
            />
        </>
    );
};

const queryClient = new QueryClient();

const UrunlerListesiWithReactQueryProvider = () => (
    <QueryClientProvider client={queryClient}>
        <UrunlerListesi />
    </QueryClientProvider>
);

export default UrunlerListesiWithReactQueryProvider;
