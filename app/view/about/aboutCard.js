/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.view.about.aboutCard', {
    extend: 'Ext.Container',
    xtype: 'aboutcard',
    config: {

        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'About Tango Chords'
            }
        ],
        scrollable: 'vertical',

        tab: {
            title: 'About',
            iconCls: 'info'
        }

    },
    initialize: function () {
        Ext.Ajax.request( {
            url: "app/data/about.html",
            success: function ( responce ) {
                this.setHtml( responce.responseText );
            },
            scope: this
        } );
    }


} );
