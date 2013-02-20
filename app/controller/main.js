/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";
Ext.define( 'chords.controller.main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            tabPanel: "#chordsTabPanel",
            randomTab: '#randomCardTab',
            songTab: '#songCardTab',
            aboutCard: '#aboutCardTab'
        },
        control: {
            aboutCard: {
                tap: 'goToAboutPage'
            },
            songTab: {
                tap: 'goToSongList'
            },
            randomTab: {
                tap: 'goToRandomSong'
            }
        },
        routes: {
            'About': 'about'
        }
    },


    goToAboutPage: function () {
        this.redirectTo( 'About' );
    },
    goToSongList: function () {
        this.redirectTo( 'Songs' );
    },

    goToRandomSong: function () {
        this.redirectTo( 'Random' );
    },


    about: function () {
        this.getTabPanel().setActiveItem( 2 );
    },
    random: function () {
        this.goToRandomSong();
    },


    /**
     * Returns true is the url starts with the tab name. e.g.
     * url #Songs/songs will return true for "Songs", false for "Filter".
     *
     *
     */
    isActiveTab: function ( tabName ) {
        return location.hash.substr( 1 ).indexOf( tabName ) === 0;
    }


} );