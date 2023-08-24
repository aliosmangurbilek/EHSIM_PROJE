import { Button, Container, FormControl, Grid, LinearProgress, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import axios from 'axios';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function UrunEkle() {
    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(false);
    const [UrunAdi, setUrunAdi] = useState('');
    const [UrunAciklamasi, setUrunAciklamasi] = useState('');
    const [UrunEbadi, setUrunEbadı] = useState('');
    const [UrunFiyati, setUrunFiyati] = useState('');
    const [UrunTedarikciFirma, setUrunTedarikciFirma] = useState('');
    const [UrunKdvOrani, setUrunKdvOrani] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (typeof id !== 'undefined') {
            setIsFetching(true);
            urunGetirPromise();
        } else {
            setUrunAdi('');
            setUrunAciklamasi('');
            setUrunEbadı('');
            setUrunFiyati('');
            setUrunTedarikciFirma('');
            setUrunKdvOrani('');
            setIsFetching(false);
        }
    }, [id]);

    const urunEkle = () => {
        toast.promise(urunEklePromise, {
            pending: 'Ürün kaydı yapılıyor',
            success: urunAdi + ' başarıyla eklendi 👌',
            error: urunAdi + ' eklenirken hata oluştu 🤯'
        });
    };

    const urunEklePromise = () => {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            setValidationErrors({});
            let data = JSON.stringify({
                id: typeof id !== 'undefined' ? id : 0,
                urunAdi: urunAdi,
                urunAciklamasi: urunAciklamasi,
                urunEbadı: urunEbadı,
                urunFiyati: urunFiyati,
                urunTedarikciFirma: urunTedarikciFirma,
                urunKdvOrani: urunKdvOrani
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5273/api/Urun/CreateOrUpdate',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'text/plain'
                },
                data: data
            };

            axios
                .request(config)
                .then(async (response) => {
                    if (response.data.result) {
                        const millis = Date.now() - start;
                        if (millis < 700) {
                            await sleep(700 - millis);
                        }
                        resolve(response.data); // Başarılı sonuç durumunda Promise'ı çöz
                    } else {
                        reject(new Error('İşlem başarısız')); // Başarısız sonuç durumunda Promise'ı reddet
                    }
                })
                .catch((error) => {
                    setValidationErrors(error.response.data.errors);
                    reject(error); // Hata durumunda Promise'ı reddet
                });
        });
    };

    const urunGetirPromise = () => {
        // Urun getirme işlemini buraya eklenecek
        // Urun bilgilerini set etmek için setState
    };

    return (
        <Container className="d-flex justify-content-center" maxWidth="md">
            <Grid item xs={6}>
                <FormControl sx={{ m: 0, width: '50ch' }}>
                    {isFetching && <LinearProgress className="mt-3" color="secondary" />}
                    <TextField
                        value={UrunAdi}
                        margin="normal"
                        id="urun-adi"
                        label="Ürün Adı"
                        variant="outlined"
                        onChange={(e) => setUrunAdi(e.target.value)}
                        error={!!validationErrors.UrunAdi}
                        helperText={validationErrors.UrunAdi}
                    />
                    <TextField
                        value={UrunAciklamasi}
                        margin="normal"
                        id="urun-aciklamasi"
                        label="Ürün Açıklaması"
                        variant="outlined"
                        onChange={(e) => setUrunAciklamasi(e.target.value)}
                        error={!!validationErrors.UrunAciklamasi}
                        helperText={validationErrors.UrunAciklamasi}
                    />
                    <TextField
                        value={UrunEbadi}
                        margin="normal"
                        id="urun-ebadi"
                        label="Ürün Ebadı"
                        variant="outlined"
                        onChange={(e) => setUrunEbadı(e.target.value)}
                        error={!!validationErrors.UrunEbadi}
                        helperText={validationErrors.UrunEbadi}
                    />
                    <TextField
                        value={UrunFiyati}
                        margin="normal"
                        id="urun-fiyati"
                        label="Ürün Fiyatı"
                        variant="outlined"
                        onChange={(e) => setUrunFiyati(e.target.value)}
                        error={!!validationErrors.UrunFiyati}
                        helperText={validationErrors.UrunFiyati}
                    />
                    <TextField
                        value={UrunTedarikciFirma}
                        margin="normal"
                        id="urun-tedarikci-firma"
                        label="Tedarikçi Firma"
                        variant="outlined"
                        onChange={(e) => setUrunTedarikciFirma(e.target.value)}
                        error={!!validationErrors.UrunTedarikciFirma}
                        helperText={validationErrors.UrunTedarikciFirma}
                    />
                    <TextField
                        value={UrunKdvOrani}
                        margin="normal"
                        id="urun-kdv-orani"
                        label="Kdv Oranı"
                        variant="outlined"
                        onChange={(e) => setUrunKdvOrani(e.target.value)}
                        error={!!validationErrors.UrunKdvOrani}
                        helperText={validationErrors.UrunKdvOrani}
                    />

                    <Button onClick={urunEkle} className="mb-2" margin="normal" variant="contained">
                        Kaydet
                    </Button>
                </FormControl>
            </Grid>
        </Container>
    );
}

export default UrunEkle;
