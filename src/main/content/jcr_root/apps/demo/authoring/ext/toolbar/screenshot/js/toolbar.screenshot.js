/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
(function ($, author, channel, window, undefined) {

    var actionDef = {
        icon: 'coral-Icon--camera',
        text: Granite.I18n.get('Screenshot'),
        handler: function (editable, param, target) { // will be called on click
            html2canvas(editable.dom, {
                onrendered: function(canvas) {
                    var img = canvas.toDataURL()
                    window.open(img);
                }
            });
        },
        isNonMulti: true
    };

    // we listen to the messaging channel
    // to figure out when a layer got activated
    channel.on('cq-layer-activated', function (ev) {
        // we continue if the user switched to the Edit layer
        if (ev.layer === 'Edit') {
            // we use the editable toolbar and register an additional action
            author.EditorFrame.editableToolbar.registerAction('SCREENSHOT', actionDef);
        }
    });

}(jQuery, Granite.author, jQuery(document), this));
