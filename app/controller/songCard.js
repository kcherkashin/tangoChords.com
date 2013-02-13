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

            songList: 'list',
            songCard: 'songcard',
            songSingle: 'songsingle',
            songCardTab: '#songCardTab'
        },
        control: {
            songCardTab: {
                tap: 'openSongCard'
            },

            songList: {
                itemtap: 'displaySong'
            },
            songCard: {
                pop: 'hideTransposeButtons',
                push: 'showNavBarForPhones'
            }
        }
    },
    /**
     * We want to hide navigation bar
     */
    launch: function () {
        if( Ext.os.deviceType === "Phone" ) {
            this.getSongCard().getNavigationBar().hide();
        }
    },
    showNavBarForPhones: function () {
        this.getSongCard().getNavigationBar().show();
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
        this.getSongCard().getNavigationBar().hide();
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
        //  list.getStore().clearFilter( true );
        this.displayTransposeButtons();
        list.getParent().push( song );
    }


} );