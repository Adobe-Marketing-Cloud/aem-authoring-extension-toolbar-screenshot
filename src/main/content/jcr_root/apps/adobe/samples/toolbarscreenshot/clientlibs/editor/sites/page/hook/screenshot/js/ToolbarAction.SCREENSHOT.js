/*
 * #%L
 * Adobe AEM6.2 Demo for authoring extension point: Screenshot Toolbar Action
 * %%
 * Copyright (C) 2016 Adobe
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
(function ($, ns, channel, window, undefined) {
    "use strict";

    /**
     *
     * Dependencies
     *
     */

    var EditorFrame = ns.EditorFrame;


    /**
     *
     * Constants
     *
     */

    var ACTION_ICON = "coral-Icon--camera";
    var ACTION_TITLE = "Screenshot";
    var ACTION_NAME = "SCREENSHOT";


    /**
     *
     * Internals
     *
     */

    /**
     * Defines the "Screenshot" Toolbar Action
     *
     * @type Granite.author.ui.ToolbarAction
     * @alias SCREENSHOT
     */

    var screenshotAction = new ns.ui.ToolbarAction({
        name: ACTION_NAME,
        icon: ACTION_ICON,
        text: ACTION_TITLE,
        execute: function (editable) {
            html2canvas(editable.dom, {
                onrendered: function(canvas) {
                    var img = canvas.toDataURL();
                    window.open(img);
                }
            });
        },
        condition: function (editable) {
            return !!(editable && editable.dom);
        },
        isNonMulti: true
    });


    /**
     *
     * Hooks
     *
     */

    // When the Edit Layer gets activated
    channel.on("cq-layer-activated", function (event) {
        if (event.layer === "Edit") {
            // Register an additional action
            EditorFrame.editableToolbar.registerAction(ACTION_NAME, screenshotAction);
        }
    });

}(jQuery, Granite.author, jQuery(document), this));

