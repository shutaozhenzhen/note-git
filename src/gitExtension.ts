import {GitExtension} from '../lib/git'; 
import * as vscode from 'vscode';
//vscode.git is vscode build-in extensions
export function getGitApi(){
	const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')!.exports;
	//but it can be disabled
	if(gitExtension.enabled){
		const gitApi=gitExtension.getAPI(1);
		return gitApi;
	}else{
		return null;
	}
}
