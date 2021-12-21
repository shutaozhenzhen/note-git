import * as vscode from 'vscode';
export function getCurFolders(){
	return vscode.workspace.workspaceFolders||[];
} 