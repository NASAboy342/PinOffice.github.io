namespace Pnut.Helpers.HtmlComponents
{
    public class HtmlDiv : HtmlBase
    {
        public HtmlDiv() { }
        public HtmlDiv(string content)
        {
            Content = content;
        }
        public string Content { get; set; } = "";
        public override string GetHtml()
        {
            var div = $"<div style=\"{Style.GetAllStyle()}\">{Content}</div>";
            return div;
        }
    }
}
