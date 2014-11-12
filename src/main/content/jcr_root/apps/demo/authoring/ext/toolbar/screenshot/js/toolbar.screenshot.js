/*
 * #%L
 * ACS AEM Commons Bundle
 * %%
 * Copyright (C) 2014 Adobe
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
