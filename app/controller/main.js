/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

Ext.define( 'chords.controller.main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            tabBar: '#chordsTabPanel tabbar'
        }
    },

    /**
     * Makes each tab redirect to #tab.title on tap
     */
    launch: function () {
        this.getTabBar().items.each( function ( item ) {
            item.on( 'tap', this.redirectTo.bind( this, item.getTitle() ) );
        }, this );
    }

} );