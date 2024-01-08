import * as vscode from "vscode";

function isSVG(text: string) {
  const SVGRegExp = /<svg[^>]*>[\s\S]*<\/svg>/i;
  return SVGRegExp.test(text);
}

function showSVGPanel(selectedText: string) {
  const panel = vscode.window.createWebviewPanel(
    `svgViewer`,
    `SVG Viewer`,
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = getWebviewContent(selectedText);
  return panel;
}

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined;

  let disposable = vscode.commands.registerCommand(
    "svg-onselect.displaySVG",
    () => {
      const window = vscode.window;
      const editor = window.activeTextEditor;
      const targetColumn = editor?.viewColumn;
      const selectedText = editor?.document.getText(editor.selection);
      if (isSVG(selectedText ?? ``)) {
        currentPanel ??= showSVGPanel(selectedText ?? ``);
      } else {
        vscode.window.showInformationMessage(
          `Selected text is not an SVG element.`
        );
        return;
      }
      currentPanel?.reveal(targetColumn);
      currentPanel?.onDidDispose(
        () => {
          currentPanel = undefined;
        },
        null,
        context.subscriptions
      );
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
