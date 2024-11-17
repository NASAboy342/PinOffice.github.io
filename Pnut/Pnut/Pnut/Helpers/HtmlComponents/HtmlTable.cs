using System.Text;

namespace Pnut.Helpers.HtmlComponents
{
    public class HtmlTable : HtmlBase
    {
        public HtmlTable() { }
        public HtmlTable(List<Tr> trs)
        {
            Trs = trs;
        }
        public List<Tr> Trs { get; set; } = new List<Tr>();
        public HtmlStyle ThStyle { get; set; } = new HtmlStyle() { Border = "1px solid black" };
        public HtmlStyle TdStyle { get; set; } = new HtmlStyle() { Border = "1px solid black" };
        public bool IsSetWholeThStyle { get; set; } = true;
        public bool IsSetWholeTdStyle { get; set; } = true;
        public string Class { get; set; }

        public void ToTable<T>(T req) where T : IEnumerable<object>
        {
            GetTableHeader(req);
            GetTableBody(req);
        }

        public override string GetHtml()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append($"<table style=\"{Style.GetAllStyle()}\">");
            stringBuilder.Append($"<tr style=\"{ThStyle.GetAllStyle()}\">");
            foreach (var th in Trs[0].Ths)
            {
                var thStyle = !IsSetWholeThStyle ? th.Style.GetAllStyle() : ThStyle.GetAllStyle();
                stringBuilder.Append($"<th style=\"{thStyle}\">{th.Value}</th>");
            }
            stringBuilder.Append("</tr>");
            foreach (var tr in Trs)
            {
                if (Trs.IndexOf(tr) < 1)
                    continue;
                stringBuilder.Append("<tr>");
                foreach (var td in tr.Tds)
                {
                    var tdStyle = !IsSetWholeTdStyle ? td.Style.GetAllStyle() : TdStyle.GetAllStyle();
                    stringBuilder.Append($"<td style=\"{tdStyle}\">" + td.Value + "</td>");
                }
                stringBuilder.Append("</tr>");
            }
            stringBuilder.Append("</table>");
            return stringBuilder.ToString().Replace("\\","");
        }

        private void GetTableBody<T>(T req) where T : IEnumerable<object>
        {
            foreach (var item in req)
            {
                var properties = item.GetType().GetProperties();
                Trs.Add(new Tr());
                Trs[Trs.Count - 1].Tds = new List<Td>();
                foreach (var property in properties)
                {
                    Trs[Trs.Count - 1].Tds.Add(new Td
                    {
                        Value = property.GetValue(item)?.ToString() ?? "",
                        Class = ""
                    });
                }
            }
        }

        public void GetTableHeader<T>(T req) where T : IEnumerable<object>
        {
            var firstObject = req.FirstOrDefault();
            var properties = firstObject.GetType().GetProperties();
            Trs.Add(new Tr());
            Trs[0].Ths = new List<Th>();
            foreach (var property in properties)
            {
                Trs[0].Ths.Add(new Th
                {
                    Value = property.Name,
                    Class = ""
                });
            }
        }
    }

    public class Tr
    {
        public List<Th> Ths { get; set; } 
        public List<Td> Tds { get; set; }
    }

    public class Th
    {
        public Th() { }
        public Th(string value)
        {
            Value = value;
        }
        public string Value { get; set; }
        public string Class { get; set; }
        public HtmlStyle Style { get; set; } = new HtmlStyle() { Border = "1px solid black" };
    }

    public class Td
    {
        public Td() { }
        public Td(string value)
        {
            Value = value;
        }
        public string Value { get; set; }
        public string Class { get; set; }
        public HtmlStyle Style { get; set; } = new HtmlStyle() { Border = "1px solid black" };
    }
}