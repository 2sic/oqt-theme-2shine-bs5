const fs = require("fs");

if (!fs.existsSync("node_modules")) {
  const npm = require("npm");
  npm.load(function (err) {
    npm.on("log", function (message) {
      console.log(message);
    });

    npm.commands.ci([], function (er, data) {
      promptForRename();
    });
  });
} else {
  promptForRename();
}

function promptForRename() {
  const fs = require("fs");

  if (!fs.existsSync("ToSic.Oqt.Themes.ToShineBs5.Client.csproj")) {
    console.log(
      "it appears you already renamed your theme, this can only be done once!"
    );
  } else {
    const prompt = require("prompt");
    const properties = [
      {
        description: "theme name (namespace eg. ToSic.Oqt.Themes.MyFancyTheme)",
        name: "newThemeName",
        required: true,
        validator: /^(@?[a-z_A-Z]\w+(?:\.@?[a-z_A-Z]\w+)*)+$/,
        warning: "your theme name must be a valid c# namespace",
      },
    ];

    prompt.start();
    prompt.get(properties, function (err, result) {
      if (err) {
        return onErr(err);
      }

      renameTheme(result.newThemeName);
    });

    function onErr(err) {
      console.log(err);
      return 1;
    }
  }
}

function renameTheme(newThemeName) {
  const replace = require("replace-in-file");

  const defaultThemeName = "ToSic.Oqt.Themes.ToShineBs5";
  if (newThemeName === defaultThemeName) {
    console.log(
      "your theme name equals the default, please choose another name"
    );
  } else {
    const options = {
      files: [
        "**/*.razor",
        "**/*.cs",
        "**/*.csproj",
        "../*.sln",
        "theme.jsonc",
      ],
      ignore: [
        "obj/**",
        "bin/**",
        "node_modules/**",
        "scripts/**",
        "dist/**",
        ".temp_cache/**",
        ".vscode/**",
      ],
      from: RegExp(defaultThemeName, "g"),
      to: newThemeName,
    };
    try {
      const results = replace.sync(options);
      console.log("Replacement results:", results);
      const defaultCsharpProject = "ToSic.Oqt.Themes.ToShineBs5.Client.csproj";
      const defaultVsSolution = "../ToSic.Oqt.Themes.ToShineBs5.sln";
      if (fs.existsSync(defaultCsharpProject))
        fs.renameSync(defaultCsharpProject, `${newThemeName}.Client.csproj`);
      if (fs.existsSync(defaultVsSolution))
        fs.renameSync(defaultVsSolution, `../${newThemeName}.sln`);

      console.log("\x1b[32m%s\x1b[0m", "DONE");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
}
