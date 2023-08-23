using Microsoft.AspNetCore.Mvc;
using webapi.Base.Base;
using webapi.Base.Base.Grid;
using webapi.Entity;
using webapi.Helper.Base;
using webapi.ViewModel.General.Grid;
using webapi.ViewModel;
using webapi.ViewModel.Urun; // Burada Ürünle ilgili ViewModel'i eklemeyi unutmayın.

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrunController : BaseWebApiController
    {
        public UrunController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        [HttpPost("CreateOrUpdate")]
        public ApiResult CreateOrUpdate([FromBody] UrunEkleVM dataVM)
        {
            if (!ModelState.IsValid)
                return new ApiResult { Result = false, Message = "Form'da doldurulmayan alanlar mevcut, lütfen doldurun." };
            Urun data;
            if (dataVM.Id > 0)
            {
                data = _unitOfWork.Repository<Urun>().GetById(dataVM.Id);
                data.UrunAdi = dataVM.UrunAdi;
                data.UrunAciklamasi = dataVM.UrunAciklamasi;
                data.UrunEbadi = dataVM.UrunEbadi;
                data.UrunFiyati = dataVM.UrunFiyati;
                data.UrunTedarikciFirma = dataVM.UrunTedarikciFirma;
                data.UrunKdvOrani = dataVM.UrunKdvOrani;
            }
            else
            {
                data = new Urun()
                {
                    UrunAdi = dataVM.UrunAdi,
                    UrunAciklamasi = dataVM.UrunAciklamasi,
                    UrunEbadi = dataVM.UrunEbadi,
                    UrunFiyati = dataVM.UrunFiyati,
                    UrunTedarikciFirma = dataVM.UrunTedarikciFirma,
                    UrunKdvOrani = dataVM.UrunKdvOrani
                };
                if (_unitOfWork.Repository<Urun>().Any(x => x == data))
                {
                    return new ApiResult { Result = false, Message = "Daha önce eklenmiş" };
                }
            }

            _unitOfWork.Repository<Urun>().InsertOrUpdate(data);
            _unitOfWork.SaveChanges();
            return new ApiResult { Result = true };
        }

        [HttpGet("Delete")]
        public ApiResult Delete(int id)
        {
            var data = _unitOfWork.Repository<Urun>().GetById(id);
            if (data == null)
            {
                return new ApiResult { Result = false, Message = "Belirtilen ürün bulunamadı." };
            }

            _unitOfWork.Repository<Urun>().SoftDelete(data.Id);
            _unitOfWork.SaveChanges();
            return new ApiResult { Result = true };
        }

        [HttpPost("GetGrid")]
        public ApiResult<GridResultModel<UrunGridVM>> GetGrid()
        {
            var query = _unitOfWork.Repository<Urun>()
                .Select(x => new UrunGridVM
                {
                    Id = x.Id,
                    UrunAdi = x.UrunAdi,
                    UrunAciklamasi = x.UrunAciklamasi,
                    UrunEbadi = x.UrunEbadi,
                    UrunFiyati = x.UrunFiyati,
                    UrunTedarikciFirma = x.UrunTedarikciFirma,
                    UrunKdvOrani = x.UrunKdvOrani

                    
                });

            var rest = query.ToDataListRequest(Request.ToRequestFilter());

            return new ApiResult<GridResultModel<UrunGridVM>> { Data = rest, Result = true };
        }

        [HttpPost("Get")]
        public ApiResult<UrunGridVM> Get(int id)
        {
            var urun = _unitOfWork.Repository<Urun>().GetById(id);
            UrunGridVM urunVM = new UrunGridVM
            {
                Id = urun.Id,
                UrunAdi = urun.UrunAdi,
                UrunAciklamasi = urun.UrunAciklamasi,
                UrunEbadi =  urun.UrunEbadi,
                UrunFiyati =  urun.UrunFiyati,
                UrunTedarikciFirma =  urun.UrunTedarikciFirma,
                UrunKdvOrani =  urun.UrunKdvOrani

            };

            return new ApiResult<UrunGridVM> { Data = urunVM, Result = true };
        }
    }
}
