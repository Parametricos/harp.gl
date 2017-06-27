/*
 * Copyright (C) 2017 HERE Global B.V. and its affiliate(s).
 * All rights reserved.
 *
 * This software and other materials contain proprietary information
 * controlled by HERE and are protected by applicable copyright legislation.
 * Any use and utilization of this software and other materials and
 * disclosure to any third parties is conditional upon having a separate
 * agreement with HERE for the access, use, utilization or disclosure of this
 * software. In the absence of such agreement, the use of the software is not
 * allowed.
 */

/** @module @here/mapview-decoder **//** */

declare let self: Worker;

export interface WorkerResponse {
    response: any;
    buffers?: any[];
}

export abstract class WorkerClient {
    constructor(public readonly id: string) {
         self.addEventListener("message", message => {
            if (typeof message.data.type !== "string" || message.data.type !== id)
                return;
            const workerResponse = this.handleEvent(message);
            self.postMessage(workerResponse.response, workerResponse.buffers);
        });
    }

    abstract handleEvent(message: MessageEvent): WorkerResponse;
}