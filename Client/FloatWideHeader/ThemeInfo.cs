using Oqtane.Models;
using Oqtane.Themes;

namespace ToSic.Oqt.Themes.ToShineBs5.Client.FloatWideHeader
{
    public class ThemeInfo : ITheme
    {
        public Theme Theme => new()
        {
            Name = "2shine Oqtane theme with Bootstrap 5",
            Version = "1.0.0",
            ContainerSettingsType = "Oqtane.Theme.tosic.ContainerSettings, Oqtane.Theme.tosic.Oqtane",
            PackageName = "ToSic.Oqt.Themes.ToShineBs5",
        };
    }
}