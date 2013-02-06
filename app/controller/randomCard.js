/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.controller.randomCard', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            carousel:      "#randomCarousel",
            card:          "randomcard",
            toolbar:       "randomcard toolbar",
            transposeDown: "#transposeDown",
            transposeUp:   "#transposeUp"
        }


    },

    pushRandomSong: function () {
        var record = Ext.getStore( "songs" ).getRandomItem();
        if( record ) {
            var song = this.getApplication().getController( "songSingle" ).createSong( record );
            this.getCarousel().add( song );
        }
    },

    updateCarousel: function ( card, newItem ) {
        if( newItem.id ) {
            this.getToolbar().setTitle( newItem.getRecord().getTitle() );
        }

        var carousel = this.getCarousel();
        if( carousel.getMaxItemIndex() === carousel.getActiveIndex() ) {
            this.pushRandomSong()
        }
    },


    launch: function () {

        this.getCarousel()
            .on( "painted", this.updateCarousel, this )
            .on( "activeitemchange", this.updateCarousel, this );

        this.getTransposeDown()
            .on( "tap", function () {
                this.getCarousel().getActiveItem().transpose( -1 );
            }, this );

        this.getTransposeUp()
            .on( "tap", function () {
                this.getCarousel().getActiveItem().transpose( 1 );
            }, this )


    }



} );