/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

Ext.define( 'chords.controller.filterCard', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            filter: 'searchfield',
            filterCardTab: '#filterCardTab',
            tabPanel: '#chordsTabPanel'
        },
        routes: {
            'Filter/:query': 'handleFilterQuery'
        },
        control: {
            filterCardTab: {
                activate: 'updateFilterQuery',
                deactivate: 'clearFilter'
            },
            filter: {
                keyup: 'updateFilterQuery',
                clearicontap: 'clearFilter'
            }
        }
    },

    clearFilter: function () {
        Ext.getStore( 'songs' ).clearFilter();
    },


    handleFilterQuery: function ( query ) {
        var search = this.getFilter().getComponent( 'Search' );
        var queryFieldValue = search.getValue().toLowerCase();
        if( queryFieldValue !== query ) {
            search.setValue( query );
        }
        this.filterList( query );
    },

    filterList: function ( query ) {
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

    },

    /**
     * This is called when user types something in the search field
     */
    updateFilterQuery: function () {
        var query = this.getFilter().getComponent( 'Search' ).getValue().toLowerCase();
        if( query.length ) {
            this.redirectTo( 'Filter/' + query );
        } else {
            this.clearFilter();
            this.redirectTo( 'Songs' );
        }
    }


} );