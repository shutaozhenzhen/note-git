// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {getGitApi} from './gitExtension'; 
import {log} from './log'; 
import * as folder from "./folder"
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	log('Congratulations, your extension "note-git" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const gitApi=getGitApi();
	if(gitApi===null){
		vscode.window.showErrorMessage("Your vscode.git extension are disabled. You can go to setting and search `git:enabled` to enable it.");
		return;
	}
	vscode.workspace.onDidChangeTextDocument(async event => {
		/**
		 * do have changes
		 */
		if(event.contentChanges.length===0){
			return;
		}
		/**
		 * not editing a untitled file
		 */
		const curDocument=event.document;
		if(curDocument.isUntitled){
			return;
		}
		/**
		 * file is dirty
		 */
		if(!curDocument.isDirty){
			return;
		}
		/**
		 * only one folder in workplace
		 */
		const folders=folder.getCurFolders();
		if(folders.length!==1){
			return;
		}
		const [curfolder]=folders;
		/**
		 * this folder is in git repositorie
		 */
		const repositories=gitApi.repositories;
		if(repositories.length!==1){
			return;
		}
		/**
		 * cur file is in git repositorie
		 */
		const [curRepo]=repositories;
		if(!curDocument.uri.path.includes(curRepo.rootUri.path)){
			return;
		}
		/**
		 * save file
		 */
		const saved=await curDocument.save();
		/**
		 * todo
		 * curRepo.status().then((...args)=>log(args));
		 * curRepo.add([curDocument.uri.path]);
		 */
		//
		if(saved){
			await curRepo.commit(event.contentChanges.map((item)=>JSON.stringify(item["text"])).join('\n'),{
				all:true,
				empty:true
			});
		}
		
	}, null, context.subscriptions);
}

// this method is called when your extension is deactivated
export function deactivate() {}
