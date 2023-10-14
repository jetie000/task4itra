import React from "react";
import { useState } from "react";

function Modal({ id }: { id: string }) {

    return (
        <div className="modal  fade" id={id} tabIndex={-1} role="dialog" aria-hidden="true" aria-labelledby={id + "Label"}>
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={id + "Label"}></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;