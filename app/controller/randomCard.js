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
    /**
     * Adds new pages to the carousel if necessary.
     *
     *
     * @param card
     * @param newItem
     */
    updateCarousel: function ( card, newItem ) {
        /**
         * This function can be fired by two different event.
         * If it's fired by updating active song, we should update the title in the navigation bar.
         *
         * For the Phone we don't update title, because navigation bar is too small. We'll just move it inline.
         */
        if( newItem.id && Ext.os.deviceType !== "Phone" ) {

            this.getToolbar().setTitle( newItem.getRecord().getTitle() );

        }

        var carousel = this.getCarousel();
        /**
         * If we're on the last page, try adding another one if possible.
         */
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