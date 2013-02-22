/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

(function ( testacular, Ext ) {

    // Delaying Testacular start
    testacular.loaded = Ext.emptyFn;

    // Setting
    Ext.Loader.setPath( {
        'chords': 'base/app',
        'Ext.ux.touch.grid': 'base/app/components/touch.grid'
    } );

    Ext.onReady( testacular.start );


}( window.__testacular__, window.Ext ));


