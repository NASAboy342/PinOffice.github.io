using System.Text;

namespace Pnut.Helpers.HtmlComponents
{
    public class HtmlStyle
    {
        // Text Styling
        public string Color { get; set; } = "";
        public string GetColor => Color.Equals("") ? "" : $"color: {Color};";

        public string FontSize { get; set; } = "";
        public string GetFontSize => FontSize.Equals("") ? "" : $"font-size: {FontSize};";

        public string FontFamily { get; set; } = "";
        public string GetFontFamily => FontFamily.Equals("") ? "" : $"font-family: {FontFamily};";

        public string FontWeight { get; set; } = "";
        public string GetFontWeight => FontWeight.Equals("") ? "" : $"font-weight: {FontWeight};";

        public string FontStyle { get; set; } = "";
        public string GetFontStyle => FontStyle.Equals("") ? "" : $"font-style: {FontStyle};";

        public string TextAlign { get; set; } = "";
        public string GetTextAlign => TextAlign.Equals("") ? "" : $"text-align: {TextAlign};";

        public string TextDecoration { get; set; } = "";
        public string GetTextDecoration => TextDecoration.Equals("") ? "" : $"text-decoration: {TextDecoration};";

        public string LineHeight { get; set; } = "";
        public string GetLineHeight => LineHeight.Equals("") ? "" : $"line-height: {LineHeight};";

        public string TextTransform { get; set; } = "";
        public string GetTextTransform => TextTransform.Equals("") ? "" : $"text-transform: {TextTransform};";

        public string LetterSpacing { get; set; } = "";
        public string GetLetterSpacing => LetterSpacing.Equals("") ? "" : $"letter-spacing: {LetterSpacing};";

        public string WordSpacing { get; set; } = "";
        public string GetWordSpacing => WordSpacing.Equals("") ? "" : $"word-spacing: {WordSpacing};";

        // Background and Color
        public string BackgroundColor { get; set; } = "";
        public string GetBackgroundColor => BackgroundColor.Equals("") ? "" : $"background-color: {BackgroundColor};";

        public string BackgroundImage { get; set; } = "";
        public string GetBackgroundImage => BackgroundImage.Equals("") ? "" : $"background-image: url({BackgroundImage});";

        public string BackgroundSize { get; set; } = "";
        public string GetBackgroundSize => BackgroundSize.Equals("") ? "" : $"background-size: {BackgroundSize};";

        public string BackgroundRepeat { get; set; } = "";
        public string GetBackgroundRepeat => BackgroundRepeat.Equals("") ? "" : $"background-repeat: {BackgroundRepeat};";

        public string BackgroundPosition { get; set; } = "";
        public string GetBackgroundPosition => BackgroundPosition.Equals("") ? "" : $"background-position: {BackgroundPosition};";

        // Layout and Positioning
        public string Display { get; set; } = "";
        public string GetDisplay => Display.Equals("") ? "" : $"display: {Display};";

        public string Position { get; set; } = "";
        public string GetPosition => Position.Equals("") ? "" : $"position: {Position};";

        public string Top { get; set; } = "";
        public string GetTop => Top.Equals("") ? "" : $"top: {Top};";

        public string Right { get; set; } = "";
        public string GetRight => Right.Equals("") ? "" : $"right: {Right};";

        public string Bottom { get; set; } = "";
        public string GetBottom => Bottom.Equals("") ? "" : $"bottom: {Bottom};";

        public string Left { get; set; } = "";
        public string GetLeft => Left.Equals("") ? "" : $"left: {Left};";

        public string Margin { get; set; } = "";
        public string GetMargin => Margin.Equals("") ? "" : $"margin: {Margin};";

        public string Padding { get; set; } = "";
        public string GetPadding => Padding.Equals("") ? "" : $"padding: {Padding};";

        public string Float { get; set; } = "";
        public string GetFloat => Float.Equals("") ? "" : $"float: {Float};";

        public string Clear { get; set; } = "";
        public string GetClear => Clear.Equals("") ? "" : $"clear: {Clear};";

        // Box Model
        public string Width { get; set; } = "";
        public string GetWidth => Width.Equals("") ? "" : $"width: {Width};";

        public string Height { get; set; } = "";
        public string GetHeight => Height.Equals("") ? "" : $"height: {Height};";

        public string MaxWidth { get; set; } = "";
        public string GetMaxWidth => MaxWidth.Equals("") ? "" : $"max-width: {MaxWidth};";

        public string MinWidth { get; set; } = "";
        public string GetMinWidth => MinWidth.Equals("") ? "" : $"min-width: {MinWidth};";

        public string Border { get; set; } = "";
        public string GetBorder => Border.Equals("") ? "" : $"border: {Border};";

        public string BorderRadius { get; set; } = "";
        public string GetBorderRadius => BorderRadius.Equals("") ? "" : $"border-radius: {BorderRadius};";

        public string BoxShadow { get; set; } = "";
        public string GetBoxShadow => BoxShadow.Equals("") ? "" : $"box-shadow: {BoxShadow};";

        public string BorderCollapse { get; set; } = "";
        public string GetBorderCollapse => BorderCollapse.Equals("") ? "" : $"border-collapse: {BorderCollapse};";

        // Flexbox Properties
        public string FlexDirection { get; set; } = "";
        public string GetFlexDirection => FlexDirection.Equals("") ? "" : $"flex-direction: {FlexDirection};";

        public string AlignItems { get; set; } = "";
        public string GetAlignItems => AlignItems.Equals("") ? "" : $"align-items: {AlignItems};";

        public string JustifyContent { get; set; } = "";
        public string GetJustifyContent => JustifyContent.Equals("") ? "" : $"justify-content: {JustifyContent};";

        // Transformations and Effects
        public string Transform { get; set; } = "";
        public string GetTransform => Transform.Equals("") ? "" : $"transform: {Transform};";

        public string Opacity { get; set; } = "";
        public string GetOpacity => Opacity.Equals("") ? "" : $"opacity: {Opacity};";

        public string Transition { get; set; } = "";
        public string GetTransition => Transition.Equals("") ? "" : $"transition: {Transition};";

        // Cursor and Visibility
        public string Cursor { get; set; } = "";
        public string GetCursor => Cursor.Equals("") ? "" : $"cursor: {Cursor};";

        public string Visibility { get; set; } = "";
        public string GetVisibility => Visibility.Equals("") ? "" : $"visibility: {Visibility};";

        // Overflow and Clipping
        public string Overflow { get; set; } = "";
        public string GetOverflow => Overflow.Equals("") ? "" : $"overflow: {Overflow};";

        public string OverflowX { get; set; } = "";
        public string GetOverflowX => OverflowX.Equals("") ? "" : $"overflow-x: {OverflowX};";

        public string OverflowY { get; set; } = "";
        public string GetOverflowY => OverflowY.Equals("") ? "" : $"overflow-y: {OverflowY};";


        public string GetAllStyle()
        {
            var stingbuilder = new StringBuilder();
            var properties = this.GetType().GetProperties();
            foreach (var property in properties)
            {
                if (!property.Name.StartsWith("Get"))
                    continue;
                var value = property.GetValue(this)?.ToString()?.Trim() ?? "";
                stingbuilder.Append(value + (value.Equals("") ? "" : " "));
            }
            return stingbuilder.ToString();
        }
    }
}
