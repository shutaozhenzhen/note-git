// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {getGitApi} from './gitExtension'; 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "note-git" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const gitApi=getGitApi();
	if(gitApi===null){
		vscode.window.showErrorMessage("Your vscode.git extension are disabled. You can go to setting and search `git:enabled` to enable it.");
		return;
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
