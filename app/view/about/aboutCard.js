/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.view.about.aboutCard', {
    extend:     'Ext.Container',
    xtype:      'aboutcard',
    config:     {

        items:      [
            {
                docked: 'top',
                xtype:  'toolbar',
                title:  'About Tango Chords'
            }
        ],
        scrollable: 'vertical',

        tab: {
            title:   'About',
            iconCls: 'team1'
        }
    },
    initialize: function () {
        Ext.Ajax.request( {
            url:     "about.html",
            success: function ( responce ) {
                this.setHtml( responce.responseText );
            },
            scope:   this
        } );
    }


} );
