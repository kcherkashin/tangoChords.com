/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.Loader.setPath( {
    'Ext':    'touch/src',
    'chords': 'base/app'
} );


describe( "Main View", function () {
    it( "has an xtype of 'view'", function () {
        expect( Ext.create( "chords.view.Main" ).xtype ).toBe( 'main' );
    } );
} );