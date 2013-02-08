/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";


describe( "Songs store", function () {
    beforeEach( function () {
            this.store = Ext.create( "chords.store.songs" );

            var items = [];
            for( var i = 0; i < 100; i++ ) {
                items.push( i );
            }
            this.store.data.items = items;

        }
    );
    it( "Gets random items and never repeats", function () {
        var unique = {};
        var randomItem;

        for( var i = 0, l = this.store.data.items.length; i < l; i++ ) {
            randomItem = this.store.getRandomItem();
            if( !unique[randomItem] ) {
                console.log( randomItem );
                unique[randomItem] = true;
            } else {
                throw "Item repeats: " + randomItem;
            }
        }
    } );

    it( "Gets random items and when all items are gone, returns undefined", function () {
        for( var i = 0, l = this.store.data.items.length; i < l; i++ ) {
            this.store.getRandomItem();
        }
        expect( this.store.getRandomItem() ).toBeUndefined();
    } );

    it( "Can be shuffled restarted after all items are gone", function () {
        for( var i = 0, l = this.store.data.items.length; i < l; i++ ) {
            this.store.getRandomItem();
        }
        this.store.shuffle();
        expect( this.store.getRandomItem() ).not.toBeUndefined();
    } );

} );