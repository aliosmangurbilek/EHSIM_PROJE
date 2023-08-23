using System.ComponentModel.DataAnnotations;

namespace webapi.ViewModel.Urun
{
    public class UrunEkleVM
    {
        public int Id { get; set; }
        [Required]
        public string UrunAdi { get; set; }
        [Required]
        public string UrunAciklamasi { get; set; }
        [Required]
        public string UrunEbadi { get; set; }
        [Required]
        public string UrunFiyati { get; set; }
        [Required]
        public string UrunTedarikciFirma { get; set; }
        [Required]
        public string UrunKdvOrani { get; set; }
    }
}
