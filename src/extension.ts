import * as vscode from "vscode";

function isSVG(text: string): boolean {
  return /<svg.*<\/svg>/i.test(text);
}

function showSVGPanel(selectedText: string) {
  if (isSVG(selectedText)) {
    const panel = vscode.window.createWebviewPanel(
      "svgViewer",
      "SVG Viewer",
      vscode.ViewColumn.Beside,
      {}
    );
    panel.webview.html = selectedText;
  } else {
    vscode.window.showInformationMessage(
      "Selected text is not an SVG element."
    );
  }
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, your extension "svg-onselect" is now active!`);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "svg-onselect.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const panel = vscode.window.createWebviewPanel(
        "svgViewer",
        "SVG Viewer",
        vscode.ViewColumn.One,
        {}
      );
      panel.webview.html = getWebviewContent();
      // const editor = vscode.window.activeTextEditor;
      // const selectedText = editor?.document.getText(editor.selection);
      // showSVGPanel(selectedText ?? ``);
      vscode.window.showInformationMessage(
        `Hello World from svg-onselect, yay!`
      );
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
