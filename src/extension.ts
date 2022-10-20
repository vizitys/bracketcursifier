// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
var esrever = require("esrever");

vscode.languages.registerDocumentFormattingEditProvider("typescript", {
  provideDocumentFormattingEdits(
    document: vscode.TextDocument
  ): vscode.TextEdit[] {
    let maxLineLength = 0;
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      if (line.text.length > maxLineLength) {
        maxLineLength = line.text.length;
      }
    }

    const edits: vscode.TextEdit[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const triggerChars = ["{", "}", ";"];

      let matchedChars = 0;
      let reversed: string = esrever.reverse(line.text);

      for (let j = 0; j < reversed.length; j++) {
        console.log(matchedChars);
        if (triggerChars.includes(reversed[j])) {
          matchedChars++;
          if (!triggerChars.includes(reversed[j + 1])) {
            edits.push(
              vscode.TextEdit.insert(
                new vscode.Position(i, line.text.length - j - 1),
                " ".repeat(maxLineLength - line.text.length + 3)
              )
            );
            break;
          }
        }
      }
    }
    return edits;
  },
});
