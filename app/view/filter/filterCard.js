/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */
// Can't use strict because of the invocation of the callParent method.
//"use strict";

Ext.define( 'chords.view.filter.filterCard', {
    extend: 'chords.view.song.songCard',
    xtype: 'filtercard',
    id: 'filterCard',

    applyItems: function ( newItems, oldItems ) {
        /**
         *
         */
        newItems[0].items = {
            docked: 'top',
            xtype: 'searchfield',
            label: 'Filter',
            name: 'query'
        };

        return this.callParent( [newItems, oldItems] );
    },
    config: {
        tab: {
            title: 'Filter',
            iconCls: 'search',
            id: 'filterCardTab'
        }
    }





} );
