using System.ComponentModel.DataAnnotations;

namespace webapi.ViewModel.Urun
{
    public class UrunGridVM
    {
        public int Id { get; set; }
        
        public string UrunAdi { get; set; }
        
        public string UrunAciklamasi { get; set; }
        
        public string UrunEbadi { get; set; }
        
        public string UrunFiyati { get; set; }
        public string UrunTedarikciFirma { get; set; }
        public string UrunKdvOrani { get; set; }
    }
}

