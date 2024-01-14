using APinI.Models;
using APinI.Services;
using Microsoft.AspNetCore.Mvc;

namespace APinI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Todo : Controller
    {
        private readonly TodoService _todoService = new TodoService();

        [HttpPost]
        [Route("get-all-task")]
        public List<GetAllTaskResponse> GetAllTask()
        {
            return _todoService.GetAllTask();
        }
        [HttpGet]
        [Route("get-get-all-task")]
        public List<GetAllTaskResponse> GetGetAllTask()
        {
            return _todoService.GetAllTask();
        }
    }
}
