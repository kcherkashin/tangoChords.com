/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.controller.songCard', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            filter: 'searchfield',
            songList: 'list',
            songCard: 'songcard',
            songSingle: 'songsingle',
            songCardTab: '#songCardTab'
        },
        control: {
            songCardTab: {
                tap: 'openSongCard'
            },
            filter: {
                keyup: 'filterList',
                clearicontap: 'clearFilter'
            },
            songList: {
                itemtap: 'displaySong'
            },
            songCard: {
                pop: 'hideTransposeButtons'
            }
        }
    },
    /**
     *
     */
    launch: function () {
        if( Ext.os.deviceType === "Phone"){
            this.getSongCard().getNavigationBar().hide();
        }
    },
    openSongCard: function () {
        this.getSongCard().pop();
    },

    activeSongCard: function () {
        return this.getSongCard().query( "songsingle" )[0];
    },

    transposeUp: function () {
        this.activeSongCard().transpose( 1 );
    },
    transposeDown: function () {
        this.activeSongCard().transpose( -1 );
    },

    hideTransposeButtons: function () {
        this.TransposeButtons.up.hide();
        this.TransposeButtons.down.hide();
    },

    /**
     * Create (or show if already created) transpose buttons.
     */
    displayTransposeButtons: function () {
        var navBar;

        if( !this.TransposeButtons ) {
            this.TransposeButtons = {
                up: Ext.create( 'Ext.Button', {text: 'Transpose up', align: 'right'} ),
                down: Ext.create( 'Ext.Button', {text: 'Transpose down', align: 'right'} )
            };

            navBar = this.getSongCard().getNavigationBar();
            navBar.add( this.TransposeButtons.up );
            navBar.add( this.TransposeButtons.down );

            this.TransposeButtons.up.on( "tap", this.transposeUp, this );
            this.TransposeButtons.down.on( "tap", this.transposeDown, this );

        } else {

            this.TransposeButtons.up.show();
            this.TransposeButtons.down.show();
        }
    },
    /**
     * This is called when user clicks on a list item
     *
     * @param list
     * @param index
     * @param el
     * @param record
     */
    displaySong: function ( list, index, el, record ) {
        var song = this.getApplication().getController( 'songSingle' ).createSong( record );
        song.config.title = record.data.title;
        list.getStore().clearFilter( true );
        this.displayTransposeButtons();
        this.getSongCard().push( song );
    },


    clearFilter: function () {
        Ext.getStore( 'songs' ).clearFilter();
    },

    /**
     * This is called when user types something in the search field
     * @param field
     */
    filterList: function ( field ) {

        var query = field.getValue().toLowerCase();
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