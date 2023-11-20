using Newtonsoft.Json;

namespace WebApi.Models.Dto
{
    public class GenericErrorDto<T> where T : notnull
    {

        public string Message { get; set; }
        public T RequestDto { get; set; }

        public GenericErrorDto(T obj)
        {
            Message = $"Operation error on {obj.GetType().Name}";
            RequestDto = obj;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
