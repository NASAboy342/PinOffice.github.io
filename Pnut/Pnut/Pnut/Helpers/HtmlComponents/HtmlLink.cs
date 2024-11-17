namespace Pnut.Helpers.HtmlComponents
{
    public class HtmlLink : HtmlBase
    {
        public HtmlLink() { }
        public HtmlLink(string href, string content)
        {
            Href = href;
            Content = content;
        }
        public string Href { get; set; } = "";
        public string Content { get; set; } = "";
        public override string GetHtml()
        {
            var html = $"<a href=\"{Href}\" style=\"{Style.GetAllStyle()}\">{Content}</a>";
            html = html.Replace("\\", "");
            return html;
        }
    }
}
