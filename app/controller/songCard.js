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
            tabPanel: '#chordsTabPanel',
            songLists: 'list',
            songCard: 'songcard',
            songSingle: {
                selector: 'songsingle',
                xtype: 'songsingle',
                autoCreate: true
            },
            songCardTab: '#songCardTab',


        },

        routes: {
            'Songs/:id/:songName': 'displaySong'
        },

        control: {
            songCardTab: {
                tap: 'openSongCard'
            },
            songLists: {
                itemtap: 'navigateToSong'
            },
            songCard: {
                activate: 'hideNavBar',
                pop: 'updateSongsQuery',
                push: 'showNavBar'
            }
        }
    },


    /**
     * We want to hide navigation bar
     */
    hideNavBar: function ( songCard ) {
        if( Ext.os.deviceType === "Phone" ) {
            songCard.getNavigationBar().hide();
        }
    },
    showNavBar: function () {
        this.getSongCard().getNavigationBar().show();
    },

    openSongCard: function () {

        var songCard = this.getSongCard();
        if( songCard ) {
            songCard.pop();
            this.getSongCard().getNavigationBar().hide();
        }

    },

    activeSongCard: function () {
        console.log( this.getSongCard().query( "songsingle" ) );
        return this.getSongCard().query( "songsingle" )[0];
    },

    transposeUp: function () {
        this.activeSongCard().transpose( 1 );
    },
    transposeDown: function () {
        this.activeSongCard().transpose( -1 );
    },
    updateSongsQuery: function () {
        this.redirectTo( "Songs" );
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
     */
    navigateToSong: function ( list, index, el, record ) {
        this.redirectTo( 'Songs/' + index + '/' + record.data.nameLatin );
    },

    displaySong: function ( index ) {
        var songSingle = this.getSongSingle();
        var tabPanel = this.getTabPanel();
        /**
         * We want to switch to the SongCard tab first .
         */
        tabPanel.setActiveItem( tabPanel.innerIndexOf( this.getSongCard() ) );
        this.displayTransposeButtons();
        this.getApplication().getController( 'songSingle' ).createSong( function ( song ) {
                tabPanel.getActiveItem().push( song );
            }, songSingle, index
        );


    }


} );