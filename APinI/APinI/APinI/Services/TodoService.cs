using APinI.Models;
using APinI.Repository;

namespace APinI.Services
{
    public class TodoService
    {
        private readonly PinDataRepository _pinDataRepository = new PinDataRepository();

        public List<GetAllTaskResponse> GetAllTask()
        {
            return _pinDataRepository.GetAllTask();
        }
    }
}
