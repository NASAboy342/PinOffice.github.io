using Microsoft.AspNetCore.Mvc;
using Pnut.Helpers.HtmlComponents;
using Pnut.Models;
using Pnut.Models.Requests;
using Pnut.Services.Interfacess;

namespace Pnut.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FakerController : ControllerBase
    {
        private readonly IFakerService _fakerService;
        public FakerController(IFakerService fakerService)
        {
            _fakerService = fakerService;
        }
        [HttpPost("place-bet")]
        public BaseResponse PlaceBet(PlaceBetRequest req)
        {
            return _fakerService.PlaceBet(req);
        }

        [HttpGet("test")]
        public ContentResult TestPage()
        {
            var page = new HtmlPage();
            page.Body.Style.Margin = "0px";
            page.Body.Style.BackgroundColor = "black";

            var varBar = new HtmlDiv();
            varBar.Style.Height = "70px";
            varBar.Style.BorderRadius = "5px";
            varBar.Style.BackgroundColor = "Gray";
            varBar.Style.Top = "5px";
            varBar.Style.Left = "5px";
            varBar.Style.Right = "5px";
            varBar.Style.Display = "flex";
            varBar.Style.JustifyContent = "between";
            varBar.Style.Position = "relative";

            var contentWrapper = new HtmlDiv();
            contentWrapper.Style.Position = "relative";
            contentWrapper.Style.Top = "10px";
            contentWrapper.Style.Right = "5px";
            contentWrapper.Style.Left = "5px";
            contentWrapper.Style.BackgroundColor = "Gray";
            contentWrapper.Style.Display = "flex";
            contentWrapper.Style.JustifyContent = "between";
            contentWrapper.Style.Height = "500px";
            contentWrapper.Style.BorderRadius = "5px";

            page.Body.Content = $"{varBar.GetHtml()}{contentWrapper.GetHtml()}";
            return Content(page.GetHtml(), "text/html");
        }
    }
}
