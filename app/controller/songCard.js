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

    /**
     * The link format is Songs/{SongID}/{SongName}/{Steps}.
     *
     * We take fourth parameter and increase/decrease it.
     */
    updateTonalityUrl: function ( steps ) {
        var link = window.location.hash.substr( 1 ).split( "/" );
        /**
         * Transposing to -1 is the same as transposing to 11
         */
        link[3] = (steps + 12 + (+link[3] || 0 )) % 12;
        this.redirectTo( link.join( "/" ) );
    },

    transposeUp: function () {
        this.updateTonalityUrl( 1 )
    },
    transposeDown: function () {
        this.updateTonalityUrl( -1 )
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

    displaySong: function ( index ) {
        var song = this.getSongSingle();
        var tabPanel = this.getTabPanel();
        /**
         * We want to switch to the SongCard tab first .
         */
        tabPanel.setActiveItem( tabPanel.innerIndexOf( this.getSongCard() ) );

        Ext.getStore( 'songs' ).whenLoaded( function ( store ) {
            // Force re-render
            song.setRecord();
            song.setRecord( store.getAt( index ) );
            this.getSongCard().push( song );
        }.bind( this ) );


    }


} );