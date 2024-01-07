import * as vscode from "vscode";

function isSVG(text: string) {
  const SVGRegExp = /<svg[^>]*>[\s\S]*<\/svg>/i;
  return SVGRegExp.test(text);
}

function showSVGPanel(selectedText: string) {
  if (isSVG(selectedText)) {
    const panel = vscode.window.createWebviewPanel(
      `svgViewer`,
      `SVG Viewer`,
      vscode.ViewColumn.One,
      {}
    );
    panel.webview.html = getWebviewContent(selectedText);
  } else {
    vscode.window.showInformationMessage(
      `Selected text is not an SVG element.`
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
      const editor = vscode.window.activeTextEditor;
      const selectedText = editor?.document.getText(editor.selection);
      showSVGPanel(selectedText ?? ``);
      vscode.window.showInformationMessage(`Hello World from svg-onselect.`);
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(svg: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View SVG on select</title>
</head>
<body style="display:grid;place-items:center;height:100vh">
    ${svg}
</body>
</html>`;
}

export function deactivate() {}
