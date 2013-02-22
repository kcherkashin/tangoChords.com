/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

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
            filter: 'searchfield',
            transposeUp: '#transposeUp',
            transposeDown: '#transposeDown'
        },

        routes: {
            'Songs/:id/:songName': 'displaySong',
            'Songs/:id/:songName/:transpose': 'displaySong',
            'Songs': 'openSongCard',
            'Random': 'goToRandomSong'
        },

        control: {
            transposeUp: {
                tap: 'transposeUp'
            },
            transposeDown: {
                tap: 'transposeDown'
            },
            songLists: {
                itemtap: 'navigateToSong'
            },
            songCard: {
                pop: 'showSongsList',
                push: 'showNavBar'
            }
        }
    },

    goToRandomSong: function () {
        var me = this;
        Ext.getStore( 'songs' ).whenLoaded( function () {
                var item = this.getRandomItem();
                me.redirectTo( 'Songs/' + item.id + '/' + item.data.name )
            }
        );

    },


    showNavBar: function () {
        this.getFilter().hide();
        this.getSongCard().getNavigationBar().show();
    },

    openSongCard: function () {
        var songCard = this.getSongCard();
        songCard.pop();
        songCard.getNavigationBar().hide();
    },

    transposeUp: function () {
        this.getSongSingle().transpose( 1 );
    },
    transposeDown: function () {
        this.getSongSingle().transpose( -1 );
    },
    showSongsList: function () {
        this.getFilter().show();
        this.redirectTo( 'Songs' );
    },


    /**
     * This is called when user clicks on a list item
     */
    navigateToSong: function ( list, index, el, record ) {
        this.redirectTo( 'Songs/' + index + '/' + record.data.nameLatin );
    },

    displaySong: function ( index, name, transpose ) {
        var song = this.getSongSingle();
        var tabPanel = this.getTabPanel();

        /**
         * We want to switch to the SongCard tab first .
         */
        tabPanel.setActiveItem( tabPanel.innerIndexOf( this.getSongCard() ) );

        Ext.getStore( 'songs' ).whenLoaded( function ( store ) {
            var record = store.getAt( index );
            song.setRecord( record );
            song.transpose( transpose || 0);
            this.getSongCard().push( song );
        }.bind( this ) );


    }


} );