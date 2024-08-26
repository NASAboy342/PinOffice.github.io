using Microsoft.AspNetCore.Mvc;
using Pnut.Enums;
using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Models.Response;
using Pnut.Services.Interfacess;

namespace Pnut.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;
        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpPost("get-all-membered-group")]
        public GetAllMemberedGroupResponse GetAllMemberedGroup(GetAllMemberedGroupRequest req)
        {
            try
            {
                return _groupService.GetAllMemberedGroup(req);
            }
            catch (Exception ex)
            {
                return new GetAllMemberedGroupResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [HttpPost("create-group")]
        public BaseResponse CreateGroup(CreateGroupRequest req)
        {
            try
            {
                return _groupService.CreateGroup(req);
            }
            catch(Exception ex)
            {
                return new BaseResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            };
        }

        [HttpPost("add-group-member")]
        public BaseResponse AddGroupMember(AddGroupMemberRequest req)
        {
            try
            {
                return _groupService.AddGroupMember(req);
            }
            catch(Exception ex)
            {
                return new BaseResponse
                {
                    ErrorCode = ErrorCode.GeneralError,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}
