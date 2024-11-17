namespace Pnut.Helpers.HtmlComponents
{
    public class HtmlP : HtmlBase
    {
        public HtmlP() { }
        public HtmlP(string text)
        {
            Text = text;
        }
        public string Text { get; set; } = "";
        public override string GetHtml()
        {
            var p = $"<p style=\"{Style.GetAllStyle()}\">{Text}</p>";
            return p;
        }
    }
}
