namespace Pnut.Helpers.HtmlComponents
{
    public class HtmlPage : HtmlBase
    {
        public HtmlPage() { }
        public HtmlPage(HtmlHeader header, HtmlBody body)
        {
            Header = header;
            Body = body;
        }

        public HtmlHeader Header { get; set; } = new HtmlHeader();
        public HtmlBody Body { get; set; } = new HtmlBody();

        public override string GetHtml()
        {
            var html = $"<!DOCTYPE html><html lang=\"en\"> {Header.GetHtml()} {Body.GetHtml()} </html>";
            return html;
        }
    }

    public class HtmlHeader : HtmlBase
    {
        public HtmlHeader() { }
        public HtmlHeader(string content)
        {
        }
        public string Content { get; set; } = "";
        public override string GetHtml()
        {
            var header = $"<head>{Content}</head>";
            return header;
        }
    }

    public class HtmlBody : HtmlBase
    {
        public HtmlBody() { }
        public HtmlBody(string content)
        {
            Content = content;
        }
        public string Content { get; set; } = "";
        public override string GetHtml()
        {
            var body = $"<body style=\"{Style.GetAllStyle()}\">{Content}</body>";
            return body;
        }
    }
}
