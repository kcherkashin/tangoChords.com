/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

Ext.define( 'chords.view.about.aboutCard', {
    extend: 'Ext.Container',
    xtype: 'aboutcard',
    config: {
        items: {
            xtype: 'toolbar',
            title: 'About Tango Chords'
        },
        scrollable: 'vertical',
        tab: {
            id: 'aboutCardTab',
            iconCls: 'about',
            title: 'About'
        }
    },
    initialize: function () {
        Ext.Ajax.request( {
            url: 'app/data/about.html',
            success: function ( response ) {
                this.setHtml( response.responseText );
            },
            scope: this
        } );
    }


} );
