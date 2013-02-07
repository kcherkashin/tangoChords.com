/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

describe( "Main View", function () {
    it( "has an xtype of 'view'", function () {
        expect( Ext.create( "chords.view.Main" ).xtype ).toBe( 'main' );
    } );
} );