import * as vscode from "vscode";

function isSVG(text: string) {
  const SVGRegExp = /<svg[^>]*>[\s\S]*<\/svg>/i;
  return SVGRegExp.test(text);
}

function showSVGPanel(panel: vscode.WebviewPanel, selectedText: string) {
  if (isSVG(selectedText)) {
    panel.webview.html = getWebviewContent(selectedText);
  } else {
    vscode.window.showInformationMessage(
      `Selected text is not an SVG element.`
    );
  }
}

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | null;

  let disposable = vscode.commands.registerCommand(
    "svg-onselect.displaySVG",
    () => {
      const window = vscode.window;
      const editor = window.activeTextEditor;
      const targetColumn = editor?.viewColumn;
      currentPanel ??= window.createWebviewPanel(
        `svgViewer`,
        `SVG Viewer`,
        targetColumn || vscode.ViewColumn.One,
        {}
      );
      currentPanel?.reveal(targetColumn);
      const selectedText = editor?.document.getText(editor.selection);
      showSVGPanel(currentPanel, selectedText ?? ``);
      currentPanel.onDidDispose(
        () => {
          currentPanel = null;
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
