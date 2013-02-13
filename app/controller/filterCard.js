/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.controller.filterCard', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            filter: 'searchfield',
            filterCardTab: '#filterCardTab',
            search: 'searchfield Search'
        },

        control: {
            filterCardTab: {
                activate: 'filterList',
                deactivate: 'clearFilter'
            },
            filter: {
                keyup: 'filterList',
                clearicontap: 'clearFilter'
            }
        }
    },

    clearFilter: function () {
        Ext.getStore( 'songs' ).clearFilter();
    },

    /**
     * This is called when user types something in the search field
     */
    filterList: function () {


        var query = this.getFilter().getComponent( "Search" ).getValue().toLowerCase();
        var store = Ext.getStore( 'songs' );

        store.clearFilter( true );

        store.filter( function ( record ) {

            /**
             * We go through  the fields in the records, and if any of them matches, we keep the item
             * We need both nameLatin and name fields, to allow user not to enter accents.
             */
            for( var i in  {name: true, performer: true, nameLatin: true, performerLatin: true, genre: true } ) {
                if( record.data.hasOwnProperty( i ) ) {
                    if( record.data[i] && record.data[i].toLowerCase().search( query ) !== -1 ) {
                        return true;
                    }
                }
            }
            return false;
        } )


    }


} );