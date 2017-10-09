/* --------------------------------------------------------------------------------------------
 * Copyright (c) Caibin Chen. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as path from 'path';

import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {

    // The server is implemented in node
    let jarPath = path.resolve(context.extensionPath, "jar", "JavaComp.jar");
    console.log('jar path: ' + jarPath);

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions: ServerOptions = {
        command: 'java',
        args: [
            '-jar',
            jarPath,
        ],
    };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'java' }],
        synchronize: {
            // Synchronize the setting section 'languageServerExample' to the server
            configurationSection: 'javacomp',
            // Notify the server about file changes to '*.java files contain in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/*.java'),
        },
    }

    // Create the language client and start the client.
    let disposable =
        new LanguageClient('JavaComp', 'JavaComp: Language Server for Java',
                           serverOptions, clientOptions)
            .start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
