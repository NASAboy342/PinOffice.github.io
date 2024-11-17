namespace Pnut.Helpers.HtmlComponents
{
    public abstract class HtmlBase
    {
        public abstract string GetHtml();
        public virtual HtmlStyle Style { get; set; } = new HtmlStyle();
    }
}
